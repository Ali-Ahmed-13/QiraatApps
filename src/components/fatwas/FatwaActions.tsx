'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Copy, Share2, Check, Bookmark, Sparkles } from 'lucide-react';
import { Fatwa } from 'src/types/fatwas';
import { getStudentData, toggleFavoriteBook } from '@/utils/studentSync';
import AuthModal from '@/components/ui/AuthModal';

interface FatwaActionsProps {
  fatwa: Fatwa;
}

export default function FatwaActions({ fatwa }: FatwaActionsProps) {
  const { user } = useUser();
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fatwaTitle = `فتوى: ${fatwa.question || 'مسألة شرعية'}`;
  const questionText = fatwa.question || 'مسألة شرعية';
  const answerText = fatwa.answer || '';
  const referenceText = fatwa.reference || 'منصة تِيجَان';

  useEffect(() => {
    if (user) {
      const data = getStudentData(user);
      setIsFav((data.favorites || []).includes(fatwaTitle));
    }
  }, [user, fatwaTitle]);

  const handleToggleFav = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const nextState = !isFav;
    setIsFav(nextState);
    setToastMessage(nextState ? 'تمت إضافة الفتوى إلى مفضلتك 🔖' : 'تمت إزالة الفتوى من المفضلة');
    setTimeout(() => setToastMessage(null), 3000);

    toggleFavoriteBook(user, fatwaTitle);
  };

  const handleCopyFatwa = () => {
    const textToCopy = `السؤال: ${questionText}\n\nالجواب: ${answerText}\n\nالمصدر: ${referenceText}\nمنصة تِيجَان للقرآن الكريم والعلوم الشرعية`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: questionText,
          text: `${questionText}\n${answerText.substring(0, 100)}...`,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link if user cancels share
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="تسجيل الدخول مطلوب 🔐"
        description="لحفظ الفتاوى والمسائل الشرعية في مفضلتك وبوابة الطالب، يرجى تسجيل الدخول أولاً."
      />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-brand-primary text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20">
            <Sparkles className="w-5 h-5 text-brand-secondary" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60 dark:border-[#212C2C]/60">
        <button
          onClick={handleToggleFav}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isFav
              ? 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/40'
              : 'bg-card border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground'
          }`}
          title={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current text-brand-secondary' : ''}`} />
          <span>{isFav ? 'في المفضلة' : 'حفظ الفتوى'}</span>
        </button>

        <button
          onClick={handleCopyFatwa}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] hover:bg-brand-primary/10 text-xs font-bold transition-all cursor-pointer"
          title="نسخ نص الفتوى والجواب"
        >
          {copiedText ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">تم النسخ بنجاح!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>نسخ السؤال والجواب</span>
            </>
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:bg-border/20 text-muted hover:text-foreground text-xs font-bold transition-all cursor-pointer"
          title="نسخ رابط الفتوى المباشر"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">تم نسخ الرابط!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-light-text" />
              <span>نسخ الرابط المباشر</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold shadow-premium transition-all cursor-pointer mr-auto"
          title="مشاركة الفتوى"
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة المسألة</span>
        </button>
      </div>
    </>
  );
}
