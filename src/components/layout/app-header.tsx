import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { motion } from "motion/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/components/theme-provider";
import { SCHOOL, notifications } from "@/lib/school-data";

export function AppHeader({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 glass-panel rounded-none">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobileNav}>
            <Menu className="size-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold tracking-tight sm:text-lg">
              {SCHOOL.name}
            </h1>
            <p className="truncate text-[11px] text-muted-foreground sm:text-xs">{SCHOOL.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari siswa, berita, agenda…"
              className="w-56 rounded-xl pl-9 lg:w-72"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-gold" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 rounded-2xl p-2">
              <p className="px-2 py-1.5 text-sm font-semibold">Notifikasi</p>
              <div className="space-y-1">
                {notifications.map((n) => (
                  <motion.div
                    key={n.judul}
                    whileHover={{ x: 3 }}
                    className="rounded-xl px-2 py-2 hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-md text-[10px]">
                        {n.tipe}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">{n.waktu}</span>
                    </div>
                    <p className="mt-1 text-sm leading-snug">{n.judul}</p>
                  </motion.div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="rounded-xl" onClick={toggle}>
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl px-1 py-1 transition-colors hover:bg-muted">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    AK
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-left leading-tight xl:block">
                  <span className="block text-sm font-semibold">Admin Al-Karim</span>
                  <span className="block text-[11px] text-muted-foreground">Administrator</span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl">
              <DropdownMenuLabel>Akun saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
