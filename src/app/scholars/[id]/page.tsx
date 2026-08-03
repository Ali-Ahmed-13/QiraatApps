'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Quote,
  Library,
  ChevronLeft
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import scholarsData from '@/data/scholars';
import { ScholarsData, Scholar } from 'src/types/scholars';

const data = scholarsData as ScholarsData;

export default function ScholarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const scholarId = resolvedParams.id;

  const scholar: Scholar | undefined = data.scholars.find((s) => s.id === scholarId);

  if (!scholar) {
    notFound();
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-24 pt-8" dir="rtl">

        {/* 🌟 الخلفيات الروحية الزخرفية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.04),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.07),transparent_60%)]" />
          <div className="absolute top-96 left-1/4 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,177,92,0.04),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(231,198,130,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ⬅️ زر العودة وروافد المسار */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/scholars"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary text-xs font-bold text-foreground hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لدليل العلماء</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold text-light-text">
              <Link href="/" className="hover:text-foreground">الرئيسية</Link>
              <span>/</span>
              <Link href="/scholars" className="hover:text-foreground">العلماء والتراجم</Link>
              <span>/</span>
              <span className="text-brand-primary dark:text-[#00B3B7]">{scholar.name}</span>
            </div>
          </div>

          {/* 🌟 هيدر السيرة والتسلسل الهوياتي */}
          <ScrollReveal variant="fade-up">
            <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-10 rounded-[32px] shadow-premium mb-10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                <div className="flex flex-col gap-3 max-w-2xl text-right">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-3 py-1 rounded-full">
                      {scholar.achievement || 'ترجمة علمية'}
                    </span>
                    <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-full">
                      {eraLabel(scholar.era || '')}
                    </span>
                  </div>

                  <h1 className="font-amiri font-bold text-3xl sm:text-5xl text-foreground leading-tight mt-1">
                    {scholar.name || 'عالم جليل'}
                  </h1>

                  {scholar.title && (
                    <p className="text-sm sm:text-base text-brand-primary dark:text-[#00B3B7] font-bold font-tajawal">
                      {scholar.title}
                    </p>
                  )}
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 border border-brand-primary/15 shadow-inner">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

              </div>

              {/* المعطيات التاريخية والبلد */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-light-text font-bold bg-background/60 p-4 rounded-2xl border border-border/40 dark:border-[#212C2C]/40 mt-8">
                {scholar.lifespan && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                    <span>عصر وحياة الإمام: {scholar.lifespan}</span>
                  </span>
                )}
                {scholar.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-brand-secondary shrink-0" />
                    <span>موطن الإقراء: {scholar.location}</span>
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* 📋 العمود الأيمن (الرئيسي): السيرة والتفاصيل والمؤلفات */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* 1. السيرة العلمية المفسرة */}
              <ScrollReveal variant="fade-up" delay={100}>
                <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                  <h2 className="font-amiri font-bold text-2xl text-foreground mb-4 border-r-4 border-brand-primary pr-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-primary" />
                    <span>السيرة والترجمة العلمية المفصلة</span>
                  </h2>
                  <div className="text-2xl sm:text-lg text-muted leading-relaxed font-tajawal font-medium space-y-4 text-justify">
                    {(scholar.fullBiography || scholar.bio || 'تتوفر السيرة الكاملة لهذا الإمام قريباً.')
                      .split('\n\n')
                      .map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* 2. مؤلفات ومنظومات الإمام */}
              {scholar.works && scholar.works.length > 0 && (
                <ScrollReveal variant="fade-up" delay={150}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                    <h2 className="font-amiri font-bold text-2xl text-foreground mb-6 border-r-4 border-brand-secondary pr-3 flex items-center gap-2">
                      <Library className="w-5 h-5 text-brand-secondary" />
                      <span>أبرز التآليف والمنظومات والآثار</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {scholar.works.map((work, wIdx) => (
                        <div key={wIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-background/50 border border-border/50 dark:border-[#212C2C]/50">
                          <div className="w-7 h-7 rounded-lg bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                            {work}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* 3. أقوال العلماء والمأثورات */}
              {scholar.quotes && scholar.quotes.length > 0 && (
                <ScrollReveal variant="fade-up" delay={200}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                    <h2 className="font-amiri font-bold text-2xl text-foreground mb-6 border-r-4 border-brand-primary pr-3 flex items-center gap-2">
                      <Quote className="w-5 h-5 text-brand-primary" />
                      <span>أقوال الأئمة والمأثورات العلمية</span>
                    </h2>
                    <div className="flex flex-col gap-4">
                      {scholar.quotes.map((quote, qIdx) => (
                        <div key={qIdx} className="bg-brand-secondary-light/20 dark:bg-brand-secondary-light/5 border-r-4 border-brand-secondary p-4 rounded-xl text-xs sm:text-sm text-foreground font-amiri leading-relaxed italic">
                          {quote}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            </div>

            {/* 📋 العمود الأيسر (الجانبي): الشيوخ، التلاميذ، والإنجازات */}
            <div className="flex flex-col gap-8">

              {/* إنجازات رئيسية */}
              {scholar.contributions && scholar.contributions.length > 0 && (
                <ScrollReveal variant="fade-up" delay={120}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl text-foreground mb-4 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-brand-secondary" />
                      <span>مآثر وإنجازات كبرى</span>
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {scholar.contributions.map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5 text-xs font-bold text-muted">
                          <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {/* الشيوخ والأشياخ */}
              {scholar.teachers && scholar.teachers.length > 0 && (
                <ScrollReveal variant="fade-up" delay={160}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl text-foreground mb-4 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <GraduationCap className="w-4.5 h-4.5 text-brand-primary" />
                      <span>من شيوخه وأساتذته</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {scholar.teachers.map((tch, tIdx) => (
                        <span key={tIdx} className="text-xs font-bold text-foreground bg-background border border-border/60 dark:border-[#212C2C]/60 px-3 py-1.5 rounded-xl">
                          {tch}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* الرواة والتلاميذ */}
              {scholar.students && scholar.students.length > 0 && (
                <ScrollReveal variant="fade-up" delay={200}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl text-foreground mb-4 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <Users className="w-4.5 h-4.5 text-brand-primary" />
                      <span>من أشهر تلاميذه والرواة عنه</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {scholar.students.map((std, sIdx) => (
                        <span key={sIdx} className="text-xs font-bold text-foreground bg-background border border-border/60 dark:border-[#212C2C]/60 px-3 py-1.5 rounded-xl">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            </div>

          </div>

          {/* دعوة لاستكشاف المكتبة الملحقة */}
          <ScrollReveal variant="fade-up" delay={250}>
            <div className="mt-16 bg-brand-primary-light/40 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-8 text-center max-w-3xl mx-auto shadow-sm">
              <h3 className="font-amiri font-bold text-2xl text-foreground mb-3">تصفّح مؤلفات ومصاحف الإمام في المكتبة</h3>
              <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-medium">
                تتوفر العديد من متون وشروح وتلاوات هذا الإمام الجليل داخل مكتبة تِيجَان الرقمية مجاناً للطلبة والباحثين.
              </p>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium"
              >
                <span>الانتقال للمكتبة الرقمية</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </PageTransition>
  );
}

const eraLabel = (era: string) => {
  switch (era) {
    case 'quraa10': return 'القراء العشرة ورواتهم';
    case 'companions': return 'الصحابة والتابعون';
    case 'classical': return 'الأئمة المتقدمون';
    case 'modern': return 'القراء المعاصرون';
    default: return 'عام';
  }
};
