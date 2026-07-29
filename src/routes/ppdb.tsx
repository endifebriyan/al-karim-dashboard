import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarCheck, CreditCard, Hourglass, Users } from "lucide-react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ppdbByLevel, ppdbOrigin } from "@/lib/school-data";

export const Route = createFileRoute("/ppdb")({
  head: () => ({
    meta: [
      { title: "Dashboard PPDB — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Pantau pendaftar, kuota, waiting list, status pembayaran, dan asal sekolah calon siswa baru.",
      },
      { property: "og:title", content: "Dashboard PPDB — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Monitoring penerimaan peserta didik baru Sekolah Alam Al-Karim secara real-time.",
      },
    ],
  }),
  component: PpdbPage,
});

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  color: "var(--color-popover-foreground)",
  fontSize: "12px",
};

const kpis = [
  { label: "Total Pendaftar", value: 226, icon: Users },
  { label: "Total Kuota", value: 272, icon: CalendarCheck },
  { label: "Waiting List", value: 34, icon: Hourglass },
  { label: "Pendaftar Hari Ini", value: 7, icon: CreditCard },
];

const payments = [
  { label: "Lunas", value: 148, tone: "bg-success" },
  { label: "DP / Cicilan", value: 52, tone: "bg-gold" },
  { label: "Belum Bayar", value: 26, tone: "bg-muted-foreground" },
];

function PpdbPage() {
  return (
    <>
      <PageHeader
        title="PPDB"
        description="Penerimaan Peserta Didik Baru tahun ajaran 2026/2027."
        action={<Badge className="rounded-full bg-gold text-gold-foreground">Gelombang 2 dibuka</Badge>}
      />

      <Section>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full rounded-2xl shadow-soft transition-shadow hover:shadow-glow">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <k.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Kuota per Jenjang Pilihan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ppdbByLevel.map((l) => {
                const pct = Math.round((l.pendaftar / l.kuota) * 100);
                return (
                  <div key={l.jenjang} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{l.jenjang}</span>
                      <span className="text-muted-foreground">
                        {l.pendaftar}/{l.kuota} · {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-2.5 rounded-full" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Status Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((p) => {
                const total = payments.reduce((a, b) => a + b.value, 0);
                const pct = Math.round((p.value / total) * 100);
                return (
                  <div key={p.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{p.label}</span>
                      <span className="text-muted-foreground">
                        {p.value} pendaftar · {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7 }}
                        className={`h-full rounded-full ${p.tone}`}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Asal Sekolah Pendaftar</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={ppdbOrigin} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" {...axis} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="asal"
                    width={140}
                    {...axis}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Bar dataKey="jumlah" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
