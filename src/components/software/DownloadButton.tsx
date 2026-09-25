import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { AppSourceType } from 'src/types/software';

interface DownloadButtonProps {
  sourceType: AppSourceType;
  googlePlayUrl?: string;
  apkUrl?: string;
  variant?: 'card' | 'details-primary' | 'details-secondary';
  className?: string;
}

export function GooglePlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3.609 1.814L13.793 12 3.61 22.186c-.198-.184-.31-.444-.31-.722V2.536c0-.278.112-.538.31-.722z" fill="#00D2FF" />
      <path d="M17.156 8.637l-3.363 3.363 3.363 3.363 3.82-2.183c1.092-.624 1.092-1.642 0-2.266l-3.82-2.277z" fill="#FFCE00" />
      <path d="M3.609 1.814L14.793 8.2l-1-1L3.609 1.814z" fill="#00E676" />
      <path d="M13.793 12l3.363-3.363L4.331 2.213 13.793 12z" fill="#00C853" opacity="0.2" />
      <path d="M3.61 22.186L14.793 15.8l-1 1L3.61 22.186z" fill="#FF3D00" />
      <path d="M13.793 12l3.363 3.363L4.331 21.787 13.793 12z" fill="#D50000" opacity="0.2" />
    </svg>
  );
}

export default function DownloadButton({
  sourceType,
  googlePlayUrl = '#',
  apkUrl = '#',
  variant = 'card',
  className = '',
}: DownloadButtonProps) {
  // If variant is for card
  if (variant === 'card') {
    const isGooglePlay = sourceType === 'google_play';
    const targetUrl = isGooglePlay ? googlePlayUrl : apkUrl;

    return (
      <Link
        href={targetUrl}
        target={targetUrl.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border border-brand-primary/25 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] hover:bg-brand-primary hover:text-white dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group/btn ${className}`}
      >
        {isGooglePlay ? (
          <>
            <GooglePlayIcon className="w-4 h-4 shrink-0 transition-transform group-hover/btn:scale-110" />
            <span>تحميل من جوجل بلاي</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 shrink-0 transition-transform group-hover/btn:-translate-y-0.5" />
            <span>تحميل APK مباشر</span>
          </>
        )}
      </Link>
    );
  }

  // If variant is details-primary (Google Play button on details page)
  if (variant === 'details-primary') {
    return (
      <Link
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base bg-brand-primary hover:bg-brand-primary-hover text-white transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer ${className}`}
      >
        <GooglePlayIcon className="w-5 h-5 shrink-0" />
        <span>تحميل من جوجل بلاي</span>
      </Link>
    );
  }

  // If variant is details-secondary (APK button on details page)
  return (
    <Link
      href={apkUrl}
      download
      className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base border-2 border-brand-primary/60 dark:border-brand-primary text-brand-primary dark:text-[#00B3B7] hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary-light/10 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${className}`}
    >
      <Download className="w-5 h-5 shrink-0" />
      <span>تحميل APK مباشر</span>
    </Link>
  );
}
