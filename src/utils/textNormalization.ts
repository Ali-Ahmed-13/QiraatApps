/**
 * وحدة التطبيع النقي للنصوص العربية (Pure Normalization Module)
 * مسؤولة عن إزالة التشكيل، التطويل، العلامات، وتوحيد الحروف إلى صورها الموحدة بدون منطق البحث.
 */

/**
 * دالة تطهير وتوحيد النص العربي لإهمال التشكيل والهمزات والتاء المربوطة.
 */
export function normalizeArabicText(text: string | null | undefined): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    // 1. إزالة التشكيل، التنوين، السكون، الشدة، العلامات القرأنية، والتطويل
    .replace(/[\u064B-\u0652\u0640\u0610-\u061A\u0653-\u0670\u06D6-\u06ED]/g, '')
    // 2. توحيد تراكيب الهمزات المركبة بالألف (ءا، اء، أا، إا -> ا)
    .replace(/(ءا|اء|أا|إا)/g, 'ا')
    // 3. توحيد أشكال الألف والهمزات إلى (ا)
    .replace(/[أإآٱ]/g, 'ا')
    // 4. توحيد الهمزة المنفصلة الساكنة أو على السطر
    .replace(/ء/g, 'ا')
    // 5. توحيد الواو المهموزة (ؤ) إلى (و)
    .replace(/ؤ/g, 'و')
    // 6. توحيد الياء المهموزة والألف المقصورة (ئ، ى) إلى (ي)
    .replace(/[ئى]/g, 'ي')
    // 7. توحيد التاء المربوطة (ة) إلى (ه)
    .replace(/ة/g, 'ه')
    // 8. تنظيف الرموز الخاصة وعلامات الترقيم وتوحيد المسافات
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * دالة تفكيك النص المطهّر إلى كلمات (Tokens)
 */
export function tokenizeText(text: string | null | undefined): string[] {
  const normalized = normalizeArabicText(text);
  if (!normalized) return [];
  return normalized.split(' ').filter((t) => t.length > 0);
}

// التصدير التوافقي لمنطق البحث وحساب النقاط من محرك البحث الفائق
export { matchesSearchText, searchAndRank, calculateSearchScore } from './searchEngine';
