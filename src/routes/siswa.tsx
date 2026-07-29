import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { EmptyState, PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { students } from "@/lib/school-data";

export const Route = createFileRoute("/siswa")({
  head: () => ({
    meta: [
      { title: "Data Siswa — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Direktori data siswa aktif Sekolah Alam Al-Karim dari jenjang Toddler hingga SMA.",
      },
      { property: "og:title", content: "Data Siswa — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Pencarian dan rekap data siswa seluruh jenjang Sekolah Alam Al-Karim.",
      },
    ],
  }),
  component: SiswaPage,
});

function SiswaPage() {
  const [q, setQ] = useState("");
  const rows = students.filter(
    (s) =>
      s.nama.toLowerCase().includes(q.toLowerCase()) ||
      s.nis.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Siswa"
        description="Direktori siswa aktif beserta jenjang dan kelasnya."
        action={<Button className="rounded-xl">Tambah Siswa</Button>}
      />
      <Section>
        <Card className="rounded-2xl shadow-soft">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama atau NIS…"
                className="rounded-xl pl-9"
              />
            </div>
            {rows.length === 0 ? (
              <EmptyState title="Data tidak ditemukan" description="Coba kata kunci lain." />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NIS</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jenjang</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((s) => (
                      <TableRow key={s.nis} className="hover:bg-muted/60">
                        <TableCell className="font-mono text-xs">{s.nis}</TableCell>
                        <TableCell className="font-medium">{s.nama}</TableCell>
                        <TableCell>{s.jenjang}</TableCell>
                        <TableCell className="text-muted-foreground">{s.kelas}</TableCell>
                        <TableCell>
                          <Badge
                            variant={s.status === "Aktif" ? "default" : "secondary"}
                            className="rounded-md"
                          >
                            {s.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
