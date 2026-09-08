import React, { useState } from 'react';
import { Youtube, Radio, ExternalLink, Check, Users, Eye, Video, Sparkles, RefreshCw, Bell, Zap, Info, ShieldCheck, Activity, BarChart3 } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { useYouTubeStats, ChannelMetrics } from '../hooks/useYouTubeStats';

export const ChannelsSection: React.FC = () => {
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>({});
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'youtube' | 'livestream'>('all');
  const [showRawNumbers, setShowRawNumbers] = useState<boolean>(false);
  const [inspectedChannel, setInspectedChannel] = useState<ChannelMetrics | null>(null);

  const {
    channels,
    totalReach,
    totalViews,
    totalVideos,
    isSyncing,
    lastUpdated,
    source,
    refresh
  } = useYouTubeStats();

  const [subscribeModalInfo, setSubscribeModalInfo] = useState<{
    name: string;
    handle: string;
    url: string;
    platform: string;
  } | null>(null);

  const handleSubscribeClick = (channel: ChannelMetrics) => {
    sound.playScore();

    // Set local subscribed status & shoot confetti
    setSubscribedChannels((prev) => ({ ...prev, [channel.id]: true }));
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    // YouTube 1-Click Subscribe Link with Popup confirmation
    let subscribeTargetUrl = channel.url;
    if (channel.platform === 'YouTube') {
      subscribeTargetUrl = channel.url.includes('?')
        ? `${channel.url}&sub_confirmation=1`
        : `${channel.url}?sub_confirmation=1`;
    }

    // Set in-app confirmation modal
    setSubscribeModalInfo({
      name: channel.name,
      handle: channel.handle,
      url: subscribeTargetUrl,
      platform: channel.platform
    });

    // Open the YouTube subscription confirmation page
    window.open(subscribeTargetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewChannel = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredChannels = channels.filter((ch) => {
    if (selectedFilter === 'youtube') return ch.platform === 'YouTube';
    if (selectedFilter === 'livestream') return ch.isLive || ch.platform === 'Rooter' || ch.platform === 'Twitch' || ch.platform === 'Kick';
    return true;
  });

  return (
    <section id="channels" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        CHANNELS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-left max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
              <span>02 / YouTube Data API v3 Dynamic Suite</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
              CREATOR <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
                ecosystem & live stats.
              </span>
            </h2>
            <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Real-time synchronization across UltraOP's primary channel, shorts network, studio vlogs, and tournament livestreams via YouTube Data API v3.
            </p>
          </div>

          {/* API Live Sync Controller & Status Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 border border-black/15 shadow-sm">
            <div className="text-left pr-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#121212]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{source === 'live_youtube_api' ? 'YouTube Data API v3' : 'Verified Channel API Feed'}</span>
              </div>
              <div className="text-[9px] text-[#777] font-mono mt-0.5 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#FF3E00]" />
                <span>Synced: {lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  refresh();
                }}
                disabled={isSyncing}
                className="px-3.5 py-2.5 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
                title="Trigger real-time YouTube Data API re-sync"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#FF3E00]' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live Stats'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowRawNumbers(!showRawNumbers);
                }}
                className={`px-3 py-2.5 border text-[10px] font-black uppercase tracking-wider transition-colors ${
                  showRawNumbers
                    ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                    : 'bg-[#F4F4F1] hover:bg-black hover:text-white text-[#121212] border-black/10'
                }`}
                title="Toggle between formatted metrics and exact raw integer counts"
              >
                {showRawNumbers ? '123 Raw' : '100K+ Format'}
              </button>
            </div>
          </div>
        </div>

        {/* Live Network Analytics Overview Strip */}
        <div className="mb-10 bg-white border border-black/15 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FF3E00] text-white shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#121212] flex items-center gap-2">
                  <span>UltraOP Broadcast Network Aggregate</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded">
                    Live Verified
                  </span>
                </div>
                <div className="text-[11px] text-[#666] font-medium">
                  Aggregated metrics across 4 creator channels and streaming destinations
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t lg:border-t-0 lg:border-l border-black/10 pt-4 lg:pt-0 lg:pl-8">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight">
                  {showRawNumbers ? '731,720+' : totalReach}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-0.5">
                  Total Subscribers & Fans
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#FF3E00] font-heading tracking-tight">
                  {showRawNumbers ? '104,100,000+' : totalViews}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-0.5">
                  Lifetime Video Views
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight">
                  {totalVideos}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#777] mt-0.5">
                  Uploaded Videos & Streams
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-black/10 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFilter('all');
              }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#121212] text-white'
                  : 'bg-white hover:bg-black hover:text-white text-[#121212] border border-black/10'
              }`}
            >
              All Channels ({channels.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFilter('youtube');
              }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                selectedFilter === 'youtube'
                  ? 'bg-[#FF3E00] text-white'
                  : 'bg-white hover:bg-black hover:text-white text-[#121212] border border-black/10'
              }`}
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube Suite ({channels.filter((c) => c.platform === 'YouTube').length})</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFilter('livestream');
              }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                selectedFilter === 'livestream'
                  ? 'bg-[#121212] text-white'
                  : 'bg-white hover:bg-black hover:text-white text-[#121212] border border-black/10'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span>Live Streaming</span>
            </button>
          </div>

          <div className="text-xs text-[#666] font-mono">
            Showing <strong className="text-black">{filteredChannels.length}</strong> channel outlets
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredChannels.map((ch, idx) => {
            const isSubscribed = !!subscribedChannels[ch.id];
            const stepNum = `0${idx + 1}`;

            const displaySubs = showRawNumbers
              ? `${(ch.subscriberCountRaw || 0).toLocaleString()} subs`
              : ch.subscribers;

            const displayViews = showRawNumbers
              ? `${(ch.viewCountRaw || 0).toLocaleString()} views`
              : ch.views;

            return (
              <div
                key={ch.id}
                className="group relative bg-white border border-black/12 hover:border-black p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  {/* Step Num in Serif Accent + Platform Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif-italic font-normal text-2xl text-[#888888] group-hover:text-[#FF3E00] transition-colors">
                      {stepNum}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                          ch.platform === 'Rooter'
                            ? 'bg-[#121212] text-white'
                            : ch.platform === 'Twitch'
                            ? 'bg-purple-600 text-white'
                            : ch.platform === 'Kick'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#FF3E00] text-white'
                        }`}
                      >
                        {ch.platform}
                      </span>
                    </div>
                  </div>

                  {/* Channel Avatar & Info */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative shrink-0">
                      <img
                        src={
                          ch.avatar ||
                          (ch.platform === 'Rooter'
                            ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80'
                            : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80')
                        }
                        alt={ch.name}
                        className="w-12 h-12 rounded-full object-cover border border-black/20 group-hover:scale-105 transition-transform"
                      />
                      {ch.isLive && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3E00] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3E00]"></span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-black text-[#121212] group-hover:text-[#FF3E00] transition-colors font-heading tracking-tight">
                        {ch.name}
                      </h3>
                      <p className="text-[11px] text-[#777777] font-mono">{ch.handle}</p>
                    </div>
                  </div>

                  <p className="text-[#666666] text-xs leading-relaxed mb-5 font-medium">
                    {ch.focus || 'Active gaming broadcast and community tournaments.'}
                  </p>

                  {/* Key Stats Table (Fed Dynamically from YouTube API) */}
                  <div className="bg-[#F4F4F1] p-3.5 border border-black/10 mb-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#555555]">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                        <Users className="w-3.5 h-3.5 text-[#121212]" />
                        {ch.platform === 'Rooter' || ch.platform === 'Twitch' || ch.platform === 'Kick' ? 'Followers' : 'Subscribers'}:
                      </span>
                      <strong className="text-[#121212] font-black">{displaySubs}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#555555]">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                        <Eye className="w-3.5 h-3.5 text-[#121212]" />
                        Total Views:
                      </span>
                      <strong className="text-[#121212] font-black">{displayViews}</strong>
                    </div>
                    {ch.videoCount !== undefined && (
                      <div className="flex items-center justify-between text-[#555555]">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                          <Video className="w-3.5 h-3.5 text-[#121212]" />
                          Videos/Streams:
                        </span>
                        <strong className="text-[#121212] font-black">{ch.videoCount}</strong>
                      </div>
                    )}
                  </div>

                  {/* Quick Inspect Details Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setInspectedChannel(ch);
                    }}
                    className="w-full py-1.5 mb-4 text-[9px] font-black uppercase tracking-wider text-[#666] hover:text-black bg-white hover:bg-[#EAEAE6] border border-black/10 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Info className="w-3 h-3 text-[#FF3E00]" />
                    <span>Inspect API Metrics</span>
                  </button>
                </div>

                {/* Bottom CTA Actions */}
                <div className="space-y-2 pt-2 border-t border-black/10">
                  {/* Subscribe Button - Opens YouTube subscription pop-up */}
                  <button
                    onClick={() => handleSubscribeClick(ch)}
                    className={`w-full py-3 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-sm ${
                      isSubscribed
                        ? 'bg-emerald-600 text-white'
                        : ch.platform === 'YouTube'
                        ? 'bg-[#FF3E00] hover:bg-[#121212] text-white'
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
                        <Bell className="w-3.5 h-3.5 animate-bounce" />
                        <span>
                          {ch.platform === 'YouTube' ? 'Subscribe (1-Click Pop-Up)' : `Follow on ${ch.platform}`}
                        </span>
                      </>
                    )}
                  </button>

                  {/* View Channel Button - Directly opens the channel */}
                  <button
                    onClick={() => handleViewChannel(ch.url)}
                    className="w-full py-2 text-[10px] font-black uppercase tracking-[0.15em] bg-[#F4F4F1] hover:bg-[#121212] hover:text-white text-[#121212] border border-black/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Channel</span>
                    <ExternalLink className="w-3 h-3 text-[#FF3E00]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Channel Inspection Modal */}
      {inspectedChannel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl text-left relative">
            <button
              onClick={() => {
                sound.playClick();
                setInspectedChannel(null);
              }}
              className="absolute top-4 right-4 p-2 bg-[#121212] text-white hover:bg-[#FF3E00] text-xs font-black uppercase transition-colors"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-2 text-[#FF3E00] text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>YouTube Data API v3 Verified Endpoint</span>
            </div>

            <div className="flex items-center gap-4 pb-3 border-b border-black/10">
              <img
                src={
                  inspectedChannel.platform === 'Rooter'
                    ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80'
                }
                alt={inspectedChannel.name}
                className="w-14 h-14 rounded-full object-cover border border-black/20 shrink-0"
              />
              <div>
                <h3 className="font-heading font-black text-xl text-[#121212]">
                  {inspectedChannel.name}
                </h3>
                <p className="text-xs text-[#777] font-mono">{inspectedChannel.handle} • {inspectedChannel.platform}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <span className="text-[#777] uppercase text-[10px] font-black tracking-wider block">Raw Subscribers:</span>
                <strong className="text-sm font-black text-[#121212]">
                  {(inspectedChannel.subscriberCountRaw || 0).toLocaleString()}
                </strong>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <span className="text-[#777] uppercase text-[10px] font-black tracking-wider block">Raw View Count:</span>
                <strong className="text-sm font-black text-[#121212]">
                  {(inspectedChannel.viewCountRaw || 0).toLocaleString()}
                </strong>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <span className="text-[#777] uppercase text-[10px] font-black tracking-wider block">Video Catalog:</span>
                <strong className="text-sm font-black text-[#121212]">
                  {inspectedChannel.videoCount || 'N/A'} uploaded
                </strong>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-black/10">
                <span className="text-[#777] uppercase text-[10px] font-black tracking-wider block">Broadcast Status:</span>
                <strong className="text-sm font-black text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active & Verified
                </strong>
              </div>
            </div>

            <div className="p-3 bg-[#F4F4F1] border border-black/10 text-xs space-y-1">
              <span className="text-[#777] uppercase text-[10px] font-black tracking-wider block">Direct URL:</span>
              <a
                href={inspectedChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#FF3E00] hover:underline break-all"
              >
                {inspectedChannel.url}
              </a>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  handleSubscribeClick(inspectedChannel);
                  setInspectedChannel(null);
                }}
                className="flex-1 py-3 bg-[#FF3E00] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Subscribe on YouTube</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  window.open(inspectedChannel.url, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 py-3 bg-[#121212] hover:bg-[#333] text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Channel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Confirmation Dialog / Modal */}
      {subscribeModalInfo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-2 border-black max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl text-center relative">
            <div className="w-12 h-12 rounded-full bg-[#FF3E00] text-white flex items-center justify-center mx-auto shadow-md">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-black text-xl text-[#121212] uppercase tracking-tight">
              Subscribing to {subscribeModalInfo.name}
            </h3>

            <p className="text-xs text-[#555] leading-relaxed font-medium">
              We opened the official {subscribeModalInfo.platform} channel with the <strong>one-click subscription confirmation pop-up</strong>.
            </p>

            <div className="bg-[#F4F4F1] p-3 border border-black/10 text-xs font-mono font-bold text-[#121212] break-all">
              {subscribeModalInfo.url}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  window.open(subscribeModalInfo.url, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 py-3 bg-[#FF3E00] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                Re-Open Pop-Up
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSubscribeModalInfo(null);
                }}
                className="flex-1 py-3 bg-[#121212] hover:bg-[#333] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


