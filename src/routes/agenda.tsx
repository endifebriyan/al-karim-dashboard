import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/school-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda Sekolah — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Kalender kegiatan Al-Karim: parenting, camping, selling day, exhibition, hingga graduation.",
      },
      { property: "og:title", content: "Agenda Sekolah — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Jadwal kegiatan bulanan Sekolah Alam Al-Karim dalam tampilan kalender modern.",
      },
    ],
  }),
  component: AgendaPage,
});

const MONTH = 7; // Agustus 2026 (0-indexed)
const YEAR = 2026;
const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function AgendaPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const firstDay = new Date(YEAR, MONTH, 1).getDay();
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const dateKey = (d: number) => `${YEAR}-${String(MONTH + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const eventsOn = (d: number) => events.filter((e) => e.tanggal === dateKey(d));
  const detail = selected ? events.filter((e) => e.tanggal === selected) : [];

  return (
    <>
      <PageHeader
        title="Agenda Sekolah"
        description="Rencanakan dan pantau seluruh kegiatan sekolah dalam satu kalender."
        action={<Button className="rounded-xl">Tambah Agenda</Button>}
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <CardTitle className="text-base">Agustus 2026</CardTitle>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="size-8">
                  <ChevronLeft className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" className="size-8">
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground">
                {dayLabels.map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (d === null) return <div key={`e${i}`} />;
                  const evs = eventsOn(d);
                  const active = selected === dateKey(d);
                  return (
                    <motion.button
                      key={d}
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setSelected(active ? null : dateKey(d))}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-start rounded-xl border border-transparent p-1.5 text-xs transition-colors sm:p-2",
                        evs.length ? "bg-primary/8 hover:bg-primary/15" : "hover:bg-muted",
                        active && "border-primary bg-primary/15",
                      )}
                    >
                      <span className="font-semibold">{d}</span>
                      <span className="mt-1 flex gap-0.5">
                        {evs.slice(0, 3).map((e) => (
                          <span key={e.judul} className="size-1.5 rounded-full bg-gold" />
                        ))}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {selected ? "Agenda terpilih" : "Agenda mendatang"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(selected ? detail : events).map((e) => (
                <motion.div
                  key={e.judul}
                  whileHover={{ x: 4 }}
                  className="rounded-xl border border-border/70 p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-md text-[10px]">
                      {e.jenis}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <CalendarDays className="size-3" />
                      {new Date(e.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-snug">{e.judul}</p>
                  <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="size-3" /> {e.waktu}
                  </p>
                </motion.div>
              ))}
              {selected && detail.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Tidak ada agenda pada tanggal ini.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
