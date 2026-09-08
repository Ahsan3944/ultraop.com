import React, { useState } from 'react';
import { Game } from '../types';
import { GAMES_DATA } from '../data/gamingData';
import { Play, Sparkles, Trophy, Star, X, Maximize2, Minimize2, Gamepad2, Flame, Heart, Smartphone, Monitor, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SpaceShooterGame } from './game-engines/SpaceShooterGame';
import { AimTrainerGame } from './game-engines/AimTrainerGame';
import { NeonSnakeGame } from './game-engines/NeonSnakeGame';
import { FlappyGame } from './game-engines/FlappyGame';
import { TriviaQuizGame } from './game-engines/TriviaQuizGame';
import { ZenTileGame } from './game-engines/ZenTileGame';
import { BubblePopZenGame } from './game-engines/BubblePopZenGame';
import { sound } from '../utils/audio';

export const GamesHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = ['All', 'Relaxing', 'Action', 'Reflex', 'Arcade', 'Casual', 'Quiz'];

  const filteredGames = activeCategory === 'All'
    ? GAMES_DATA
    : GAMES_DATA.filter((g) => g.category === activeCategory);

  const handleLaunchGame = (game: Game) => {
    sound.playClick();
    setActiveGame(game);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveGame(null);
    setIsFullscreen(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGame) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame]);

  const renderGameEngine = (gameId: string) => {
    switch (gameId) {
      case 'zen-tile-calm':
        return <ZenTileGame />;
      case 'bubble-zen-garden':
        return <BubblePopZenGame />;
      case 'cyber-strike':
        return <SpaceShooterGame />;
      case 'aim-trainer':
        return <AimTrainerGame />;
      case 'neon-snake':
        return <NeonSnakeGame />;
      case 'cyber-dash':
        return <FlappyGame />;
      case 'esports-quiz':
        return <TriviaQuizGame />;
      default:
        return <ZenTileGame />;
    }
  };

  return (
    <section id="gaming" className="py-24 relative overflow-hidden bg-[#F4F4F1] border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        ARCADE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-12"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>01 / Playable Web Arcade & Zen Hub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            ARCADE <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              creations & zen flow.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Zero installation required. 7 instant playable browser games crafted for high-performance mobile, tablet, and desktop gaming across all browsers. From relaxing Zen meditation merges to competitive reflex aim calibration.
          </p>

          {/* Compatibility Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mt-4 text-[10px] font-black uppercase tracking-wider text-[#666]">
            <span className="flex items-center gap-1.5 bg-white border border-black/10 px-2.5 py-1">
              <Smartphone className="w-3.5 h-3.5 text-[#FF3E00]" /> Mobile & Tablet Touch Ready
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-black/10 px-2.5 py-1">
              <Monitor className="w-3.5 h-3.5 text-[#121212]" /> Desktop Keyboard & Mouse
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-black/10 px-2.5 py-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Universal Zero-Lag Engine
            </span>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`game-filter-${cat.toLowerCase()}`}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#121212] text-white shadow-sm'
                    : 'bg-white text-[#121212] border border-black/15 hover:border-black'
                }`}
              >
                {cat === 'Relaxing' ? '🌿 ' + cat : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-white border border-black/12 hover:border-black transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#121212]">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                {game.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {game.badge}
                  </span>
                )}

                {/* Difficulty */}
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 text-white text-[9px] font-black uppercase tracking-wider border border-white/20">
                  {game.difficulty}
                </span>

                {/* Play CTA Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <button
                    id={`launch-game-overlay-${game.id}`}
                    onClick={() => handleLaunchGame(game)}
                    className="px-6 py-3 bg-[#FF3E00] hover:bg-black text-white font-black text-[11px] uppercase tracking-[0.25em] flex items-center gap-2 shadow-xl transform scale-95 group-hover:scale-100 transition-all duration-200 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Launch
                  </button>
                </div>
              </div>

              {/* Game Meta Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                  <span className="text-[#FF3E00] text-[10px] font-black uppercase tracking-widest">{game.category}</span>
                  <div className="flex items-center gap-1 text-[#121212]">
                    <Star className="w-3.5 h-3.5 fill-[#FF3E00] text-[#FF3E00]" />
                    <span className="font-bold text-xs">{game.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#121212] group-hover:text-[#FF3E00] transition-colors mb-2 font-heading tracking-tight">
                  {game.title}
                </h3>
                <p className="text-[#666666] text-xs leading-relaxed mb-6 flex-grow font-medium line-clamp-2">
                  {game.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/10 text-xs">
                  <span className="text-[#666666] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Flame className="w-3.5 h-3.5 text-[#FF3E00]" />
                    {(game.plays / 1000).toFixed(1)}k Plays
                  </span>
                  <button
                    id={`launch-game-btn-${game.id}`}
                    onClick={() => handleLaunchGame(game)}
                    className="text-[#121212] font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#FF3E00] flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                  >
                    Play <Play className="w-3 h-3 fill-current group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Arcade Play Modal */}
      {activeGame && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-modal-title"
        >
          <div
            className={`relative w-full bg-[#121212] border border-white/15 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              isFullscreen
                ? 'fixed inset-0 border-none max-w-none h-full'
                : 'max-w-4xl max-h-[94vh] rounded-2xl'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#181818] border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF3E00] text-white rounded-lg">
                  <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="game-modal-title" className="text-sm sm:text-base font-black text-white font-heading tracking-tight">
                    {activeGame.title}
                  </h3>
                  <span className="text-[10px] text-[#FF3E00] font-black uppercase tracking-widest">UltraOP Web Arcade Console</span>
                </div>
              </div>

              {/* Quick Game Switcher dropdown / buttons on desktop */}
              <div className="hidden md:flex items-center gap-1 bg-[#121212] p-1 rounded-xl border border-white/10">
                {GAMES_DATA.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveGame(g);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                      activeGame.id === g.id
                        ? 'bg-[#FF3E00] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {g.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="toggle-fullscreen-game-btn"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  id="close-game-modal-btn"
                  onClick={handleCloseModal}
                  className="p-2 text-gray-300 hover:text-[#FF3E00] bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                  title="Close Game Modal"
                  aria-label="Close Game Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body - Game Engine Area */}
            <div className="p-3 sm:p-5 overflow-y-auto flex flex-col items-center justify-center flex-grow bg-[#0c0c0c]">
              {renderGameEngine(activeGame.id)}

              {/* Instructions Bar */}
              <div className="w-full max-w-2xl mt-3 bg-[#181818] p-3.5 sm:p-4 rounded-xl border border-white/10 text-xs text-gray-400">
                <div className="font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2 text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF3E00]" /> Controls & Objective:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside">
                  {activeGame.instructions.map((inst, i) => (
                    <li key={i} className="text-gray-300 text-xs">{inst}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
