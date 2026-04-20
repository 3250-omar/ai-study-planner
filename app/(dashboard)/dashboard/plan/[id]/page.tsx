import { getSubjects, getStudySessionsInRange } from "@/app/(dashboard)/_api/queries";
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
  const sessions = await getStudySessionsInRange(start.toISOString(), now.toISOString());
  const subjectSessions = sessions.filter((s) => s.subject_id === id);

  return <SubjectDetailClient subject={subject} sessions={subjectSessions} />;
}
