import { MetadataRoute } from "next";
import softwareList from "src/data/softwareData.json";
import articleList from "src/data/articles.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tijan-alislam.vercel.app";

  // Dynamic entries for software detail pages
  const softwareEntries = softwareList.map((item) => ({
    url: `${baseUrl}/software/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic entries for software download screens
  const downloadEntries = softwareList.map((item) => ({
    url: `${baseUrl}/software/${item.id}/download`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  // Dynamic entries for article detail pages
  const articleEntries = articleList.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sciences`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...softwareEntries,
    ...downloadEntries,
    ...articleEntries,
  ];
}
