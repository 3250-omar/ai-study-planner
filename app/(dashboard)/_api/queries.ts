import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export async function getUserProfile() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function getUserDocuments() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: documents } = await supabase
    .from("library_documents")
    .select("*, summary")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return documents || [];
}

export type SubjectRow = {
  id: string;
  user_id: string;
  title: string;
  category: string | null;
  exam_date: string | null; // YYYY-MM-DD
  difficulty: number | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type StudySessionRow = {
  id: string;
  user_id: string;
  subject: string;
  subject_id: string | null;
  title: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status: "planned" | "in-progress" | "completed" | "missed";
  created_at: string;
};

export type StudyTaskRow = {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  due_at: string | null;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  completed_at: string | null;
  created_at: string;
};

export async function getSubjects(): Promise<SubjectRow[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("subjects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []) as SubjectRow[];
}

export async function getRecentStudySessions(limit = 10): Promise<StudySessionRow[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("study_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("start_time", { ascending: false })
    .limit(limit);

  return (data || []) as StudySessionRow[];
}

export async function getStudySessionsInRange(
  startISO: string,
  endISO: string
): Promise<StudySessionRow[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("study_sessions")
    .select("*")
    .eq("user_id", user.id)
    .gte("start_time", startISO)
    .lt("start_time", endISO)
    .order("start_time", { ascending: true });

  return (data || []) as StudySessionRow[];
}

export async function getTodayStudyPlan(now = new Date()): Promise<StudySessionRow[]> {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return await getStudySessionsInRange(start.toISOString(), end.toISOString());
}

export type WeeklyStudyPoint = { day: string; actual: number; target: number };

export async function getWeeklyStudyHours(
  now = new Date(),
  targetHoursPerDay = 4
): Promise<WeeklyStudyPoint[]> {
  const end = new Date(now);
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);

  const start = new Date(end);
  start.setDate(start.getDate() - 7);

  const sessions = await getStudySessionsInRange(start.toISOString(), end.toISOString());

  const buckets = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const label = format(d, "EEE").toUpperCase();
    return { dateKey: d.toISOString().slice(0, 10), day: label, actual: 0, target: targetHoursPerDay };
  });

  const byDateKey = new Map(buckets.map((b) => [b.dateKey, b]));
  for (const s of sessions) {
    const dateKey = new Date(s.start_time).toISOString().slice(0, 10);
    const bucket = byDateKey.get(dateKey);
    if (!bucket) continue;
    bucket.actual += (s.duration_minutes || 0) / 60;
  }

  return buckets.map(({ day, actual, target }) => ({
    day,
    actual: Math.round(actual * 10) / 10,
    target,
  }));
}

export type SubjectFocusSlice = { name: string; value: number; color: string };

const subjectColors = ["#818cf8", "#fb923c", "#475569", "#22c55e", "#06b6d4", "#a855f7"];

export async function getSubjectFocusBreakdown(
  now = new Date(),
  days = 30,
  topN = 5
): Promise<{ totalHours: number; slices: SubjectFocusSlice[] }> {
  const end = new Date(now);
  const start = new Date(now);
  start.setDate(start.getDate() - days);

  const sessions = await getStudySessionsInRange(start.toISOString(), end.toISOString());
  const totals = new Map<string, number>();
  let totalMinutes = 0;

  for (const s of sessions) {
    const key = s.subject || "Uncategorised";
    const mins = s.duration_minutes || 0;
    totalMinutes += mins;
    totals.set(key, (totals.get(key) || 0) + mins);
  }

  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, topN);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const slices = sorted.map(([name, mins], idx) => ({
    name,
    value: totalMinutes === 0 ? 0 : Math.round((mins / totalMinutes) * 100),
    color: subjectColors[idx % subjectColors.length],
  }));

  return { totalHours, slices };
}

export type HeatmapDay = { date: string; intensity: 0 | 1 | 2 | 3 | 4 };

export async function getConsistencyHeatmap(now = new Date(), days = 98): Promise<HeatmapDay[]> {
  const end = new Date(now);
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);

  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const sessions = await getStudySessionsInRange(start.toISOString(), end.toISOString());
  const minutesByDate = new Map<string, number>();

  for (const s of sessions) {
    const dateKey = new Date(s.start_time).toISOString().slice(0, 10);
    minutesByDate.set(dateKey, (minutesByDate.get(dateKey) || 0) + (s.duration_minutes || 0));
  }

  const result: HeatmapDay[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateKey = d.toISOString().slice(0, 10);
    const mins = minutesByDate.get(dateKey) || 0;
    const intensity =
      mins <= 0 ? 0 :
      mins < 30 ? 1 :
      mins < 60 ? 2 :
      mins < 120 ? 3 : 4;
    result.push({ date: dateKey, intensity: intensity as HeatmapDay["intensity"] });
  }

  return result;
}

export async function getTaskCompletionSummary(now = new Date()) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { completed: 0, total: 0, deepWorkSessions: 0, avgRetentionPct: 0 };
  }

  const end = new Date(now);
  const start = new Date(now);
  start.setDate(start.getDate() - 7);

  const { data: tasks } = await supabase
    .from("study_tasks")
    .select("status, created_at")
    .eq("user_id", user.id)
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString());

  const total = (tasks || []).length;
  const completed = (tasks || []).filter((t) => t.status === "completed").length;

  // Placeholder metrics derived from sessions for now (can be replaced with real telemetry later)
  const sessions = await getStudySessionsInRange(start.toISOString(), end.toISOString());
  const deepWorkSessions = sessions.filter((s) => (s.duration_minutes || 0) >= 90).length;
  const avgRetentionPct = sessions.length === 0 ? 0 : 90; // keep UI stable; wire real metric later

  return { completed, total, deepWorkSessions, avgRetentionPct };
}

export async function getLibrarySummaries() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: documents } = await supabase
    .from("library_documents")
    .select("id, title, subject, file_name, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // For now, we return these documents as "summaries-ready" items
  return (documents || []).map(doc => ({
    id: doc.id,
    subject: doc.subject?.toUpperCase() || "GENERAL",
    title: doc.title || doc.file_name,
    description: `A systematic breakdown of your uploaded document ${doc.file_name}. Use the AI Tutor for a full context-aware brief.`,
    readTime: 5,
    subjectColor: doc.subject ? "bg-indigo-500" : "bg-slate-500"
  }));
}

export async function getGlobalInsights() {
  const now = new Date();
  
  // Weekly hours
  const weekly = await getWeeklyStudyHours();
  const currentTotal = weekly.reduce((sum, d) => sum + d.actual, 0);
  
  // Prev week
  const prevWeekEnd = new Date(now);
  prevWeekEnd.setDate(now.getDate() - 7);
  const prevWeekStart = new Date(prevWeekEnd);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const prevSessions = await getStudySessionsInRange(prevWeekStart.toISOString(), prevWeekEnd.toISOString());
  const prevTotal = prevSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / 60;

  const velocity = prevTotal === 0 ? (currentTotal > 0 ? 100 : 0) : Math.round(((currentTotal - prevTotal) / prevTotal) * 100);

  // Prep Score (Task completion last 30 days)
  const taskSummary = await getTaskCompletionSummary();
  const prepScore = taskSummary.total === 0 ? 0 : Math.round((taskSummary.completed / taskSummary.total) * 100);

  return { velocity, prepScore };
}

export async function getUserTasks() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("study_tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("due_at", { ascending: true });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  return data;
}
