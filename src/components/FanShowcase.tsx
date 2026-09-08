import React, { useState } from 'react';
import { FAN_CREATIONS } from '../data/gamingData';
import { Heart, MessageSquare, Sparkles, ExternalLink, Image as ImageIcon, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const FanShowcase: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    sound.playScore();
    setLikes((prev) => {
      const current = prev[id] || 0;
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
      return { ...prev, [id]: current + 1 };
    });
  };

  return (
    <section id="fan-showcase" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        GALLERY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
              <span>07 / Community Artifacts</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter font-heading">
              COMMUNITY <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
                gallery & edits.
              </span>
            </h2>
            <p className="mt-3 text-[#666666] text-sm max-w-xl font-medium">
              Featured artwork, tournament montages, and motion designs produced by the UltraOP global player community.
            </p>
          </div>

          <a
            href="https://discord.gg/ZQ2afmPvuP"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2.5 transition-all self-start md:self-auto"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Submit in Discord
          </a>
        </motion.div>

        {/* Fan Creations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAN_CREATIONS.map((fan, idx) => {
            const currentLikes = fan.likes + (likes[fan.id] || 0);

            return (
              <motion.div
                key={fan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-black/12 hover:border-black overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#121212]">
                  <img
                    src={fan.image}
                    alt={fan.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#121212] text-white text-[9px] font-black uppercase tracking-wider">
                    {fan.type}
                  </span>

                  <span className="absolute bottom-3 right-3 text-white text-[10px] font-mono font-bold bg-black/80 px-2 py-0.5 border border-white/20">
                    {fan.views} Views
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-black text-[#121212] mb-1.5 line-clamp-1 font-heading tracking-tight">
                      {fan.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-4 font-medium">
                      <span>By <strong className="text-[#121212]">{fan.author}</strong></span>
                      <span className="text-[#FF3E00] text-[11px] font-mono font-bold">{fan.authorTag}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[#888888] text-[10px] uppercase font-mono">{fan.date}</span>
                    <button
                      onClick={() => handleLike(fan.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4F1] hover:bg-[#121212] hover:text-white border border-black/15 text-xs font-black text-[#121212] transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#FF3E00] fill-[#FF3E00]" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

