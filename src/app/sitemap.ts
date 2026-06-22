import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tijan-alislam.vercel.app';

  // الصفحات الأساسية الثابتة في الموقع
  const routes = ['', '/contact', '/privacy-policy', '/terms'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}