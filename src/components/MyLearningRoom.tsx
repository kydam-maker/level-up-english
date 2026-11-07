import React, { useState } from 'react';
import { UserProgress, StudyItem, QuizQuestion } from '../types';
import { TOPICS, ALL_QUIZ_QUESTIONS } from '../data/curriculumData';
import {
  Flame,
  CheckCircle2,
  Star,
  RotateCcw,
  Volume2,
  Trash2,
  Sparkles,
  BookOpen,
  Calendar,
  Award
} from 'lucide-react';
import { speakEnglish, soundEffects } from '../utils/audio';

interface MyLearningRoomProps {
  progress: UserProgress;
  onClearMistake: (questionId: string) => void;
  onToggleBookmark: (itemId: string) => void;
  onResetProgress: () => void;
  onStartMistakeQuiz: () => void;
}

export const MyLearningRoom: React.FC<MyLearningRoomProps> = ({
  progress,
  onClearMistake,
  onToggleBookmark,
  onResetProgress,
  onStartMistakeQuiz
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'mistakes' | 'history'>('bookmarks');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Flatten all items
  const allItems: StudyItem[] = TOPICS.flatMap((t) => [
    ...t.words,
    ...t.sentences,
    ...t.expressions
  ]);

  // Bookmarked items
  const bookmarkedItems = allItems.filter((item) => progress.bookmarkedItemIds.includes(item.id));

  // Mistake questions
  const mistakeQuestions = ALL_QUIZ_QUESTIONS.filter((q) => progress.mistakeQuestionIds.includes(q.id));

  // Total learned count
  const totalMasteredCount = progress.learnedItemIds.length;
  const totalCurriculumCount = allItems.length;
  const overallPercentage = Math.round((totalMasteredCount / totalCurriculumCount) * 100);

  // Elementary grade level titles
  const getLevelInfo = (count: number) => {
    if (count >= 60) return { title: '👑 영어 마스터 챔피언', desc: '초등 5·6학년 필수 영어를 거의 완벽하게 정복했어요!', color: 'text-amber-600' };
    if (count >= 40) return { title: '🌟 쑥쑥 영어 모험가', desc: '절반 이상을 배웠어요! 꾸준함이 정말 멋져요.', color: 'text-sky-600' };
    if (count >= 15) return { title: '🌱 무럭무럭 새싹 학습자', desc: '차근차근 기초를 단단히 다지고 있어요!', color: 'text-emerald-600' };
    return { title: '🐣 첫걸음 영어 탐험대', desc: '매일 5분씩 배우며 영어와 친해지는 중이에요!', color: 'text-amber-500' };
  };

  const levelInfo = getLevelInfo(totalMasteredCount);

  const handlePlayAudio = (text: string, id: string) => {
    setPlayingId(id);
    speakEnglish(text, {
      rate: 0.85,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile & Level Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              초등 5·6학년 맞춤 나의 학습방
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {levelInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{levelInfo.desc}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 rounded-2xl border border-orange-200 text-orange-800">
              <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
              <div>
                <p className="text-[11px] font-semibold text-orange-600">연속 출석</p>
                <p className="text-lg font-extrabold tabular-nums">{progress.dailyStreak}일째</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-white" />
              <div>
                <p className="text-[11px] font-semibold text-emerald-600">완료한 표현</p>
                <p className="text-lg font-extrabold tabular-nums">
                  {totalMasteredCount} / {totalCurriculumCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Progress Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span>전체 80개 단어·문장 완성도</span>
            <span className="tabular-nums font-extrabold text-amber-600">
              {overallPercentage}% ({totalMasteredCount}/{totalCurriculumCount})
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sub Tabs: 찜한 단어장, 오답 복습 노트, 퀴즈 기록 */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveSubTab('bookmarks');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'bookmarks'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Star className="w-4 h-4 fill-current" />
          <span>내가 찜한 단어장 ({bookmarkedItems.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveSubTab('mistakes');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'mistakes'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>오답 복습 노트 ({mistakeQuestions.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            setActiveSubTab('history');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'history'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>퀴즈 결과 기록 ({progress.quizHistory.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: BOOKMARKS */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">아직 찜한 단어가 없어요</h3>
              <p className="text-xs text-slate-500 mt-1">
                학습 카드나 목록에서 별(⭐) 버튼을 눌러 다시 보고 싶은 단어를 찜해보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedItems.map((item) => {
                const topic = TOPICS.find((t) => t.id === item.topicId);
                const isPlaying = playingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-amber-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          {topic?.title} · {item.type === 'word' ? '단어' : item.type === 'sentence' ? '문장' : '표현'}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePlayAudio(item.english, item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isPlaying
                                ? 'bg-amber-500 text-white animate-pulse'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                            title="발음 듣기"
                            aria-label="발음 듣기"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onToggleBookmark(item.id)}
                            className="p-2 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"
                            title="찜 해제"
                            aria-label="찜 해제"
                          >
                            <Star className="w-4 h-4 fill-amber-400" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.english}</h4>
                      {item.pronunciation && (
                        <p className="text-xs text-amber-600 font-medium mb-1.5">
                          [{item.pronunciation}]
                        </p>
                      )}
                      <p className="text-sm font-bold text-emerald-700 mb-2">뜻: {item.korean}</p>

                      <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 border border-slate-100">
                        <span className="font-bold text-slate-800">💡 설명: </span>
                        {item.contextTip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: MISTAKES REVIEW NOTE */}
      {activeSubTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">틀린 문제 다시 풀기</h3>
              <p className="text-xs text-slate-500">
                퀴즈에서 틀렸던 문제를 완벽히 맞힐 때까지 연습해 보세요!
              </p>
            </div>

            {mistakeQuestions.length > 0 && (
              <button
                onClick={onStartMistakeQuiz}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>오답 퀴즈 풀기</span>
              </button>
            )}
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">틀린 문제가 하나도 없어요! 🎉</h3>
              <p className="text-xs text-slate-500 mt-1">
                모든 퀴즈 문제를 멋지게 해결했어요. 대단해요!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mistakeQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        오답 복습
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1.5">{q.prompt}</h4>
                    </div>

                    <button
                      onClick={() => onClearMistake(q.id)}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-700 p-1"
                      title="오답 노트에서 삭제"
                    >
                      해결됨으로 표시
                    </button>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-slate-700">
                    <span className="font-bold text-amber-900">💡 정답 해설: </span>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: QUIZ HISTORY */}
      {activeSubTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">최근 퀴즈 응시 기록</h3>
            <span className="text-xs text-slate-400">최근 최대 50회 기록 보관</span>
          </div>

          {progress.quizHistory.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              아직 응시한 퀴즈 기록이 없어요. 첫 번째 퀴즈에 도전해 보세요!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {progress.quizHistory.map((h) => {
                const dateStr = new Date(h.date).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={h.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900">{h.topicTitle} 퀴즈</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateStr}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {h.correctAnswers} / {h.totalQuestions} 문제 정답
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-base font-extrabold tabular-nums ${
                          h.scorePercentage >= 80 ? 'text-amber-600' : 'text-slate-700'
                        }`}
                      >
                        {h.scorePercentage}점
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Device Storage Info & Reset */}
      <div className="bg-slate-100/70 rounded-2xl p-5 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-700">💾 기기 저장소 동기화 중: </span>
          <span>학습 진도, 찜한 표현, 오답 기록이 브라우저에 안전하게 보관됩니다.</span>
        </div>

        <button
          onClick={() => {
            if (confirm('정말로 모든 학습 진도와 퀴즈 기록을 초기화하시겠어요?')) {
              onResetProgress();
            }
          }}
          className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>학습 기록 초기화</span>
        </button>
      </div>
    </div>
  );
};
