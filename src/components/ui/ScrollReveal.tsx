'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-in' | 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'scale-up' | 'rotate';
  delay?: number; // in ms
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.01,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // تفعيل فوري للأنيميشن إذا كان العنصر ضمن الشاشة أو بالقرب منها عند التحميل
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      setIsRevealed(true);
      if (once) return;
    }

    // تقليل التأخير (delay) لضمان الاستجابة السريعة
    const cappedDelay = Math.min(delay, 40);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (cappedDelay > 0) {
            setTimeout(() => {
              setIsRevealed(true);
            }, cappedDelay);
          } else {
            setIsRevealed(true);
          }

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: '200px 0px 200px 0px', // يبدأ الحركة قبل وصول العنصر بـ 200 بكسل
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, once, threshold]);

  const variantClass = `reveal-${variant}`;

  return (
    <div
      ref={ref}
      className={`${variantClass} ${isRevealed ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
