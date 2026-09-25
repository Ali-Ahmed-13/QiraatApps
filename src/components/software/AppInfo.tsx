import React from 'react';
import { Calendar, Tag, Database, ShieldCheck } from 'lucide-react';

interface AppInfoProps {
  version: string;
  size: string;
  lastUpdated: string;
  className?: string;
}

export default function AppInfo({
  version,
  size,
  lastUpdated,
  className = '',
}: AppInfoProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/60 dark:border-[#212C2C]/60 pt-8 mt-12 text-center ${className}`}
    >
      {/* 1. تاريخ التحديث */}
      <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border border-border/60 dark:border-[#212C2C]/60 shadow-xs">
        <div className="text-right">
          <span className="text-[11px] font-bold text-muted block">تاريخ التحديث</span>
          <span className="text-sm font-black text-foreground font-tajawal">{lastUpdated}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      {/* 2. الإصدار */}
      <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border border-border/60 dark:border-[#212C2C]/60 shadow-xs">
        <div className="text-right">
          <span className="text-[11px] font-bold text-muted block">الإصدار</span>
          <span className="text-sm font-black text-foreground font-tajawal">{version}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5" />
        </div>
      </div>

      {/* 3. الحجم */}
      <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card border border-border/60 dark:border-[#212C2C]/60 shadow-xs">
        <div className="text-right">
          <span className="text-[11px] font-bold text-muted block">حجم التطبيق</span>
          <span className="text-sm font-black text-foreground font-tajawal">{size}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0">
          <Database className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
