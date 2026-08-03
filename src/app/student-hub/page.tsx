'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Bookmark,
  Clock,
  TrendingUp,
  Plus,
  Trash2,
  X,
  LucideIcon,
  User,
  CloudCheck,
  RefreshCw,
  BookOpen,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import { PersistedStudentData } from 'src/types/studentHub';
import { getStudentData, saveStudentData, buildDefaultStudentData, toggleFavoriteBook, removeCompletedCourse } from 'src/utils/studentSync';

// ─── أيقونات الإحصائيات ───────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = { Clock, CheckCircle2, TrendingUp, Bookmark };

// ─── مكوّن شاشة التحميل ───────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
      <div className="text-center flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center animate-pulse">
          <GraduationCap className="w-7 h-7 text-brand-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3.5 w-36 bg-border dark:bg-border/30 rounded-full animate-pulse mx-auto" />
          <div className="h-2.5 w-24 bg-border dark:bg-border/30 rounded-full animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
}

// ─── مكوّن شاشة الحماية (للزوار غير المسجلين) ────────────────────────
function ProtectedScreen() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="bg-card border border-border dark:border-[#212C2C] p-8 sm:p-12 rounded-[32px] shadow-premium text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center mx-auto mb-6 border border-brand-primary/10">
          <GraduationCap className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="font-amiri font-bold text-2xl text-foreground mb-3">
          بوابة الطالب المحمية
        </h2>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium mb-8">
          هذه المنطقة مخصصة للطلاب المسجلين في منصة تِيجَان. سجّل دخولك أو أنشئ حساباً مجانياً للوصول إلى لوحة تحكمك الشخصية ومفضلتك السحابية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl border border-border text-foreground text-sm font-bold hover:bg-border/20 transition-all cursor-pointer"
          >
            العودة للرئيسية
          </button>
          <button
            onClick={() => (window as any).Clerk?.openSignIn()}
            className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold transition-all shadow-premium cursor-pointer"
          >
            تسجيل الدخول الآن
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── الصفحة الرئيسية ──────────────────────────────────────────────────
export default function StudentHubPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [data, setData] = useState<PersistedStudentData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'favorites' | 'completed' | 'goals'>('favorites');

  // حالة نموذج إضافة هدف جديد
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const loadedForUserId = useRef<string | null>(null);

  // ─── جلب البيانات المزامنة سحابياً عند التحميل ─────────────────
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;
    if (loadedForUserId.current === user.id) return;
    loadedForUserId.current = user.id;

    const fetched = getStudentData(user);
    setData(fetched);
  }, [isLoaded, isSignedIn, user]);

  // ─── حفظ تلقائي ومزامنة سحابية ─────────────────────────────────────
  const save = useCallback(async (updated: PersistedStudentData) => {
    if (!user) return;
    setData(updated);
    setIsSyncing(true);
    await saveStudentData(user, updated);
    setIsSyncing(false);
  }, [user]);

  // ─── تصفير الحساب لبيانات حقيقية خالية من الحشو ──────────────────
  const resetAccountData = async () => {
    if (!user) return;
    const cleanData = buildDefaultStudentData();
    await save(cleanData);
  };

  // ─── إزالة كتاب من المفضلة ──────────────────────────────────────────
  const removeFavorite = async (bookTitle: string) => {
    if (!user) return;
    const { data: updated } = await toggleFavoriteBook(user, bookTitle);
    setData(updated);
  };

  // ─── حذف متن من سجل الإنجازات والشهادات ──────────────────────────────
  const handleRemoveCompleted = async (certId: string) => {
    if (!user) return;
    const updated = await removeCompletedCourse(user, certId);
    setData(updated);
  };

  // ─── تبديل حالة الهدف اليومي ───────────────────────────────────────
  const toggleGoal = (idx: number) => {
    if (!data) return;
    const updated: PersistedStudentData = {
      ...data,
      dailyGoals: data.dailyGoals.map((g, i) =>
        i === idx ? { ...g, completed: !g.completed } : g
      ),
    };
    save(updated);
  };

  // ─── إضافة هدف جديد ───────────────────────────────────────────────
  const addGoal = () => {
    if (!data || !newGoalText.trim()) return;
    const updated: PersistedStudentData = {
      ...data,
      dailyGoals: [...data.dailyGoals, { text: newGoalText.trim(), completed: false }],
    };
    save(updated);
    setNewGoalText('');
    setShowAddGoal(false);
  };

  // ─── حذف هدف ──────────────────────────────────────────────────────
  const removeGoal = (idx: number) => {
    if (!data) return;
    const updated: PersistedStudentData = {
      ...data,
      dailyGoals: data.dailyGoals.filter((_, i) => i !== idx),
    };
    save(updated);
  };

  // ─── حراسة الحالات ────────────────────────────────────────────────
  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <ProtectedScreen />;

  if (!data) {
    return (
      <div className="relative min-h-screen bg-background pb-20 pt-8 animate-pulse" dir="rtl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-8 w-64 bg-border dark:bg-border/30 rounded-xl mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-[22px] h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completedGoalsCount = data.dailyGoals.filter((g) => g.completed).length;
  const displayName = user?.fullName ?? user?.firstName ?? 'أيها الطالب الكريم';
  const imageUrl = user?.imageUrl;
  const favoritesList = data.favorites || [];

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">

        {/* ── نافذة تأكيد تصفير الحساب ────────────────────────────── */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" dir="rtl">
            <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full relative animate-scale-up text-right">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="absolute top-4 left-4 p-2 rounded-xl text-muted hover:text-foreground hover:bg-border/30 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-5 border border-red-500/20">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="font-amiri font-bold text-xl text-foreground mb-2">
                تأكيد تصفير الحساب والبيانات
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-medium">
                هل أنت متأكد من تصفير الحساب وحذف جميع البيانات المخزنة؟
                <span className="block mt-2 text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/30 p-3 rounded-xl border border-red-200 dark:border-red-900/40">
                  ⚠️ تنبيه: سيتم مسح قائمة المفضلة، وسجل المتون المنجزة، وأهداف الحفظ اليومية. لا يمكن التراجع عن هذا الإجراء!
                </span>
              </p>

              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-foreground text-xs font-bold hover:bg-border/20 transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  onClick={async () => {
                    await resetAccountData();
                    setShowResetConfirm(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تأكيد التصفير</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── رأس الصفحة المركز ───────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border dark:border-[#212C2C]">
            <div className="text-right">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary text-xs font-bold border border-brand-primary/10">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>لوحة تحكم الطالب</span>
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>جاري المزامنة...</span>
                    </>
                  ) : (
                    <>
                      <CloudCheck className="w-3.5 h-3.5" />
                      <span>متزامن سحابياً ☁️</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowResetConfirm(true)}
                  title="تصفية وإعادة ضبط السجل كاملاً"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background border border-border hover:border-red-400 text-muted hover:text-red-500 text-[11px] font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>تصفير الحساب</span>
                </button>
              </div>

              <h1 className="font-amiri text-2xl sm:text-3xl font-bold text-foreground">
                مرحباً بك، {displayName}
              </h1>
            </div>

            {/* بطاقة الطالب المختصرة */}
            <div className="flex items-center gap-3 bg-card border border-border dark:border-[#212C2C] p-3 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-brand-primary-light border border-brand-primary/10 flex items-center justify-center shrink-0">
                {imageUrl ? (
                  <Image src={imageUrl} alt={displayName} width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-brand-primary" />
                )}
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-foreground">{displayName}</div>
                <div className="text-muted text-[11px] font-mono mt-0.5">{user?.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </div>

          {/* ── شبكة الإحصائيات الأربعة ──────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {data.stats.map((stat, idx) => {
              const Icon = iconMap[stat.iconName] ?? Clock;
              return (
                <ScrollReveal key={idx} variant="scale-up" delay={idx * 60}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-sm flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-right min-w-0">
                      <span className="text-[11px] font-bold text-muted block truncate">{stat.label}</span>
                      <span className="text-sm sm:text-base font-black text-foreground mt-0.5 block truncate">{stat.value}</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ── تبويبات التصفح المركزة ─────────────────────────────────── */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-border dark:border-[#212C2C]">
            <div className="flex items-center gap-2 bg-card border border-border dark:border-[#212C2C] p-1 rounded-2xl">
              {(['favorites', 'completed', 'goals'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-brand-primary text-white shadow-premium'
                      : 'text-muted hover:text-foreground hover:bg-border/20'
                  }`}
                >
                  {tab === 'favorites' ? `المفضلة (${favoritesList.length})` : tab === 'completed' ? `المتون المنجزة (${data.completedCourses.length})` : `ورد اليوم (${completedGoalsCount}/${data.dailyGoals.length})`}
                </button>
              ))}
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary hover:bg-brand-primary hover:text-white text-xs font-bold transition-all border border-brand-primary/10"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>تصفح خزانة الكتب</span>
            </Link>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              🔖 تبويب 1: الكتب والمتون المفضلة
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'favorites' && (
            <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium">
              <h3 className="font-amiri font-bold text-xl text-foreground mb-4 border-r-4 border-brand-secondary pr-3 flex items-center justify-between">
                <span>الكتب والمتون المفضلة في حسابك</span>
                <span className="text-xs text-muted font-normal">تُحفظ سحابياً في حسابك</span>
              </h3>

              {favoritesList.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-border dark:border-[#212C2C] rounded-2xl bg-background/50 flex flex-col items-center gap-3">
                  <Bookmark className="w-10 h-10 text-brand-secondary/40" />
                  <p className="text-xs sm:text-sm font-bold text-foreground">لم تضف أي كتاب للمفضلة بعد.</p>
                  <p className="text-[11px] text-muted max-w-md leading-relaxed">
                    اذهب إلى خزانة الكتب واضغط على علامة المفضلة 🔖 لحفظ أي كتاب أو متن هنا.
                  </p>
                  <Link
                    href="/books"
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-premium hover:bg-brand-primary-hover transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-brand-secondary" />
                    <span>تصفح خزانة الكتب</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoritesList.map((title, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-background border border-border dark:border-[#212C2C] hover:border-brand-primary/30 transition-all group">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0">
                          <Bookmark className="w-4 h-4 fill-current" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-foreground truncate group-hover:text-brand-primary transition-colors">{title}</span>
                          <span className="text-[10px] text-emerald-600 font-bold">محفوظ في السحابة ☁️</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFavorite(title)}
                        title="إزالة من المفضلة"
                        className="p-1.5 rounded-lg text-light-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              🏆 تبويب 2: المتون والشهادات المنجزة (مع زر الحذف)
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'completed' && (
            <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium">
              <h3 className="font-amiri font-bold text-xl text-foreground mb-4 border-r-4 border-brand-primary pr-3 flex items-center justify-between">
                <span>المتون المنجزة والإجازات الرقمية</span>
                <span className="text-xs text-muted font-normal">يمكنك حذف أو تعديل أي متن مسجل</span>
              </h3>

              {data.completedCourses.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-border dark:border-[#212C2C] rounded-2xl bg-background/50 flex flex-col items-center gap-3">
                  <Award className="w-10 h-10 text-brand-secondary/40" />
                  <p className="text-xs sm:text-sm font-bold text-foreground">لم تقم بتسجيل ختم أي متن بعد.</p>
                  <p className="text-[11px] text-muted max-w-md leading-relaxed">
                    تصفح الكتب واضغط زر &quot;أتممتُ دراسة هذا الكتاب&quot; لإصداره فوراً في هذا السجل!
                  </p>
                  <Link
                    href="/books"
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-premium hover:bg-brand-primary-hover transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>تصفح خزانة الكتب والمتون</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.completedCourses.map((cert, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-brand-secondary-light/20 dark:bg-brand-secondary-light/5 border border-brand-secondary/20 relative group">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-2xl bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0 border border-brand-secondary/20">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="text-right min-w-0 flex-1">
                          <div className="text-sm font-bold text-foreground truncate">{cert.name}</div>
                          <div className="text-xs text-muted mt-1 font-medium">التاريخ: {cert.date} • التقدير: {cert.grade}</div>
                          <div className="text-[10px] text-light-text font-mono mt-1">رقم الإجازة الرقمية: {cert.certificateId}</div>
                        </div>
                      </div>

                      {/* 🗑️ زر حذف الإنجاز إذا تمت إضافته بالخطأ */}
                      <button
                        onClick={() => handleRemoveCompleted(cert.certificateId || cert.name)}
                        title="حذف وإلغاء تسجيل هذا المتن"
                        className="p-2 rounded-xl text-light-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              🎯 تبويب 3: ورد اليوم والمراجعة
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'goals' && (
            <div className="max-w-2xl mx-auto bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[24px] shadow-premium">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border dark:border-[#212C2C]">
                <h3 className="font-amiri font-bold text-xl text-foreground">ورد اليوم والمراجعة</h3>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  إضافة هدف جديد
                </button>
              </div>

              {/* نموذج إضافة هدف */}
              {showAddGoal && (
                <div className="flex gap-2 mb-4 items-center bg-background border border-border p-3 rounded-2xl">
                  <input
                    type="text"
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                    placeholder="اكتب هدفك الدراسي اليومي..."
                    className="flex-1 bg-transparent text-xs sm:text-sm font-bold text-foreground placeholder:text-light-text focus:outline-none text-right"
                    autoFocus
                  />
                  <button onClick={addGoal} className="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold cursor-pointer hover:bg-brand-primary-hover transition-all shrink-0">
                    إضافة
                  </button>
                  <button onClick={() => { setShowAddGoal(false); setNewGoalText(''); }} className="p-1.5 rounded-lg hover:bg-border/20 text-muted cursor-pointer transition-all shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* قائمة الأهداف */}
              <div className="flex flex-col gap-3">
                {data.dailyGoals.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-border rounded-2xl p-4 flex flex-col items-center gap-2">
                    <Bookmark className="w-8 h-8 text-brand-primary/30" />
                    <p className="text-xs font-bold text-foreground">وردك اليومي فارغ حالياً.</p>
                    <button onClick={() => setShowAddGoal(true)} className="text-xs font-bold text-brand-primary hover:underline cursor-pointer">
                      + اضغط هنا لإضافة أول هدف دراسي لليوم
                    </button>
                  </div>
                ) : (
                  data.dailyGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border/60 dark:border-[#212C2C]/60 bg-background/50 hover:bg-background transition-all group">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleGoal(idx)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                            goal.completed ? 'bg-brand-primary border-brand-primary text-white' : 'border-border bg-card'
                          }`}
                        >
                          {goal.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <span className={`text-xs sm:text-sm font-bold truncate ${goal.completed ? 'text-light-text line-through' : 'text-foreground'}`}>
                          {goal.text}
                        </span>
                      </div>
                      <button onClick={() => removeGoal(idx)} title="حذف الهدف" className="p-1.5 rounded-lg text-light-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-all opacity-0 group-hover:opacity-100 shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </PageTransition>
  );
}
