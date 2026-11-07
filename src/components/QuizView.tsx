import React, { useState, useEffect } from 'react';
import { QuizQuestion, UserProgress, QuizResultRecord } from '../types';
import { ALL_QUIZ_QUESTIONS, TOPICS } from '../data/curriculumData';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakEnglish, soundEffects } from '../utils/audio';

interface QuizViewProps {
  initialTopicId?: string | null;
  progress: UserProgress;
  onSaveQuizResult: (record: QuizResultRecord) => void;
  onClearMistake: (questionId: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialTopicId,
  progress,
  onSaveQuizResult,
  onClearMistake
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || 'all');
  const [selectedQuizType, setSelectedQuizType] = useState<'all' | 'meaning' | 'blank' | 'listening'>('all');
  const [quizState, setQuizState] = useState<'intro' | 'playing' | 'completed'>('intro');

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync if initialTopicId changed from outside
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  // Start a quiz with filtered questions
  const startQuiz = (topicFilter = selectedTopicId, typeFilter = selectedQuizType, mistakeOnly = false) => {
    let pool: QuizQuestion[] = [...ALL_QUIZ_QUESTIONS];

    if (mistakeOnly) {
      pool = pool.filter((q) => progress.mistakeQuestionIds.includes(q.id));
      if (pool.length === 0) {
        // Fallback to all if no mistakes
        pool = [...ALL_QUIZ_QUESTIONS];
      }
    } else {
      if (topicFilter !== 'all') {
        pool = pool.filter((q) => q.topicId === topicFilter);
      }
      if (typeFilter !== 'all') {
        pool = pool.filter((q) => q.type === typeFilter);
      }
    }

    // Shuffle and pick up to 5-8 questions for manageable bite-sized quiz
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(shuffled.length, 6));

    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setWrongQuestionIds([]);
    setQuizState('playing');

    // Auto play audio if first question is listening type
    if (selected[0]?.type === 'listening' && selected[0].audioPrompt) {
      setTimeout(() => {
        handlePlayAudio(selected[0].audioPrompt!);
      }, 350);
    }
  };

  const currentQ: QuizQuestion | undefined = questions[currentIndex];

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    speakEnglish(text, {
      rate: 0.85,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      soundEffects.playCorrect();
      setCorrectCount((prev) => prev + 1);
      // If this was an existing mistake question being reviewed, clear it!
      if (progress.mistakeQuestionIds.includes(currentQ.id)) {
        onClearMistake(currentQ.id);
      }
    } else {
      soundEffects.playIncorrect();
      setWrongQuestionIds((prev) => [...prev, currentQ.id]);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      soundEffects.playTap();
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);

      if (questions[nextIdx]?.type === 'listening' && questions[nextIdx].audioPrompt) {
        setTimeout(() => {
          handlePlayAudio(questions[nextIdx].audioPrompt!);
        }, 300);
      }
    } else {
      // Quiz Complete
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const total = questions.length;
    const finalCorrect = correctCount + (selectedOption === currentQ?.correctIndex ? 1 : 0);
    const percentage = Math.round((finalCorrect / total) * 100);

    const topicTitle =
      selectedTopicId === 'all'
        ? '전체 종합'
        : TOPICS.find((t) => t.id === selectedTopicId)?.title || '주제별';

    const record: QuizResultRecord = {
      id: `quiz-${Date.now()}`,
      date: new Date().toISOString(),
      topicId: selectedTopicId,
      topicTitle,
      totalQuestions: total,
      correctAnswers: finalCorrect,
      scorePercentage: percentage,
      wrongQuestionIds: Array.from(new Set(wrongQuestionIds))
    };

    const isAllCorrect = finalCorrect === total;

    onSaveQuizResult(record);
    setQuizState('completed');

    if (isAllCorrect) {
      // User got all answers correct! Play "와~!" kid cheering voice + brass trumpet fanfare
      soundEffects.playGrandFanfareWithCheer();
      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.55 }
        });
      } catch {
        // Confetti fallback
      }
    } else if (percentage >= 80) {
      soundEffects.playBrassFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Screen */}
      {quizState === 'intro' && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>도전 레벨업 퀴즈</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                재미있게 복습하는 영어 퀴즈
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                뜻 맞히기, 빈칸 채우기, 원어민 발음 듣고 고르기 등 다양한 문제로 내 실력을 점검해 보세요. 틀린 문제는 언제든 다시 풀어볼 수 있어요!
              </p>
            </div>

            <div className="w-full sm:w-auto flex flex-col gap-2.5 shrink-0">
              <button
                onClick={() => startQuiz(selectedTopicId, selectedQuizType, false)}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>퀴즈 바로 시작하기</span>
              </button>

              {progress.mistakeQuestionIds.length > 0 && (
                <button
                  onClick={() => startQuiz('all', 'all', true)}
                  className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>틀린 문제만 다시 풀기 ({progress.mistakeQuestionIds.length}개)</span>
                </button>
              )}
            </div>
          </div>

          {/* Settings / Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Topic Filter Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>학습할 주제 선택</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedTopicId('all')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedTopicId === 'all'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🌟 전체 주제 섞어서</span>
                </button>
                {TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedTopicId === topic.id
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{topic.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Type Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Filter className="w-4 h-4 text-amber-600" />
                <span>퀴즈 유형 선택</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedQuizType('all')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedQuizType === 'all'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🎲 모든 유형 골고루</span>
                </button>
                <button
                  onClick={() => setSelectedQuizType('meaning')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedQuizType === 'meaning'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>📖 뜻 맞히기 퀴즈</span>
                </button>
                <button
                  onClick={() => setSelectedQuizType('blank')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedQuizType === 'blank'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>✏️ 빈칸 채우기 퀴즈</span>
                </button>
                <button
                  onClick={() => setSelectedQuizType('listening')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedQuizType === 'listening'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🎧 듣고 고르기 퀴즈</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {quizState === 'playing' && currentQ && (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Top Progress bar & Quit */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span className="tabular-nums">
              문제 {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={() => {
                if (confirm('퀴즈를 중단하고 처음 화면으로 돌아갈까요?')) {
                  setQuizState('intro');
                }
              }}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              퀴즈 그만하기
            </button>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header: Type Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {currentQ.type === 'meaning'
                  ? '뜻 맞히기'
                  : currentQ.type === 'blank'
                  ? '빈칸 채우기'
                  : '듣고 고르기 🎧'}
              </span>

              <span className="text-xs font-semibold text-slate-400">
                {TOPICS.find((t) => t.id === currentQ.topicId)?.title}
              </span>
            </div>

            {/* Prompt */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {currentQ.prompt}
              </h3>

              {/* Listening type audio trigger */}
              {currentQ.type === 'listening' && currentQ.audioPrompt && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-amber-900">귀 기울여 들어보세요!</p>
                    <p className="text-xs text-amber-700">스피커 버튼을 누르면 발음이 다시 재생됩니다.</p>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-amber-400 text-amber-950 hover:bg-amber-500 hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>발음 다시 듣기</span>
                  </button>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'border-slate-200 bg-white text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between min-h-[52px] ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box (appears immediately when answered) */}
            {isAnswered && (
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-amber-50/80 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {selectedOption === currentQ.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {selectedOption === currentQ.correctIndex
                        ? '정답이에요! 🎉 아주 잘했어요!'
                        : '아쉬워요! 다음엔 꼭 맞힐 수 있어요! 💪'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>
                      {currentIndex === questions.length - 1 ? '결과 확인하기' : '다음 문제로'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completed Result Screen */}
      {quizState === 'completed' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              퀴즈 완료
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {correctCount === questions.length
                ? '와! 정답을 모두 다 맞췄어요! 🌟'
                : Math.round((correctCount / questions.length) * 100) >= 80
                ? '와우! 정말 훌륭해요! 🌟'
                : '수고했어요! 복습하면 더 잘할 수 있어요! 👍'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              퀴즈 결과와 학습 기록이 기기에 안전하게 저장되었습니다.
            </p>

            {/* Special Celebration Card for 100% All Correct */}
            {correctCount === questions.length && (
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="text-left">
                  <p className="text-xs font-bold text-amber-800">🎉 퍼펙트 만점 달성!</p>
                  <p className="text-sm font-extrabold text-amber-950">모든 문제를 완벽하게 맞혔어요!</p>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playGrandFanfareWithCheer();
                    try {
                      confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });
                    } catch {}
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105 flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>'와!' 아이음성 & 빵빠레 다시 듣기</span>
                </button>
              </div>
            )}
          </div>

          {/* Score card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400">맞힌 문제</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">
                {correctCount} / {questions.length}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">성취 점수</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 tabular-nums">
                {Math.round((correctCount / questions.length) * 100)}점
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            {wrongQuestionIds.length > 0 && (
              <button
                onClick={() => startQuiz('all', 'all', true)}
                className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>방금 틀린 문제 다시 도전하기 ({wrongQuestionIds.length}개)</span>
              </button>
            )}

            <button
              onClick={() => startQuiz(selectedTopicId, selectedQuizType, false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs"
            >
              새로운 퀴즈 다시 풀기
            </button>

            <button
              onClick={() => setQuizState('intro')}
              className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              퀴즈 홈으로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
