'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, useRef } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Download,
  GraduationCap,
  Layers,
  Video,
  ChevronDown,
} from 'lucide-react';
import roadmapData from '@/data/roadmapData.json';
import type { SoftwareResource } from 'src/types/software';

type PdfFile = {
  label: string;
  url: string;
};

type Matn = {
  type: 'matn' | 'book';
  hasCompanionApp: 'yes' | 'no';
  id: string;
  title: string;
  companionAppId: string | null;
  youtubeUrl: string;
  // عدّلنا الـ Type ليدعم إما string كالسابق أو Array من الملفات المتعددة
  pdfUrl: string | PdfFile[];
};

type RoadmapLevel = {
  id: string;
  label: string;
  order: number;
  matn: Matn;
};

type RoadmapTopic = {
  id: string;
  name: string;
  description?: string;
  levels: RoadmapLevel[];
};

type RoadmapScience = {
  number?: number;
  id: string;
  name: string;
  description?: string;
  topics: RoadmapTopic[];
};

type CompanionState =
  | { kind: 'internal'; href: string; meta: string; title: string }
  | { kind: 'placeholder'; title: string }
  | { kind: 'hidden' };

const sciences = roadmapData as unknown as RoadmapScience[];

const stageLabel = (level: RoadmapLevel) => {
  if (level.label.includes('متقدم')) return 'مرحلة التمكين';
  if (level.label.includes('متوسط')) return 'مرحلة الترقية';
  return 'مرحلة التأسيس';
};

const isPlaceholderHref = (href: string) => href.trim() === '#';

const resolveCompanion = (
  matn: Matn,
  softwareCatalog: SoftwareResource[]
): CompanionState => {
  if (matn.hasCompanionApp === 'no') return { kind: 'hidden' };

  if (!matn.companionAppId) {
    return { kind: 'placeholder', title: 'سيضاف التطبيق المساند لاحقاً' };
  }

  const matchedApp = softwareCatalog.find(
    (app) => app.id === matn.companionAppId
  );

  return {
    kind: 'internal',
    href: `/software/${matn.companionAppId}`,
    meta: matchedApp
      ? `${matchedApp.version} • ${matchedApp.size}`
      : 'تحميل مباشر • جاهز',
    title: matchedApp ? matchedApp.name : `تطبيق ${matn.title}`,
  };
};

const countLevels = (science: RoadmapScience) =>
  science.topics.reduce((total, topic) => total + topic.levels.length, 0);

export default function SciencesPage() {
  const [activeScienceId, setActiveScienceId] = useState(sciences[0]?.id ?? '');
  const [activeTopicId, setActiveTopicId] = useState(
    sciences[0]?.topics[0]?.id ?? ''
  );
  const [softwareCatalog, setSoftwareCatalog] = useState<SoftwareResource[]>(
    []
  );

  // State لإدارة أي القوائم المنسدلة مفتوحة حالياً عبر تتبع level.id
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    import('@/data/softwareData.json')
      .then((module) => {
        if (isMounted) setSoftwareCatalog(module.default as SoftwareResource[]);
      })
      .catch(() => {
        if (isMounted) setSoftwareCatalog([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // إغلاق القائمة عند الضغط في أي مكان خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeScience = useMemo(
    () =>
      sciences.find((science) => science.id === activeScienceId) ?? sciences[0],
    [activeScienceId]
  );

  const activeTopic = useMemo(() => {
    return (
      activeScience.topics.find((topic) => topic.id === activeTopicId) ??
      activeScience.topics[0]
    );
  }, [activeScience, activeTopicId]);

  const selectScience = (science: RoadmapScience) => {
    setActiveScienceId(science.id);
    setActiveTopicId(science.topics[0]?.id ?? '');
    setOpenDropdownId(null);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#FAF7F2] text-slate-950 transition-colors duration-500 dark:bg-[#0b0f19] dark:text-slate-100"
    >
      {/* Header section */}
      <section className="relative border-b border-amber-900/10 dark:border-amber-400/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(217,119,6,0.16),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(15,23,42,0.10),transparent_30%),linear-gradient(135deg,rgba(245,158,11,0.08),transparent_46%)] dark:bg-[radial-gradient(circle_at_16%_10%,rgba(245,158,11,0.18),transparent_28%),radial-gradient(circle_at_84%_10%,rgba(148,163,184,0.09),transparent_32%),linear-gradient(135deg,rgba(251,191,36,0.06),transparent_46%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-100/80 px-3 py-1.5 text-xs font-extrabold text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                <GraduationCap className="h-4 w-4" />
                <span>منهج تعليمي متدرج</span>
              </div>
              <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-[#f8f4ea] sm:text-4xl lg:text-5xl">
                رُكْن طَالِب العِلْم
                <span className="block text-amber-700 dark:text-amber-500">
                  خارطة المتون والمباحث
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-3xl border border-amber-900/10 bg-white/65 p-2 shadow-lg shadow-amber-900/5 backdrop-blur dark:border-amber-400/10 dark:bg-[#0c111d]/78">
              <div className="px-3 py-2 text-center">
                <p className="text-lg font-black text-amber-700 dark:text-amber-500">
                  {sciences.length}
                </p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  علوم
                </p>
              </div>
              <div className="border-x border-amber-900/10 px-3 py-2 text-center dark:border-amber-400/10">
                <p className="text-lg font-black text-amber-700 dark:text-amber-500">
                  {activeScience.topics.length}
                </p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  مباحث
                </p>
              </div>
              <div className="px-3 py-2 text-center">
                <p className="text-lg font-black text-amber-700 dark:text-amber-500">
                  {countLevels(activeScience)}
                </p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  مستويات
                </p>
              </div>
            </div>
          </header>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {sciences.map((science) => {
              const isActive = science.id === activeScience.id;
              return (
                <button
                  key={science.id}
                  type="button"
                  onClick={() => selectScience(science)}
                  className={`group min-w-[245px] rounded-[1.4rem] border p-4 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-600/35 ${
                    isActive
                      ? 'border-amber-700/35 bg-slate-950 text-white shadow-amber-900/10 dark:border-amber-500/45 dark:bg-amber-500 dark:text-slate-950 dark:shadow-amber-500/20'
                      : 'border-amber-900/10 bg-card/88 text-slate-800 hover:border-amber-700/25 dark:border-amber-400/10 dark:bg-[#0c111d]/88 dark:text-slate-200 dark:hover:border-amber-500/35'
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="block text-lg font-black">
                      {science.number} - {science.name}
                    </span>
                    <Compass
                      className={`h-5 w-5 ${isActive ? 'text-amber-200 dark:text-slate-950' : 'text-amber-700 dark:text-amber-500'}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[0.32fr_0.68fr] lg:px-8">
        <aside className="rounded-[1.75rem] border border-amber-900/10 bg-card/92 p-5 shadow-xl shadow-amber-900/5 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-700/20 bg-amber-100 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-950 dark:text-[#f8f4ea]">
                {activeScience.name}
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {activeScience.topics.map((topic) => {
              const isActive = topic.id === activeTopic?.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    setActiveTopicId(topic.id);
                    setOpenDropdownId(null);
                  }}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right transition-all duration-300 ${
                    isActive
                      ? 'border-amber-700/30 bg-amber-100/70 text-amber-900 dark:border-amber-500/35 dark:bg-amber-500/10 dark:text-amber-300'
                      : 'border-slate-200 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300'
                  }`}
                >
                  <span className="block text-sm font-black">{topic.name}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Roadmap content section */}
        <section className="rounded-[1.75rem] border border-amber-900/10 bg-card/92 p-5 shadow-xl shadow-amber-900/5 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25 sm:p-6">
          {activeTopic && (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-950 dark:text-[#f8f4ea]">
                    {activeTopic.name}
                  </h2>
                </div>
                <div className="rounded-2xl border border-amber-800/15 bg-[#fffaf1] px-4 py-3 text-xs font-black text-amber-900 dark:border-amber-500/15 dark:bg-amber-500/10 dark:text-amber-300">
                  {activeTopic.levels.length} مستويات
                </div>
              </div>

              {activeTopic.levels.length > 0 ? (
                <ol className="relative space-y-5 before:absolute before:bottom-8 before:right-6 before:top-7 before:border-r-2 before:border-dashed before:border-amber-700/35 dark:before:border-amber-500/35 sm:before:right-7">
                  {activeTopic.levels.map((level, index) => {
                    const companion = resolveCompanion(
                      level.matn,
                      softwareCatalog
                    );
                    const isBook = level.matn.type === 'book';
                    const showAppButton = companion.kind !== 'hidden';

                    // التحقق مما إذا كان هناك ملفات متعددة أم رابط واحد عادي
                    const hasMultiplePdfs = Array.isArray(level.matn.pdfUrl);
                    const isDropdownOpen = openDropdownId === level.id;

                    return (
                      <li key={level.id} className="relative pr-16 sm:pr-20">
                        <div className="absolute right-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-amber-600/30 bg-[#FAF7F2] dark:border-amber-400/40 dark:bg-[#0b0f19] sm:h-14 sm:w-14">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-sm font-black text-white dark:from-amber-400 dark:to-amber-600 dark:text-slate-950">
                            {index + 1}
                          </span>
                        </div>

                        <div className="rounded-[1.4rem] border border-amber-900/10 bg-white/70 p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/28 sm:p-5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-amber-700/20 bg-amber-100/70 px-3 py-1 text-[11px] font-black text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                                  {level.label}
                                </span>
                                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                                  {isBook ? 'قراءة إثرية' : stageLabel(level)}
                                </span>
                              </div>
                              <h3 className="mt-3 text-xl font-black leading-snug text-slate-950 dark:text-[#f8f4ea]">
                                {level.matn.title}
                              </h3>
                            </div>

                            <div className="flex items-center gap-2 rounded-2xl border border-amber-700/15 bg-[#fffaf1] px-4 py-3 text-xs font-black text-amber-900 dark:border-amber-500/15 dark:bg-amber-500/10 dark:text-amber-300">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>المستوى {level.order}</span>
                            </div>
                          </div>

                          <div
                            className={`mt-5 grid gap-2 ${
                              isBook
                                ? 'grid-cols-1'
                                : showAppButton
                                  ? 'grid-cols-1 sm:grid-cols-3'
                                  : 'grid-cols-1 sm:grid-cols-2'
                            }`}
                          >
                            {isBook ? (
                              <a
                                href={
                                  hasMultiplePdfs
                                    ? '#'
                                    : (level.matn.pdfUrl as string)
                                }
                                target={
                                  isPlaceholderHref(level.matn.pdfUrl as string)
                                    ? undefined
                                    : '_blank'
                                }
                                rel="noreferrer"
                                className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-800/10 bg-white/80 px-3 py-2 text-xs font-black text-slate-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200"
                              >
                                <Download className="h-4 w-4" />
                                <span>تحميل الكتاب pdf</span>
                              </a>
                            ) : (
                              <>
                                <a
                                  href={level.matn.youtubeUrl}
                                  target={
                                    isPlaceholderHref(level.matn.youtubeUrl)
                                      ? undefined
                                      : '_blank'
                                  }
                                  rel="noreferrer"
                                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-800/10 bg-white/80 px-3 py-2 text-xs font-black text-slate-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200"
                                >
                                  <Video className="h-4 w-4" />
                                  <span>شرح مرئي</span>
                                </a>

                                {/* حقل زر ملفات الشرح يدعم المنسدلة الذكية */}
                                <div
                                  className="relative"
                                  ref={isDropdownOpen ? dropdownRef : null}
                                >
                                  {hasMultiplePdfs ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenDropdownId(
                                          isDropdownOpen ? null : level.id
                                        )
                                      }
                                      className={`w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-300 ${
                                        isDropdownOpen
                                          ? 'border-amber-700 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-500/10 dark:text-amber-300'
                                          : 'border-amber-800/10 bg-white/80 text-slate-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200'
                                      }`}
                                    >
                                      <Download className="h-4 w-4" />
                                      <span>تحميل pdf الشرح</span>
                                      <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                      />
                                    </button>
                                  ) : (
                                    <a
                                      href={level.matn.pdfUrl as string}
                                      target={
                                        isPlaceholderHref(
                                          level.matn.pdfUrl as string
                                        )
                                          ? undefined
                                          : '_blank'
                                      }
                                      rel="noreferrer"
                                      className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-800/10 bg-white/80 px-3 py-2 text-xs font-black text-slate-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200"
                                    >
                                      <Download className="h-4 w-4" />
                                      <span>تحميل pdf الشرح</span>
                                    </a>
                                  )}

                                  {/* القائمة المنسدلة المحدثة لتفتح للأعلى وتتجنب الاقتصاص */}
                                  {hasMultiplePdfs && isDropdownOpen && (
                                    <div className="absolute left-0 right-0 bottom-full z-50 mb-2 origin-bottom rounded-2xl border border-amber-900/10 bg-white p-1.5 shadow-xl shadow-amber-950/10 dark:border-slate-800 dark:bg-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                      {(level.matn.pdfUrl as PdfFile[]).map(
                                        (file, fileIdx) => (
                                          <a
                                            key={fileIdx}
                                            href={file.url}
                                            target={
                                              isPlaceholderHref(file.url)
                                                ? undefined
                                                : '_blank'
                                            }
                                            rel="noreferrer"
                                            onClick={() =>
                                              setOpenDropdownId(null)
                                            }
                                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-right text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-900 dark:text-slate-300 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 transition-colors"
                                          >
                                            <span>{file.label}</span>
                                            <Download className="h-3.5 w-3.5 opacity-60" />
                                          </a>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* زر التطبيق المساند الأسود */}
                                {showAppButton &&
                                  (companion.kind === 'internal' ? (
                                    <Link
                                      href={companion.href}
                                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-700/25 bg-slate-950 px-3 py-2 text-xs font-black text-white shadow-lg dark:border-amber-500/35 dark:bg-amber-500 dark:text-slate-950"
                                    >
                                      <BookOpen className="h-4 w-4" />
                                      <span className="flex flex-col items-center leading-5">
                                        <span>تطبيق المتن وشرحه</span>
                                        <span className="text-[10px] font-bold opacity-75">
                                          {companion.meta}
                                        </span>
                                      </span>
                                    </Link>
                                  ) : (
                                    <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-amber-800/20 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-500 cursor-not-allowed">
                                      <BookOpen className="h-4 w-4 opacity-50" />
                                      <span className="text-[11px]">
                                        {companion.title}
                                      </span>
                                    </div>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-amber-700/25 bg-[#fffaf1] px-5 py-10 text-center dark:border-amber-500/25 dark:bg-slate-950/35">
                  <Layers className="mx-auto h-8 w-8 text-amber-700 dark:text-amber-500" />
                  <h3 className="mt-3 text-base font-black text-slate-950 dark:text-[#f8f4ea]">
                    هذا المبحث جاهز للتوسع
                  </h3>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
}
