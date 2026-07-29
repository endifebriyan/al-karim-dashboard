import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { SCHOOL } from "@/lib/school-data";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({
    meta: [
      { title: "Pengaturan — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Atur identitas sekolah, tampilan tema, dan preferensi notifikasi dashboard Al-Karim.",
      },
      { property: "og:title", content: "Pengaturan — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Konfigurasi dashboard informasi Sekolah Alam Al-Karim.",
      },
    ],
  }),
  component: PengaturanPage,
});

const roles = [
  { role: "Admin", akses: "Akses penuh seluruh modul" },
  { role: "Guru", akses: "Kelola siswa, agenda, prestasi kelas" },
  { role: "Operator", akses: "Kelola berita, galeri, dan PPDB" },
  { role: "Kepala Sekolah", akses: "Lihat seluruh laporan dan statistik" },
  { role: "Orang Tua", akses: "Read only — berita, agenda, prestasi" },
];

function PengaturanPage() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <PageHeader title="Pengaturan" description="Kelola identitas sekolah dan preferensi dashboard." />
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Identitas Sekolah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Sekolah</Label>
                <Input id="nama" defaultValue={SCHOOL.name} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue={SCHOOL.tagline} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Resmi</Label>
                <Input id="email" defaultValue="info@sekolahalamalkarim.sch.id" className="rounded-xl" />
              </div>
              <Button className="rounded-xl">Simpan Perubahan</Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Tampilan & Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark">Mode Gelap</Label>
                  <Switch id="dark" checked={theme === "dark"} onCheckedChange={toggle} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif">Notifikasi PPDB Baru</Label>
                  <Switch id="notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="digest">Ringkasan Mingguan via Email</Label>
                  <Switch id="digest" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Peran Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((r) => (
                  <div key={r.role} className="rounded-xl border border-border/70 p-3">
                    <p className="text-sm font-semibold">{r.role}</p>
                    <p className="text-xs text-muted-foreground">{r.akses}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
