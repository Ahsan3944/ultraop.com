import React, { useState } from 'react';
import { Youtube, Instagram, MessageSquare, Radio, Send, Bell, BellRing, ExternalLink, Check, Users, Eye, Sparkles, Flame, ShieldCheck, Heart } from 'lucide-react';
import { CHANNELS_DATA, INSTAGRAM_ACCOUNTS_DATA, INSTAGRAM_POSTS_DATA } from '../data/gamingData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { useYouTubeStats } from '../hooks/useYouTubeStats';

interface SocialHubProps {
  onExploreChannels?: () => void;
}

export const SocialHub: React.FC<SocialHubProps> = ({ onExploreChannels }) => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'instagram' | 'discord' | 'rooter'>('youtube');
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>({});
  const [notifiedChannels, setNotifiedChannels] = useState<Record<string, boolean>>({});
  const [selectedRole, setSelectedRole] = useState<string>('vip');
  const [selectedIgAccount, setSelectedIgAccount] = useState<string>('all');

  const { channelMap } = useYouTubeStats();

  const handleSubscribe = (channelId: string, channelName: string, channelUrl: string) => {
    sound.playScore();
    const isNowSubscribed = !subscribedChannels[channelId];
    
    setSubscribedChannels(prev => ({ ...prev, [channelId]: isNowSubscribed }));

    if (isNowSubscribed) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      const targetUrl = channelUrl.includes('?') ? `${channelUrl}&sub_confirmation=1` : `${channelUrl}?sub_confirmation=1`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNotificationToggle = (channelId: string) => {
    sound.playClick();
    setNotifiedChannels(prev => ({ ...prev, [channelId]: !prev[channelId] }));
  };

  const filteredInstagramPosts = selectedIgAccount === 'all'
    ? INSTAGRAM_POSTS_DATA
    : INSTAGRAM_POSTS_DATA.filter(post => post.accountId === selectedIgAccount);

  const currentIgAccount = INSTAGRAM_ACCOUNTS_DATA.find(acc => acc.id === selectedIgAccount);

  const discordRoles = [
    {
      id: 'vip',
      name: '👑 Ultra VIP Patron',
      color: 'text-amber-600 bg-amber-50 border-amber-300',
      perks: ['Exclusive Saturday Custom Room slot', 'Direct Voice Chat with Ahsan', 'VIP Nitro emote pack', 'Priority tournament seeding']
    },
    {
      id: 'tourney',
      name: '🏆 Tournament Gladiator',
      color: 'text-[#FF3E00] bg-orange-50 border-orange-300',
      perks: ['Direct access to weekly 10K Diamond Room IDs', 'Scrims team finder channel', 'Custom caster match highlights', 'Anti-cheat verified badge']
    },
    {
      id: 'creator',
      name: '🎨 Fan Artist & Clip Editor',
      color: 'text-purple-600 bg-purple-50 border-purple-300',
      perks: ['Featured on official UltraOP website gallery', 'Shoutout on YouTube community tab', 'Access to high-res raw stream clips', 'Direct collab desk']
    }
  ];

  const youtubeChannels = CHANNELS_DATA.filter(c => c.platform === 'YouTube').map(ch => {
    const liveMatch =
      channelMap[`${ch.platform}:${ch.handle}`] ||
      channelMap[`${ch.platform}:${ch.id}`] ||
      channelMap[ch.handle] ||
      channelMap[ch.id] ||
      (ch.id === 'ultraoplive' ? channelMap['ultraoplive'] || channelMap['UCAxlmL3_721xzOjQVe5Klbg'] : undefined) ||
      (ch.id === 'op-earnings' ? channelMap['ultraopearnings'] || channelMap['op-earnings'] || channelMap['UC-KkWDruqOobwZgylSb4kwA'] : undefined) ||
      (ch.id === 'ultraop2' ? channelMap['ultraop2'] || channelMap['UC-ASoLp2wfxVLJFDnVXwrGA'] : undefined) ||
      (ch.id === 'ultraop3' ? channelMap['ultraop3'] || channelMap['UCKdJiKSiO382Hvczh_Q2kyg'] : undefined);

    return {
      ...ch,
      name: liveMatch?.name || ch.name,
      avatar: liveMatch?.avatar || ch.avatar,
      subscribers: liveMatch?.subscribers || ch.subscribers,
      views: liveMatch?.views || ch.views,
    };
  });

  return (
    <section id="social-hub" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        CONNECT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
              <span>02 / Social & Creator Ecosystem</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter font-heading">
              COMMUNITY <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
                command center.
              </span>
            </h2>
            <p className="mt-3 text-[#666666] text-sm max-w-xl font-medium">
              Join over 730,000+ gamers across YouTube, Rooter, Instagram, and Discord. Subscribe, claim Discord VIP roles, and follow live broadcast channels.
            </p>
          </div>

          {/* Platform Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'youtube', label: 'YouTube Network', icon: Youtube },
              { key: 'rooter', label: 'Rooter HQ (515K)', icon: Radio },
              { key: 'instagram', label: 'Instagram Feed', icon: Instagram },
              { key: 'discord', label: 'Discord Guild (10K+)', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.key as any);
                  }}
                  className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#121212] text-white shadow-sm'
                      : 'bg-white text-[#121212] border border-black/15 hover:border-black'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${activeTab === tab.key ? 'text-[#FF3E00]' : 'text-[#121212]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: YouTube Channels Network with 1-Click Interactive Subscribe */}
        {activeTab === 'youtube' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {youtubeChannels.map((ch, idx) => {
              const isSub = !!subscribedChannels[ch.id];
              const isNotified = !!notifiedChannels[ch.id];

              return (
                <div
                  key={ch.id}
                  className="bg-white border border-black/15 hover:border-black p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm relative group"
                >
                  <div>
                    {/* Channel Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-4">
                      <span className="font-serif-italic text-2xl text-[#888888] group-hover:text-[#FF3E00] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="px-2.5 py-1 bg-[#121212] text-white text-[9px] font-black uppercase tracking-wider">
                        YouTube
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={ch.avatar}
                        alt={ch.name}
                        className="w-14 h-14 rounded-full object-cover border border-black/20 shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-black text-[#121212] font-heading tracking-tight">
                          {ch.name}
                        </h3>
                        <p className="text-[11px] text-[#777777] font-mono">{ch.handle}</p>
                      </div>
                    </div>

                    <p className="text-[#666666] text-xs leading-relaxed mb-5 font-medium">
                      {ch.description}
                    </p>

                    {/* Channel Stats Bar */}
                    <div className="bg-[#F4F4F1] p-3.5 border border-black/10 space-y-2 mb-6 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#555555] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#121212]" /> Subscribers:
                        </span>
                        <strong className="text-[#121212] font-black font-mono">
                          {ch.subscribers}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#555555] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#121212]" /> Total Views:
                        </span>
                        <strong className="text-[#121212] font-black font-mono">{ch.views}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Subscribe Action Bar */}
                  <div className="space-y-2 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSubscribe(ch.id, ch.name, ch.url)}
                        className={`flex-1 py-3 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                          isSub
                            ? 'bg-[#121212] text-white'
                            : 'bg-[#FF3E00] hover:bg-[#121212] text-white shadow-sm'
                        }`}
                      >
                        {isSub ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Subscribed
                          </>
                        ) : (
                          <>
                            <Youtube className="w-3.5 h-3.5 fill-current" /> Subscribe
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleNotificationToggle(ch.id)}
                        className={`p-3 border transition-colors ${
                          isNotified
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/15'
                        }`}
                        title={isNotified ? 'All notifications turned on' : 'Click to turn on all notifications'}
                      >
                        {isNotified ? (
                          <BellRing className="w-4 h-4 fill-current" />
                        ) : (
                          <Bell className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="w-full py-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/15 text-[#121212] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Visit Channel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Rooter Streaming Hub */}
        {activeTab === 'rooter' && (
          <div className="bg-white border border-black/15 p-8 lg:p-10 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white text-[10px] font-black uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Official Verified Rooter Creator</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#121212] font-heading tracking-tight">
                  UltraOP Rooter Streaming Headquarters
                </h3>

                <p className="text-[#555555] text-sm sm:text-base leading-relaxed font-medium">
                  Ranked among India’s top gaming creators on Rooter with over <strong className="text-[#121212]">515,900+ followers</strong> and <strong className="text-[#121212]">65,000,000+ total views</strong> across 1,700+ live broadcast sessions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 bg-[#F4F4F1] border border-black/10 min-w-0">
                    <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      515.9K+
                    </div>
                    <div className="text-[10px] text-[#777777] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                      Followers
                    </div>
                  </div>
                  <div className="p-4 bg-[#F4F4F1] border border-black/10 min-w-0">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF3E00] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      65.2M+
                    </div>
                    <div className="text-[10px] text-[#777777] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                      Watch Views
                    </div>
                  </div>
                  <div className="p-4 bg-[#F4F4F1] border border-black/10 min-w-0">
                    <div className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      1,700+
                    </div>
                    <div className="text-[10px] text-[#777777] font-black uppercase tracking-wider mt-1 whitespace-nowrap">
                      Live Streams
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="https://www.rooter.gg/profile/142404154"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-8 py-4 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-xs uppercase tracking-[0.25em] flex items-center gap-2.5 transition-all shadow-sm"
                  >
                    <Radio className="w-4 h-4 text-[#FF3E00]" />
                    Watch on Rooter (142404154)
                  </a>

                  <button
                    onClick={() => {
                      sound.playClick();
                      if (onExploreChannels) {
                        onExploreChannels();
                      } else {
                        window.location.hash = '#channels';
                      }
                    }}
                    className="px-6 py-4 bg-white hover:bg-[#121212] text-[#121212] hover:text-white border border-black/20 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm"
                  >
                    <span>Explore All Channels & Platforms</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF3E00]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] bg-[#121212] border border-black/20 overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
                    alt="UltraOP Rooter Stage"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 bg-[#FF3E00] text-[9px] font-black uppercase tracking-wider inline-block mb-2">
                      Verified Streamer
                    </span>
                    <h4 className="text-base font-black font-heading">Rooter Gaming & Community Live</h4>
                    <p className="text-xs text-gray-300">Live Gaming Broadcasts & Community Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Instagram Highlights & Social Gallery */}
        {activeTab === 'instagram' && (
          <div className="space-y-8 animate-fade-in">
            {/* Account Selector Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-black/15 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#FF3E00]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#121212]">
                  Select Official Account:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedIgAccount('all');
                  }}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    selectedIgAccount === 'all'
                      ? 'bg-[#121212] text-white'
                      : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border border-black/10'
                  }`}
                >
                  All Accounts ({INSTAGRAM_POSTS_DATA.length})
                </button>
                {INSTAGRAM_ACCOUNTS_DATA.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedIgAccount(acc.id);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedIgAccount === acc.id
                        ? 'bg-[#FF3E00] text-white'
                        : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border border-black/10'
                    }`}
                  >
                    <span>{acc.handle}</span>
                    <span className="text-[9px] opacity-75 font-mono">({acc.followers})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Profile Banner */}
            {currentIgAccount ? (
              <div className="bg-white border border-black/15 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 rounded-full shrink-0">
                    <img
                      src={currentIgAccount.avatar}
                      alt={currentIgAccount.name}
                      className="w-full h-full object-cover rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <h3 className="text-lg font-black text-[#121212] font-heading">{currentIgAccount.handle}</h3>
                      {currentIgAccount.badge && (
                        <span className="px-2 py-0.5 bg-[#F4F4F1] border border-black/10 text-[#121212] text-[9px] font-black uppercase tracking-wider">
                          {currentIgAccount.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#121212] font-bold mb-1">{currentIgAccount.name}</p>
                    <p className="text-xs text-[#666666] font-medium max-w-xl mb-2">{currentIgAccount.bio}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 text-[11px] font-bold text-[#121212]">
                      <span><strong>{currentIgAccount.followers}</strong> Followers</span>
                      <span>•</span>
                      <span><strong>{currentIgAccount.postsCount}</strong></span>
                    </div>
                  </div>
                </div>

                <a
                  href={currentIgAccount.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-6 py-3.5 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shrink-0 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  Follow {currentIgAccount.handle}
                </a>
              </div>
            ) : (
              <div className="bg-white border border-black/15 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 rounded-full flex items-center justify-center text-white">
                    <Instagram className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#121212] font-heading">Official UltraOP Instagram Network</h3>
                    <p className="text-xs text-[#666666] font-medium">
                      All verified Instagram profiles for Sk Ahsan Ahmad, OP Earnings, and Ahsan Now.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INSTAGRAM_ACCOUNTS_DATA.map(acc => (
                    <a
                      key={acc.id}
                      href={acc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#F4F4F1] hover:bg-[#121212] hover:text-white border border-black/15 text-[#121212] text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                    >
                      <Instagram className="w-3 h-3 text-[#FF3E00]" />
                      <span>{acc.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredInstagramPosts.length === 0 ? (
                <div className="col-span-full py-12 bg-white border border-black/15 text-center">
                  <p className="text-sm font-bold text-[#666666]">No posts available for this account yet.</p>
                </div>
              ) : (
                filteredInstagramPosts.map(post => (
                  <div
                    key={post.id}
                    className="bg-white border border-black/15 hover:border-black overflow-hidden flex flex-col justify-between group shadow-sm transition-all hover:-translate-y-1"
                  >
                    <div className="p-3 bg-[#F4F4F1] border-b border-black/10 flex items-center justify-between text-[11px] font-black text-[#121212]">
                      <span className="flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-[#FF3E00]" />
                        {post.accountHandle}
                      </span>
                      {post.date && <span className="text-[10px] text-[#777777] font-mono">{post.date}</span>}
                    </div>

                    <div className="relative aspect-square overflow-hidden bg-[#121212]">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                        <div className="flex items-center gap-4 text-xs font-bold">
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4" /> {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold text-[#222222] line-clamp-2 leading-relaxed mb-3">
                        {post.caption}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-[#888888] font-mono pt-3 border-t border-black/10">
                        <span className="truncate pr-2">{post.tag}</span>
                        <a
                          href={post.permalink || `https://instagram.com/${post.accountHandle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF3E00] font-black uppercase hover:underline shrink-0"
                        >
                          View Post →
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Discord Guild & Community Perks */}
        {activeTab === 'discord' && (
          <div className="bg-white border border-black/15 p-8 lg:p-10 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white text-[10px] font-black uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Official UltraOP Discord Guild</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#121212] font-heading tracking-tight">
                  10,000+ Gaming Community & Subscriber Hub
                </h3>

                <p className="text-[#555555] text-sm sm:text-base leading-relaxed font-medium">
                  Connect with fellow gamers, join multiplayer Minecraft SMP sessions, participate in community challenges, and discuss gaming strategies.
                </p>

                <div className="flex items-center gap-6 p-4 bg-[#F4F4F1] border border-black/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-black text-[#121212] font-mono">1,200+ Online</span>
                  </div>
                  <div className="h-4 w-px bg-black/20" />
                  <div className="text-sm font-black text-[#121212] font-mono">10,000+ Members</div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://discord.gg/ZQ2afmPvuP"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-8 py-4 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-xs uppercase tracking-[0.25em] flex items-center gap-2.5 transition-all inline-flex shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FF3E00]" />
                    Join Discord Server
                  </a>
                </div>
              </div>

              {/* Role Explorer */}
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#777777]">
                  Community Guild Roles & Perks:
                </h4>

                <div className="space-y-3">
                  {discordRoles.map(role => (
                    <div
                      key={role.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedRole(role.id);
                      }}
                      className={`p-5 border cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? 'bg-[#F4F4F1] border-black shadow-sm'
                          : 'bg-white border-black/10 hover:border-black/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-black text-[#121212] font-heading">{role.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FF3E00]">
                          {selectedRole === role.id ? 'Active Preview' : 'Click to inspect'}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#555555] font-medium pt-2">
                        {role.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#121212] shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
