import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Button } from "@/components/ui/button";
import { gallery, galleryFilters } from "@/lib/school-data";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Kegiatan — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Dokumentasi kegiatan belajar di alam, prestasi, dan momen kebersamaan siswa Al-Karim.",
      },
      { property: "og:title", content: "Galeri Kegiatan — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Kumpulan foto kegiatan seluruh jenjang Sekolah Alam Al-Karim.",
      },
    ],
  }),
  component: GaleriPage,
});

function GaleriPage() {
  const [filter, setFilter] = useState<string>("Semua");
  const [active, setActive] = useState<number | null>(null);
  const items = gallery.filter((g) => filter === "Semua" || g.kategori === filter);
  const activeItem = gallery.find((g) => g.id === active);

  return (
    <>
      <PageHeader title="Galeri" description="Momen belajar, bermain, dan bertumbuh di alam." />

      <Section>
        <div className="flex flex-wrap gap-2">
          {galleryFilters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 xl:columns-4">
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(g.id)}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border/70 text-left shadow-soft"
            >
              <div
                className="gradient-hero"
                style={{ aspectRatio: g.ratio, filter: `hue-rotate(${g.seed % 60}deg)` }}
              />
              <div className="bg-card p-3">
                <p className="truncate text-sm font-semibold">{g.judul}</p>
                <p className="text-[11px] text-muted-foreground">{g.kategori}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-glow"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80"
              >
                <X className="size-4" />
              </button>
              <div
                className="gradient-hero"
                style={{ aspectRatio: 16 / 10, filter: `hue-rotate(${activeItem.seed % 60}deg)` }}
              />
              <div className="p-5">
                <p className="font-bold">{activeItem.judul}</p>
                <p className="text-sm text-muted-foreground">{activeItem.kategori}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
