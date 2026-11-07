import React, { useState, useEffect } from 'react';
import { ActiveTab, UserProgress, QuizResultRecord } from './types';
import {
  loadProgress,
  markItemAsLearned,
  toggleItemBookmark,
  saveQuizResult,
  removeResolvedMistake,
  resetAllProgress
} from './utils/storage';
import { Header } from './components/Header';
import { DailyMission } from './components/DailyMission';
import { TopicSelector } from './components/TopicSelector';
import { FlashcardStudy } from './components/FlashcardStudy';
import { QuizView } from './components/QuizView';
import { MyLearningRoom } from './components/MyLearningRoom';
import { LeaderboardView } from './components/LeaderboardView';
import { Calendar, BookOpen, HelpCircle, User, Sparkles, Trophy } from 'lucide-react';
import { soundEffects } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('daily');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [quizInitialTopicId, setQuizInitialTopicId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>(loadProgress());

  // Listen for storage updates
  const handleMarkLearned = (itemId: string) => {
    const updated = markItemAsLearned(itemId);
    setProgress(updated);
  };

  const handleToggleBookmark = (itemId: string) => {
    const updated = toggleItemBookmark(itemId);
    setProgress(updated);
  };

  const handleSaveQuizResult = (record: QuizResultRecord) => {
    const updated = saveQuizResult(record);
    setProgress(updated);
  };

  const handleClearMistake = (questionId: string) => {
    const updated = removeResolvedMistake(questionId);
    setProgress(updated);
  };

  const handleResetProgress = () => {
    const reset = resetAllProgress();
    setProgress(reset);
    soundEffects.playTap();
  };

  // Navigations
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('topics');
  };

  const handleBackToTopicList = () => {
    setSelectedTopicId(null);
  };

  const handleStartQuizFromAnywhere = (topicId?: string) => {
    setQuizInitialTopicId(topicId || null);
    setActiveTab('quiz');
  };

  const handleStartMistakeQuiz = () => {
    setQuizInitialTopicId('all');
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'topics') {
            setSelectedTopicId(null);
          }
          setActiveTab(tab);
        }}
        progress={progress}
        onOpenQuickQuiz={() => handleStartQuizFromAnywhere()}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 mb-16 sm:mb-8">
        {activeTab === 'daily' && (
          <DailyMission
            progress={progress}
            onMarkLearned={handleMarkLearned}
            onToggleBookmark={handleToggleBookmark}
            onStartQuiz={() => handleStartQuizFromAnywhere()}
            onBrowseAllTopics={() => {
              setSelectedTopicId(null);
              setActiveTab('topics');
            }}
            onOpenLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'topics' && !selectedTopicId && (
          <TopicSelector
            progress={progress}
            onSelectTopic={handleSelectTopic}
            onStartTopicQuiz={(topicId) => handleStartQuizFromAnywhere(topicId)}
          />
        )}

        {activeTab === 'topics' && selectedTopicId && (
          <FlashcardStudy
            topicId={selectedTopicId}
            progress={progress}
            onBackToTopics={handleBackToTopicList}
            onMarkLearned={handleMarkLearned}
            onToggleBookmark={handleToggleBookmark}
            onStartQuiz={(topicId) => handleStartQuizFromAnywhere(topicId)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            initialTopicId={quizInitialTopicId}
            progress={progress}
            onSaveQuizResult={handleSaveQuizResult}
            onClearMistake={handleClearMistake}
            onNavigateToLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            progress={progress}
            onNavigateToQuiz={() => handleStartQuizFromAnywhere()}
          />
        )}

        {activeTab === 'my-room' && (
          <MyLearningRoom
            progress={progress}
            onClearMistake={handleClearMistake}
            onToggleBookmark={handleToggleBookmark}
            onResetProgress={handleResetProgress}
            onStartMistakeQuiz={handleStartMistakeQuiz}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Thumb friendly for smartphone users) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveTab('daily');
          }}
          className={`flex flex-col items-center gap-1 p-1 min-w-[50px] ${
            activeTab === 'daily' ? 'text-amber-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">오늘 학습</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setSelectedTopicId(null);
            setActiveTab('topics');
          }}
          className={`flex flex-col items-center gap-1 p-1 min-w-[50px] ${
            activeTab === 'topics' ? 'text-amber-600 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">4대 주제</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveTab('quiz');
          }}
          className={`flex flex-col items-center gap-1 p-1 min-w-[50px] relative ${
            activeTab === 'quiz' ? 'text-amber-600 font-bold' : 'text-slate-500'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px]">도전 퀴즈</span>
          {progress.mistakeQuestionIds.length > 0 && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveTab('leaderboard');
          }}
          className={`flex flex-col items-center gap-1 p-1 min-w-[50px] ${
            activeTab === 'leaderboard' ? 'text-amber-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">랭킹</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveTab('my-room');
          }}
          className={`flex flex-col items-center gap-1 p-1 min-w-[50px] ${
            activeTab === 'my-room' ? 'text-amber-600 font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">나의 방</span>
        </button>
      </div>

      {/* Quiet, clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            레벨업 잉글리시 · 초등학교 5·6학년 기초 영어 첫걸음
          </p>
          <p className="text-slate-400">
            매일 5분 작은 습관이 유창한 영어 자신감을 만듭니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
