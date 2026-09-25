'use client';

import React from 'react';
import Link from 'next/link';
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
import { Article } from 'src/types/articles';
import {
  ReadingSidebar,
  useReadingPreferences
} from 'src/components/ui/ReadingSettings';

interface ArticleReaderProps {
  article: Article;
  categoryLabel: string;
  relatedArticles: Article[];
}

export default function ArticleReader({
  article,
  categoryLabel,
  relatedArticles,
}: ArticleReaderProps) {
  const {
    preferences,
    updatePreferences,
    resetPreferences,
    fontSizeClass,
    fontFamilyClass,
    lineHeightClass,
    themeClass,
  } = useReadingPreferences();

  const titleText = article.title || 'مقال علمي';
  const authorText = article.author || 'لجنة الإشراف العلمي';
  const dateText = article.date || 'شوال 1447 هـ';
  const readTimeText = article.readTime || '5 دقائق';
  const contentText = article.content || article.excerpt || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 🖨️ ترويسة أنيقة تظهر فقط عند الطباعة على الورق */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-brand-primary pb-4 mb-6" dir="rtl">
        <div>
          <span className="font-amiri font-bold text-xl text-black block">منصة تِيجَان للعلوم الشرعية</span>
          <span className="text-xs text-gray-600 font-bold">المقالات والبحوث التأصيلية | {categoryLabel}</span>
        </div>
        <div className="text-left text-xs text-gray-500 font-mono">
          <span>معرّف المقال: {article.id}</span>
        </div>
      </div>

      {/* 🌟 مسار التنقل والعودة */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 no-print print:hidden">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/articles" className="hover:text-brand-primary transition-colors">
            المقالات والبحوث
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-foreground font-bold truncate max-w-[200px] sm:max-w-xs">
            {titleText}
          </span>
        </nav>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground text-xs sm:text-sm font-bold transition-all shadow-xs"
        >
          <ArrowRight className="w-4 h-4 text-brand-primary" />
          <span>العودة لكافة المقالات</span>
        </Link>
      </div>

      {/* 🌟 التخطيط ثنائي الأعمدة: اللوحة في اليمين (RTL) والمحتوى في اليسار */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* 📋 العمود الأيمن في RTL: لوحة تخصيص القراءة والخط */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0 no-print print:hidden">
          <ReadingSidebar
            preferences={preferences}
            onUpdatePreferences={updatePreferences}
            onReset={resetPreferences}
            readTime={readTimeText}
          />
        </div>

        {/* 📖 العمود الأيسر في RTL: بطاقة المقال والمحتوى العلمي */}
        <div className="flex-1 min-w-0 print:w-full">
          <article
            className={`bg-card border border-border dark:border-[#212C2C] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-premium mb-12 relative overflow-hidden transition-all duration-300 print:shadow-none print:border-none print:p-0 print:m-0 print:bg-transparent ${themeClass}`}
          >
            {/* شارات التصنيف ووقت القراءة */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50 dark:border-[#212C2C]/50 print:mb-4 print:pb-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs sm:text-sm font-bold border border-brand-primary/10 flex items-center gap-1.5 print:border-none print:bg-transparent print:p-0">
                  <Bookmark className="w-4 h-4 text-brand-secondary no-print print:hidden" />
                  <span>{categoryLabel}</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-light-text bg-border/20 dark:bg-[#212C2C]/50 px-3 py-1 rounded-lg print:border-none print:bg-transparent print:p-0">
                  معرّف المقال: {article.id}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted font-bold print:text-black">
                <Clock className="w-4 h-4 text-brand-secondary no-print print:hidden" />
                <span>وقت القراءة: {readTimeText}</span>
              </div>
            </div>

            {/* العنوان الرئيسي للمقال */}
            <h1 className="font-amiri font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.35] mb-8">
              {titleText}
            </h1>

            {/* معلومات الكاتب والتاريخ */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm sm:text-base text-foreground/85 font-bold bg-background/60 p-4 sm:p-5 rounded-2xl border border-border/40 dark:border-[#212C2C]/40 mb-8 print:bg-transparent print:border-none print:p-0 print:mb-4">
              <span className="flex items-center gap-2.5">
                <User className="w-5 h-5 text-brand-primary shrink-0 no-print print:hidden" />
                <span>بقلم: <strong className="text-brand-primary font-bold print:text-black">{authorText}</strong></span>
              </span>
              <span className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-brand-secondary shrink-0 no-print print:hidden" />
                <span>تاريخ النشر: {dateText}</span>
              </span>
            </div>

            {/* الملخص التنفيذي للمقال */}
            {article.excerpt && (
              <div className="bg-brand-primary-light/20 dark:bg-brand-primary-light/5 border-r-4 border-brand-primary p-6 rounded-2xl mb-10 print:bg-transparent print:p-0 print:border-r-2 print:border-black print:mb-6">
                <span className="text-sm sm:text-base font-bold text-brand-primary dark:text-[#00B3B7] block mb-2 print:text-black">خلاصة البحث:</span>
                <p className="text-base sm:text-lg lg:text-xl font-tajawal font-medium text-foreground/90 leading-relaxed print:text-black">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* متن ونص المقال المفصل مع التحكم الديناميكي بالحجم ونوع الخط والتباعد */}
            <div
              className={`prose dark:prose-invert max-w-none font-medium text-foreground/95 space-y-8 text-justify transition-all duration-200 print:text-black ${fontSizeClass} ${fontFamilyClass} ${lineHeightClass}`}
            >
              {contentText.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* الكلمات المفتاحية والتاجات */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-border/50 dark:border-[#212C2C]/50 no-print print:hidden">
                <span className="text-sm font-bold text-muted block mb-3">الكلمات المفتاحية والموضوعات:</span>
                <div className="flex flex-wrap gap-2.5">
                  {article.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3.5 py-1.5 rounded-xl"
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
            <section className="mb-16 no-print print:hidden">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-brand-secondary" />
                <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground">
                  مقالات وبحوث ذات صلة
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.id}`}
                    className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/50 rounded-[22px] p-6 shadow-xs hover:shadow-premium transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-md mb-3 inline-block">
                        {categoryLabel}
                      </span>
                      <h3 className="font-amiri font-bold text-lg sm:text-xl text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-3">
                        {rel.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/75 line-clamp-3 font-medium font-tajawal leading-relaxed mb-4">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] pt-4 border-t border-border/40 dark:border-[#212C2C]/40">
                      <span>قراءة البحث</span>
                      <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
