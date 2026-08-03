'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import {
  BookOpen,
  Download,
  Search,
  BookMarked,
  Layers,
  CheckCircle2,
  Sparkles,
  Check,
  Bookmark
} from 'lucide-react';
import booksData from '@/data/books';
import { Book } from 'src/utils/bookHelper';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import { markTextAsCompleted, getStudentData, toggleFavoriteBook } from 'src/utils/studentSync';
import { matchesSearchText } from '@/utils/textNormalization';

export default function BooksPage() {
  const { user } = useUser();
  const [mounted, setMounted] = useState<boolean>(false);
  const [completedTitles, setCompletedTitles] = useState<string[]>([]);
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // خريطة تحويل التصنيفات إلى أسماء بالإنجليزية في الـ URL
  const BOOK_SLUG_MAP: Record<string, string> = {
    all: 'الكل',
    tajweed: 'تجويد',
    qiraat: 'قراءات',
    'tajweed-qiraat': 'التجويد والقراءات',
  };

  const BOOK_CAT_TO_SLUG: Record<string, string> = {
    'الكل': 'all',
    'تجويد': 'tajweed',
    'قراءات': 'qiraat',
    'التجويد والقراءات': 'tajweed-qiraat',
  };

  // حالة التحكم في البحث والتصنيفات
  const [query, setQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  useEffect(() => {
    setMounted(true);
    
    // قراءة التصنيف من رابط الـ URL في حال توفره عند تحميل الصفحة
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catSlug = params.get('category') || params.get('cat');
      if (catSlug && BOOK_SLUG_MAP[catSlug]) {
        setActiveCategory(BOOK_SLUG_MAP[catSlug]);
      }
    }

    if (user) {
      const studentData = getStudentData(user);
      const doneList = studentData.completedCourses?.map(c => c.name) || [];
      setCompletedTitles(doneList);
      setFavoriteTitles(studentData.favorites || []);
    }
  }, [user]);

  // دالة تغيير التصنيف وتحديث الـ URL تلقائياً
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (typeof window !== 'undefined') {
      const slug = BOOK_CAT_TO_SLUG[cat] || (cat === 'الكل' ? 'all' : cat);
      const newUrl = slug === 'all' ? '/books' : `/books?category=${encodeURIComponent(slug)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // جلب الفئات ديناميكياً من البيانات
  const categories = useMemo(() => {
    const values = (booksData as Book[])
      .map((book) => book.category?.trim())
      .filter((value): value is string => Boolean(value));
    return ['الكل', ...Array.from(new Set(values))];
  }, []);

  // تصفية الكتب حسب البحث والفئة
  const filteredBooks = useMemo(() => {
    return (booksData as Book[]).filter((book) => {
      const matchesQuery =
        !query ||
        matchesSearchText(book.title, query) ||
        matchesSearchText(book.author, query) ||
        matchesSearchText(book.description, query) ||
        matchesSearchText(book.category, query);

      const matchesCategory =
        activeCategory === 'الكل' || book.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  // دالة التعامل مع ختم وإكمال المتن
  const handleCompleteMatn = async (bookTitle: string) => {
    if (!user) {
      setToastMessage("يرجى تسجيل الدخول أولاً لتسجيل إنجازك في بوابة الطالب وإضافته لحسابك السحابي.");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const updated = await markTextAsCompleted(user, bookTitle);
    const updatedDoneList = updated.completedCourses?.map(c => c.name) || [];
    setCompletedTitles(updatedDoneList);

    setToastMessage(`تم ختم ותجويز "${bookTitle}" بنجاح! تم التوثيق السحابي في بوابة الطالب ☁️✨`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // دالة إضافة / إزالة من المفضلة
  const handleToggleFav = async (bookTitle: string) => {
    if (!user) {
      setToastMessage("يرجى تسجيل الدخول أولاً لحفظ المتون في مفضلتك السحابية.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    const { data, isFav } = await toggleFavoriteBook(user, bookTitle);
    setFavoriteTitles(data.favorites || []);
    setToastMessage(isFav ? `تمت إضافة "${bookTitle}" إلى مفضلتك السحابية 🔖` : `تمت إزالة "${bookTitle}" من المفضلة`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <PageTransition>
      <main
        dir="rtl"
        className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-8"
      >
        {/* إشعار تفاعلي علوي عند ختم أو تفضيل المتن */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-brand-primary text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-brand-secondary" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* هيدر الصفحة */}
        <section className="relative border-b border-border pb-8 mb-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(0,109,111,0.02),transparent_35%)] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(0,179,183,0.05),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl text-right">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/10 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 px-3.5 py-1.5 text-xs font-black text-brand-primary dark:text-[#00B3B7]">
                    <BookMarked className="h-4 w-4" />
                    <span>المكتبة الشرعية واللغوية المحققة</span>
                  </div>
                  <h1 className="text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl font-amiri">
                    خزانة الكتب والمراجع الرقمية
                  </h1>
                  <p className="mt-3 max-w-2xl text-xs sm:text-sm font-semibold leading-relaxed text-muted">
                    اختر الكتب والمراجع، أضفها لمفضلتك السحابية أو اضغط &quot;تم ختم المتن&quot; لإصداره في بوابة الطالب.
                  </p>
                </div>

                {/* بطاقة الإحصائيات */}
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background p-2.5 shadow-sm w-fit shrink-0">
                  <div className="px-4 py-2 text-center">
                    <p className="text-xl font-black text-brand-primary">
                      {(booksData as Book[]).length}
                    </p>
                    <p className="text-[10px] font-bold text-muted">كتب متوفرة</p>
                  </div>
                  <div className="border-r border-border px-4 py-2 text-center">
                    <p className="text-xl font-black text-brand-primary">
                      {categories.length - 1}
                    </p>
                    <p className="text-[10px] font-bold text-muted">أقسام وتصنيفات</p>
                  </div>
                </div>
              </div>

              {/* أدوات البحث والتصفية */}
              <div className="mt-8 flex flex-col gap-4 pt-6 border-t border-border/80 lg:flex-row lg:items-center lg:justify-between">
                {/* قائمة التصنيفات */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all duration-300 cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-brand-primary text-white shadow-premium'
                          : 'bg-background hover:bg-border/30 text-muted hover:text-foreground border border-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* حقل البحث */}
                <div className="relative w-full lg:w-80 shrink-0">
                  <input
                    type="text"
                    placeholder="ابحث عن كتاب، مؤلف، أو كلمة مفتاحية..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl py-2.5 pr-10 pl-4 text-xs font-semibold focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                  <Search className="h-4 w-4 text-light-text absolute right-3.5 top-1/2 -translate-y-1/2" />
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
                const isCompleted = completedTitles.includes(book.title || '');
                const isFav = favoriteTitles.includes(book.title || '');

                return (
                  <ScrollReveal key={book.id} variant="fade-up" delay={index * 60}>
                    <div
                      className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-premium-hover h-full relative"
                    >
                      {/* شارة إنجاز المتن إذا كان مكتملاً */}
                      {isCompleted && (
                        <div className="absolute -top-3 right-6 bg-brand-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                          <Check className="w-3 h-3" />
                          <span>تم ختمه ببوابة الطالب ☁️</span>
                        </div>
                      )}

                      <div>
                        {/* رأس الكارت مع التصنيف وزر المفضلة */}
                        <div className="flex items-center justify-between mb-5">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/10 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary transition-transform duration-300 group-hover:scale-105">
                            <BookOpen className="h-5 w-5" />
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {/* زر التفضيل السريع */}
                            <button
                              onClick={() => handleToggleFav(book.title || 'مجهول')}
                              title={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة السحابية"}
                              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                isFav
                                  ? 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/30'
                                  : 'bg-background hover:bg-border/30 text-light-text hover:text-brand-secondary border-border'
                              }`}
                            >
                              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                            </button>

                            <span className="rounded-full border border-brand-secondary/15 bg-brand-secondary-light/40 dark:bg-brand-secondary-light/10 px-3 py-1 text-[10px] font-black text-brand-secondary dark:text-[#E7C682]">
                              {book.category || 'مجهول'}
                            </span>
                          </div>
                        </div>

                        {/* تفاصيل الكتاب */}
                        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-primary font-amiri">
                          {book.title || 'عنوان مجهول'}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-muted">
                          المؤلف: <span className="text-brand-secondary">{book.author || 'مجهول'}</span>
                        </p>
                        <p className="mt-4 text-xs font-semibold leading-relaxed text-muted line-clamp-3">
                          {book.description || 'مجهول'}
                        </p>
                      </div>

                      {/* أزرار الإجراءات التفاعلية */}
                      <div className="mt-6 pt-4 border-t border-border flex flex-col gap-2">
                        {/* 🌟 الزر التفاعلي الإبداعي: إتمام وختم المتن */}
                        <button
                          onClick={() => handleCompleteMatn(book.title || 'مجهول')}
                          className={`w-full inline-flex min-h-10 items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                            isCompleted
                              ? 'bg-emerald-100/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-brand-secondary-light/50 dark:bg-brand-secondary-light/10 text-brand-secondary hover:bg-brand-secondary border border-brand-secondary/20 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{isCompleted ? 'تم بحمد الله ختم المتن ✨' : 'أتممتُ دراسة هذا المتن'}</span>
                        </button>

                        {isPlaceholder ? (
                          <div className="w-full inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/50 px-3 py-2 text-xs font-bold text-light-text cursor-not-allowed">
                            <BookOpen className="h-4 w-4 opacity-50" />
                            <span>قراءة الكتاب (قريباً)</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href={`/books/${book.id}`}
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover px-2.5 py-2 text-xs font-bold text-white shadow-premium transition-all duration-300 cursor-pointer"
                            >
                              <BookOpen className="h-3.5 w-3.5 text-brand-secondary" />
                              <span>تصفح</span>
                            </Link>
                            <a
                              href={book.fileUrl}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-background hover:bg-border/30 text-foreground px-2.5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer"
                            >
                              <Download className="h-3.5 w-3.5 text-brand-primary" />
                              <span>تحميل</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center max-w-lg mx-auto shadow-premium">
              <Layers className="mx-auto h-12 w-12 text-light-text animate-pulse mb-4" />
              <h3 className="text-lg font-bold text-foreground font-amiri mb-2">
                لم نعثر على أي كتب مطابقة لبحثك
              </h3>
              <p className="text-xs text-muted font-medium">
                جرب البحث بكلمات أخرى أو اختر فئة تصنيف مغايرة لتصفح الكتب المتاحة.
              </p>
            </div>
          )}
        </section>
      </main>
    </PageTransition>
  );
}
