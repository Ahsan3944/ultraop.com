import React from 'react';
import { Users, Eye, Video, Award, Sparkles, TrendingUp, Radio } from 'lucide-react';
import { useYouTubeStats } from '../hooks/useYouTubeStats';

export const StatsCounter: React.FC = () => {
  const { youtubeTotals, rooterTotals, totalReach, totalViews, totalVideos } = useYouTubeStats();

  const dynamicStats = [
    {
      id: 'stat-yt-subs',
      label: 'YouTube Subscribers',
      formattedValue: youtubeTotals.subscribersFormatted.replace(/\+$/, ''),
      hasPlus: true,
      subtext: '4 Channels Combined',
      icon: 'Users'
    },
    {
      id: 'stat-rooter-fans',
      label: 'Rooter Esports Fans',
      formattedValue: '515.9K',
      hasPlus: true,
      subtext: 'Verified Partner Hub',
      icon: 'Radio'
    },
    {
      id: 'stat-total-views',
      label: 'Lifetime Views',
      formattedValue: totalViews.replace(/\+$/, ''),
      hasPlus: true,
      subtext: 'YouTube & Rooter Total',
      icon: 'Eye'
    },
    {
      id: 'stat-total-videos',
      label: 'Live Broadcasts & Vids',
      formattedValue: totalVideos.replace(/\+$/, ''),
      hasPlus: true,
      subtext: '4 Channels & Tournaments',
      icon: 'Video'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-[#F4F4F1] border-y border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left max-w-2xl mb-12">
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-3">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>03 / Verified Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#121212] font-heading tracking-tight">
            BY THE <span className="font-serif-italic font-normal text-[#FF3E00] lowercase">numbers.</span>
          </h2>
          <p className="text-[#666666] text-xs sm:text-sm mt-2 font-medium">
            Multi-platform analytics verified across live broadcasts, daily shorts, and gaming tournaments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicStats.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-white border border-black/12 p-6 sm:p-7 relative overflow-hidden group hover:border-black transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif-italic font-normal text-2xl text-[#888888] group-hover:text-[#FF3E00] transition-colors">
                  0{idx + 1}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#121212] group-hover:bg-[#FF3E00] transition-colors" />
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-[#121212] font-heading tracking-tighter">
                  {stat.formattedValue}
                  {stat.hasPlus && (
                    <span className="text-[#FF3E00] text-3xl ml-1">
                      +
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-black text-[#666666] uppercase tracking-wider pt-2">
                  {stat.label}
                </h3>
              </div>

              <div className="mt-6 pt-3.5 border-t border-black/10 text-[10px] text-[#777777] font-black uppercase tracking-wider flex items-center justify-between">
                <span>{stat.subtext}</span>
                <span className="text-[#121212] flex items-center gap-1.5 font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Sync
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
