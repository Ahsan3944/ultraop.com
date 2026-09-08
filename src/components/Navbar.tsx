import React, { useState, useEffect } from 'react';
import { Gamepad2, Radio, Youtube, Heart, Mail, Menu, X, Search, Volume2, VolumeX, ShieldCheck, Sparkles, Home } from 'lucide-react';
import { sound } from '../utils/audio';
import { CreatorAssetImage } from './CreatorAssetImage';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenPlayModal?: () => void;
  currentPage?: 'home' | 'channels' | 'about-faq';
  onNavigateHome?: () => void;
  onNavigateChannels?: () => void;
  onNavigateAboutFaq?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSearch, 
  onOpenPlayModal,
  currentPage = 'home',
  onNavigateHome,
  onNavigateChannels,
  onNavigateAboutFaq
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#', icon: Home, isHomePage: true },
    { name: 'Channels', href: '#channels', icon: Radio, highlight: true, isChannelsPage: true },
    { name: 'About & FAQ', href: '#about-faq', icon: ShieldCheck, isAboutFaqPage: true },
    { name: 'Social HQ', href: '#social-hub', icon: Youtube },
    { name: 'Collaborations', href: '#collaborations', icon: Sparkles },
    { name: 'Videos', href: '#videos', icon: Radio },
    { name: 'Support', href: '#support', icon: Heart }
  ];

  const handleSoundToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.toggleSound(!next);
  };

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    sound.playClick();
    setMobileMenuOpen(false);

    if (link.isHomePage) {
      e.preventDefault();
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.isChannelsPage) {
      e.preventDefault();
      if (onNavigateChannels) {
        onNavigateChannels();
      } else {
        window.location.hash = '#channels';
      }
    } else if (link.isAboutFaqPage) {
      e.preventDefault();
      if (onNavigateAboutFaq) {
        onNavigateAboutFaq();
      } else {
        window.location.hash = '#about-faq';
      }
    } else if (currentPage !== 'home') {
      // If we are on channels or about-faq and click a section link, navigate home first then scroll
      e.preventDefault();
      if (onNavigateHome) {
        onNavigateHome();
      }
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F4F1]/90 backdrop-blur-md border-b border-black/10 py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Synchronized with /public/Creator Photos/channel_logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              if (currentPage === 'channels' && onNavigateHome) {
                onNavigateHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#121212] border border-[#FF3E00]/40 group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center p-0.5">
              <CreatorAssetImage
                assetType="channel_logo"
                alt="UltraOP Channel Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl tracking-tighter text-[#121212] leading-none">
                ULTRA<span className="text-[#FF3E00]">OP</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#666666] font-black mt-0.5">
                Artisanal Gaming Hub
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-black">
            {navLinks.map((link) => {
              const isCurrent = link.isHomePage
                ? currentPage === 'home'
                : link.isChannelsPage 
                ? currentPage === 'channels' 
                : link.isAboutFaqPage 
                ? currentPage === 'about-faq' 
                : false;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative py-1.5 transition-colors duration-200 group ${
                    isCurrent
                      ? 'text-[#FF3E00] font-black'
                      : link.highlight
                      ? 'text-[#FF3E00] hover:text-[#121212]'
                      : 'text-[#121212] hover:text-[#FF3E00]'
                  }`}
                >
                  {link.name}
                  {/* Subtle Indicator Line */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#FF3E00] transition-all duration-200 ${
                      isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Global Search Button */}
            <button
              id="navbar-search-btn"
              onClick={() => {
                sound.playClick();
                onOpenSearch();
              }}
              className="px-3.5 py-2 rounded-none bg-white hover:bg-[#121212] text-[#121212] hover:text-white border border-black/15 hover:border-black active:scale-[0.98] transition-all duration-200 flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-2xs"
              title="Search Games, Videos, Collaborations & Channels (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#FF3E00] group-hover:text-white" />
              <span className="hidden sm:inline text-[10px] tracking-[0.15em]">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-black/5 text-[#666666] border border-black/10 font-mono">
                /
              </kbd>
            </button>

            {/* Theme Toggle (Midnight Artistic Mode / Editorial Light Mode) */}
            <ThemeToggle variant="icon" />

            {/* Sound FX Toggle */}
            <button
              id="navbar-sound-btn"
              onClick={handleSoundToggle}
              className="p-2 rounded-none bg-white hover:bg-[#121212] text-[#121212] hover:text-white border border-black/15 hover:border-black active:scale-[0.98] transition-all duration-200 shadow-2xs"
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#FF3E00]" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Live Indicator Pill - Opens Explore Channels Page */}
            <button
              id="navbar-live-btn"
              onClick={() => {
                sound.playClick();
                if (onNavigateChannels) {
                  onNavigateChannels();
                } else {
                  window.location.hash = '#channels';
                }
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FF3E00] hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 active:scale-[0.98] shadow-2xs cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              <span>CHANNELS</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 bg-white text-[#121212] border border-black/15 active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#F4F4F1] border-b border-black/10 px-6 pt-4 pb-8 space-y-4 animate-fade-in"
        >
          <div className="grid grid-cols-2 gap-3 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="p-3 bg-white border border-black/10 text-[#121212] hover:text-[#FF3E00] hover:border-black text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2.5 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF3E00]" />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Theme Mode Switcher in Mobile Drawer */}
          <div className="pt-2">
            <ThemeToggle variant="full" />
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                if (onNavigateChannels) onNavigateChannels();
                else window.location.hash = '#channels';
              }}
              className="flex-1 text-center py-3 bg-[#FF3E00] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all"
            >
              All Channels (12)
            </button>
            <a
              href="https://www.rooter.gg/profile/142404154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 bg-white border border-black/20 hover:bg-[#121212] hover:text-white text-[#121212] font-black text-[10px] uppercase tracking-[0.2em] transition-all"
            >
              Rooter HQ
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
