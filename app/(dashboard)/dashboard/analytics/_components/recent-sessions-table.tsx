import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type RecentSession = {
  id: string;
  topic: string;
  date: string;
  duration: string;
  efficiency: number;
  mode: string;
  icon: typeof Zap;
};

export function RecentSessionsTable({ sessions }: { sessions: RecentSession[] }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden w-full">
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
          Recent Study Sessions
        </h3>
        <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
          View History
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-muted/20">
            <tr>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Topic</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Date</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Duration</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Efficiency</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {sessions.map((s, i) => (
              <tr key={i} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-5 font-semibold text-foreground truncate max-w-[200px] md:max-w-[300px]">
                  {s.topic}
                </td>
                <td className="px-6 py-5 text-muted-foreground whitespace-nowrap">
                  {s.date}
                </td>
                <td className="px-6 py-5 text-muted-foreground whitespace-nowrap">
                  {s.duration}
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold",
                    s.efficiency >= 90 ? "bg-[#818cf8]/10 text-[#818cf8]" :
                    s.efficiency >= 80 ? "bg-[#fb923c]/10 text-[#fb923c]" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {s.efficiency}%
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    <s.icon className="size-3.5" />
                    {s.mode}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
