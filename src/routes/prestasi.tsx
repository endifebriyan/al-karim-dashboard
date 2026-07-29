import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Button } from "@/components/ui/button";
import { achievementCategories, achievements } from "@/lib/school-data";

export const Route = createFileRoute("/prestasi")({
  head: () => ({
    meta: [
      { title: "Prestasi Siswa — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Linimasa prestasi akademik, olahraga, tahfidz, sains, bisnis, dan leadership siswa Al-Karim.",
      },
      { property: "og:title", content: "Prestasi Siswa — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Rekam jejak juara siswa Sekolah Alam Al-Karim dari tahun ke tahun.",
      },
    ],
  }),
  component: PrestasiPage,
});

const tone: Record<string, string> = {
  Akademik: "bg-primary/15 text-primary",
  Olahraga: "bg-chart-3/20 text-chart-3",
  Tahfidz: "bg-success/15 text-success",
  Sains: "bg-chart-5/20 text-chart-5",
  Bisnis: "bg-gold/25 text-gold-foreground",
  Leadership: "bg-earth/20 text-earth",
};

function PrestasiPage() {
  const [filter, setFilter] = useState("Semua");
  const list = achievements.filter((a) => filter === "Semua" || a.kategori === filter);

  return (
    <>
      <PageHeader
        title="Prestasi"
        description="Setiap capaian adalah buah dari ikhtiar, doa, dan pendampingan."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {["Semua", ...achievementCategories].map((c) => (
            <Button
              key={c}
              size="sm"
              variant={filter === c ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="relative pl-6 sm:pl-8">
          <span className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-3" />
          {list.map((a, i) => (
            <motion.div
              key={a.judul}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pb-6"
            >
              <span className="absolute -left-[1.15rem] top-3 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground sm:-left-[1.4rem]">
                <Trophy className="size-3" />
              </span>
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition-shadow hover:shadow-glow sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${tone[a.kategori]}`}>
                    {a.kategori}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.tanggal}</span>
                </div>
                <h3 className="mt-2 font-bold tracking-tight">{a.judul}</h3>
                <p className="text-sm text-muted-foreground">{a.nama}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
