import React from 'react';

interface AppIconProps {
  theme?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AppIcon({ theme = 'general', className = '', size = 'md' }: AppIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 rounded-xl',
    md: 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[22px]',
    lg: 'w-28 h-28 sm:w-32 sm:h-32 rounded-3xl sm:rounded-[28px]',
    xl: 'w-36 h-36 sm:w-40 sm:h-40 rounded-[32px]'
  };

  const currentSize = sizeClasses[size];

  switch (theme) {
    case 'quran':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1E5638] via-[#16442B] to-[#0D2D1C] shadow-md border border-[#D8B15C]/30 ${currentSize} ${className}`}>
          {/* Islamic Geometric Frame */}
          <div className="absolute inset-1 border border-[#D8B15C]/25 rounded-xl pointer-events-none" />
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-[#E7C682]" fill="currentColor">
            {/* Open Holy Quran with stand */}
            <path d="M50 20 L25 32 L25 72 L50 60 L75 72 L75 32 Z" fill="#2E7D32" opacity="0.4" />
            <path d="M50 22 C40 18 30 20 22 25 L22 68 C30 63 40 62 50 66 C60 62 70 63 78 68 L78 25 C70 20 60 18 50 22 Z" fill="#F8F3E6" stroke="#D8B15C" strokeWidth="2" />
            <path d="M50 24 L50 64" stroke="#D8B15C" strokeWidth="1.5" />
            <path d="M30 35 Q40 33 45 36" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            <path d="M30 43 Q40 41 45 44" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            <path d="M30 51 Q40 49 45 52" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            <path d="M55 36 Q60 33 70 35" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            <path d="M55 44 Q60 41 70 43" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            <path d="M55 52 Q60 49 70 51" stroke="#C49D49" strokeWidth="1.2" fill="none" />
            {/* Rihal / Quran Stand */}
            <path d="M32 68 L18 85 L28 85 L50 67 L72 85 L82 85 L68 68" fill="#8D5B28" stroke="#D8B15C" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'durra':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0B1E36] via-[#09182C] to-[#040C17] shadow-md border border-[#E7C682]/40 ${currentSize} ${className}`}>
          {/* Subtle ornate corners */}
          <div className="absolute inset-1.5 border border-[#D8B15C]/30 rounded-xl" />
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#E7C682]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#E7C682]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#E7C682]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#E7C682]" />
          
          <div className="flex flex-col items-center justify-center text-center px-2 z-10">
            <span className="font-amiri font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#E7C682] to-[#B8860B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none select-none">
              الدرة
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#E7C682] to-transparent my-1" />
            <span className="text-[8px] sm:text-[9px] font-bold text-[#E7C682]/80 font-tajawal tracking-wider">
              المضية
            </span>
          </div>
        </div>
      );

    case 'sirah':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0B4628] via-[#08361E] to-[#031D10] shadow-md border border-[#D8B15C]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1 border border-[#D8B15C]/20 rounded-xl" />
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" fill="none">
            {/* Mosque silhouette with dome & minaret */}
            <circle cx="50" cy="50" r="38" stroke="#D8B15C" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path d="M50 25 C40 35 38 48 38 68 L62 68 C62 48 60 35 50 25 Z" fill="#D8B15C" opacity="0.9" />
            <circle cx="50" cy="23" r="2" fill="#FFE599" />
            <path d="M50 18 L50 23" stroke="#FFE599" strokeWidth="1.5" />
            {/* Minarets */}
            <rect x="24" y="32" width="6" height="36" fill="#C49D49" rx="1" />
            <polygon points="27,24 23,32 31,32" fill="#FFE599" />
            <rect x="70" y="32" width="6" height="36" fill="#C49D49" rx="1" />
            <polygon points="73,24 69,32 77,32" fill="#FFE599" />
            {/* Base platform */}
            <rect x="18" y="68" width="64" height="6" fill="#8D5B28" rx="2" />
          </svg>
        </div>
      );

    case 'ajrumiyyah':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#EFE5D0] via-[#E5D7BC] to-[#D5C29F] shadow-md border border-[#8C6D37]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1.5 border border-[#8C6D37]/25 rounded-xl" />
          <div className="absolute inset-2 border-2 border-double border-[#8C6D37]/40 rounded-lg pointer-events-none" />
          <div className="text-center px-1 z-10">
            <span className="font-amiri font-bold text-lg sm:text-2xl text-[#4A3510] drop-shadow-sm block leading-tight">
              الآجرومية
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold text-[#7A581F] font-tajawal block mt-0.5">
              في قواعد النحو
            </span>
          </div>
        </div>
      );

    case 'kharidah':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#4A2E1B] via-[#3B2213] to-[#24130A] shadow-md border border-[#D8B15C]/35 ${currentSize} ${className}`}>
          <div className="absolute inset-1.5 border border-[#D8B15C]/30 rounded-xl" />
          <div className="absolute right-1 top-2 bottom-2 w-2 bg-[#D8B15C]/20 rounded-r" />
          <div className="text-center px-2 z-10">
            <div className="w-8 h-8 rounded-full border border-[#D8B15C]/40 mx-auto flex items-center justify-center mb-1">
              <span className="font-amiri font-bold text-sm text-[#FFE39F]">خ</span>
            </div>
            <span className="font-amiri font-bold text-base sm:text-lg text-[#FDEFD0] block leading-tight">
              الخريدة
            </span>
            <span className="text-[7px] sm:text-[8px] text-[#D8B15C] font-tajawal block">
              البهية
            </span>
          </div>
        </div>
      );

    case 'hisn':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0D5C63] via-[#09474D] to-[#04282B] shadow-md border border-[#48CAE4]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1 border border-white/15 rounded-xl" />
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" fill="none">
            {/* Mosque dome with crescent */}
            <path d="M50 20 Q55 20 62 30 Q70 45 70 70 L30 70 Q30 45 38 30 Q45 20 50 20 Z" fill="#E0F7FA" opacity="0.9" />
            <path d="M50 14 C48 16 48 18 50 20 C52 18 52 16 50 14 Z" fill="#FFD166" />
            {/* Doors and arches */}
            <path d="M44 70 L44 55 Q50 50 56 55 L56 70 Z" fill="#0D5C63" />
            <circle cx="50" cy="38" r="4" fill="#0D5C63" />
            {/* Base */}
            <rect x="20" y="70" width="60" height="5" fill="#FFE599" rx="1" />
          </svg>
        </div>
      );

    case 'riyadh':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3D1E4E] via-[#2F153D] to-[#1C0926] shadow-md border border-[#D8B15C]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1.5 border border-[#D8B15C]/25 rounded-xl" />
          <div className="text-center px-1 z-10">
            <span className="text-[#D8B15C] text-[10px] block mb-0.5">❖</span>
            <span className="font-amiri font-bold text-sm sm:text-base text-[#F4ECFF] block leading-tight">
              رياض الصالحين
            </span>
            <span className="text-[7px] sm:text-[8px] text-[#D8B15C]/80 font-tajawal block mt-0.5">
              للإمام النووي
            </span>
          </div>
        </div>
      );

    case 'tafsir':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1E4D6B] via-[#143952] to-[#0A2233] shadow-md border border-[#72B4D6]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1 border border-white/15 rounded-xl" />
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" fill="currentColor">
            {/* Rays */}
            <circle cx="50" cy="40" r="16" fill="#FCE9B0" opacity="0.3" />
            <path d="M50 15 L50 25 M75 40 L65 40 M25 40 L35 40 M68 22 L60 30 M32 22 L40 30" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" />
            {/* Book */}
            <path d="M50 35 L28 45 L28 75 L50 67 L72 75 L72 45 Z" fill="#F8F9FA" />
            <path d="M50 35 L50 67" stroke="#143952" strokeWidth="2" />
            <path d="M35 52 L45 49 M35 58 L45 55 M55 49 L65 52 M55 55 L65 58" stroke="#6C757D" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'zad':
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#2D6A4F] via-[#1B4332] to-[#081C15] shadow-md border border-[#74C69D]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1 border border-white/15 rounded-xl" />
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" fill="none">
            {/* Islamic Leaf Motif */}
            <path d="M50 18 C30 35 25 60 50 82 C75 60 70 35 50 18 Z" fill="#52B788" opacity="0.85" />
            <path d="M50 20 L50 80" stroke="#D8F3DC" strokeWidth="1.5" />
            <path d="M50 35 Q40 40 35 48" stroke="#D8F3DC" strokeWidth="1.2" />
            <path d="M50 48 Q40 53 37 62" stroke="#D8F3DC" strokeWidth="1.2" />
            <path d="M50 35 Q60 40 65 48" stroke="#D8F3DC" strokeWidth="1.2" />
            <path d="M50 48 Q60 53 63 62" stroke="#D8F3DC" strokeWidth="1.2" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#006D6F] via-[#005456] to-[#003B3D] shadow-md border border-[#D8B15C]/30 ${currentSize} ${className}`}>
          <div className="absolute inset-1.5 border border-[#D8B15C]/25 rounded-xl" />
          <div className="text-center px-1 z-10">
            <span className="font-amiri font-bold text-xl sm:text-2xl text-[#E7C682] drop-shadow-sm block leading-none">
              تِيجَان
            </span>
            <span className="text-[7px] sm:text-[8px] text-white/80 font-tajawal block mt-1">
              تطبيق إسلامي
            </span>
          </div>
        </div>
      );
  }
}
