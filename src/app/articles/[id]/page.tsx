import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText,
  ArrowRight,
  User,
  Calendar,
  Clock,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Bookmark,
  Share2
} from 'lucide-react';
import { getArticleById, getCategoryLabel, getRelatedArticles } from 'src/utils/articleHelper';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'المقال غير موجود | تِيجَان',
    };
  }

  const titleText = article.title || 'مقال علمي';
  const snippet = article.excerpt || article.content?.substring(0, 150) || 'مقال تأصيلي في العلوم الشرعية والقرآن الكريم.';

  return {
    title: `${titleText} | منصة تِيجَان`,
    description: snippet,
    openGraph: {
      title: titleText,
      description: snippet,
      type: 'article',
      url: `https://tijan.app/articles/${article.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: snippet,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(article.category);
  const relatedArticles = getRelatedArticles(article, 3);
  const titleText = article.title || 'مقال علمي';
  const authorText = article.author || 'لجنة الإشراف العلمي';
  const dateText = article.date || 'شوال 1447 هـ';
  const readTimeText = article.readTime || '5 دقائق';
  const contentText = article.content || article.excerpt || '';

  // البيانات المنظمة (JSON-LD Article Schema) لنتائج جوجل الغنية
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titleText,
    description: article.excerpt || snippetText(contentText),
    author: {
      '@type': 'Person',
      name: authorText,
    },
    publisher: {
      '@type': 'Organization',
      name: 'منصة تِيجَان للعلوم الشرعية',
    },
    datePublished: dateText,
  };

  return (
    <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
      {/* سكريبت SEO المحقون */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* خلفية زخرفية راقية */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* 🌟 مسار التنقل والعودة */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link href="/articles" className="hover:text-brand-primary transition-colors">
              المقالات والبحوث
            </Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-bold truncate max-w-[180px] sm:max-w-xs">
              {titleText}
            </span>
          </nav>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground text-xs font-bold transition-all shadow-xs"
          >
            <ArrowRight className="w-4 h-4 text-brand-primary" />
            <span>العودة لكافة المقالات</span>
          </Link>
        </div>

        {/* 🌟 بطاقة المقال الفاخرة */}
        <article className="bg-card border border-border dark:border-[#212C2C] rounded-[32px] p-6 sm:p-10 shadow-premium mb-12 relative overflow-hidden">
          
          {/* شارات التصنيف وقت القراءة */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-border/50 dark:border-[#212C2C]/50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold border border-brand-primary/10 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-brand-secondary" />
                <span>{categoryLabel}</span>
              </span>
              <span className="text-[11px] font-bold text-light-text bg-border/20 dark:bg-[#212C2C]/50 px-2.5 py-1 rounded-lg">
                معرّف المقال: {article.id}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted font-bold">
              <Clock className="w-4 h-4 text-brand-secondary" />
              <span>وقت القراءة: {readTimeText}</span>
            </div>
          </div>

          {/* العنوان الرئيسي للمقال */}
          <h1 className="font-amiri font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-6">
            {titleText}
          </h1>

          {/* معلومات الكاتب والتاريخ */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted font-bold bg-background/60 p-4 rounded-2xl border border-border/40 dark:border-[#212C2C]/40 mb-8">
            <span className="flex items-center gap-2 text-foreground">
              <User className="w-4 h-4 text-brand-primary shrink-0" />
              <span>بقلم: <strong className="text-brand-primary font-bold">{authorText}</strong></span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-secondary shrink-0" />
              <span>تاريخ النشر: {dateText}</span>
            </span>
          </div>

          {/* الملخص التنفيذي للمقال */}
          {article.excerpt && (
            <div className="bg-brand-primary-light/20 dark:bg-brand-primary-light/5 border-r-4 border-brand-primary p-5 rounded-2xl mb-8">
              <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] block mb-1">خلاصة البحث:</span>
              <p className="text-xs sm:text-sm font-tajawal font-medium text-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* متن ونص المقال المفصل */}
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base font-tajawal font-medium leading-relaxed text-foreground space-y-6 text-justify">
            {contentText.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-loose">
                {paragraph}
              </p>
            ))}
          </div>

          {/* الكلمات المفتاحية والتاجات */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border/50 dark:border-[#212C2C]/50">
              <span className="text-xs font-bold text-muted block mb-3">الكلمات المفتاحية والموضوعات:</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/40 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-xl"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* 🌟 المقالات ذات الصلة */}
        {relatedArticles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-brand-secondary" />
              <h2 className="font-amiri font-bold text-xl sm:text-2xl text-foreground">
                مقالات وبحوث ذات صلة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.id}`}
                  className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/40 rounded-2xl p-5 shadow-xs hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/40 dark:bg-brand-primary-light/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {getCategoryLabel(rel.category)}
                    </span>
                    <h3 className="font-amiri font-bold text-base text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-3">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2 font-medium leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-brand-primary dark:text-[#00B3B7] pt-3 border-t border-border/40 dark:border-[#212C2C]/40">
                    <span>قراءة البحث</span>
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

function snippetText(text: string): string {
  if (!text) return '';
  return text.length > 150 ? `${text.substring(0, 147)}...` : text;
}
