/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
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
  HelpCircle,
  Home,
  LayoutGrid,
  Phone,
  Bell,
  Award,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IslamicStarPattern, MosqueSilhouette, IslamicCornerPattern } from './IslamicMotifs';

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
  const { isSignedIn, isLoaded } = useAuth();

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

  const [scrollProgress, setScrollProgress] = useState(0);

  // Global scroll progress listener across entire website
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
      avatarBox: 'w-9 h-9 border-2 border-[#087A78]/30 hover:border-[#087A78] transition-all rounded-xl shadow-sm',
      userButtonPopoverCard: 'bg-card border border-border dark:border-[#1E2E3E] shadow-2xl rounded-2xl p-2',
      userButtonPopoverActionButton: 'text-foreground hover:bg-[#EAF5F5] dark:hover:bg-[#087A78]/15 font-tajawal py-2.5 rounded-xl transition-all',
      userButtonPopoverActionButtonText: 'text-foreground font-tajawal font-bold text-xs',
      userButtonPopoverFooter: 'hidden',
      userButtonOuterIdentifier: 'text-foreground font-tajawal font-bold text-sm',
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const isSciencesActive =
    activeMegaMenu === 'sciences' ||
    isLinkActive('/sciences') ||
    isLinkActive('/arabic-language') ||
    isLinkActive('/roadmap');

  const isKnowledgeActive =
    activeMegaMenu === 'knowledge' ||
    isLinkActive('/books') ||
    isLinkActive('/articles') ||
    isLinkActive('/scholars') ||
    isLinkActive('/fatwas');

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
    <div ref={headerRef} className="w-full sticky top-0 z-50 select-none font-tajawal" dir="rtl">
      
      {/* 🌟 1. الشريط العلوي الداكن الرفيع (Top Announcement / Hadith Bar) مطابق للمرجع */}
      <div className="relative w-full bg-[#102F4B] dark:bg-[#071320] text-white text-xs py-2 px-4 overflow-hidden border-b border-[#1C3E60] dark:border-[#0E243A]">
        
        {/* خلفية ظلال المساجد الرقيقة */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-15">
          <MosqueSilhouette className="w-full h-14 text-sky-400" />
        </div>

        {/* زخرفة إسلامية خفيفة في الزوايا */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 pointer-events-none opacity-20">
          <IslamicStarPattern className="w-20 h-20 text-[#D7AE55]" />
        </div>
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 pointer-events-none opacity-20">
          <IslamicStarPattern className="w-20 h-20 text-[#D7AE55]" />
        </div>

        <div className="w-full overflow-hidden h-6 flex items-center relative z-10">
          <div className="animate-marquee flex flex-nowrap items-center gap-8 whitespace-nowrap text-white/95 text-[11px] sm:text-xs font-semibold">
            {/* المجموعة الأولى من الأحاديث والآيات */}
            {[
              {
                label: 'قال الله تعالى:',
                text: '﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا﴾',
                ref: '(الطلاق 2)',
                icon: BookOpen,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«من سلك طريقًا يلتمس فيه علمًا سهل الله له به طريقًا إلى الجنة»',
                ref: '(رواه مسلم)',
                icon: Award,
              },
              {
                label: 'حديث شريف:',
                text: '«طلب العلم فريضة على كل مسلم»',
                ref: '(رواه ابن ماجه)',
                icon: Bookmark,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ»',
                ref: '(رواه البخاري)',
                icon: BookOpen,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«مَن يُرِدِ اللَّهُ به خَيْرًا يُفَقِّهْهُ في الدِّينِ»',
                ref: '(متفق عليه)',
                icon: Award,
              },
              {
                label: 'حديث شريف:',
                text: '«إنَّ للهِ أهلِينَ مِنَ الناسِ.. هُم أهلُ القرآنِ، أهلُ اللهِ وخاصَّتُهُ»',
                ref: '(رواه أحمد)',
                icon: Bookmark,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`set1-${idx}`} className="inline-flex items-center gap-6 shrink-0 flex-nowrap whitespace-nowrap">
                  <div className="inline-flex items-center gap-2 shrink-0 flex-nowrap whitespace-nowrap">
                    <span className="text-[#D7AE55] font-bold shrink-0">{item.label}</span>
                    <span className="text-white shrink-0 font-medium">{item.text}</span>
                    <span className="text-white/60 text-[10px] shrink-0">{item.ref}</span>
                    <Icon className="w-3.5 h-3.5 text-[#D7AE55] shrink-0" />
                  </div>
                  <span className="text-[#D7AE55]/60 font-serif shrink-0">|</span>
                </div>
              );
            })}

            {/* المجموعة الثانية للتكرار الانسيابي اللانهائي */}
            {[
              {
                label: 'قال الله تعالى:',
                text: '﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا﴾',
                ref: '(الطلاق 2)',
                icon: BookOpen,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«من سلك طريقًا يلتمس فيه علمًا سهل الله له به طريقًا إلى الجنة»',
                ref: '(رواه مسلم)',
                icon: Award,
              },
              {
                label: 'حديث شريف:',
                text: '«طلب العلم فريضة على كل مسلم»',
                ref: '(رواه ابن ماجه)',
                icon: Bookmark,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ»',
                ref: '(رواه البخاري)',
                icon: BookOpen,
              },
              {
                label: 'قال رسول الله ﷺ:',
                text: '«مَن يُرِدِ اللَّهُ به خَيْرًا يُفَقِّهْهُ في الدِّينِ»',
                ref: '(متفق عليه)',
                icon: Award,
              },
              {
                label: 'حديث شريف:',
                text: '«إنَّ للهِ أهلِينَ مِنَ الناسِ.. هُم أهلُ القرآنِ، أهلُ اللهِ وخاصَّتُهُ»',
                ref: '(رواه أحمد)',
                icon: Bookmark,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`set2-${idx}`} className="inline-flex items-center gap-6 shrink-0 flex-nowrap whitespace-nowrap">
                  <div className="inline-flex items-center gap-2 shrink-0 flex-nowrap whitespace-nowrap">
                    <span className="text-[#D7AE55] font-bold shrink-0">{item.label}</span>
                    <span className="text-white shrink-0 font-medium">{item.text}</span>
                    <span className="text-white/60 text-[10px] shrink-0">{item.ref}</span>
                    <Icon className="w-3.5 h-3.5 text-[#D7AE55] shrink-0" />
                  </div>
                  <span className="text-[#D7AE55]/60 font-serif shrink-0">|</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🌟 2. شريط التنقل الرئيسي الفاخر داخل حاوية مستديرة ومطابقة للمرجع */}
      <header className="w-full bg-[#FCFBF8]/95 dark:bg-[#071320]/95 backdrop-blur-md py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#E8E4D8]/80 dark:border-[#1E2E3E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* الحاوية المستديرة الحرة (Pill Card) بنمط المرجع الصوري المرفق */}
          <div className="relative w-full bg-white dark:bg-[#0E1A29] rounded-2xl sm:rounded-3xl border border-[#EBE7DC] dark:border-[#1E3048] shadow-[0_4px_20px_-4px_rgba(16,47,75,0.06),0_2px_6px_-1px_rgba(16,47,75,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] px-3 sm:px-5 py-2.5 flex items-center justify-between overflow-hidden">
            
            {/* الزخرفة الإسلامية الرقيقة كعلامة مائية على حواف الكارت */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-25 dark:opacity-10 translate-x-2 -translate-y-2">
              <IslamicCornerPattern className="w-20 h-20 text-[#D7AE55]" />
            </div>
            <div className="absolute top-0 left-0 pointer-events-none opacity-25 dark:opacity-10 -translate-x-2 -translate-y-2 rotate-90">
              <IslamicCornerPattern className="w-20 h-20 text-[#D7AE55]" />
            </div>

            {/* 1. الشعار والهوية البصرية (يمين الشريط في RTL) */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#087A78]/30 rounded-2xl p-1 transition-all relative z-10 shrink-0"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-2xl flex items-center justify-center border border-[#E7E2D6] shadow-sm group-hover:rotate-6 transition-transform duration-500">
                <Image
                  src="/fullIcon.png"
                  alt="لوجو تيجان"
                  width={30}
                  height={30}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-xl sm:text-2xl tracking-tight text-[#102F4B] dark:text-[#F1F5F9] leading-tight">
                  منصة <span className="text-[#087A78] dark:text-[#2DD4BF] font-black">تِيجَان</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#6B7280] dark:text-[#94A3B8] font-bold tracking-wider leading-none mt-0.5">
                  التطبيقات الإسلامية
                </span>
              </div>
            </Link>

            {/* 2. روابط التصفح الأساسية لسطح المكتب (وسط الشريط) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs sm:text-[13px] font-bold text-[#17212B] dark:text-[#E2E8F0] relative z-10">
              
              {/* الرئيسية */}
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                  isLinkActive('/')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] dark:hover:text-[#2DD4BF] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </Link>

              {/* العلوم واللغة (ميجا منيو مع تمييز الحالة النشطة كما في الصورة) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMegaMenu(activeMegaMenu === 'sciences' ? null : 'sciences')}
                  onMouseEnter={() => setActiveMegaMenu('sciences')}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isSciencesActive
                      ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/30'
                      : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] dark:hover:text-[#2DD4BF] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>العلوم واللغة</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeMegaMenu === 'sciences' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* القائمة المنبثقة: العلوم واللغة */}
                {activeMegaMenu === 'sciences' && (
                  <div
                    onMouseLeave={() => setActiveMegaMenu(null)}
                    className="absolute right-[-100px] top-[calc(100%+10px)] w-[920px] max-w-[92vw] bg-white dark:bg-[#0E1A29] border border-[#E7E2D6] dark:border-[#1E3048] rounded-2xl p-7 shadow-2xl z-50 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {sciencesMegaList.map((col, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 border-l border-[#EBE7DC] dark:border-[#1E3048] last:border-0 pl-5 last:pl-0"
                      >
                        <h4 className="font-amiri font-bold text-base text-[#102F4B] dark:text-[#F1F5F9] border-b border-[#D7AE55]/40 pb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#087A78] shrink-0" />
                          <span>{col.title}</span>
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {col.items.map((item, itemIdx) => {
                            const Icon = item.icon;
                            const active = isLinkActive(item.href);
                            return (
                              <Link
                                key={itemIdx}
                                href={item.href}
                                className={`flex items-start gap-3 p-2 rounded-xl transition-all duration-200 group/item ${
                                  active
                                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF]'
                                    : 'hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                                }`}
                              >
                                <div
                                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                                    active
                                      ? 'bg-[#087A78]/15 text-[#087A78] dark:text-[#2DD4BF]'
                                      : 'bg-[#F2EFE8] dark:bg-[#172535] text-[#6B7280] dark:text-[#94A3B8] group-hover/item:text-[#087A78] dark:group-hover/item:text-[#2DD4BF]'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-bold text-[#17212B] dark:text-[#E2E8F0] group-hover/item:text-[#087A78] dark:group-hover/item:text-[#2DD4BF] transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5 leading-snug">
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

              {/* المكتبة والمعرفة (ميجا منيو) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMegaMenu(activeMegaMenu === 'knowledge' ? null : 'knowledge')}
                  onMouseEnter={() => setActiveMegaMenu('knowledge')}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isKnowledgeActive
                      ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/30'
                      : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] dark:hover:text-[#2DD4BF] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>المكتبة والمعرفة</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeMegaMenu === 'knowledge' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* القائمة المنبثقة: المكتبة والمعرفة */}
                {activeMegaMenu === 'knowledge' && (
                  <div
                    onMouseLeave={() => setActiveMegaMenu(null)}
                    className="absolute right-[-240px] top-[calc(100%+10px)] w-[880px] max-w-[92vw] bg-white dark:bg-[#0E1A29] border border-[#E7E2D6] dark:border-[#1E3048] rounded-2xl p-7 shadow-2xl z-50 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {knowledgeMegaList.map((col, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 border-l border-[#EBE7DC] dark:border-[#1E3048] last:border-0 pl-5 last:pl-0"
                      >
                        <h4 className="font-amiri font-bold text-base text-[#102F4B] dark:text-[#F1F5F9] border-b border-[#D7AE55]/40 pb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#087A78] shrink-0" />
                          <span>{col.title}</span>
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {col.items.map((item, itemIdx) => {
                            const Icon = item.icon;
                            const active = isLinkActive(item.href);
                            return (
                              <Link
                                key={itemIdx}
                                href={item.href}
                                className={`flex items-start gap-3 p-2 rounded-xl transition-all duration-200 group/item ${
                                  active
                                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF]'
                                    : 'hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                                }`}
                              >
                                <div
                                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                                    active
                                      ? 'bg-[#087A78]/15 text-[#087A78] dark:text-[#2DD4BF]'
                                      : 'bg-[#F2EFE8] dark:bg-[#172535] text-[#6B7280] dark:text-[#94A3B8] group-hover/item:text-[#087A78] dark:group-hover/item:text-[#2DD4BF]'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-bold text-[#17212B] dark:text-[#E2E8F0] group-hover/item:text-[#087A78] dark:group-hover/item:text-[#2DD4BF] transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5 leading-snug">
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

              {/* التطبيقات المساندة */}
              <Link
                href="/software"
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                  isLinkActive('/software')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] dark:hover:text-[#2DD4BF] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>التطبيقات المساندة</span>
              </Link>

              {/* اتصل بنا */}
              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                  isLinkActive('/contact')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] dark:hover:text-[#2DD4BF] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصل بنا</span>
              </Link>

            </nav>

            {/* 3. أدوات التحكم، الإشعارات، الثيم، وبوابة الطالب (يسار الشريط في RTL) */}
            <div className="flex items-center gap-2 sm:gap-2.5 relative z-10">

              {/* زر تبديل المظهر (الثيم) */}
              {mounted ? (
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] hover:bg-[#F8F6EF] dark:hover:bg-[#152538] text-[#102F4B] dark:text-[#E2E8F0] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#087A78]/30 cursor-pointer group"
                  aria-label="تبديل المظهر"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#D7AE55] group-hover:rotate-90 transition-transform duration-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#102F4B] group-hover:-rotate-45 transition-transform duration-500" />
                  )}
                </button>
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] bg-stone-100 dark:bg-stone-800 animate-pulse" />
              )}

              {/* أيقونة الإشعارات مع شارة العد مطابق للمرجع الصوري */}
              <div className="relative">
                <button
                  aria-label="الإشعارات"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] hover:bg-[#F8F6EF] dark:hover:bg-[#152538] text-[#102F4B] dark:text-[#E2E8F0] flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#087A78] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  0
                </span>
              </div>

              {/* زر بوابة الطالب بتنسيق Pill ناعم مطابق للمرجع */}
              <Link
                href="/student-hub"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EAF5F5] hover:bg-[#D7EDED] dark:bg-[#087A78]/20 dark:hover:bg-[#087A78]/35 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25 text-xs font-bold transition-all shadow-xs h-9 sm:h-10"
              >
                <GraduationCap className="w-4 h-4" />
                <span>بوابة الطالب</span>
              </Link>

              {/* المستخدم والمصادقة مع Clerk */}
              {!isLoaded ? (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] bg-stone-100 dark:bg-stone-800 animate-pulse hidden sm:block" />
              ) : isSignedIn ? (
                <div className="flex items-center">
                  <UserButton appearance={userButtonAppearance} />
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <SignInButton mode="modal">
                    <button className="h-9 sm:h-10 px-3 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] hover:border-[#087A78] bg-white dark:bg-[#132235] text-[#102F4B] dark:text-[#F1F5F9] text-xs font-bold transition-all cursor-pointer">
                      دخول
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="h-9 sm:h-10 px-3 rounded-xl bg-[#087A78] hover:bg-[#066361] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                      حساب جديد
                    </button>
                  </SignUpButton>
                </div>
              )}

              {/* زر قائمة الجوال (Hamburger) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] hover:bg-[#F8F6EF] dark:hover:bg-[#152538] text-[#102F4B] dark:text-[#E2E8F0] flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="القائمة الرئيسية"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>

        {/* 🌟 3. قائمة التصفح المخصصة للجوال والأجهزة اللوحية */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2.5 max-w-7xl mx-auto border border-[#EBE7DC] dark:border-[#1E3048] rounded-2xl bg-white/98 dark:bg-[#0E1A29]/98 backdrop-blur-xl p-5 shadow-2xl max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2 font-tajawal text-right">
              
              <Link
                href="/"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isLinkActive('/')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/20'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </Link>

              {/* أكورديون العلوم واللغة للجوال */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileSciencesOpen(!mobileSciencesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#4B5563] dark:text-[#94A3B8] hover:bg-[#F8F6EF] dark:hover:bg-[#152538] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#087A78]" />
                    <span>العلوم واللغة</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileSciencesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileSciencesOpen && (
                  <div className="mr-3 mt-1 border-r-2 border-[#D7AE55]/50 pr-3 flex flex-col gap-3 py-2">
                    {sciencesMegaList.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-[#087A78] dark:text-[#2DD4BF]">
                          {col.title}
                        </span>
                        {col.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            className="flex items-center gap-2 text-xs py-1 font-semibold text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D7AE55] shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* أكورديون المكتبة والمعرفة للجوال */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileKnowledgeOpen(!mobileKnowledgeOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#4B5563] dark:text-[#94A3B8] hover:bg-[#F8F6EF] dark:hover:bg-[#152538] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-[#087A78]" />
                    <span>المكتبة والمعرفة</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileKnowledgeOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileKnowledgeOpen && (
                  <div className="mr-3 mt-1 border-r-2 border-[#D7AE55]/50 pr-3 flex flex-col gap-3 py-2">
                    {knowledgeMegaList.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-bold text-[#087A78] dark:text-[#2DD4BF]">
                          {col.title}
                        </span>
                        {col.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            className="flex items-center gap-2 text-xs py-1 font-semibold text-[#4B5563] dark:text-[#94A3B8] hover:text-[#087A78] transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D7AE55] shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* التطبيقات المساندة للجوال */}
              <Link
                href="/software"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isLinkActive('/software')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/20'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>التطبيقات المساندة</span>
              </Link>

              {/* اتصل بنا للجوال */}
              <Link
                href="/contact"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isLinkActive('/contact')
                    ? 'bg-[#EAF5F5] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/20'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:bg-[#F8F6EF] dark:hover:bg-[#152538]'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>اتصل بنا</span>
              </Link>

              {/* بوابة الطالب للجوال */}
              <Link
                href="/student-hub"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EAF5F5] hover:bg-[#D7EDED] dark:bg-[#087A78]/20 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25 text-xs font-bold transition-all shadow-xs mt-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>دخول بوابة الطالب</span>
              </Link>

              {/* أزرار تسجيل الدخول للجوال إن لم يكن مسجلاً */}
              {isLoaded && !isSignedIn && (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#EBE7DC] dark:border-[#1E3048]">
                  <SignInButton mode="modal">
                    <button className="w-full py-2.5 rounded-xl border border-[#E7E2D6] dark:border-[#1E3048] text-[#102F4B] dark:text-[#F1F5F9] text-xs font-bold hover:bg-[#F8F6EF] transition-all">
                      تسجيل الدخول
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full py-2.5 rounded-xl bg-[#087A78] hover:bg-[#066361] text-white text-xs font-bold transition-all shadow-xs">
                      إنشاء حساب جديد
                    </button>
                  </SignUpButton>
                </div>
              )}

            </nav>
          </div>
        )}

      </header>

      {/* 🌟 4. شريط تقدم التمرير العام للموقع بالكامل (Scroll Progress Bar) بألوان الهوية */}
      <div className="w-full h-[3px] bg-black/5 dark:bg-black/30 overflow-hidden no-print print:hidden relative">
        <div
          className="h-full bg-gradient-to-l from-[#D7AE55] via-[#087A78] to-[#D7AE55] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(8,122,120,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

    </div>
  );
}