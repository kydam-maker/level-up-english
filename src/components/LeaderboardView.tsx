import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, UserProgress } from '../types';
import {
  subscribeToLeaderboard,
  saveLeaderboardEntry
} from '../utils/leaderboardService';
import {
  Trophy,
  Medal,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  User,
  Radio,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface LeaderboardViewProps {
  progress: UserProgress;
  onNavigateToQuiz: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  progress,
  onNavigateToQuiz
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myNickname, setMyNickname] = useState(() => {
    return localStorage.getItem('level_up_my_nickname') || '열공꿈나무 (5학년)';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculate my current stats
  const totalScore = progress.quizHistory.reduce((sum, h) => sum + h.scorePercentage, 0);
  const totalQuizzes = progress.quizHistory.length;
  const wordsMastered = progress.learnedItemIds.length;
  const streak = progress.dailyStreak;

  const getTier = (count: number) => {
    if (count >= 60) return '👑 영어 마스터';
    if (count >= 40) return '🌟 쑥쑥 모험가';
    if (count >= 15) return '🌱 무럭무럭 새싹';
    return '🐣 첫걸음 탐험대';
  };

  const myTier = getTier(wordsMastered);

  // Subscribe to real-time Firestore database
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToLeaderboard((updatedEntries) => {
      setEntries(updatedEntries);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegisterMyScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myNickname.trim()) return;

    setIsSubmitting(true);
    localStorage.setItem('level_up_my_nickname', myNickname.trim());

    // Generate consistent student device ID
    let deviceId = localStorage.getItem('level_up_student_id');
    if (!deviceId) {
      deviceId = `student-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('level_up_student_id', deviceId);
    }

    const entry: LeaderboardEntry = {
      id: deviceId,
      userName: myNickname.trim(),
      score: totalScore,
      wordsMastered,
      quizzesSolved: totalQuizzes,
      streak,
      tier: myTier,
      updatedAt: new Date().toISOString()
    };

    const success = await saveLeaderboardEntry(entry);
    setIsSubmitting(false);

    if (success) {
      soundEffects.playGrandFanfareWithCheer();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 }
        });
      } catch {}
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm border border-white/20">
            <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>구글 파이어베이스(Firestore) 실시간 연동 중</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-200 shrink-0" />
            <span>실시간 영어 챔피언 리더보드</span>
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-6">
            전국의 친구들과 함께 영어 실력을 겨뤄보세요! 퀴즈를 풀고 단어를 공부할 때마다 점수가 올라갑니다.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs font-bold">
              <span>내 누적 퀴즈 점수: </span>
              <span className="text-amber-100 font-extrabold tabular-nums">{totalScore}점</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs font-bold">
              <span>마스터한 단어: </span>
              <span className="text-amber-100 font-extrabold tabular-nums">{wordsMastered}개</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs font-bold">
              <span>연속 출석: </span>
              <span className="text-amber-100 font-extrabold tabular-nums">{streak}일째</span>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
      </div>

      {/* Register / Update My Score Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>실시간 랭킹에 내 점수 등록하기</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              원하는 닉네임을 적고 등록 버튼을 누르면 실시간으로 순위표에 반영됩니다.
            </p>
          </div>

          <button
            onClick={onNavigateToQuiz}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0"
          >
            <span>퀴즈 더 풀고 점수 올리기</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleRegisterMyScore} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={myNickname}
              onChange={(e) => setMyNickname(e.target.value)}
              placeholder="예: 열공서연 (5학년)"
              maxLength={25}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform active:scale-95 disabled:opacity-50 whitespace-nowrap"
          >
            {isSubmitting ? '파이어베이스 등록 중...' : '🏆 랭킹에 내 점수 올리기'}
          </button>
        </form>

        {submitSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>성공적으로 실시간 리더보드에 점수가 등록되었습니다! 🎉</span>
          </div>
        )}
      </div>

      {/* Real-time Rankings List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">전국 실시간 순위표</h3>
            <span className="text-xs text-slate-400">· 실시간 자동 갱신</span>
          </div>

          <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>실시간 연결됨</span>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-semibold">
            파이어베이스에서 실시간 랭킹을 불러오는 중입니다...
          </div>
        ) : entries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs font-semibold">
            아직 등록된 랭킹 데이터가 없습니다. 첫 번째로 점수를 등록해 보세요!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {entries.map((entry, index) => {
              const rank = index + 1;
              const isTop1 = rank === 1;
              const isTop2 = rank === 2;
              const isTop3 = rank === 3;
              const isTop3Any = isTop1 || isTop2 || isTop3;

              return (
                <div
                  key={entry.id || index}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-colors ${
                    isTop1
                      ? 'bg-amber-50/40 hover:bg-amber-50/70'
                      : isTop2
                      ? 'bg-slate-50/70 hover:bg-slate-100/60'
                      : isTop3
                      ? 'bg-orange-50/30 hover:bg-orange-50/60'
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Rank & Avatar & Name */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-8 sm:w-10 text-center shrink-0">
                      {isTop1 ? (
                        <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full bg-amber-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xs">
                          🥇
                        </div>
                      ) : isTop2 ? (
                        <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full bg-slate-300 text-slate-800 font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xs">
                          🥈
                        </div>
                      ) : isTop3 ? (
                        <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full bg-orange-300 text-orange-950 font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xs">
                          🥉
                        </div>
                      ) : (
                        <span className="font-extrabold text-slate-400 text-sm sm:text-base tabular-nums">
                          {rank}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm sm:text-base truncate">
                          {entry.userName}
                        </span>
                        {entry.tier && (
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                            {entry.tier}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>단어 {entry.wordsMastered}개</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          <span>{entry.streak}일 연속</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score */}
                  <div className="text-right shrink-0">
                    <p
                      className={`text-lg sm:text-xl font-extrabold tabular-nums ${
                        isTop1
                          ? 'text-amber-600'
                          : isTop2
                          ? 'text-slate-800'
                          : isTop3
                          ? 'text-orange-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {entry.score.toLocaleString()}점
                    </p>
                    <p className="text-[11px] text-slate-400">퀴즈 {entry.quizzesSolved}회 완료</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
