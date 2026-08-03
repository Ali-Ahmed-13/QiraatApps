import { normalizeArabicText, tokenizeText } from './textNormalization';
import { applyNameRules, normalizeAbdNames, stripAl, getSynonymsForToken } from './synonyms';

/**
 * محرك البحث المتطور ونظام الترتيب بالنقاط (Advanced Multi-tier Search Engine & Scoring)
 */

/**
 * خوارزمية حساب مسافة ليفنشتاين بين كلمتين للتعامل مع الأخطاء الإملائية
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const row = new Array(b.length + 1);
  for (let i = 0; i <= b.length; i++) row[i] = i;

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

/**
 * فحص ما إذا كانت كلمة الاستعلام تطابق كلمة في النص بالـ Fuzzy Search (التسامح مع الأخطاء الإملائية)
 */
function isFuzzyTokenMatch(queryToken: string, targetToken: string): { matches: boolean; dist: number } {
  const qNorm = applyNameRules(queryToken);
  const tNorm = applyNameRules(targetToken);

  // لا تطبق التسامح الإملائي الـ Fuzzy إذا كانت الكلمة تحتوي على أرقام (أكواد الأرقام والمعرفات)
  if (/\d/.test(qNorm) || /\d/.test(tNorm)) {
    return { matches: false, dist: 99 };
  }

  const qBare = stripAl(qNorm);
  const tBare = stripAl(tNorm);

  if (qNorm.length <= 3) return { matches: false, dist: 99 };

  const maxDist = qNorm.length >= 6 ? 2 : 1;

  const d1 = levenshteinDistance(qNorm, tNorm);
  const d2 = levenshteinDistance(qBare, tBare);
  const minD = Math.min(d1, d2);

  if (minD <= maxDist) {
    return { matches: true, dist: minD };
  }

  return { matches: false, dist: 99 };
}

/**
 * دالة حساب نقاط التوافق بين النص والاستعلام (Score 0..100)
 */
export function calculateSearchScore(targetText: string | null | undefined, rawQuery: string): number {
  if (!rawQuery || !rawQuery.trim()) return 100; // بدون استعلام يعود بالكل
  if (!targetText || !targetText.trim()) return 0;

  // 0. المطابقة المباشرة الفائقة للأكواد والمعرفات (مثل FTW101, ART101, 101, ftw)
  const cleanQ = rawQuery.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '').toLowerCase();
  const cleanT = (targetText || '').replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '').toLowerCase();

  const isQueryCode = /\d/.test(cleanQ);
  const isTargetCode = /\d/.test(cleanT);

  if (cleanQ.length > 0 && cleanT.length > 0) {
    if (cleanT === cleanQ) return 100;
    if (cleanT.startsWith(cleanQ)) return 99;
    if (cleanT.includes(cleanQ)) return 98;
  }

  // إذا كان الاستعلام يحتوي على رقم/كود والهدف كود آخر لا يحتويه، نلغي التطابق لمنع جلب كود 102 عند البحث عن 101
  if (isQueryCode && isTargetCode && !cleanT.includes(cleanQ) && !cleanQ.includes(cleanT)) {
    return 0;
  }

  // التطبيع لمعالجة "عبد الله" -> "عبدالله" وتوحيد الحروف
  const normTarget = normalizeAbdNames(normalizeArabicText(targetText));
  const normQuery = normalizeAbdNames(normalizeArabicText(rawQuery));

  if (!normQuery) return 100;

  // 1. التطابق التام للجملة بالكامل (Exact Match -> Score 100)
  if (normTarget === normQuery) {
    return 100;
  }
  if (normTarget.includes(normQuery)) {
    return 95;
  }

  const queryTokens = tokenizeText(normQuery).map(applyNameRules);
  const targetTokens = tokenizeText(normTarget).map(applyNameRules);

  if (queryTokens.length === 0 || targetTokens.length === 0) return 0;

  // 2. البداية المطابقة (Starts With -> Score 90)
  if (normTarget.startsWith(normQuery)) {
    return 90;
  }

  // 3. مطابقة الكلمات المباشرة أو بدون أل التعريف (Contains / Multi-token Match -> Score 80)
  const allTokensMatchedDirectly = queryTokens.every((qTok) => {
    const qBare = stripAl(qTok);
    return targetTokens.some((tTok) => {
      const tBare = stripAl(tTok);
      return tTok === qTok || tTok.includes(qTok) || tBare === qBare || tBare.includes(qBare);
    });
  });

  if (allTokensMatchedDirectly) {
    return 80;
  }

  // 4. مطابقة المرادفات والقواعد الاسمية (Synonym / Alias Match -> Score 75)
  const allTokensMatchedSynonym = queryTokens.every((qTok) => {
    const synonyms = getSynonymsForToken(qTok);
    return targetTokens.some((tTok) => {
      const tBare = stripAl(tTok);
      return synonyms.some((syn) => tTok === syn || tBare === syn || tTok.includes(syn));
    });
  });

  if (allTokensMatchedSynonym) {
    return 75;
  }

  // 5. المرحلة الأخيرة فقط: التسامح مع الأخطاء الإملائية (Fuzzy Levenshtein Match -> Score 70 / 60)
  let totalFuzzyDist = 0;
  const allTokensFuzzyMatched = queryTokens.every((qTok) => {
    const synonyms = getSynonymsForToken(qTok);

    const hasDirectSyn = targetTokens.some((tTok) => {
      const tBare = stripAl(tTok);
      return synonyms.some((syn) => tTok === syn || tBare === syn);
    });
    if (hasDirectSyn) return true;

    let bestDist = 99;
    targetTokens.forEach((tTok) => {
      const res = isFuzzyTokenMatch(qTok, tTok);
      if (res.matches && res.dist < bestDist) {
        bestDist = res.dist;
      }
    });

    if (bestDist !== 99) {
      totalFuzzyDist += bestDist;
      return true;
    }

    return false;
  });

  if (allTokensFuzzyMatched) {
    return totalFuzzyDist === 1 ? 70 : 60;
  }

  return 0;
}

/**
 * دالة التوافق الشاملة القابلة لإعادة الاستخدام عبر كل أجزاء الموقع (Backwards compatible helper)
 */
export function matchesSearchText(text: string | null | undefined, query: string): boolean {
  return calculateSearchScore(text, query) > 0;
}

/**
 * دالة البحث والترتيب بحسب أعلى النقاط لجميع الأقسام (Search & Rank Items)
 */
export function searchAndRank<T>(
  items: T[],
  query: string,
  getTextFields: (item: T) => (string | null | undefined)[]
): T[] {
  if (!query || !query.trim()) return items;

  const scoredItems = items
    .map((item) => {
      const fields = getTextFields(item);
      let maxScore = 0;

      for (const field of fields) {
        const score = calculateSearchScore(field, query);
        if (score > maxScore) {
          maxScore = score;
        }
      }

      return { item, score: maxScore };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredItems.map((entry) => entry.item);
}
