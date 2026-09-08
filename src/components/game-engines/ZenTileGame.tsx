import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Volume2, VolumeX, Award, Heart, Trophy, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ZenTileGameProps {
  onGameOver?: (score: number) => void;
}

type Board = number[][];

const TILE_STYLES: Record<number, { bg: string; text: string; border: string; label: string }> = {
  2: { bg: 'bg-[#E3F2FD]', text: 'text-[#1565C0]', border: 'border-[#90CAF9]', label: 'Sprout' },
  4: { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', border: 'border-[#A5D6A7]', label: 'Leaf' },
  8: { bg: 'bg-[#FFF9C4]', text: 'text-[#F57F17]', border: 'border-[#FFF176]', label: 'Bloom' },
  16: { bg: 'bg-[#FFE0B2]', text: 'text-[#E65100]', border: 'border-[#FFB74D]', label: 'Solar' },
  32: { bg: 'bg-[#FFCCBC]', text: 'text-[#D84315]', border: 'border-[#FF8A65]', label: 'Flora' },
  64: { bg: 'bg-[#F8BBD0]', text: 'text-[#C2185B]', border: 'border-[#F48FB1]', label: 'Lotus' },
  128: { bg: 'bg-[#E1BEE7]', text: 'text-[#7B1FA2]', border: 'border-[#CE93D8]', label: 'Orchid' },
  256: { bg: 'bg-[#D1C4E9]', text: 'text-[#512DA8]', border: 'border-[#B39DDB]', label: 'Aura' },
  512: { bg: 'bg-[#C5CAE9]', text: 'text-[#283593]', border: 'border-[#9FA8DA]', label: 'Zenith' },
  1024: { bg: 'bg-[#B2DFDB]', text: 'text-[#00695C]', border: 'border-[#80CBC4]', label: 'Celestial' },
  2048: { bg: 'bg-[#FFE082]', text: 'text-[#FF6F00]', border: 'border-[#FFA000] ring-2 ring-[#FFA000]', label: 'Zen Master' },
};

const createEmptyBoard = (): Board => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const ZenTileGame: React.FC<ZenTileGameProps> = ({ onGameOver }) => {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [history, setHistory] = useState<{ board: Board; score: number }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('zen_tile_best') || '1280', 10);
  });
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const addRandomTile = useCallback((currentBoard: Board): Board => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length === 0) return currentBoard;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = currentBoard.map((row) => [...row]);
    newBoard[randomCell.r][randomCell.c] = Math.random() < 0.85 ? 2 : 4;
    return newBoard;
  }, []);

  const startNewGame = useCallback(() => {
    if (soundEnabled) sound.playClick();
    let initialBoard = createEmptyBoard();
    initialBoard = addRandomTile(initialBoard);
    initialBoard = addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(0);
    setHistory([]);
    setHasWon(false);
    setIsGameOver(false);
  }, [addRandomTile, soundEnabled]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const slideRow = (row: number[]): { newRow: number[]; gainedScore: number; merged: boolean } => {
    let filtered = row.filter((v) => v !== 0);
    let gainedScore = 0;
    let merged = false;
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        gainedScore += filtered[i];
        filtered[i + 1] = 0;
        merged = true;
      }
    }
    filtered = filtered.filter((v) => v !== 0);
    while (filtered.length < 4) {
      filtered.push(0);
    }
    return { newRow: filtered, gainedScore, merged };
  };

  const checkHasMoves = (currentBoard: Board): boolean => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) return true;
        if (c < 3 && currentBoard[r][c] === currentBoard[r][c + 1]) return true;
        if (r < 3 && currentBoard[r][c] === currentBoard[r + 1][c]) return true;
      }
    }
    return false;
  };

  const move = useCallback(
    (direction: 'left' | 'right' | 'up' | 'down') => {
      if (isGameOver) return;
      let moved = false;
      let totalGained = 0;
      let didMerge = false;
      const prevBoard = board.map((r) => [...r]);

      let newBoard = createEmptyBoard();

      if (direction === 'left' || direction === 'right') {
        for (let r = 0; r < 4; r++) {
          let row = [...board[r]];
          if (direction === 'right') row.reverse();
          const res = slideRow(row);
          if (direction === 'right') res.newRow.reverse();

          for (let c = 0; c < 4; c++) {
            newBoard[r][c] = res.newRow[c];
            if (newBoard[r][c] !== board[r][c]) moved = true;
          }
          totalGained += res.gainedScore;
          if (res.merged) didMerge = true;
        }
      } else {
        for (let c = 0; c < 4; c++) {
          let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
          if (direction === 'down') col.reverse();
          const res = slideRow(col);
          if (direction === 'down') res.newRow.reverse();

          for (let r = 0; r < 4; r++) {
            newBoard[r][c] = res.newRow[r];
            if (newBoard[r][c] !== board[r][c]) moved = true;
          }
          totalGained += res.gainedScore;
          if (res.merged) didMerge = true;
        }
      }

      if (moved) {
        if (soundEnabled) {
          if (didMerge) sound.playScore();
          else sound.playClick();
        }
        setHistory((prev) => [...prev.slice(-10), { board: prevBoard, score }]);
        const boardWithTile = addRandomTile(newBoard);
        setBoard(boardWithTile);
        const nextScore = score + totalGained;
        setScore(nextScore);
        if (nextScore > bestScore) {
          setBestScore(nextScore);
          localStorage.setItem('zen_tile_best', nextScore.toString());
        }

        // Check 2048 celebration
        const reached2048 = boardWithTile.some((r) => r.includes(2048));
        if (reached2048 && !hasWon) {
          setHasWon(true);
          sound.playWin();
          confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
        }

        // Check game over
        if (!checkHasMoves(boardWithTile)) {
          setIsGameOver(true);
          sound.playGameOver();
          if (onGameOver) onGameOver(nextScore);
        }
      }
    },
    [addRandomTile, bestScore, board, hasWon, isGameOver, onGameOver, score, soundEnabled]
  );

  const handleUndo = () => {
    if (history.length === 0) return;
    if (soundEnabled) sound.playClick();
    const last = history[history.length - 1];
    setBoard(last.board);
    setScore(last.score);
    setHistory((prev) => prev.slice(0, -1));
    setIsGameOver(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch Swipe handlers
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

    if (Math.max(absDx, absDy) > 25) {
      if (absDx > absDy) {
        if (dx > 0) move('right');
        else move('left');
      } else {
        if (dy > 0) move('down');
        else move('up');
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div id="zen-tile-game-container" className="flex flex-col items-center justify-center p-3 sm:p-5 select-none max-w-lg mx-auto w-full">
      {/* Top Header Card */}
      <div className="w-full bg-[#181818] border border-white/10 p-3 sm:p-4 rounded-xl mb-3.5 flex items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-black font-heading text-white tracking-tight">
              Zen Harmonic Flow
            </h3>
            <span className="px-2 py-0.5 bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[9px] font-black uppercase tracking-wider rounded-md">
              Relaxing
            </span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium hidden sm:block mt-0.5">
            Swipe or use arrow keys to merge calming harmonic color tiles.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-black/60 border border-white/10 px-3 py-1 text-center min-w-[65px] rounded-lg">
            <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Score</div>
            <div className="font-mono font-black text-sm text-[#FF3E00]">{score}</div>
          </div>
          <div className="bg-black/60 border border-white/10 px-3 py-1 text-center min-w-[65px] rounded-lg">
            <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Best</div>
            <div className="font-mono font-black text-sm text-white">{bestScore}</div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            id="zen-tile-undo-btn"
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 rounded-lg border transition-all ${
              history.length > 0
                ? 'bg-[#222222] border-white/20 hover:border-white text-white shadow-sm active:scale-95'
                : 'bg-[#181818] border-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Undo ({history.length})
          </button>
          <button
            id="zen-tile-new-game-btn"
            onClick={startNewGame}
            className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-[#222222] border border-white/20 hover:border-white text-white rounded-lg transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF3E00]" />
            New Flow
          </button>
        </div>

        <button
          id="zen-tile-sound-toggle-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 bg-[#222222] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF3E00]" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Main 4x4 Grid Board */}
      <div
        id="zen-tile-board"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-square max-w-[360px] sm:max-w-[380px] bg-[#1a1a1a] p-3 rounded-2xl border-2 border-white/15 shadow-2xl grid grid-cols-4 gap-2 sm:gap-2.5 touch-none"
      >
        {board.map((row, rIdx) =>
          row.map((val, cIdx) => {
            const style = val !== 0 ? TILE_STYLES[val] || { bg: 'bg-[#FFE082]', text: 'text-[#FF6F00]', border: 'border-[#FFA000]', label: 'Zen Master' } : null;
            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`w-full h-full aspect-square flex flex-col items-center justify-center rounded-xl font-heading transition-all duration-150 border ${
                  val === 0
                    ? 'bg-[#252525] border-white/5'
                    : `${style?.bg} ${style?.text} ${style?.border} shadow-md scale-100 animate-scale-in`
                }`}
              >
                {val !== 0 && (
                  <>
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight leading-none">
                      {val}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider opacity-85 mt-0.5">
                      {style?.label}
                    </span>
                  </>
                )}
              </div>
            );
          })
        )}

        {/* Game Over / Board Filled Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20">
            <Heart className="w-10 h-10 text-teal-400 mb-2 animate-pulse" />
            <h4 className="text-xl font-black text-white font-heading mb-1">
              Zen Meditation Complete
            </h4>
            <p className="text-xs text-gray-300 mb-4 max-w-xs leading-relaxed">
              No further moves available. Great focus! Final Score: <span className="text-[#FF3E00] font-bold font-mono">{score}</span>
            </p>
            <div className="flex gap-2">
              {history.length > 0 && (
                <button
                  onClick={handleUndo}
                  className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white text-xs font-bold rounded-lg transition-all"
                >
                  Undo Last Move
                </button>
              )}
              <button
                onClick={startNewGame}
                className="px-5 py-2 bg-[#FF3E00] hover:bg-[#ff551f] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Touch Directional Controls D-Pad */}
      <div className="mt-4 w-full max-w-[260px] grid grid-cols-3 gap-2">
        <div />
        <button
          onClick={() => move('up')}
          className="p-3 bg-[#222222] border border-white/15 hover:border-white active:bg-[#FF3E00] active:text-white text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Move Up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div />

        <button
          onClick={() => move('left')}
          className="p-3 bg-[#222222] border border-white/15 hover:border-white active:bg-[#FF3E00] active:text-white text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Move Left"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => move('down')}
          className="p-3 bg-[#222222] border border-white/15 hover:border-white active:bg-[#FF3E00] active:text-white text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Move Down"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
        <button
          onClick={() => move('right')}
          className="p-3 bg-[#222222] border border-white/15 hover:border-white active:bg-[#FF3E00] active:text-white text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          aria-label="Move Right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-2.5 text-[10px] text-gray-400 font-medium text-center">
        💡 Mobile Swipe • Tablet D-Pad • Keyboard WASD / Arrow Keys
      </div>
    </div>
  );
};
