export type ItemType = 'word' | 'sentence' | 'expression';

export interface StudyItem {
  id: string;
  topicId: string;
  type: ItemType;
  english: string;
  korean: string;
  pronunciation?: string; // Korean phonetics for beginner guide (e.g., '모오닝')
  example?: string;
  exampleKorean?: string;
  contextTip: string; // 친절한 초등 눈높이 설명 (언제 쓰는지, 꿀팁)
}

export interface Topic {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  iconName: string;
  themeColor: string; // for UI accents
  words: StudyItem[];
  sentences: StudyItem[];
  expressions: StudyItem[];
}

export type QuizType = 'meaning' | 'blank' | 'listening';

export interface QuizQuestion {
  id: string;
  topicId: string;
  itemId: string;
  type: QuizType;
  prompt: string;
  audioPrompt?: string; // for listening quizzes
  options: string[];
  correctIndex: number;
  explanation: string; // 쉬운 한국어 정답 해설
}

export interface QuizResultRecord {
  id: string;
  date: string; // ISO string
  topicId: string;
  topicTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  wrongQuestionIds: string[];
}

export interface UserProgress {
  learnedItemIds: string[];
  bookmarkedItemIds: string[];
  mistakeQuestionIds: string[];
  quizHistory: QuizResultRecord[];
  dailyStreak: number;
  lastStudiedDate: string; // YYYY-MM-DD
  todayStudiedIds: string[];
}

export type ActiveTab = 'daily' | 'topics' | 'quiz' | 'my-room';
