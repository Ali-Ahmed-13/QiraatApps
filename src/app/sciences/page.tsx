'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Download,
  GraduationCap,
  Layers,
  Video,
} from 'lucide-react';
import roadmapData from '@/data/roadmapData.json';
import type { SoftwareResource } from 'src/types/software';

type Matn = {
  id: string;
  title: string;
  companionAppId: string | null;
  youtubeUrl: string;
  pdfUrl: string;
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
  | {
      kind: 'internal';
      href: string;
      meta: string;
      title: string;
    }
  | {
      kind: 'empty';
      meta: string;
    };

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
  if (!matn.companionAppId) {
    return {
      kind: 'empty',
      meta: 'سيضاف التطبيق المساند لاحقًا',
    };
  }

  const matchedApp = softwareCatalog.find(
    (app) => app.id === matn.companionAppId
  );

  if (!matchedApp) {
    return {
      kind: 'empty',
      meta: 'لم يتم العثور على التطبيق في قاعدة البرامج',
    };
  }

  return {
    kind: 'internal',
    href: `/software/${matchedApp.id}`,
    meta: `${matchedApp.version} • ${matchedApp.size}`,
    title: matchedApp.name,
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

  useEffect(() => {
    let isMounted = true;

    import('@/data/softwareData.json')
      .then((module) => {
        if (isMounted) {
          setSoftwareCatalog(module.default as SoftwareResource[]);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSoftwareCatalog([]);
        }
      });

    return () => {
      isMounted = false;
    };
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
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#FAF7F2] text-slate-950 transition-colors duration-500 dark:bg-[#0b0f19] dark:text-slate-100"
    >
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
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                واجهة واحدة تقرأ المنهج من ملف مستقل، وتربط كل متن بالتطبيق
                المساند عند توفره داخل قاعدة QiraatApps.
              </p>
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
                    <span>
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] opacity-65">
                        علم
                      </span>
                      <span className="mt-1 block text-lg font-black">
                        {science.number} {' - '} {science.name}
                      </span>
                    </span>
                    <Compass
                      className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                        isActive
                          ? 'text-amber-200 dark:text-slate-950'
                          : 'text-amber-700 dark:text-amber-500'
                      }`}
                    />
                  </span>
                  <span className="mt-3 block text-xs font-bold leading-6 opacity-75">
                    {science.description ?? 'مسار علمي منظم قابل للتوسع داخل ركن طالب العلم.'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[0.32fr_0.68fr] lg:px-8">
        <aside className="rounded-[1.75rem] border border-amber-900/10 bg-card/92 p-5 shadow-xl shadow-amber-900/5 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-700/20 bg-amber-100 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black text-amber-700 dark:text-amber-500">
                المباحث
              </p>
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
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${
                    isActive
                      ? 'border-amber-700/30 bg-amber-100/70 text-amber-900 dark:border-amber-500/35 dark:bg-amber-500/10 dark:text-amber-300'
                      : 'border-slate-200 bg-white/70 text-slate-700 hover:border-amber-700/25 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-amber-500/35'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-black">
                      {topic.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-bold opacity-65">
                      {topic.description ?? 'مبحث علمي ضمن خارطة المتون والمستويات.'}
                    </span>
                  </span>
                  <span className="text-xs font-black">
                    {topic.levels.length == 0 && 'قريبًا'}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-[1.75rem] border border-amber-900/10 bg-card/92 p-5 shadow-xl shadow-amber-900/5 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25 sm:p-6">
          {activeTopic ? (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700 dark:text-amber-500">
                    خارطة المبحث
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-[#f8f4ea]">
                    {activeTopic.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                    {activeTopic.description ?? 'مبحث علمي ضمن خارطة المتون والمستويات.'}
                  </p>
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

                    return (
                      <li key={level.id} className="relative pr-16 sm:pr-20">
                        <div className="absolute right-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-amber-600/30 bg-[#FAF7F2] shadow-[0_0_0_8px_rgba(250,247,242,0.9),0_0_32px_rgba(217,119,6,0.22)] dark:border-amber-400/40 dark:bg-[#0b0f19] dark:shadow-[0_0_0_8px_rgba(11,15,25,0.92),0_0_34px_rgba(245,158,11,0.24)] sm:h-14 sm:w-14">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-sm font-black text-white shadow-lg shadow-amber-700/25 dark:from-amber-400 dark:to-amber-600 dark:text-slate-950">
                            {index + 1}
                          </span>
                        </div>

                        <div
                          className="rounded-[1.4rem] border border-amber-900/10 bg-white/70 p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-700/25 hover:shadow-xl hover:shadow-amber-900/8 dark:border-slate-700/80 dark:bg-slate-950/28 dark:hover:border-amber-500/35 sm:p-5"
                          style={{ transitionDelay: `${index * 55}ms` }}
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-amber-700/20 bg-amber-100/70 px-3 py-1 text-[11px] font-black text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                                  {level.label}
                                </span>
                                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                                  {stageLabel(level)}
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

                          <div className="mt-5 grid gap-2 sm:grid-cols-3">
                            <a
                              href={level.matn.youtubeUrl}
                              target={
                                isPlaceholderHref(level.matn.youtubeUrl)
                                  ? undefined
                                  : '_blank'
                              }
                              rel={
                                isPlaceholderHref(level.matn.youtubeUrl)
                                  ? undefined
                                  : 'noreferrer'
                              }
                              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-800/10 bg-white/80 px-3 py-2 text-xs font-black text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-700/30 hover:text-amber-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200 dark:hover:border-amber-500/35 dark:hover:text-amber-400"
                            >
                              <Video className="h-4 w-4" />
                              <span>شرح مرئي</span>
                            </a>
                            <a
                              href={level.matn.pdfUrl}
                              target={
                                isPlaceholderHref(level.matn.pdfUrl)
                                  ? undefined
                                  : '_blank'
                              }
                              rel={
                                isPlaceholderHref(level.matn.pdfUrl)
                                  ? undefined
                                  : 'noreferrer'
                              }
                              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-800/10 bg-white/80 px-3 py-2 text-xs font-black text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-700/30 hover:text-amber-800 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200 dark:hover:border-amber-500/35 dark:hover:text-amber-400"
                            >
                              <Download className="h-4 w-4" />
                              <span>تحميل pdf الشرح</span>
                            </a>

                            {companion.kind === 'internal' ? (
                              <Link
                                href={companion.href}
                                title={companion.title}
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-700/25 bg-slate-950 px-3 py-2 text-xs font-black text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black dark:border-amber-500/35 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
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
                              <button
                                type="button"
                                disabled
                                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 px-3 py-2 text-xs font-black text-slate-400 dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-500"
                              >
                                <BookOpen className="h-4 w-4" />
                                <span className="flex flex-col items-center leading-5">
                                  <span>تطبيق المتن وشرحه</span>
                                  <span className="text-[10px] font-bold">
                                    {companion.meta}
                                  </span>
                                </span>
                              </button>
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
                  <p className="mx-auto mt-2 max-w-md text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                    تركنا المستويات فارغة في ملف البيانات حتى يمكن إضافة متونه
                    لاحقًا دون تعديل بنية الواجهة.
                  </p>
                </div>
              )}
            </>
          ) : null}
        </section>
      </section>
    </main>
  );
}
