export interface StatItem {
  label: string;
  value: string;
  iconName: string;
  color: string;
}

export interface CurrentCourse {
  name: string;
  progress: number;
  lastActive: string;
  lessons: string;
  teacher: string;
}

export interface CompletedCourse {
  name: string;
  date: string;
  grade: string;
  certificateId: string;
}

export interface DailyGoal {
  text: string;
  completed: boolean;
}

export interface StudentHubData {
  stats: StatItem[];
  currentCourses: CurrentCourse[];
  completedCourses: CompletedCourse[];
  dailyGoals: DailyGoal[];
}

export interface PersistedStudentData {
  stats: StatItem[];
  currentCourses: CurrentCourse[];
  completedCourses: CompletedCourse[];
  dailyGoals: DailyGoal[];
  favorites: string[];           // قائمة الكتب والمتون المفضلة
  studyHoursRaw: number;
  streakDays: number;
  completedTexts: number;
  lastSaved: string;
}
