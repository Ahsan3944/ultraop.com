import React from 'react';
import { Youtube, Instagram, MessageSquare, Send, Radio, Heart, ArrowUp, Video, Zap } from 'lucide-react';
import { sound } from '../utils/audio';
import { CREATOR_PROFILE } from '../data/gamingData';
import { CreatorAssetImage } from './CreatorAssetImage';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  onNavigateChannels?: () => void;
  onNavigateAboutFaq?: () => void;
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateChannels, onNavigateAboutFaq, onOpenLegal }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChannelsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    if (onNavigateChannels) {
      onNavigateChannels();
    } else {
      window.location.hash = '#channels';
    }
  };

  const handleAboutFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    if (onNavigateAboutFaq) {
      onNavigateAboutFaq();
    } else {
      window.location.hash = '#about-faq';
    }
  };

  return (
    <footer className="bg-[#121212] text-white border-t border-black pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" onClick={scrollToTop} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/60 border border-[#FF3E00]/50 flex items-center justify-center p-0.5 shrink-0">
                <CreatorAssetImage
                  assetType="channel_logo"
                  alt="UltraOP Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-black text-2xl tracking-tighter text-white">
                Ultra<span className="font-serif-italic font-normal text-[#FF3E00]">OP</span>
              </span>
            </a>

            <p className="text-[#888888] text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
              The official digital gaming portal founded by Sk Ahsan Ahmad (UltraOP). Discover Minecraft storytelling, gaming broadcasts, browser-playable arcade games, and creator insights across YouTube, Twitch, Kick, and community platforms.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <a
                href={CREATOR_PROFILE.youtubeLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit UltraOP on YouTube Live"
                className="p-2.5 bg-white/5 hover:bg-[#FF3E00] text-white border border-white/10 transition-colors"
                title="YouTube Live"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_PROFILE.twitchUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit UltraOP Twitch Live Channel"
                className="p-2.5 bg-white/5 hover:bg-purple-600 text-white border border-white/10 transition-colors"
                title="Twitch Live Channel"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_PROFILE.kickUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit UltraOP Kick Live Channel"
                className="p-2.5 bg-white/5 hover:bg-emerald-600 text-white border border-white/10 transition-colors"
                title="Kick Live Channel"
              >
                <Zap className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_PROFILE.rooterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit UltraOP on Rooter GG"
                className="p-2.5 bg-white/5 hover:bg-[#FF3E00] text-white border border-white/10 transition-colors"
                title="Rooter"
              >
                <Radio className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_PROFILE.instagramMainUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit UltraOP on Instagram"
                className="p-2.5 bg-white/5 hover:bg-pink-600 text-white border border-white/10 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_PROFILE.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join UltraOP Discord Headquarters"
                className="p-2.5 bg-white/5 hover:bg-indigo-600 text-white border border-white/10 transition-colors"
                title="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs font-black text-white uppercase tracking-[0.2em] mb-4">
              Explore Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A09C] font-medium">
              <li><a href="#about-faq" onClick={handleAboutFaqClick} className="text-[#FF3E00] hover:text-white font-bold transition-colors">★ About & Official FAQ</a></li>
              <li><a href="#gaming" className="hover:text-white transition-colors">Instant Arcade</a></li>
              <li><a href="#channels" onClick={handleChannelsClick} className="hover:text-white transition-colors">Streaming Channels (12)</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">Stream Archive</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Creator Bio & Gear</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Keyword UPI Scanner</a></li>
            </ul>
          </div>

          {/* Games Direct */}
          <div>
            <h4 className="font-heading text-xs font-black text-white uppercase tracking-[0.2em] mb-4">
              Featured Games
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A09C] font-medium">
              <li><a href="#gaming" className="hover:text-white transition-colors">Cyber Strike: Galaxy Ops</a></li>
              <li><a href="#gaming" className="hover:text-white transition-colors">Reflex Aim Pro</a></li>
              <li><a href="#gaming" className="hover:text-white transition-colors">Neon Cyber Snake</a></li>
              <li><a href="#gaming" className="hover:text-white transition-colors">Ultra Cyber Dash</a></li>
              <li><a href="#gaming" className="hover:text-white transition-colors">Gamer & Esports Trivia</a></li>
            </ul>
          </div>

          {/* Direct Support Info */}
          <div>
            <h4 className="font-heading text-xs font-black text-white uppercase tracking-[0.2em] mb-4">
              Official Contact & Desk
            </h4>
            <div className="space-y-2 text-xs text-[#A0A09C] font-medium">
              <p>Business Mail:</p>
              <a
                href={`mailto:${CREATOR_PROFILE.businessEmail}`}
                aria-label={`Send email to ${CREATOR_PROFILE.businessEmail}`}
                className="font-mono font-bold text-[#FF3E00] text-xs bg-white/5 p-2.5 border border-white/10 select-all block"
              >
                {CREATOR_PROFILE.businessEmail}
              </a>
              <p className="pt-1 text-[11px] text-[#A0A09C]">
                Official UPI: ultraopbiz@gmail.com
              </p>
              <div className="pt-2 flex flex-col gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenLegal?.('privacy');
                  }}
                  className="text-left text-[#A0A09C] hover:text-[#FF3E00] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenLegal?.('terms');
                  }}
                  className="text-left text-[#A0A09C] hover:text-[#FF3E00] transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenLegal?.('disclaimer');
                  }}
                  className="text-left text-[#A0A09C] hover:text-[#FF3E00] transition-colors cursor-pointer"
                >
                  Trademarks & Disclaimers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Text */}
        <div className="py-6 border-b border-white/5 text-[10px] text-[#777777] leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> UltraOP is an independent gaming entertainment brand led by Sk Ahsan Ahmad. Minecraft is a trademark of Mojang Synergies AB / Microsoft. Valorant is a trademark of Riot Games. Free Fire is a trademark of Garena. Brand logos displayed in previous campaigns belong to their respective owners and represent verified past commercial collaborations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9E99] font-medium">
          <div>
            © {new Date().getFullYear()} UltraOP Gaming Studio • Sk Ahsan Ahmad. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="compact" />

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#FF3E00] text-[#A0A09C] hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-[0.15em] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

