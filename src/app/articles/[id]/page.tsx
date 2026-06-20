import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Article } from 'src/types/article';
import { ArrowRight, CalendarDays, Clock, User, BookOpen, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'src/data/articles.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Article[];
}

function getArticle(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id);
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    return { title: 'مقالة غير موجودة | تِيجَان' };
  }

  return {
    title: `${article.title} | تِيجَان`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | تِيجَان`,
      description: article.summary,
      siteName: 'تِيجَان',
      locale: 'ar_EG',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

const CATEGORY_STYLES: Record<string, { pill: string; dot: string; accentBar: string }> = {
  'علوم القرآن': {
    pill: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    dot: 'bg-amber-500',
    accentBar: 'from-amber-400 to-amber-600',
  },
  'التجويد': {
    pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    accentBar: 'from-emerald-400 to-emerald-600',
  },
  'العقيدة': {
    pill: 'bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300',
    dot: 'bg-violet-500',
    accentBar: 'from-violet-400 to-violet-600',
  },
  'الحديث': {
    pill: 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
    dot: 'bg-sky-500',
    accentBar: 'from-sky-400 to-sky-600',
  },
  'الفقه': {
    pill: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
    dot: 'bg-rose-500',
    accentBar: 'from-rose-400 to-rose-600',
  },
  'القراءات العشر': {
    pill: 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300',
    dot: 'bg-teal-500',
    accentBar: 'from-teal-400 to-teal-600',
  },
};

const DEFAULT_STYLE = {
  pill: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  dot: 'bg-slate-500',
  accentBar: 'from-slate-400 to-slate-600',
};

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) notFound();

  const style = CATEGORY_STYLES[article.category] ?? DEFAULT_STYLE;
  const allArticles = getArticles();
  const related = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Convert plain newlines to paragraphs for clean rendering
  const paragraphs = article.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    publisher: { '@type': 'Organization', name: 'تِيجَان' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[var(--background)]">
        {/* ── Accent gradient bar ── */}
        <div className={`h-1 w-full bg-gradient-to-l ${style.accentBar}`} />

        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* ── Breadcrumb ── */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors">
              المقالات
            </Link>
            <span>/</span>
            <span className="text-[#1E1E1E] dark:text-slate-300 font-medium line-clamp-1">{article.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

            {/* ── Main Article Column ── */}
            <main>
              {/* Article Header Card */}
              <header className="rounded-2xl border border-[var(--border)] bg-card dark:bg-[#0e1a14] p-6 md:p-8 mb-8 shadow-sm">
                {/* Category */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 ${style.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1E1E] dark:text-slate-100 leading-snug mb-5">
                  {article.title}
                </h1>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-r-4 border-amber-400 dark:border-emerald-500 pr-4 mb-6">
                  {article.summary}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-[var(--border)]">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
              </header>

              {/* Article Body */}
              <article className="rounded-2xl border border-[var(--border)] bg-card dark:bg-[#0e1a14] p-6 md:p-10 shadow-sm">
                <div className="space-y-5">
                  {paragraphs.map((paragraph, i) => {
                    // Detect headings (starts with Arabic number or "أولاً" / "ثانياً" etc.)
                    const isHeading =
                      /^(أولاً|ثانياً|ثالثاً|رابعاً|خامساً|سادساً|سابعاً|أ\.|ب\.|ج\.|\d+[\.\-])/.test(
                        paragraph
                      );
                    const isBullet = paragraph.startsWith('-');

                    if (isHeading) {
                      return (
                        <h2
                          key={i}
                          className="text-lg font-extrabold text-[#1E1E1E] dark:text-slate-100 mt-8 mb-3 pr-3 border-r-4 border-amber-500 dark:border-emerald-500"
                        >
                          {paragraph}
                        </h2>
                      );
                    }

                    if (isBullet) {
                      return (
                        <li
                          key={i}
                          className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-loose list-none flex gap-2"
                        >
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                          {paragraph.replace(/^-\s*/, '')}
                        </li>
                      );
                    }

                    return (
                      <p
                        key={i}
                        className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-[2] text-justify"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>

              {/* Back Button */}
              <div className="mt-8">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-card dark:bg-[#0e1a14] text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-emerald-400 hover:border-amber-400 dark:hover:border-emerald-500 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                  العودة إلى جميع المقالات
                </Link>
              </div>
            </main>

            {/* ── Sidebar ── */}
            <aside className="flex flex-col gap-6">
              {/* Related articles */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-[var(--border)] bg-card dark:bg-[#0e1a14] p-5 shadow-sm">
                  <h3 className="text-sm font-extrabold text-[#1E1E1E] dark:text-slate-200 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600 dark:text-emerald-400" />
                    مقالات ذات صلة
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {related.map((rel) => (
                      <li key={rel.id}>
                        <Link
                          href={`/articles/${rel.id}`}
                          className="group block text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-emerald-400 transition-colors leading-snug"
                        >
                          {rel.title}
                        </Link>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {rel.readTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick info box */}
              <div className="rounded-2xl border border-[var(--border)] bg-amber-50/60 dark:bg-emerald-950/20 p-5 shadow-sm">
                <h3 className="text-xs font-extrabold text-amber-800 dark:text-emerald-400 mb-3 uppercase tracking-wide">
                  عن هذه المقالة
                </h3>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 shrink-0" />
                    <span>{article.category}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>وقت القراءة: {article.readTime}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                    <span>{formatDate(article.date)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span>{article.author}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
