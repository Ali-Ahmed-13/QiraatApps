import { Megaphone } from "lucide-react";

interface AdBannerProps {
  position: "top" | "content" | "sidebar";
}

export default function AdBanner({ position }: AdBannerProps) {
  // Google AdSense-compliant placeholders
  const adClientId = "ca-pub-placeholder-1234567890";
  const adSlotId = position === "top" ? "top-banner-slot" : "content-feed-slot";

  return (
    <div
      className={`w-full mx-auto my-6 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-card/40 dark:bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300 ${
        position === "top" ? "max-w-5xl min-h-[90px]" : "max-w-full min-h-[120px]"
      }`}
      data-ad-client={adClientId}
      data-ad-slot={adSlotId}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 dark:from-emerald-500/5 via-sky-500/5 to-transparent pointer-events-none" />

      {/* Ad Label Tag */}
      <span className="absolute top-2 left-3 px-2 py-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-card dark:bg-slate-800/60 rounded-md border border-border dark:border-transparent">
        مساحة إعلانية
      </span>

      <div className="flex flex-col sm:flex-row items-center gap-3 text-slate-400 dark:text-slate-500">
        <Megaphone className="w-5 h-5 text-amber-600/50 dark:text-emerald-400/40" />
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            مساحة إعلانية متوافقة مع شروط الخدمة
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            سيتم عرض الإعلانات المخصصة هنا تلقائياً بعد ربط حسابك.
          </p>
        </div>
      </div>
    </div>
  );
}
