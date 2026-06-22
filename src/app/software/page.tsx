'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Layers, Search } from 'lucide-react';
import type { SoftwareResource } from 'src/types/software';

type SoftwareCatalogItem = SoftwareResource & {
  platform?: string;
};

export default function SoftwarePage() {
  const [apps, setApps] = useState<SoftwareCatalogItem[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  useEffect(() => {
    let alive = true;

    import('@/data/softwareData.json')
      .then((module) => {
        if (alive) {
          setApps(module.default as SoftwareCatalogItem[]);
        }
      })
      .catch(() => {
        if (alive) {
          setApps([]);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  // جلب الفئات ديناميكياً من ملف الـ JSON وتصفيتها
  const categories = useMemo(() => {
    const values = apps
      .map((app) => app.category?.trim())
      .filter((value): value is string => Boolean(value));
    
    return ['الكل', ...Array.from(new Set(values))];
  }, [apps]);

  const filteredApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return apps.filter((app) => {
      const matchesQuery =
        !normalizedQuery ||
        app.name.toLowerCase().includes(normalizedQuery) ||
        app.description.toLowerCase().includes(normalizedQuery) ||
        app.category.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        activeCategory === 'الكل' || app.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [apps, query, activeCategory]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FAF7F2] text-slate-950 transition-colors duration-500 dark:bg-[#0b0f19] dark:text-slate-100"
    >
      {/* قسم الهيدر */}
      <section className="border-b border-amber-900/10 dark:border-amber-400/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-amber-900/10 bg-card/90 p-5 shadow-xl shadow-amber-900/5 backdrop-blur dark:border-amber-400/10 dark:bg-[#0c111d]/90 dark:shadow-black/25 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-100/80 px-3 py-1.5 text-xs font-extrabold text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                  <Layers className="h-4 w-4" />
                  <span>برمجيات القرآن الكريم</span>
                </div>
                <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-[#f8f4ea] sm:text-4xl lg:text-5xl">
                  دليل التطبيقات والبرمجيات الإسلامية
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                  اكتشف وحمّل تطبيقاتنا المصممة بعناية فائقة لخدمة كتاب الله عز وجل والقراءات العشر والعلوم الشرعية، مجمعة في مكان واحد لتيسير الوصول والاستخدام.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-3xl border border-amber-900/10 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-amber-400/10 dark:bg-[#0b0f19]/60">
                <div className="px-3 py-2 text-center">
                  <p className="text-lg font-black text-amber-700 dark:text-amber-500">1</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">برمجيات القراءات</p>
                </div>
                <div className="border-x border-amber-900/10 px-3 py-2 text-center dark:border-amber-400/10">
                  <p className="text-lg font-black text-amber-700 dark:text-amber-500">1</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">متون علمية</p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="text-lg font-black text-amber-700 dark:text-amber-500">1</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">تطبيقات المصاحف</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-500 shadow-sm transition-all duration-300 focus-within:border-amber-700/30 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-400 dark:focus-within:border-amber-500/35">
                <Search className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ابحث عن التطبيق، المتن، أو اسم الشيخ..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = category === activeCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${
                        isActive
                          ? 'border-amber-700 bg-slate-950 text-white shadow-lg shadow-amber-900/10 dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950'
                          : 'border-slate-200 bg-white/75 text-slate-700 hover:border-amber-700/30 hover:text-amber-800 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-amber-500/35 dark:hover:text-amber-400'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم عرض الكروت */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredApps.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-amber-900/10 bg-card p-5 text-center shadow-xl shadow-amber-900/5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-700/25 hover:shadow-2xl hover:shadow-amber-900/10 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25 dark:hover:border-amber-500/35 dark:hover:shadow-amber-500/10"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.5rem] border border-amber-500/20 bg-amber-100/60 text-amber-800 shadow-lg shadow-amber-500/5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-amber-500/10 dark:bg-amber-500/10 dark:text-amber-400">
                    {app.iconUrl ? (
                      <Image
                        src={app.iconUrl}
                        alt={app.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <Layers className="h-10 w-10" />
                    )}
                  </span>

                  <p className="mt-5 text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-500">
                    {app.category}
                  </p>
                  <h2 className="mt-2 text-xl font-black leading-snug text-slate-950 transition-colors duration-300 group-hover:text-amber-800 dark:text-[#f8f4ea] dark:group-hover:text-amber-400">
                    {app.name}
                  </h2>
                </div>

                <p className="mt-4 line-clamp-3 text-center text-sm font-semibold leading-7 text-slate-500 dark:text-slate-400">
                  {app.description}
                </p>

                {/* هنا تم إصلاح النصوص المكسرة لبيانات التطبيق */}
                <div className="mt-6 grid w-full grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40">
                    <span className="block text-slate-400 dark:text-slate-500">حجم التطبيق</span>
                    <span className="mt-1 block text-sm font-black text-slate-800 dark:text-slate-200">
                      {app.size}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40">
                    <span className="block text-slate-400 dark:text-slate-500">الإصدار</span>
                    <span className="mt-1 block text-sm font-black text-slate-800 dark:text-slate-200">
                      {app.version}
                    </span>
                  </div>
                </div>

                <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                  <span className="block">التوافق</span>
                  <span className="mt-1 block text-sm font-black text-slate-800 dark:text-slate-200">
                    Android
                  </span>
                </div>

                <Link
                  href={`/software/${app.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-amber-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-amber-500 dark:text-slate-950 dark:shadow-amber-500/20 dark:hover:bg-amber-400"
                >
                  <span>استكشاف وتحميل التطبيق</span>
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* هنا تم إصلاح رسالة عدم وجود نتائج */
          <div className="rounded-[2rem] border border-dashed border-amber-700/25 bg-white/70 p-10 text-center shadow-sm dark:border-amber-500/25 dark:bg-[#0c111d]/70">
            <p className="text-base font-black text-slate-950 dark:text-[#f8f4ea]">
              لا توجد نتائج مطابقة
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              جرّب اسمًا آخر أو اختر فئة مختلفة من أعلى الصفحة.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}