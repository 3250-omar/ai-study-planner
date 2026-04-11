"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Library, 
  Bot, 
  LineChart, 
  HelpCircle, 
  User, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Study Plan", href: "/dashboard/plan", icon: CalendarDays },
  { name: "Library", href: "/dashboard/library", icon: Library },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: Bot },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
];

const bottomItems = [
  { name: "Help Center", href: "/help", icon: HelpCircle },
  { name: "Account", href: "/account", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col overflow-y-auto bg-sidebar border-r border-sidebar-border">
      {/* Brand */}
      <div className="flex h-20 shrink-0 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold focus:outline-none">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
            <Sparkles className="size-4" />
          </div>
          <div>
            <div className="text-lg tracking-tight text-sidebar-foreground">AuraStudy</div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50">University Edition</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col justify-between px-4 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="size-[18px]" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-6">
          <Button className="w-full justify-center bg-brand-gradient text-white shadow-md hover:opacity-90">
            New Study Session
          </Button>

          <nav className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <item.icon className="size-[18px]" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
