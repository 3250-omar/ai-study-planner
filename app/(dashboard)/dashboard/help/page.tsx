import { HelpHeader } from "./_components/help-header";
import { PlatformMap } from "./_components/platform-map";
import { FaqSection } from "./_components/faq-section";
import { ContactSupport } from "./_components/contact-support";

export default function HelpPage() {
  return (
    <div className="flex flex-col pb-10 max-w-5xl mx-auto w-full">
      <HelpHeader />
      <PlatformMap />
      <FaqSection />
      <ContactSupport />
    </div>
  );
}
