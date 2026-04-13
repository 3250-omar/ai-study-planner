import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HelpHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground text-sm max-w-[500px] leading-relaxed">
          Your complete guide to navigating and mastering the AuraStudy platform.
        </p>
      </div>

      <div className="relative w-full max-w-sm shrink-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input 
          placeholder="Search guides, tutorials, or FAQs..." 
          className="w-full pl-10 pr-4 h-11 bg-muted/40 border-border/50 rounded-xl focus-visible:ring-primary/30"
        />
      </div>
    </div>
  );
}
