'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
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
  ChevronLeft,
  Bookmark
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import scholarsData from '@/data/scholars';
import { ScholarsData, Scholar } from 'src/types/scholars';
import { getStudentData, toggleFavoriteBook } from '@/utils/studentSync';
import AuthModal from '@/components/ui/AuthModal';
import {
  ReadingSidebar,
  useReadingPreferences
} from 'src/components/ui/ReadingSettings';

const data = scholarsData as ScholarsData;

export default function ScholarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const scholarId = resolvedParams.id;
  const { user } = useUser();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    preferences,
    updatePreferences,
    resetPreferences,
    fontSizeClass,
    fontFamilyClass,
    lineHeightClass,
    themeClass,
  } = useReadingPreferences();

  const scholar: Scholar | undefined = data.scholars.find((s) => s.id === scholarId);

  const scholarTitle = scholar ? `ترجمة: ${scholar.name}` : '';

  useEffect(() => {
    if (user && scholarTitle) {
      const studentData = getStudentData(user);
      setIsFav((studentData.favorites || []).includes(scholarTitle));
    }
  }, [user, scholarTitle]);

  if (!scholar) {
    notFound();
  }

  const handleToggleFav = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const nextState = !isFav;
    setIsFav(nextState);
    setToastMessage(nextState ? `تمت إضافة ترجمة "${scholar.name}" إلى مفضلتك 🔖` : 'تمت الإزالة من المفضلة');
    setTimeout(() => setToastMessage(null), 3000);

    toggleFavoriteBook(user, scholarTitle);
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-24 pt-8" dir="rtl">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          title="تسجيل الدخول مطلوب 🔐"
          description="لحفظ تراجم العلماء وسير الأئمة في مفضلتك وبوابة الطالب، يرجى تسجيل الدخول أولاً."
        />

        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-brand-primary text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-brand-secondary" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* 🌟 الخلفيات الروحية الزخرفية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.04),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.07),transparent_60%)]" />
          <div className="absolute top-96 left-1/4 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,177,92,0.04),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(231,198,130,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 🖨️ ترويسة أنيقة تظهر فقط عند الطباعة على الورق */}
          <div className="hidden print:flex items-center justify-between border-b-2 border-brand-primary pb-4 mb-6" dir="rtl">
            <div>
              <span className="font-amiri font-bold text-xl text-black block">منصة تِيجَان للعلوم الشرعية</span>
              <span className="text-xs text-gray-600 font-bold">دليل الأئمة والعلماء وتراجم القراء | {scholar.name}</span>
            </div>
            <div className="text-left text-xs text-gray-500 font-mono">
              <span>{eraLabel(scholar.era || '')}</span>
            </div>
          </div>

          {/* ⬅️ زر العودة وروافد المسار */}
          <div className="flex items-center justify-between mb-8 no-print print:hidden">
            <Link
              href="/scholars"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary text-xs sm:text-sm font-bold text-foreground hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لدليل العلماء</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleFav}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isFav
                    ? 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/40'
                    : 'bg-card border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground'
                }`}
                title={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              >
                <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current text-brand-secondary' : ''}`} />
                <span>{isFav ? 'في المفضلة' : 'حفظ الترجمة'}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-bold text-light-text">
                <Link href="/" className="hover:text-foreground">الرئيسية</Link>
                <span>/</span>
                <Link href="/scholars" className="hover:text-foreground">العلماء والتراجم</Link>
                <span>/</span>
                <span className="text-brand-primary dark:text-[#00B3B7]">{scholar.name}</span>
              </div>
            </div>
          </div>

          {/* 🌟 هيدر السيرة والتسلسل الهوياتي */}
          <ScrollReveal variant="fade-up">
            <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-10 lg:p-12 rounded-[32px] shadow-premium mb-10 relative overflow-hidden print:shadow-none print:border-none print:p-0 print:mb-6 print:bg-transparent">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                <div className="flex flex-col gap-3 max-w-4xl text-right">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-black text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-3.5 py-1.5 rounded-full print:border-none print:bg-transparent print:p-0">
                      {scholar.achievement || 'ترجمة علمية'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3.5 py-1.5 rounded-full print:border-none print:bg-transparent print:p-0">
                      {eraLabel(scholar.era || '')}
                    </span>
                  </div>

                  <h1 className="font-amiri font-bold text-3xl sm:text-5xl lg:text-6xl text-foreground leading-tight mt-1 print:text-black print:text-3xl">
                    {scholar.name || 'عالم جليل'}
                  </h1>

                  {scholar.title && (
                    <p className="text-base sm:text-lg lg:text-xl text-brand-primary dark:text-[#00B3B7] font-bold font-tajawal print:text-gray-700">
                      {scholar.title}
                    </p>
                  )}
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 border border-brand-primary/15 shadow-inner no-print print:hidden">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
                </div>

              </div>

              {/* المعطيات التاريخية والبلد */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-8 text-sm sm:text-base text-foreground/85 font-bold bg-background/60 p-4 sm:p-5 rounded-2xl border border-border/40 dark:border-[#212C2C]/40 mt-8 print:bg-transparent print:border-none print:p-0 print:mt-3">
                {scholar.lifespan && (
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>عصر وحياة الإمام: {scholar.lifespan}</span>
                  </span>
                )}
                {scholar.location && (
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-brand-secondary shrink-0" />
                    <span>موطن الإقراء: {scholar.location}</span>
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* 🌟 تخطيط القراءة: لوحة إعدادات الخط في اليمين (RTL) مع السيرة والمحتوى */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 📋 العمود الأيمن في RTL: لوحة تخصيص القراءة وحجم الخط */}
            <div className="w-full lg:w-64 xl:w-72 2xl:w-80 shrink-0 no-print print:hidden">
              <ReadingSidebar
                preferences={preferences}
                onUpdatePreferences={updatePreferences}
                onReset={resetPreferences}
                title={scholar.name}
              />
            </div>

            {/* 📋 باقي المحتوى: السيرة والمؤلفات والأشياخ والتلاميذ */}
            <div className="flex-1 min-w-0 grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

              {/* 📋 العمود الرئيسي: السيرة والتفاصيل والمؤلفات */}
              <div className="xl:col-span-2 flex flex-col gap-8">

                {/* 1. السيرة العلمية المفسرة */}
                <ScrollReveal variant="fade-up" delay={100}>
                  <div className={`bg-card border border-border dark:border-[#212C2C] p-6 sm:p-10 rounded-[28px] shadow-premium transition-all duration-300 ${themeClass}`}>
                    <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground mb-6 border-r-4 border-brand-primary pr-3 flex items-center gap-2.5">
                      <BookOpen className="w-6 h-6 text-brand-primary" />
                      <span>السيرة والترجمة العلمية المفصلة</span>
                    </h2>
                    <div className={`text-foreground/95 space-y-6 text-justify transition-all duration-200 ${fontSizeClass} ${fontFamilyClass} ${lineHeightClass}`}>
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
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-10 rounded-[28px] shadow-premium">
                    <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground mb-6 border-r-4 border-brand-secondary pr-3 flex items-center gap-2.5">
                      <Library className="w-6 h-6 text-brand-secondary" />
                      <span>أبرز التآليف والمنظومات والآثار</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scholar.works.map((work, wIdx) => (
                        <div key={wIdx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-background/60 border border-border/60 dark:border-[#212C2C]/60 hover:border-brand-secondary/40 transition-colors">
                          <div className="w-8 h-8 rounded-xl bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-sm sm:text-base font-bold text-foreground leading-snug">
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
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-10 rounded-[28px] shadow-premium">
                    <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground mb-6 border-r-4 border-brand-primary pr-3 flex items-center gap-2.5">
                      <Quote className="w-6 h-6 text-brand-primary" />
                      <span>أقوال الأئمة والمأثورات العلمية</span>
                    </h2>
                    <div className="flex flex-col gap-4">
                      {scholar.quotes.map((quote, qIdx) => (
                        <div key={qIdx} className="bg-brand-secondary-light/20 dark:bg-brand-secondary-light/5 border-r-4 border-brand-secondary p-5 sm:p-6 rounded-2xl text-base sm:text-lg text-foreground font-amiri leading-[2.3] italic">
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
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl sm:text-2xl text-foreground mb-5 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-secondary" />
                      <span>مآثر وإنجازات كبرى</span>
                    </h3>
                    <ul className="flex flex-col gap-3.5">
                      {scholar.contributions.map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-3 text-sm sm:text-base font-bold text-foreground/90">
                          <Sparkles className="w-4 h-4 text-brand-secondary shrink-0 mt-1" />
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
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl sm:text-2xl text-foreground mb-5 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-brand-primary" />
                      <span>من شيوخه وأساتذته</span>
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {scholar.teachers.map((tch, tIdx) => (
                        <span key={tIdx} className="text-xs sm:text-sm font-bold text-foreground bg-background border border-border/60 dark:border-[#212C2C]/60 px-3.5 py-2 rounded-xl">
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
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium">
                    <h3 className="font-amiri font-bold text-xl sm:text-2xl text-foreground mb-5 pb-3 border-b border-border/60 dark:border-[#212C2C]/60 flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-primary" />
                      <span>من أشهر تلاميذه والرواة عنه</span>
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {scholar.students.map((std, sIdx) => (
                        <span key={sIdx} className="text-xs sm:text-sm font-bold text-foreground bg-background border border-border/60 dark:border-[#212C2C]/60 px-3.5 py-2 rounded-xl">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            </div>

          </div>
          </div>

          {/* دعوة لاستكشاف المكتبة الملحقة */}
          <ScrollReveal variant="fade-up" delay={250}>
            <div className="mt-16 bg-brand-primary-light/40 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-8 text-center max-w-3xl mx-auto shadow-sm no-print print:hidden">
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
