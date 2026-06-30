import { notFound } from 'next/navigation';
import { Download, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getBookById } from 'src/utils/bookHelper';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c111d] py-6 px-4 sm:px-6" dir="rtl">
      <div className="max-w-5xl mx-auto flex flex-col">

        {/* شريط التحكم العلوي */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-900/10 shadow-sm mb-5">
          <div className="flex items-center gap-3 text-right w-full sm:w-auto">
            <Link
              href="/books"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              title="العودة إلى المكتبة"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
            <div>
              <span className="text-[10px] bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-2.5 py-0.5 rounded-full">
                {book.category}
              </span>
              <h1 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 mt-1">
                {book.title} <span className="text-slate-400 font-medium text-xs">({book.author})</span>
              </h1>
            </div>
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

        {/* الارتفاع الجديد الموزون: ملموم في الشاشة ومريح جداً في التصفح */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden h-[750px] max-h-[80vh]">
          <iframe
            src={`${book.fileUrl}#toolbar=1`}
            className="w-full h-full border-none"
            title={book.title}
          />
        </div>

      </div>
    </div>
  );
}