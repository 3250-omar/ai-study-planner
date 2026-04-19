"use client";

import { Search, Flame, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-background/80 px-8 backdrop-blur-md border-b border-border/40">
      {/* Search */}
      <div className="flex w-full max-w-md items-center relative">
        <Search className="absolute left-3 size-4 text-muted-foreground" />
        <Input
          placeholder="Search resources, topics, or AI..."
          className="h-10 w-full rounded-full border-none bg-muted/50 pl-10 pr-4 text-sm shadow-none focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 transition-all hover:bg-muted/70"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
          <Flame className="size-3.5" />
          <span>12 DAY STREAK</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <ThemeToggle />
          <button className="transition-colors hover:text-foreground">
            <Bell className="size-5" />
          </button>
          <button className="transition-colors hover:text-foreground">
            <Settings className="size-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 border-l border-border/50 pl-6">
          <div className="hidden flex-col items-end sm:flex text-sm">
            <span className="font-semibold leading-none">Alex Rivera</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
              Lvl 12 Archivist
            </span>
          </div>
          <Avatar className="size-9 ring-2 ring-background border border-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
