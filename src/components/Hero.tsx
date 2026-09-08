import React from 'react';
import { Play, Sparkles, Youtube, Radio, Flame, Shield, Users, ArrowRight, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';
import { useYouTubeStats } from '../hooks/useYouTubeStats';
import { CreatorAssetImage } from './CreatorAssetImage';

interface HeroProps {
  onExploreChannels?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreChannels }) => {
  const { totalViews, totalReach, totalVideos, channelMap } = useYouTubeStats();
  const mainYt = channelMap['c-main'];
  const rooterCh = channelMap['c-rooter'];

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    if (onExploreChannels) {
      onExploreChannels();
    } else {
      window.location.hash = '#channels';
    }
  };

  return (
    <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#F4F4F1]">
      {/* Massive Background Typography Watermark */}
      <div className="absolute -top-10 -left-6 text-[180px] sm:text-[240px] md:text-[300px] font-black text-black/[0.03] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        ULTRA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Editorial Content */}
          <div className="lg:col-span-7 text-left space-y-8">
            {/* Artistic Flair Category Eyebrow */}
            <div className="text-[11px] font-black uppercase tracking-[0.5em] text-[#FF3E00] flex items-center gap-3">
              <div className="h-[1.5px] w-10 bg-[#FF3E00]"></div>
              <span>GAMING CREATOR • MINECRAFT • STORYTELLING</span>
            </div>

            {/* Main Headline - Bold Grotesque + Serif Italic */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#121212] tracking-tighter leading-[0.88] font-heading">
              ULTRAOP <br />
              <span className="font-serif-italic font-normal text-[#FF3E00] tracking-normal text-6xl sm:text-8xl md:text-9xl lowercase">
                creator & storyteller.
              </span>
            </h1>

            {/* Rotated Year Badge + Left Border Quote Block */}
            <div className="flex gap-6 items-start pt-2">
              <div className="text-[10px] font-black bg-[#121212] text-white px-2 py-1 rotate-90 origin-left mt-2 tracking-widest uppercase shrink-0">
                2025
              </div>
              <p className="text-base sm:text-lg max-w-xl font-medium text-[#2A2A2A] leading-relaxed border-l-2 border-black/15 pl-6">
                The official portal of <strong className="text-[#121212] font-black">UltraOP (Sk Ahsan Ahmad)</strong>. Gaming videos, Minecraft stories, playable web arcade games, and community adventures with over <strong className="text-[#121212] font-black">{totalViews} Views</strong>.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#gaming"
                onClick={() => sound.playClick()}
                className="px-8 py-4.5 bg-[#121212] text-white hover:bg-[#FF3E00] text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center gap-3"
              >
                <Play className="w-4 h-4 fill-current text-[#FF3E00] group-hover:text-white" />
                Play Arcade Games
              </a>

              <a
                href="#channels"
                onClick={handleExploreClick}
                className="px-8 py-4.5 bg-white text-[#121212] border border-black/15 hover:border-black hover:bg-[#121212] hover:text-white text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-2xs flex items-center gap-2.5"
              >
                <Radio className="w-4 h-4 text-[#FF3E00]" />
                Explore Channels
              </a>
            </div>

            {/* Micro Stats Banner - Protected against any horizontal/vertical text overlap */}
            <div className="pt-6 border-t border-black/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-xl">
                {/* Stat 1: Total Views */}
                <div className="bg-white/80 sm:bg-transparent p-3.5 sm:p-0 border border-black/10 sm:border-0 rounded-none min-w-0 transition-colors">
                  <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {totalViews}
                  </div>
                  <div className="text-[10px] text-[#666666] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                    Total Views
                  </div>
                </div>

                {/* Stat 2: Rooter Fans */}
                <div className="bg-white/80 sm:bg-transparent p-3.5 sm:p-0 border border-black/10 sm:border-0 sm:border-l sm:border-black/15 sm:pl-6 rounded-none min-w-0 transition-colors">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF3E00] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {rooterCh?.subscribers || '515.9K+'}
                  </div>
                  <div className="text-[10px] text-[#666666] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                    Rooter Fans
                  </div>
                </div>

                {/* Stat 3: Live Broadcasts */}
                <div className="bg-white/80 sm:bg-transparent p-3.5 sm:p-0 border border-black/10 sm:border-0 sm:border-l sm:border-black/15 sm:pl-6 rounded-none min-w-0 transition-colors">
                  <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {totalVideos}
                  </div>
                  <div className="text-[10px] text-[#666666] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                    Live Broadcasts
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Creator Showcase Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-black/15 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-black hover:shadow-md">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#121212] rounded-full overflow-hidden p-0.5 shrink-0 border border-[#FF3E00]/40">
                    <CreatorAssetImage
                      assetType="creator_photo"
                      alt="UltraOP Ahsan"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-black text-[#121212] text-sm tracking-tight">UltraOP / Ahsan</h3>
                      <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-ping" />
                    </div>
                    <p className="text-[11px] text-[#666666] font-medium">Gaming Content Creator & Storyteller</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-[#121212] text-white text-[9px] font-black uppercase tracking-[0.2em]">
                  FEATURED HUB ✦
                </span>
              </div>

              {/* Featured Visual */}
              <div className="relative my-5 aspect-[16/10] overflow-hidden bg-[#121212] border border-black/10 group">
                <img
                  src="https://images.unsplash.com/photo-1627856014754-2907e2055704?w=600&auto=format&fit=crop&q=80"
                  alt="UltraOP Minecraft & Gaming Series"
                  width={600}
                  height={375}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-xs">Minecraft Hardcore & Story Series</span>
                  <span className="bg-[#FF3E00] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                    Featured Content
                  </span>
                </div>
              </div>

              {/* Action Badges */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href="#gaming"
                  onClick={() => sound.playClick()}
                  className="p-3 bg-[#F4F4F1] border border-black/10 hover:border-black text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>7 Arcade Games</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00]" />
                </a>
                <a
                  href="#support"
                  onClick={() => sound.playClick()}
                  className="p-3 bg-[#F4F4F1] border border-black/10 hover:border-black text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Support Creator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00]" />
                </a>
              </div>

              {/* Subscribe CTA */}
              <a
                href="https://www.youtube.com/@ultraoplive?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sound.playScore();
                }}
                className="w-full py-3.5 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <Youtube className="w-4 h-4 text-[#FF3E00] group-hover:text-white" />
                Subscribe on YouTube (1-Click Pop-Up)
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
