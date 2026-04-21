import SubjectsClient from "./subjects-client";
import { getSubjects, getGlobalInsights } from "@/app/(dashboard)/_api/queries";

export default async function SubjectsPage() {
  const [subjects, insights] = await Promise.all([
    getSubjects(),
    getGlobalInsights(),
  ]);
  
  return <SubjectsClient subjects={subjects} insights={insights} />;
}
