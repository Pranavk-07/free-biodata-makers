
import type { MetadataRoute } from "next";

const BASE_URL = "https://freebiodatamakers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/biodata",
    "/wedding-invitation",
    "/birthday-cards",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));
}
