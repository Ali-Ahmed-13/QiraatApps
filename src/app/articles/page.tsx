import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import { Article } from 'src/types/article';
import { BookOpen, Clock, CalendarDays, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'المقالات | منصة تِيجَان للعلوم الشرعية',
  description: 'مقالات علمية متخصصة في علوم القرآن والتجويد والعقيدة والحديث والفقه والقراءات العشر.',
  openGraph: {
    title: 'المقالات | منصة تِيجَان للعلوم الشرعية',
    description: 'مقالات علمية متخصصة في علوم القرآن والتجويد والعقيدة والحديث والفقه والقراءات العشر.',
    siteName: 'تِيجَان',
    locale: 'ar_EG',
    type: 'website',
  },
};

function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'src/data/articles.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Article[];
}

const CATEGORY_STYLES: Record<string, { pill: string; border: string; dot: string }> = {
  'علوم القرآن': {
    pill: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-700',
    dot: 'bg-amber-500',
  },
  'التجويد': {
    pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-700',
    dot: 'bg-emerald-500',
  },
  'العقيدة': {
    pill: 'bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300',
    border: 'border-violet-300 dark:border-violet-700',
    dot: 'bg-violet-500',
  },
  'الحديث': {
    pill: 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
    border: 'border-sky-300 dark:border-sky-700',
    dot: 'bg-sky-500',
  },
  'الفقه': {
    pill: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
    border: 'border-rose-300 dark:border-rose-700',
    dot: 'bg-rose-500',
  },
  'القراءات العشر': {
    pill: 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300',
    border: 'border-teal-300 dark:border-teal-700',
    dot: 'bg-teal-500',
  },
};

const DEFAULT_STYLE = {
  pill: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  border: 'border-slate-300 dark:border-slate-700',
  dot: 'bg-slate-500',
};

export default function ArticlesPage() {
  const articles = getArticles();
  const categories = ['الكل', ...Array.from(new Set(articles.map((a) => a.category)))];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-card dark:bg-[#0b0f19]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-amber-400/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-400/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-14 md:py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/20 dark:border-emerald-500/20 bg-amber-50 dark:bg-emerald-950/30 text-amber-800 dark:text-emerald-400 text-xs font-bold mb-5">
            <BookOpen className="w-4 h-4" />
            <span>مكتبة المقالات الشرعية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1E1E] dark:text-slate-200 leading-tight tracking-tight">
            مقالات في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-700 dark:from-emerald-400 to-amber-500 dark:to-sky-400">
              العلوم الشرعية
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            محتوى علمي متخصص موثق، يشمل علوم القرآن والتجويد والعقيدة والحديث والفقه والقراءات العشر.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="sticky top-16 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => {
              const style = CATEGORY_STYLES[cat] ?? DEFAULT_STYLE;
              return (
                <Link
                  key={cat}
                  href={cat === 'الكل' ? '/articles' : `/articles?category=${encodeURIComponent(cat)}`}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    cat === 'الكل'
                      ? 'bg-[#1E1E1E] text-white dark:bg-emerald-600 dark:text-white border-transparent'
                      : `${style.pill} ${style.border}`
                  }`}
                >
                  {cat !== 'الكل' && (
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  )}
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          إجمالي المقالات: <strong className="text-[#1E1E1E] dark:text-slate-200">{articles.length}</strong> مقالة
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const style = CATEGORY_STYLES[article.category] ?? DEFAULT_STYLE;
            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-card dark:bg-[#0e1a14] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${style.dot}`} />

                <div className="flex flex-col flex-grow p-5">
                  {/* Category pill */}
                  <span
                    className={`self-start inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-3 ${style.pill}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {article.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-base font-extrabold text-[#1E1E1E] dark:text-slate-100 leading-snug group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    {article.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 flex-grow">
                    {article.summary}
                  </p>

                  {/* Footer meta */}
                  <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Read more CTA */}
                <div className="px-5 pb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-emerald-400 group-hover:gap-2 transition-all">
                    اقرأ المقالة
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
