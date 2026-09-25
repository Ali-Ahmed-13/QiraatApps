'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Download, Heart } from 'lucide-react';
import { IslamicApp } from 'src/types/software';
import AppIcon from './AppIcon';
import DownloadButton from './DownloadButton';

interface AppCardProps {
  app: IslamicApp;
  isFavorite?: boolean;
  onToggleFavorite?: (appId: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function AppCard({
  app,
  isFavorite = false,
  onToggleFavorite,
  viewMode = 'grid',
}: AppCardProps) {
  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(app.id);
    }
  };

  if (viewMode === 'list') {
    return (
      <Link
        href={`/software/${app.id}`}
        className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/40 rounded-[22px] p-5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 cursor-pointer"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <AppIcon theme={app.iconTheme} size="sm" className="shrink-0" />
          <div className="text-right flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-2.5 py-0.5 rounded-full">
                {app.category}
              </span>
              {app.isFeatured && (
                <span className="text-[10px] font-bold text-white bg-[#E68A00] px-2 py-0.5 rounded-full">
                  {app.featuredBadge || 'مميز'}
                </span>
              )}
            </div>
            <h3 className="font-amiri font-bold text-lg text-foreground group-hover:text-brand-primary transition-colors truncate">
              {app.name}
            </h3>
            <p className="text-xs text-muted font-medium line-clamp-1 mt-0.5">
              {app.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
          <div className="flex items-center gap-4 text-xs font-bold text-muted">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span className="text-foreground">{app.rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-light-text" />
              <span>{app.downloads}</span>
            </span>
          </div>

          <div className="w-48 shrink-0">
            <DownloadButton
              sourceType={app.sourceType}
              googlePlayUrl={app.googlePlayUrl}
              apkUrl={app.apkUrl}
              variant="card"
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/software/${app.id}`}
      className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/40 rounded-[26px] p-5 sm:p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative hover:-translate-y-1"
    >
      {/* Top action / Badge */}
      <div className="flex items-center justify-between w-full mb-2">
        {/* Most Downloaded Badge */}
        {app.isFeatured ? (
          <span className="text-[10px] font-bold text-white bg-[#E68A00] px-2.5 py-0.5 rounded-full shadow-xs">
            {app.featuredBadge || 'الأكثر تحميلاً ★'}
          </span>
        ) : (
          <span />
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={handleFav}
          aria-label={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
          className="p-1 rounded-full text-light-text hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'stroke-current'
            }`}
          />
        </button>
      </div>

      {/* Center Icon */}
      <div className="flex flex-col items-center justify-center my-1">
        <AppIcon
          theme={app.iconTheme}
          size="md"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Title */}
        <h3 className="font-amiri font-bold text-lg sm:text-xl text-foreground group-hover:text-brand-primary transition-colors text-center mt-3.5 leading-snug">
          {app.name}
        </h3>

        {/* Category Badge */}
        <span className="text-[11px] font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-0.5 rounded-full mt-1.5">
          {app.category}
        </span>

        {/* Description */}
        <p className="text-xs text-muted font-medium text-center line-clamp-2 leading-relaxed mt-2.5 px-1 font-tajawal">
          {app.description}
        </p>
      </div>

      {/* Bottom stats & Download Button */}
      <div className="mt-4 pt-3.5 border-t border-border/50 dark:border-[#212C2C]/50 flex flex-col gap-3">
        {/* Rating and Downloads */}
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-foreground font-black">{app.rating}</span>
          </div>

          <div className="flex items-center gap-1 text-light-text font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>{app.downloads}</span>
          </div>
        </div>

        {/* Download Button */}
        <DownloadButton
          sourceType={app.sourceType}
          googlePlayUrl={app.googlePlayUrl}
          apkUrl={app.apkUrl}
          variant="card"
        />
      </div>
    </Link>
  );
}
