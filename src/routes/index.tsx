import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Award,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  Camera,
  FilePlus2,
  GraduationCap,
  ImagePlus,
  Newspaper,
  School,
  Sparkles,
  Trophy,
  UserPlus,
  UserRoundPen,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-school.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/layout/page-parts";
import {
  achievementsPerYear,
  notifications,
  ppdbMonthly,
  studentGrowth,
  studentsPerLevel,
  totals,
} from "@/lib/school-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Informasi Sekolah Alam Al-Karim" },
      {
        name: "description",
        content:
          "Ringkasan data siswa, guru, jenjang, program unggulan, prestasi, agenda, dan PPDB Sekolah Alam Al-Karim.",
      },
      { property: "og:title", content: "Dashboard Informasi Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Pusat data dan statistik Sekolah Alam Al-Karim — The Green Islamic Future School.",
      },
    ],
  }),
  component: DashboardHome,
});

const kpis = [
  { label: "Total Siswa", value: totals.students, icon: Users, hint: "+8,4% dari tahun lalu" },
  { label: "Total Guru", value: totals.teachers, icon: UserRoundPen, hint: "Rasio 1 : 9" },
  { label: "Total Jenjang", value: totals.levels, icon: School, hint: "Toddler – SMA" },
  { label: "Program Aktif", value: totals.programs, icon: BookOpen, hint: "7 berjalan" },
  { label: "Artikel", value: totals.articles, icon: Newspaper, hint: "28 bulan ini" },
  { label: "Prestasi", value: totals.achievements, icon: Trophy, hint: "15 tahun ini" },
  { label: "Agenda Minggu Ini", value: totals.weekEvents, icon: CalendarDays, hint: "2 hari ini" },
  { label: "Galeri", value: totals.gallery, icon: Camera, hint: "34 foto baru" },
];

const quickActions = [
  { label: "Tambah Berita", icon: FilePlus2, to: "/berita" },
  { label: "Tambah Agenda", icon: CalendarPlus, to: "/agenda" },
  { label: "Upload Galeri", icon: ImagePlus, to: "/galeri" },
  { label: "Tambah Prestasi", icon: Award, to: "/prestasi" },
  { label: "Tambah Program", icon: BookOpen, to: "/program" },
  { label: "Tambah Guru", icon: UserRoundPen, to: "/guru" },
  { label: "Tambah Siswa", icon: UserPlus, to: "/siswa" },
] as const;

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
};

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  color: "var(--color-popover-foreground)",
  fontSize: "12px",
};

function DashboardHome() {
  return (
    <>
      <Section>
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-6 shadow-glow sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-w-0 text-primary-foreground">
              <Badge className="rounded-full bg-white/15 text-primary-foreground hover:bg-white/20">
                <Sparkles className="mr-1 size-3" /> Selamat Datang
              </Badge>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-red-500 sm:text-4xl lg:text-5xl">
                Dashboard Informasi
                <br />
                Sekolah Alam Al-Karim
              </h2>
              <p className="mt-4 max-w-xl text-sm/relaxed text-primary-foreground/80 sm:text-base">
                Pantau perkembangan siswa, program unggulan, prestasi, dan PPDB dalam satu tempat.
                Tumbuh bersama alam, berakar pada Al-Quran.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to="/ppdb">
                    <GraduationCap /> Lihat PPDB
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20"
                >
                  <Link to="/statistik">Statistik Sekolah</Link>
                </Button>
              </div>
            </div>
            <motion.img
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={heroImage}
              width={1200}
              height={800}
              alt="Ilustrasi kampus hijau Sekolah Alam Al-Karim"
              className="w-full rounded-2xl border border-white/20 object-cover shadow-soft"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Card className="group h-full rounded-2xl border-border/70 shadow-soft transition-shadow hover:shadow-glow">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <kpi.icon className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-extrabold tracking-tight">
                      {kpi.value.toLocaleString("id-ID")}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">{kpi.hint}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Jumlah Siswa per Jenjang">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={studentsPerLevel}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="jenjang" {...axis} tickLine={false} axisLine={false} />
                  <YAxis {...axis} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Bar dataKey="siswa" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Prestasi per Tahun">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={achievementsPerYear}>
                  <defs>
                    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#gold)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Tren PPDB">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={ppdbMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="bulan" {...axis} tickLine={false} axisLine={false} />
                  <YAxis {...axis} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="pendaftar" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="diterima" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Pertumbuhan Siswa">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={studentGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="tahun" {...axis} tickLine={false} axisLine={false} />
                  <YAxis {...axis} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    dataKey="siswa"
                    stroke="var(--color-chart-5)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {quickActions.map((a) => (
                  <Button
                    key={a.label}
                    asChild
                    variant="secondary"
                    className="h-auto justify-start rounded-xl px-3 py-3 text-left text-xs font-semibold transition-transform hover:-translate-y-0.5"
                  >
                    <Link to={a.to}>
                      <a.icon className="size-4 text-primary" />
                      <span className="truncate">{a.label}</span>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((n) => (
                  <motion.div key={n.judul} whileHover={{ x: 4 }} className="flex gap-3">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">{n.judul}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {n.tipe} · {n.waktu}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-2xl shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">{children}</CardContent>
    </Card>
  );
}
