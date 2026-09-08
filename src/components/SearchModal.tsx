import React, { useState, useEffect } from 'react';
import { Search, X, Gamepad2, Youtube, BookOpen, Video, ArrowRight, ShieldCheck, Moon, Sun, Sparkles } from 'lucide-react';
import { GAMES_DATA, CHANNELS_DATA, VIDEOS_DATA, BLOGS_DATA } from '../data/gamingData';
import { BRAND_CAMPAIGNS_DATA } from '../data/brandCampaigns';
import { sound } from '../utils/audio';
import { useTheme } from '../utils/theme';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme, isMidnight } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const isThemeQuery = 'theme dark light midnight mode artistic color'.split(' ').some((word) => q.includes(word));

  const matchingGames = GAMES_DATA.filter((g) =>
    g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
  );

  const matchingVideos = VIDEOS_DATA.filter((v) =>
    v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q)
  );

  const matchingBlogs = BLOGS_DATA.filter((b) =>
    b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
  );

  const matchingChannels = CHANNELS_DATA.filter((c) =>
    c.name.toLowerCase().includes(q) || c.platform.toLowerCase().includes(q)
  );

  const matchingBrands = BRAND_CAMPAIGNS_DATA.filter((b) =>
    b.visible && (b.name.toLowerCase().includes(q) || b.campaignType.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search UltraOP Content"
    >
      <div className="relative w-full max-w-2xl bg-[#F4F4F1] border-2 border-black shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 bg-white border-b border-black/15">
          <Search className="w-5 h-5 text-[#FF3E00] mr-3" aria-hidden="true" />
          <input
            id="global-search-input"
            type="text"
            autoFocus
            aria-label="Search playable games, videos, collaborations, and channels"
            placeholder="Search playable games, videos, collaborations, channels..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm text-[#121212] placeholder-[#888888] focus:outline-none w-full font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search input"
              className="p-1 text-[#888888] hover:text-black mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search dialog"
            className="px-2.5 py-1 bg-[#121212] text-white hover:bg-[#FF3E00] text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Theme Quick Command */}
          {isThemeQuery && (
            <div className="p-3 bg-[#FF3E00]/10 border border-[#FF3E00]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF3E00] text-white">
                  {isMidnight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-black text-[#121212] uppercase tracking-wider font-heading">
                    Switch to {isMidnight ? 'Editorial Light' : 'Midnight Artistic'} Mode
                  </div>
                  <div className="text-[10px] text-[#777777]">
                    Current active theme: <span className="font-bold text-[#FF3E00]">{isMidnight ? 'Midnight Artistic (#0D0D0E)' : 'Editorial Light (#F4F4F1)'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="px-3 py-1.5 bg-[#121212] text-white hover:bg-[#FF3E00] text-[10px] font-black uppercase tracking-wider transition-colors"
              >
                Switch Now
              </button>
            </div>
          )}

          {/* Games section */}
          {matchingGames.length > 0 && (
            <div>
              <div className="text-[10px] font-black text-[#FF3E00] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 font-heading">
                <Gamepad2 className="w-3.5 h-3.5" /> Playable Arcade
              </div>
              <div className="space-y-1.5">
                {matchingGames.map((game) => (
                  <a
                    key={game.id}
                    href="#gaming"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/10 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={game.thumbnail} alt={game.title} className="w-10 h-7 object-cover border border-black/10" />
                      <div>
                        <div className="text-xs font-black group-hover:text-white text-[#121212] font-heading">{game.title}</div>
                        <div className="text-[10px] text-[#777777] group-hover:text-[#AAAAAA]">{game.category} • {game.difficulty}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#FF3E00] group-hover:text-white font-black uppercase tracking-wider flex items-center gap-1">
                      Play <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {matchingVideos.length > 0 && (
            <div>
              <div className="text-[10px] font-black text-[#121212] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 font-heading">
                <Video className="w-3.5 h-3.5 text-[#FF3E00]" /> Broadcasts & Highlights
              </div>
              <div className="space-y-1.5">
                {matchingVideos.map((vid) => (
                  <a
                    key={vid.id}
                    href="#videos"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/10 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={vid.thumbnail} alt={vid.title} className="w-10 h-7 object-cover shrink-0 border border-black/10" />
                      <div className="truncate">
                        <div className="text-xs font-black group-hover:text-white text-[#121212] truncate font-heading">{vid.title}</div>
                        <div className="text-[10px] text-[#777777] group-hover:text-[#AAAAAA]">{vid.channel} • {vid.views}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#777777] group-hover:text-[#CCCCCC] font-mono font-bold shrink-0 ml-2">
                      {vid.duration}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Guides */}
          {matchingBlogs.length > 0 && (
            <div>
              <div className="text-[10px] font-black text-[#121212] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 font-heading">
                <BookOpen className="w-3.5 h-3.5 text-[#FF3E00]" /> Esports Journals
              </div>
              <div className="space-y-1.5">
                {matchingBlogs.map((b) => (
                  <a
                    key={b.id}
                    href="#blogs"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/10 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-black group-hover:text-white text-[#121212] font-heading">{b.title}</div>
                      <div className="text-[10px] text-[#777777] group-hover:text-[#AAAAAA]">{b.category} • {b.readTime}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00] group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Channels & Platforms */}
          {matchingChannels.length > 0 && (
            <div>
              <div className="text-[10px] font-black text-[#121212] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 font-heading">
                <Youtube className="w-3.5 h-3.5 text-[#FF3E00]" /> Creator Channels & Socials
              </div>
              <div className="space-y-1.5">
                {matchingChannels.map((c) => (
                  <a
                    key={c.id}
                    href="#channels"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                      window.location.hash = '#channels';
                    }}
                    className="p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/10 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover border border-black/10" />
                      <div>
                        <div className="text-xs font-black group-hover:text-white text-[#121212] font-heading">{c.name}</div>
                        <div className="text-[10px] text-[#777777] group-hover:text-[#AAAAAA]">{c.platform} • {c.subscribers}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#FF3E00] group-hover:text-white font-black uppercase tracking-wider flex items-center gap-1">
                      View Channel <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Brand Collaborations */}
          {matchingBrands.length > 0 && (
            <div>
              <div className="text-[10px] font-black text-[#121212] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5 font-heading">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3E00]" /> Brands & Campaigns
              </div>
              <div className="space-y-1.5">
                {matchingBrands.map((b) => (
                  <a
                    key={b.id}
                    href="#brands-campaigns"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/10 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-black group-hover:text-white text-[#121212] font-heading">{b.name}</div>
                      <div className="text-[10px] text-[#777777] group-hover:text-[#AAAAAA]">{b.campaignType} • {b.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00] group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchingGames.length === 0 && matchingVideos.length === 0 && matchingBlogs.length === 0 && matchingChannels.length === 0 && matchingBrands.length === 0 && (
            <div className="text-center py-8 text-[#777777] text-xs font-medium">
              No results found for "{query}". Try searching "Free Fire", "Amazon", "Aim", "Sensitivity", or "Sniper".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
