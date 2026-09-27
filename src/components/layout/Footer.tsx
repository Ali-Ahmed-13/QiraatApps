'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  BookOpen,
  LayoutGrid,
  Users,
  Mail,
  Phone,
  MapPin,
  Headphones,
  ChevronLeft,
  ChevronUp,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { IslamicStarPattern, MosqueSilhouette, IslamicCornerPattern } from './IslamicMotifs';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navSections = [
    {
      title: 'الأقسام الرئيسية',
      icon: Home,
      links: [
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'خريطة التعلم الشرعية', href: '/roadmap' },
        { label: 'اللغة العربية وآدابها', href: '/arabic-language' },
        { label: 'خريطة التعلم التفاعلية', href: '/roadmap' },
        { label: 'جميع الأقسام', href: '/sciences' },
      ],
    },
    {
      title: 'المعرفة والمصادر',
      icon: BookOpen,
      links: [
        { label: 'المكتبة و خزانة الكتب', href: '/books' },
        { label: 'بوابة مقالات العلوم', href: '/articles' },
        { label: 'سير العلماء والمستندين', href: '/scholars' },
        { label: 'أرشيف الفتاوى والمسائل', href: '/fatwas' },
        { label: 'مصادر موثوقة', href: '/articles' },
      ],
    },
    {
      title: 'التقنية والسياسات',
      icon: LayoutGrid,
      links: [
        { label: 'دليل البرمجيات والتطبيقات', href: '/software' },
        { label: 'تواصل مع الدعم الفني', href: '/contact' },
        { label: 'سياسة الخصوصية', href: '/privacy-policy' },
        { label: 'شروط الخدمة والاستخدام', href: '/terms' },
        { label: 'الأمان وحماية البيانات', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="w-full select-none font-tajawal relative overflow-hidden" dir="rtl">
      
      {/* 🌟 الجزء العلوي: خلفية بيج دافئة / عاجية مع بطاقات الأقسام والتواصل */}
      <div className="relative bg-[#F8F6EF] dark:bg-[#0B1522] border-t border-[#E8E4D8] dark:border-[#1E2E3E] text-[#17212B] dark:text-[#E2E8F0] transition-colors duration-300">
        
        {/* زخرفة الزوايا الإسلامية الرقيقة كعلامة مائية خفيفة */}
        <div className="absolute top-0 right-0 pointer-events-none opacity-30 dark:opacity-10 translate-x-4 -translate-y-4">
          <IslamicCornerPattern className="w-44 h-44 text-[#D7AE55]" />
        </div>
        <div className="absolute top-0 left-0 pointer-events-none opacity-30 dark:opacity-10 -translate-x-4 -translate-y-4 rotate-90">
          <IslamicCornerPattern className="w-44 h-44 text-[#D7AE55]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start text-right">

            {/* 1. عمود الهوية البصرية والنبذة التعريفية (أول عمود على اليمين في RTL) */}
            <div className="lg:col-span-4 flex flex-col gap-4 pl-0 lg:pl-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl p-1.5 flex items-center justify-center border border-[#E7E2D6] shadow-sm shrink-0">
                  <Image
                    src="/fullIcon.png"
                    alt="لوجو منصة تيجان"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-amiri font-bold text-2xl text-[#102F4B] dark:text-[#F1F5F9] leading-tight">
                    منصة <span className="text-[#087A78] dark:text-[#2DD4BF] font-black">تِيجَان</span>
                  </h3>
                  <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] font-bold tracking-wide">
                    التطبيقات الإسلامية
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#4B5563] dark:text-[#94A3B8] leading-relaxed font-medium">
                منصة تعليمية متكاملة تهدف إلى بناء منظومة لخدمة كتاب الله عز وجل والعلوم الشرعية واللغة العربية بأدوات وتقنيات حديثة، مع الالتزام بالمنهجية العلمية والتحقيق والموثوقية.
              </p>

              {/* أيقونات التواصل الاجتماعي الدائرية الأنيقة */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* تليجرام */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تليجرام"
                  className="w-8 h-8 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>

                {/* يوتيوب */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="يوتيوب"
                  className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
                  </svg>
                </a>

                {/* منصة X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="منصة إكس"
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* فيسبوك */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك"
                  className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* واتساب */}
                <a
                  href="https://wa.me/201091410014"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب"
                  className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.98-95 1.18-.175.2-.35.226-.65.076-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.131-.613.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-925-2.233-.243-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.502s1.075 2.902 1.225 3.102c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.634.72.228 1.375.196 1.893.118.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.275-.2-.575-.35zM12.04 2C6.516 2 2.022 6.494 2.022 12.02c0 1.954.561 3.844 1.625 5.464L2 22.37l5.034-1.613c1.558.932 3.35 1.425 5.006 1.425 5.525 0 10.018-4.494 10.018-10.02C22.058 6.494 17.565 2 12.04 2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* 2. عمود الأقسام الرئيسية */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 border-r-2 border-[#D7AE55] pr-2.5">
                <Home className="w-4 h-4 text-[#087A78] dark:text-[#2DD4BF]" />
                <h4 className="font-amiri font-bold text-lg text-[#102F4B] dark:text-[#F1F5F9]">
                  الأقسام الرئيسية
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5 pt-1 text-xs sm:text-[13px] font-semibold text-[#4B5563] dark:text-[#94A3B8]">
                {navSections[0].links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-all hover:translate-x-[-3px]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#D7AE55] group-hover:text-[#087A78] dark:group-hover:text-[#2DD4BF] transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. عمود المعرفة والمصادر */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 border-r-2 border-[#D7AE55] pr-2.5">
                <BookOpen className="w-4 h-4 text-[#087A78] dark:text-[#2DD4BF]" />
                <h4 className="font-amiri font-bold text-lg text-[#102F4B] dark:text-[#F1F5F9]">
                  المعرفة والمصادر
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5 pt-1 text-xs sm:text-[13px] font-semibold text-[#4B5563] dark:text-[#94A3B8]">
                {navSections[1].links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-all hover:translate-x-[-3px]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#D7AE55] group-hover:text-[#087A78] dark:group-hover:text-[#2DD4BF] transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. عمود التقنية والسياسات */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 border-r-2 border-[#D7AE55] pr-2.5">
                <LayoutGrid className="w-4 h-4 text-[#087A78] dark:text-[#2DD4BF]" />
                <h4 className="font-amiri font-bold text-lg text-[#102F4B] dark:text-[#F1F5F9]">
                  التقنية والسياسات
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5 pt-1 text-xs sm:text-[13px] font-semibold text-[#4B5563] dark:text-[#94A3B8]">
                {navSections[2].links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-all hover:translate-x-[-3px]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#D7AE55] group-hover:text-[#087A78] dark:group-hover:text-[#2DD4BF] transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. عمود تواصل معنا (أول عمود على اليسار في RTL) */}
            <div className="lg:col-span-2 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 border-r-2 border-[#D7AE55] pr-2.5">
                <Users className="w-4 h-4 text-[#087A78] dark:text-[#2DD4BF]" />
                <h4 className="font-amiri font-bold text-lg text-[#102F4B] dark:text-[#F1F5F9]">
                  تواصل معنا
                </h4>
              </div>

              <div className="flex flex-col gap-3 pt-1 text-xs sm:text-[13px] font-medium text-[#4B5563] dark:text-[#94A3B8]">
                <a
                  href="mailto:info@teganacademy.com"
                  className="flex items-center gap-2.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-colors text-right"
                  dir="ltr"
                >
                  <span className="font-sans text-xs">info@teganacademy.com</span>
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#087A78] dark:text-[#2DD4BF]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                </a>

                <a
                  href="tel:+201091410014"
                  className="flex items-center gap-2.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-colors"
                  dir="ltr"
                >
                  <span className="font-sans text-xs font-bold">201091410014</span>
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#087A78] dark:text-[#2DD4BF]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                </a>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#087A78] dark:text-[#2DD4BF] mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-xs">
                    17 شارع الإيمان - الجيزة - القاهرة
                  </span>
                </div>
              </div>

              {/* زر تواصل مع فريق الدعم المتميز في المرجع */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-[#EAF5F5] dark:bg-[#087A78]/20 hover:bg-[#D7EDED] dark:hover:bg-[#087A78]/35 text-[#087A78] dark:text-[#2DD4BF] border border-[#087A78]/25 text-xs font-bold transition-all shadow-sm group"
              >
                <Headphones className="w-4 h-4 text-[#087A78] dark:text-[#2DD4BF] group-hover:scale-110 transition-transform" />
                <span>تواصل مع فريق الدعم</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 🌟 الجزء الأوسط الداكن: ميزات المنصة الأربع بخلفية كحلية فاخرة وزخارف إسلامية */}
      <div className="relative bg-[#102F4B] dark:bg-[#071726] border-t border-[#1C3E60] dark:border-[#0E243A] text-white py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* ظلال المساجد والقباب الرقيقة في الخلفية */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-20">
          <MosqueSilhouette className="w-full h-24 text-sky-400" />
        </div>

        {/* زخرفة النجمة الهندسية الثمانية الإسلامية على أطراف الشريط الداكن */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none opacity-20">
          <IslamicStarPattern className="w-28 h-28 text-[#D7AE55]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/10">

            {/* ميزة 1: مجتمع تعليمي (أول عمود على اليمين) */}
            <div className="flex items-center gap-4 py-3 lg:py-0 px-4 sm:px-6 justify-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7AE55]">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-base text-white">
                  مجتمع تعليمي
                </span>
                <span className="text-xs text-sky-100/70 font-medium">
                  داعم ومتكامل
                </span>
              </div>
            </div>

            {/* ميزة 2: تطبيقات تعليمية */}
            <div className="flex items-center gap-4 py-3 lg:py-0 px-4 sm:px-6 justify-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7AE55]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-base text-white">
                  تطبيقات تعليمية
                </span>
                <span className="text-xs text-sky-100/70 font-medium">
                  في مختلف العلوم
                </span>
              </div>
            </div>

            {/* ميزة 3: آلاف الكتب والمصادر */}
            <div className="flex items-center gap-4 py-3 lg:py-0 px-4 sm:px-6 justify-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7AE55]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-base text-white">
                  آلاف الكتب والمصادر
                </span>
                <span className="text-xs text-sky-100/70 font-medium">
                  في مكان واحد
                </span>
              </div>
            </div>

            {/* ميزة 4: محتوى موثوق (أول عمود على اليسار) */}
            <div className="flex items-center gap-4 py-3 lg:py-0 px-4 sm:px-6 justify-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7AE55]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-base text-white">
                  محتوى موثوق
                </span>
                <span className="text-xs text-sky-100/70 font-medium">
                  من علماء متخصصين
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🌟 الجزء السفلي: شريط الحقوق، الروابط الإضافية وزر الصعود للأعلى */}
      <div className="bg-[#0C2237] dark:bg-[#050E18] border-t border-[#1C3E60]/80 py-4 px-4 sm:px-6 lg:px-8 text-xs font-medium text-white/80">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">

          {/* زر الصعود للأعلى وروابط السياسات */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            {/* زر العودة لأعلى الصفحة مطابق للمرجع */}
            <button
              onClick={scrollToTop}
              aria-label="الرجوع للأعلى"
              className="w-8 h-8 rounded-lg bg-[#183652] hover:bg-[#20496E] text-white flex items-center justify-center border border-white/10 shadow-sm transition-all cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <Link
              href="/fatwas"
              className="hover:text-[#D7AE55] transition-colors flex items-center gap-1"
            >
              <span>FAQ</span>
              <span className="text-[#D7AE55]/80 text-[10px]">‹</span>
            </Link>

            <span className="text-white/20">|</span>

            <Link
              href="/contact"
              className="hover:text-[#D7AE55] transition-colors flex items-center gap-1"
            >
              <span>اتصل بنا</span>
              <span className="text-[#D7AE55]/80 text-[10px]">‹</span>
            </Link>

            <span className="text-white/20">|</span>

            <Link
              href="/privacy-policy"
              className="hover:text-[#D7AE55] transition-colors flex items-center gap-1"
            >
              <span>سياسة الخصوصية</span>
              <span className="text-[#D7AE55]/80 text-[10px]">‹</span>
            </Link>
          </div>

          {/* نص الحقوق والملكية الفكرية */}
          <div className="text-center md:text-right text-xs text-white/80">
            <span>جميع الحقوق محفوظة © {currentYear} منصة تيجان لعلوم والقرآن والقراءات العشر</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
