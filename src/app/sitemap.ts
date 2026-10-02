import type { MetadataRoute } from "next";
import { site, nav, servicePages } from "@/lib/content";
import { oneSpaceNav } from "@/lib/onespace";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    ...nav.map((n) => n.href),
    ...oneSpaceNav.map((n) => n.href),
    ...servicePages.map((p) => `/${p.slug}`),
    "/privacy",
    "/terms",
  ];

  const unique = Array.from(new Set(routes));

  return unique.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
