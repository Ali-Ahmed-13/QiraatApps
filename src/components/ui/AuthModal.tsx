'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, LogIn, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  title = 'تسجيل الدخول مطلوب 🔐',
  description = 'لتسجيل إنجازك الدراسي وتوثيق التقدم في حسابك السحابي وبوابة الطالب، يرجى تسجيل الدخول أولاً.'
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div className="bg-card border border-border dark:border-[#212C2C] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-muted hover:text-foreground rounded-full hover:bg-border/30 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* أيقونة القفل الفاخرة */}
        <div className="w-16 h-16 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] mx-auto flex items-center justify-center mb-4 border border-brand-primary/20">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="font-amiri font-bold text-2xl text-foreground mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted font-tajawal font-medium leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول الآن</span>
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-border bg-background hover:bg-border/30 text-muted text-xs font-bold transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
