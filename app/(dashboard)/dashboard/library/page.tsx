import { LibraryHeader } from "./_components/library-header";
import { SmartSummaries } from "./_components/smart-summaries";
import { LibraryBrowser } from "./_components/library-browser";
import { getUserDocuments } from "../../_api/queries";

export default async function LibraryPage() {
  const documents = await getUserDocuments();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <LibraryHeader />
      <SmartSummaries />
      <LibraryBrowser initialDocuments={documents} />
    </div>
  );
}

