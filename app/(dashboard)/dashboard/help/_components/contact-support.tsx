import { HeadphonesIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSupport() {
  return (
    <div className="mt-12 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-transparent p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
          <HeadphonesIcon className="size-6" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tight">
            Still feeling stuck?
          </h2>
          <p className="text-sm text-muted-foreground max-w-[400px]">
            Our support curation team is ready to assist you bridging the gap
            between your coursework and our algorithms.
          </p>
        </div>
      </div>

      <Button className="shrink-0 h-12 w-full md:w-auto px-8 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 text-sm tracking-widest uppercase">
        Open Support Ticket
        <ExternalLink className="ml-2 size-4" />
      </Button>
    </div>
  );
}
