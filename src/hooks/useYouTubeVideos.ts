import { useState, useEffect, useCallback } from 'react';
import { VideoItem } from '../types';
import { VIDEOS_DATA } from '../data/gamingData';

export interface DynamicVideoItem extends VideoItem {
  publishedAt?: string;
  channelId?: string;
  channelHandle?: string;
  isLive?: boolean;
  viewCountRaw?: number;
}

function filterFallbackVideos(category: string): DynamicVideoItem[] {
  if (!category || category.toLowerCase() === 'all') {
    return VIDEOS_DATA;
  }
  const catNorm = category.trim().toLowerCase();

  if (catNorm === 'earnings') {
    return VIDEOS_DATA.filter(v => v.channelId === 'UC-KkWDruqOobwZgylSb4kwA' || v.categories?.includes('Earnings') || v.category.toLowerCase() === 'earnings');
  }
  if (catNorm === 'minecraft') {
    return VIDEOS_DATA.filter(v => v.channelId === 'UC-ASoLp2wfxVLJFDnVXwrGA' || v.categories?.includes('Minecraft') || v.category.toLowerCase() === 'minecraft');
  }
  if (catNorm === 'roblox') {
    return VIDEOS_DATA.filter(v => v.categories?.includes('Roblox') || (v.channelId === 'UCKdJiKSiO382Hvczh_Q2kyg' && !v.categories?.includes('Valorant')) || v.category.toLowerCase() === 'roblox');
  }
  if (catNorm === 'valorant') {
    return VIDEOS_DATA.filter(v => v.categories?.includes('Valorant') || v.category.toLowerCase() === 'valorant');
  }
  if (catNorm === 'live streams' || catNorm === 'live' || catNorm === 'livestreams') {
    return VIDEOS_DATA.filter(v => v.categories?.includes('Live Streams') || v.isLive === true);
  }
  if (catNorm === 'highlights' || catNorm === 'highlight') {
    return VIDEOS_DATA.filter(v => v.categories?.includes('Highlights') || v.category.toLowerCase() === 'highlights');
  }
  if (catNorm === 'tech & gadgets' || catNorm === 'tech' || catNorm === 'gadgets') {
    return VIDEOS_DATA.filter(v => v.categories?.includes('Tech & Gadgets') || v.category.toLowerCase() === 'tech' || v.category.toLowerCase() === 'gadgets');
  }
  return VIDEOS_DATA.filter(v => v.category.toLowerCase() === catNorm || v.categories?.some(c => c.toLowerCase() === catNorm));
}

export function useYouTubeVideos(category: string = 'All', limit: number = 24) {
  const [videos, setVideos] = useState<DynamicVideoItem[]>(() => filterFallbackVideos(category));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const categoryParam = category !== 'All' ? `&category=${encodeURIComponent(category)}` : '';
      const response = await fetch(`/api/youtube/videos?limit=${limit}${categoryParam}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }

      const json = await response.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: DynamicVideoItem[] = json.data.map((v: any) => ({
          id: v.id || `vid-${v.videoId}`,
          title: v.title,
          views: v.views || `${v.viewCountRaw?.toLocaleString()} views`,
          duration: v.duration || 'HD Video',
          date: v.date || 'Recent',
          publishedAt: v.publishedAt,
          channel: v.channel,
          channelId: v.channelId,
          channelHandle: v.channelHandle,
          channelUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
          category: v.category || 'Minecraft',
          categories: v.categories || [v.category || 'Minecraft'],
          thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
          youtubeId: v.videoId,
          videoUrl: v.videoUrl || `https://www.youtube.com/watch?v=${v.videoId}`,
          isPopular: v.isPopular,
          isLive: v.isLive,
          viewCountRaw: v.viewCountRaw
        }));
        setVideos(mapped);
        setError(null);
      } else {
        setVideos(filterFallbackVideos(category));
      }
    } catch (err: any) {
      console.warn('[useYouTubeVideos] Falling back to verified local archive:', err);
      setError(err?.message || 'Video API offline, using local registry');
      setVideos(filterFallbackVideos(category));
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchVideos();
    const interval = setInterval(fetchVideos, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refresh: fetchVideos
  };
}
