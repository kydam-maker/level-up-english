import React from 'react';
import { Topic, UserProgress } from '../types';
import { TOPICS } from '../data/curriculumData';
import { Sun, BookOpen, Heart, Utensils, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface TopicSelectorProps {
  progress: UserProgress;
  onSelectTopic: (topicId: string) => void;
  onStartTopicQuiz: (topicId: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  progress,
  onSelectTopic,
  onStartTopicQuiz
}) => {
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-sky-500" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-emerald-500" />;
      default:
        return <BookOpen className="w-6 h-6 text-amber-500" />;
    }
  };

  const getTopicColorClasses = (themeColor: string) => {
    switch (themeColor) {
      case 'amber':
        return {
          bg: 'bg-amber-50 hover:bg-amber-100/50',
          badge: 'bg-amber-100 text-amber-900',
          border: 'border-amber-200',
          progress: 'bg-amber-500',
          btn: 'bg-amber-500 hover:bg-amber-600'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50 hover:bg-sky-100/50',
          badge: 'bg-sky-100 text-sky-900',
          border: 'border-sky-200',
          progress: 'bg-sky-500',
          btn: 'bg-sky-500 hover:bg-sky-600'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50 hover:bg-rose-100/50',
          badge: 'bg-rose-100 text-rose-900',
          border: 'border-rose-200',
          progress: 'bg-rose-500',
          btn: 'bg-rose-500 hover:bg-rose-600'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50 hover:bg-emerald-100/50',
          badge: 'bg-emerald-100 text-emerald-900',
          border: 'border-emerald-200',
          progress: 'bg-emerald-500',
          btn: 'bg-emerald-500 hover:bg-emerald-600'
        };
      default:
        return {
          bg: 'bg-slate-50',
          badge: 'bg-slate-100 text-slate-800',
          border: 'border-slate-200',
          progress: 'bg-amber-500',
          btn: 'bg-amber-500 hover:bg-amber-600'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Title area */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          초등 필수 4대 주제 학습
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          초등학교 5·6학년 교육과정에 맞춘 알찬 영어 표현을 주제별로 차근차근 배워보세요.
        </p>
      </div>

      {/* 4 Topic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TOPICS.map((topic) => {
          const totalItems = topic.words.length + topic.sentences.length + topic.expressions.length;
          const learnedCount = [
            ...topic.words,
            ...topic.sentences,
            ...topic.expressions
          ].filter((item) => progress.learnedItemIds.includes(item.id)).length;

          const percentage = Math.round((learnedCount / totalItems) * 100);
          const colors = getTopicColorClasses(topic.themeColor);

          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                {/* Header of Topic Card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>{topic.title}</span>
                        <span className="text-xs font-semibold text-slate-400">
                          ({topic.titleEnglish})
                        </span>
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span>단어 {topic.words.length}개</span>
                        <span aria-hidden="true">·</span>
                        <span>문장 {topic.sentences.length}개</span>
                        <span aria-hidden="true">·</span>
                        <span>주요 표현 {topic.expressions.length}개</span>
                      </div>
                    </div>
                  </div>

                  {percentage === 100 && (
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                      <span>완전 정복!</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {topic.description}
                </p>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span>학습 진행도</span>
                    <span className="tabular-nums">
                      {learnedCount} / {totalItems} 완료 ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    soundEffects.playTap();
                    onSelectTopic(topic.id);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-slate-50"
                >
                  <span>학습 카드 열기</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    soundEffects.playTap();
                    onStartTopicQuiz(topic.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl ${colors.btn} text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs`}
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>주제 퀴즈 풀기</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
