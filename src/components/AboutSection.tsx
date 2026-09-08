import React, { useState } from 'react';
import { SETUP_SPECS, GAMES_PLAYED, CHANNELS_DATA, CREATOR_PROFILE } from '../data/gamingData';
import { ShieldCheck, Cpu, Monitor, HardDrive, Tv, Smartphone, Mic, Radio, Camera, Instagram, MessageSquare, Send, Youtube, Flame, Award, Trophy, Gamepad, ExternalLink, CheckCircle2, Mail, Copy, Check, Sparkles, Video, Zap, FolderSync, FolderOpen, Image } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import { UltraLogo } from './UltraLogo';
import confetti from 'canvas-confetti';
import { useYouTubeStats } from '../hooks/useYouTubeStats';
import { CreatorAssetImage } from './CreatorAssetImage';
import { CREATOR_ASSETS_DIR, CREATOR_ASSET_REGISTRY } from '../utils/creatorAssets';

interface AboutSectionProps {
  onNavigateAboutFaq?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateAboutFaq }) => {
  const [activeSpecTab, setActiveSpecTab] = useState<'pc' | 'mobile'>('pc');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { channels } = useYouTubeStats();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFolderModal) setShowFolderModal(false);
        else if (showLogoModal) setShowLogoModal(false);
        else if (showSetupModal) setShowSetupModal(false);
      }
    };
    if (showFolderModal || showLogoModal || showSetupModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFolderModal, showLogoModal, showSetupModal]);

  const handleNavigateAboutFaq = () => {
    sound.playClick();
    if (onNavigateAboutFaq) {
      onNavigateAboutFaq();
    } else {
      window.location.hash = '#about-faq';
    }
  };

  const handleCopyEmail = () => {
    sound.playScore();
    navigator.clipboard?.writeText(CREATOR_PROFILE.businessEmail);
    setCopiedEmail(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const getSpecIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-600" />;
      case 'Monitor': return <Monitor className="w-4 h-4 text-blue-600" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-emerald-600" />;
      case 'Tv': return <Tv className="w-4 h-4 text-amber-600" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-pink-600" />;
      case 'Mic': return <Mic className="w-4 h-4 text-purple-600" />;
      case 'Radio': return <Radio className="w-4 h-4 text-cyan-600" />;
      case 'Camera': return <Camera className="w-4 h-4 text-red-600" />;
      default: return <Cpu className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        CREATOR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Creator Profile Image & Interactive Badge */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="bg-white border border-black/15 p-3 shadow-sm hover:border-black transition-all">
                {/* Real Photo of Sk Ahsan Ahmad (Synchronized with /public/Creator Photos/) */}
                <div className="relative overflow-hidden bg-[#121212] aspect-[4/5] group">
                  <CreatorAssetImage
                    assetType="creator_photo"
                    alt="Sk Ahsan Ahmad - UltraOP Creator"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Top Gamer Mascot Avatar Stamp */}
                  <div className="absolute top-3 right-3 p-1 bg-white/90 backdrop-blur-sm border border-black/20 shadow-md">
                    <UltraLogo size={34} />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                        Gaming Creator & Founder
                      </span>
                    </div>
                    <div className="font-heading font-black text-xl text-white">Sk Ahsan Ahmad</div>
                    <div className="text-xs text-gray-300">UltraOP • Kolkata, India</div>
                  </div>
                </div>

                {/* Creator Photos Folder Sync Notice */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowFolderModal(true);
                  }}
                  className="w-full mt-2.5 py-2 px-3 bg-[#121212] hover:bg-[#FF3E00] text-white text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="View folder photo synchronization guide"
                >
                  <FolderSync className="w-3.5 h-3.5 text-[#FF3E00] group-hover:text-white" />
                  <span>Sync Photo from "Creator Photos" Folder</span>
                </button>

                {/* Creator Official Quick Contact & Business Email */}
                <div className="p-4 bg-[#F4F4F1] border border-black/10 mt-2.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#777]">
                        Official Business Contact:
                      </span>
                      <div className="font-mono text-xs font-black text-[#121212]">
                        {CREATOR_PROFILE.businessEmail}
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1.5 bg-[#121212] hover:bg-[#FF3E00] text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                      title="Copy Business Email"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Social Channel Links Bar */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-black/10 flex-wrap">
                    <a
                      href={CREATOR_PROFILE.youtubeLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#FF3E00] text-white hover:bg-black transition-colors"
                      title="YouTube Live (@ultraoplive)"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CREATOR_PROFILE.twitchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-purple-600 text-white hover:bg-black transition-colors"
                      title="Twitch Live Channel (@ultraoplive)"
                    >
                      <Video className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CREATOR_PROFILE.kickUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-600 text-white hover:bg-black transition-colors"
                      title="Kick Live Channel (@ultra-op-live)"
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CREATOR_PROFILE.instagramMainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-pink-600 text-white hover:bg-black transition-colors"
                      title="Instagram (@ultraopp)"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CREATOR_PROFILE.discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-indigo-600 text-white hover:bg-black transition-colors"
                      title="Discord Community Guild"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CREATOR_PROFILE.rooterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#121212] text-white hover:bg-[#FF3E00] transition-colors ml-auto text-[10px] font-black uppercase tracking-wider px-2.5"
                      title="Rooter 515K+ Channel"
                    >
                      <Radio className="w-3 h-3 inline mr-1 text-[#FF3E00]" /> Rooter
                    </a>
                  </div>
                </div>

                {/* View Battle Station & Channel Logo Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowSetupModal(true);
                    }}
                    className="w-full py-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/15 text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Monitor className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Setup Studio Photo</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowLogoModal(true);
                    }}
                    className="w-full py-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/15 text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Channel Logo (PNG)</span>
                  </button>
                </div>
              </div>

              {/* YouTube Channel Quick Cards */}
              <div className="mt-4 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#777] mb-1">
                  Official Channels & Live Platforms:
                </div>
                {channels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-black/10 hover:border-black flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-[#121212] rounded-full overflow-hidden flex items-center justify-center text-white text-[9px] font-black">
                        {ch.platform === 'Twitch' ? 'TW' : ch.platform === 'Kick' ? 'KC' : ch.platform === 'YouTube' ? 'YT' : 'RT'}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#121212] group-hover:text-[#FF3E00] flex items-center gap-1">
                          {ch.name}
                          <CheckCircle2 className="w-3 h-3 text-[#FF3E00]" />
                        </div>
                        <div className="text-[10px] text-[#666]">{ch.subscribers} • {ch.platform}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* About Text, Games I Play & Specs Tab */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
              <span>05 / Creator Biography</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter font-heading">
              MEET THE CREATOR: <br />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
                sk ahsan ahmad.
              </span>
            </h2>

            <div className="space-y-4 text-[#444444] text-sm sm:text-base leading-relaxed font-medium">
              <p>
                Hi, I'm <strong className="text-[#121212]">Sk Ahsan Ahmad</strong>, founder and content creator behind the <strong className="text-[#121212]">UltraOP</strong> brand. Specializing in Minecraft storytelling, hardcore survival series, competitive gaming, and digital creator monetization, I produce engaging content across YouTube, Twitch, Kick, and community platforms for over <strong className="text-[#121212]">650,000+ passionate followers</strong>.
              </p>
              <p>
                For official sponsorships, brand collaborations, and business inquiries, reach out directly to the team at{' '}
                <a href={`mailto:${CREATOR_PROFILE.businessEmail}`} className="text-[#FF3E00] font-bold font-mono underline underline-offset-4">
                  {CREATOR_PROFILE.businessEmail}
                </a>.
              </p>
            </div>

            {/* Games I Play Section */}
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-2">
                  <Gamepad className="w-4 h-4 text-[#FF3E00]" />
                  Games I Play & Broadcast
                </h3>
                <span className="text-[10px] text-[#777] font-bold uppercase tracking-wider">
                  Live Titles & History
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GAMES_PLAYED.map((game, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F4F4F1] border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-heading font-black text-sm text-[#121212]">{game.name}</span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 ${
                          game.status.includes('Daily')
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : game.status.includes('Active')
                            ? 'bg-[#121212] text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {game.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666] font-medium leading-snug">{game.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Battle Station Hardware Specs Interactive Tab */}
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5 border-b border-black/10 pb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#FF3E00]" />
                  Battle Station Hardware Specs
                </h3>

                <div className="flex items-center gap-1.5 bg-[#F4F4F1] p-1 border border-black/10 text-xs">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveSpecTab('pc');
                    }}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-colors ${
                      activeSpecTab === 'pc' ? 'bg-[#121212] text-white' : 'text-[#666666] hover:text-[#121212]'
                    }`}
                  >
                    PC Battle Station
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveSpecTab('mobile');
                    }}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-colors ${
                      activeSpecTab === 'mobile' ? 'bg-[#121212] text-white' : 'text-[#666666] hover:text-[#121212]'
                    }`}
                  >
                    Stream & Audio Gear
                  </button>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SETUP_SPECS[activeSpecTab === 'pc' ? 0 : 1].items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F4F4F1] border border-black/10 flex items-center gap-3"
                  >
                    <div className="p-2 bg-white border border-black/10 shrink-0">
                      {getSpecIcon(item.iconName)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-[#777777] font-black uppercase tracking-wider">{item.name}</div>
                      <div className="text-xs font-bold text-[#121212] truncate">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dedicated Link to Full About & FAQ Knowledge Base */}
              <div className="mt-4 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#666666] font-medium">
                  Want the full story on Ahsan's journey, Minecraft lore, and official channels?
                </span>
                <button
                  onClick={handleNavigateAboutFaq}
                  className="px-4 py-2.5 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read Official Bio & FAQ →</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Battle Station Setup Modal */}
      {showSetupModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="setup-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSetupModal(false);
          }}
        >
          <div className="bg-white border-2 border-black max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 relative shadow-2xl">
            <button
              onClick={() => {
                sound.playClick();
                setShowSetupModal(false);
              }}
              aria-label="Close battle station modal"
              className="absolute top-4 right-4 p-2 bg-[#121212] text-white hover:bg-[#FF3E00] text-xs font-black uppercase transition-colors z-10 cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-2 text-[#FF3E00] text-xs font-black uppercase tracking-widest">
              <Monitor className="w-4 h-4" />
              <span>Official Creator Studio Tour</span>
            </div>

            <h3 id="setup-modal-title" className="text-2xl font-black text-[#121212] font-heading">
              Sk Ahsan Ahmad's Dual-Monitor Battle Station
            </h3>

            {/* Photo Representation of the Battle Station (Synchronized with /public/Creator Photos/) */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#121212] border border-black/20">
              <CreatorAssetImage
                assetType="setup_photo"
                alt="UltraOP Dual Monitor Gaming Battle Station"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
                <div className="font-heading font-black text-base text-[#FF3E00]">
                  Acer High-Refresh Curved Monitors • HyperX Headset • Custom ARGB Gaming Tower
                </div>
                <div className="text-gray-300">
                  Acoustic sound-proofing studio tiles, boom arm studio broadcast mic, and RGB mechanical keyboard setup.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <strong className="block text-[#121212]">Curved Acer Displays</strong>
                <span className="text-[#666]">Primary 240Hz Esports + Secondary Stream chat control</span>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <strong className="block text-[#121212]">HyperX Pro Audio</strong>
                <span className="text-[#666]">Spatial surround sound headset + boom arm condenser mic</span>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <strong className="block text-[#121212]">ARGB PC Rig</strong>
                <span className="text-[#666]">Dual-chamber glass tower with liquid cooling & RTX GPU</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Official Channel Logo & Mascot Modal */}
      {showLogoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logo-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogoModal(false);
          }}
        >
          <div className="bg-white border-2 border-black max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-4 relative shadow-2xl text-center">
            <button
              onClick={() => {
                sound.playClick();
                setShowLogoModal(false);
              }}
              aria-label="Close logo modal"
              className="absolute top-4 right-4 p-2 bg-[#121212] text-white hover:bg-[#FF3E00] text-xs font-black uppercase transition-colors z-10 cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="flex items-center justify-center gap-2 text-[#FF3E00] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Official Channel Brand Identity</span>
            </div>

            <h3 id="logo-modal-title" className="text-2xl font-black text-[#121212] font-heading uppercase tracking-tight">
              UltraOP Channel Logo & Mascot
            </h3>

            {/* High-Resolution Emblem & Mascot Viewer */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] border border-black/15 shadow-inner">
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <CreatorAssetImage
                    assetType="channel_logo"
                    alt="UltraOP Channel Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-3 text-white font-heading font-black text-sm tracking-tight">
                  Channel Logo
                </div>
                <div className="text-[9px] text-emerald-400 font-mono mt-0.5">
                  channel_logo.png / svg
                </div>
              </div>

              <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] border border-black/15 shadow-inner">
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <CreatorAssetImage
                    assetType="game_profile_logo"
                    alt="UltraOP Game Profile Mascot Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-3 text-white font-heading font-black text-sm tracking-tight">
                  Game Profile Mascot
                </div>
                <div className="text-[9px] text-[#FF3E00] font-mono mt-0.5">
                  game_profile_logo.png / svg
                </div>
              </div>
            </div>

            <p className="text-xs text-[#555] leading-relaxed font-medium">
              Synchronized automatically with <code className="bg-[#EAEAE6] px-1 py-0.5 font-bold text-black">/public/Creator Photos/</code>. Drop or replace files anytime to update the website instantly.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://www.youtube.com/@ultraoplive?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playScore()}
                className="py-3 bg-[#FF3E00] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Visit Channel</span>
              </a>

              <button
                onClick={() => {
                  sound.playScore();
                  setShowLogoModal(false);
                  setShowFolderModal(true);
                }}
                className="py-3 bg-[#121212] hover:bg-[#333] text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Sync Folder Guide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creator Photos Folder Synchronization Guide Modal */}
      {showFolderModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="folder-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFolderModal(false);
          }}
        >
          <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative shadow-2xl text-left">
            <button
              onClick={() => {
                sound.playClick();
                setShowFolderModal(false);
              }}
              aria-label="Close folder sync guide"
              className="absolute top-4 right-4 p-2 bg-[#121212] text-white hover:bg-[#FF3E00] text-xs font-black uppercase transition-colors z-10 cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-2 text-[#FF3E00] text-xs font-black uppercase tracking-widest">
              <FolderSync className="w-4 h-4 animate-spin" />
              <span>Live Folder & Code Synchronization</span>
            </div>

            <div>
              <h3 id="folder-modal-title" className="text-2xl font-black text-[#121212] font-heading">
                "Creator Photos" Folder Asset Registry
              </h3>
              <p className="text-xs text-[#555] mt-1 font-medium leading-relaxed">
                All photos placed in <code className="bg-[#121212] text-white px-1.5 py-0.5 rounded font-mono font-bold">/public/Creator Photos/</code> are automatically linked to the website. The code seamlessly accepts <strong>.PNG, .JPG, .JPEG, .SVG, and .WEBP</strong> formats.
              </p>
            </div>

            {/* File Mapping Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F4F4F1] border border-black/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-[#121212] font-black uppercase tracking-wider text-[11px]">1. Creator Photo</strong>
                  <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold">JPG / PNG / SVG</span>
                </div>
                <div className="font-mono text-[11px] text-[#FF3E00] font-bold">
                  creator_photo.jpg / .png
                </div>
                <p className="text-[#666] text-[11px]">
                  Updates your biography photo, hero card, and official creator profile.
                </p>
              </div>

              <div className="p-3.5 bg-[#F4F4F1] border border-black/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-[#121212] font-black uppercase tracking-wider text-[11px]">2. Channel Logo</strong>
                  <span className="px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold">SVG / PNG / JPG</span>
                </div>
                <div className="font-mono text-[11px] text-[#FF3E00] font-bold">
                  channel_logo.svg / .png
                </div>
                <p className="text-[#666] text-[11px]">
                  Updates the top navigation bar brand emblem, modal viewer, and channel badges.
                </p>
              </div>

              <div className="p-3.5 bg-[#F4F4F1] border border-black/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-[#121212] font-black uppercase tracking-wider text-[11px]">3. Game Profile Logo</strong>
                  <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold">SVG / PNG / JPG</span>
                </div>
                <div className="font-mono text-[11px] text-[#FF3E00] font-bold">
                  game_profile_logo.svg / .png
                </div>
                <p className="text-[#666] text-[11px]">
                  Updates the esports gamer avatar mascot and verified streamer stamp.
                </p>
              </div>

              <div className="p-3.5 bg-[#F4F4F1] border border-black/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-[#121212] font-black uppercase tracking-wider text-[11px]">4. Battle Station Setup</strong>
                  <span className="px-1.5 py-0.5 bg-amber-600 text-white text-[9px] font-bold">JPG / PNG / WEBP</span>
                </div>
                <div className="font-mono text-[11px] text-[#FF3E00] font-bold">
                  setup_photo.jpg / .png
                </div>
                <p className="text-[#666] text-[11px]">
                  Updates your dual-monitor studio setup tour photo in the hardware section.
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zero Code Changes Needed:</strong> Whenever you drop a new personal photo or logo into the <code>Creator Photos</code> folder with any of the names above, the site will immediately show your new image.
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowFolderModal(false);
                }}
                className="px-6 py-3 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


