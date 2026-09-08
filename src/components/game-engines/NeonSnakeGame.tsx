import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Point {
  x: number;
  y: number;
}

export const NeonSnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ultraop_snake_hs') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const GRID_SIZE = 20;
  const CELL_SIZE = 20; // 400x400 canvas

  const stateRef = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ] as Point[],
    direction: { x: 1, y: 0 } as Point,
    nextDirection: { x: 1, y: 0 } as Point,
    food: { x: 15, y: 10 } as Point,
    specialFood: null as { x: number; y: number; expire: number } | null,
    score: 0,
    speed: 110,
    lastUpdate: 0,
    isOver: false
  });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const spawnFood = useCallback((snake: Point[]): Point => {
    let newFood: Point;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;
    } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y) && attempts < 100);
    return newFood;
  }, []);

  const startGame = () => {
    if (soundEnabled) sound.playClick();
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    stateRef.current = {
      snake: initialSnake,
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: spawnFood(initialSnake),
      specialFood: null,
      score: 0,
      speed: 110,
      lastUpdate: 0,
      isOver: false
    };

    setScore(0);
    setGameState('playing');
  };

  const handleDirectionChange = (dx: number, dy: number) => {
    const { direction } = stateRef.current;
    if (dx !== 0 && direction.x === -dx) return;
    if (dy !== 0 && direction.y === -dy) return;
    stateRef.current.nextDirection = { x: dx, y: dy };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          handleDirectionChange(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          handleDirectionChange(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          handleDirectionChange(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          handleDirectionChange(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch swipe directly on canvas
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 20) {
      if (absDx > absDy) {
        if (dx > 0) handleDirectionChange(1, 0);
        else handleDirectionChange(-1, 0);
      } else {
        if (dy > 0) handleDirectionChange(0, 1);
        else handleDirectionChange(0, -1);
      }
    }
    touchStartRef.current = null;
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      const state = stateRef.current;
      if (state.isOver) return;

      if (timestamp - state.lastUpdate > state.speed) {
        state.lastUpdate = timestamp;
        state.direction = { ...state.nextDirection };

        const head = { ...state.snake[0] };
        head.x += state.direction.x;
        head.y += state.direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          if (soundEnabled) sound.playGameOver();
          state.isOver = true;
          setGameState('gameover');
          return;
        }

        // Check self collision
        if (state.snake.slice(1).some((s) => s.x === head.x && s.y === head.y)) {
          if (soundEnabled) sound.playGameOver();
          state.isOver = true;
          setGameState('gameover');
          return;
        }

        state.snake.unshift(head);

        // Check food collision
        if (head.x === state.food.x && head.y === state.food.y) {
          if (soundEnabled) sound.playScore();
          state.score += 10;
          setScore(state.score);
          state.food = spawnFood(state.snake);
          state.speed = Math.max(65, 110 - Math.floor(state.score / 30) * 5);

          if (Math.random() < 0.25 && !state.specialFood) {
            state.specialFood = {
              ...spawnFood(state.snake),
              expire: Date.now() + 6000
            };
          }
        } else if (
          state.specialFood &&
          head.x === state.specialFood.x &&
          head.y === state.specialFood.y
        ) {
          if (soundEnabled) sound.playPowerup();
          state.score += 35;
          setScore(state.score);
          state.specialFood = null;
        } else {
          state.snake.pop();
        }

        if (state.specialFood && Date.now() > state.specialFood.expire) {
          state.specialFood = null;
        }

        if (state.score > highScore) {
          setHighScore(state.score);
          localStorage.setItem('ultraop_snake_hs', state.score.toString());
        }
      }

      // Render
      ctx.fillStyle = '#060a17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw Food
      ctx.save();
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(
        state.food.x * CELL_SIZE + CELL_SIZE / 2,
        state.food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2.6,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();

      // Draw Special Food
      if (state.specialFood) {
        ctx.save();
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(
          state.specialFood.x * CELL_SIZE + CELL_SIZE / 2,
          state.specialFood.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2.2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }

      // Draw Snake
      state.snake.forEach((part, index) => {
        ctx.save();
        if (index === 0) {
          // Head
          ctx.fillStyle = '#6ee7b7';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 14;
        } else {
          // Body
          ctx.fillStyle = index % 2 === 0 ? '#059669' : '#10b981';
          ctx.shadowColor = '#059669';
          ctx.shadowBlur = 6;
        }

        const radius = 4;
        const px = part.x * CELL_SIZE + 1;
        const py = part.y * CELL_SIZE + 1;
        const size = CELL_SIZE - 2;

        ctx.beginPath();
        ctx.roundRect(px, py, size, size, radius);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, soundEnabled, spawnFood]);

  return (
    <div id="neon-snake-wrapper" className="relative flex flex-col items-center bg-[#141414] rounded-2xl border border-white/15 p-3.5 sm:p-5 w-full max-w-lg mx-auto shadow-2xl overflow-hidden select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[#1c1c1c] rounded-xl border border-white/10 mb-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 text-emerald-400">
          <Trophy className="w-4 h-4" />
          <span className="text-gray-300">Score: <strong className="text-white font-mono text-base">{score}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <span>Best:</span>
            <span className="text-emerald-400 font-mono font-bold">{highScore}</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 bg-black/60 rounded border border-white/10 text-gray-400 hover:text-white"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-square max-w-[360px] sm:max-w-[380px] bg-[#060a17] rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl flex items-center justify-center touch-none"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Menu Screen */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Zap className="w-9 h-9 text-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mb-1.5 tracking-tight">
              NEON CYBER SNAKE
            </h3>
            <p className="text-gray-400 text-xs max-w-xs mb-5 leading-relaxed">
              Steer the quantum serpent to consume glowing energy orbs without touching the grid boundaries!
            </p>

            <button
              id="start-snake-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              PLAY NOW
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <h3 className="text-2xl font-black text-white mb-1 font-heading">
              GRID COLLISION!
            </h3>
            <p className="text-xs text-rose-400 font-bold mb-4 uppercase tracking-wider">Cyber Trail Broken</p>

            <div className="bg-[#181818] border border-white/10 rounded-2xl p-3.5 w-48 mb-5 space-y-1 text-center">
              <div className="text-[10px] text-gray-400 uppercase">Final Score</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{score}</div>
            </div>

            <button
              id="retry-snake-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              TRY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Touch D-Pad for Mobile & Tablets */}
      <div className="mt-3.5 w-full max-w-[240px] grid grid-cols-3 gap-2">
        <div />
        <button
          onClick={() => handleDirectionChange(0, -1)}
          className="p-2.5 bg-[#222222] border border-white/15 hover:border-white active:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Up"
        >
          <ArrowUp className="w-5 h-5 text-emerald-400" />
        </button>
        <div />

        <button
          onClick={() => handleDirectionChange(-1, 0)}
          className="p-2.5 bg-[#222222] border border-white/15 hover:border-white active:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Left"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-400" />
        </button>
        <button
          onClick={() => handleDirectionChange(0, 1)}
          className="p-2.5 bg-[#222222] border border-white/15 hover:border-white active:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Down"
        >
          <ArrowDown className="w-5 h-5 text-emerald-400" />
        </button>
        <button
          onClick={() => handleDirectionChange(1, 0)}
          className="p-2.5 bg-[#222222] border border-white/15 hover:border-white active:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Right"
        >
          <ArrowRight className="w-5 h-5 text-emerald-400" />
        </button>
      </div>

      <div className="mt-2 text-[10px] text-gray-400 font-medium text-center">
        💡 Swipe on grid • Touch D-Pad • Keyboard WASD / Arrows
      </div>
    </div>
  );
};
