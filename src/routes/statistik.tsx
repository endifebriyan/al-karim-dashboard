import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, FileText, GraduationCap, Percent, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievementsPerYear, trafficData, ppdbByLevel, totals } from "@/lib/school-data";

export const Route = createFileRoute("/statistik")({
  head: () => ({
    meta: [
      { title: "Statistik & Analitik — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Analitik pengunjung website, artikel, konversi PPDB, alumni, dan prestasi Al-Karim.",
      },
      { property: "og:title", content: "Statistik & Analitik — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Dashboard analitik interaktif Sekolah Alam Al-Karim.",
      },
    ],
  }),
  component: StatistikPage,
});

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  color: "var(--color-popover-foreground)",
  fontSize: "12px",
};

const stats = [
  { label: "Jumlah Artikel", value: totals.articles, icon: FileText },
  { label: "Pengunjung Bulan Ini", value: 18450, icon: Eye },
  { label: "Pendaftar PPDB", value: 226, icon: GraduationCap },
  { label: "Konversi PPDB", value: "79%", icon: Percent },
  { label: "Jumlah Alumni", value: 1874, icon: Users },
  { label: "Total Prestasi", value: totals.achievements, icon: Trophy },
];

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function StatistikPage() {
  return (
    <>
      <PageHeader
        title="Statistik"
        description="Analitik lengkap performa website dan capaian sekolah."
      />

      <Section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full rounded-2xl shadow-soft transition-shadow hover:shadow-glow">
                <CardContent className="space-y-2 p-5">
                  <s.icon className="size-6 text-primary" />
                  <p className="text-2xl font-extrabold tracking-tight">
                    {typeof s.value === "number" ? s.value.toLocaleString("id-ID") : s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Traffic Website & Artikel</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="traffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="bulan" {...axis} tickLine={false} axisLine={false} />
                  <YAxis {...axis} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    dataKey="pengunjung"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2.5}
                    fill="url(#traffic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Distribusi Pendaftar per Jenjang</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={ppdbByLevel}
                    dataKey="pendaftar"
                    nameKey="jenjang"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {ppdbByLevel.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Akumulasi Prestasi</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={achievementsPerYear}>
                  <defs>
                    <linearGradient id="ach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="tahun" {...axis} tickLine={false} axisLine={false} />
                  <YAxis {...axis} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    dataKey="prestasi"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2.5}
                    fill="url(#ach)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
