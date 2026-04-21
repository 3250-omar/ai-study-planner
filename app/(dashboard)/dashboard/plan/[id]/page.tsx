import { getSubjects, getStudySessionsInRange, getUserTasks } from "@/app/(dashboard)/_api/queries";
import { notFound } from "next/navigation";
import { SubjectDetailClient } from "./subject-detail-client";

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subjects = await getSubjects();
  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    notFound();
  }

  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 30);
  
  const [sessions, tasks] = await Promise.all([
    getStudySessionsInRange(start.toISOString(), now.toISOString()),
    getUserTasks(),
  ]);

  const subjectSessions = sessions.filter((s) => s.subject_id === id);
  const subjectTasks = tasks.filter((t: any) => t.subject_id === id);

  return (
    <SubjectDetailClient 
      subject={subject} 
      sessions={subjectSessions} 
      tasks={subjectTasks} 
    />
  );
}
