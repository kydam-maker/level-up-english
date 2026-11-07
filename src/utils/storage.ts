import { UserProgress, QuizResultRecord } from '../types';

const STORAGE_KEY = 'level_up_english_progress_v1';

export function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultProgress(): UserProgress {
  return {
    learnedItemIds: [],
    bookmarkedItemIds: [],
    mistakeQuestionIds: [],
    quizHistory: [],
    dailyStreak: 1,
    lastStudiedDate: getTodayString(),
    todayStudiedIds: []
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultState = getDefaultProgress();
      saveProgress(defaultState);
      return defaultState;
    }
    const parsed: UserProgress = JSON.parse(raw);
    const today = getTodayString();

    // Check streak continuation
    if (parsed.lastStudiedDate !== today) {
      const last = new Date(parsed.lastStudiedDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day! (will increment when user studies today)
      } else if (diffDays > 1) {
        // Streak reset to 1
        parsed.dailyStreak = 1;
      }
      parsed.todayStudiedIds = [];
    }

    return parsed;
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export function markItemAsLearned(itemId: string): UserProgress {
  const current = loadProgress();
  const today = getTodayString();

  const learnedSet = new Set(current.learnedItemIds);
  const todaySet = new Set(current.todayStudiedIds);

  const isFirstStudyToday = current.lastStudiedDate !== today;
  if (isFirstStudyToday) {
    const last = new Date(current.lastStudiedDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      current.dailyStreak += 1;
    } else if (diffDays > 1) {
      current.dailyStreak = 1;
    }
    current.lastStudiedDate = today;
  }

  learnedSet.add(itemId);
  todaySet.add(itemId);

  const updated: UserProgress = {
    ...current,
    learnedItemIds: Array.from(learnedSet),
    todayStudiedIds: Array.from(todaySet)
  };

  saveProgress(updated);
  return updated;
}

export function toggleItemBookmark(itemId: string): UserProgress {
  const current = loadProgress();
  const set = new Set(current.bookmarkedItemIds);
  if (set.has(itemId)) {
    set.delete(itemId);
  } else {
    set.add(itemId);
  }

  const updated: UserProgress = {
    ...current,
    bookmarkedItemIds: Array.from(set)
  };
  saveProgress(updated);
  return updated;
}

export function saveQuizResult(record: QuizResultRecord): UserProgress {
  const current = loadProgress();
  const today = getTodayString();

  // Update streak if needed
  if (current.lastStudiedDate !== today) {
    const last = new Date(current.lastStudiedDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      current.dailyStreak += 1;
    } else if (diffDays > 1) {
      current.dailyStreak = 1;
    }
    current.lastStudiedDate = today;
  }

  // Merge mistake questions
  const mistakesSet = new Set(current.mistakeQuestionIds);
  record.wrongQuestionIds.forEach((id) => mistakesSet.add(id));

  const updated: UserProgress = {
    ...current,
    quizHistory: [record, ...current.quizHistory].slice(0, 50),
    mistakeQuestionIds: Array.from(mistakesSet)
  };

  saveProgress(updated);
  return updated;
}

export function removeResolvedMistake(questionId: string): UserProgress {
  const current = loadProgress();
  const set = new Set(current.mistakeQuestionIds);
  set.delete(questionId);

  const updated: UserProgress = {
    ...current,
    mistakeQuestionIds: Array.from(set)
  };
  saveProgress(updated);
  return updated;
}

export function resetAllProgress(): UserProgress {
  const resetState = getDefaultProgress();
  saveProgress(resetState);
  return resetState;
}
