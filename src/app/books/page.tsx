'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  Search,
  BookMarked,
  Layers,
} from 'lucide-react';
import booksData from '@/data/booksData.json';
import { Book } from 'src/utils/bookHelper';

export default function BooksPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  // حالة التحكم في البحث والتصنيفات
  const [query, setQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  useEffect(() => {
    setMounted(true);
  }, []);

  // جلب الفئات ديناميكياً من البيانات
  const categories = useMemo(() => {
    const values = (booksData as Book[])
      .map((book) => book.category?.trim())
      .filter((value): value is string => Boolean(value));
    return ['الكل', ...Array.from(new Set(values))];
  }, []);

  // تصفية الكتب حسب البحث والفئة
  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return (booksData as Book[]).filter((book) => {
      const matchesQuery =
        !normalizedQuery ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.description.toLowerCase().includes(normalizedQuery) ||
        book.category.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        activeCategory === 'الكل' || book.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] dark:bg-[#0b0f19]">
        <div className="w-12 h-12 rounded-full border-4 border-amber-700/20 border-t-amber-700 animate-spin dark:border-amber-500/20 dark:border-t-amber-500" />
      </div>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FAF7F2] text-slate-950 transition-colors duration-500 dark:bg-[#0b0f19] dark:text-slate-100 animate-in fade-in duration-300"
    >
      {/* هيدر الصفحة */}
      <section className="relative border-b border-amber-900/10 dark:border-amber-400/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(217,119,6,0.16),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(15,23,42,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_84%_10%,rgba(148,163,184,0.10),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-amber-900/10 bg-card/90 p-6 shadow-xl shadow-amber-900/5 backdrop-blur dark:border-amber-400/10 dark:bg-[#0c111d]/90 dark:shadow-black/25 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-100/80 px-3.5 py-1.5 text-xs font-extrabold text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                  <BookMarked className="h-4 w-4" />
                  <span>المكتبة الشرعية واللغوية</span>
                </div>
                <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-[#f8f4ea] sm:text-4xl lg:text-5xl">
                  قسم الكتب والمراجع العلمية
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                  مجموعة مختارة بعناية من المتون والمصنفات والشروح لتسهيل الدراسة الأكاديمية والتأصيل العلمي لطلاب علوم التجويد والقراءات واللغة العربية.
                </p>
              </div>

              {/* بطاقة الإحصائيات */}
              <div className="grid grid-cols-2 gap-3 rounded-3xl border border-amber-900/10 bg-white/70 p-2.5 shadow-sm backdrop-blur dark:border-amber-400/10 dark:bg-[#0b0f19]/60">
                <div className="px-4 py-2.5 text-center">
                  <p className="text-xl font-black text-amber-700 dark:text-amber-500">
                    {(booksData as Book[]).length}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">كتب متوفرة</p>
                </div>
                <div className="border-r border-amber-900/10 px-4 py-2.5 text-center dark:border-amber-400/10">
                  <p className="text-xl font-black text-amber-700 dark:text-amber-500">
                    {categories.length - 1}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">أقسام وتصنيفات</p>
                </div>
              </div>
            </div>

            {/* شريط البحث وتصفية التصنيفات */}
            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-500 shadow-sm transition-all duration-300 focus-within:border-amber-700/30 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-400 dark:focus-within:border-amber-500/35">
                <Search className="h-4.5 w-4.5 shrink-0 text-amber-700 dark:text-amber-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن كتاب، مؤلف، تصنيف..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-655"
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
                      className={`rounded-xl border px-4 py-2.5 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${
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

      {/* قسم الكتب (الشبكة) */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book, index) => {
              const isPlaceholder = book.fileUrl === '#';
              return (
                <div
                  key={book.id}
                  className="group flex flex-col justify-between rounded-[2rem] border border-amber-900/10 bg-card p-6 shadow-xl shadow-amber-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-700/25 hover:shadow-2xl hover:shadow-amber-900/10 dark:border-amber-400/10 dark:bg-[#0c111d] dark:shadow-black/25 dark:hover:border-amber-500/35 dark:hover:shadow-amber-500/10"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div>
                    {/* رأس الكارت مع التصنيف */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-700/15 bg-amber-50 text-amber-800 transition-transform duration-300 group-hover:scale-105 dark:border-amber-500/15 dark:bg-amber-500/10 dark:text-amber-400">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-amber-700/20 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-black text-amber-800 dark:text-amber-400">
                        {book.category}
                      </span>
                    </div>

                    {/* تفاصيل الكتاب */}
                    <h3 className="text-lg font-black leading-snug text-slate-950 transition-colors duration-300 group-hover:text-amber-800 dark:text-[#f8f4ea] dark:group-hover:text-amber-400">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                      المؤلف: <span className="text-amber-850 dark:text-amber-400">{book.author}</span>
                    </p>
                    <p className="mt-4 text-xs font-semibold leading-6 text-slate-600 dark:text-slate-300 line-clamp-3">
                      {book.description}
                    </p>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
                    {isPlaceholder ? (
                      <>
                        <div className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-amber-800/20 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-500 cursor-not-allowed">
                          <BookOpen className="h-4 w-4 opacity-50" />
                          <span>قراءة الكتاب (قريباً)</span>
                        </div>
                        <div className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-300 dark:border-slate-850 dark:bg-slate-900/20 dark:text-slate-600 cursor-not-allowed">
                          <Download className="h-4 w-4 opacity-30" />
                          <span>تحميل مباشر</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/books/${book.id}`}
                          className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-700/25 bg-slate-950 px-3 py-2 text-xs font-black text-white shadow-md hover:bg-black dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>قراءة الكتاب</span>
                        </Link>
                        <a
                          href={book.fileUrl}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-850/10 bg-white hover:bg-amber-50/50 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-250 dark:hover:bg-slate-800/60 transition-all duration-300"
                        >
                          <Download className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                          <span>تحميل مباشر</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-amber-700/25 bg-[#fffaf1] px-5 py-16 text-center dark:border-amber-500/25 dark:bg-slate-950/35">
            <Layers className="mx-auto h-12 w-12 text-amber-700 dark:text-amber-500 animate-pulse" />
            <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-[#f8f4ea]">
              لم نعثر على أي كتب مطابقة لبحثك
            </h3>
            <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              يرجى التحقق من صياغة البحث أو اختيار تصنيف آخر.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
