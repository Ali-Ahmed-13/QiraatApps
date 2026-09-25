import { PersistedStudentData } from 'src/types/studentHub';

const LOCAL_STORAGE_KEY = (userId: string) => `tijan_student_data_${userId}`;

// ─── إعداد البيانات الحقيقية النظيفة بدون حشو ──────────────────────────
export function buildDefaultStudentData(): PersistedStudentData {
  return {
    stats: [
      {
        label: "المتون المنجزة",
        value: "0 متن",
        iconName: "CheckCircle2",
        color: "text-brand-primary bg-brand-primary-light/50 dark:bg-brand-primary-light/10"
      },
      {
        label: "الكتب المفضلة",
        value: "0 كتاب",
        iconName: "Bookmark",
        color: "text-brand-secondary bg-brand-secondary-light dark:bg-brand-secondary-light/10"
      },
      {
        label: "أهداف اليوم",
        value: "0 هدف",
        iconName: "TrendingUp",
        color: "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-950/20"
      },
      {
        label: "ساعات الدراسة",
        value: "0 ساعة",
        iconName: "Clock",
        color: "text-orange-500 bg-orange-100/50 dark:bg-orange-950/20"
      }
    ],
    currentCourses: [],
    completedCourses: [],
    dailyGoals: [],
    favorites: [],
    studyHoursRaw: 0,
    streakDays: 0,
    completedTexts: 0,
    lastSaved: new Date().toISOString(),
  };
}

// ─── جلب البيانات المزامنة سحابياً عبر Clerk ─────────────────────────────
export function getStudentData(user: any): PersistedStudentData {
  if (!user) return buildDefaultStudentData();

  let localData: PersistedStudentData | null = null;
  try {
    const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY(user.id));
    if (localRaw) {
      localData = JSON.parse(localRaw) as PersistedStudentData;
    }
  } catch (_) {}

  const cloudData = user.unsafeMetadata?.tijanStudentData as PersistedStudentData | undefined;

  let bestData: PersistedStudentData;

  if (localData && cloudData) {
    const localTime = localData.lastSaved ? new Date(localData.lastSaved).getTime() : 0;
    const cloudTime = cloudData.lastSaved ? new Date(cloudData.lastSaved).getTime() : 0;
    // اعتماد النسخة الأحدث دائماً لتجنب مسح التعديلات الفورية
    bestData = localTime >= cloudTime ? localData : cloudData;
  } else if (localData) {
    bestData = localData;
  } else if (cloudData) {
    bestData = cloudData;
  } else {
    const fresh = buildDefaultStudentData();
    saveStudentData(user, fresh);
    return fresh;
  }

  const cleanedData: PersistedStudentData = {
    ...bestData,
    favorites: Array.isArray(bestData.favorites) ? bestData.favorites : [],
    completedCourses: Array.isArray(bestData.completedCourses) ? bestData.completedCourses : [],
    dailyGoals: Array.isArray(bestData.dailyGoals) ? bestData.dailyGoals : [],
    currentCourses: Array.isArray(bestData.currentCourses) ? bestData.currentCourses : [],
    lastSaved: bestData.lastSaved || new Date().toISOString(),
  };

  cleanedData.stats = calculateRealStats(cleanedData);

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY(user.id), JSON.stringify(cleanedData));
  } catch (_) {}

  return cleanedData;
}

// ─── حساب الإحصائيات المركزية الحقيقية بدون حشو ──────────────────────────
function calculateRealStats(data: PersistedStudentData) {
  const completedCount = data.completedCourses?.length || 0;
  const favCount = data.favorites?.length || 0;
  const goalsCount = data.dailyGoals?.filter(g => g.completed).length || 0;
  const totalHours = data.studyHoursRaw || 0;

  return [
    {
      label: "المتون المنجزة",
      value: `${completedCount} متون`,
      iconName: "CheckCircle2",
      color: "text-brand-primary bg-brand-primary-light/50 dark:bg-brand-primary-light/10"
    },
    {
      label: "الكتب المفضلة",
      value: `${favCount} كتب`,
      iconName: "Bookmark",
      color: "text-brand-secondary bg-brand-secondary-light dark:bg-brand-secondary-light/10"
    },
    {
      label: "أهداف اليوم",
      value: `${goalsCount} مكتمل`,
      iconName: "TrendingUp",
      color: "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-950/20"
    },
    {
      label: "ساعات الدراسة",
      value: `${totalHours} ساعة`,
      iconName: "Clock",
      color: "text-orange-500 bg-orange-100/50 dark:bg-orange-950/20"
    }
  ];
}

// ─── حفظ وتحديث البيانات سحابياً ─────────────────────────────────────────
export async function saveStudentData(user: any, updatedData: PersistedStudentData): Promise<void> {
  if (!user) return;

  const dataToSave: PersistedStudentData = {
    ...updatedData,
    favorites: updatedData.favorites || [],
    stats: calculateRealStats(updatedData),
    lastSaved: new Date().toISOString()
  };

  // LocalStorage - حفظ فوري لحماية تجربة المستخدم من البطء
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY(user.id), JSON.stringify(dataToSave));
  } catch (_) {}

  // تحديث فوري لكائن المستخدم في الذاكرة
  if (user.unsafeMetadata) {
    user.unsafeMetadata.tijanStudentData = dataToSave;
  }

  // Clerk Cloud Sync - مزامنة سحابية خلفية غير حاجبة (Background Async)
  if (typeof user.update === 'function') {
    user.update({
      unsafeMetadata: {
        ...user.unsafeMetadata,
        tijanStudentData: dataToSave
      }
    }).catch((err: any) => {
      console.warn('Clerk Cloud Sync Warning:', err);
    });
  }
}

// ─── ميزة إضافة / إزالة كتاب أو متن من المفضلة ─────────────────────────────
export async function toggleFavoriteBook(user: any, bookTitle: string): Promise<{ data: PersistedStudentData; isFav: boolean }> {
  const current = getStudentData(user);
  const favorites = current.favorites || [];

  const exists = favorites.includes(bookTitle);
  let updatedFavorites: string[];

  if (exists) {
    updatedFavorites = favorites.filter(title => title !== bookTitle);
  } else {
    updatedFavorites = [...favorites, bookTitle];
  }

  const updatedData: PersistedStudentData = {
    ...current,
    favorites: updatedFavorites
  };

  await saveStudentData(user, updatedData);
  return { data: updatedData, isFav: !exists };
}

// ─── إتمام متن جديد من أي مكان بالموقع ────────────────────────────────────
export async function markTextAsCompleted(
  user: any,
  textName: string,
  grade: string = "ممتاز مرتفع (96%)"
): Promise<PersistedStudentData> {
  const current = getStudentData(user);

  const alreadyCompleted = current.completedCourses.some(c => c.name === textName);
  if (alreadyCompleted) return current;

  const newCompletedCount = (current.completedCourses?.length || 0) + 1;
  const newStudyHours = current.studyHoursRaw + 12;

  const updatedData: PersistedStudentData = {
    ...current,
    completedTexts: newCompletedCount,
    studyHoursRaw: newStudyHours,
    completedCourses: [
      {
        name: textName,
        date: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
        grade: grade,
        certificateId: `TJ-${Math.floor(1000 + Math.random() * 9000)}-${newCompletedCount}`
      },
      ...current.completedCourses
    ]
  };

  await saveStudentData(user, updatedData);
  return updatedData;
}

// ─── ميزة حذف/إزالة متن من الإنجازات والشهادات ──────────────────────────────
export async function removeCompletedCourse(
  user: any,
  certIdentifier: string
): Promise<PersistedStudentData> {
  const current = getStudentData(user);

  const updatedCourses = current.completedCourses.filter(
    c => c.certificateId !== certIdentifier && c.name !== certIdentifier
  );

  const newCompletedCount = updatedCourses.length;
  const newStudyHours = Math.max(0, current.studyHoursRaw - 12);

  const updatedData: PersistedStudentData = {
    ...current,
    completedTexts: newCompletedCount,
    studyHoursRaw: newStudyHours,
    completedCourses: updatedCourses
  };

  await saveStudentData(user, updatedData);
  return updatedData;
}
