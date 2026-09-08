import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  Radio, 
  ExternalLink, 
  Check, 
  Users, 
  Eye, 
  Video, 
  Sparkles, 
  RefreshCw, 
  Bell, 
  ArrowLeft, 
  Search, 
  Instagram, 
  MessageSquare, 
  ShieldCheck, 
  Flame, 
  Share2, 
  Filter,
  Tv,
  Gamepad2,
  TrendingUp,
  Globe
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
  // 1. YouTube Live Main
  {
    id: 'yt-main',
    name: 'Ultra OP Live',
    handle: '@ultraoplive',
    platform: 'YouTube',
    subscribers: '72K+',
    subscriberCountRaw: 72000,
    views: '19.8M+',
    viewCountRaw: 19800000,
    contentCount: '485+ Videos & Streams',
    description: 'Primary live broadcasting channel! Daily Minecraft hardcore SMP, high-tier Valorant clutches, GTA V stunt sessions, and custom room tournaments.',
    focus: 'Minecraft, Valorant, GTA V & Scrims',
    url: 'https://www.youtube.com/@ultraoplive',
    subscribeUrl: 'https://www.youtube.com/@ultraoplive?sub_confirmation=1',
    avatar: 'https://yt3.googleusercontent.com/9v3vhxLlT_xOVo1qKMH4aDT41QLlxFxraNI20vWjPpG8wZZdEQTRDyJvJngKIKlspJpPgO-8Dg=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    badge: 'Main Live Hub 🔴',
    isLive: true,
    featured: true,
    themeColor: '#FF3E00',
    bgAccent: 'bg-red-500/10 text-[#FF3E00] border-red-500/20',
    badgeColor: 'bg-[#FF3E00] text-white'
  },
  // 2. Twitch Live
  {
    id: 'twitch-main',
    name: 'Ultra OP (Twitch)',
    handle: '@ultraoplive',
    platform: 'Twitch',
    subscribers: '38K+',
    subscriberCountRaw: 38000,
    views: '1.4M+',
    viewCountRaw: 1400000,
    contentCount: '140+ Interactive Streams',
    description: 'Official Twitch live broadcast channel! High-framerate interactive gaming broadcasts, Valorant competitive ranked grinds, Minecraft survival, and live chat challenges.',
    focus: 'Twitch Live Streams & Valorant FPS',
    url: 'https://www.twitch.tv/ultraoplive',
    subscribeUrl: 'https://www.twitch.tv/ultraoplive',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    badge: 'Live on Twitch 🟣',
    isLive: false,
    featured: true,
    themeColor: '#9146FF',
    bgAccent: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    badgeColor: 'bg-[#9146FF] text-white'
  },
  // 3. Kick Live
  {
    id: 'kick-main',
    name: 'Ultra OP (Kick)',
    handle: '@ultra-op-live',
    platform: 'Kick',
    subscribers: '31K+',
    subscriberCountRaw: 31000,
    views: '960K+',
    viewCountRaw: 960000,
    contentCount: '85+ Late Night Squad Streams',
    description: 'Official Kick channel! High-energy live gaming sessions, GTA V modded stunts, subscriber multiplayer games, and late-night community watch parties.',
    focus: 'Kick Live Gaming & GTA V Stunts',
    url: 'https://kick.com/ultra-op-live',
    subscribeUrl: 'https://kick.com/ultra-op-live',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    badge: 'Live on Kick 🟢',
    isLive: false,
    featured: true,
    themeColor: '#53FC18',
    bgAccent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    badgeColor: 'bg-emerald-600 text-white'
  },
  // 4. Instagram Official
  {
    id: 'ig-main',
    name: 'Ahsan UltraOP (Instagram)',
    handle: '@ultraopp',
    platform: 'Instagram',
    subscribers: '45.8K+',
    subscriberCountRaw: 45800,
    views: '8.5M+',
    viewCountRaw: 8500000,
    contentCount: '320+ Posts & Reels',
    description: 'Official Instagram of Sk Ahsan Ahmad. Daily streamer desk setups, behind-the-scenes tournament stories, viral clutch reels, and community updates.',
    focus: 'Daily Stream Setups & Viral Reels',
    url: 'https://www.instagram.com/ultraopp/',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    badge: 'Verified Creator 📸',
    isLive: false,
    featured: true,
    themeColor: '#E1306C',
    bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    badgeColor: 'bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white'
  },
  // 5. Rooter Esports HQ
  {
    id: 'rooter-main',
    name: 'Ultra OP (Rooter)',
    handle: '@ultraop142404154',
    platform: 'Rooter',
    subscribers: '515.9K+',
    subscriberCountRaw: 515900,
    views: '65.2M+',
    viewCountRaw: 65200000,
    contentCount: '1,700+ Live Broadcasts',
    description: 'Historic Rooter streaming headquarters with over 515K+ followers. Hosts verified esports custom rooms, diamond tournaments, and daily scrim broadcasts.',
    focus: 'Esports Scrims & Tournament Rooms',
    url: 'https://www.rooter.gg/profile/142404154',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    badge: '515K+ Flagship 🏆',
    isLive: false,
    featured: true,
    themeColor: '#FF7A00',
    bgAccent: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    badgeColor: 'bg-[#121212] text-white'
  },
  // 6. YouTube Minecraft & SMP
  {
    id: 'yt-minecraft',
    name: 'Ultra OP 2.0 (Minecraft)',
    handle: '@ultraop2',
    platform: 'YouTube',
    subscribers: '72K+',
    subscriberCountRaw: 72000,
    views: '16.5M+',
    viewCountRaw: 16500000,
    contentCount: '125+ Videos & Streams',
    description: 'Dedicated Minecraft SMP Hub! Hardcore 100 days survival challenges, massive redstone automated farms, Nether speedruns, and subscriber realms.',
    focus: 'Hardcore Survival & Redstone SMP',
    url: 'https://www.youtube.com/@ultraop2',
    subscribeUrl: 'https://www.youtube.com/@ultraop2?sub_confirmation=1',
    avatar: 'https://yt3.googleusercontent.com/L6ufuunr66tm8_gwk4zB7YwU0rQMbZvrTvA5bvH_oK49kk8kk4fr7Z6j7p5QxBrCHG1HZNZi6A=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=800&auto=format&fit=crop&q=80',
    badge: 'Minecraft Hub 🧱',
    isLive: false,
    themeColor: '#10B981',
    bgAccent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    badgeColor: 'bg-emerald-600 text-white'
  },
  // 7. YouTube Roblox & Fun
  {
    id: 'yt-roblox',
    name: 'Roblox UltraOP3',
    handle: '@ultraop3',
    platform: 'YouTube',
    subscribers: '1.6K+',
    subscriberCountRaw: 1620,
    views: '108K+',
    viewCountRaw: 108000,
    contentCount: '3+ Videos',
    description: 'Roblox gaming adventures! Blox Fruits boss raids, impossible Obby speedruns, Blade Ball tournaments, and funny viewer party sessions.',
    focus: 'Blox Fruits, Obbies & Blade Ball',
    url: 'https://www.youtube.com/@ultraop3',
    subscribeUrl: 'https://www.youtube.com/@ultraop3?sub_confirmation=1',
    avatar: 'https://yt3.googleusercontent.com/wZ0x3n7GzwjCyX6lAml3vH6RkugBPloy_p8O6QXBKQ6Eb5XR6vAb4QF432DrDLhPLbbOOVCftQ=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    badge: 'Roblox Party 🕹️',
    isLive: false,
    themeColor: '#3B82F6',
    bgAccent: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    badgeColor: 'bg-blue-600 text-white'
  },
  // 8. YouTube OP Earnings
  {
    id: 'yt-earnings',
    name: 'Op Earnings',
    handle: '@ultraopearnings',
    platform: 'YouTube',
    subscribers: '1.2K+',
    subscriberCountRaw: 1200,
    views: '58.5K+',
    viewCountRaw: 58500,
    contentCount: '5+ Videos',
    description: 'Gaming monetization strategies, YouTube creator blueprints, sponsorship pitch frameworks, and sustainable income for gaming streamers.',
    focus: 'Creator Growth & Gaming Income',
    url: 'https://www.youtube.com/@ultraopearnings',
    subscribeUrl: 'https://www.youtube.com/@ultraopearnings?sub_confirmation=1',
    avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    badge: 'Creator Blueprint 💼',
    isLive: false,
    themeColor: '#F59E0B',
    bgAccent: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    badgeColor: 'bg-amber-600 text-white'
  },
  // 9. Instagram OP Earnings
  {
    id: 'ig-earnings',
    name: 'OP Earnings (Instagram)',
    handle: '@op_earnings',
    platform: 'Instagram',
    subscribers: '18.2K+',
    subscriberCountRaw: 18200,
    views: '2.1M+',
    viewCountRaw: 2100000,
    contentCount: '180+ Carousels',
    description: 'Quick bite-sized monetization breakdowns, creator revenue case studies, and YouTube algorithm tips in carousels.',
    focus: 'Monetization Tips & Creator Blueprints',
    url: 'https://www.instagram.com/op_earnings/',
    avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    badge: 'Creator Tips 📈',
    isLive: false,
    themeColor: '#E1306C',
    bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    badgeColor: 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
  },
  // 10. Instagram Ahsan Now
  {
    id: 'ig-ahsannow',
    name: 'Ahsan Now (Instagram)',
    handle: '@ahsannow',
    platform: 'Instagram',
    subscribers: '22.4K+',
    subscriberCountRaw: 22400,
    views: '3.4M+',
    viewCountRaw: 3400000,
    contentCount: '210+ Setup Photos',
    description: 'Aesthetic gaming setups, desk accessories, RGB lighting inspiration, and gadget sneak peeks on Instagram.',
    focus: 'Desk Aesthetics & Tech Sneak Peeks',
    url: 'https://www.instagram.com/ahsannow/',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    badge: 'Aesthetic Setups 🖥️',
    isLive: false,
    themeColor: '#E1306C',
    bgAccent: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  },
  // 11. Discord Community
  {
    id: 'discord-main',
    name: 'UltraOP Discord Guild',
    handle: '.gg/ZQ2afmPvuP',
    platform: 'Discord',
    subscribers: '10K+',
    subscriberCountRaw: 10000,
    views: '1.2K+ Online',
    viewCountRaw: 1200,
    contentCount: 'Custom Scrim Rooms',
    description: 'Official Discord gaming community. Receive custom tournament room IDs, team up for ranked pushes, talk in voice lounges, and win diamond giveaways.',
    focus: 'Custom Tournaments & Squad Voice',
    url: 'https://discord.gg/ZQ2afmPvuP',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    badge: '10K+ Guild 💬',
    isLive: false,
    themeColor: '#5865F2',
    bgAccent: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    badgeColor: 'bg-[#5865F2] text-white'
  }
];

interface ExploreChannelsPageProps {
  onBackToHome: () => void;
}

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
    // Map live stats if channel matches live channelMap
    const liveMatch =
      channelMap[`${ch.platform}:${ch.handle}`] ||
      channelMap[`${ch.platform}:${ch.id}`] ||
      channelMap[ch.handle] ||
      channelMap[ch.id] ||
      (ch.id === 'yt-main' ? channelMap['ultraoplive'] || channelMap['UCAxlmL3_721xzOjQVe5Klbg'] : undefined) ||
      (ch.id === 'yt-minecraft' ? channelMap['ultraop2'] || channelMap['UC-ASoLp2wfxVLJFDnVXwrGA'] : undefined) ||
      (ch.id === 'yt-roblox' ? channelMap['ultraop3'] || channelMap['UCKdJiKSiO382Hvczh_Q2kyg'] : undefined) ||
      (ch.id === 'yt-earnings' ? channelMap['ultraopearnings'] || channelMap['op-earnings'] || channelMap['UC-KkWDruqOobwZgylSb4kwA'] : undefined) ||
      (ch.id === 'rooter-main' ? channelMap['rooter-live'] || channelMap['rooter-main'] : undefined) ||
      (ch.id === 'discord-main' ? channelMap['discord-main'] : undefined);

    if (liveMatch) {
      return {
        ...ch,
        name: ch.platform === 'YouTube' && liveMatch.name ? liveMatch.name : ch.name,
        avatar: liveMatch.avatar || ch.avatar,
        subscribers: liveMatch.subscribers ? liveMatch.subscribers.replace(/\s*(Subscribers|Followers|Members|Fans)$/i, '') : ch.subscribers,
        subscriberCountRaw: liveMatch.subscriberCountRaw || ch.subscriberCountRaw,
        views: liveMatch.views ? liveMatch.views.replace(/\s*(Views|Total Views)$/i, '') : ch.views,
        viewCountRaw: liveMatch.viewCountRaw || ch.viewCountRaw,
        contentCount: liveMatch.videoCountFormatted || (liveMatch.videoCount ? `${liveMatch.videoCount}+ ${ch.platform === 'YouTube' ? 'Videos' : 'Broadcasts'}` : ch.contentCount),
        isLive: liveMatch.isLive ?? ch.isLive
      };
    }
    return ch;
  });

  const handleCardClick = (channel: ComprehensiveChannel, e: React.MouseEvent) => {
    // If the user clicked the direct subscribe button, handle subscription
    const target = e.target as HTMLElement;
    if (target.closest('.subscribe-btn-stop')) {
      return;
    }

    sound.playClick();
    window.open(channel.url, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribeButton = (channel: ComprehensiveChannel, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playScore();

    setSubscribedChannels(prev => ({ ...prev, [channel.id]: true }));
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    const targetUrl = channel.subscribeUrl || channel.url;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
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
    const matchesSearch = 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.platform.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPlatform && matchesSearch;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-[#FF3E00]" />;
      case 'Twitch':
        return <Tv className="w-4 h-4 text-[#9146FF]" />;
      case 'Kick':
        return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-rose-500" />;
      case 'Rooter':
        return <Radio className="w-4 h-4 text-orange-500" />;
      case 'Discord':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#121212] pt-24 pb-28 selection:bg-[#FF3E00] selection:text-white">
      {/* Top Breadcrumb & Back Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          id="back-to-home-btn"
          onClick={() => {
            sound.playClick();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black/15 hover:border-black text-[#121212] hover:bg-[#121212] hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Hub</span>
        </button>
      </div>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="mb-12">
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-3">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>Official Creator Channels Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#121212] tracking-tighter leading-none font-heading mb-4">
            ALL CHANNELS <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl md:text-7xl">
              & streaming destinations.
            </span>
          </h1>

          <p className="text-[#555555] text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
            Explore and connect with all official platforms of <strong>UltraOP (Sk Ahsan Ahmad)</strong> across YouTube, Twitch, Kick, Instagram, Rooter, and Discord. Click any channel card to navigate directly.
          </p>
        </div>

        {/* Global Network Analytics Ribbon - Structured to Prevent Any Overlap */}
        <div className="bg-white border border-black/15 p-5 sm:p-7 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#121212] text-white shrink-0">
                <TrendingUp className="w-5 h-5 text-[#FF3E00]" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-2">
                  <span>UltraOP Verified Network Total</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider">
                    Live Verified
                  </span>
                </div>
                <div className="text-[11px] text-[#666] font-medium mt-0.5">
                  Aggregated across {ALL_CREATOR_CHANNELS.length} verified channel outlets
                </div>
              </div>
            </div>

            {/* Individual Non-Overlapping Stat Containers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-black/10 pt-4 lg:pt-0 lg:pl-8">
              <div className="bg-[#F4F4F1] p-3 border border-black/10 flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap">
                  {totalReach}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-1 whitespace-nowrap">
                  Total Subscribers & Followers
                </div>
              </div>

              <div className="bg-[#F4F4F1] p-3 border border-black/10 flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FF3E00] font-heading tracking-tight whitespace-nowrap">
                  {totalViews}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-1 whitespace-nowrap">
                  Lifetime Total Views
                </div>
              </div>

              <div className="bg-[#F4F4F1] p-3 border border-black/10 flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap">
                  {totalVideos}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-1 whitespace-nowrap">
                  Videos & Live Broadcasts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/10">
          {/* Platform Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {platforms.map(p => {
              const Icon = p.icon;
              const isActive = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  id={`filter-channel-${p.id.toLowerCase()}`}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPlatform(p.id);
                  }}
                  className={`px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#121212] text-white shadow-sm'
                      : 'bg-white text-[#121212] border border-black/15 hover:border-black'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF3E00]' : 'text-[#666]'}`} />
                  <span>{p.name} ({p.count})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="channels-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channel or platform..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-black/15 focus:border-black focus:outline-none text-xs font-medium text-[#121212] placeholder-gray-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Channels Cards Grid - Each item as a standalone clickable card */}
        {filteredChannels.length === 0 ? (
          <div className="bg-white border border-black/15 p-12 text-center my-8">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-[#121212] font-heading mb-1">No channels found</h3>
            <p className="text-xs text-gray-500 mb-4">No channels match "{searchQuery}" under {selectedPlatform}.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatform('all');
              }}
              className="px-5 py-2.5 bg-[#121212] text-white text-[10px] font-black uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.map((channel, idx) => {
              const isSubscribed = !!subscribedChannels[channel.id];

              return (
                <div
                  key={channel.id}
                  id={`channel-card-${channel.id}`}
                  onClick={(e) => handleCardClick(channel, e)}
                  className="group relative bg-white border border-black/15 hover:border-black p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm cursor-pointer hover:shadow-xl"
                >
                  <div>
                    {/* Top Meta Line: Platform Badge & Step Index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 ${channel.badgeColor}`}>
                          {getPlatformIcon(channel.platform)}
                          <span>{channel.platform}</span>
                        </span>
                        {channel.badge && (
                          <span className="px-2 py-0.5 bg-[#F4F4F1] border border-black/10 text-[9px] font-bold text-[#444] uppercase tracking-wider">
                            {channel.badge}
                          </span>
                        )}
                      </div>

                      <span className="font-serif-italic font-normal text-2xl text-[#999999] group-hover:text-[#FF3E00] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Channel Header Profile Avatar & Names */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative shrink-0">
                        <img
                          src={channel.avatar}
                          alt={channel.name}
                          className="w-14 h-14 rounded-full object-cover border border-black/20 group-hover:scale-105 transition-transform"
                        />
                        {channel.isLive && (
                          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3E00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF3E00]"></span>
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-black text-[#121212] group-hover:text-[#FF3E00] transition-colors font-heading tracking-tight truncate">
                          {channel.name}
                        </h3>
                        <p className="text-xs text-[#777777] font-mono truncate">{channel.handle}</p>
                      </div>
                    </div>

                    {/* Focus Description */}
                    <p className="text-[#555555] text-xs leading-relaxed mb-5 font-medium line-clamp-2">
                      {channel.description}
                    </p>

                    {/* Stats Box - Highlights Subscribers & Followers Prominently */}
                    <div className="bg-[#F4F4F1] p-3.5 border border-black/10 mb-5 space-y-2 text-xs">
                      {/* Metric 1: Subscribers / Followers */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#666666] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#121212]" />
                          {channel.platform === 'Twitch' || channel.platform === 'Kick' || channel.platform === 'Instagram' || channel.platform === 'Rooter' ? 'Followers' : channel.platform === 'Discord' ? 'Members' : 'Subscribers'}:
                        </span>
                        <strong className="text-sm font-black text-[#121212] font-mono">
                          {channel.subscribers}
                        </strong>
                      </div>

                      {/* Metric 2: Views / Total Broadcasts */}
                      {channel.views && (
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#666666] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-[#121212]" />
                            Total Views:
                          </span>
                          <strong className="text-xs font-black text-[#FF3E00] font-mono">
                            {channel.views}
                          </strong>
                        </div>
                      )}

                      {/* Metric 3: Content / Broadcast Count */}
                      {channel.contentCount && (
                        <div className="flex items-center justify-between text-[#666666]">
                          <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5 text-[#121212]" />
                            Catalog:
                          </span>
                          <span className="text-xs font-bold text-[#121212]">
                            {channel.contentCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Direct Action Links */}
                  <div className="space-y-2 pt-3 border-t border-black/10">
                    {/* Primary Button */}
                    <button
                      onClick={(e) => handleSubscribeButton(channel, e)}
                      className={`subscribe-btn-stop w-full py-3 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-sm ${
                        isSubscribed
                          ? 'bg-emerald-600 text-white'
                          : channel.platform === 'YouTube'
                          ? 'bg-[#FF3E00] hover:bg-[#121212] text-white'
                          : channel.platform === 'Twitch'
                          ? 'bg-[#9146FF] hover:bg-[#121212] text-white'
                          : channel.platform === 'Kick'
                          ? 'bg-emerald-600 hover:bg-[#121212] text-white'
                          : channel.platform === 'Instagram'
                          ? 'bg-rose-600 hover:bg-[#121212] text-white'
                          : 'bg-[#121212] hover:bg-[#FF3E00] text-white'
                      }`}
                    >
                      {isSubscribed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>SUBSCRIBED & FOLLOWED</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5" />
                          <span>
                            {channel.platform === 'YouTube' 
                              ? 'Subscribe (1-Click Pop-Up)' 
                              : `Follow on ${channel.platform}`}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Secondary Direct Link */}
                    <div className="w-full py-2 bg-white hover:bg-[#121212] hover:text-white border border-black/15 text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all">
                      <span>Open {channel.platform} Platform</span>
                      <ExternalLink className="w-3 h-3 text-[#FF3E00]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
