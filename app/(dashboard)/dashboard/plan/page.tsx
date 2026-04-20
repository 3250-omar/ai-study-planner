import SubjectsClient from "./subjects-client";
import { getSubjects } from "@/app/(dashboard)/_api/queries";

export default async function SubjectsPage() {
  const subjects = await getSubjects();
  return <SubjectsClient subjects={subjects} />;
}
