import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AppFeaturesProps {
  features: string[];
  className?: string;
}

export default function AppFeatures({ features, className = '' }: AppFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className={`mt-10 text-right ${className}`}>
      <h3 className="font-amiri font-bold text-2xl text-foreground mb-6">
        مميزات التطبيق
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 dark:border-[#212C2C]/50 shadow-2xs"
          >
            <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-foreground leading-snug">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
