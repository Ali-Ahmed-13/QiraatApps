import { notFound } from 'next/navigation';
import { Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/data/roadmapData.json';

interface PdfFile {
  label: string;
  url: string;
}

interface LevelItem {
  id: string;
  label: string;
  order: number;
  matn: {
    title: string;
    pdfUrl: PdfFile[] | string;
  };
}

interface PdfPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    file?: string;
  }>;
}

// دالة البحث الصحيحة للوصول إلى الـ level.id من الـ JSON مباشرة بطريقة آمنة برمجياً
function findLevelById(id: string): LevelItem | undefined {
  const sciences = roadmapData as unknown as Array<{
    topics?: Array<{
      levels?: Array<LevelItem>;
    }>;
  }>;

  for (const science of sciences) {
    if (science.topics) {
      for (const topic of science.topics) {
        if (topic.levels) {
          const foundLevel = topic.levels.find((level) => level.id === id);
          if (foundLevel) return foundLevel;
        }
      }
    }
  }
  return undefined;
}

export async function generateMetadata({ params }: PdfPageProps) {
  const { id } = await params;
  const levelInfo = findLevelById(id);
  return {
    title: levelInfo ? `عرض: ${levelInfo.matn.title} | تِيجَان` : 'ملف غير موجود',
  };
}

export default async function PdfViewerPage({ params, searchParams }: PdfPageProps) {
  const { id } = await params;
  const { file } = await searchParams;
  const fileIndex = parseInt(file || '0', 10);
  const levelInfo = findLevelById(id);

  // إذا لم يجد الـ levelId المطابق
  if (!levelInfo || !levelInfo.matn?.pdfUrl) {
    notFound();
  }

  let currentFile: PdfFile = { label: '', url: '' };

  // الوصول الصحيح للـ pdfUrl من داخل كائن matn
  if (Array.isArray(levelInfo.matn.pdfUrl)) {
    const files = levelInfo.matn.pdfUrl as PdfFile[];
    currentFile = files[fileIndex] || files[0];
  } else if (typeof levelInfo.matn.pdfUrl === 'string') {
    currentFile = {
      label: 'تحميل ملف الشرح',
      url: levelInfo.matn.pdfUrl,
    };
  }

  // تجنب تحميل المسارات البديلة أو الفارغة
  if (!currentFile.url || currentFile.url.trim() === '' || currentFile.url.trim() === '#') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c111d] py-8 px-4 sm:px-6" dir="rtl">
      <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">

        {/* شريط التحكم العلوي */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-900/10 shadow-sm mb-4">
          <div className="flex items-center gap-3 text-right w-full sm:w-auto">
            <Link
              href="/sciences"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
            <div>
              <span className="text-[10px] bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-2.5 py-0.5 rounded-full">
                {levelInfo.label}
              </span>
              <h1 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 mt-1">
                {levelInfo.matn.title} <span className="text-slate-400 font-medium text-xs">({currentFile.label})</span>
              </h1>
            </div>
          </div>

          <a
            href={currentFile.url}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-amber-900/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            <span>تحميل الملف مباشرة</span>
          </a>
        </div>

        {/* عرض الـ PDF المباشر داخل الـ iframe */}
        <div className="flex-grow bg-white dark:bg-slate-900 rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden relative">
          <iframe
            src={`${currentFile.url}#toolbar=1`}
            className="w-full h-full border-none"
            title={currentFile.label}
          />
        </div>

      </div>
    </div>
  );
}