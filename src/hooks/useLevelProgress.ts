'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tijan_completed_science_levels_v1';

type ProgressData = Record<string, number[]>;

export function useLevelProgress() {
  const [completedLevels, setCompletedLevels] = useState<ProgressData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedLevels(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error reading level progress:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProgress = (newData: ProgressData) => {
    setCompletedLevels(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving level progress:', e);
    }
  };

  /**
   * هل المستوى مفتوح للمستخدم؟
   * المستوى الأول (index 0) مفتوح دائماً.
   * المستوى N مفتوح فقط إذا أتم المستخدم المستوى N-1.
   */
  const isLevelUnlocked = (scienceId: string, levelIndex: number): boolean => {
    if (levelIndex <= 0) return true;
    const scienceCompleted = completedLevels[scienceId] || [];
    return scienceCompleted.includes(levelIndex - 1);
  };

  /**
   * هل المستوى مكتمل بالكامل؟
   */
  const isLevelCompleted = (scienceId: string, levelIndex: number): boolean => {
    const scienceCompleted = completedLevels[scienceId] || [];
    return scienceCompleted.includes(levelIndex);
  };

  /**
   * إتمام أو إلغاء إتمام المستوى
   */
  const toggleLevelCompletion = (scienceId: string, levelIndex: number): boolean => {
    const scienceCompleted = completedLevels[scienceId] || [];
    let updated: number[];
    let newStatus = false;

    if (scienceCompleted.includes(levelIndex)) {
      // إلغاء الإتمام (وإزالة أي مستويات لاحقة كانت تعتمد عليه)
      updated = scienceCompleted.filter((i) => i < levelIndex);
      newStatus = false;
    } else {
      // تعليم كمكتمل
      updated = Array.from(new Set([...scienceCompleted, levelIndex]));
      newStatus = true;
    }

    saveProgress({
      ...completedLevels,
      [scienceId]: updated,
    });

    return newStatus;
  };

  /**
   * تعليم كمكتمل فورياً
   */
  const markLevelCompleted = (scienceId: string, levelIndex: number) => {
    const scienceCompleted = completedLevels[scienceId] || [];
    if (!scienceCompleted.includes(levelIndex)) {
      const updated = Array.from(new Set([...scienceCompleted, levelIndex]));
      saveProgress({
        ...completedLevels,
        [scienceId]: updated,
      });
    }
  };

  return {
    isLoaded,
    isLevelUnlocked,
    isLevelCompleted,
    toggleLevelCompletion,
    markLevelCompleted,
  };
}
