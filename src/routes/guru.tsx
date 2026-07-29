import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { PageHeader, Section } from "@/components/layout/page-parts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { teachers } from "@/lib/school-data";

export const Route = createFileRoute("/guru")({
  head: () => ({
    meta: [
      { title: "Data Guru — Sekolah Alam Al-Karim" },
      {
        name: "description",
        content: "Profil guru dan fasilitator Sekolah Alam Al-Karim beserta jenjang dan bidang ajarnya.",
      },
      { property: "og:title", content: "Data Guru — Sekolah Alam Al-Karim" },
      {
        property: "og:description",
        content: "Direktori guru dan fasilitator Sekolah Alam Al-Karim.",
      },
    ],
  }),
  component: GuruPage,
});

function GuruPage() {
  return (
    <>
      <PageHeader
        title="Guru"
        description="Fasilitator yang mendampingi siswa tumbuh di alam terbuka."
        action={<Button className="rounded-xl">Tambah Guru</Button>}
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teachers.map((t, i) => (
            <motion.div
              key={t.nama}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full rounded-2xl shadow-soft transition-shadow hover:shadow-glow">
                <CardContent className="space-y-3 p-5">
                  <Avatar className="size-14">
                    <AvatarFallback className="gradient-hero text-sm font-bold text-primary-foreground">
                      {t.nama
                        .split(" ")
                        .slice(1, 3)
                        .map((w) => w[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold leading-snug">{t.nama}</p>
                    <p className="text-sm text-muted-foreground">{t.mapel}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-md">
                      {t.jenjang}
                    </Badge>
                    <Badge className="rounded-md bg-gold text-gold-foreground">{t.status}</Badge>
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
