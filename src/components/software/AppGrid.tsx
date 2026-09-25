'use client';

import React from 'react';
import { IslamicApp } from 'src/types/software';
import AppCard from './AppCard';
import { Layers } from 'lucide-react';

interface AppGridProps {
  apps: IslamicApp[];
  favorites: string[];
  onToggleFavorite: (appId: string) => void;
  viewMode: 'grid' | 'list';
}

export default function AppGrid({
  apps,
  favorites,
  onToggleFavorite,
  viewMode,
}: AppGridProps) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-card border border-border dark:border-[#212C2C] rounded-[28px] shadow-premium my-6">
        <Layers className="w-12 h-12 text-light-text mx-auto mb-4" />
        <h3 className="font-amiri font-bold text-xl text-foreground mb-2">
          لم نعثر على تطبيقات مطابقة
        </h3>
        <p className="text-xs sm:text-sm text-muted font-medium max-w-md mx-auto">
          جرب تغيير كلمات البحث أو اختيار تصنيف آخر لتصفح التطبيقات المتاحة في المنصة.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            isFavorite={favorites.includes(app.id)}
            onToggleFavorite={onToggleFavorite}
            viewMode="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          isFavorite={favorites.includes(app.id)}
          onToggleFavorite={onToggleFavorite}
          viewMode="grid"
        />
      ))}
    </div>
  );
}
