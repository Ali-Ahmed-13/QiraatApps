import React from "react";

export function CardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* App Icon placeholder */}
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex-grow flex flex-col gap-2">
          {/* Title placeholder */}
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
          {/* Category placeholder */}
          <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
      
      {/* Description lines */}
      <div className="space-y-2 py-2">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Meta indicators */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3.5 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Bottom CTA block */}
      <div className="h-9 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mt-1" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        {/* Large App Icon */}
        <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        
        <div className="flex-grow text-center sm:text-right space-y-3">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto sm:mx-0" />
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mx-auto sm:mx-0" />
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-2">
            <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Description lines */}
      <div className="space-y-4">
        <div className="h-4.5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="space-y-2.5">
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      {/* Button space */}
      <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  );
}
