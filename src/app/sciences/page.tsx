import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import { Article } from 'src/types/article';
import { BookOpen, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'العلوم الشرعية | منصة تِيجَان',
  description: 'استكشف أقسام العلوم الشرعية: علوم القرآن، التجويد، العقيدة، الحديث، الفقه، والقراءات العشر.',
  openGraph: {
    title: 'العلوم الشرعية | منصة تِيجَان',
    description: 'استكشف أقسام العلوم الشرعية: علوم القرآن، التجويد، العقيدة، الحديث، الفقه، والقراءات العشر.',
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

interface ScienceCategory {
  name: string;
  description: string;
  icon: string;
  gradient: string;
  pill: string;
  dot: string;
  border: string;
}

const SCIENCES: ScienceCategory[] = [
  {
    name: 'علوم القرآن',
    description:
      'منظومة العلوم المتعلقة بالقرآن الكريم من حيث نزوله وجمعه وترتيبه وتفسيره وإعجازه وناسخه ومنسوخه.',
    icon: '📖',
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/10',
    pill: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    dot: 'bg-amber-500',
    border: 'border-amber-200 dark:border-amber-800/40',
  },
  {
    name: 'التجويد',
    description:
      'علم يُعلّم كيفية إخراج كل حرف من مخرجه وإعطاءه حقه ومستحقه من الصفات، وهو واجب في تلاوة القرآن الكريم.',
    icon: '🎙️',
    gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/10',
    pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200 dark:border-emerald-800/40',
  },
  {
    name: 'العقيدة',
    description:
      'أصول الإيمان ومسائل التوحيد والأسماء والصفات وما يجب اعتقاده في الله ورسله وكتبه واليوم الآخر والقدر.',
    icon: '🕌',
    gradient: 'from-violet-50 to-violet-100 dark:from-violet-950/20 dark:to-violet-900/10',
    pill: 'bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300',
    dot: 'bg-violet-500',
    border: 'border-violet-200 dark:border-violet-800/40',
  },
  {
    name: 'الحديث',
    description:
      'علم يُعنى بدراسة السنة النبوية ومصطلح الحديث وأصول الرواية ومعرفة أحوال الرواة والحكم على الأسانيد.',
    icon: '📜',
    gradient: 'from-sky-50 to-sky-100 dark:from-sky-950/20 dark:to-sky-900/10',
    pill: 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
    dot: 'bg-sky-500',
    border: 'border-sky-200 dark:border-sky-800/40',
  },
  {
    name: 'الفقه',
    description:
      'العلم بالأحكام الشرعية العملية المكتسبة من أدلتها التفصيلية، ويشمل العبادات والمعاملات والأحوال الشخصية.',
    icon: '⚖️',
    gradient: 'from-rose-50 to-rose-100 dark:from-rose-950/20 dark:to-rose-900/10',
    pill: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
    dot: 'bg-rose-500',
    border: 'border-rose-200 dark:border-rose-800/40',
  },
  {
    name: 'القراءات العشر',
    description:
      'القراءات القرآنية المتواترة المنقولة عن الأئمة العشرة بأسانيد متصلة إلى النبي ﷺ، وما يترتب عليها من أحكام.',
    icon: '📿',
    gradient: 'from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/10',
    pill: 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300',
    dot: 'bg-teal-500',
    border: 'border-teal-200 dark:border-teal-800/40',
  },
];

export default function SciencesPage() {
  const articles = getArticles();

  const countByCategory = (cat: string) =>
    articles.filter((a) => a.category === cat).length;

  const latestByCategory = (cat: string) =>
    articles
      .filter((a) => a.category === cat)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-card dark:bg-[#0b0f19]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-violet-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-400/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-14 md:py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/20 dark:border-emerald-500/20 bg-amber-50 dark:bg-emerald-950/30 text-amber-800 dark:text-emerald-400 text-xs font-bold mb-5">
            <BookOpen className="w-4 h-4" />
            <span>أقسام العلوم الشرعية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1E1E] dark:text-slate-200 leading-tight tracking-tight">
            استكشف{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-700 dark:from-emerald-400 to-amber-500 dark:to-sky-400">
              العلوم الشرعية
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            اختر قسماً لاستعراض مقالاته وموضوعاته المتخصصة، من علوم القرآن والتجويد إلى الفقه والحديث والقراءات العشر.
          </p>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            إجمالي المقالات المتاحة:{' '}
            <strong className="text-[#1E1E1E] dark:text-slate-300">{articles.length}</strong> مقالة
          </p>
        </div>
      </section>

      {/* ── Sciences Grid ── */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCIENCES.map((science) => {
            const count = countByCategory(science.name);
            const latest = latestByCategory(science.name);

            return (
              <div
                key={science.name}
                className={`group flex flex-col rounded-2xl border ${science.border} bg-gradient-to-br ${science.gradient} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* Card body */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Icon + count row */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl leading-none">{science.icon}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${science.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${science.dot}`} />
                      {count} {count === 1 ? 'مقالة' : 'مقالات'}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="text-xl font-extrabold text-[#1E1E1E] dark:text-slate-100 mb-2">
                    {science.name}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-grow mb-4">
                    {science.description}
                  </p>

                  {/* Latest articles preview */}
                  {latest.length > 0 && (
                    <div className="border-t border-black/5 dark:border-white/5 pt-4 mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
                        أحدث المقالات
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {latest.map((a) => (
                          <li key={a.id}>
                            <Link
                              href={`/articles/${a.id}`}
                              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-emerald-400 transition-colors leading-snug line-clamp-1"
                            >
                              {a.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA footer */}
                <Link
                  href={`/articles?category=${encodeURIComponent(science.name)}`}
                  className="flex items-center justify-between px-6 py-4 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/10 group-hover:bg-white/60 dark:group-hover:bg-black/20 transition-colors"
                >
                  <span className="text-xs font-bold text-[#1E1E1E] dark:text-slate-200 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    استعرض مقالات {science.name}
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-amber-800 dark:group-hover:text-emerald-400 group-hover:-translate-x-1 transition-all" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="border-t border-[var(--border)] bg-card dark:bg-[#0b0f19]">
        <div className="container mx-auto px-4 py-10 text-center">
          <h2 className="text-lg font-extrabold text-[#1E1E1E] dark:text-slate-200 mb-2">
            تصفح جميع المقالات
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            أو ابحث في مكتبتنا الشاملة من العلوم الشرعية
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E1E1E] hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            مكتبة المقالات
          </Link>
        </div>
      </section>
    </div>
  );
}
