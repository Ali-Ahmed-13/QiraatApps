import { MetadataRoute } from "next";
import softwareList from "src/data/softwareData.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quran-apps-catalog.vercel.app";

  // Generate dynamic sitemap entries for all details pages
  const softwareEntries = softwareList.map((item) => ({
    url: `${baseUrl}/software/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Generate sitemap entries for download buffer screens
  const downloadEntries = softwareList.map((item) => ({
    url: `${baseUrl}/software/${item.id}/download`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...softwareEntries,
    ...downloadEntries,
  ];
}
