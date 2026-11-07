import React, { useState, useEffect } from 'react';
import { Topic, StudyItem, ItemType, UserProgress } from '../types';
import { TOPICS } from '../data/curriculumData';
import {
  Volume2,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  LayoutGrid,
  CreditCard,
  RotateCw,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { speakEnglish, soundEffects } from '../utils/audio';

interface FlashcardStudyProps {
  topicId: string;
  progress: UserProgress;
  onBackToTopics: () => void;
  onMarkLearned: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onStartQuiz: (topicId: string) => void;
}

export const FlashcardStudy: React.FC<FlashcardStudyProps> = ({
  topicId,
  progress,
  onBackToTopics,
  onMarkLearned,
  onToggleBookmark,
  onStartQuiz
}) => {
  const currentTopic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];

  const [activeFilter, setActiveFilter] = useState<'all' | 'word' | 'sentence' | 'expression' | 'unlearned'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slowRate, setSlowRate] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [cardOrder, setCardOrder] = useState<StudyItem[]>([]);

  // Build items based on filter
  useEffect(() => {
    let items: StudyItem[] = [
      ...currentTopic.words,
      ...currentTopic.sentences,
      ...currentTopic.expressions
    ];

    if (activeFilter === 'word') {
      items = currentTopic.words;
    } else if (activeFilter === 'sentence') {
      items = currentTopic.sentences;
    } else if (activeFilter === 'expression') {
      items = currentTopic.expressions;
    } else if (activeFilter === 'unlearned') {
      items = items.filter((i) => !progress.learnedItemIds.includes(i.id));
    }

    setCardOrder(items);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [topicId, activeFilter, currentTopic, progress.learnedItemIds]);

  const activeItem: StudyItem | undefined = cardOrder[currentIndex];

  const handleNext = () => {
    if (currentIndex < cardOrder.length - 1) {
      soundEffects.playTap();
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundEffects.playTap();
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    soundEffects.playTap();
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingAudio(true);
    speakEnglish(text, {
      rate: slowRate ? 0.72 : 0.9,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleToggleLearned = (itemId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playCorrect();
    onMarkLearned(itemId);
  };

  const handleToggleBookmarkClick = (itemId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playTap();
    onToggleBookmark(itemId);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playTap();
              onBackToTopics();
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="주제 목록으로 돌아가기"
            aria-label="주제 목록으로"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentTopic.title}
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                {currentTopic.titleEnglish}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentTopic.description}</p>
          </div>
        </div>

        {/* Action Button: Start Quiz for this topic */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playTap();
              onStartQuiz(currentTopic.id);
            }}
            className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>이 주제 퀴즈 풀기</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & View Mode Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200">
        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-amber-100 text-amber-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            전체 (20)
          </button>
          <button
            onClick={() => setActiveFilter('word')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'word'
                ? 'bg-amber-100 text-amber-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            단어 (10)
          </button>
          <button
            onClick={() => setActiveFilter('sentence')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'sentence'
                ? 'bg-amber-100 text-amber-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            문장 (5)
          </button>
          <button
            onClick={() => setActiveFilter('expression')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'expression'
                ? 'bg-amber-100 text-amber-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            주요 표현 (5)
          </button>
          <button
            onClick={() => setActiveFilter('unlearned')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'unlearned'
                ? 'bg-amber-100 text-amber-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            미학습만
          </button>
        </div>

        {/* View Mode & Rate controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSlowRate(false)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                !slowRate ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
              title="보통 속도"
            >
              1.0x
            </button>
            <button
              onClick={() => setSlowRate(true)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                slowRate ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
              title="초보자용 느린 발음"
            >
              0.7x 🐢
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => {
                soundEffects.playTap();
                setViewMode('card');
              }}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'card' ? 'bg-white text-amber-600 shadow-2xs' : 'text-slate-500'
              }`}
              title="플래시카드 보기"
              aria-label="카드 모드"
            >
              <CreditCard className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEffects.playTap();
                setViewMode('grid');
              }}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-amber-600 shadow-2xs' : 'text-slate-500'
              }`}
              title="모아보기 (목록)"
              aria-label="목록 모드"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {cardOrder.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">해당하는 카드가 없습니다</h3>
          <p className="text-xs text-slate-500 mt-1">
            미학습 단어를 모두 정복했거나 다른 필터를 선택해 보세요.
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
          >
            전체 카드 보기
          </button>
        </div>
      ) : viewMode === 'card' && activeItem ? (
        /* SINGLE FLASHCARD INTERACTIVE VIEW */
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Card counter & Shuffle */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
            <span className="tabular-nums">
              {currentIndex + 1} / {cardOrder.length} 번째 카드
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 text-slate-600 hover:text-amber-600 transition-colors"
                title="카드 순서 섞기"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>랜덤 섞기</span>
              </button>
            </div>
          </div>

          {/* Flashcard container */}
          <div
            onClick={() => {
              soundEffects.playTap();
              setIsFlipped(!isFlipped);
            }}
            className="cursor-pointer bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-300 transition-all p-8 sm:p-12 shadow-sm hover:shadow-md min-h-[360px] flex flex-col justify-between relative select-none"
          >
            {/* Top row of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                <span>
                  {activeItem.type === 'word'
                    ? '단어'
                    : activeItem.type === 'sentence'
                    ? '문장'
                    : '주요 표현'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentTopic.title}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => handleToggleBookmarkClick(activeItem.id, e)}
                  className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                  title="찜하기"
                  aria-label="찜하기"
                >
                  <Star
                    className={`w-5 h-5 ${
                      progress.bookmarkedItemIds.includes(activeItem.id)
                        ? 'fill-amber-400 text-amber-500'
                        : ''
                    }`}
                  />
                </button>

                <button
                  onClick={(e) => handleToggleLearned(activeItem.id, e)}
                  className={`p-2 rounded-xl transition-colors ${
                    progress.learnedItemIds.includes(activeItem.id)
                      ? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200'
                      : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                  title={progress.learnedItemIds.includes(activeItem.id) ? '학습 완료됨' : '학습 완료로 표시'}
                  aria-label="학습 완료 토글"
                >
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      progress.learnedItemIds.includes(activeItem.id)
                        ? 'fill-emerald-500 text-white'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Middle Content */}
            {!isFlipped ? (
              // FRONT of Card
              <div className="py-8 text-center my-auto">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  {activeItem.english}
                </h3>

                {activeItem.pronunciation && (
                  <p className="text-sm font-semibold text-amber-600 mb-6">
                    발음: [{activeItem.pronunciation}]
                  </p>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => handleSpeak(activeItem.english, e)}
                    className={`px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-xs ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
                    }`}
                  >
                    <Volume2 className="w-5 h-5 text-amber-600" />
                    <span>발음 듣기 ({slowRate ? '0.7x' : '1.0x'})</span>
                  </button>
                </div>

                <div className="mt-8 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>카드를 누르면 한국어 뜻과 상황 설명이 펼쳐집니다</span>
                </div>
              </div>
            ) : (
              // BACK of Card
              <div className="py-4 my-auto space-y-4">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 mb-1">한국어 뜻</p>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {activeItem.korean}
                  </h4>
                </div>

                {/* Context Tip */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900">언제 사용하는 표현일까요? </span>
                      <span>{activeItem.contextTip}</span>
                    </div>
                  </div>
                </div>

                {/* Example sentence if available */}
                {activeItem.example && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-500">쉬운 예문</span>
                      <button
                        onClick={(e) => handleSpeak(activeItem.example!, e)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>예문 발음 듣기</span>
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{activeItem.example}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{activeItem.exampleKorean}</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{isFlipped ? '앞면으로 돌리기' : '뒷면 뜻 보기'}</span>
              <span className={`font-bold ${progress.learnedItemIds.includes(activeItem.id) ? 'text-emerald-600' : 'text-slate-400'}`}>
                {progress.learnedItemIds.includes(activeItem.id) ? '✓ 학습 완료' : '미완료'}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전 카드</span>
            </button>

            <button
              onClick={() => handleToggleLearned(activeItem.id)}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors ${
                progress.learnedItemIds.includes(activeItem.id)
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {progress.learnedItemIds.includes(activeItem.id)
                  ? '완료 취소'
                  : '학습 완료 체크'}
              </span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === cardOrder.length - 1}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border ${
                currentIndex === cardOrder.length - 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <span>다음 카드</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* GRID LIST VIEW OF ALL ITEMS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardOrder.map((item, index) => {
            const isLearned = progress.learnedItemIds.includes(item.id);
            const isBookmarked = progress.bookmarkedItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 transition-all ${
                  isLearned
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {item.type === 'word'
                          ? '단어'
                          : item.type === 'sentence'
                          ? '문장'
                          : '주요 표현'}
                      </span>
                      <span className="text-xs text-slate-400">#{index + 1}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 leading-snug">
                      {item.english}
                    </h4>

                    {item.pronunciation && (
                      <p className="text-xs text-amber-600 font-medium">
                        [{item.pronunciation}]
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleSpeak(item.english, e)}
                      className="p-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
                      title="소리 듣기"
                      aria-label="발음 듣기"
                    >
                      <Volume2 className="w-4 h-4 text-amber-700" />
                    </button>

                    <button
                      onClick={(e) => handleToggleBookmarkClick(item.id, e)}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                      title="찜하기"
                      aria-label="찜하기"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={(e) => handleToggleLearned(item.id, e)}
                      className={`p-2 rounded-lg transition-colors ${
                        isLearned
                          ? 'text-emerald-600 bg-emerald-100'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                      title="학습 완료 체크"
                      aria-label="완료 체크"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isLearned ? 'fill-emerald-500 text-white' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="text-sm font-bold text-emerald-800 mb-2">
                  뜻: {item.korean}
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 border border-slate-100">
                  <span className="font-bold text-slate-800">💡 상황 설명: </span>
                  {item.contextTip}
                </div>

                {item.example && (
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">{item.example}</span>{' '}
                      <span className="text-slate-400">({item.exampleKorean})</span>
                    </div>
                    <button
                      onClick={(e) => handleSpeak(item.example!, e)}
                      className="text-amber-700 hover:text-amber-900 p-1 shrink-0"
                      title="예문 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
