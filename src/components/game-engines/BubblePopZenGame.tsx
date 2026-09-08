import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, RefreshCw, Volume2, VolumeX, Heart, Palette, Wind, Zap } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  borderColor: string;
  glow: string;
  points: number;
  scale: number;
  opacity: number;
  symbol: string;
}

const BUBBLE_THEMES = [
  {
    name: 'Lotus Blossom',
    bg: '#0c121e',
    colors: [
      { fill: 'rgba(244, 143, 177, 0.35)', border: '#F48FB1', glow: 'rgba(244, 143, 177, 0.6)', symbol: '🌸', pts: 10 },
      { fill: 'rgba(129, 199, 132, 0.35)', border: '#81C784', glow: 'rgba(129, 199, 132, 0.6)', symbol: '🍃', pts: 15 },
      { fill: 'rgba(79, 195, 247, 0.35)', border: '#4FC3F7', glow: 'rgba(79, 195, 247, 0.6)', symbol: '💧', pts: 20 },
      { fill: 'rgba(255, 183, 77, 0.35)', border: '#FFB74D', glow: 'rgba(255, 183, 77, 0.6)', symbol: '✨', pts: 25 },
      { fill: 'rgba(179, 157, 219, 0.35)', border: '#B39DDB', glow: 'rgba(179, 157, 219, 0.6)', symbol: '🌙', pts: 30 },
    ],
  },
  {
    name: 'Sunset Koi Pond',
    bg: '#180e14',
    colors: [
      { fill: 'rgba(239, 83, 80, 0.35)', border: '#EF5350', glow: 'rgba(239, 83, 80, 0.6)', symbol: '🐟', pts: 15 },
      { fill: 'rgba(255, 213, 79, 0.35)', border: '#FFD54F', glow: 'rgba(255, 213, 79, 0.6)', symbol: '☀️', pts: 20 },
      { fill: 'rgba(77, 182, 172, 0.35)', border: '#4DB6AC', glow: 'rgba(77, 182, 172, 0.6)', symbol: '🌿', pts: 25 },
      { fill: 'rgba(171, 71, 188, 0.35)', border: '#AB47BC', glow: 'rgba(171, 71, 188, 0.6)', symbol: '🔮', pts: 35 },
    ],
  },
  {
    name: 'Aurora Borealis',
    bg: '#06131c',
    colors: [
      { fill: 'rgba(46, 204, 113, 0.35)', border: '#2ecc71', glow: 'rgba(46, 204, 113, 0.6)', symbol: '✨', pts: 15 },
      { fill: 'rgba(52, 152, 219, 0.35)', border: '#3498db', glow: 'rgba(52, 152, 219, 0.6)', symbol: '🌌', pts: 25 },
      { fill: 'rgba(155, 89, 182, 0.35)', border: '#9b59b6', glow: 'rgba(155, 89, 182, 0.6)', symbol: '🪐', pts: 30 },
    ],
  },
];

export const BubblePopZenGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number>(0);
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const bubblesRef = useRef<Bubble[]>([]);
  const ripplesRef = useRef<{ x: number; y: number; r: number; alpha: number; color: string }[]>([]);
  const floatingTextsRef = useRef<{ x: number; y: number; text: string; alpha: number; color: string }[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const currentTheme = BUBBLE_THEMES[themeIndex];

  const spawnBubble = useCallback(
    (w: number, h: number): Bubble => {
      const colorOption = currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)];
      const radius = 22 + Math.random() * 16;
      return {
        id: Math.random() + Date.now(),
        x: radius + Math.random() * (w - radius * 2),
        y: h + radius + Math.random() * 50,
        radius,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(0.6 + Math.random() * 1.1),
        color: colorOption.fill,
        borderColor: colorOption.border,
        glow: colorOption.glow,
        points: colorOption.pts,
        scale: 1,
        opacity: 0.95,
        symbol: colorOption.symbol,
      };
    },
    [currentTheme]
  );

  const initBubbles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const initialList: Bubble[] = [];
    for (let i = 0; i < 15; i++) {
      const b = spawnBubble(w, h);
      b.y = Math.random() * h;
      initialList.push(b);
    }
    bubblesRef.current = initialList;
  }, [spawnBubble]);

  // Canvas size and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = Math.max(340, Math.min(460, rect.width * 0.75)) * dpr;
      ctx.scale(dpr, dpr);
      if (bubblesRef.current.length === 0) {
        initBubbles();
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Draw tranquil background
      ctx.fillStyle = currentTheme.bg;
      ctx.fillRect(0, 0, w, h);

      // Draw gentle background ambient grid or water glow
      const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h));
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.r += 2.2;
        rip.alpha -= 0.025;
        if (rip.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color.replace(/[\d\.]+\)$/, `${rip.alpha})`);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // Floating Score Texts
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y -= 1;
        ft.alpha -= 0.02;
        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = ft.color.replace(/[\d\.]+\)$/, `${ft.alpha})`);
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      // Update & Draw Bubbles
      const currentList = bubblesRef.current;
      while (currentList.length < 15) {
        currentList.push(spawnBubble(w, h));
      }

      for (let i = currentList.length - 1; i >= 0; i--) {
        const b = currentList[i];
        b.x += b.vx;
        b.y += b.vy;

        // Gentle wobble
        b.vx += (Math.random() - 0.5) * 0.04;
        b.vx = Math.max(-1.1, Math.min(1.1, b.vx));

        // Bounce horizontally
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx = Math.abs(b.vx);
        } else if (b.x + b.radius > w) {
          b.x = w - b.radius;
          b.vx = -Math.abs(b.vx);
        }

        // Respawn if floated off top
        if (b.y + b.radius < 0) {
          currentList.splice(i, 1);
          currentList.push(spawnBubble(w, h));
          continue;
        }

        // Draw bubble
        ctx.save();
        ctx.shadowColor = b.glow;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * b.scale, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.strokeStyle = b.borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight shine on bubble
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();

        // Symbol in center
        ctx.shadowBlur = 0;
        ctx.font = `${Math.floor(b.radius * 0.85)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.symbol, b.x, b.y + 1);

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentTheme, initBubbles, spawnBubble]);

  const handlePop = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = window.devicePixelRatio || 1;
    const scaleX = (canvas.width / dpr) / rect.width;
    const scaleY = (canvas.height / dpr) / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    let hit = false;
    const bubbles = bubblesRef.current;

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const dist = Math.hypot(canvasX - b.x, canvasY - b.y);

      if (dist <= b.radius + 8) {
        hit = true;
        // Pop effect
        ripplesRef.current.push({
          x: b.x,
          y: b.y,
          r: b.radius,
          alpha: 0.9,
          color: b.borderColor,
        });

        const addedScore = b.points * (combo > 3 ? 2 : 1);
        floatingTextsRef.current.push({
          x: b.x,
          y: b.y - 10,
          text: `+${addedScore}`,
          alpha: 1,
          color: b.borderColor,
        });

        if (soundEnabled) sound.playScore();

        bubbles.splice(i, 1);
        setPoppedCount((prev) => prev + 1);
        setScore((prev) => prev + addedScore);
        const newCombo = combo + 1;
        setCombo(newCombo);

        if ((poppedCount + 1) % 20 === 0) {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        }
        break;
      }
    }

    if (!hit) {
      // Gentle water ripple on miss
      ripplesRef.current.push({
        x: canvasX,
        y: canvasY,
        r: 10,
        alpha: 0.6,
        color: 'rgba(100, 180, 255, 0.4)',
      });
      if (soundEnabled) sound.playClick();
      setCombo(0);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handlePop(e.clientX, e.clientY);
  };

  const resetGame = () => {
    if (soundEnabled) sound.playClick();
    setScore(0);
    setPoppedCount(0);
    setCombo(0);
    initBubbles();
  };

  return (
    <div id="bubble-zen-game-container" className="flex flex-col items-center p-3 sm:p-5 select-none max-w-lg mx-auto w-full">
      {/* Top Title & Stats Card */}
      <div className="w-full bg-[#181818] border border-white/10 p-3 sm:p-4 rounded-xl mb-3.5 flex items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-black font-heading text-white tracking-tight">
              Bubble Zen Garden
            </h3>
            <span className="px-2 py-0.5 bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[9px] font-black uppercase tracking-wider rounded-md">
              Flow State
            </span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium hidden sm:block mt-0.5">
            Tap or click floating blooms to trigger tranquil water ripples and harmonic chimes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-black/60 border border-white/10 px-3 py-1 text-center min-w-[65px] rounded-lg">
            <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Zen Pts</div>
            <div className="font-mono font-black text-sm text-[#FF3E00]">{score}</div>
          </div>
          <div className="bg-black/60 border border-white/10 px-3 py-1 text-center min-w-[65px] rounded-lg">
            <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Blooms</div>
            <div className="font-mono font-black text-sm text-white">{poppedCount}</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            id="bubble-theme-toggle-btn"
            onClick={() => {
              sound.playClick();
              setThemeIndex((prev) => (prev + 1) % BUBBLE_THEMES.length);
            }}
            className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-[#222222] border border-white/15 hover:border-white text-white rounded-lg flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Palette className="w-3.5 h-3.5 text-[#FF3E00]" />
            {currentTheme.name}
          </button>
          <button
            id="bubble-reset-btn"
            onClick={resetGame}
            className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-[#222222] border border-white/15 hover:border-white text-white rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        <button
          id="bubble-sound-toggle-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 bg-[#222222] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF3E00]" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        id="bubble-canvas-container"
        className="w-full rounded-2xl border-2 border-white/15 shadow-2xl relative overflow-hidden cursor-crosshair touch-none bg-black"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="w-full block h-[340px] sm:h-[400px]"
        />

        {/* In-game Floating Combo Badge */}
        {combo > 2 && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 rounded-lg shadow-lg flex items-center gap-1.5 animate-pulse">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>{combo}x Bloom Cascade!</span>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-gray-400 font-medium text-center flex items-center justify-center gap-2">
        <Wind className="w-3.5 h-3.5 text-[#FF3E00]" />
        <span>Tap anywhere to pop bubbles. Works seamlessly with touchscreen, mouse, and stylus.</span>
      </div>
    </div>
  );
};
