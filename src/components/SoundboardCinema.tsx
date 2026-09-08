import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Radio, MessageSquare, Send, Sparkles, Flame, Trophy, Heart, Shield, Check, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  user: string;
  badge?: string;
  badgeColor?: string;
  message: string;
  time: string;
  isSuperchat?: boolean;
  amount?: string;
}

export const SoundboardCinema: React.FC = () => {
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Rohit Gaming', badge: 'VIP', badgeColor: 'bg-amber-500', message: 'Ahsan bhai that 1v4 clutch in Bermuda was INSANE! 🔥', time: 'Just now' },
    { id: '2', user: 'FreeFire_Pro_99', badge: 'Diamond', badgeColor: 'bg-cyan-500', message: 'Used your 1-Tap sensitivity and got 14 headshots today!', time: '1m ago' },
    { id: '3', user: 'Aman VFX', badge: 'Mod', badgeColor: 'bg-[#FF3E00]', message: 'Welcome to all 4.2K viewers watching UltraOpLive! 🎮', time: '2m ago' },
    { id: '4', user: 'Priya_Queen', badge: 'Fan', badgeColor: 'bg-purple-500', message: 'Rooter 500K milestone celebration was top tier 🎉', time: '3m ago' }
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [userName, setUserName] = useState<string>('Gamer_Fan');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Soundboard audio presets
  const soundboardItems = [
    {
      id: 'booyah',
      title: 'Booyah Victory Fanfare',
      description: 'Iconic Grandmaster match winning anthem',
      icon: '👑',
      action: () => {
        sound.playBooyah();
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
    },
    {
      id: 'sniper',
      title: 'AWM 1-Tap Sniper Blast',
      description: 'High-caliber Gloo Wall piercing headshot',
      icon: '🎯',
      action: () => sound.playSniper()
    },
    {
      id: 'gloo',
      title: 'Rapid Gloo Wall Deploy',
      description: 'Instant 360-degree shield drop sound',
      icon: '🛡️',
      action: () => sound.playGlooWall()
    },
    {
      id: 'clutch',
      title: 'Ultra OP 1v4 Clutch Mode',
      description: 'High adrenaline esports combat sweep',
      icon: '⚡',
      action: () => sound.playClutch()
    },
    {
      id: 'diamonds',
      title: '5,000 Diamonds Powerup',
      description: 'Giveaway tournament winner chime',
      icon: '💎',
      action: () => sound.playPowerup()
    },
    {
      id: 'levelup',
      title: 'Grandmaster Level Up',
      description: 'Rank promotion victory chord',
      icon: '🔥',
      action: () => sound.playWin()
    }
  ];

  const handlePlaySound = (item: typeof soundboardItems[0]) => {
    setActiveAudioPlaying(item.id);
    item.action();
    setTimeout(() => setActiveAudioPlaying(null), 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    sound.playScore();
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: userName || 'You',
      badge: 'Live Fan',
      badgeColor: 'bg-[#121212]',
      message: inputMsg.trim(),
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  const handleSendSuperchat = () => {
    sound.playScore();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    const superchatMsg: ChatMessage = {
      id: Date.now().toString(),
      user: userName || 'Super Fan',
      badge: 'SUPER CHAT',
      badgeColor: 'bg-[#FF3E00]',
      message: '₹100 Tip: Big love to Ahsan bhai! Keep inspiring us 🔥',
      time: 'Just now',
      isSuperchat: true,
      amount: '₹100.00'
    };
    setChatMessages(prev => [...prev, superchatMsg]);
  };

  return (
    <section id="cinema" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        THEATER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>08 / Creator Soundboard & Live Chat</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            CREATOR SFX & <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              interactive stream lounge.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Test UltraOP's signature stream voice lines, synthesized gaming weapon audio, and interact with the live broadcast community chat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive SFX Soundboard Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-white border border-black/15 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-5">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#FF3E00]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#121212]">
                    UltraOP Live Stream Soundboard
                  </h3>
                </div>
                <span className="text-[10px] text-[#777777] font-mono">
                  Zero-Latency Web Audio
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {soundboardItems.map(item => {
                  const isPlaying = activeAudioPlaying === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlaySound(item)}
                      className={`p-4 text-left border flex items-center justify-between transition-all group ${
                        isPlaying
                          ? 'bg-[#FF3E00] text-white border-[#FF3E00] scale-95'
                          : 'bg-[#F4F4F1] hover:bg-[#121212] hover:text-white border-black/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                          <div className={`text-xs font-black font-heading ${isPlaying ? 'text-white' : 'text-[#121212] group-hover:text-white'}`}>
                            {item.title}
                          </div>
                          <div className={`text-[10px] line-clamp-1 ${isPlaying ? 'text-white/80' : 'text-[#777777] group-hover:text-gray-300'}`}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <Volume2 className={`w-4 h-4 shrink-0 ml-2 ${isPlaying ? 'text-white animate-pulse' : 'text-[#777777] group-hover:text-[#FF3E00]'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 p-3 bg-[#F4F4F1] border border-black/10 flex items-center justify-between text-xs">
                <span className="text-[#666666] font-medium">Want custom soundboard triggers for your stream?</span>
                <a href="#contact" className="text-[#FF3E00] font-black uppercase tracking-wider hover:underline text-[10px]">
                  Contact Studio →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Stream Chat Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-[#121212] border-2 border-black p-6 text-white shadow-xl flex flex-col h-[460px] justify-between">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider font-heading">
                    Live Stream Chat Room
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-mono">4,280 viewers</span>
                  <button
                    onClick={handleSendSuperchat}
                    className="px-2.5 py-1 bg-[#FF3E00] hover:bg-white hover:text-black text-white text-[9px] font-black uppercase tracking-wider transition-colors"
                  >
                    Send Super Chat
                  </button>
                </div>
              </div>

              {/* Chat Stream Area */}
              <div className="flex-1 overflow-y-auto space-y-2.5 py-3 pr-1 text-xs">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-2.5 rounded-none ${
                      msg.isSuperchat
                        ? 'bg-[#FF3E00]/20 border border-[#FF3E00]'
                        : 'bg-white/5 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider text-white ${msg.badgeColor || 'bg-gray-700'}`}>
                          {msg.badge}
                        </span>
                        <strong className="text-xs font-bold text-gray-200">{msg.user}</strong>
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono">{msg.time}</span>
                    </div>
                    <p className={`text-xs ${msg.isSuperchat ? 'text-amber-300 font-bold' : 'text-gray-300'}`}>
                      {msg.message}
                    </p>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Message Input Bar */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 shrink-0 space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full sm:w-28 px-2.5 py-2 text-xs bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3E00]"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      placeholder="Type live cheer or message..."
                      className="flex-1 px-3 py-2 text-xs bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3E00]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FF3E00] hover:bg-white hover:text-[#121212] text-white font-black text-xs transition-colors shrink-0 flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
