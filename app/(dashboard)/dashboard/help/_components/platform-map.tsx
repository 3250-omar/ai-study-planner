import { LayoutDashboard, CalendarDays, Library, LineChart, BookOpen, Sparkles } from "lucide-react";

const features = [
  {
    title: "Dashboard Overview",
    description: "Your centralized command center. View upcoming deadlines, daily goals, and quick tasks at a glance.",
    icon: LayoutDashboard,
    color: "bg-indigo-500/20 text-indigo-500",
  },
  {
    title: "Study Plan",
    description: "Organize your academic timeline. Schedule Pomodoro and Deep Work segments mapped directly to your exams.",
    icon: CalendarDays,
    color: "bg-orange-500/20 text-orange-500",
  },
  {
    title: "Library",
    description: "Upload PDFs, slideshows, and coursework. AuraStudy automatically extracts text and organizes your materials.",
    icon: Library,
    color: "bg-primary/20 text-primary",
  },
  {
    title: "Progress Analytics",
    description: "Track intellectual velocity, efficiency baselines, and actual vs. target study hours globally.",
    icon: LineChart,
    color: "bg-emerald-500/20 text-emerald-500",
  },
  {
    title: "Subjects Matrix",
    description: "Group and categorize broader modules. Link specific tasks and library resources to dedicated subjects.",
    icon: BookOpen,
    color: "bg-rose-500/20 text-rose-500",
  },
  {
    title: "AI Tutor",
    description: "Your relentless contextual assistant. Can summarize your files, define terms, and guide your active recall.",
    icon: Sparkles,
    color: "bg-amber-500/20 text-amber-500",
  },
];

export function PlatformMap() {
  return (
    <div className="space-y-6 mb-12">
      <div className="space-y-1 block">
        <h2 className="text-xl font-bold tracking-tight">Platform Guide</h2>
        <p className="text-sm text-muted-foreground">Detailed breakdowns of core AuraStudy capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div key={idx} className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm flex flex-col items-start gap-5 hover:border-primary/20 hover:bg-muted/10 transition-colors group cursor-pointer">
            <div className={`p-3 rounded-xl ${feat.color} group-hover:scale-110 transition-transform`}>
              <feat.icon className="size-6" />
            </div>
            <div>
              <h3 className="text-base font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
