import { LibraryHeader } from "./_components/library-header";
import { SmartSummaries } from "./_components/smart-summaries";
import { LibraryBrowser } from "./_components/library-browser";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <LibraryHeader />
      <SmartSummaries />
      <LibraryBrowser />
    </div>
  );
}
