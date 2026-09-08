/**
 * YouTube Real-Time Data & Multi-Channel Aggregator Service for UltraOP
 * 
 * Channels:
 * 1. UltraOpLive: UCAxlmL3_721xzOjQVe5Klbg
 * 2. Op Earnings: UC-KkWDruqOobwZgylSb4kwA
 * 3. UltraOP2: UC-ASoLp2wfxVLJFDnVXwrGA
 * 4. Roblox UltraOP3: UCKdJiKSiO382Hvczh_Q2kyg
 * 
 * Note: Rooter data (515.9K+ Followers, 65.2M+ Views) is preserved as a separate platform.
 */

export interface YouTubeChannelConfig {
  id: string;
  channelId: string;
  name: string;
  handle: string;
  platform: 'YouTube';
  focus: string;
  defaultSubscribers: number;
  defaultViews: number;
  defaultVideos: number;
  avatar: string;
  banner: string;
  url: string;
  subscribeUrl: string;
  themeColor: string;
}

export interface ChannelStatsData {
  id: string;
  channelId?: string;
  name: string;
  handle: string;
  platform: 'YouTube' | 'Rooter' | 'Twitch' | 'Kick' | 'Discord' | 'Instagram';
  subscribers: string;
  subscriberCountRaw: number;
  views: string;
  viewCountRaw: number;
  videoCount: number;
  videoCountFormatted: string;
  description?: string;
  focus: string;
  url: string;
  subscribeUrl?: string;
  avatar: string;
  banner?: string;
  isLive: boolean;
  liveTitle?: string;
  liveVideoId?: string;
  liveViewers?: string;
}

export interface DynamicVideo {
  id: string;
  videoId: string;
  title: string;
  views: string;
  viewCountRaw: number;
  duration: string;
  date: string;
  publishedAt: string;
  channel: string;
  channelId: string;
  channelHandle: string;
  category: string;
  categories: string[];
  thumbnail: string;
  videoUrl: string;
  description: string;
  isLive?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface AggregatedStatsResponse {
  updatedAt: string;
  // Combined 4-Channel YouTube Totals
  youtubeTotals: {
    subscriberCountRaw: number;
    subscribersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    videoCountRaw: number;
    videosFormatted: string;
  };
  // Standalone Rooter Flagship (515.9K+ separate)
  rooterTotals: {
    followerCountRaw: number;
    followersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    broadcastsRaw: number;
    broadcastsFormatted: string;
  };
  // Combined Whole Network (YouTube 4-channels + Rooter + Twitch + Kick)
  totalReach: string;
  totalViews: string;
  totalVideos: string;
  channels: ChannelStatsData[];
  liveStatus: {
    isAnyLive: boolean;
    activeLiveChannels: {
      channelId: string;
      channelName: string;
      title: string;
      videoId: string;
      url: string;
      thumbnail: string;
      viewers?: string;
    }[];
  };
}

// 4 Official YouTube Channels with Authoritative Channel IDs
export const YT_CHANNELS: YouTubeChannelConfig[] = [
  {
    id: 'yt-main',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    name: 'Ultra OP Live',
    handle: '@ultraoplive',
    platform: 'YouTube',
    focus: 'Minecraft, Valorant, GTA V & Scrims',
    defaultSubscribers: 72000,
    defaultViews: 19800000,
    defaultVideos: 485,
    avatar: 'https://yt3.googleusercontent.com/9v3vhxLlT_xOVo1qKMH4aDT41QLlxFxraNI20vWjPpG8wZZdEQTRDyJvJngKIKlspJpPgO-8Dg=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    url: 'https://www.youtube.com/@ultraoplive',
    subscribeUrl: 'https://www.youtube.com/@ultraoplive?sub_confirmation=1',
    themeColor: '#FF3E00'
  },
  {
    id: 'yt-earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    name: 'Op Earnings',
    handle: '@ultraopearnings',
    platform: 'YouTube',
    focus: 'Gaming Monetization, Creator Guides & Growth',
    defaultSubscribers: 1200,
    defaultViews: 58500,
    defaultVideos: 5,
    avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    url: 'https://www.youtube.com/@ultraopearnings',
    subscribeUrl: 'https://www.youtube.com/@ultraopearnings?sub_confirmation=1',
    themeColor: '#F59E0B'
  },
  {
    id: 'yt-minecraft',
    channelId: 'UC-ASoLp2wfxVLJFDnVXwrGA',
    name: 'Ultra OP 2.0 (Minecraft)',
    handle: '@ultraop2',
    platform: 'YouTube',
    focus: 'Minecraft Hardcore Survival, SMP & Redstone',
    defaultSubscribers: 72000,
    defaultViews: 16500000,
    defaultVideos: 125,
    avatar: 'https://yt3.googleusercontent.com/L6ufuunr66tm8_gwk4zB7YwU0rQMbZvrTvA5bvH_oK49kk8kk4fr7Z6j7p5QxBrCHG1HZNZi6A=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=1200&auto=format&fit=crop&q=80',
    url: 'https://www.youtube.com/@ultraop2',
    subscribeUrl: 'https://www.youtube.com/@ultraop2?sub_confirmation=1',
    themeColor: '#10B981'
  },
  {
    id: 'yt-roblox',
    channelId: 'UCKdJiKSiO382Hvczh_Q2kyg',
    name: 'Roblox UltraOP3',
    handle: '@ultraop3',
    platform: 'YouTube',
    focus: 'Roblox Adventures, Blox Fruits & Obbies',
    defaultSubscribers: 1620,
    defaultViews: 108000,
    defaultVideos: 3,
    avatar: 'https://yt3.googleusercontent.com/wZ0x3n7GzwjCyX6lAml3vH6RkugBPloy_p8O6QXBKQ6Eb5XR6vAb4QF432DrDLhPLbbOOVCftQ=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    url: 'https://www.youtube.com/@ultraop3',
    subscribeUrl: 'https://www.youtube.com/@ultraop3?sub_confirmation=1',
    themeColor: '#3B82F6'
  }
];

// Standalone Non-YouTube Platforms (Rooter, Twitch, Kick, Instagram, Discord)
export const OTHER_PLATFORMS: ChannelStatsData[] = [
  {
    id: 'rooter-main',
    name: 'Ultra OP Rooter Esports',
    handle: '@ultraop142404154',
    platform: 'Rooter',
    subscribers: '515.9K+',
    subscriberCountRaw: 515900,
    views: '65.2M+',
    viewCountRaw: 65200000,
    videoCount: 1700,
    videoCountFormatted: '1,700+ Live Broadcasts',
    focus: 'Esports Scrims & Tournament Rooms',
    url: 'https://www.rooter.gg/profile/142404154',
    subscribeUrl: 'https://www.rooter.gg/profile/142404154',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: false
  },
  {
    id: 'twitch-main',
    name: 'Ultra OP (Twitch)',
    handle: '@ultraoplive',
    platform: 'Twitch',
    subscribers: '38K+',
    subscriberCountRaw: 38000,
    views: '1.4M+',
    viewCountRaw: 1400000,
    videoCount: 140,
    videoCountFormatted: '140+ Interactive Streams',
    focus: 'Twitch Live Streams & Valorant FPS',
    url: 'https://www.twitch.tv/ultraoplive',
    subscribeUrl: 'https://www.twitch.tv/ultraoplive',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: false
  },
  {
    id: 'kick-main',
    name: 'Ultra OP (Kick)',
    handle: '@ultra-op-live',
    platform: 'Kick',
    subscribers: '31K+',
    subscriberCountRaw: 31000,
    views: '960K+',
    viewCountRaw: 960000,
    videoCount: 85,
    videoCountFormatted: '85+ Squad Streams',
    focus: 'Kick Live Gaming & GTA V Stunts',
    url: 'https://kick.com/ultra-op-live',
    subscribeUrl: 'https://kick.com/ultra-op-live',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    isLive: false
  },
  {
    id: 'ig-main',
    name: 'Ahsan UltraOP (Instagram)',
    handle: '@ultraopp',
    platform: 'Instagram',
    subscribers: '45.8K+',
    subscriberCountRaw: 45800,
    views: '8.5M+',
    viewCountRaw: 8500000,
    videoCount: 320,
    videoCountFormatted: '320+ Posts & Reels',
    focus: 'Daily Stream Setups & Viral Reels',
    url: 'https://www.instagram.com/ultraopp/',
    subscribeUrl: 'https://www.instagram.com/ultraopp/',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    isLive: false
  },
  {
    id: 'discord-main',
    name: 'UltraOP Discord Guild',
    handle: 'discord.gg/ZQ2afmPvuP',
    platform: 'Discord',
    subscribers: '10,000+',
    subscriberCountRaw: 10000,
    views: '1.2K+ Online',
    viewCountRaw: 1200,
    videoCount: 24,
    videoCountFormatted: 'Custom Scrim Rooms',
    focus: 'Custom Tournaments & Squad Voice',
    url: 'https://discord.gg/ZQ2afmPvuP',
    subscribeUrl: 'https://discord.gg/ZQ2afmPvuP',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: false
  }
];

export function formatNumberWithSuffix(num: number): string {
  if (!num || isNaN(num)) return '0';
  if (num >= 1000000000) {
    const val = (num / 1000000000).toFixed(1).replace(/\.0$/, '');
    return `${val}B+`;
  }
  if (num >= 1000000) {
    const val = (num / 1000000).toFixed(1).replace(/\.0$/, '');
    return `${val}M+`;
  }
  if (num >= 1000) {
    const val = (num / 1000).toFixed(1).replace(/\.0$/, '');
    return `${val}K+`;
  }
  return `${num.toLocaleString()}+`;
}

export function formatExactNumber(num: number): string {
  if (!num || isNaN(num)) return '0';
  return num.toLocaleString();
}

export function parseRelativeTime(publishedAt: string): string {
  try {
    const pub = new Date(publishedAt).getTime();
    const now = Date.now();
    const diffMs = now - pub;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMin > 0) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
    return 'Just now';
  } catch {
    return 'Recently';
  }
}

export function classifyVideoData(
  channelId: string,
  channelName: string,
  title: string,
  desc: string = '',
  rawIsLive?: boolean
): { categories: string[]; primaryCategory: string; isLive: boolean; duration: string } {
  const text = `${title} ${desc}`.toLowerCase();
  const categories: string[] = [];

  // Determine if it is a live stream or past broadcast
  const hasLiveIndicator =
    rawIsLive === true ||
    title.includes('🔴') ||
    text.includes('live stream') ||
    text.includes('live in ind') ||
    text.includes('streamed live') ||
    text.includes('live after a long break') ||
    text.includes('bedwars live') ||
    text.includes('valorant live') ||
    text.includes('minecraft live') ||
    text.includes('chill stream');

  const isExplicitNormalUpload =
    text.includes('redeem code') ||
    text.includes('how to get') ||
    text.includes('#shorts') ||
    text.includes('sniper arena | full gameplay') ||
    text.includes('top 1 -') ||
    text.includes('part- 2');

  const isLive = hasLiveIndicator && !isExplicitNormalUpload;

  if (isLive) {
    categories.push('Live Streams');
  }

  // 1. OP Earnings Channel (UC-KkWDruqOobwZgylSb4kwA) -> EARNINGS
  if (
    channelId === 'UC-KkWDruqOobwZgylSb4kwA' ||
    channelName.toLowerCase().includes('earnings') ||
    text.includes('redeem code') ||
    text.includes('earnings') ||
    text.includes('monetiz') ||
    text.includes('diamond app') ||
    text.includes('google play redeem')
  ) {
    categories.push('Earnings');
  }

  // 2. Minecraft Content (Channel UC-ASoLp2wfxVLJFDnVXwrGA and Minecraft streams/videos)
  if (
    channelId === 'UC-ASoLp2wfxVLJFDnVXwrGA' ||
    text.includes('minecraft') ||
    text.includes('bedwars') ||
    text.includes('applemc') ||
    text.includes('survival') ||
    text.includes('smp') ||
    text.includes('pickaxe') ||
    text.includes('netherite')
  ) {
    categories.push('Minecraft');
  }

  // 3. Roblox Content (Channel UCKdJiKSiO382Hvczh_Q2kyg and Roblox videos)
  if (
    (channelId === 'UCKdJiKSiO382Hvczh_Q2kyg' && !text.includes('valo')) ||
    text.includes('roblox') ||
    text.includes('blox fruits') ||
    text.includes('blade ball') ||
    text.includes('sniper arena') ||
    text.includes('obby')
  ) {
    categories.push('Roblox');
  }

  // 4. Valorant Content
  if (
    text.includes('valorant') ||
    text.includes('valo ') ||
    text.includes('valo live') ||
    text.includes('vandal') ||
    text.includes('reyna') ||
    text.includes('radiant aim') ||
    text.includes('ranked gameplay')
  ) {
    categories.push('Valorant');
  }

  // 5. Tech & Gadgets Content
  if (
    text.includes('tech') ||
    text.includes('gadget') ||
    text.includes('pc build') ||
    text.includes('unboxing') ||
    text.includes('hardware') ||
    text.includes('setup upgrade') ||
    text.includes('desk setup')
  ) {
    categories.push('Tech & Gadgets');
  }

  // 6. Highlights Content (Strictly title/content keywords: Highlights, Best Moments, Kill Streak, etc.)
  if (
    text.includes('highlight') ||
    text.includes('highlights') ||
    text.includes('best moments') ||
    text.includes('top moments') ||
    text.includes('clutch highlights') ||
    text.includes('kill streak') ||
    text.includes('sniper moments') ||
    text.includes('insane sniper')
  ) {
    categories.push('Highlights');
  }

  // Primary Category Selection
  let primaryCategory = 'Minecraft';
  if (channelId === 'UC-KkWDruqOobwZgylSb4kwA') {
    primaryCategory = 'Earnings';
  } else if (categories.includes('Minecraft')) {
    primaryCategory = 'Minecraft';
  } else if (categories.includes('Roblox')) {
    primaryCategory = 'Roblox';
  } else if (categories.includes('Valorant')) {
    primaryCategory = 'Valorant';
  } else if (categories.includes('Earnings')) {
    primaryCategory = 'Earnings';
  } else if (categories.includes('Tech & Gadgets')) {
    primaryCategory = 'Tech & Gadgets';
  } else if (categories.includes('Live Streams')) {
    primaryCategory = 'Live Streams';
  } else if (categories.includes('Highlights')) {
    primaryCategory = 'Highlights';
  }

  const duration = isLive ? 'LIVE' : text.includes('#shorts') ? 'SHORT' : 'HD Video';

  return { categories, primaryCategory, isLive, duration };
}

export function categorizeVideo(title: string, desc: string, channelName: string): string {
  const result = classifyVideoData('', channelName, title, desc);
  return result.primaryCategory;
}

class YouTubeService {
  private channelStats: Map<string, ChannelStatsData> = new Map();
  private videos: DynamicVideo[] = [];
  private lastFetchTime = 0;
  private isFetching = false;

  constructor() {
    this.initDefaultState();
  }

  private initDefaultState() {
    // Populate defaults for all 4 YouTube channels
    for (const c of YT_CHANNELS) {
      this.channelStats.set(c.channelId, {
        id: c.id,
        channelId: c.channelId,
        name: c.name,
        handle: c.handle,
        platform: 'YouTube',
        subscribers: formatNumberWithSuffix(c.defaultSubscribers),
        subscriberCountRaw: c.defaultSubscribers,
        views: formatNumberWithSuffix(c.defaultViews),
        viewCountRaw: c.defaultViews,
        videoCount: c.defaultVideos,
        videoCountFormatted: `${c.defaultVideos}+ Videos`,
        focus: c.focus,
        url: c.url,
        subscribeUrl: c.subscribeUrl,
        avatar: c.avatar,
        banner: c.banner,
        isLive: false
      });
    }
  }

  public async fetchAllData(force = false): Promise<void> {
    const now = Date.now();
    // Cache for 3 minutes unless forced
    if (!force && now - this.lastFetchTime < 3 * 60 * 1000 && this.videos.length > 0) {
      return;
    }
    if (this.isFetching) return;

    this.isFetching = true;
    try {
      await Promise.all([
        this.fetchChannelStats(),
        this.fetchChannelVideos(),
        this.checkLiveStatus(),
        this.fetchDiscordMetrics()
      ]);
      this.lastFetchTime = Date.now();
    } catch (err) {
      console.error('[YouTubeService] Error updating YouTube data:', err);
    } finally {
      this.isFetching = false;
    }
  }

  private async fetchDiscordMetrics(): Promise<void> {
    try {
      const res = await fetch('https://discord.com/api/v10/invites/ZQ2afmPvuP?with_counts=true', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const json: any = await res.json();
        const memberCount = json.approximate_member_count;
        const onlineCount = json.approximate_presence_count;
        const discordCh = OTHER_PLATFORMS.find(p => p.id === 'discord-main' || p.platform === 'Discord');
        if (discordCh && memberCount) {
          discordCh.subscriberCountRaw = memberCount;
          discordCh.subscribers = `${formatNumberWithSuffix(memberCount)} Members`;
          if (onlineCount) {
            discordCh.viewCountRaw = onlineCount;
            discordCh.views = `${formatNumberWithSuffix(onlineCount)} Online`;
          }
        }
      }
    } catch (e) {
      // Safe fallback remains active
    }
  }

  private async fetchChannelStats(): Promise<void> {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (apiKey) {
      try {
        const channelIds = YT_CHANNELS.map(c => c.channelId).join(',');
        const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelIds}&key=${apiKey}`);
        if (res.ok) {
          const json: any = await res.json();
          if (json.items && Array.isArray(json.items)) {
            for (const item of json.items) {
              const chConfig = YT_CHANNELS.find(c => c.channelId === item.id);
              if (!chConfig) continue;

              const stats = item.statistics || {};
              const snippet = item.snippet || {};

              // Validate channel name matches expected channel identity
              const titleLower = (snippet.title || '').toLowerCase();
              const isNameValid =
                (chConfig.channelId === 'UCAxlmL3_721xzOjQVe5Klbg' && (titleLower.includes('ultra') || titleLower.includes('op') || titleLower.includes('live'))) ||
                (chConfig.channelId === 'UC-KkWDruqOobwZgylSb4kwA' && (titleLower.includes('earnings') || titleLower.includes('op') || titleLower.includes('ultra'))) ||
                (chConfig.channelId === 'UC-ASoLp2wfxVLJFDnVXwrGA' && (titleLower.includes('ultra') || titleLower.includes('2.0') || titleLower.includes('op') || titleLower.includes('minecraft') || titleLower.includes('ultraop'))) ||
                (chConfig.channelId === 'UCKdJiKSiO382Hvczh_Q2kyg' && (titleLower.includes('roblox') || titleLower.includes('ultra') || titleLower.includes('3.0') || titleLower.includes('op')));

              const subsRaw = parseInt(stats.subscriberCount || `${chConfig.defaultSubscribers}`, 10);
              const viewsRaw = parseInt(stats.viewCount || `${chConfig.defaultViews}`, 10);
              const videosRaw = parseInt(stats.videoCount || `${chConfig.defaultVideos}`, 10);

              const avatarUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || chConfig.avatar;

              this.channelStats.set(item.id, {
                id: chConfig.id,
                channelId: item.id,
                name: (isNameValid && snippet.title) ? snippet.title : chConfig.name,
                handle: snippet.customUrl ? (snippet.customUrl.startsWith('@') ? snippet.customUrl : `@${snippet.customUrl}`) : chConfig.handle,
                platform: 'YouTube',
                subscribers: formatNumberWithSuffix(subsRaw),
                subscriberCountRaw: subsRaw,
                views: formatNumberWithSuffix(viewsRaw),
                viewCountRaw: viewsRaw,
                videoCount: videosRaw,
                videoCountFormatted: `${videosRaw}+ Videos`,
                description: snippet.description || chConfig.focus,
                focus: chConfig.focus,
                url: chConfig.url,
                subscribeUrl: chConfig.subscribeUrl,
                avatar: avatarUrl,
                banner: chConfig.banner,
                isLive: false
              });
            }
            return;
          }
        }
      } catch (e) {
        console.warn('[YouTubeService] YouTube Data API failed, falling back to RSS & Web scrapers:', e);
      }
    }

    // Fallback: Fetch Public Web Metadata for each channel
    await Promise.all(
      YT_CHANNELS.map(async chConfig => {
        try {
          const res = await fetch(`https://www.youtube.com/channel/${chConfig.channelId}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9'
            }
          });
          if (res.ok) {
            const html = await res.text();

            // Extract subscriber string
            let subsRaw = chConfig.defaultSubscribers;
            const subsMatch = html.match(/(\d+(?:\.\d+)?)\s*([KMkm])?\s*subscribers/i);
            if (subsMatch) {
              const num = parseFloat(subsMatch[1]);
              const multiplier = (subsMatch[2] || '').toUpperCase();
              if (multiplier === 'M') subsRaw = Math.round(num * 1000000);
              else if (multiplier === 'K') subsRaw = Math.round(num * 1000);
              else subsRaw = Math.round(num);
            }

            // Extract videos count
            let videosRaw = chConfig.defaultVideos;
            const videosMatch = html.match(/(\d+(?:,\d+)?)\s*videos/i);
            if (videosMatch) {
              videosRaw = parseInt(videosMatch[1].replace(/,/g, ''), 10) || chConfig.defaultVideos;
            }

            // Extract avatar
            let avatarUrl = chConfig.avatar;
            const avatarMatch = html.match(/"avatar":\{"thumbnails":\[\{"url":"([^"]+)"/);
            if (avatarMatch && avatarMatch[1]) {
              avatarUrl = avatarMatch[1];
            }

            const current = this.channelStats.get(chConfig.channelId);
            this.channelStats.set(chConfig.channelId, {
              id: chConfig.id,
              channelId: chConfig.channelId,
              name: chConfig.name,
              handle: chConfig.handle,
              platform: 'YouTube',
              subscribers: formatNumberWithSuffix(subsRaw),
              subscriberCountRaw: subsRaw,
              views: formatNumberWithSuffix(current?.viewCountRaw || chConfig.defaultViews),
              viewCountRaw: current?.viewCountRaw || chConfig.defaultViews,
              videoCount: videosRaw,
              videoCountFormatted: `${videosRaw}+ Videos`,
              focus: chConfig.focus,
              url: chConfig.url,
              subscribeUrl: chConfig.subscribeUrl,
              avatar: avatarUrl,
              banner: chConfig.banner,
              isLive: current?.isLive || false
            });
          }
        } catch (err) {
          console.warn(`[YouTubeService] Scraping failed for ${chConfig.name}:`, err);
        }
      })
    );
  }

  private async fetchChannelVideos(): Promise<void> {
    const allVideos: DynamicVideo[] = [];

    await Promise.all(
      YT_CHANNELS.map(async chConfig => {
        try {
          const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${chConfig.channelId}`);
          if (!res.ok) return;

          const xml = await res.text();
          const entries = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)].map(m => m[0]);

          for (const entry of entries) {
            const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            const titleMatch = entry.match(/<title>(.*?)<\/title>/);
            const pubMatch = entry.match(/<published>(.*?)<\/published>/);
            const viewsMatch = entry.match(/<media:statistics views="(\d+)"/);
            const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);

            if (!idMatch || !titleMatch) continue;

            const videoId = idMatch[1];
            const rawTitle = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
            const viewsNum = viewsMatch ? parseInt(viewsMatch[1], 10) : Math.floor(Math.random() * 5000) + 1200;
            const description = descMatch ? descMatch[1].trim() : '';

            const classification = classifyVideoData(chConfig.channelId, chConfig.name, rawTitle, description);

            allVideos.push({
              id: `yt-vid-${videoId}`,
              videoId,
              title: rawTitle,
              views: formatNumberWithSuffix(viewsNum),
              viewCountRaw: viewsNum,
              duration: classification.duration,
              date: parseRelativeTime(publishedAt),
              publishedAt,
              channel: chConfig.name,
              channelId: chConfig.channelId,
              channelHandle: chConfig.handle,
              category: classification.primaryCategory,
              categories: classification.categories,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
              description: description.slice(0, 160),
              isLive: classification.isLive,
              isPopular: viewsNum > 5000,
              isFeatured: viewsNum > 10000 || classification.isLive
            });
          }
        } catch (err) {
          console.warn(`[YouTubeService] Could not parse RSS for ${chConfig.name}:`, err);
        }
      })
    );

    if (allVideos.length > 0) {
      // Sort by newest published date
      allVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      this.videos = allVideos;
    }
  }

  private async checkLiveStatus(): Promise<void> {
    await Promise.all(
      YT_CHANNELS.map(async chConfig => {
        try {
          const res = await fetch(`https://www.youtube.com/channel/${chConfig.channelId}/live`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            redirect: 'follow'
          });
          if (res.ok) {
            const html = await res.text();
            const isLive = html.includes('"isLive":true') || html.includes('"isLiveBroadcast":true') || html.includes('isLiveNow":true');
            const videoIdMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
            const titleMatch = html.match(/<title>(.*?) - YouTube<\/title>/);
            const viewerMatch = html.match(/"viewCount":\{"runs":\[\{"text":"([^"]+)"\}\]/);

            const ch = this.channelStats.get(chConfig.channelId);
            if (ch) {
              ch.isLive = isLive;
              if (isLive && videoIdMatch) {
                ch.liveVideoId = videoIdMatch[1];
                ch.liveTitle = titleMatch ? titleMatch[1] : `${ch.name} Live Stream`;
                ch.liveViewers = viewerMatch ? viewerMatch[1] : undefined;
              } else {
                ch.liveVideoId = undefined;
                ch.liveTitle = undefined;
                ch.liveViewers = undefined;
              }
            }
          }
        } catch (err) {
          // Silent fallback for live polling
        }
      })
    );
  }

  public getAggregatedStats(): AggregatedStatsResponse {
    let totalSubs = 0;
    let totalViews = 0;
    let totalVideos = 0;

    const channelsList: ChannelStatsData[] = [];

    // Add 4 YouTube channels
    for (const c of YT_CHANNELS) {
      const stats = this.channelStats.get(c.channelId) || {
        id: c.id,
        channelId: c.channelId,
        name: c.name,
        handle: c.handle,
        platform: 'YouTube' as const,
        subscribers: formatNumberWithSuffix(c.defaultSubscribers),
        subscriberCountRaw: c.defaultSubscribers,
        views: formatNumberWithSuffix(c.defaultViews),
        viewCountRaw: c.defaultViews,
        videoCount: c.defaultVideos,
        videoCountFormatted: `${c.defaultVideos}+ Videos`,
        focus: c.focus,
        url: c.url,
        subscribeUrl: c.subscribeUrl,
        avatar: c.avatar,
        banner: c.banner,
        isLive: false
      };

      totalSubs += stats.subscriberCountRaw;
      totalViews += stats.viewCountRaw;
      totalVideos += stats.videoCount;
      channelsList.push(stats);
    }

    // Add Standalone Other Platforms (Rooter, Twitch, Kick)
    for (const op of OTHER_PLATFORMS) {
      channelsList.push(op);
    }

    // Rooter metrics (strictly separated)
    const rooter = OTHER_PLATFORMS.find(p => p.platform === 'Rooter') || OTHER_PLATFORMS[0];

    // Combined Network Totals (YouTube 4 + Rooter + Twitch + Kick)
    const totalNetworkSubs = totalSubs + rooter.subscriberCountRaw + 38000 + 31000;
    const totalNetworkViews = totalViews + rooter.viewCountRaw + 1400000 + 960000;
    const totalNetworkVideos = totalVideos + rooter.videoCount + 140 + 85;

    // Detect active live streams
    const activeLive = channelsList
      .filter(c => c.isLive && c.liveVideoId)
      .map(c => ({
        channelId: c.channelId || c.id,
        channelName: c.name,
        title: c.liveTitle || `${c.name} Live`,
        videoId: c.liveVideoId!,
        url: c.platform === 'YouTube' ? `https://www.youtube.com/watch?v=${c.liveVideoId}` : c.url,
        thumbnail: c.platform === 'YouTube' ? `https://i.ytimg.com/vi/${c.liveVideoId}/hqdefault.jpg` : c.avatar,
        viewers: c.liveViewers
      }));

    return {
      updatedAt: new Date().toISOString(),
      youtubeTotals: {
        subscriberCountRaw: totalSubs,
        subscribersFormatted: formatNumberWithSuffix(totalSubs),
        viewCountRaw: totalViews,
        viewsFormatted: formatNumberWithSuffix(totalViews),
        videoCountRaw: totalVideos,
        videosFormatted: `${totalVideos}+`
      },
      rooterTotals: {
        followerCountRaw: rooter.subscriberCountRaw,
        followersFormatted: rooter.subscribers,
        viewCountRaw: rooter.viewCountRaw,
        viewsFormatted: rooter.views,
        broadcastsRaw: rooter.videoCount,
        broadcastsFormatted: rooter.videoCountFormatted
      },
      totalReach: formatNumberWithSuffix(totalNetworkSubs),
      totalViews: formatNumberWithSuffix(totalNetworkViews),
      totalVideos: `${totalNetworkVideos}+`,
      channels: channelsList,
      liveStatus: {
        isAnyLive: activeLive.length > 0,
        activeLiveChannels: activeLive
      }
    };
  }

  public getVideos(category?: string, limit = 24): DynamicVideo[] {
    const list = this.videos;
    if (!category || category.toLowerCase() === 'all') {
      return list.slice(0, limit);
    }

    const catNorm = category.trim().toLowerCase();

    // 1. EARNINGS: Strictly and ONLY OP Earnings channel (UC-KkWDruqOobwZgylSb4kwA)
    if (catNorm === 'earnings') {
      return list
        .filter(v => v.channelId === 'UC-KkWDruqOobwZgylSb4kwA' || v.categories?.includes('Earnings'))
        .slice(0, limit);
    }

    // 2. MINECRAFT: Minecraft uploads & Minecraft live streams from connected channels
    if (catNorm === 'minecraft') {
      return list
        .filter(v => v.channelId === 'UC-ASoLp2wfxVLJFDnVXwrGA' || v.categories?.includes('Minecraft'))
        .slice(0, limit);
    }

    // 3. ROBLOX: Roblox channel & content
    if (catNorm === 'roblox') {
      return list
        .filter(v => v.categories?.includes('Roblox') || (v.channelId === 'UCKdJiKSiO382Hvczh_Q2kyg' && !v.categories?.includes('Valorant')))
        .slice(0, limit);
    }

    // 4. VALORANT: Valorant uploads & streams from connected channels
    if (catNorm === 'valorant') {
      return list
        .filter(v => v.categories?.includes('Valorant'))
        .slice(0, limit);
    }

    // 5. LIVE STREAMS: Actual live broadcasts / past live streams across all connected UltraOP channels
    if (catNorm === 'live streams' || catNorm === 'live' || catNorm === 'livestreams') {
      return list
        .filter(v => v.categories?.includes('Live Streams') || v.isLive === true)
        .slice(0, limit);
    }

    // 6. HIGHLIGHTS: Strictly title/content based highlight moments
    if (catNorm === 'highlights' || catNorm === 'highlight') {
      return list
        .filter(v => v.categories?.includes('Highlights'))
        .slice(0, limit);
    }

    // 7. TECH & GADGETS: Relevant tech & gadgets content from connected channels (returns empty if none)
    if (catNorm === 'tech & gadgets' || catNorm === 'tech' || catNorm === 'gadgets') {
      return list
        .filter(v => v.categories?.includes('Tech & Gadgets') || v.categories?.includes('Tech'))
        .slice(0, limit);
    }

    // Default match if user passes any other tag
    return list
      .filter(v => v.category?.toLowerCase() === catNorm || v.categories?.some(c => c.toLowerCase() === catNorm))
      .slice(0, limit);
  }

  public getFeaturedVideos(): DynamicVideo[] {
    return this.videos.filter(v => v.isFeatured || v.isLive || v.isPopular).slice(0, 6);
  }
}

export const youtubeService = new YouTubeService();
