import booksData from '@/data/booksData.json';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  fileUrl: string;
  category: string;
}

/**
 * دالة مساعدة للبحث عن تفاصيل كتاب معين باستخدام معرفه (id).
 * @param bookId معرف الكتاب الفريد.
 * @returns تفاصيل الكتاب أو undefined في حال عدم العثور عليه.
 */
export function getBookById(bookId: string): Book | undefined {
  return (booksData as Book[]).find((book) => book.id === bookId);
}
