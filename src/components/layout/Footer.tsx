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
        { label: 'جميع العلوم', href: '/sciences' },
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

              {/* أزرار التواصل المباشر (واتساب، اتصال، بريد إلكتروني) */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* واتساب */}
                <a
                  href="https://wa.me/201148437458"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.98-95 1.18-.175.2-.35.226-.65.076-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.131-.613.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-925-2.233-.243-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.502s1.075 2.902 1.225 3.102c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.634.72.228 1.375.196 1.893.118.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.275-.2-.575-.35zM12.04 2C6.516 2 2.022 6.494 2.022 12.02c0 1.954.561 3.844 1.625 5.464L2 22.37l5.034-1.613c1.558.932 3.35 1.425 5.006 1.425 5.525 0 10.018-4.494 10.018-10.02C22.058 6.494 17.565 2 12.04 2z"/>
                  </svg>
                </a>

                {/* اتصال هاتفي */}
                <a
                  href="tel:+201148437458"
                  aria-label="اتصال هاتفي"
                  className="w-9 h-9 rounded-full bg-[#087A78] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* بريد إلكتروني */}
                <a
                  href="mailto:alio123alio1239o@gmail.com"
                  aria-label="البريد الإلكتروني"
                  className="w-9 h-9 rounded-full bg-[#102F4B] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Mail className="w-4 h-4" />
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
                {/* البريد الإلكتروني */}
                <a
                  href="mailto:alio123alio1239o@gmail.com"
                  className="flex items-center gap-2.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-colors text-right"
                  dir="ltr"
                >
                  <span className="font-sans text-xs break-all">alio123alio1239o@gmail.com</span>
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#087A78] dark:text-[#2DD4BF]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* رقم الهاتف */}
                <a
                  href="tel:+201148437458"
                  className="flex items-center gap-2.5 hover:text-[#087A78] dark:hover:text-[#2DD4BF] transition-colors"
                  dir="ltr"
                >
                  <span className="font-sans text-xs font-bold">+201148437458</span>
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#087A78] dark:text-[#2DD4BF]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* واتساب المباشر */}
                <a
                  href="https://wa.me/201148437458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
                  dir="ltr"
                >
                  <span className="font-sans text-xs font-bold">+201148437458</span>
                  <div className="w-6 h-6 rounded-lg bg-[#EAE7DC] dark:bg-[#1A2634] flex items-center justify-center shrink-0 text-[#25D366]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.98-95 1.18-.175.2-.35.226-.65.076-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.131-.613.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-925-2.233-.243-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.502s1.075 2.902 1.225 3.102c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.634.72.228 1.375.196 1.893.118.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.275-.2-.575-.35zM12.04 2C6.516 2 2.022 6.494 2.022 12.02c0 1.954.561 3.844 1.625 5.464L2 22.37l5.034-1.613c1.558.932 3.35 1.425 5.006 1.425 5.525 0 10.018-4.494 10.018-10.02C22.058 6.494 17.565 2 12.04 2z"/>
                    </svg>
                  </div>
                </a>
              </div>

              {/* زر تواصل مع فريق الدعم */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">

            {/* ميزة 1: تطبيقات تعليمية (أول عمود على اليمين) */}
            <div className="flex items-center gap-4 py-3 md:py-0 px-4 sm:px-6 justify-start">
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

            {/* ميزة 2: كتب ومتون مبسطة (العمود الأوسط) */}
            <div className="flex items-center gap-4 py-3 md:py-0 px-4 sm:px-6 justify-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7AE55]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-amiri font-bold text-base text-white">
                  كتب ومتون مبسطة
                </span>
                <span className="text-xs text-sky-100/70 font-medium">
                  شروح ومراجع قيمة
                </span>
              </div>
            </div>

            {/* ميزة 3: محتوى موثوق (أول عمود على اليسار) */}
            <div className="flex items-center gap-4 py-3 md:py-0 px-4 sm:px-6 justify-start">
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
