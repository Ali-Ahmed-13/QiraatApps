/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Shield,
  Scale,
  PenTool,
  Bookmark,
  GraduationCap,
  Sparkles,
  BookMarked,
  Milestone,
  FileText,
  Users,
  Compass,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'sciences' | 'knowledge' | null>(null);

  // Mobile accordion states
  const [mobileSciencesOpen, setMobileSciencesOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);

  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mega menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const userButtonAppearance = {
    elements: {
      avatarBox: 'w-10 h-10 border-2 border-brand-primary/20 hover:border-brand-primary transition-all rounded-xl',
      userButtonPopoverCard: 'bg-card border border-border dark:border-[#212C2C] shadow-premium rounded-2xl p-2',
      userButtonPopoverActionButton: 'text-foreground hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 font-tajawal py-2.5 rounded-xl transition-all',
      userButtonPopoverActionButtonText: 'text-foreground font-tajawal font-bold text-xs',
      userButtonPopoverFooter: 'hidden',
      userButtonOuterIdentifier: 'text-foreground font-tajawal font-bold text-sm',
    }
  };

  const { isSignedIn, isLoaded } = useAuth();

  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const sciencesMegaList = [
    {
      title: 'العلوم الشرعية',
      items: [
        { name: 'علم التجويد والقراءات', desc: 'مخارج الحروف وأحكام التلاوة والترتيل', href: '/sciences/tajweed', icon: BookOpen },
        { name: 'علم العقيدة والتوحيد', desc: 'تأصيل عقدي رصين لمسائل الإيمان', href: '/sciences/aqeedah', icon: Shield },
        { name: 'علم الفقه وأصوله', desc: 'الأحكام الشرعية العملية وأدلتها المعتمدة', href: '/sciences/fiqh', icon: Scale },
        { name: 'تصفح جميع العلوم', desc: 'عرض المخطط العام للعلوم الشرعية', href: '/sciences', icon: Compass },
      ]
    },
    {
      title: 'اللغة العربية',
      items: [
        { name: 'النحو والصرف', desc: 'تقويم اللسان وفهم أصول الإعراب والبناء', href: '/arabic-language', icon: PenTool },
        { name: 'البلاغة والأدب', desc: 'تذوق أسرار البيان والجمال اللغوي العربي', href: '/arabic-language#rhetoric', icon: Sparkles },
        { name: 'فقه اللغة والمعاجم', desc: 'الاشتقاق ومعاني المفردات اللغوية', href: '/arabic-language#lexicon', icon: BookMarked },
      ]
    },
    {
      title: 'خرائط التعلّم المنهجية',
      items: [
        { name: 'خريطة التعلم العامة', desc: 'المسار التعليمي الشامل خطوة بخطوة', href: '/roadmap', icon: Milestone },
        { name: 'مرحلة التأسيس', desc: 'البداية العلمية مع المتون الصغرى المختصرة', href: '/roadmap#level-foundation', icon: Bookmark },
        { name: 'مرحلة الترقية والتمكين', desc: 'الشروح المتوسطة والمطولات للتحقيق', href: '/roadmap#level-advanced', icon: GraduationCap },
      ]
    }
  ];

  const knowledgeMegaList = [
    {
      title: 'المكتبة الرقمية',
      items: [
        { name: 'خزانة الكتب والمنظومات', desc: 'مطالعة هادئة للمتون المحققة والشروح', href: '/books', icon: BookOpen },
      ]
    },
    {
      title: 'البحوث والمعرفة',
      items: [
        { name: 'مقالات شرعية وثقافية', desc: 'مقالات وبحوث تأصيلية محررة بأقلام طلبة العلم', href: '/articles', icon: FileText },
        { name: 'العلماء والمسندون', desc: 'تراجم وسير أئمة القراءات ورواة الأثر', href: '/scholars', icon: Users },
        { name: 'أرشيف الفتاوى والمسائل', desc: 'إجابات شرعية محررة حول التلاوة والعبادات', href: '/fatwas', icon: HelpCircle },
      ]
    },
    {
      title: 'بوابة الطالب',
      items: [
        { name: 'حساب الطالب الشخصي', desc: 'متابعة تقدمك وإنجازاتك في المسارات', href: '/student-hub', icon: GraduationCap },
      ]
    }
  ];
  return (

    <div ref={headerRef} className="w-full sticky top-0 z-50">
      {/* 🌟 الشريط العلوي المتحرك: مقتبسات بلمسة ذهبية إسلامية */}
      <div className="w-full bg-[#FBF7EC] dark:bg-[#1C1810]/30 text-brand-primary dark:text-[#E7C682] text-xs py-2 overflow-hidden border-b border-border dark:border-[#212C2C] select-none font-tajawal">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="relative flex-grow overflow-hidden h-4 flex items-center">
            <div className="animate-marquee flex gap-16 font-semibold text-[11px] sm:text-xs">
              <span>
                حديث شريف: قال رسول الله ﷺ: «خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ» (رواه البخاري)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «مَن سَلَكَ طَرِيقًا يَلْتَمِسُ فيه عِلْمًا، سَهَّلَ اللَّهُ له به طَرِيقًا إلى الجَنَّةِ» (رواه مسلم)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «إنَّ للهِ أهلِينَ مِنَ الناسِ.. هُم أهلُ القرآنِ، أهلُ اللهِ وخاصَّتُهُ» (رواه أحمد)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «مَن يُرِدِ اللَّهُ به خَيْرًا يُفَقِّهْهُ في الدِّينِ» (متفق عليه)
              </span>
              <span>•</span>
              <span>
                حديث شريف: قال رسول الله ﷺ: «إنَّ اللَّهَ يَرْفَعُ بهذا الكِتَابِ أَقْوَامًا، وَيَضَعُ به آخَرِينَ» (رواه مسلم)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 شريط التنقل الرئيسي الفاخر */}
      <header className="w-full bg-nav backdrop-blur-md border-b border-border dark:border-[#212C2C] theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* الشعار والهوية البصرية */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-xl p-1 transition-all">
            <div className="relative w-11 h-11 bg-white dark:bg-white rounded-2xl flex items-center justify-center border border-border shadow-sm group-hover:rotate-6 transition-transform duration-500">
              <Image
                src="/fullIcon.png"
                alt="لوجو تيجان"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-amiri font-bold text-xl sm:text-2xl tracking-tight text-foreground">
                منصة <span className="text-brand-primary dark:text-[#00B3B7] font-black">تِيجَان</span>
              </span>
              <span className="text-[10px] text-muted font-bold tracking-widest leading-none mt-0.5">
                التعليمية الإسلامية
              </span>
            </div>
          </Link>

          {/* روابط التصفح الأساسية (لشاشات الكمبيوتر) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-bold text-foreground font-tajawal h-full">

            {/* الرئيسية */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${isLinkActive('/')
                ? 'bg-brand-primary-light dark:bg-brand-primary-light/15 text-brand-primary dark:text-brand-primary'
                : 'hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 text-muted hover:text-foreground'
                }`}
            >
              الرئيسية
            </Link>

            {/* العلوم واللغة (ميجا منيو) */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'sciences' ? null : 'sciences')}
                onMouseEnter={() => setActiveMegaMenu('sciences')}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 cursor-pointer ${activeMegaMenu === 'sciences' || isLinkActive('/sciences') || isLinkActive('/arabic-language') || isLinkActive('/roadmap')
                  ? 'bg-brand-primary-light dark:bg-brand-primary-light/15 text-brand-primary dark:text-brand-primary'
                  : 'hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 text-muted hover:text-foreground'
                  }`}
              >
                <span>العلوم واللغة</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === 'sciences' ? 'rotate-185' : ''}`} />
              </button>

              {/* Mega Menu: Sciences */}
              {activeMegaMenu === 'sciences' && (
                <div
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  className="absolute right-[-150px] top-[calc(100%-8px)] w-[960px] max-w-[95vw] bg-white dark:bg-[#1A1D1D] border border-border dark:border-[#283535] rounded-[24px] p-8 shadow-2xl z-50 animate-fade-in grid grid-cols-3 gap-8"
                >
                  {sciencesMegaList.map((col, index) => (
                    <div key={index} className="flex flex-col gap-5 border-l border-border/40 dark:border-[#212C2C]/40 last:border-0 pl-6 last:pl-0">
                      <h4 className="font-amiri font-bold text-lg text-brand-secondary dark:text-[#E7C682] border-b border-border/60 dark:border-[#212C2C]/60 pb-2.5">
                        {col.title}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {col.items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          const active = isLinkActive(item.href);
                          return (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              className={`flex items-start gap-4 p-3 rounded-2xl hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary-light/5 transition-all duration-300 group/item ${active ? 'bg-brand-primary-light/20 text-brand-primary' : ''
                                }`}
                            >
                              <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 ${active
                                ? 'bg-brand-primary/10 text-brand-primary'
                                : 'bg-border/40 dark:bg-border/10 text-muted group-hover/item:bg-brand-primary/10 group-hover/item:text-brand-primary'
                                }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-foreground group-hover/item:text-brand-primary transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-xs text-light-text mt-1 leading-relaxed">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* بوابة المعرفة (ميجا منيو) */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'knowledge' ? null : 'knowledge')}
                onMouseEnter={() => setActiveMegaMenu('knowledge')}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 cursor-pointer ${activeMegaMenu === 'knowledge' || isLinkActive('/books') || isLinkActive('/articles') || isLinkActive('/scholars') || isLinkActive('/fatwas') || isLinkActive('/student-hub')
                  ? 'bg-brand-primary-light dark:bg-brand-primary-light/15 text-brand-primary dark:text-brand-primary'
                  : 'hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 text-muted hover:text-foreground'
                  }`}
              >
                <span>المكتبة والمعرفة</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === 'knowledge' ? 'rotate-185' : ''}`} />
              </button>

              {/* Mega Menu: Knowledge */}
              {activeMegaMenu === 'knowledge' && (
                <div
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  className="absolute right-[-300px] top-[calc(100%-8px)] w-[960px] max-w-[95vw] bg-white dark:bg-[#1A1D1D] border border-border dark:border-[#283535] rounded-[24px] p-8 shadow-2xl z-50 animate-fade-in grid grid-cols-3 gap-8"
                >
                  {knowledgeMegaList.map((col, index) => (
                    <div key={index} className="flex flex-col gap-5 border-l border-border/40 dark:border-[#212C2C]/40 last:border-0 pl-6 last:pl-0">
                      <h4 className="font-amiri font-bold text-lg text-brand-secondary dark:text-[#E7C682] border-b border-border/60 dark:border-[#212C2C]/60 pb-2.5">
                        {col.title}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {col.items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          const active = isLinkActive(item.href);
                          return (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              className={`flex items-start gap-4 p-3 rounded-2xl hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary-light/5 transition-all duration-300 group/item ${active ? 'bg-brand-primary-light/20 text-brand-primary' : ''
                                }`}
                            >
                              <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 ${active
                                ? 'bg-brand-primary/10 text-brand-primary'
                                : 'bg-border/40 dark:bg-border/10 text-muted group-hover/item:bg-brand-primary/10 group-hover/item:text-brand-primary'
                                }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-foreground group-hover/item:text-brand-primary transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-xs text-light-text mt-1 leading-relaxed">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* التطبيقات */}
            <Link
              href="/software"
              className={`px-4 py-2 rounded-xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${isLinkActive('/software')
                ? 'bg-brand-primary-light dark:bg-brand-primary-light/15 text-brand-primary dark:text-brand-primary'
                : 'hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 text-muted hover:text-foreground'
                }`}
            >
              التطبيقات المساندة
            </Link>

            {/* اتصل بنا */}
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${isLinkActive('/contact')
                ? 'bg-brand-primary-light dark:bg-brand-primary-light/15 text-brand-primary dark:text-brand-primary'
                : 'hover:bg-brand-primary-light/50 dark:hover:bg-brand-primary-light/5 text-muted hover:text-foreground'
                }`}
            >
              اتصل بنا
            </Link>

          </nav>

          {/* أدوات التحكم الجانبية (مظهر، مستخدم، جوال) */}
          <div className="flex items-center gap-3">

            {/* زر تبديل الثيم المطور مع حركة دوران */}
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl border border-border dark:border-[#212C2C] hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary-light/10 text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 cursor-pointer group"
                aria-label="تبديل المظهر"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-brand-secondary group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-primary group-hover:-rotate-45 transition-transform duration-500" />
                )}
              </button>
            ) : (
              <div className="w-10 h-10 rounded-xl border border-border bg-border/20 animate-pulse" />
            )}

            {/* أزرار الحساب وبوابة الطالب المباشرة باستخدام Clerk */}
            {!isLoaded ? (
              <div className="w-10 h-10 rounded-xl border border-border bg-border/20 animate-pulse hidden sm:block" />
            ) : isSignedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/student-hub"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary hover:bg-brand-primary-light text-xs font-bold transition-all duration-300 border border-brand-primary/10 h-10"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>بوابة الطالب</span>
                </Link>
                <UserButton
                  appearance={userButtonAppearance}
                />
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-border hover:border-brand-primary bg-card hover:bg-brand-primary-light/35 text-brand-primary dark:text-foreground text-xs font-bold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/40 h-10">
                    تسجيل الدخول
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white dark:text-white text-xs font-bold transition-all duration-300 shadow-premium hover:shadow-premium-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50 h-10">
                    إنشاء حساب
                  </button>
                </SignUpButton>
              </div>
            )}

            {/* زر الحساب الشخصي فقط للموبايل يظهر في شريط التحكم الرئيسي */}
            {isLoaded && isSignedIn && (
              <div className="sm:hidden">
                <UserButton
                  appearance={userButtonAppearance}
                />
              </div>
            )}

            {/* زر قائمة الجوال */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-border dark:border-[#212C2C] hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary-light/10 text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 cursor-pointer"
              aria-label="القائمة الرئيسية"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* قائمة تصفح الجوال المتطابقة مع الهوية والمدعومة بالاكورديون */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border dark:border-[#212C2C] bg-card/95 backdrop-blur-lg px-4 py-6 shadow-premium max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col gap-3 font-tajawal">

              <Link
                href="/"
                className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${isLinkActive('/')
                  ? 'bg-brand-primary-light/40 text-brand-primary dark:text-brand-primary'
                  : 'text-muted hover:bg-border/20'
                  }`}
              >
                الرئيسية
              </Link>

              {/* العلوم واللغة للجوال */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileSciencesOpen(!mobileSciencesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-muted hover:bg-border/20 cursor-pointer"
                >
                  <span>العلوم واللغة</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSciencesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSciencesOpen && (
                  <div className="mr-4 mt-1 border-r-2 border-border/80 dark:border-[#212C2C] pr-4 flex flex-col gap-2.5 py-1">
                    {sciencesMegaList.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-brand-secondary">{col.title}</span>
                        {col.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            className="flex items-center gap-2.5 text-xs py-1.5 font-semibold text-muted hover:text-brand-primary transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* المكتبة والمعرفة للجوال */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileKnowledgeOpen(!mobileKnowledgeOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-muted hover:bg-border/20 cursor-pointer"
                >
                  <span>المكتبة والمعرفة</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileKnowledgeOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileKnowledgeOpen && (
                  <div className="mr-4 mt-1 border-r-2 border-border/80 dark:border-[#212C2C] pr-4 flex flex-col gap-2.5 py-1">
                    {knowledgeMegaList.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-brand-secondary">{col.title}</span>
                        {col.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            className="flex items-center gap-2.5 text-xs py-1.5 font-semibold text-muted hover:text-brand-primary transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/software"
                className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${isLinkActive('/software')
                  ? 'bg-brand-primary-light/40 text-brand-primary dark:text-brand-primary'
                  : 'text-muted hover:bg-border/20'
                  }`}
              >
                التطبيقات المساندة
              </Link>

              <Link
                href="/contact"
                className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${isLinkActive('/contact')
                  ? 'bg-brand-primary-light/40 text-brand-primary dark:text-brand-primary'
                  : 'text-muted hover:bg-border/20'
                  }`}
              >
                اتصل بنا
              </Link>

              {/* بوابة الطالب للجوال مع Clerk */}
              {!isLoaded ? (
                <div className="h-10 w-full rounded-2xl bg-border/20 animate-pulse mt-2" />
              ) : isSignedIn ? (
                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    href="/student-hub"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary-hover transition-all text-center"
                  >
                    <GraduationCap className="w-4.5 h-4.5" />
                    <span>دخول بوابة الطالب</span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <SignInButton mode="modal">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-border hover:border-brand-primary bg-card hover:bg-brand-primary-light/35 text-brand-primary dark:text-foreground text-sm font-bold transition-all text-center cursor-pointer">
                      تسجيل الدخول
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary-hover transition-all text-center cursor-pointer">
                      إنشاء حساب
                    </button>
                  </SignUpButton>
                </div>
              )}

            </nav>
          </div>
        )}
      </header>
    </div>
  );
}