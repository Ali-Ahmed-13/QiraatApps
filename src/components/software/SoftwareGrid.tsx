'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SoftwareResource } from 'src/types/software';
import SoftwareCard from 'src/components/software/SoftwareCard';
import { Search, X, ShieldAlert, SlidersHorizontal } from 'lucide-react';

interface SoftwareGridProps {
  softwareList: SoftwareResource[];
}

const ITEMS_PER_PAGE = 12;

export default function SoftwareGrid({ softwareList }: SoftwareGridProps) {
  const [searchVal, setSearchVal] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce effect to delay filtering calculations
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchVal);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  // Reset page when search or category changes to avoid empty pagination views
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, selectedCategory]);

  // Extract all categories dynamically from resources
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(softwareList.map((item) => item.category))
    );
    return ['الكل', ...uniqueCats];
  }, [softwareList]);

  // Perform filtering using useMemo for performance optimization
  const filteredSoftware = useMemo(() => {
    let result = softwareList;

    if (selectedCategory !== 'الكل') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    const query = debouncedQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [debouncedQuery, selectedCategory, softwareList]);

  // Paginate filtered results
  const totalPages = Math.ceil(filteredSoftware.length / ITEMS_PER_PAGE);
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSoftware.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredSoftware]);

  return (
    <section className="container mx-auto px-4 py-8" dir="rtl">
      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 right-0 pr-4.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="ابحث عن التطبيقات القرآنية، معاجم التلاوة، أو الأقسام..."
            className="w-full pl-12 pr-11 py-3.5 rounded-2xl border border-border dark:border-slate-800 bg-card dark:bg-slate-900 text-[#1E1E1E] dark:text-slate-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-amber-500/30 focus:border-amber-500 dark:focus:border-amber-500 transition-all text-sm placeholder:text-slate-450 dark:placeholder:text-slate-550"
          />
          {searchVal && (
            <button
              onClick={() => setSearchVal('')}
              className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic Category Pill Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-sm dark:bg-amber-500 dark:text-slate-950 dark:border-amber-500 dark:shadow-md dark:shadow-amber-500/10'
                    : 'bg-card dark:bg-slate-900 border-border dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {currentPageData.length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="catalog"
          >
            {currentPageData.map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-6">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                عرض الصفحة{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {currentPage}
                </strong>{' '}
                من أصل{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {totalPages}
                </strong>{' '}
                صفحات
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl border border-border dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-card dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  السابق
                </button>

                <div className="hidden sm:flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#1E1E1E] text-white border border-[#1E1E1E] shadow-sm dark:bg-amber-500 dark:border-amber-500 dark:text-slate-950 dark:shadow-md dark:shadow-amber-500/20'
                            : 'border border-border dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-card dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl border border-border dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-card dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-border dark:border-slate-800 bg-card/30 dark:bg-slate-900/20 backdrop-blur-sm max-w-lg mx-auto">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
            عذراً، لم نجد أي تطبيقات تطابق بحثك...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto leading-relaxed">
            تأكد من كتابة الكلمات بشكل صحيح أو جرب استخدام عوامل تصفية أخرى.
          </p>
          <button
            onClick={() => {
              setSearchVal('');
              setSelectedCategory('الكل');
            }}
            className="inline-flex items-center justify-center py-2 px-5 rounded-xl text-xs font-bold bg-[#1E1E1E] hover:bg-black dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-all duration-200 cursor-pointer"
          >
            إعادة ضبط عوامل التصفية
          </button>
        </div>
      )}
    </section>
  );
}
