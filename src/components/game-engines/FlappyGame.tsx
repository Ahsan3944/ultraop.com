import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Trophy, Zap, Rocket, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const FlappyGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ultraop_flappy_hs') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stateRef = useRef({
    bird: { y: 190, vy: 0, gravity: 0.36, jump: -6.2, radius: 13 },
    pipes: [] as { x: number; top: number; bottom: number; passed: boolean }[],
    score: 0,
    lastPipe: 0,
    isOver: false
  });

  const jump = useCallback(() => {
    if (gameState === 'menu') {
      startGame();
      return;
    }
    if (gameState === 'playing') {
      if (soundEnabled) sound.playClick();
      stateRef.current.bird.vy = stateRef.current.bird.jump;
    }
  }, [gameState, soundEnabled]);

  const startGame = () => {
    if (soundEnabled) sound.playClick();
    stateRef.current = {
      bird: { y: 190, vy: 0, gravity: 0.36, jump: -6.2, radius: 13 },
      pipes: [],
      score: 0,
      lastPipe: Date.now(),
      isOver: false
    };
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Main Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const state = stateRef.current;
      if (state.isOver) return;

      const now = Date.now();

      // Background
      ctx.fillStyle = '#090d1c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber Grid lines in background
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Physics
      const b = state.bird;
      b.vy += b.gravity;
      b.y += b.vy;

      // Pipe generator
      if (now - state.lastPipe > 1650) {
        state.lastPipe = now;
        const gap = 125;
        const topHeight = Math.floor(Math.random() * (canvas.height - gap - 90)) + 35;
        state.pipes.push({
          x: canvas.width,
          top: topHeight,
          bottom: topHeight + gap,
          passed: false
        });
      }

      // Pipe update & render
      for (let i = state.pipes.length - 1; i >= 0; i--) {
        const pipe = state.pipes[i];
        pipe.x -= 2.6;

        // Top Pipe
        ctx.save();
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 12;
        ctx.fillRect(pipe.x, 0, 48, pipe.top);

        // Pipe Lip Top
        ctx.fillStyle = '#fda4af';
        ctx.fillRect(pipe.x - 3, pipe.top - 12, 54, 12);

        // Bottom Pipe
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(pipe.x, pipe.bottom, 48, canvas.height - pipe.bottom);

        // Pipe Lip Bottom
        ctx.fillStyle = '#fda4af';
        ctx.fillRect(pipe.x - 3, pipe.bottom, 54, 12);
        ctx.restore();

        // Check Score
        if (!pipe.passed && pipe.x + 48 < 90) {
          pipe.passed = true;
          if (soundEnabled) sound.playScore();
          state.score += 1;
          setScore(state.score);
          if (state.score > highScore) {
            setHighScore(state.score);
            localStorage.setItem('ultraop_flappy_hs', state.score.toString());
          }
        }

        // Check Collision with pipe
        if (
          90 + b.radius > pipe.x &&
          90 - b.radius < pipe.x + 48 &&
          (b.y - b.radius < pipe.top || b.y + b.radius > pipe.bottom)
        ) {
          if (soundEnabled) sound.playGameOver();
          state.isOver = true;
          setGameState('gameover');
          return;
        }

        // Remove offscreen
        if (pipe.x < -60) {
          state.pipes.splice(i, 1);
        }
      }

      // Check ground/ceiling collision
      if (b.y + b.radius >= canvas.height || b.y - b.radius <= 0) {
        if (soundEnabled) sound.playGameOver();
        state.isOver = true;
        setGameState('gameover');
        return;
      }

      // Render Cyber Hovercraft / Drone
      ctx.save();
      ctx.fillStyle = '#FF3E00';
      ctx.shadowColor = '#ff6b3d';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(90, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Drone Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(90, b.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Thruster Trail
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(90 - b.radius, b.y - 3.5);
      ctx.lineTo(90 - b.radius - 12 - Math.random() * 8, b.y);
      ctx.lineTo(90 - b.radius, b.y + 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, soundEnabled]);

  return (
    <div id="flappy-cyber-wrapper" className="relative flex flex-col items-center bg-[#141414] rounded-2xl border border-white/15 p-3.5 sm:p-5 w-full max-w-lg mx-auto shadow-2xl overflow-hidden select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[#1c1c1c] rounded-xl border border-white/10 mb-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 text-rose-400">
          <Trophy className="w-4 h-4" />
          <span className="text-gray-300">Gates Cleared: <strong className="text-white font-mono text-base">{score}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <span>Record:</span>
            <span className="text-rose-400 font-mono font-bold">{highScore}</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 bg-black/60 rounded border border-white/10 text-gray-400 hover:text-white"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Playable Stage */}
      <div
        ref={containerRef}
        onPointerDown={jump}
        className="relative w-full aspect-[4/3] max-h-[380px] bg-[#090d1c] rounded-2xl overflow-hidden border-2 border-rose-500/30 shadow-2xl cursor-pointer flex items-center justify-center select-none touch-none"
      >
        <canvas
          ref={canvasRef}
          width={460}
          height={340}
          className="w-full h-full object-contain"
        />

        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/30 mb-3 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <Rocket className="w-9 h-9 text-rose-400 animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mb-1.5 tracking-tight">
              ULTRA CYBER DASH
            </h3>
            <p className="text-gray-400 text-xs max-w-xs mb-5 leading-relaxed">
              Tap or click to fire thrusters and maneuver your quantum drone through cyber security gates!
            </p>

            <button
              id="start-flappy-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              LAUNCH DRONE
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <h3 className="text-2xl font-black text-white mb-1 font-heading">
              GATE IMPACT!
            </h3>
            <p className="text-xs text-rose-400 font-bold mb-4 uppercase tracking-wider">Drone Core Compromised</p>

            <div className="bg-[#181818] border border-white/10 rounded-2xl p-3.5 w-48 mb-5 space-y-1 text-center">
              <div className="text-[10px] text-gray-400 uppercase">Gates Cleared</div>
              <div className="text-2xl font-bold font-mono text-rose-400">{score}</div>
            </div>

            <button
              id="retry-flappy-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              TRY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 text-center text-[11px] text-gray-400">
        💡 Tap anywhere, click, or press Spacebar / Up Arrow to thrust upwards.
      </div>
    </div>
  );
};
