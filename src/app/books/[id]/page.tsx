import { notFound } from 'next/navigation';
import { Download, ArrowRight, BookOpen, User, FileText, HardDrive, Layers, FileType, Library, ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getBookById, getBooksByAuthor, getBooksByCategory } from 'src/utils/bookHelper';
import BookCoverPreview from 'src/components/books/BookCoverPreview';

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BookPageProps) {
  const { id } = await params;
  const book = getBookById(id);
  return {
    title: book ? `قراءة: ${book.title} | تِيجَان` : 'كتاب غير موجود',
  };
}

export default async function BookViewerPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = getBookById(id);

  // التحقق من وجود الكتاب وأن لديه رابط ملف صحيح
  if (!book || !book.fileUrl || book.fileUrl.trim() === '' || book.fileUrl === '#') {
    notFound();
  }

  // 1. جلب الكتب الأخرى لنفس المؤلف حصراً
  const authorBooks = getBooksByAuthor(book.author, book.id);

  // 2. جلب كتب أخرى ذات صلة من نفس التصنيف العلمي
  const categoryBooks = getBooksByCategory(
    book.category,
    [book.id, ...authorBooks.map((b) => b.id)]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c111d] py-6 px-4 sm:px-6 text-foreground transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* 🌟 1. شريط التحكم والتنقل العلوي */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-900/10 dark:border-amber-500/10 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 text-right w-full sm:w-auto">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              title="العودة إلى المكتبة"
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة للمكتبة</span>
            </Link>
            <span className="text-xs bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-500/20">
              {book.category || 'مجهول'}
            </span>
          </div>

          <a
            href={book.fileUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-amber-900/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            <span>تحميل الكتاب مباشرة</span>
          </a>
        </div>

        {/* 🌟 2. بطاقة معلومات الكتاب (تتوزع في عمودين: التفاصيل يميناً، وغلاف الـ PDF يساراً) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-900/10 dark:border-amber-500/10 p-6 sm:p-8 shadow-sm">
          
          {/* Header & Title */}
          <div className="flex items-start gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-amiri leading-tight">
                {book.title || 'عنوان مجهول'}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-800/80 dark:text-amber-400/90 mt-1">
                تأليف / شرح: {book.author || 'مجهول'}
              </p>
            </div>
          </div>

          {/* محتوى البطاقة: تقسيم إلى عمودين */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* العمود الأيمن: النبذة وجدول البيانات */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* الوصف */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-xl border-r-4 border-amber-600 dark:border-amber-500">
                <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">نبذة عن الكتاب:</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {book.description || 'مجهول'}
                </p>
              </div>

              {/* جدول تفاصيل الكتاب */}
              <div>
                <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <span>بطاقة بيانات الكتاب المفصلة</span>
                </h2>
                
                <div className="overflow-hidden border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
                  <table className="w-full text-right text-xs sm:text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300 w-1/3 sm:w-1/4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>اسم المؤلف</span>
                          </div>
                        </th>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                          {book.author || 'مجهول'}
                        </td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>التصنيف العلمى</span>
                          </div>
                        </th>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                          {book.category || 'مجهول'}
                        </td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>عدد الصفحات</span>
                          </div>
                        </th>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                          {book.pagesCount || book.pages ? `${book.pagesCount || book.pages} صفحة` : 'مجهول'}
                        </td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <HardDrive className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>حجم الملف</span>
                          </div>
                        </th>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                          {book.fileSize || 'مجهول'}
                        </td>
                      </tr>

                      <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <FileType className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>صيغة الملف</span>
                          </div>
                        </th>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                          <span className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded">
                            {book.format || 'مجهول'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* العمود الأيسر: عرض الصفحة الأولى من الـ PDF ديناميكياً */}
            <div className="lg:col-span-5 flex justify-center items-center w-full order-1 lg:order-2 h-full">
              <BookCoverPreview
                pdfUrl={book.fileUrl}
                title={book.title || ''}
                author={book.author}
                className="w-full"
              />
            </div>

          </div>

        </div>

        {/* 🌟 3. استعراض ومطالعة الكتاب المباشرة برؤية واسعة ومريحة */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-amber-900/10 dark:border-amber-500/10 shadow-md overflow-hidden flex flex-col transition-all">
          <div className="bg-slate-100 dark:bg-slate-800/80 px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">القراءة المباشرة واستعراض الكتاب</span>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              تصفح مريح بارتفاع موسّع للتلاوة والدراسة
            </span>
          </div>
          <div className="w-full h-[950px] sm:h-[1150px] min-h-[85vh] bg-slate-900">
            <iframe
              src={`${book.fileUrl}#toolbar=1`}
              className="w-full h-full border-none shadow-inner"
              title={book.title}
            />
          </div>
        </div>

        {/* 🌟 4. قسم كتب لنفس المؤلف (فقط إذا وجد للمؤلف كتب أخرى) */}
        {authorBooks.length > 0 && (
          <div className="mt-8 border-t border-slate-200/80 dark:border-slate-800/80 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Library className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-amiri text-slate-900 dark:text-slate-100">
                    كتب لنفس المؤلف ({book.author})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    تصفح باقي مصنفات هذا الإمام المتاحة في الخزانة
                  </p>
                </div>
              </div>
              <Link
                href="/books"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <span>استعرض كل الكتب</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {authorBooks.map((relBook) => (
                <Link
                  key={relBook.id}
                  href={`/books/${relBook.id}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/20">
                        {relBook.category || 'تجويد'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {relBook.format || 'PDF'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-1.5 font-amiri">
                      {relBook.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">
                      {relBook.author || 'مجهول'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {relBook.pagesCount || relBook.pages ? `${relBook.pagesCount || relBook.pages} صفحة` : relBook.fileSize}
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 group-hover:translate-x-[-3px] transition-transform">
                      <span>تصفح الكتاب</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 🌟 5. قسم كتب ذات صلة في نفس التصنيف العلمي */}
        {categoryBooks.length > 0 && (
          <div className="mt-8 border-t border-slate-200/80 dark:border-slate-800/80 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-amiri text-slate-900 dark:text-slate-100">
                    كتب ذات صلة في قسم ({book.category})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    كتب ومراجع مقترحة في نفس التخصص لتعميق الفهم والاستفادة
                  </p>
                </div>
              </div>
              <Link
                href="/books"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <span>استعرض كل الكتب</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryBooks.map((relBook) => (
                <Link
                  key={relBook.id}
                  href={`/books/${relBook.id}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/20">
                        {relBook.category || 'تجويد'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {relBook.format || 'PDF'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-1.5 font-amiri">
                      {relBook.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">
                      {relBook.author || 'مجهول'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {relBook.pagesCount || relBook.pages ? `${relBook.pagesCount || relBook.pages} صفحة` : relBook.fileSize}
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 group-hover:translate-x-[-3px] transition-transform">
                      <span>تصفح الكتاب</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}