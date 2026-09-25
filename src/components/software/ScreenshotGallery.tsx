'use client';

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, X, ZoomIn } from 'lucide-react';
import { AppScreenshot } from 'src/types/software';
import PhoneMockup from './PhoneMockup';

interface ScreenshotGalleryProps {
  screenshots: AppScreenshot[];
  appName?: string;
}

export default function ScreenshotGallery({
  screenshots,
  appName = 'شرح الدرة المضية',
}: ScreenshotGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 240;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    if (direction === 'left') {
      setCurrentIndex((prev) => Math.min(screenshots.length - 1, prev + 1));
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Calculate index based on scroll position in RTL
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const ratio = Math.abs(scrollLeft) / maxScroll;
      const index = Math.round(ratio * (screenshots.length - 1));
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full my-8">
      {/* Container with relative positioning for navigation arrows */}
      <div className="relative group">
        {/* Previous Button (Right arrow in RTL) */}
        <button
          onClick={() => scroll('right')}
          aria-label="السابق"
          className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/90 dark:bg-[#1A2222]/90 border border-border dark:border-[#283535] text-foreground shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Next Button (Left arrow in RTL) */}
        <button
          onClick={() => scroll('left')}
          aria-label="التالي"
          className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/90 dark:bg-[#1A2222]/90 border border-border dark:border-[#283535] text-foreground shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Horizontal Scroll Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto scrollbar-none py-6 px-4 sm:px-8 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {screenshots.map((shot, idx) => (
            <div key={shot.id} className="snap-center">
              <PhoneMockup
                screenshot={shot}
                appName={appName}
                onClick={() => setLightboxIndex(idx)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicators / Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {screenshots.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => {
              setCurrentIndex(dotIdx);
              if (scrollRef.current) {
                const targetScroll = dotIdx * 240;
                scrollRef.current.scrollTo({ left: -targetScroll, behavior: 'smooth' });
              }
            }}
            aria-label={`شاشة ${dotIdx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === dotIdx
                ? 'w-6 h-2 bg-brand-primary dark:bg-[#00B3B7]'
                : 'w-2 h-2 bg-border dark:bg-[#283535] hover:bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex flex-col items-center max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 left-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Enlarged Phone Mockup */}
            <div className="scale-110 sm:scale-125 my-8">
              <PhoneMockup
                screenshot={screenshots[lightboxIndex]}
                appName={appName}
              />
            </div>

            {/* Captions and Navigation */}
            <div className="w-full flex items-center justify-between text-white text-xs sm:text-sm font-bold mt-2">
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1
                  )
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                السابق
              </button>

              <span className="text-white/80">
                {screenshots[lightboxIndex].title} ({lightboxIndex + 1} / {screenshots.length})
              </span>

              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
