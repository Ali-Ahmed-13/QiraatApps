import booksData from '@/data/books';

export interface Book {
  id: string;
  title?: string;
  author?: string;
  description?: string;
  fileUrl?: string;
  category?: string;
  pages?: number | string;
  pagesCount?: number | string;
  fileSize?: string;
  format?: string;
}

/**
 * دالة مساعدة للبحث عن تفاصيل كتاب معين باستخدام معرفه (id).
 * @param bookId معرف الكتاب الفريد.
 * @returns تفاصيل الكتاب أو undefined في حال عدم العثور عليه.
 */
export function getBookById(bookId: string): Book | undefined {
  if (!bookId) return undefined;
  return (booksData as Book[]).find((book) => book.id === bookId);
}

/**
 * جلب كتب أخرى لنفس المؤلف حصراً.
 * @param author اسم المؤلف
 * @param currentBookId معرف الكتاب الحالي المستبعد
 */
export function getBooksByAuthor(author?: string, currentBookId?: string): Book[] {
  const allBooks = booksData as Book[];
  
  if (!author || author.trim() === '' || author === 'مجهول' || author === 'كاتب غير محدد') {
    return [];
  }

  const normalizedAuthor = author.trim().toLowerCase();
  
  return allBooks.filter((b) => {
    if (b.id === currentBookId) return false;
    if (!b.author || b.author === 'مجهول' || b.author === 'كاتب غير محدد') return false;
    const itemAuthor = b.author.trim().toLowerCase();
    return itemAuthor.includes(normalizedAuthor) || normalizedAuthor.includes(itemAuthor);
  }).slice(0, 6);
}

/**
 * جلب كتب ذات صلة من نفس التصنيف العلمي.
 * @param category التصنيف العلمي
 * @param excludeIds معرفات الكتب المستبعدة
 */
export function getBooksByCategory(category?: string, excludeIds: string[] = []): Book[] {
  if (!category) return [];
  const excludeSet = new Set(excludeIds);
  const allBooks = booksData as Book[];
  
  return allBooks.filter((b) => !excludeSet.has(b.id) && b.category === category).slice(0, 6);
}
