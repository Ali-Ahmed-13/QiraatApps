'use client';

import React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { Fatwa } from 'src/types/fatwas';
import FatwaActions from 'src/components/fatwas/FatwaActions';
import {
  ReadingSidebar,
  useReadingPreferences
} from 'src/components/ui/ReadingSettings';

interface FatwaReaderProps {
  fatwa: Fatwa;
  categoryLabel: string;
  relatedFatwas: Fatwa[];
}

export default function FatwaReader({
  fatwa,
  categoryLabel,
  relatedFatwas,
}: FatwaReaderProps) {
  const {
    preferences,
    updatePreferences,
    resetPreferences,
    fontSizeClass,
    fontFamilyClass,
    lineHeightClass,
    themeClass,
  } = useReadingPreferences();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 🖨️ ترويسة أنيقة تظهر فقط عند الطباعة على الورق */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-brand-primary pb-4 mb-6" dir="rtl">
        <div>
          <span className="font-amiri font-bold text-xl text-black block">منصة تِيجَان للعلوم الشرعية</span>
          <span className="text-xs text-gray-600 font-bold">أرشيف الفتاوى والمسائل المحررة | {categoryLabel}</span>
        </div>
        <div className="text-left text-xs text-gray-500 font-mono">
          <span>مسألة رقم: {fatwa.id}</span>
        </div>
      </div>

      {/* 🌟 1. مسار التنقل العلوي (Breadcrumbs) والعودة */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 no-print print:hidden">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/fatwas" className="hover:text-brand-primary transition-colors">
            أرشيف الفتاوى والمسائل
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-foreground font-bold truncate max-w-[200px] sm:max-w-xs">
            مسألة {fatwa.id}
          </span>
        </nav>

        <Link
          href="/fatwas"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground text-xs sm:text-sm font-bold transition-all shadow-xs"
        >
          <ArrowRight className="w-4 h-4 text-brand-primary" />
          <span>العودة لأرشيف الفتاوى</span>
        </Link>
      </div>

      {/* 🌟 التخطيط ثنائي الأعمدة: لوحة الإعدادات في اليمين (RTL) والمحتوى في اليسار */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* 📋 العمود الأيمن في RTL: لوحة تخصيص القراءة والخط */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0 no-print print:hidden">
          <ReadingSidebar
            preferences={preferences}
            onUpdatePreferences={updatePreferences}
            onReset={resetPreferences}
          />
        </div>

        {/* 📖 العمود الأيسر في RTL: بطاقة الفتوى ومحتوى السؤال والجواب */}
        <div className="flex-1 min-w-0 print:w-full">
          <article
            className={`bg-card border border-border dark:border-[#212C2C] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-premium mb-12 transition-all duration-300 print:shadow-none print:border-none print:p-0 print:m-0 print:bg-transparent ${themeClass}`}
          >
            {/* شارات الهوية والتصنيف */}
            <div className="flex items-center justify-between gap-4 mb-8 border-b border-border/50 dark:border-[#212C2C]/50 pb-6 print:mb-4 print:pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs sm:text-sm font-bold border border-brand-primary/10 flex items-center gap-1.5 print:border-none print:bg-transparent print:p-0">
                  <Bookmark className="w-4 h-4 no-print print:hidden" />
                  <span>{categoryLabel}</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-light-text bg-border/20 dark:bg-[#212C2C]/50 px-3 py-1 rounded-lg print:border-none print:bg-transparent print:p-0">
                  مسألة {fatwa.id}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 print:border-none print:bg-transparent">
                <CheckCircle2 className="w-4 h-4 no-print print:hidden" />
                <span>فتوى محررة ومراجعة</span>
              </div>
            </div>

            {/* نص السؤال */}
            <div className="flex items-start gap-4 sm:gap-5 mb-10 print:mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 mt-1 shadow-sm no-print print:hidden">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] block mb-2 print:text-black">
                  السؤال والمسألة الشرعية:
                </span>
                <h1 className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-snug print:text-black print:text-2xl">
                  {fatwa.question}
                </h1>
              </div>
            </div>

            {/* نص الجواب المحرر مع التحكم بحجم ونوع الخط وتباعد الأسطر */}
            <div className="bg-background/50 dark:bg-[#0B0E0E]/40 border border-border/80 dark:border-[#212C2C]/80 rounded-[24px] p-6 sm:p-10 mb-8 relative overflow-hidden print:border-none print:p-0 print:m-0 print:bg-transparent">
              <div className="absolute top-0 right-0 w-2.5 h-full bg-brand-primary rounded-r-2xl no-print print:hidden" />
              
              <h2 className="text-sm sm:text-base font-bold text-brand-primary dark:text-[#00B3B7] mb-5 flex items-center gap-2 print:text-black print:mb-2">
                <BookOpen className="w-5 h-5 text-brand-secondary no-print print:hidden" />
                <span>الجواب والتحقيق العلمي:</span>
              </h2>

              <p
                className={`font-medium text-foreground/95 whitespace-pre-line text-justify transition-all duration-200 ${fontSizeClass} ${fontFamilyClass} ${lineHeightClass}`}
              >
                {fatwa.answer}
              </p>

              {/* المصدر والتوثيق */}
              <div className="mt-10 pt-5 border-t border-border/40 dark:border-[#212C2C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-foreground/80 font-bold">
                <div className="flex items-center gap-2 text-brand-secondary font-bold text-sm sm:text-base">
                  <BookOpen className="w-4.5 h-4.5" />
                  <span>المصدر العلمي: {fatwa.reference}</span>
                </div>
                <span className="text-xs sm:text-sm text-light-text font-medium">
                  تم التحرير بواسطة لجنة الإشراف العلمي
                </span>
              </div>
            </div>

            {/* أفعال المشاركة والنسخ */}
            <div className="no-print print:hidden">
              <FatwaActions fatwa={fatwa} />
            </div>
          </article>

          {/* 🌟 3. قسم الفتاوى ذات الصلة الذكية (Smart Related Fatwas) */}
          {relatedFatwas.length > 0 && (
            <section className="mb-16 no-print print:hidden">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-brand-secondary" />
                <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground">
                  مسائل وفتاوى ذات صلة
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedFatwas.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/fatwas/${rel.id}`}
                    className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/50 rounded-[22px] p-6 shadow-xs hover:shadow-premium transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-md mb-3 inline-block">
                        {categoryLabel}
                      </span>
                      <h3 className="font-amiri font-bold text-lg sm:text-xl text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-3">
                        {rel.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/75 line-clamp-3 font-medium font-tajawal leading-relaxed mb-4">
                        {rel.answer}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] pt-4 border-t border-border/40 dark:border-[#212C2C]/40">
                      <span>عرض الفتوى</span>
                      <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 🌟 4. بطاقة السؤال المباشر والتواصل */}
          <div className="bg-brand-primary-light/30 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm no-print print:hidden">
            <HelpCircle className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h3 className="font-amiri font-bold text-xl text-foreground mb-2">
              لم تجد إجابة مسألتك الفقهية؟
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-medium">
              يمكنك تدوين سؤالك وإرساله مباشرة إلى لجنة التدقيق العلمي بمنصة تِيجَان للحصول على جواب محرّر بالدليل والمصدر.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium transition-all"
            >
              <span>أرسل مسألتك الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
