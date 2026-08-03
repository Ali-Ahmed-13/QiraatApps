import fatwasData from '@/data/fatwasData.json';
import { Fatwa, FatwasData } from 'src/types/fatwas';
import { calculateSearchScore } from './searchEngine';

const data = fatwasData as FatwasData;

/**
 * الحصول على جميع الفتاوى
 */
export function getAllFatwas(): Fatwa[] {
  return data?.fatwas || [];
}

/**
 * الحصول على فتوى مخصصة بواسطة المعرف الفريد ID (مع دعم الأرقام والمكافآت)
 */
export function getFatwaById(id: string): Fatwa | undefined {
  if (!id) return undefined;

  // 1. المطابقة المباشرة بالـ ID الفعلي (مثل FTW101)
  const exact = (data?.fatwas || []).find((fatwa) => fatwa.id.toLowerCase() === id.toLowerCase());
  if (exact) return exact;

  // 2. الدعم الرجعي للأرقام (مثال: /fatwas/1)
  const numericIndex = Number(id) - 1;
  if (!isNaN(numericIndex) && numericIndex >= 0 && numericIndex < (data?.fatwas || []).length) {
    return data.fatwas[numericIndex];
  }

  return undefined;
}

/**
 * الحصول على اسم تصنيف الفتوى باللغة العربية
 */
export function getCategoryLabel(categoryId?: string): string {
  if (!categoryId) return 'مسألة شرعية';
  const category = (data?.categories || []).find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
}

/**
 * الحصول على الفتاوى ذات الصلة الذكية بربط الموضوعات والنقاط
 */
export function getSmartRelatedFatwas(currentFatwa?: Fatwa, limit = 3): Fatwa[] {
  if (!currentFatwa) return [];

  const candidates = (data?.fatwas || []).filter((f) => f.id !== currentFatwa.id);

  const scoredCandidates = candidates.map((fatwa) => {
    let score = 0;

    // 1. نفس التصنيف (نقطة أساسية)
    if (fatwa.category && currentFatwa.category && fatwa.category === currentFatwa.category) {
      score += 40;
    }

    // 2. تقاطع الكلمات والتشابه في السؤال
    const questionScore = calculateSearchScore(fatwa.question || '', currentFatwa.question || '');
    score += questionScore * 0.4;

    // 3. تقاطع الكلمات في الجواب
    const answerScore = calculateSearchScore(fatwa.answer || '', currentFatwa.question || '');
    score += answerScore * 0.2;

    return { fatwa, score };
  });

  return scoredCandidates
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.fatwa);
}
