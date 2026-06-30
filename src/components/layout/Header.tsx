'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'التطبيقات', href: '/software' },
    { name: 'ركن طالب العلم', href: '/sciences' },
    { name: 'الكتب', href: '/books' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  return (
    <>
      {/* 🌟 الشريط العلوي الموحد: تم تحويله بالكامل إلى درجات الـ Amber الدافئة المتناسقة مع الهوية الذهبية */}
      <div className="w-full bg-[#F5EFE0] dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 text-xs py-2 overflow-hidden border-b border-[#E7E0D2] dark:border-amber-500/10 select-none">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="relative flex-grow overflow-hidden h-4 flex items-center">
            <div className="animate-marquee flex gap-16 font-medium text-[11px] sm:text-xs">
              <span>
                حديث شريف: قال رسول الله ﷺ: «خَيرُكُم مَن تَعَلَّمَ القُرآنَ
                وعَلَّمَهُ» (رواه البخاري)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «مَن سَلَكَ طَرِيقًا يَلْتَمِسُ فيه
                عِلْمًا، سَهَّلَ اللَّهُ له به طَرِيقًا إلى الجَنَّةِ» (رواه
                مسلم)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «إنَّ للهِ أهلِينَ مِنَ الناسِ.. هُم
                أهلُ القرآنِ، أهلُ اللهِ وخاصَّتُهُ» (رواه أحمد)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «مَن يُرِدِ اللَّهُ به خَيْرًا
                يُفَقِّهْهُ في الدِّينِ» (متفق عليه)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «إنَّ اللَّهَ يَرْفَعُ بهذا
                الكِتَابِ أَقْوَامًا، وَيَضَعُ به آخَرِينَ» (رواه مسلم)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «الْمَاهِرُ بالْقُرْآنِ مع
                السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ» (متفق عليه)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «ومَا اجْتَمَعَ قَوْمٌ في بَيْتٍ مِن
                بُيُوتِ اللهِ يَتْلُونَ كِتَابَ اللهِ وَيَتَدَارَسُونَهُ
                بيْنَهُمْ، إِلَّا نَزَلَتْ عَلَيْهِمِ السَّكِينَةُ» (رواه مسلم)
              </span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-card/80 dark:bg-[#0b0f19]/80 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo and Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/fullIcon.png"
              alt="لوجو تيجان"
              width={40}
              height={40}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200 tracking-tight">
              منصة{' '}
              <span className="text-amber-700 dark:text-amber-500 font-extrabold">
                 تِيجَان الإسلام
              </span>
            </span>
          </Link>

          {/* Main Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-amber-700 dark:hover:text-amber-500 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-700 dark:after:bg-amber-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Controls: Theme and Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                aria-label="تبديل المظهر"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-slate-500" />
                )}
              </button>
            ) : (
              <div className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/20 animate-pulse" />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
              aria-label="القائمة الرئيسية"
            >
              {isMenuOpen ? (
                <X className="w-4.5 h-4.5" />
              ) : (
                <Menu className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-850 bg-card dark:bg-[#0c101c] py-4 px-4 shadow-lg">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-700 dark:hover:text-amber-500 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
