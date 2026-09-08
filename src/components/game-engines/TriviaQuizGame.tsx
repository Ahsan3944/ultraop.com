import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Award, ArrowRight, Flame, Sparkles, Share2, Box, Crosshair, Gamepad, Shield, Clock } from 'lucide-react';
import { MULTI_GAME_TRIVIA, GameTriviaCategory } from '../../data/gamingData';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const TriviaQuizGame: React.FC = () => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('minecraft');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeCategory: GameTriviaCategory = MULTI_GAME_TRIVIA[selectedCategoryKey] || MULTI_GAME_TRIVIA.minecraft;
  const questionsList = activeCategory.questions;
  const currentQ = questionsList[currentIndex] || questionsList[0];

  useEffect(() => {
    if (!isStarted || isAnswered || isFinished) return;

    if (timer <= 0) {
      handleOptionSelect(-1); // time out
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isStarted, isAnswered, isFinished]);

  const handleStart = (categoryKey?: string) => {
    sound.playClick();
    if (categoryKey) {
      setSelectedCategoryKey(categoryKey);
    }
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimer(15);
    setIsFinished(false);
    setIsStarted(true);
    setCopied(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correct) {
      sound.playScore();
      const streakBonus = streak * 60;
      const speedBonus = timer * 15;
      const earned = 100 + streakBonus + speedBonus;
      setScore((prev) => prev + earned);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      sound.playHit();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(15);
    } else {
      setIsFinished(true);
      sound.playWin();
      confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 } });
    }
  };

  // Keyboard shortcut listener for options (A=0, B=1, C=2, D=3, Space/Enter=Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isFinished) return;
      if (!isAnswered) {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') handleOptionSelect(0);
        else if (e.key === '2' || e.key === 'b' || e.key === 'B') handleOptionSelect(1);
        else if (e.key === '3' || e.key === 'c' || e.key === 'C') handleOptionSelect(2);
        else if (e.key === '4' || e.key === 'd' || e.key === 'D') handleOptionSelect(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnswered, isFinished, isStarted, questionsList.length]);

  const getRank = () => {
    if (score >= 800) return { title: `ULTRA OP ${activeCategory.shortTitle.toUpperCase()} RADIANT MASTER`, color: 'text-amber-400', badge: '👑' };
    if (score >= 500) return { title: `${activeCategory.shortTitle.toUpperCase()} PRO STRATEGIST`, color: 'text-emerald-400', badge: '⚡' };
    return { title: `${activeCategory.shortTitle.toUpperCase()} ENTHUSIAST`, color: 'text-cyan-400', badge: '🎯' };
  };

  const renderGameIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Box': return <Box className={className} />;
      case 'Crosshair': return <Crosshair className={className} />;
      case 'Gamepad': return <Gamepad className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Flame': return <Flame className={className} />;
      default: return <Gamepad className={className} />;
    }
  };

  const handleCopyShare = () => {
    const text = `🏆 I scored ${score} PTS in the UltraOP ${activeCategory.shortTitle} Esports Quiz! Rank: ${getRank().title}. Test your gaming IQ on ultraop.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="multi-game-quiz-wrapper" className="relative flex flex-col items-center bg-[#141414] rounded-2xl border border-white/15 p-4 sm:p-6 w-full max-w-2xl mx-auto shadow-2xl overflow-hidden">
      {/* Category selector pills */}
      <div className="w-full mb-4">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Gamepad className="w-3.5 h-3.5 text-[#FF3E00]" /> Select Game Category:
          </span>
          <span className="text-[#FF3E00] font-mono text-[10px] font-bold">6 Game Hubs</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {Object.entries(MULTI_GAME_TRIVIA).map(([key, cat]) => {
            const isSelected = selectedCategoryKey === key;
            return (
              <button
                key={key}
                id={`quiz-cat-${key}`}
                disabled={isStarted && !isFinished}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategoryKey(key);
                  if (isFinished) {
                    setIsFinished(false);
                    setIsStarted(false);
                  }
                }}
                className={`px-2 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border text-center ${
                  isSelected
                    ? 'bg-[#222222] border-[#FF3E00] text-white shadow-md scale-105 ring-1 ring-[#FF3E00]'
                    : 'bg-[#181818] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                } ${isStarted && !isFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {renderGameIcon(cat.icon, isSelected ? 'w-4 h-4 text-[#FF3E00]' : 'w-4 h-4 text-gray-400')}
                <span className="truncate w-full text-[10px] sm:text-[11px]">{cat.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!isStarted ? (
        <div className="text-center py-6 px-3 flex flex-col items-center w-full animate-fade-in">
          <div className={`p-4 bg-gradient-to-br ${activeCategory.themeGradient} rounded-2xl shadow-xl mb-4 text-white`}>
            {renderGameIcon(activeCategory.icon, 'w-10 h-10')}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-amber-400 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {activeCategory.badge}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mb-2 tracking-tight">
            {activeCategory.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            {activeCategory.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-gray-300 bg-[#1c1c1c] p-3.5 rounded-xl border border-white/10 mb-6 text-left w-full max-w-lg">
            <div>⏱️ <strong>Timer:</strong> 15s / Q</div>
            <div>🔥 <strong>Streak:</strong> Combo PTS</div>
            <div>🎮 <strong>Game:</strong> {activeCategory.shortTitle}</div>
            <div>🎖️ <strong>Reward:</strong> Official Rank</div>
          </div>

          <button
            id="start-quiz-btn"
            onClick={() => handleStart()}
            className="px-8 py-3.5 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            <Flame className="w-4 h-4 fill-current" />
            START {activeCategory.shortTitle.toUpperCase()} TRIVIA
          </button>
        </div>
      ) : isFinished ? (
        <div className="text-center py-4 px-2 flex flex-col items-center w-full max-w-lg animate-fade-in">
          {/* Certificate Card */}
          <div className="relative bg-[#181818] border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 w-full shadow-2xl text-left overflow-hidden mb-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-black tracking-widest text-amber-400 uppercase">UltraOP Esports Certificate</span>
              </div>
              <span className="text-[9px] font-mono bg-white/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">VERIFIED</span>
            </div>

            <div className="text-center py-3">
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Official Rank Tier Awarded</div>
              <div className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2 font-heading">
                <span>{getRank().badge}</span>
                <span className={getRank().color}>{getRank().title}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-black/60 rounded-xl p-3.5 border border-white/10 my-4 text-xs">
              <div>
                <div className="text-gray-500 font-medium text-[10px] uppercase">Game Category</div>
                <div className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                  {renderGameIcon(activeCategory.icon, 'w-3.5 h-3.5 text-amber-400')}
                  {activeCategory.shortTitle}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-medium text-[10px] uppercase">Total Score</div>
                <div className="text-[#FF3E00] font-mono font-black text-base mt-0.5">{score} PTS</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium text-[10px] uppercase">Max Streak</div>
                <div className="text-amber-400 font-mono font-bold mt-0.5">{maxStreak}x in a row</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium text-[10px] uppercase">Issued By</div>
                <div className="text-white font-bold mt-0.5">Sk Ahsan Ahmad</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-white/10 pt-3">
              <span>Authentic UltraOP Portal Badge</span>
              <span className="font-mono text-gray-400">ID: UOP-{(score * 7).toString(16).toUpperCase()}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              id="share-quiz-btn"
              onClick={handleCopyShare}
              className="px-5 py-2.5 bg-[#222222] hover:bg-[#2a2a2a] text-white border border-white/15 font-bold rounded-xl flex items-center gap-2 text-xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#FF3E00]" />
              {copied ? 'Copied to Clipboard!' : 'Share Score'}
            </button>
            <button
              id="retry-quiz-btn"
              onClick={() => handleStart()}
              className="px-6 py-2.5 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black uppercase tracking-wider rounded-xl flex items-center gap-2 text-xs shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              PLAY AGAIN
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full animate-fade-in">
          {/* Quiz Top Header */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#1c1c1c] rounded-xl border border-white/10 mb-3 text-xs font-semibold">
            <div className="flex items-center gap-2 text-white">
              <Trophy className="w-4 h-4 text-[#FF3E00]" />
              <span>{activeCategory.shortTitle} Question {currentIndex + 1} of {questionsList.length}</span>
            </div>
            <div className="flex items-center gap-3">
              {streak > 1 && (
                <span className="text-amber-400 font-mono flex items-center gap-1 animate-pulse text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-current" /> {streak}x Streak
                </span>
              )}
              <div className="bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 font-mono text-[#FF3E00] flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{timer}s</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className={`bg-gradient-to-r ${activeCategory.themeGradient} h-full transition-all duration-300`}
              style={{ width: `${((currentIndex + 1) / questionsList.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5 mb-4">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQ.correct;

              let btnStyle = 'bg-[#1a1a1a] border-white/10 hover:border-white/30 text-gray-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-[#141414] border-white/5 text-gray-600 opacity-60';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(i)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Card */}
          {isAnswered && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 mb-2 text-xs text-gray-300 animate-fade-in flex flex-col gap-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                💡 Tactical Breakdown:
              </div>
              <p className="leading-relaxed text-gray-300">
                {currentQ.explanation}
              </p>
              <button
                id="next-quiz-btn"
                onClick={handleNext}
                className="mt-2 self-end px-5 py-2.5 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 text-xs shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <span>{currentIndex + 1 < questionsList.length ? 'Next Question' : 'View Final Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
