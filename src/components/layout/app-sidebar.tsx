import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Award,
  BookOpenText,
  CalendarDays,
  ChevronLeft,
  GraduationCap,
  Images,
  LayoutDashboard,
  Leaf,
  Newspaper,
  School,
  Settings,
  TrendingUp,
  UserRoundPen,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SCHOOL } from "@/lib/school-data";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/siswa", label: "Siswa", icon: Users },
  { to: "/guru", label: "Guru", icon: UserRoundPen },
  { to: "/jenjang", label: "Jenjang Pendidikan", icon: School },
  { to: "/program", label: "Program Unggulan", icon: BookOpenText },
  { to: "/berita", label: "Berita Sekolah", icon: Newspaper },
  { to: "/prestasi", label: "Prestasi", icon: Award },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/galeri", label: "Galeri", icon: Images },
  { to: "/statistik", label: "Statistik", icon: TrendingUp },
  { to: "/ppdb", label: "PPDB", icon: GraduationCap },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
] as const;

export function AppSidebar({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl gradient-gold text-gold-foreground shadow-glow">
          <Leaf className="size-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{SCHOOL.name}</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">{SCHOOL.tagline}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary"
                />
              )}
              <item.icon className="size-[18px] shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="mx-3 mb-4 hidden items-center justify-center gap-2 rounded-xl border border-sidebar-border py-2 text-xs font-semibold text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:flex"
      >
        <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        {!collapsed && "Ciutkan menu"}
      </button>
    </aside>
  );
}
