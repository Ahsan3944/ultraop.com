import { useState, useEffect, useCallback, useMemo } from 'react';
import { CHANNELS_DATA } from '../data/gamingData';

export interface ChannelMetrics {
  id: string;
  channelId?: string;
  handle: string;
  name: string;
  platform: string;
  url: string;
  subscribeUrl?: string;
  subscribers: string;
  subscriberCountRaw: number;
  views: string;
  viewCountRaw: number;
  videoCount?: number;
  videoCountFormatted?: string;
  isLive?: boolean;
  liveTitle?: string;
  liveVideoId?: string;
  liveViewers?: string;
  focus?: string;
  avatar?: string;
  banner?: string;
}

export interface NetworkMetricsData {
  updatedAt: string;
  youtubeTotals?: {
    subscriberCountRaw: number;
    subscribersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    videoCountRaw: number;
    videosFormatted: string;
  };
  rooterTotals?: {
    followerCountRaw: number;
    followersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    broadcastsRaw: number;
    broadcastsFormatted: string;
  };
  totalReach: string;
  totalViews: string;
  totalVideos: string;
  channels: ChannelMetrics[];
  liveStatus?: {
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

export interface UseYouTubeStatsReturn {
  channels: ChannelMetrics[];
  channelMap: Record<string, ChannelMetrics>;
  youtubeTotals: {
    subscriberCountRaw: number;
    subscribersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    videoCountRaw: number;
    videosFormatted: string;
  };
  rooterTotals: {
    followerCountRaw: number;
    followersFormatted: string;
    viewCountRaw: number;
    viewsFormatted: string;
    broadcastsRaw: number;
    broadcastsFormatted: string;
  };
  totalReach: string;
  totalViews: string;
  totalVideos: string;
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
  loading: boolean;
  isSyncing: boolean;
  error: string | null;
  lastUpdated: string;
  source: 'live_youtube_api' | 'verified_channel_registry' | 'verified_youtube_live_stream_sync';
  refresh: () => Promise<void>;
  getChannel: (id: string) => ChannelMetrics | undefined;
}

export function useYouTubeStats(pollingIntervalMs: number = 60000): UseYouTubeStatsReturn {
  const [data, setData] = useState<NetworkMetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'live_youtube_api' | 'verified_channel_registry' | 'verified_youtube_live_stream_sync'>('verified_youtube_live_stream_sync');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');

  const fetchStats = useCallback(async (isManual: boolean = false) => {
    if (isManual) {
      setIsSyncing(true);
    }
    setError(null);

    try {
      const response = await fetch(isManual ? '/api/youtube/sync' : '/api/youtube/stats', {
        method: isManual ? 'POST' : 'GET'
      });
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
        if (result.source) {
          setSource(result.source);
        }
        setLastUpdatedTime(
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      } else {
        throw new Error(result.error || 'Failed to parse channel metrics');
      }
    } catch (err: any) {
      console.warn('Live metrics API fallback active:', err);
      setError(err?.message || 'Network sync unavailable, displaying cached registry metrics.');
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(false);

    if (pollingIntervalMs > 0) {
      const timer = setInterval(() => {
        fetchStats(false);
      }, pollingIntervalMs);
      return () => clearInterval(timer);
    }
  }, [fetchStats, pollingIntervalMs]);

  // Create lookup dictionary for fast access without cross-platform key collisions
  const channelMap = useMemo(() => {
    const map: Record<string, ChannelMetrics> = {};
    if (data?.channels) {
      data.channels.forEach((ch) => {
        map[ch.id] = ch;
        if (ch.channelId) {
          map[ch.channelId] = ch;
        }
        map[`${ch.platform}:${ch.id}`] = ch;
        if (ch.handle) {
          map[`${ch.platform}:${ch.handle}`] = ch;
          // Only map root handle if YouTube to prevent Twitch/YouTube handle collision
          if (ch.platform === 'YouTube' && !map[ch.handle]) {
            map[ch.handle] = ch;
          }
        }
      });
    } else {
      CHANNELS_DATA.forEach((ch) => {
        const metrics: ChannelMetrics = {
          id: ch.id,
          handle: ch.handle,
          name: ch.name,
          platform: ch.platform,
          url: ch.url,
          subscribers: ch.subscribers,
          subscriberCountRaw: ch.platform === 'Rooter' ? 515900 : (ch.id === 'ultraoplive' ? 72000 : 72000),
          views: ch.views,
          viewCountRaw: ch.platform === 'Rooter' ? 65200000 : 19800000,
          isLive: ch.isLive,
          focus: ch.description,
          avatar: ch.avatar,
          banner: ch.banner
        };
        map[ch.id] = metrics;
        map[`${ch.platform}:${ch.id}`] = metrics;
        if (ch.handle) {
          map[`${ch.platform}:${ch.handle}`] = metrics;
          if (ch.platform === 'YouTube' && !map[ch.handle]) {
            map[ch.handle] = metrics;
          }
        }
      });
    }
    return map;
  }, [data]);

  const channelsList = useMemo(() => {
    return data?.channels && data.channels.length > 0
      ? data.channels
      : CHANNELS_DATA.map((ch) => ({
          id: ch.id,
          handle: ch.handle,
          name: ch.name,
          platform: ch.platform,
          url: ch.url,
          subscribers: ch.subscribers,
          subscriberCountRaw: ch.platform === 'Rooter' ? 515900 : (ch.id === 'ultraoplive' ? 72000 : 72000),
          views: ch.views,
          viewCountRaw: ch.platform === 'Rooter' ? 65200000 : 19800000,
          isLive: ch.isLive,
          focus: ch.description,
          avatar: ch.avatar,
          banner: ch.banner
        }));
  }, [data]);

  const getChannel = useCallback(
    (id: string) => {
      return channelMap[id];
    },
    [channelMap]
  );

  const defaultYoutubeTotals = useMemo(() => {
    return data?.youtubeTotals || {
      subscriberCountRaw: 146820,
      subscribersFormatted: '146.8K+',
      viewCountRaw: 36458500,
      viewsFormatted: '36.5M+',
      videoCountRaw: 618,
      videosFormatted: '618+'
    };
  }, [data]);

  const defaultRooterTotals = useMemo(() => {
    return data?.rooterTotals || {
      followerCountRaw: 515900,
      followersFormatted: '515.9K+ Followers',
      viewCountRaw: 65200000,
      viewsFormatted: '65.2M+ Views',
      broadcastsRaw: 1700,
      broadcastsFormatted: '1,700+ Broadcasts'
    };
  }, [data]);

  const defaultLiveStatus = useMemo(() => {
    return data?.liveStatus || {
      isAnyLive: false,
      activeLiveChannels: []
    };
  }, [data]);

  return {
    channels: channelsList,
    channelMap,
    youtubeTotals: defaultYoutubeTotals,
    rooterTotals: defaultRooterTotals,
    totalReach: data?.totalReach || '731.7K+',
    totalViews: data?.totalViews || '104.1M+',
    totalVideos: data?.totalVideos || '2,543+',
    liveStatus: defaultLiveStatus,
    loading,
    isSyncing,
    error,
    lastUpdated: lastUpdatedTime,
    source,
    refresh: () => fetchStats(true),
    getChannel
  };
}
