import React from 'react';
import { ActiveTab, UserProgress } from '../types';
import { Sparkles, Flame, Bookmark } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  onOpenQuickQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenQuickQuiz
}) => {
  const handleNavClick = (tab: ActiveTab) => {
    soundEffects.playTap();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('daily')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500 rounded-lg p-1"
          aria-label="레벨업 잉글리시 홈으로 이동"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
            En
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              레벨업 잉글리시
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline whitespace-nowrap">
              초등 5·6학년 기초 영어
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line text with subtle hover/active indicator) */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-6 overflow-x-auto py-1 scrollbar-none" aria-label="메인 메뉴">
          <button
            onClick={() => handleNavClick('daily')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'daily'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            오늘의 학습
          </button>

          <button
            onClick={() => handleNavClick('topics')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'topics'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            주제별 학습
          </button>

          <button
            onClick={() => handleNavClick('quiz')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 relative ${
              activeTab === 'quiz'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            도전 퀴즈
            {progress.mistakeQuestionIds.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                {progress.mistakeQuestionIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('leaderboard')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>실시간 랭킹</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden sm:inline" />
          </button>

          <button
            onClick={() => handleNavClick('my-room')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'my-room'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            나의 학습방
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Streak and Quick Quiz) */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold"
            title={`${progress.dailyStreak}일 연속 출석 중!`}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="tabular-nums">{progress.dailyStreak}일 연속</span>
          </div>

          <button
            onClick={onOpenQuickQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>퀴즈 도전</span>
          </button>
        </div>
      </div>
    </header>
  );
};
