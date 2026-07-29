import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/siswa", changefreq: "weekly", priority: "0.7" },
          { path: "/guru", changefreq: "weekly", priority: "0.7" },
          { path: "/jenjang", changefreq: "monthly", priority: "0.8" },
          { path: "/program", changefreq: "monthly", priority: "0.8" },
          { path: "/berita", changefreq: "daily", priority: "0.9" },
          { path: "/prestasi", changefreq: "weekly", priority: "0.8" },
          { path: "/agenda", changefreq: "weekly", priority: "0.8" },
          { path: "/galeri", changefreq: "weekly", priority: "0.7" },
          { path: "/statistik", changefreq: "weekly", priority: "0.6" },
          { path: "/ppdb", changefreq: "daily", priority: "0.9" },
          { path: "/pengaturan", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
