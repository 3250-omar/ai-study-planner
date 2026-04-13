import { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { SubjectModal } from "@/components/modals/subject-modal";
import { UploadModal } from "@/components/modals/upload-modal";
import { AiTutor } from "./_components/ai-tutor";

export const metadata: Metadata = {
  title: "Dashboard - AuraStudy",
  description: "Your personalized study timeline and progress analytics.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Topbar />

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
      <SubjectModal />
      <UploadModal />
      <AiTutor />
    </div>
  );
}
