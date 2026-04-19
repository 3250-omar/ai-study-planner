"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Library,
  LineChart,
  HelpCircle,
  User,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Study Plan", href: "/dashboard/plan", icon: CalendarDays },
  { name: "Library", href: "/dashboard/library", icon: Library },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
];

const bottomItems = [
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
  // { name: "Account", href: "/dashboard/profile", icon: User },
];

import { logout } from "@/app/(dashboard)/_api/actions";
import { useRouter } from "next/navigation";

interface SidebarProps {
  user: any;
  profile: any;
}

export function Sidebar({ user, profile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const displayName = profile?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const initials = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-y-auto bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex h-20 shrink-0 items-center",
          collapsed ? "justify-center px-3" : "justify-between px-6",
        )}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-bold focus:outline-none"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
            <Sparkles className="size-4" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-lg tracking-tight text-sidebar-foreground whitespace-nowrap">
                AuraStudy
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50 whitespace-nowrap">
                University Edition
              </div>
            </div>
          )}
        </Link>

        {/* Collapse toggle — only visible when expanded */}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => setCollapsed(true)}
          >
            <PanelLeftClose className="size-5" />
          </Button>
        )}
      </div>

      {/* Expand toggle — only visible when collapsed */}
      {collapsed && (
        <div className="flex justify-center px-3 pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => setCollapsed(false)}
          >
            <PanelLeftOpen className="size-5" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between py-4",
          collapsed ? "px-3" : "px-4",
        )}
      >
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  collapsed
                    ? "justify-center px-0 py-2.5"
                    : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-[18px] shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-6">
          {collapsed ? (
            <Button
              size="icon"
              className="w-full bg-brand-gradient text-white shadow-md hover:opacity-90"
              title="New Study Session"
            >
              <Sparkles className="size-4" />
            </Button>
          ) : (
            <Button className="w-full justify-center bg-brand-gradient text-white shadow-md hover:opacity-90">
              New Study Session
            </Button>
          )}

          <nav className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    collapsed
                      ? "justify-center px-0 py-2.5"
                      : "gap-3 px-3 py-2.5",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  {!collapsed && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              );
            })}

            {/* User Account / Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-sidebar-accent/50 cursor-pointer mt-1",
                    collapsed
                      ? "justify-center px-0 py-2.5"
                      : "gap-3 px-3 py-2.5",
                  )}
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <User className="size-4" />
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col overflow-hidden text-left">
                      <span className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">
                        {displayName}
                      </span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px]"
                side="right"
                sideOffset={12}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-sm">
                    <p className="font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center w-full"
                    >
                      <Settings className="mr-2 size-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </div>
  );
}
