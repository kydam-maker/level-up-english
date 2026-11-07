import React, { useState } from 'react';
import { StudyItem, UserProgress } from '../types';
import { TOPICS } from '../data/curriculumData';
import { Volume2, CheckCircle2, Star, Sparkles, ArrowRight, RotateCcw, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakEnglish, soundEffects } from '../utils/audio';

interface DailyMissionProps {
  progress: UserProgress;
  onMarkLearned: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onStartQuiz: () => void;
  onBrowseAllTopics: () => void;
  onOpenLeaderboard: () => void;
}

export const DailyMission: React.FC<DailyMissionProps> = ({
  progress,
  onMarkLearned,
  onToggleBookmark,
  onStartQuiz,
  onBrowseAllTopics,
  onOpenLeaderboard
}) => {
  const [slowRate, setSlowRate] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  // Select 5 items for today: prioritize unlearned items first
  const allItems: StudyItem[] = TOPICS.flatMap((t) => [
    ...t.words,
    ...t.sentences,
    ...t.expressions
  ]);

  const unlearnedItems = allItems.filter((item) => !progress.learnedItemIds.includes(item.id));
  const todayItems: StudyItem[] = (unlearnedItems.length >= 5
    ? unlearnedItems.slice(0, 5)
    : [...unlearnedItems, ...allItems.filter((item) => progress.learnedItemIds.includes(item.id))].slice(0, 5)
  );

  const completedTodayCount = todayItems.filter((i) => progress.learnedItemIds.includes(i.id)).length;
  const isAllDone = completedTodayCount === todayItems.length;

  const handlePlayAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakEnglish(text, {
      rate: slowRate ? 0.72 : 0.9,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  const handleFlipCard = (id: string) => {
    soundEffects.playTap();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheck = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const willBeComplete = !progress.learnedItemIds.includes(id) && completedTodayCount + 1 === todayItems.length;
    if (willBeComplete) {
      soundEffects.playGrandFanfareWithCheer();
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } else {
      soundEffects.playCorrect();
    }
    onMarkLearned(id);
  };

  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEffects.playTap();
    onToggleBookmark(id);
  };

  return (
    <div className="space-y-6">
      {/* Daily Hero Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>부담 없이 매일 5분! 오늘의 학습</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            오늘 배울 영어 표현 5가지
          </h1>
          <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-6">
            한 번에 너무 많이 외우지 않아도 괜찮아요! 매일 5개씩 소리 내어 따라 읽으면 실력이 쑥쑥 늘어납니다.
          </p>

          {/* Daily Progress Bar */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3.5 max-w-lg border border-white/20">
            <div className="flex items-center justify-between text-xs font-bold mb-2 text-white">
              <span>오늘의 목표 달성률</span>
              <span className="tabular-nums">
                {completedTodayCount} / {todayItems.length} 완료 ({Math.round((completedTodayCount / todayItems.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(completedTodayCount / todayItems.length) * 100}%` }}
              />
            </div>
            {isAllDone && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-white/20 p-2.5 rounded-xl border border-white/30 backdrop-blur-sm">
                <p className="text-xs font-bold text-amber-100 flex items-center gap-1.5">
                  🎉 와우! 오늘 분량을 모두 완료했어요!
                </p>
                <button
                  onClick={() => {
                    soundEffects.playGrandFanfareWithCheer();
                    try {
                      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                    } catch {}
                  }}
                  className="px-2.5 py-1 bg-white text-amber-900 rounded-lg text-xs font-bold hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1"
                >
                  <span>🎺 '와!' 아이음성 & 빵빠레</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative circular element */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
      </div>

      {/* Real-time Leaderboard Link Card on First Screen */}
      <div
        onClick={onOpenLeaderboard}
        className="cursor-pointer bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
            🏆
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                실시간 랭킹 리더보드 확인하기
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-amber-100 flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>파이어베이스 실시간</span>
              </span>
            </div>
            <p className="text-xs text-amber-100 truncate mt-0.5">
              전국의 친구들과 실시간 점수를 비교하고 나의 랭킹을 등록해 보세요!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white text-amber-900 font-extrabold text-xs shrink-0 group-hover:bg-amber-100 transition-colors shadow-2xs">
          <span>순위표 열기</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Control bar: Audio speed toggle & View all */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">발음 속도:</span>
          <button
            onClick={() => setSlowRate(false)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              !slowRate ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            보통 속도 (1.0x)
          </button>
          <button
            onClick={() => setSlowRate(true)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              slowRate ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            천천히 듣기 (0.7x 🐢)
          </button>
        </div>

        <button
          onClick={onBrowseAllTopics}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors"
        >
          <span>전체 4개 주제 보러가기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Daily Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayItems.map((item, index) => {
          const isLearned = progress.learnedItemIds.includes(item.id);
          const isBookmarked = progress.bookmarkedItemIds.includes(item.id);
          const isFlipped = !!flippedIds[item.id];
          const isPlaying = playingId === item.id;

          const badgeType =
            item.type === 'word' ? '단어' : item.type === 'sentence' ? '문장' : '주요 표현';

          return (
            <div
              key={item.id}
              onClick={() => handleFlipCard(item.id)}
              className={`group cursor-pointer bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md relative flex flex-col justify-between overflow-hidden p-5 min-h-[220px] ${
                isLearned
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Card Top Row: Type & Actions */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-amber-600">Day {index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium">{badgeType}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleBookmark(e, item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                    title={isBookmarked ? '찜 해제' : '찜하기'}
                    aria-label="찜하기"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => handleCheck(e, item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isLearned
                        ? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200'
                        : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={isLearned ? '학습 완료됨' : '학습 완료로 표시'}
                    aria-label="학습 완료"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        isLearned ? 'fill-emerald-500 text-white' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              {!isFlipped ? (
                // Front: English + Pronunciation + Audio
                <div className="my-auto py-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                        {item.english}
                      </h3>
                      {item.pronunciation && (
                        <p className="text-xs text-amber-700 font-medium mt-1">
                          발음: [{item.pronunciation}]
                        </p>
                      )}
                    </div>

                    <button
                      onClick={(e) => handlePlayAudio(e, item.english, item.id)}
                      className={`p-2.5 rounded-xl transition-all shrink-0 ${
                        isPlaying
                          ? 'bg-amber-500 text-white scale-110 shadow-sm animate-pulse'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                      title="소리 듣기"
                      aria-label="영어 발음 듣기"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="mt-4 text-xs text-slate-400 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>카드를 누르면 한국어 뜻과 쉬운 설명이 보여요</span>
                  </p>
                </div>
              ) : (
                // Back: Korean meaning + Context explanation + Example
                <div className="my-auto py-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      뜻
                    </span>
                    <button
                      onClick={(e) => handlePlayAudio(e, item.english, item.id)}
                      className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>다시 듣기</span>
                    </button>
                  </div>

                  <div className="text-lg font-bold text-slate-900">{item.korean}</div>

                  <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 leading-relaxed border border-slate-100">
                    <span className="font-bold text-slate-800">💡 언제 쓰나요? </span>
                    {item.contextTip}
                  </div>

                  {item.example && (
                    <div className="text-xs text-slate-500 pt-1">
                      <p className="font-medium text-slate-700">예문: {item.example}</p>
                      <p className="text-slate-400">{item.exampleKorean}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Card Bottom status */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {isFlipped ? '다시 누르면 앞면으로' : '클릭하여 뒷면 보기'}
                </span>
                <span className={`font-semibold ${isLearned ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isLearned ? '✓ 학습 완료' : '미완료'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer: Jump to Quiz */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            오늘 배운 단어와 표현, 퀴즈로 바로 확인해볼까요?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            뜻 맞히기, 빈칸 채우기, 듣고 고르기 퀴즈가 준비되어 있어요!
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>오늘 분량 퀴즈 시작하기</span>
        </button>
      </div>
    </div>
  );
};
