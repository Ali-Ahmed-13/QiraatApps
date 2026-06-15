'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-500  tracking-tight">
            دليل تطبيقات{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              علوم القرآن والقراءات
            </span>
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 dark:after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
          >
            الرئيسية
          </Link>
          <Link
            href="/#catalog"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 dark:after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
          >
            دليل البرامج
          </Link>
        </nav>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-4">
          {mounted ? (
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
              ) : (
                <Moon className="w-5 h-5 text-slate-500" />
              )}
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/20 animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
