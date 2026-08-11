import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { caseStudies } from "@/content/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/process", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/legal/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
