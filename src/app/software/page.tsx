'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Layers, Search, Compass } from 'lucide-react';
import type { SoftwareResource } from 'src/types/software';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import { matchesSearchText } from '@/utils/textNormalization';

type SoftwareCatalogItem = SoftwareResource & {
  platform?: string;
};

export default function SoftwarePage() {
  const [apps, setApps] = useState<SoftwareCatalogItem[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  useEffect(() => {
    fetch('/data/softwareData.json')
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((err) => console.error('Error loading software data:', err));

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat');
      if (catParam) {
        // Map slug or use raw category
        const decoded = decodeURIComponent(catParam);
        setActiveCategory(decoded === 'all' ? 'الكل' : decoded);
      }
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (typeof window !== 'undefined') {
      const newUrl = category === 'الكل' ? '/software' : `/software?category=${encodeURIComponent(category)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // جلب الفئات ديناميكياً من ملف الـ JSON وتصفيتها
  const categories = useMemo(() => {
    const values = apps
      .map((app) => app.category?.trim())
      .filter((value): value is string => Boolean(value));
    
    return ['الكل', ...Array.from(new Set(values))];
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesQuery =
        !query ||
        matchesSearchText(app.name, query) ||
        matchesSearchText(app.description, query) ||
        matchesSearchText(app.category, query);

      const matchesCategory =
        activeCategory === 'الكل' || app.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [apps, query, activeCategory]);

  return (
    <PageTransition>
      <main
        dir="rtl"
        className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-8"
      >
        {/* قسم الهيدر */}
        <section className="border-b border-border pb-8 mb-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(0,109,111,0.02),transparent_35%)] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(0,179,183,0.05),transparent_35%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl text-right">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/10 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 px-3 py-1.5 text-xs font-black text-brand-primary dark:text-[#00B3B7]">
                    <Layers className="h-4 w-4" />
                    <span>برمجيات وتطبيقات القرآن الكريم</span>
                  </div>
                  <h1 className="text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl font-amiri">
                    دليل التطبيقات والبرمجيات الإسلامية
                  </h1>
                  <p className="mt-3 max-w-2xl text-xs sm:text-sm font-semibold leading-relaxed text-muted">
                    اكتشف وحمّل تطبيقاتنا المصممة بعناية فائقة لخدمة كتاب الله عز وجل والقراءات العشر والعلوم الشرعية، مجمعة في مكان واحد لتيسير الوصول والاستخدام.
                  </p>
                </div>

                {/* بطاقة الإحصائيات */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background p-2.5 shadow-sm w-fit shrink-0">
                  <div className="px-3 py-2 text-center">
                    <p className="text-lg font-black text-brand-primary">1</p>
                    <p className="text-[10px] font-bold text-muted">برمجيات القراءات</p>
                  </div>
                  <div className="border-x border-border px-3 py-2 text-center">
                    <p className="text-lg font-black text-brand-primary">1</p>
                    <p className="text-[10px] font-bold text-muted">متون علمية</p>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <p className="text-lg font-black text-brand-primary">1</p>
                    <p className="text-[10px] font-bold text-muted">تطبيقات المصاحف</p>
                  </div>
                </div>
              </div>

              {/* البحث والفئات */}
              <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-muted shadow-sm transition-all focus-within:border-brand-primary">
                  <Search className="h-4 w-4 shrink-0 text-brand-primary" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="ابحث عن التطبيق، المتن، أو اسم الشيخ..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-foreground outline-none placeholder:text-light-text"
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isActive = category === activeCategory;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-black transition-all cursor-pointer ${
                          isActive
                            ? 'border-brand-primary bg-brand-primary text-white dark:text-white shadow-premium'
                            : 'border-border bg-card text-muted hover:border-brand-primary/30 hover:text-brand-primary'
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app, index) => (
                <ScrollReveal key={app.id} variant="fade-up" delay={index * 80}>
                  <div
                    className="group flex flex-col items-center justify-between rounded-[24px] border border-border bg-card p-6 text-center shadow-premium hover:shadow-premium-hover transition-all duration-300 h-full"
                  >
                    <div className="flex w-full flex-col items-center justify-center text-center">
                      <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.5rem] border border-brand-primary/10 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary shadow-sm transition-all duration-300 group-hover:scale-105">
                        {app.iconUrl ? (
                          <Image
                            src={app.iconUrl}
                            alt={app.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <Layers className="h-10 w-10 text-brand-primary" />
                        )}
                      </span>

                      <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-brand-secondary">
                        {app.category}
                      </p>
                      <h2 className="mt-2 text-xl font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-primary font-amiri">
                        {app.name}
                      </h2>
                    </div>

                    <p className="mt-4 line-clamp-3 text-center text-xs sm:text-sm font-semibold leading-relaxed text-muted">
                      {app.description}
                    </p>

                    {/* بيانات التطبيق */}
                    <div className="mt-6 grid w-full grid-cols-2 gap-2 text-[11px] font-bold text-muted">
                      <div className="rounded-xl border border-border bg-background/55 px-3 py-2">
                        <span className="block text-light-text text-[10px]">حجم التطبيق</span>
                        <span className="mt-1 block text-sm font-bold text-foreground">
                          {app.size}
                        </span>
                      </div>
                      <div className="rounded-xl border border-border bg-background/55 px-3 py-2">
                        <span className="block text-light-text text-[10px]">الإصدار</span>
                        <span className="mt-1 block text-sm font-bold text-foreground">
                          {app.version}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 w-full rounded-xl border border-border bg-background/55 px-3 py-2 text-[10px] font-bold text-light-text flex justify-between items-center">
                      <span>التوافق التقني</span>
                      <span className="text-xs font-bold text-foreground">
                        Android / نظام أندرويد
                      </span>
                    </div>

                    <Link
                      href={`/software/${app.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-premium transition-all duration-300 cursor-pointer"
                    >
                      <span>استكشاف وتحميل التطبيق</span>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center max-w-lg mx-auto shadow-premium">
              <Compass className="mx-auto h-12 w-12 text-light-text animate-pulse mb-4" />
              <h3 className="text-lg font-bold text-foreground font-amiri mb-2">
                لا توجد نتائج مطابقة لبحثك
              </h3>
              <p className="text-xs font-bold text-muted">
                جرّب اسماً آخر أو اختر فئة مختلفة من أعلى الصفحة.
              </p>
            </div>
          )}
        </section>
      </main>
    </PageTransition>
  );
}