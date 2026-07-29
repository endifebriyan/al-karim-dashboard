import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";

import { EmptyState, PageHeader, Section } from "@/components/layout/page-parts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { news, type NewsItem } from "@/lib/school-data";

export const Route = createFileRoute("/berita")({
  head: () => ({
    meta: [
      { title: "Berita Sekolah — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Kelola dan telusuri berita, kegiatan, dan pengumuman terbaru Sekolah Alam Al-Karim.",
      },
      { property: "og:title", content: "Berita Sekolah — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Daftar artikel dan pengumuman resmi Sekolah Alam Al-Karim dengan pencarian dan filter.",
      },
    ],
  }),
  component: BeritaPage,
});

const PER_PAGE = 6;

const statusTone: Record<NewsItem["status"], string> = {
  Publish: "bg-success/15 text-success",
  Draft: "bg-muted text-muted-foreground",
  Review: "bg-gold/20 text-gold-foreground",
};

function BeritaPage() {
  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState<NewsItem | null>(null);

  const categories = useMemo(() => ["Semua", ...new Set(news.map((n) => n.kategori))], []);

  const filtered = useMemo(
    () =>
      news.filter(
        (n) =>
          (kategori === "Semua" || n.kategori === kategori) &&
          n.judul.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, kategori],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <PageHeader
        title="Berita Sekolah"
        description="Publikasikan kabar terbaru dari kelas, kegiatan, dan prestasi Al-Karim."
        action={<Button className="rounded-xl">Tambah Berita</Button>}
      />

      <Section>
        <Card className="rounded-2xl shadow-soft">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari judul berita…"
                  className="rounded-xl pl-9"
                />
              </div>
              <Select
                value={kategori}
                onValueChange={(v) => {
                  setKategori(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full rounded-xl sm:w-52">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {rows.length === 0 ? (
              <EmptyState
                title="Tidak ada berita ditemukan"
                description="Coba ubah kata kunci atau filter kategori."
              />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Thumb</TableHead>
                      <TableHead className="min-w-[220px]">Judul</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Penulis</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((n) => (
                      <TableRow key={n.id} className="hover:bg-muted/60">
                        <TableCell>
                          <div className="grid size-10 place-items-center rounded-lg gradient-hero text-[10px] font-bold text-primary-foreground">
                            {n.kategori.slice(0, 2).toUpperCase()}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[320px] truncate font-medium">
                          {n.judul}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="rounded-md">
                            {n.kategori}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {new Date(n.tanggal).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {n.penulis}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`rounded-md px-2 py-1 text-xs font-semibold ${statusTone[n.status]}`}
                          >
                            {n.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8"
                              onClick={() => setPreview(n)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="size-8">
                              <Pencil className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="size-8 text-destructive">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                {filtered.length} artikel · halaman {current} dari {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={current === 1}
                  onClick={() => setPage(current - 1)}
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={current === totalPages}
                  onClick={() => setPage(current + 1)}
                >
                  Berikutnya
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.judul}</DialogTitle>
            <DialogDescription>
              {preview?.kategori} · {preview?.penulis} · {preview?.tanggal}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Pratinjau ringkas artikel. Konten lengkap akan tampil di sini setelah editor berita
            diaktifkan.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
