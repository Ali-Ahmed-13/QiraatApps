'use client';

import React from 'react';
import { AppScreenshot } from 'src/types/software';
import { Play, Volume2, Bookmark, CheckCircle2, RotateCcw, FastForward, Rewind } from 'lucide-react';

interface PhoneMockupProps {
  screenshot: AppScreenshot;
  appName?: string;
  className?: string;
  onClick?: () => void;
}

export default function PhoneMockup({
  screenshot,
  appName = 'شرح الدرة المضية',
  className = '',
  onClick,
}: PhoneMockupProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-[190px] sm:w-[220px] aspect-[9/18.5] rounded-[32px] p-2 bg-[#1E232A] border-[4px] border-[#2A313C] shadow-2xl overflow-hidden cursor-pointer select-none transition-transform hover:scale-[1.02] shrink-0 ${className}`}
    >
      {/* Phone Speaker & Camera Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#111418] rounded-full z-30 flex items-center justify-center">
        <div className="w-8 h-1 bg-[#2A313C] rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col justify-between text-right text-white">
        {screenshot.type === 'splash' && (
          <div className="w-full h-full bg-gradient-to-b from-[#0B1E36] via-[#09182C] to-[#040C17] p-3 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="pt-5 flex items-center justify-between text-[9px] text-[#E7C682]">
              <span>9:41</span>
              <span>الدرة المضية</span>
            </div>

            {/* Center Logo */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl border border-[#D8B15C]/40 bg-[#071322] flex items-center justify-center mb-2 shadow-inner">
                <span className="font-amiri font-bold text-2xl text-[#E7C682]">الدرة</span>
              </div>
              <h4 className="font-amiri font-bold text-base text-[#FFF2B2]">الدرة المضية</h4>
              <p className="text-[8px] text-[#D8B15C]/80 mt-0.5">في علم النحو والقراءات</p>

              {/* Menu Buttons */}
              <div className="w-full flex flex-col gap-1.5 mt-5">
                <div className="w-full py-1.5 px-3 rounded-lg bg-[#E7C682] text-[#071322] font-bold text-[9px] text-center shadow-xs">
                  المتن والأصول
                </div>
                <div className="w-full py-1.5 px-3 rounded-lg bg-[#0F294A] border border-[#E7C682]/40 text-[#E7C682] font-bold text-[9px] text-center">
                  الشروح الصوتية
                </div>
                <div className="w-full py-1.5 px-3 rounded-lg bg-[#0F294A] border border-[#E7C682]/40 text-[#E7C682] font-bold text-[9px] text-center">
                  المتون المتشابهة
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-4 flex items-center justify-center border-t border-white/10 pt-1">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        )}

        {screenshot.type === 'reader' && (
          <div className="w-full h-full bg-[#FAF7F0] text-[#1E232A] p-3 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="pt-5 flex items-center justify-between text-[9px] text-[#8C6D37] border-b border-[#E0D7C6] pb-1.5">
              <span>الجزء الأول</span>
              <span className="font-bold">باب مخارج الحروف</span>
            </div>

            {/* Reader Content */}
            <div className="my-auto py-2 flex flex-col gap-2 font-amiri text-[10px] leading-relaxed text-[#2C2214]">
              <div className="bg-[#F0E8D5] p-2 rounded-lg border border-[#D5C7AD] text-center">
                <span className="font-bold text-[#8C6D37] text-[10px] block mb-1">بيت (١)</span>
                <p className="font-bold text-[11px] leading-snug">
                  يَقُولُ رَاجِي رَحْمَةِ الغَفُورِ * دَوْمًا عَلِيُّ بْنُ سُلَيْمَانَ أَقُولُ
                </p>
              </div>

              <div className="bg-white/80 p-2 rounded-lg border border-[#E5DBCA]">
                <span className="font-bold text-[#8C6D37] text-[9px] block mb-0.5">الشرح والبيان:</span>
                <p className="text-[9px] text-[#554734] leading-relaxed">
                  بدأ الناظم رحمه الله بحمد الله وذكر اسمه راجياً العفو والغفران، ومفتتحاً منظومته بطلب العون والتوفيق.
                </p>
              </div>

              <div className="bg-[#F0E8D5] p-2 rounded-lg border border-[#D5C7AD] text-center">
                <span className="font-bold text-[#8C6D37] text-[10px] block mb-1">بيت (٢)</span>
                <p className="font-bold text-[11px] leading-snug">
                  أَحْمَدُ رَبِّي شَاكِرًا لِفَضْلِهِ * مُصَلِّيًا عَلَى النَّبِيِّ وَآلِهِ
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-6 flex items-center justify-between border-t border-[#E0D7C6] pt-1 text-[8px] text-[#7A6B56]">
              <span>صفحة ٤ من ٦٤</span>
              <div className="w-8 h-1 bg-[#A69B88] rounded-full mx-auto" />
              <span>بحث في المتن</span>
            </div>
          </div>
        )}

        {screenshot.type === 'index' && (
          <div className="w-full h-full bg-[#FCFBF8] text-[#1E232A] p-3 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="pt-5 flex items-center justify-between text-[10px] font-bold text-[#006D6F] border-b border-[#E5E2DA] pb-1.5">
              <span>فهرس الأبواب</span>
              <span>١٢ باباً</span>
            </div>

            {/* Index Items */}
            <div className="my-auto flex flex-col gap-1.5 py-1">
              {[
                { title: 'المقدمة والبسملة', duration: '١٢ دقيقة' },
                { title: 'باب الإعراب والبناء', duration: '٢٤ دقيقة' },
                { title: 'باب مرفوعات الأسماء', duration: '٣٥ دقيقة' },
                { title: 'باب الفاعل ونائبه', duration: '١٨ دقيقة' },
                { title: 'باب المبتدأ والخبر', duration: '٣٠ دقيقة' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EBE8DF] shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-lg bg-[#E6F2F2] text-[#006D6F] flex items-center justify-center text-[9px] font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-[9px] text-[#1E232A]">{item.title}</h5>
                      <span className="text-[7px] text-[#888]">{item.duration}</span>
                    </div>
                  </div>
                  <Play className="w-3.5 h-3.5 text-[#006D6F]" />
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="h-4 flex items-center justify-center border-t border-[#E5E2DA] pt-1">
              <div className="w-12 h-1 bg-[#CCC] rounded-full" />
            </div>
          </div>
        )}

        {screenshot.type === 'player' && (
          <div className="w-full h-full bg-gradient-to-b from-[#0F1E30] via-[#091321] to-[#040910] p-3 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="pt-5 flex items-center justify-between text-[9px] text-[#90CAF9]">
              <span>الدرس الصوتي</span>
              <span>مشغل الدرة</span>
            </div>

            {/* Audio Disc / Art */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#D8B15C]/60 bg-[#071322] flex items-center justify-center mb-3 shadow-lg shadow-[#D8B15C]/10 animate-pulse">
                <Volume2 className="w-8 h-8 text-[#FFE082]" />
              </div>

              <h5 className="font-bold text-[11px] text-[#FFF] leading-snug">شرح باب مخارج الحروف</h5>
              <p className="text-[8px] text-[#90CAF9] mt-0.5">الشيخ د. عبد المحسن القاسم</p>

              {/* Progress Slider */}
              <div className="w-full mt-4">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-[#00B3B7] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[7px] text-white/60 mt-1">
                  <span>04:15</span>
                  <span>12:30</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <Rewind className="w-4 h-4 text-white/70" />
                <div className="w-8 h-8 rounded-full bg-[#006D6F] text-white flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <FastForward className="w-4 h-4 text-white/70" />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-4 flex items-center justify-center border-t border-white/10 pt-1">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
