import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Shield, Zap, Trophy, Flame, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Crosshair } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface SpaceShooterProps {
  onScoreUpdate?: (score: number) => void;
}

export const SpaceShooterGame: React.FC<SpaceShooterProps> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ultraop_spaceshooter_hs') || '0', 10);
  });
  const [health, setHealth] = useState(100);
  const [powerupTime, setPowerupTime] = useState(0);
  const [soundMuted, setSoundMuted] = useState(false);

  const stateRef = useRef({
    player: { x: 260, y: 360, width: 36, height: 36, speed: 6, shield: false },
    bullets: [] as { x: number; y: number; vx: number; vy: number; color: string }[],
    enemies: [] as { x: number; y: number; width: number; height: number; speed: number; hp: number; maxHp: number; type: string }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[],
    powerups: [] as { x: number; y: number; type: 'triple' | 'shield'; speed: number }[],
    keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, KeyA: false, KeyD: false, KeyW: false, KeyS: false, Space: false },
    lastShot: 0,
    lastEnemySpawn: 0,
    lastPowerupSpawn: 0,
    score: 0,
    health: 100,
    tripleGunTime: 0,
    isOver: false
  });

  const startGame = () => {
    if (!soundMuted) sound.playClick();
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 560;
    const height = canvas ? canvas.height : 400;

    stateRef.current = {
      player: { x: width / 2 - 18, y: height - 70, width: 36, height: 36, speed: 6, shield: false },
      bullets: [],
      enemies: [],
      particles: [],
      powerups: [],
      keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, KeyA: false, KeyD: false, KeyW: false, KeyS: false, Space: false },
      lastShot: 0,
      lastEnemySpawn: Date.now(),
      lastPowerupSpawn: Date.now() + 4000,
      score: 0,
      health: 100,
      tripleGunTime: 0,
      isOver: false
    };

    setScore(0);
    setHealth(100);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = stateRef.current.keys;
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = true;
        if (e.code === 'Space') e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keys = stateRef.current.keys;
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
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
      ctx.fillStyle = '#060813';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 30; i++) {
        const sx = (Math.sin(now * 0.0005 + i * 47) * 0.5 + 0.5) * canvas.width;
        const sy = (now * 0.05 * ((i % 3) + 1) + i * 31) % canvas.height;
        ctx.fillRect(sx, sy, (i % 2) + 1, (i % 2) + 1);
      }

      // Player controls
      const p = state.player;
      if (state.keys.ArrowLeft || state.keys.KeyA) p.x -= p.speed;
      if (state.keys.ArrowRight || state.keys.KeyD) p.x += p.speed;
      if (state.keys.ArrowUp || state.keys.KeyW) p.y -= p.speed;
      if (state.keys.ArrowDown || state.keys.KeyS) p.y += p.speed;

      p.x = Math.max(10, Math.min(canvas.width - p.width - 10, p.x));
      p.y = Math.max(40, Math.min(canvas.height - p.height - 10, p.y));

      // Auto-shoot or manual space/touch shoot
      const isShooting = state.keys.Space || gameState === 'playing';
      if (isShooting && now - state.lastShot > 140) {
        if (!soundMuted) sound.playShoot();
        state.lastShot = now;
        if (now < state.tripleGunTime) {
          state.bullets.push(
            { x: p.x + p.width / 2 - 2, y: p.y, vx: 0, vy: -10, color: '#FF3E00' },
            { x: p.x + 4, y: p.y + 6, vx: -2, vy: -9, color: '#f59e0b' },
            { x: p.x + p.width - 8, y: p.y + 6, vx: 2, vy: -9, color: '#f59e0b' }
          );
        } else {
          state.bullets.push({ x: p.x + p.width / 2 - 2, y: p.y, vx: 0, vy: -10, color: '#38bdf8' });
        }
      }

      // Enemy spawn
      const spawnInterval = Math.max(400, 1200 - Math.floor(state.score / 50) * 80);
      if (now - state.lastEnemySpawn > spawnInterval) {
        state.lastEnemySpawn = now;
        const isBoss = state.score > 150 && Math.random() < 0.25;
        state.enemies.push({
          x: Math.random() * (canvas.width - 50) + 20,
          y: -40,
          width: isBoss ? 50 : 28,
          height: isBoss ? 46 : 28,
          speed: isBoss ? 1.5 : 2.5 + Math.random() * 2,
          hp: isBoss ? 5 : 1,
          maxHp: isBoss ? 5 : 1,
          type: isBoss ? 'boss' : 'drone'
        });
      }

      // Powerup spawn
      if (now - state.lastPowerupSpawn > 8500) {
        state.lastPowerupSpawn = now;
        state.powerups.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          type: Math.random() > 0.5 ? 'triple' : 'shield',
          speed: 2
        });
      }

      // Update bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(b.x, b.y, 4, 12);
        ctx.shadowBlur = 0;

        if (b.y < -20 || b.x < 0 || b.x > canvas.width) {
          state.bullets.splice(i, 1);
        }
      }

      // Update Powerups
      for (let i = state.powerups.length - 1; i >= 0; i--) {
        const pow = state.powerups[i];
        pow.y += pow.speed;

        ctx.save();
        ctx.fillStyle = pow.type === 'triple' ? '#FF3E00' : '#06b6d4';
        ctx.shadowColor = pow.type === 'triple' ? '#ff6b3d' : '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pow.x, pow.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pow.type === 'triple' ? '3X' : 'SH', pow.x, pow.y + 3);
        ctx.restore();

        if (
          pow.x > p.x &&
          pow.x < p.x + p.width &&
          pow.y > p.y &&
          pow.y < p.y + p.height
        ) {
          if (!soundMuted) sound.playPowerup();
          if (pow.type === 'triple') {
            state.tripleGunTime = now + 7000;
            setPowerupTime(7);
          } else {
            p.shield = true;
            state.health = Math.min(100, state.health + 30);
            setHealth(state.health);
          }
          state.powerups.splice(i, 1);
        } else if (pow.y > canvas.height + 20) {
          state.powerups.splice(i, 1);
        }
      }

      // Update Enemies
      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        e.y += e.speed;

        ctx.save();
        if (e.type === 'boss') {
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#f87171';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(e.x + e.width / 2, e.y + e.height);
          ctx.lineTo(e.x + e.width, e.y);
          ctx.lineTo(e.x + e.width / 2, e.y + 10);
          ctx.lineTo(e.x, e.y);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#334155';
          ctx.fillRect(e.x, e.y - 8, e.width, 4);
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(e.x, e.y - 8, (e.width * (e.hp / e.maxHp)), 4);
        } else {
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(e.x + e.width / 2, e.y + e.height);
          ctx.lineTo(e.x + e.width, e.y);
          ctx.lineTo(e.x, e.y);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Bullet collision
        for (let j = state.bullets.length - 1; j >= 0; j--) {
          const b = state.bullets[j];
          if (
            b.x >= e.x &&
            b.x <= e.x + e.width &&
            b.y >= e.y &&
            b.y <= e.y + e.height
          ) {
            if (!soundMuted) sound.playHit();
            state.bullets.splice(j, 1);
            e.hp--;

            for (let k = 0; k < 4; k++) {
              state.particles.push({
                x: b.x,
                y: b.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                color: '#facc15',
                size: 2
              });
            }

            if (e.hp <= 0) {
              if (!soundMuted) sound.playScore();
              const points = e.type === 'boss' ? 50 : 15;
              state.score += points;
              setScore(state.score);
              if (onScoreUpdate) onScoreUpdate(state.score);

              for (let k = 0; k < 16; k++) {
                state.particles.push({
                  x: e.x + e.width / 2,
                  y: e.y + e.height / 2,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  life: 1.2,
                  color: e.type === 'boss' ? '#ef4444' : '#fbbf24',
                  size: Math.random() * 4 + 2
                });
              }

              state.enemies.splice(i, 1);
              break;
            }
          }
        }

        // Collision with player
        if (
          e.x < p.x + p.width &&
          e.x + e.width > p.x &&
          e.y < p.y + p.height &&
          e.y + e.height > p.y
        ) {
          if (!soundMuted) sound.playGameOver();
          if (p.shield) {
            p.shield = false;
          } else {
            state.health -= e.type === 'boss' ? 35 : 20;
            setHealth(Math.max(0, state.health));
          }
          state.enemies.splice(i, 1);

          if (state.health <= 0) {
            state.isOver = true;
            setGameState('gameover');
            if (state.score > highScore) {
              setHighScore(state.score);
              localStorage.setItem('ultraop_spaceshooter_hs', state.score.toString());
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            }
            return;
          }
        } else if (e.y > canvas.height + 40) {
          state.enemies.splice(i, 1);
        }
      }

      // Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const prt = state.particles[i];
        prt.x += prt.vx;
        prt.y += prt.vy;
        prt.life -= 0.03;

        if (prt.life <= 0) {
          state.particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = prt.life;
          ctx.fillStyle = prt.color;
          ctx.fillRect(prt.x, prt.y, prt.size, prt.size);
          ctx.restore();
        }
      }

      // Draw Player Ship
      ctx.save();
      ctx.shadowColor = '#FF3E00';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#FF3E00';
      ctx.beginPath();
      ctx.moveTo(p.x + p.width / 2, p.y);
      ctx.lineTo(p.x + p.width, p.y + p.height);
      ctx.lineTo(p.x + p.width / 2, p.y + p.height - 8);
      ctx.lineTo(p.x, p.y + p.height);
      ctx.closePath();
      ctx.fill();

      // Cockpit Glow
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(p.x + p.width / 2, p.y + 14, 5, 0, Math.PI * 2);
      ctx.fill();

      // Shield Aura
      if (p.shield) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Engine Thruster Flame
      ctx.fillStyle = Math.random() > 0.5 ? '#f97316' : '#eab308';
      ctx.beginPath();
      ctx.moveTo(p.x + p.width / 2 - 6, p.y + p.height - 6);
      ctx.lineTo(p.x + p.width / 2 + 6, p.y + p.height - 6);
      ctx.lineTo(p.x + p.width / 2, p.y + p.height + 12 + Math.random() * 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, onScoreUpdate, soundMuted]);

  // Touch Drag on Canvas
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const clientX = touch.clientX - rect.left;
    const clientY = touch.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    stateRef.current.player.x = clientX * scaleX - stateRef.current.player.width / 2;
    stateRef.current.player.y = clientY * scaleY - stateRef.current.player.height / 2;
    stateRef.current.keys.Space = true;
  };

  const handleTouchEnd = () => {
    stateRef.current.keys.Space = false;
  };

  return (
    <div id="space-shooter-wrapper" className="relative flex flex-col items-center bg-[#141414] rounded-2xl border border-white/15 p-3.5 sm:p-5 w-full max-w-2xl mx-auto shadow-2xl overflow-hidden select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[#1c1c1c] rounded-xl border border-white/10 mb-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span className="text-gray-300">Score: <strong className="text-[#FF3E00] font-mono text-base">{score}</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-gray-400 text-xs">
            <span>High:</span>
            <span className="text-amber-400 font-mono font-bold">{highScore}</span>
          </div>
        </div>

        {/* Health bar */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">Shield:</span>
          <div className="w-24 md:w-32 bg-[#222] h-2.5 rounded-full overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-300 ${
                health > 50 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : health > 25 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
              }`}
              style={{ width: `${health}%` }}
            />
          </div>
        </div>

        {/* Sound Toggle */}
        <button
          id="toggle-game-sound-btn"
          onClick={() => {
            const next = !soundMuted;
            setSoundMuted(next);
            sound.toggleSound(!next);
          }}
          className="p-1.5 rounded-lg bg-[#222] border border-white/10 text-gray-400 hover:text-white transition-colors"
          title="Toggle Sound Effects"
        >
          {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#FF3E00]" />}
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full aspect-[4/3] max-h-[440px] bg-[#060813] rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl flex items-center justify-center touch-none">
        <canvas
          ref={canvasRef}
          width={560}
          height={400}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full object-contain cursor-crosshair touch-none"
        />

        {/* Start / Menu Overlay */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <div className="p-3 bg-[#FF3E00]/20 rounded-2xl border border-[#FF3E00]/30 mb-3 shadow-[0_0_20px_rgba(255,62,0,0.3)]">
              <Flame className="w-9 h-9 text-[#FF3E00] animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mb-1.5 tracking-tight">
              CYBER STRIKE: GALAXY OPS
            </h3>
            <p className="text-gray-400 text-xs max-w-md mb-4 leading-relaxed">
              Steer the UltraOP Starship, blast incoming cyber drones & flagship bosses, and collect quantum power-ups!
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 bg-[#181818] p-3 rounded-xl border border-white/10 mb-5 text-left max-w-xs">
              <div>🎯 <strong>Move:</strong> WASD / Touch Drag</div>
              <div>⚡ <strong>Shoot:</strong> Space / Auto</div>
              <div>🛡️ <strong>Shields:</strong> Blue Power Core</div>
              <div>💥 <strong>3X Laser:</strong> Red Power Core</div>
            </div>

            <button
              id="start-space-shooter-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              START MISSION
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
            <div className="text-rose-500 font-black text-xs uppercase tracking-widest mb-1">
              Mission Report
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 font-heading">
              MISSION TERMINATED
            </h3>

            <div className="bg-[#181818] border border-white/10 rounded-2xl p-4 w-full max-w-xs mb-5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Final Score:</span>
                <span className="text-lg font-bold font-mono text-[#FF3E00]">{score}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">All-Time Best:</span>
                <span className="text-base font-bold font-mono text-amber-400">{highScore}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-white/10">
                <span className="text-gray-400">Rank:</span>
                <span className="text-emerald-400 font-bold">
                  {score > 300 ? '⚡ Ultra OP Commander' : score > 150 ? '👑 Cyber Ace' : '🛡️ Rookie Pilot'}
                </span>
              </div>
            </div>

            <button
              id="retry-space-shooter-btn"
              onClick={startGame}
              className="px-7 py-3 bg-[#FF3E00] hover:bg-[#ff551f] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              DEPLOY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Mobile touch controls */}
      <div className="mt-3.5 w-full flex items-center justify-between gap-2 max-w-md">
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <span>⌨️ Arrow Keys / WASD</span>
          <span>•</span>
          <span>📱 Touch Drag</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onPointerDown={() => { stateRef.current.keys.ArrowLeft = true; }}
            onPointerUp={() => { stateRef.current.keys.ArrowLeft = false; }}
            className="p-2.5 bg-[#222] border border-white/10 hover:border-white text-white rounded-lg active:bg-[#FF3E00]"
            aria-label="Move Left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onPointerDown={() => { stateRef.current.keys.ArrowRight = true; }}
            onPointerUp={() => { stateRef.current.keys.ArrowRight = false; }}
            className="p-2.5 bg-[#222] border border-white/10 hover:border-white text-white rounded-lg active:bg-[#FF3E00]"
            aria-label="Move Right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
