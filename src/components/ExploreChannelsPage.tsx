import React, { useState, useEffect } from 'react';
import { 
  Youtube, Radio, ExternalLink, Check, Users, Eye, Video, Sparkles, RefreshCw, Bell, ArrowLeft, Search, Instagram, MessageSquare, ShieldCheck, Flame, Share2, Filter, Tv, Gamepad2, TrendingUp, Globe
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { useYouTubeStats, ChannelMetrics } from '../hooks/useYouTubeStats';
import { updateDocumentSEO, ROUTE_SEO } from '../utils/seo';

export interface ComprehensiveChannel {
  id: string;
  name: string;
  handle: string;
  platform: 'YouTube' | 'Twitch' | 'Kick' | 'Instagram' | 'Rooter' | 'Discord';
  subscribers: string;
  subscriberCountRaw: number;
  views?: string;
  viewCountRaw?: number;
  contentCount?: string;
  description: string;
  focus: string;
  url: string;
  subscribeUrl?: string;
  avatar: string;
  banner?: string;
  badge?: string;
  isLive?: boolean;
  featured?: boolean;
  themeColor: string;
  bgAccent: string;
  badgeColor: string;
}

export const ALL_CREATOR_CHANNELS: ComprehensiveChannel[] = [
  {
    id: 'yt-main', name: 'Ultra OP Live', handle: '@ultraoplive', platform: 'YouTube', subscribers: '72K+', subscriberCountRaw: 72000, views: '19.8M+', viewCountRaw: 19800000, contentCount: '485+ Videos & Streams',
    description: 'Primary live broadcasting channel! Daily Minecraft hardcore SMP, high-tier Valorant clutches, GTA V stunt sessions, and custom room tournaments.', focus: 'Minecraft, Valorant, GTA V & Scrims', url: 'https://www.youtube.com/@ultraoplive', subscribeUrl: 'https://www.youtube.com/@ultraoplive?sub_confirmation=1', avatar: 'https://yt3.googleusercontent.com/9v3vhxLlT_xOVo1qKMH4aDT41QLlxFxraNI20vWjPpG8wZZdEQTRDyJvJngKIKlspJpPgO-8Dg=s900-c-k-c0x00ffffff-no-rj', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', badge: 'Main Live Hub 🔴', isLive: true, featured: true, themeColor: '#FF3E00', bgAccent: 'bg-red-500/10 text-[#FF3E00] border-red-500/20', badgeColor: 'bg-[#FF3E00] text-white'
  },
  {
    id: 'twitch-main', name: 'Ultra OP (Twitch)', handle: '@ultraoplive', platform: 'Twitch', subscribers: '38K+', subscriberCountRaw: 38000, views: '1.4M+', viewCountRaw: 1400000, contentCount: '140+ Interactive Streams',
    description: 'Official Twitch live broadcast channel! High-framerate interactive gaming broadcasts, Valorant competitive ranked grinds, Minecraft survival, and live chat challenges.', focus: 'Twitch Live Streams & Valorant FPS', url: 'https://www.twitch.tv/ultraoplive', subscribeUrl: 'https://www.twitch.tv/ultraoplive', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', badge: 'Live on Twitch 🟣', isLive: false, featured: true, themeColor: '#9146FF', bgAccent: 'bg-purple-500/10 text-purple-600 border-purple-500/20', badgeColor: 'bg-[#9146FF] text-white'
  },
  {
    id: 'kick-main', name: 'Ultra OP (Kick)', handle: '@ultra-op-live', platform: 'Kick', subscribers: '31K+', subscriberCountRaw: 31000, views: '960K+', viewCountRaw: 960000, contentCount: '85+ Late Night Squad Streams',
    description: 'Official Kick channel! High-energy live gaming sessions, GTA V modded stunts, subscriber multiplayer games, and late-night community watch parties.', focus: 'Kick Live Gaming & GTA V Stunts', url: 'https://kick.com/ultra-op-live', subscribeUrl: 'https://kick.com/ultra-op-live', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80', badge: 'Live on Kick 🟢', isLive: false, featured: true, themeColor: '#53FC18', bgAccent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'ig-main', name: 'Ahsan UltraOP (Instagram)', handle: '@ultraopp', platform: 'Instagram', subscribers: '45.8K+', subscriberCountRaw: 45800, views: '8.5M+', viewCountRaw: 8500000, contentCount: '320+ Posts & Reels',
    description: 'Official Instagram of Sk Ahsan Ahmad. Daily streamer desk setups, behind-the-scenes tournament stories, viral clutch reels, and community updates.', focus: 'Daily Stream Setups & Viral Reels', url: 'https://www.instagram.com/ultraopp/', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80', badge: 'Verified Creator 📸', isLive: false, featured: true, themeColor: '#E1306C', bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20', badgeColor: 'bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white'
  },
  {
    id: 'rooter-main', name: 'Ultra OP (Rooter)', handle: '@ultraop142404154', platform: 'Rooter', subscribers: '515.9K+', subscriberCountRaw: 515900, views: '65.2M+', viewCountRaw: 65200000, contentCount: '1,700+ Live Broadcasts',
    description: 'Historic Rooter streaming headquarters with over 515K+ followers. Hosts verified esports custom rooms, diamond tournaments, and daily scrim broadcasts.', focus: 'Esports Scrims & Tournament Rooms', url: 'https://www.rooter.gg/profile/142404154', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', badge: '515K+ Flagship 🏆', isLive: false, featured: true, themeColor: '#FF7A00', bgAccent: 'bg-orange-500/10 text-orange-600 border-orange-500/20', badgeColor: 'bg-[#121212] text-white'
  },
  {
    id: 'yt-minecraft', name: 'Ultra OP 2.0 (Minecraft)', handle: '@ultraop2', platform: 'YouTube', subscribers: '72K+', subscriberCountRaw: 72000, views: '16.5M+', viewCountRaw: 16500000, contentCount: '125+ Videos & Streams',
    description: 'Dedicated Minecraft SMP Hub! Hardcore 100 days survival challenges, massive redstone automated farms, Nether speedruns, and subscriber realms.', focus: 'Hardcore Survival & Redstone SMP', url: 'https://www.youtube.com/@ultraop2', subscribeUrl: 'https://www.youtube.com/@ultraop2?sub_confirmation=1', avatar: 'https://yt3.googleusercontent.com/L6ufuunr66tm8_gwk4zB7YwU0rQMbZvrTvA5bvH_oK49kk8kk4fr7Z6j7p5QxBrCHG1HZNZi6A=s900-c-k-c0x00ffffff-no-rj', banner: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=800&auto=format&fit=crop&q=80', badge: 'Minecraft Hub 🧱', isLive: false, themeColor: '#10B981', bgAccent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'yt-roblox', name: 'Roblox UltraOP3', handle: '@ultraop3', platform: 'YouTube', subscribers: '1.6K+', subscriberCountRaw: 1620, views: '108K+', viewCountRaw: 108000, contentCount: '3+ Videos',
    description: 'Roblox gaming adventures! Blox Fruits boss raids, impossible Obby speedruns, Blade Ball tournaments, and funny viewer party sessions.', focus: 'Blox Fruits, Obbies & Blade Ball', url: 'https://www.youtube.com/@ultraop3', subscribeUrl: 'https://www.youtube.com/@ultraop3?sub_confirmation=1', avatar: 'https://yt3.googleusercontent.com/wZ0x3n7GzwjCyX6lAml3vH6RkugBPloy_p8O6QXBKQ6Eb5XR6vAb4QF432DrDLhPLbbOOVCftQ=s900-c-k-c0x00ffffff-no-rj', banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80', badge: 'Roblox Party 🕹️', isLive: false, themeColor: '#3B82F6', bgAccent: 'bg-blue-500/10 text-blue-600 border-blue-500/20', badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'yt-earnings', name: 'Op Earnings', handle: '@ultraopearnings', platform: 'YouTube', subscribers: '1.2K+', subscriberCountRaw: 1200, views: '58.5K+', viewCountRaw: 58500, contentCount: '5+ Videos',
    description: 'Gaming monetization strategies, YouTube creator blueprints, sponsorship pitch frameworks, and sustainable income for gaming streamers.', focus: 'Creator Growth & Gaming Income', url: 'https://www.youtube.com/@ultraopearnings', subscribeUrl: 'https://www.youtube.com/@ultraopearnings?sub_confirmation=1', avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', badge: 'Creator Blueprint 💼', isLive: false, themeColor: '#F59E0B', bgAccent: 'bg-amber-500/10 text-amber-600 border-amber-500/20', badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'ig-earnings', name: 'OP Earnings (Instagram)', handle: '@op_earnings', platform: 'Instagram', subscribers: '18.2K+', subscriberCountRaw: 18200, views: '2.1M+', viewCountRaw: 2100000, contentCount: '180+ Carousels',
    description: 'Quick bite-sized monetization breakdowns, creator revenue case studies, and YouTube algorithm tips in carousels.', focus: 'Monetization Tips & Creator Blueprints', url: 'https://www.instagram.com/op_earnings/', avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', badge: 'Creator Tips 📈', isLive: false, themeColor: '#E1306C', bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20', badgeColor: 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
  },
  {
    id: 'ig-ahsannow', name: 'Ahsan Now (Instagram)', handle: '@ahsannow', platform: 'Instagram', subscribers: '22.4K+', subscriberCountRaw: 22400, views: '3.4M+', viewCountRaw: 3400000, contentCount: '210+ Setup Photos',
    description: 'Aesthetic gaming setups, desk accessories, RGB lighting inspiration, and gadget sneak peeks on Instagram.', focus: 'Desk Aesthetics & Tech Sneak Peeks', url: 'https://www.instagram.com/ahsannow/', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80', badge: 'Aesthetic Setups 🖥️', isLive: false, themeColor: '#E1306C', bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20', badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  },
  {
    id: 'discord-main', name: 'UltraOP Discord Guild', handle: '.gg/ZQ2afmPvuP', platform: 'Discord', subscribers: '10K+', subscriberCountRaw: 10000, views: '1.2K+ Online', viewCountRaw: 1200, contentCount: 'Custom Scrim Rooms',
    description: 'Official Discord gaming community. Receive custom tournament room IDs, team up for ranked pushes, talk in voice lounges, and win diamond giveaways.', focus: 'Custom Tournaments & Squad Voice', url: 'https://discord.gg/ZQ2afmPvuP', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', badge: '10K+ Guild 💬', isLive: false, themeColor: '#5865F2', bgAccent: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', badgeColor: 'bg-[#5865F2] text-white'
  }
];

interface ExploreChannelsPageProps { onBackToHome: () => void; }

export const ExploreChannelsPage: React.FC<ExploreChannelsPageProps> = ({ onBackToHome }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>({});
  const { totalReach, totalViews, totalVideos, isSyncing, refresh, lastUpdated, source, channelMap } = useYouTubeStats();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDocumentSEO(ROUTE_SEO.channels);
  }, []);

  const dynamicChannels = ALL_CREATOR_CHANNELS.map((ch) => {
    const liveMatch = channelMap[`${ch.platform}:${ch.handle}`] || channelMap[`${ch.platform}:${ch.id}`] || channelMap[ch.handle] || channelMap[ch.id] ||
      (ch.id === 'yt-main' ? channelMap['ultraoplive'] || channelMap['UCAxlmL3_721xzOjQVe5Klbg'] : undefined) ||
      (ch.id === 'yt-minecraft' ? channelMap['ultraop2'] || channelMap['UC-ASoLp2wfxVLJFDnVXwrGA'] : undefined) ||
      (ch.id === 'yt-roblox' ? channelMap['ultraop3'] || channelMap['UCKdJiKSiO382Hvczh_Q2kyg'] : undefined) ||
      (ch.id === 'yt-earnings' ? channelMap['ultraopearnings'] || channelMap['op-earnings'] || channelMap['UC-KkWDruqOobwZgylSb4kwA'] : undefined) ||
      (ch.id === 'rooter-main' ? channelMap['rooter-live'] || channelMap['rooter-main'] : undefined) ||
      (ch.id === 'discord-main' ? channelMap['discord-main'] : undefined);

    if (liveMatch) {
      return { ...ch, name: ch.platform === 'YouTube' && liveMatch.name ? liveMatch.name : ch.name, avatar: liveMatch.avatar || ch.avatar, subscribers: liveMatch.subscribers ? liveMatch.subscribers.replace(/\s*(Subscribers|Followers|Members|Fans)$/i, '') : ch.subscribers, subscriberCountRaw: liveMatch.subscriberCountRaw || ch.subscriberCountRaw, views: liveMatch.views ? liveMatch.views.replace(/\s*(Views|Total Views)$/i, '') : ch.views, viewCountRaw: liveMatch.viewCountRaw || ch.viewCountRaw, contentCount: liveMatch.videoCountFormatted || (liveMatch.videoCount ? `${liveMatch.videoCount}+ ${ch.platform === 'YouTube' ? 'Videos' : 'Broadcasts'}` : ch.contentCount), isLive: liveMatch.isLive ?? ch.isLive };
    }
    return ch;
  });

  const handleCardClick = (channel: ComprehensiveChannel, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.subscribe-btn-stop')) return;
    sound.playClick();
    window.open(channel.url, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribeButton = (channel: ComprehensiveChannel, e: React.MouseEvent) => {
    e.stopPropagation(); sound.playScore(); setSubscribedChannels(prev => ({ ...prev, [channel.id]: true })); confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    window.open(channel.subscribeUrl || channel.url, '_blank', 'noopener,noreferrer');
  };

  const platforms = [
    { id: 'all', name: 'All Channels', count: dynamicChannels.length, icon: Globe },
    { id: 'YouTube', name: 'YouTube', count: dynamicChannels.filter(c => c.platform === 'YouTube').length, icon: Youtube },
    { id: 'Twitch', name: 'Twitch', count: dynamicChannels.filter(c => c.platform === 'Twitch').length, icon: Tv },
    { id: 'Kick', name: 'Kick', count: dynamicChannels.filter(c => c.platform === 'Kick').length, icon: Gamepad2 },
    { id: 'Instagram', name: 'Instagram', count: dynamicChannels.filter(c => c.platform === 'Instagram').length, icon: Instagram },
    { id: 'Rooter', name: 'Rooter', count: dynamicChannels.filter(c => c.platform === 'Rooter').length, icon: Radio },
    { id: 'Discord', name: 'Discord', count: dynamicChannels.filter(c => c.platform === 'Discord').length, icon: MessageSquare }
  ];

  const filteredChannels = dynamicChannels.filter(channel => {
    const matchesPlatform = selectedPlatform === 'all' || channel.platform === selectedPlatform;
    const q = searchQuery.toLowerCase();
    return matchesPlatform && (channel.name.toLowerCase().includes(q) || channel.handle.toLowerCase().includes(q) || channel.focus.toLowerCase().includes(q) || channel.description.toLowerCase().includes(q) || channel.platform.toLowerCase().includes(q));
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return <Youtube className="w-4 h-4 text-[#FF3E00]" />;
      case 'Twitch': return <Tv className="w-4 h-4 text-[#9146FF]" />;
      case 'Kick': return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      case 'Instagram': return <Instagram className="w-4 h-4 text-rose-500" />;
      case 'Rooter': return <Radio className="w-4 h-4 text-orange-500" />;
      case 'Discord': return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      default: return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <section id="channels" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-10 gap-4">
          <button onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#121212] hover:text-[#FF3E00]"><ArrowLeft className="w-4 h-4" /> Back Home</button>
          <button onClick={refresh} disabled={isSyncing} className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-black/15 text-[10px] font-black uppercase tracking-wider"><RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> {isSyncing ? 'Syncing' : 'Refresh Stats'}</button>
        </div>
        <div className="mb-10">
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] mb-3">Channels / Creator Network</div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter font-heading">EXPLORE <span className="font-serif-italic font-normal text-[#FF3E00]">the network.</span></h1>
          <p className="mt-4 max-w-2xl text-sm text-[#666] font-medium">Explore the four official YouTube channels and the wider UltraOP creator network across livestreaming, social, community, and creator platforms.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {platforms.map(platform => { const Icon = platform.icon; return <button key={platform.id} onClick={() => setSelectedPlatform(platform.id)} className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 ${selectedPlatform === platform.id ? 'bg-[#121212] text-white' : 'bg-white border border-black/15'}`}><Icon className="w-3.5 h-3.5" />{platform.name} ({platform.count})</button>; })}
        </div>
        <div className="mb-8 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search channels, platforms, or focus..." className="w-full bg-white border border-black/15 pl-10 pr-4 py-3 text-sm outline-none focus:border-black" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map(channel => (
            <article key={channel.id} onClick={e => handleCardClick(channel, e)} className="bg-white border border-black/15 p-6 cursor-pointer hover:border-black transition-all">
              <div className="flex items-center gap-3 mb-4"><img src={channel.avatar} alt={channel.name} className="w-14 h-14 rounded-full object-cover border border-black/20" /><div><h2 className="font-black text-lg font-heading">{channel.name}</h2><p className="text-xs text-[#777] font-mono">{channel.handle}</p></div></div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider mb-3">{getPlatformIcon(channel.platform)} {channel.platform}{channel.isLive && <span className="text-red-600">LIVE</span>}</div>
              <p className="text-xs text-[#666] leading-relaxed mb-5">{channel.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-5"><div className="bg-[#F4F4F1] p-3 border border-black/10"><div className="text-lg font-black">{channel.subscribers}</div><div className="text-[9px] uppercase tracking-wider text-[#777]">Followers</div></div><div className="bg-[#F4F4F1] p-3 border border-black/10"><div className="text-lg font-black">{channel.views || '—'}</div><div className="text-[9px] uppercase tracking-wider text-[#777]">Views</div></div></div>
              <div className="flex gap-2"><button className="subscribe-btn-stop flex-1 py-2.5 bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-wider" onClick={e => handleSubscribeButton(channel, e)}><Youtube className="inline w-3.5 h-3.5 mr-1" /> {subscribedChannels[channel.id] ? 'Subscribed' : 'Visit / Subscribe'}</button><a href={channel.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 bg-white border border-black/15 text-[10px] font-black uppercase">Open</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
