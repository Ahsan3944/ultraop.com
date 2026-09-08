import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Target, Trophy, RotateCcw, Zap, Sparkles, Crosshair, Award, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface TargetItem {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'normal' | 'gold' | 'hazard';
  createdAt: number;
}

export const AimTrainerGame: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ultraop_aim_hs') || '0', 10);
  });

  const nextId = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const isPlayingRef = useRef(false);

  const spawnTarget = useCallback(() => {
    if (!isPlayingRef.current || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const width = rect.width || 480;
    const height = rect.height || 360;

    const size = Math.floor(Math.random() * 16) + 42; // 42-58px
    const padding = 15;
    const maxX = Math.max(padding, width - size - padding);
    const maxY = Math.max(padding, height - size - padding);
    const x = Math.floor(Math.random() * (maxX - padding)) + padding;
    const y = Math.floor(Math.random() * (maxY - padding)) + padding;

    const rand = Math.random();
    const type: 'normal' | 'gold' | 'hazard' = rand < 0.18 ? 'gold' : rand < 0.28 ? 'hazard' : 'normal';

    const newTarget: TargetItem = {
      id: ++nextId.current,
      x,
      y,
      size,
      type,
      createdAt: Date.now()
    };

    setTargets((prev) => {
      // Keep max 4 targets at once
      const trimmed = prev.length >= 4 ? prev.slice(1) : prev;
      return [...trimmed, newTarget];
    });
  }, []);

  const startGame = () => {
    sound.playClick();
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setHits(0);
    setMisses(0);
    setReactionTimes([]);
    setTimeLeft(30);
    setTargets([]);
    isPlayingRef.current = true;
    setGameState('playing');
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isPlayingRef.current = false;
          setGameState('gameover');
          sound.playWin();
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Target spawner interval
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Spawn 2 initial targets
    spawnTarget();
    spawnTarget();

    const spawner = setInterval(() => {
      spawnTarget();
    }, 700);

    return () => clearInterval(spawner);
  }, [gameState, spawnTarget]);

  // Target Pointer/Click Handler
  const handleTargetPointer = (e: React.PointerEvent, target: TargetItem) => {
    e.stopPropagation();
    if (gameState !== 'playing') return;

    const rt = Date.now() - target.createdAt;
    setReactionTimes((prev) => [...prev, rt]);

    if (target.type === 'hazard') {
      sound.playHit();
      setScore((prev) => Math.max(0, prev - 30));
      setCombo(0);
      setTargets((prev) => prev.filter((t) => t.id !== target.id));
      return;
    }

    sound.playScore();
    setHits((prev) => prev + 1);
    const newCombo = combo + 1;
    setCombo(newCombo);
    if (newCombo > maxCombo) setMaxCombo(newCombo);

    const basePoints = target.type === 'gold' ? 50 : 20;
    const speedBonus = rt < 380 ? 20 : rt < 550 ? 10 : 0;
    const comboBonus = Math.min(newCombo * 4, 40);
    const gained = basePoints + speedBonus + comboBonus;

    setScore((prev) => {
      const updated = prev + gained;
      if (updated > highScore) {
        setHighScore(updated);
        localStorage.setItem('ultraop_aim_hs', updated.toString());
      }
      return updated;
    });

    setTargets((prev) => prev.filter((t) => t.id !== target.id));
    spawnTarget();
  };

  // Background miss handler
  const handleAreaPointer = () => {
    if (gameState !== 'playing') return;
    sound.playClick();
    setMisses((prev) => prev + 1);
    setCombo(0);
  };

  const totalShots = hits + misses;
  const accuracy = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 100;
  const avgReactionTime = reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0;

  const getRank = () => {
    if (score >= 900) return { title: '👑 ULTRA OP GOD TIER', color: 'text-amber-400', desc: 'World Class Esports Reflexes' };
    if (score >= 600) return { title: '⚡ GRANDMASTER AIM', color: 'text-purple-400', desc: 'Tournament Level Precision' };
    if (score >= 350) return { title: '🎯 DIAMOND PRO', color: 'text-cyan-400', desc: 'Solid Flick Accuracy' };
    return { title: '🛡️ ROOKIE SHOOTER', color: 'text-gray-300', desc: 'Keep practicing your drags & flicks' };
  };

  return (
    <div id="aim-trainer-wrapper" className="relative flex flex-col items-center bg-[#141414] rounded-2xl border border-white/15 p-3.5 sm:p-5 w-full max-w-2xl mx-auto shadow-2xl overflow-hidden select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[#1c1c1c] rounded-xl border border-white/10 mb-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Crosshair className="w-4 h-4" />
            <span className="text-gray-300">Score: <strong className="text-[#FF3E00] font-mono text-base">{score}</strong></span>
          </div>
          {combo > 1 && (
            <span className="text-amber-400 font-mono animate-pulse flex items-center gap-1 text-xs">
              <Zap className="w-3.5 h-3.5 fill-current" /> {combo}x Streak
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <span>Acc:</span>
            <span className="text-emerald-400 font-mono font-bold">{accuracy}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className={`font-mono font-bold text-xs ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Main Clickable / Touch Area */}
      <div
        ref={gameAreaRef}
        onPointerDown={handleAreaPointer}
        className="relative w-full aspect-[4/3] max-h-[380px] sm:max-h-[420px] bg-[#070b19] rounded-xl overflow-hidden border border-cyan-500/30 shadow-inner cursor-crosshair select-none flex items-center justify-center touch-none"
      >
        {/* Render interactive targets */}
        {gameState === 'playing' &&
          targets.map((target) => (
            <div
              key={target.id}
              onPointerDown={(e) => handleTargetPointer(e, target)}
              style={{
                left: `${target.x}px`,
                top: `${target.y}px`,
                width: `${target.size}px`,
                height: `${target.size}px`
              }}
              className={`absolute rounded-full flex items-center justify-center transition-transform active:scale-90 animate-scale-in cursor-pointer z-10 select-none ${
                target.type === 'gold'
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-white shadow-[0_0_15px_rgba(245,158,11,0.8)] ring-2 ring-amber-400/50'
                  : target.type === 'hazard'
                  ? 'bg-gradient-to-tr from-rose-600 to-red-500 border-2 border-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.8)] ring-2 ring-rose-500/50'
                  : 'bg-gradient-to-tr from-cyan-500 to-blue-600 border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.8)] ring-2 ring-cyan-400/40'
              }`}
            >
              {target.type === 'gold' ? (
                <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
              ) : target.type === 'hazard' ? (
                <span className="text-white text-xs font-black">X</span>
              ) : (
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              )}
            </div>
          ))}

        {/* Menu Overlay */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Crosshair className="w-9 h-9 text-cyan-400 animate-pulse" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mb-1.5 tracking-tight">
              REFLEX AIM PRO: ESPORTS
            </h3>
            <p className="text-gray-400 text-xs max-w-md mb-4 leading-relaxed">
              Calibrate your mouse & touch reaction speed. Tap cyan & golden targets before they disappear!
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 bg-[#141414] p-3 rounded-xl border border-white/10 mb-5 text-left max-w-xs">
              <div>🎯 <strong>Blue:</strong> Target (+20)</div>
              <div>✨ <strong>Gold:</strong> 3X Target (+50)</div>
              <div>⚠️ <strong>Red:</strong> Hazard (-30)</div>
              <div>⚡ <strong>Speed:</strong> Sub-400ms bonus</div>
            </div>

            <button
              id="start-aim-trainer-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              START 30s DRILL
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
            <Award className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
            <h3 className="text-2xl font-black text-white mb-1 font-heading">
              DRILL COMPLETED
            </h3>
            <div className={`text-sm font-extrabold mb-4 ${getRank().color}`}>
              {getRank().title}
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#181818] border border-white/10 rounded-2xl p-3.5 w-full max-w-sm mb-5 text-center">
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Score</div>
                <div className="text-base sm:text-lg font-bold font-mono text-[#FF3E00]">{score}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Accuracy</div>
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">{accuracy}%</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">Avg Reflex</div>
                <div className="text-base sm:text-lg font-bold font-mono text-amber-400">{avgReactionTime}ms</div>
              </div>
            </div>

            <button
              id="retry-aim-trainer-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              RETRY CHALLENGE
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 text-center text-[11px] text-gray-400">
        💡 Fast consecutive hits build up streak multiplier points! Supports both touchscreen and mouse.
      </div>
    </div>
  );
};
