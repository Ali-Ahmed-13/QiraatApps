import { normalizeArabicText } from './textNormalization';

/**
 * معجم المرادفات والتكافؤات الإسلامية والقراءات (Arabic Islamic Synonyms & Aliases Dictionary)
 */

// القواعد الخاصة بتكافؤ تصريفات الأسماء الشائعة
export function applyNameRules(token: string): string {
  let t = token;
  
  // 1. توحيد أبو / أبي / أبا -> ابو
  if (t === 'ابو' || t === 'ابي' || t === 'ابا') {
    return 'ابو';
  }
  
  // 2. توحيد ابن / بن -> بن
  if (t === 'ابن' || t === 'بن') {
    return 'بن';
  }
  
  return t;
}

/**
 * توحيد تراكيب أسماء عبد (مثل عبد الله -> عبدالله) في الاستعلام والنصوص
 */
export function normalizeAbdNames(text: string): string {
  return text.replace(/\bعبد\s+/g, 'عبد');
}

/**
 * تجريد أل التعريف من البداية إذا كانت الكلمة طويلة (أكثر من 3 حروف)
 */
export function stripAl(token: string): string {
  if (token.startsWith('ال') && token.length > 3) {
    return token.slice(2);
  }
  return token;
}

// قاموس المرادفات والمصطلحات التكافؤية (مفتاح مطهّر -> مجموعة مرادفات مطهّرة)
const SYNONYMS_MAP: Record<string, string[]> = {
  // مصطلحات القرآن والقراءات
  قران: ['مصحف', 'التنزيل', 'كتاب الله', 'القران الكريم'],
  مصحف: ['قران', 'الكتاب', 'القران الكريم'],
  قراءات: ['قراءه', 'وجوه', 'الروايات', 'القراءات'],
  قراءه: ['قراءات', 'وجوه', 'الروايات'],
  مقرئ: ['قارئ', 'شيخ', 'إمام'],
  قارئ: ['مقرئ', 'حافظ', 'شيخ'],
  سند: ['إجازة', 'طريق', 'أسناد', 'رواية'],
  إجازة: ['سند', 'شهادة', 'إسناد'],
  شاطبية: ['الشاطبية', 'حرز الاماني', 'متن الشاطبية'],
  طيبه: ['طيبة النشر', 'النشر'],
  
  // الأئمة والرواة المشهورون
  حفص: ['حفص عن عاصم', 'عاصم'],
  ورش: ['ورش عن نافع', 'نافع'],
  قالون: ['قالون عن نافع'],
  دوري: ['الدوري عن ابي عمرو'],
  سوسي: ['السوسي عن ابي عمرو'],
  شعبة: ['شعبة عن عاصم'],
  'ابن كثير': ['بن كثير', 'ابن كثير المكي'],
  نافع: ['نافع المدني'],
  عاصم: ['عاصم بن ابي النجود'],
  كسائي: ['الكسائي'],
  حمزة: ['حمزة الزيات'],
  يعقوب: ['يعقوب الحضرمي'],
  خلف: ['خلف العاشر', 'خلف بن هشام']
};

/**
 * الحصول على قائمة المرادفات المتاحة لكلمة معينة
 */
export function getSynonymsForToken(rawToken: string): string[] {
  const token = applyNameRules(normalizeArabicText(rawToken));
  const bareToken = stripAl(token);
  
  const results = new Set<string>([token, bareToken]);
  
  // مراجعة الـ SYNONYMS_MAP للكلمة الأصلية والكلمة بدون أل التعريف
  [token, bareToken].forEach((key) => {
    if (SYNONYMS_MAP[key]) {
      SYNONYMS_MAP[key].forEach((syn) => {
        const normSyn = normalizeArabicText(syn);
        results.add(normSyn);
        results.add(stripAl(normSyn));
      });
    }
  });
  
  return Array.from(results);
}
