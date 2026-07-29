import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Users } from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { levels } from "@/lib/school-data";

export const Route = createFileRoute("/jenjang")({
  head: () => ({
    meta: [
      { title: "Jenjang Pendidikan — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Jenjang Toddler & Daycare, Learning Center, TK Player, SD Explorer, SMP Finder, dan SMA Maker.",
      },
      { property: "og:title", content: "Jenjang Pendidikan — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Profil setiap jenjang pendidikan Sekolah Alam Al-Karim beserta jumlah siswa dan guru.",
      },
    ],
  }),
  component: JenjangPage,
});

function JenjangPage() {
  return (
    <>
      <PageHeader
        title="Jenjang Pendidikan"
        description="Dari Toddler hingga SMA — satu ekosistem belajar berbasis alam dan Al-Quran."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <Card className="h-full overflow-hidden rounded-2xl border-border/70 py-0 shadow-soft transition-shadow hover:shadow-glow">
                <div className={`relative h-32 bg-gradient-to-br ${l.tone} bg-muted`}>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-4xl font-black tracking-tight text-primary/25">
                      {l.alias}
                    </span>
                  </div>
                  <Badge className="absolute left-4 top-4 rounded-full bg-primary text-primary-foreground">
                    {l.name}
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-5">
                  <p className="text-sm text-muted-foreground">{l.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <Users className="size-4 text-primary" /> {l.students} siswa
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <Users className="size-4 text-gold" /> {l.teachers} guru
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
