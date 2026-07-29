import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { programs } from "@/lib/school-data";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "Program Unggulan — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Tahfidz Quran, Talent Mapping, Experiential Learning, IT & English, Entrepreneurship, dan lainnya.",
      },
      { property: "og:title", content: "Program Unggulan — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Delapan program unggulan Sekolah Alam Al-Karim beserta jumlah peserta dan statusnya.",
      },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  return (
    <>
      <PageHeader
        title="Program Unggulan"
        description="Program yang membentuk karakter, hafalan, dan kemandirian siswa Al-Karim."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map((p, i) => {
            const Icon = (Icons[p.icon as keyof typeof Icons] ?? Icons.Sparkles) as Icons.LucideIcon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full overflow-hidden rounded-2xl py-0 shadow-soft transition-shadow hover:shadow-glow">
                  <div className="relative h-24 gradient-hero">
                    <div className="absolute -bottom-6 left-5 grid size-12 place-items-center rounded-2xl bg-card text-primary shadow-soft">
                      <Icon className="size-6" />
                    </div>
                    <Badge
                      className={`absolute right-4 top-4 rounded-full ${
                        p.aktif ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.aktif ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                  <CardContent className="space-y-2 px-5 pb-5 pt-9">
                    <h3 className="font-bold tracking-tight">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                    <p className="pt-1 text-sm font-semibold text-primary">
                      {p.peserta.toLocaleString("id-ID")} peserta
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
