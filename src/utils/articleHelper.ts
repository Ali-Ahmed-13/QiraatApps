import articlesData from '@/data/articlesData.json';
import { Article, ArticlesData } from 'src/types/articles';

const data = articlesData as ArticlesData;

export function getAllArticles(): Article[] {
  return data?.articles || [];
}

export function getArticleById(id: string): Article | undefined {
  if (!id) return undefined;

  // 1. المطابقة المباشرة بالـ ID الفعلي (مثال: ART101)
  const exact = (data?.articles || []).find((a) => a.id.toLowerCase() === id.toLowerCase());
  if (exact) return exact;

  // 2. الدعم الرجعي للأرقام (مثال: /articles/1 أو /articles/2)
  const numericIndex = Number(id) - 1;
  if (!isNaN(numericIndex) && numericIndex >= 0 && numericIndex < (data?.articles || []).length) {
    return data.articles[numericIndex];
  }

  return undefined;
}

export function getCategoryLabel(categoryId?: string): string {
  if (!categoryId) return 'مقالة شرعية';
  const category = (data?.categories || []).find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
}

export function getRelatedArticles(currentArticle?: Article, limit = 3): Article[] {
  if (!currentArticle) return [];
  return (data?.articles || [])
    .filter((a) => a.id !== currentArticle.id)
    .slice(0, limit);
}
