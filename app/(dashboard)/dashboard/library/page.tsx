import { LibraryHeader } from "./_components/library-header";
import { SmartSummaries } from "./_components/smart-summaries";
import { LibraryBrowser } from "./_components/library-browser";
import { getUserDocuments, getLibrarySummaries } from "../../_api/queries";

export default async function LibraryPage() {
  const [documents, summaries] = await Promise.all([
    getUserDocuments(),
    getLibrarySummaries(),
  ]);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <LibraryHeader />
      <SmartSummaries initialSummaries={summaries} />
      <LibraryBrowser initialDocuments={documents} />
    </div>
  );
}

