'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Video,
  Download,
  ChevronDown,
  Smartphone,
  Lock,
  CheckCircle2,
  Unlock,
  PartyPopper,
  ChevronLeft
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import booksData from '@/data/books';
import { Book } from 'src/utils/bookHelper';
import type { SoftwareResource } from 'src/types/software';
import {
  sciencesData,
  aliasMap,
  getLevelSlug,
  parseLevelIndex,
  isPlaceholderHref,
  PdfFile
} from '@/data/sciencesData';
import { useLevelProgress } from 'src/hooks/useLevelProgress';

export default function LevelDetailPage({
  params
}: {
  params: Promise<{ scienceId: string; levelId: string }>;
}) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.scienceId;
  const rawLevelSlug = resolvedParams.levelId;

  const targetKey = aliasMap[rawId] || rawId;
  const science = sciencesData[targetKey];
  const router = useRouter();

  const currentLevelIndex = parseLevelIndex(rawLevelSlug);
  const { isLoaded, isLevelUnlocked, isLevelCompleted, toggleLevelCompletion } = useLevelProgress();

  const [softwareCatalog, setSoftwareCatalog] = useState<SoftwareResource[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let isMounted = true;
    import('@/data/softwareData.json')
      .then((m) => {
        if (isMounted) setSoftwareCatalog(m.default as SoftwareResource[]);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  if (!science) {
    notFound();
  }

  // التأكد من صحة الفهرس للمستوى
  if (currentLevelIndex < 0 || currentLevelIndex >= science.levels.length) {
    notFound();
  }

  const level = science.levels[currentLevelIndex];
  const unlocked = isLevelUnlocked(targetKey, currentLevelIndex);
  const completed = isLevelCompleted(targetKey, currentLevelIndex);
  const hasNextLevel = currentLevelIndex + 1 < science.levels.length;
  const nextLevelSlug = hasNextLevel ? getLevelSlug(currentLevelIndex + 1) : null;

  const hasYoutube = !isPlaceholderHref(level.youtubeUrl);
  const hasMultiplePdfs = Array.isArray(level.pdfUrl) && level.pdfUrl.length > 0;
  const hasSinglePdf = typeof level.pdfUrl === 'string' && !isPlaceholderHref(level.pdfUrl);

  const matchedApp = level.companionAppId
    ? softwareCatalog.find((a) => a.id === level.companionAppId)
    : null;

  const matchedBook = level.bookId
    ? (booksData as Book[]).find((b) => b.id === level.bookId)
    : null;

  const handleToggleCompletion = () => {
    const isNowCompleted = toggleLevelCompletion(targetKey, currentLevelIndex);
    if (isNowCompleted) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        {/* خلفية جمالية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رابط العودة لكافة العلوم */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/sciences"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-muted hover:text-foreground hover:bg-border/20 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لكافة العلوم الشرعية</span>
            </Link>

            <span className="text-xs font-bold text-muted font-tajawal">
              {science.name}
            </span>
          </div>

          {/* ترويسة العلم */}
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-3 border border-brand-primary/10">
              <GraduationCap className="w-4 h-4" />
              <span>المسار التعليمي المنهجي</span>
            </div>
            <h1 className="font-amiri text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {science.name}
            </h1>
            <p className="text-xs sm:text-sm font-amiri font-bold text-brand-secondary dark:text-[#E7C682] mt-1">
              «{science.motto}»
            </p>
          </div>

          {/* 🌟 شريط التنقل بين المستويات (Level Selector Tabs) */}
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="bg-card border border-border/80 dark:border-[#212C2C] p-2 rounded-2xl shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
              {science.levels.map((lvl, idx) => {
                const slug = getLevelSlug(idx);
                const isCurrent = idx === currentLevelIndex;
                const isUnlocked = isLevelUnlocked(targetKey, idx);
                const isComp = isLevelCompleted(targetKey, idx);

                return (
                  <Link
                    key={idx}
                    href={`/sciences/${rawId}/${slug}`}
                    className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl font-tajawal text-xs font-bold flex items-center justify-center gap-2 transition-all text-center ${
                      isCurrent
                        ? 'bg-brand-primary text-white shadow-md'
                        : isUnlocked
                        ? 'bg-background hover:bg-border/30 text-foreground border border-border/50'
                        : 'bg-background/40 text-muted opacity-70 border border-border/30 cursor-not-allowed'
                    }`}
                  >
                    {isComp ? (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />
                    ) : isUnlocked ? (
                      <Unlock className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-brand-primary'}`} />
                    ) : (
                      <Lock className="w-3.5 h-3.5 shrink-0 text-muted" />
                    )}
                    <span className="truncate">المستوى {idx + 1}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 🔒 عرض حالة المستوى المغلق إذا لم يفتح بعد */}
          {isLoaded && !unlocked ? (
            <ScrollReveal variant="fade-up">
              <div className="bg-card border border-amber-500/30 dark:border-amber-500/20 p-8 sm:p-12 rounded-[28px] shadow-premium text-center max-w-2xl mx-auto my-8 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-5 border border-amber-500/20">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="font-amiri font-bold text-2xl text-foreground mb-3">
                  هذا المستوى مغلق حالياً 🔒
                </h2>
                <p className="text-xs sm:text-sm text-muted font-tajawal font-medium leading-relaxed mb-6">
                  يُشترط للتدرج المنهجي إتمام دراسة <strong className="text-foreground">المستوى {currentLevelIndex}</strong> أولاً، ثم الضغط على زر <span className="text-brand-primary">«أتممت هذا المستوى»</span> لفتح هذا المستوى تلقائياً.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/sciences/${rawId}/${getLevelSlug(currentLevelIndex - 1)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>الانتقال للمستوى {currentLevelIndex} (المفتوح)</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            /* 🟢 عرض محتوى المستوى المفتوح */
            <ScrollReveal variant="fade-up">
              <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium relative overflow-hidden max-w-4xl mx-auto">
                {/* رأس بطاقة المستوى */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/60 dark:border-[#212C2C]/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-full">
                      {level.name}
                    </span>

                    {completed && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        مكتمل بنجاح
                      </span>
                    )}

                    {matchedBook && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                        متوفر بالمكتبة الرقمية
                      </span>
                    )}
                    {matchedApp && (
                      <span className="text-[10px] font-bold text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light/40 dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-2.5 py-0.5 rounded-md">
                        مصحوب بتطبيق مساند 📱
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-muted">
                    المستوى {currentLevelIndex + 1} من {science.levels.length}
                  </span>
                </div>

                {/* عنوان المتن والشرح */}
                <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground mb-3">
                  {level.book}
                </h2>
                <p className="text-xs sm:text-sm text-muted font-tajawal font-medium leading-relaxed mb-6">
                  {level.desc}
                </p>

                {/* أهداف وأبرز محاور المستوى */}
                <div className="bg-background/60 dark:bg-background/20 p-5 sm:p-6 rounded-2xl border border-border/50 dark:border-[#212C2C]/50 mb-8">
                  <span className="text-xs sm:text-sm font-bold text-foreground block mb-4">
                    أبرز المحاور والغايات المنهجية لهذا المستوى:
                  </span>
                  <ul className="space-y-3">
                    {level.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-muted">
                        <Sparkles className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* أزرار الإجراءات التفاعلية (الشرح الصوتي، كتب الشرح، المتن/التطبيق) */}
                <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-border/60 dark:border-[#212C2C]/60 mb-8">
                  {/* 1. الشرح الصوتي والمرئي */}
                  {hasYoutube ? (
                    <a
                      href={level.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>الشرح الصوتي والمرئي</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                      <Video className="w-4 h-4 opacity-50" />
                      <span>الشرح الصوتي (قريباً)</span>
                    </div>
                  )}

                  {/* 2. تحميل كتب الشرح PDF */}
                  {hasMultiplePdfs ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] border border-brand-primary/10 hover:bg-brand-primary/10 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل كتب الشرح (PDF)</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-card border border-border dark:border-[#212C2C] rounded-2xl shadow-2xl p-2 z-30 animate-fade-in flex flex-col gap-1">
                          {(level.pdfUrl as PdfFile[]).map((pdf, pIdx) => (
                            <a
                              key={pIdx}
                              href={pdf.url}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-background/80 text-xs font-bold text-foreground transition-all group"
                            >
                              <span className="truncate">{pdf.label}</span>
                              <Download className="w-3.5 h-3.5 text-brand-primary group-hover:scale-110 transition-transform shrink-0" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : hasSinglePdf ? (
                    <a
                      href={level.pdfUrl as string}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] border border-brand-primary/10 hover:bg-brand-primary/10 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل كتاب الشرح (PDF)</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                      <Download className="w-4 h-4 opacity-50" />
                      <span>كتاب الشرح (قريباً)</span>
                    </div>
                  )}

                  {/* 3. التطبيق المساند أو تصفح المتن */}
                  {matchedApp ? (
                    <Link
                      href={`/software/${matchedApp.id}`}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-brand-secondary-light/40 dark:bg-brand-secondary-light/10 text-brand-secondary dark:text-[#E7C682] border border-brand-secondary/20 hover:bg-brand-secondary hover:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>تحميل التطبيق ({matchedApp.name})</span>
                    </Link>
                  ) : matchedBook ? (
                    <Link
                      href={`/books/${matchedBook.id}`}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>تحميل وتصفح المتن</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                      <BookOpen className="w-4 h-4 opacity-50" />
                      <span>تحميل المتن (قريباً)</span>
                    </div>
                  )}
                </div>

                {/* 🎯 قسم إتمام المستوى (Level Completion Control) */}
                <div className="bg-brand-primary-light/20 dark:bg-brand-primary-light/5 p-6 rounded-2xl border border-brand-primary/20 text-center flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-brand-primary" />
                    )}
                    <span>
                      {completed
                        ? 'أحسنت! لقد أتممت هذا المستوى بنجاح'
                        : 'هل أنهيت دراسة هذا المستوى ومتنه؟'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleToggleCompletion}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                        completed
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-brand-primary hover:bg-brand-primary-hover text-white'
                      }`}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>تم إتمام المستوى (اضغط للإلغاء)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>أتممت هذا المستوى</span>
                        </>
                      )}
                    </button>

                    {completed && hasNextLevel && nextLevelSlug && (
                      <Link
                        href={`/sciences/${rawId}/${nextLevelSlug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-secondary hover:bg-brand-secondary-hover text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer animate-pulse"
                      >
                        <span>الانتقال للمستوى التالي ({currentLevelIndex + 2})</span>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {/* رسالة تهنئة تفاعلية */}
                  {showCelebration && (
                    <div className="mt-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 animate-fade-in">
                      <PartyPopper className="w-5 h-5 text-emerald-500" />
                      <span>
                        تهانينا مبارك! أتممت المستوى {currentLevelIndex + 1} بنجاح.
                        {hasNextLevel ? ' تم فتح المستوى التالي الآن!' : ' أتممت كامل المسار الشرعي لهذا العلم!'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
