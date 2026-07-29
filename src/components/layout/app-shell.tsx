import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SCHOOL } from "@/lib/school-data";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <AppSidebar
                collapsed={false}
                onToggle={() => setMobileOpen(false)}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-auto w-full max-w-7xl space-y-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="border-t border-border/70 px-4 py-6 text-center sm:px-6">
          <p className="text-sm font-semibold">{SCHOOL.name}</p>
          <p className="text-xs text-muted-foreground">
            “{SCHOOL.tagline}” — © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
