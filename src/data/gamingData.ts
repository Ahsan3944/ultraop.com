import { Game, Channel, VideoItem, BlogPost, FanCreation, SetupSpec, GamePlayed, InstagramAccount, InstagramPost } from '../types';

export const GAMES_DATA: Game[] = [
  {
    id: 'esports-quiz',
    title: 'Multi-Game Esports & Gamer Trivia',
    category: 'Quiz',
    description: 'Select your game: Minecraft, Valorant, GTA V, Roblox, PUBG, or Free Fire! Test your gaming IQ against the clock and claim your verified gamer certificate.',
    plays: 345200,
    rating: 4.98,
    difficulty: 'Medium',
    badge: 'Multi-Game 🎮',
    color: 'from-amber-500 to-orange-600',
    thumbnail: 'https://images.unsplash.com/photo-1612287233207-681b4f4c2e63?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Choose from 6 gaming categories: Minecraft, Valorant, GTA V, Roblox, PUBG, or Free Fire',
      'Answer rapid-fire questions against the 15-second timer',
      'Chain correct answers for streak multipliers and bonus speed points',
      'Earn your verified UltraOP Pro Gamer Rank Certificate at the end!'
    ]
  },
  {
    id: 'zen-tile-calm',
    title: 'Zen Harmonic Flow (Relaxing 2048)',
    category: 'Relaxing',
    description: 'A soothing, meditative tile merge puzzle with calming harmonic chimes, soft ambient gradients, and infinite undo steps. Pure decompression.',
    plays: 184500,
    rating: 4.98,
    difficulty: 'Easy',
    badge: 'Zen Chill 🌿',
    color: 'from-teal-500 to-emerald-600',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Swipe (Touch/Mobile) or use Arrow Keys / WASD / Buttons to slide tiles',
      'Matching colors and numbers merge into harmonious glowing tiers',
      'Use the [Undo Step] anytime to experiment freely with zero rush',
      'Enjoy gentle sound chimes and reach the 2048 Zen Blossom!'
    ]
  },
  {
    id: 'bubble-zen-garden',
    title: 'Bubble Zen Garden & Color Bloom',
    category: 'Relaxing',
    description: 'Pop calming colored bubbles, trigger chain blossoms, and relax with gentle water rippling physics. No timers, no pressure, pure relaxation.',
    plays: 156200,
    rating: 4.95,
    difficulty: 'Easy',
    badge: 'Relaxing ✨',
    color: 'from-sky-500 to-indigo-500',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Tap or Click bubbles to pop them with soothing resonant chimes',
      'Connect 3+ matching bubbles to trigger calming flower cascades',
      'Switch between "Zen Free Play" and "Color Blossom" modes',
      'Compatible with phones, tablets, and desktops in any browser'
    ]
  },
  {
    id: 'aim-trainer',
    title: 'Reflex Aim Pro: Esports Edition',
    category: 'Reflex',
    description: 'Precision training tool designed for Valorant, Minecraft PVP, FPS & Battle Royale players to calibrate flick speed, target tracking, and reaction times.',
    plays: 289400,
    rating: 4.95,
    difficulty: 'Pro',
    badge: 'Pro Tier 🎯',
    color: 'from-cyan-500 to-blue-600',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Click or Tap the glowing neon targets as rapidly and accurately as possible',
      'Golden targets grant 3x Combo Points and time extensions',
      'Avoid decoy red hazard mines that break your streak',
      'Full touch and mouse support on mobile, tablet, and computer!'
    ]
  },
  {
    id: 'cyber-strike',
    title: 'Cyber Strike: Galaxy Ops',
    category: 'Action',
    description: 'Pilot the UltraOP cyber starship through neon asteroid belts, blast cyber drones, collect shield cores, and defeat boss flagships with responsive on-screen buttons or keyboard.',
    plays: 142800,
    rating: 4.9,
    difficulty: 'Medium',
    badge: 'Trending 🔥',
    color: 'from-purple-600 to-indigo-600',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Use Arrow Keys, A/D, or Mobile On-Screen Joypad to steer',
      'Press Spacebar or Fire Button to unleash laser bursts',
      'Collect Golden Power Cores for Triple Laser and Shield recharge',
      'Defeat enemy boss ships across multiple galaxy waves'
    ]
  },
  {
    id: 'neon-snake',
    title: 'Neon Cyber Snake',
    category: 'Arcade',
    description: 'Classic snake reinvented with cyber speed bursts, neon light trails, quantum energy portals, and smooth responsive touch D-pad for mobile and tablets.',
    plays: 198200,
    rating: 4.8,
    difficulty: 'Easy',
    badge: 'Classic ⚡',
    color: 'from-emerald-500 to-teal-600',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Use Arrow Keys, Swipe, or Touch D-Pad to steer the cyber snake',
      'Eat Glowing Energy Bits to extend your tail and boost your score',
      'Hold Shift or Turbo Button for high-speed score multiplier',
      'Avoid colliding with the perimeter or your own trail'
    ]
  },
  {
    id: 'cyber-dash',
    title: 'Ultra Cyber Dash',
    category: 'Casual',
    description: 'Navigate the high-speed anti-gravity hovercraft through cyber tunnels with precision tap controls and dynamic obstacle generators.',
    plays: 165000,
    rating: 4.7,
    difficulty: 'Medium',
    badge: 'Fast-Paced 🚀',
    color: 'from-pink-500 to-rose-600',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    instructions: [
      'Click, Spacebar or Tap screen anywhere to thrust upwards',
      'Time your descent smoothly to pass through energy gate gaps',
      'Collect Diamond tokens to unlock custom engine particle trails',
      'Beat the community high-score of 84 gates!'
    ]
  }
];

export const CREATOR_PROFILE = {
  name: 'Sk Ahsan Ahmad',
  gamerTag: 'UltraOP / Ahsan',
  role: 'Gaming Content Creator & Digital Storyteller',
  businessEmail: 'ultraopbiz@gmail.com',
  officialEmail: 'ultraopbiz@gmail.com',
  upiId: 'ultraop001@ybl',
  twitchUrl: 'https://www.twitch.tv/ultraoplive',
  kickUrl: 'https://kick.com/ultra-op-live',
  youtubeLiveUrl: 'https://www.youtube.com/@ultraoplive',
  youtubeMinecraftUrl: 'https://www.youtube.com/@ultraop2',
  youtubeRobloxUrl: 'https://www.youtube.com/@ultraop3',
  youtubeEarningsUrl: 'https://www.youtube.com/@ultraopearnings',
  youtubeAhsanNowUrl: 'https://www.youtube.com/@ahsannow',
  instagramMainUrl: 'https://www.instagram.com/ultraopp/',
  instagramEarningsUrl: 'https://www.instagram.com/op_earnings/',
  instagramAhsanNowUrl: 'https://www.instagram.com/ahsannow/',
  rooterUrl: 'https://www.rooter.gg/profile/142404154',
  discordUrl: 'https://discord.gg/ZQ2afmPvuP',
  whatsappUrl: 'https://www.whatsapp.com/channel/0029VaeMLDaHgZWfuPDefa0t'
};

export const CHANNELS_DATA: Channel[] = [
  {
    id: 'ultraoplive',
    name: 'Ultra OP Live',
    handle: '@ultraoplive',
    platform: 'YouTube',
    subscribers: '72K+',
    views: '19.8M+',
    streams: '485+ Live Streams & Videos',
    description: 'Primary live broadcasting channel! Daily Minecraft hardcore streams, competitive Valorant grinds, GTA V sessions, and interactive subscriber custom rooms.',
    url: 'https://www.youtube.com/@ultraoplive',
    instagramUrl: 'https://www.instagram.com/ultraopp/',
    instagramHandle: '@ultraopp',
    avatar: 'https://yt3.googleusercontent.com/9v3vhxLlT_xOVo1qKMH4aDT41QLlxFxraNI20vWjPpG8wZZdEQTRDyJvJngKIKlspJpPgO-8Dg=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: true,
    color: 'from-red-600 to-rose-700',
    focus: 'Daily Minecraft, Valorant & Variety Live'
  },
  {
    id: 'twitch-live',
    name: 'Ultra OP (Twitch)',
    handle: '@ultraoplive',
    platform: 'Twitch',
    subscribers: '38K+',
    views: '1.4M+',
    streams: '140+ Interactive Streams',
    description: 'Official Twitch live broadcast channel! High-framerate interactive gaming broadcasts, Valorant competitive ranked, Minecraft survival, and live chat challenges.',
    url: 'https://www.twitch.tv/ultraoplive',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-purple-600 to-indigo-700',
    focus: 'Twitch Live Streams & Valorant'
  },
  {
    id: 'kick-live',
    name: 'Ultra OP (Kick)',
    handle: '@ultra-op-live',
    platform: 'Kick',
    subscribers: '31K+',
    views: '960K+',
    streams: '85+ Squad Streams',
    description: 'Official Kick channel! High-energy live gaming sessions, GTA V modded stunts, subscriber multiplayer games, and watch parties.',
    url: 'https://kick.com/ultra-op-live',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-emerald-500 to-green-600',
    focus: 'Kick Live Gaming & GTA V'
  },
  {
    id: 'ultraop2',
    name: 'Ultra OP 2.0 (Minecraft)',
    handle: '@ultraop2',
    platform: 'YouTube',
    subscribers: '72K+',
    views: '16.5M+',
    streams: '125+ Videos & Streams',
    description: 'Dedicated Minecraft Hub! Daily live streams, hardcore 100 days survival, massive SMP redstone builds, Nether speedruns, and community multiplayer realms.',
    url: 'https://www.youtube.com/@ultraop2',
    avatar: 'https://yt3.googleusercontent.com/L6ufuunr66tm8_gwk4zB7YwU0rQMbZvrTvA5bvH_oK49kk8kk4fr7Z6j7p5QxBrCHG1HZNZi6A=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-emerald-600 to-teal-700',
    focus: 'Minecraft Hardcore Survival & Redstone'
  },
  {
    id: 'ultraop3',
    name: 'Roblox UltraOP3',
    handle: '@ultraop3',
    platform: 'YouTube',
    subscribers: '1.6K+',
    views: '108K+',
    streams: '3+ Videos',
    description: 'Roblox adventures! Impossible Obbies, Blox Fruits boss raids, Blade Ball tournaments, Brookhaven roleplay, and funny multiplayer sessions with viewers.',
    url: 'https://www.youtube.com/@ultraop3',
    avatar: 'https://yt3.googleusercontent.com/wZ0x3n7GzwjCyX6lAml3vH6RkugBPloy_p8O6QXBKQ6Eb5XR6vAb4QF432DrDLhPLbbOOVCftQ=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-blue-600 to-indigo-700',
    focus: 'Roblox Adventures & Blox Fruits'
  },
  {
    id: 'op-earnings',
    name: 'Op Earnings',
    handle: '@ultraopearnings',
    platform: 'YouTube',
    subscribers: '1.2K+',
    views: '58.5K+',
    streams: '5+ Videos',
    description: 'Gaming monetization strategies, YouTube creator growth masterclasses, sponsorship insights, and financial blueprints for budding creators.',
    url: 'https://www.youtube.com/@ultraopearnings',
    instagramUrl: 'https://www.instagram.com/op_earnings/',
    instagramHandle: '@op_earnings',
    avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-amber-600 to-yellow-600',
    focus: 'Creator Growth & Gaming Income'
  },
  {
    id: 'rooter-live',
    name: 'Ultra OP (Rooter)',
    handle: '@ultraop142404154',
    platform: 'Rooter',
    subscribers: '515.9K+',
    views: '65.2M+',
    streams: '1,700+ Broadcasts',
    description: 'Historic broadcast hub with over 515K+ followers and 65 Million views. Established the creator community through live gaming streams and custom rooms.',
    url: 'https://www.rooter.gg/profile/142404154',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isLive: false,
    color: 'from-orange-600 to-amber-700',
    focus: 'Rooter Streaming & Community Hub'
  }
];

export const GAMES_PLAYED_DATA: GamePlayed[] = [
  {
    id: 'minecraft',
    name: 'Minecraft',
    status: 'Daily Live Streams',
    statusColor: 'bg-emerald-500 text-white',
    iconName: 'Box',
    description: 'PRIMARY ACTIVE FOCUS. Daily live streams, hardcore 100 days survival challenges, large-scale SMP community servers, redstone automation engineering, and story-driven gameplay.',
    hoursPlayed: '3,200+ Hours',
    achievements: 'Hardcore 100 Days Master • UltraOP SMP Founder • 50+ Redstone Mega-Farms',
    peakRank: 'Hardcore Master Builder',
    image: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP (@ultraop2 & @ultraoplive)',
    streamUrl: 'https://www.youtube.com/@ultraop2'
  },
  {
    id: 'valorant',
    name: 'Valorant',
    status: 'Competitive Focus',
    statusColor: 'bg-rose-500 text-white',
    iconName: 'Crosshair',
    description: 'HIGH-TIER COMPETITIVE FPS. Maining Reyna, Jett, and Omen with crisp headshot precision, tactical lineups, ranked clutch grinds, and custom 5v5 scrims.',
    hoursPlayed: '1,650+ Hours',
    achievements: 'Ascendant 3 / Immortal Push • 1v5 Ace Clutches • 34% Average Headshot Rate',
    peakRank: 'Immortal 1 Peak',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP Live (@ultraoplive & Twitch)',
    streamUrl: 'https://www.youtube.com/@ultraoplive'
  },
  {
    id: 'gtav',
    name: 'Grand Theft Auto V',
    status: 'Active & Upcoming Series',
    statusColor: 'bg-amber-500 text-black',
    iconName: 'Gamepad',
    description: 'ACTIVE & UPCOMING SERIES. High-speed custom stunt races, Los Santos roleplay, daring heist challenges, and chaotic multiplayer lobbies with viewers.',
    hoursPlayed: '820+ Hours',
    achievements: 'Mastermind Heist Crew Leader • 100+ Custom Stunt Race Wins • Modded RP Veteran',
    peakRank: 'Los Santos Kingpin',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP Live (@ultraoplive & Kick)',
    streamUrl: 'https://kick.com/ultra-op-live'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    status: 'Community Sessions',
    statusColor: 'bg-blue-500 text-white',
    iconName: 'Gamepad',
    description: 'REGULAR COMMUNITY SESSIONS. Active streaming across Blox Fruits boss raids, impossible Obby speedruns, Blade Ball tourneys, and Brookhaven fun.',
    hoursPlayed: '1,100+ Hours',
    achievements: 'Top 1% Obby Speedrunner • Hosted 150+ Viewer Parties • Blade Ball Grand Champion',
    peakRank: 'Global Obby Champion',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP (@ultraop3)',
    streamUrl: 'https://www.youtube.com/@ultraop3'
  },
  {
    id: 'freefire',
    name: 'Free Fire Max',
    status: 'Historical Origins (2019–2022)',
    statusColor: 'bg-zinc-600 text-zinc-100',
    iconName: 'Flame',
    description: 'HISTORICAL ORIGINS. The early gaming foundation of UltraOP with 65 Million+ lifetime views, thousands of Grandmaster custom room victories, and classic drag-shot tutorials.',
    hoursPlayed: '4,500+ Hours',
    achievements: 'Grandmaster Top 50 • 65M+ Lifetime Views • 1,700+ Verified Live Broadcasts',
    peakRank: 'Grandmaster (Historic Region Top 50)',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP Live (Historical Archive)',
    streamUrl: 'https://www.youtube.com/@ultraoplive'
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile / BGMI',
    status: 'Played Long Ago (Veteran)',
    statusColor: 'bg-zinc-700 text-zinc-200',
    iconName: 'Shield',
    description: 'EARLY ORIGINS. High-stakes competitive scrims, Conqueror tier pushes, and insane sniper flick shots on Erangel during the golden era of mobile battle royale.',
    hoursPlayed: '2,200+ Hours',
    achievements: 'Conqueror Tier 5 Seasons • 24 Kills Squad Wipe • Erangel Sniper Master',
    peakRank: 'Conqueror Top 100',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    primaryStreamChannel: 'Ultra OP Live (Early Archive)',
    streamUrl: 'https://www.youtube.com/@ultraoplive'
  }
];

export const INSTAGRAM_ACCOUNTS_DATA: InstagramAccount[] = [
  {
    id: 'ig-main',
    handle: '@ultraopp',
    username: 'ultraopp',
    name: 'Sk Ahsan Ahmad',
    bio: 'Gaming Content Creator & Streamer • Daily Stream Highlights & Setups • UltraOP Army',
    url: 'https://www.instagram.com/ultraopp/',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    followers: '45.8K+',
    postsCount: '320+ Posts',
    badge: 'Main Gaming & Streamer Profile'
  },
  {
    id: 'ig-earnings',
    handle: '@op_earnings',
    username: 'op_earnings',
    name: 'OP Earnings Official',
    bio: 'Gaming Monetization • Creator Business Blueprints • Redeem Codes & Daily Tips',
    url: 'https://www.instagram.com/op_earnings/',
    avatar: 'https://yt3.googleusercontent.com/PJidD4i8HuuGLeVkGHxwPCOmbyJ_l7ZdrCWCbxxYL4fYPIjaTnX6KaiuXcd0AoUUNKfE6sucLK0=s900-c-k-c0x00ffffff-no-rj',
    followers: '12.4K+',
    postsCount: '95+ Guides',
    badge: 'Monetization & Tech'
  },
  {
    id: 'ig-ahsannow',
    handle: '@ahsannow',
    username: 'ahsannow',
    name: 'Ahsan Now (Lifestyle)',
    bio: 'Behind The Scenes • Tech Lifestyle & Vlogs • Life Outside the Stream',
    url: 'https://www.instagram.com/ahsannow/',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    followers: '28.6K+',
    postsCount: '180+ Posts',
    badge: 'Personal & Vlogs'
  }
];

export const INSTAGRAM_POSTS_DATA: InstagramPost[] = [
  // @ultraopp posts (Account 1)
  {
    id: 'ig-post-1',
    accountId: 'ig-main',
    accountHandle: '@ultraopp',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    caption: 'Grandmaster rank unlocked in Solo vs Squad! Unbelievable 22 kills clutch 🔥',
    likes: '14.2K',
    comments: '482',
    tag: '#UltraOP #GamingLive #ClutchMoment',
    date: '2 days ago',
    permalink: 'https://www.instagram.com/ultraopp/'
  },
  {
    id: 'ig-post-2',
    accountId: 'ig-main',
    accountHandle: '@ultraopp',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    caption: 'New 2025 Streaming Studio Upgrade! Dual PC setup + Shure SM7B test live.',
    likes: '18.9K',
    comments: '630',
    tag: '#StreamerLife #GamingSetup #Creator',
    date: '4 days ago',
    permalink: 'https://www.instagram.com/ultraopp/'
  },
  {
    id: 'ig-post-3',
    accountId: 'ig-main',
    accountHandle: '@ultraopp',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    caption: 'Minecraft Hardcore 100 Days survival realm landmark celebration! 50K diamonds mined 💎',
    likes: '24.1K',
    comments: '1.2K',
    tag: '#MinecraftSMP #Hardcore #UltraOPFam',
    date: '1 week ago',
    permalink: 'https://www.instagram.com/ultraopp/'
  },

  // @op_earnings posts (Account 2)
  {
    id: 'ig-earn-1',
    accountId: 'ig-earnings',
    accountHandle: '@op_earnings',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    caption: 'Top 3 Google Play Redeem Code methods tested & verified for 2025 (100% Real Proof) 💰',
    likes: '8.4K',
    comments: '312',
    tag: '#RedeemCode #OPEarnings #GooglePlay',
    date: '3 days ago',
    permalink: 'https://www.instagram.com/op_earnings/'
  },
  {
    id: 'ig-earn-2',
    accountId: 'ig-earnings',
    accountHandle: '@op_earnings',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    caption: 'Creator Growth Guide: How to scale your gaming channel from 0 to 10K subscribers in 90 days 📈',
    likes: '11.2K',
    comments: '450',
    tag: '#CreatorEconomy #YouTubeTips #GamingGuide',
    date: '5 days ago',
    permalink: 'https://www.instagram.com/op_earnings/'
  },
  {
    id: 'ig-earn-3',
    accountId: 'ig-earnings',
    accountHandle: '@op_earnings',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=80',
    caption: 'Monthly Revenue Proof: Full brand sponsorship & YouTube superchat breakdown transparently.',
    likes: '15.6K',
    comments: '580',
    tag: '#Monetization #EarningsProof #StreamIncome',
    date: '1 week ago',
    permalink: 'https://www.instagram.com/op_earnings/'
  },

  // @ahsannow posts (Account 3)
  {
    id: 'ig-ahsan-1',
    accountId: 'ig-ahsannow',
    accountHandle: '@ahsannow',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    caption: 'Day in the life of a full-time gaming creator: Grind, shoot, edit, stream repeat! 🎬',
    likes: '9.8K',
    comments: '284',
    tag: '#CreatorLife #Vlog #AhsanNow',
    date: '2 days ago',
    permalink: 'https://www.instagram.com/ahsannow/'
  },
  {
    id: 'ig-ahsan-2',
    accountId: 'ig-ahsannow',
    accountHandle: '@ahsannow',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    caption: 'New portable creator desk & wireless audio gear unboxing for travel vlog streams! ✈️📸',
    likes: '13.5K',
    comments: '410',
    tag: '#TechLifestyle #DeskSetup #CreatorGear',
    date: '6 days ago',
    permalink: 'https://www.instagram.com/ahsannow/'
  },
  {
    id: 'ig-ahsan-3',
    accountId: 'ig-ahsannow',
    accountHandle: '@ahsannow',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
    caption: 'Connecting with our amazing community offline at India Gaming Expo 2025! 🤝🔥',
    likes: '21.3K',
    comments: '890',
    tag: '#CommunityFirst #GamerMeetup #UltraOPFam',
    date: '1 week ago',
    permalink: 'https://www.instagram.com/ahsannow/'
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  // OP EARNINGS VIDEOS (Channel ID: UC-KkWDruqOobwZgylSb4kwA)
  {
    id: 'vid-26EBm2CBvRc',
    title: 'Top 1 - Free Redeem Code App 2024 | Free Fire Diamond App | Google Play Redeem Code App 2024',
    views: '5.8K views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Op Earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    channelHandle: '@ultraopearnings',
    channelUrl: 'https://www.youtube.com/watch?v=26EBm2CBvRc',
    category: 'Earnings',
    categories: ['Earnings'],
    thumbnail: 'https://i.ytimg.com/vi/26EBm2CBvRc/hqdefault.jpg',
    youtubeId: '26EBm2CBvRc',
    videoUrl: 'https://www.youtube.com/watch?v=26EBm2CBvRc',
    isPopular: true
  },
  {
    id: 'vid-Kl7LoAOxDg8',
    title: 'Free Redeem Code (100% Real) | Free Redeem Code App | Google Play Redeem Code App',
    views: '10.0K views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Op Earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    channelHandle: '@ultraopearnings',
    channelUrl: 'https://www.youtube.com/watch?v=Kl7LoAOxDg8',
    category: 'Earnings',
    categories: ['Earnings'],
    thumbnail: 'https://i.ytimg.com/vi/Kl7LoAOxDg8/hqdefault.jpg',
    youtubeId: 'Kl7LoAOxDg8',
    videoUrl: 'https://www.youtube.com/watch?v=Kl7LoAOxDg8',
    isPopular: true
  },
  {
    id: 'vid-k812I7OyOio',
    title: '100% Free ₹100-800/- Redeem Code | No App Download🔥✌️| How to get free google redeem code',
    views: '9.3K views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Op Earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    channelHandle: '@ultraopearnings',
    channelUrl: 'https://www.youtube.com/watch?v=k812I7OyOio',
    category: 'Earnings',
    categories: ['Earnings'],
    thumbnail: 'https://i.ytimg.com/vi/k812I7OyOio/hqdefault.jpg',
    youtubeId: 'k812I7OyOio',
    videoUrl: 'https://www.youtube.com/watch?v=k812I7OyOio',
    isPopular: true
  },
  {
    id: 'vid-cXe9WxNCFUM',
    title: 'How to Get Free 800rs Google Play Redeem Code | Free fire redeem code free in 2024- Garena | Part- 2',
    views: '1.2K views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Op Earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    channelHandle: '@ultraopearnings',
    channelUrl: 'https://www.youtube.com/watch?v=cXe9WxNCFUM',
    category: 'Earnings',
    categories: ['Earnings'],
    thumbnail: 'https://i.ytimg.com/vi/cXe9WxNCFUM/hqdefault.jpg',
    youtubeId: 'cXe9WxNCFUM',
    videoUrl: 'https://www.youtube.com/watch?v=cXe9WxNCFUM'
  },
  {
    id: 'vid-3CB9A50Ubn0',
    title: '100% Free Redeem Code | Free fire redeem code free in 2024',
    views: '3.0K views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Op Earnings',
    channelId: 'UC-KkWDruqOobwZgylSb4kwA',
    channelHandle: '@ultraopearnings',
    channelUrl: 'https://www.youtube.com/watch?v=3CB9A50Ubn0',
    category: 'Earnings',
    categories: ['Earnings'],
    thumbnail: 'https://i.ytimg.com/vi/3CB9A50Ubn0/hqdefault.jpg',
    youtubeId: '3CB9A50Ubn0',
    videoUrl: 'https://www.youtube.com/watch?v=3CB9A50Ubn0'
  },

  // ULTRAOP LIVE (Channel ID: UCAxlmL3_721xzOjQVe5Klbg)
  {
    id: 'vid-RcM3ej_rzxE',
    title: '🔴 Minecraft LIVE After a Long Break! 🍌 AppleMC Banana Realm | Hindi',
    views: '38 views',
    duration: 'LIVE',
    date: 'Recent Live',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=RcM3ej_rzxE',
    category: 'Minecraft',
    categories: ['Minecraft', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/RcM3ej_rzxE/hqdefault.jpg',
    youtubeId: 'RcM3ej_rzxE',
    videoUrl: 'https://www.youtube.com/watch?v=RcM3ej_rzxE',
    isLive: true
  },
  {
    id: 'vid-NEgPxmQsZwQ',
    title: '🔴 Minecraft LIVE After a Long Break! 🍌 AppleMC Banana Realm | Hindi',
    views: '139 views',
    duration: 'LIVE',
    date: 'Recent Live',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=NEgPxmQsZwQ',
    category: 'Minecraft',
    categories: ['Minecraft', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/NEgPxmQsZwQ/hqdefault.jpg',
    youtubeId: 'NEgPxmQsZwQ',
    videoUrl: 'https://www.youtube.com/watch?v=NEgPxmQsZwQ',
    isLive: true
  },
  {
    id: 'vid-XM05NbDpuCI',
    title: '15 August Special 🇮🇳 Aaj AppleMC Survival Mein Kya Hone Wala Hai? 🔥 | Minecraft LIVE',
    views: '121 views',
    duration: 'LIVE',
    date: 'Recent Live',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=XM05NbDpuCI',
    category: 'Minecraft',
    categories: ['Minecraft', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/XM05NbDpuCI/hqdefault.jpg',
    youtubeId: 'XM05NbDpuCI',
    videoUrl: 'https://www.youtube.com/watch?v=XM05NbDpuCI',
    isLive: true
  },
  {
    id: 'vid-mP_xmymbBSs',
    title: "I Challenged AppleMC's Best BedWars Player",
    views: '83 views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=mP_xmymbBSs',
    category: 'Minecraft',
    categories: ['Minecraft', 'Highlights'],
    thumbnail: 'https://i.ytimg.com/vi/mP_xmymbBSs/hqdefault.jpg',
    youtubeId: 'mP_xmymbBSs',
    videoUrl: 'https://www.youtube.com/watch?v=mP_xmymbBSs'
  },
  {
    id: 'vid-X4b9GnFcMKQ',
    title: '🔴 VALORANT LIVE | Noob to Pro Journey 🎯 | Ranked Gameplay',
    views: '43 views',
    duration: 'LIVE',
    date: 'Recent Live',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=X4b9GnFcMKQ',
    category: 'Valorant',
    categories: ['Valorant', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/X4b9GnFcMKQ/hqdefault.jpg',
    youtubeId: 'X4b9GnFcMKQ',
    videoUrl: 'https://www.youtube.com/watch?v=X4b9GnFcMKQ',
    isLive: true
  },
  {
    id: 'vid-OfWFFxB4jMc',
    title: '🔴 VALORANT LIVE | Noob to Pro Journey 🎯 | Ranked Gameplay',
    views: '72 views',
    duration: 'LIVE',
    date: 'Recent Live',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=OfWFFxB4jMc',
    category: 'Valorant',
    categories: ['Valorant', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/OfWFFxB4jMc/hqdefault.jpg',
    youtubeId: 'OfWFFxB4jMc',
    videoUrl: 'https://www.youtube.com/watch?v=OfWFFxB4jMc',
    isLive: true
  },
  {
    id: 'vid-35_2eYyWjSI',
    title: "I Found the RICHEST Player's SECRET Base in Minecraft... 😱",
    views: '190 views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Ultra OP Live',
    channelId: 'UCAxlmL3_721xzOjQVe5Klbg',
    channelHandle: '@ultraoplive',
    channelUrl: 'https://www.youtube.com/watch?v=35_2eYyWjSI',
    category: 'Minecraft',
    categories: ['Minecraft'],
    thumbnail: 'https://i.ytimg.com/vi/35_2eYyWjSI/hqdefault.jpg',
    youtubeId: '35_2eYyWjSI',
    videoUrl: 'https://www.youtube.com/watch?v=35_2eYyWjSI'
  },

  // ROBLOX ULTRAOP3 (Channel ID: UCKdJiKSiO382Hvczh_Q2kyg)
  {
    id: 'vid-wXd9UzB2qf4',
    title: 'INSANE Sniper Kill Streak in Roblox Sniper Arena!',
    views: '3 views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Roblox UltraOP3',
    channelId: 'UCKdJiKSiO382Hvczh_Q2kyg',
    channelHandle: '@ultraop3',
    channelUrl: 'https://www.youtube.com/watch?v=wXd9UzB2qf4',
    category: 'Roblox',
    categories: ['Roblox', 'Highlights'],
    thumbnail: 'https://i.ytimg.com/vi/wXd9UzB2qf4/hqdefault.jpg',
    youtubeId: 'wXd9UzB2qf4',
    videoUrl: 'https://www.youtube.com/watch?v=wXd9UzB2qf4'
  },
  {
    id: 'vid-vWcmAkMBCZE',
    title: 'Best Sniper Moments in Roblox Sniper Arena | Full Gameplay',
    views: '2 views',
    duration: '1080p HD',
    date: 'Recent',
    channel: 'Roblox UltraOP3',
    channelId: 'UCKdJiKSiO382Hvczh_Q2kyg',
    channelHandle: '@ultraop3',
    channelUrl: 'https://www.youtube.com/watch?v=vWcmAkMBCZE',
    category: 'Roblox',
    categories: ['Roblox', 'Highlights'],
    thumbnail: 'https://i.ytimg.com/vi/vWcmAkMBCZE/hqdefault.jpg',
    youtubeId: 'vWcmAkMBCZE',
    videoUrl: 'https://www.youtube.com/watch?v=vWcmAkMBCZE'
  },
  {
    id: 'vid-57QzBKdMa0Q',
    title: 'CHILL STREAM LEARNING HOW TO PLAY VALO |GIRL GAMER | VALO LIVE IN IND | [ROAD TO 10000 SUBS]',
    views: '12 views',
    duration: 'LIVE',
    date: 'Past Stream',
    channel: 'Roblox UltraOP3',
    channelId: 'UCKdJiKSiO382Hvczh_Q2kyg',
    channelHandle: '@ultraop3',
    channelUrl: 'https://www.youtube.com/watch?v=57QzBKdMa0Q',
    category: 'Valorant',
    categories: ['Valorant', 'Live Streams'],
    thumbnail: 'https://i.ytimg.com/vi/57QzBKdMa0Q/hqdefault.jpg',
    youtubeId: '57QzBKdMa0Q',
    videoUrl: 'https://www.youtube.com/watch?v=57QzBKdMa0Q',
    isLive: true
  },

  // ULTRAOP MINECRAFT (Channel ID: UC-ASoLp2wfxVLJFDnVXwrGA)
  {
    id: 'vid-TyQxiBQeSCQ',
    title: '🔴 Minecraft Falling Pickaxe #shorts',
    views: '5.9K views',
    duration: 'SHORT',
    date: 'Recent',
    channel: 'Ultra OP 2.0 (Minecraft)',
    channelId: 'UC-ASoLp2wfxVLJFDnVXwrGA',
    channelHandle: '@ultraop2',
    channelUrl: 'https://www.youtube.com/watch?v=TyQxiBQeSCQ',
    category: 'Minecraft',
    categories: ['Minecraft'],
    thumbnail: 'https://i.ytimg.com/vi/TyQxiBQeSCQ/hqdefault.jpg',
    youtubeId: 'TyQxiBQeSCQ',
    videoUrl: 'https://www.youtube.com/watch?v=TyQxiBQeSCQ'
  },
  {
    id: 'vid-GKDeCtOQ2TA',
    title: '🔴 Minecraft Falling Pickaxe #shorts',
    views: '5.7K views',
    duration: 'SHORT',
    date: 'Recent',
    channel: 'Ultra OP 2.0 (Minecraft)',
    channelId: 'UC-ASoLp2wfxVLJFDnVXwrGA',
    channelHandle: '@ultraop2',
    channelUrl: 'https://www.youtube.com/watch?v=GKDeCtOQ2TA',
    category: 'Minecraft',
    categories: ['Minecraft'],
    thumbnail: 'https://i.ytimg.com/vi/GKDeCtOQ2TA/hqdefault.jpg',
    youtubeId: 'GKDeCtOQ2TA',
    videoUrl: 'https://www.youtube.com/watch?v=GKDeCtOQ2TA'
  }
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'pro-sensitivity-2025',
    title: 'The Ultimate Crosshair & DPI Guide for Minecraft PVP & Valorant (2025)',
    excerpt: 'Detailed breakdown of the exact mouse eDPI, tick-rate polling, and crosshair placement techniques used by Ahsan UltraOP across competitive titles.',
    content: [
      'Mastering crosshair placement across competitive games requires mathematically dialed-in sensitivity suited to your display refresh rate and mouse sensor polling rate.',
      'Valorant & Tactical Shooters: Low eDPI (around 240-300 eDPI, e.g., 800 DPI at 0.32 sensitivity) delivers pixel-perfect micro-adjustments for instant 1-tap headshots.',
      'Minecraft PVP & Movement: Slightly higher sensitivity (around 800 DPI at 55% in-game sensitivity) allows fast 360-degree block placing, W-tapping, and critical hit tracking.',
      'Display Optimization: Running on a 165Hz or 240Hz monitor with ultra-low response times reduces motion blur and sharpens reaction time.'
    ],
    readTime: '4 min read',
    date: 'August 16, 2025',
    author: 'Sk Ahsan Ahmad (UltraOP)',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80',
    likes: 1540,
    tags: ['Aim Precision', 'DPI Guide', 'Valorant', 'Minecraft PVP', 'Pro Gaming']
  },
  {
    id: 'gaming-creator-monetization',
    title: 'How to Build & Monetize a Gaming Channel in India (₹1.5L+ Monthly Blueprint)',
    excerpt: 'Step-by-step roadmap for budding content creators to unlock brand sponsorships, platform revenue, and live stream superchats across YouTube, Twitch & Kick.',
    content: [
      'Building a loyal gaming audience starts with discovering your niche—whether it is daily Minecraft SMP storytelling, gadget tech reviews, or high-octane competitive clutch broadcasts.',
      'Multi-Channel Strategy: Use dedicated channels for specific content themes (e.g. OP Earnings for tech and career, Ultra OP 2 for daily Minecraft survival, and Ultra OP Live for multi-game streams).',
      'Sponsorship Alignment: Partner with reputable gaming brands, accessories, and fintech tools once you cross consistent active viewer thresholds.',
      'Community Culture: Host regular subscriber custom rooms, share VIP Discord roles, and interact directly with your community.'
    ],
    readTime: '6 min read',
    date: 'August 10, 2025',
    author: 'Ahsan (OP Earnings)',
    category: 'Creator Tips',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&auto=format&fit=crop&q=80',
    likes: 1290,
    tags: ['Stream Monetization', 'OP Earnings', 'YouTube Strategy', 'Career']
  },
  {
    id: 'best-streaming-gear-budget',
    title: 'Top Budget Gaming & Streaming Tech for Creators (Under ₹25,000)',
    excerpt: 'A curated list of affordable condenser microphones, USB capture cards, ring lights, and monitors tested on Ahsan Now.',
    content: [
      'You do not need an overpriced setup to start producing high quality videos. Here is the curated gear list tested and approved on @ahsannow.',
      'Audio: A quality cardioid USB condenser microphone with boom arm delivers studio noise isolation for under ₹3,500.',
      'Capture & Streaming: An HDMI 1080p 60FPS video capture card paired with OBS Studio allows lag-free console and mobile streaming.',
      'Lighting: A 12-inch bi-color LED ring light transforms any webcam or smartphone camera into an ultra-crisp streamer facecam.'
    ],
    readTime: '5 min read',
    date: 'July 30, 2025',
    author: 'Ahsan Now Tech Desk',
    category: 'Gaming Tech',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80',
    likes: 1040,
    tags: ['Gadgets', 'Ahsan Now', 'Budget Studio', 'Tech Review']
  }
];

export const FAN_CREATIONS: FanCreation[] = [
  {
    id: 'fan-1',
    author: 'Rahul "SniperKing"',
    authorTag: 'VIP Community Member',
    title: 'Cyberpunk Ahsan UltraOP 3D Render Art',
    type: 'Fan Art',
    likes: 520,
    views: '10.4K',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    date: 'Yesterday'
  },
  {
    id: 'fan-2',
    author: 'Priya Sharma',
    authorTag: 'Minecraft SMP Realm Builder',
    title: 'UltraOP SMP Castle Replica in Hardcore Mode',
    type: 'Gameplay Clip',
    likes: 430,
    views: '8.9K',
    image: 'https://images.unsplash.com/photo-1627856014754-2907e2055704?w=600&auto=format&fit=crop&q=80',
    date: '3 days ago'
  },
  {
    id: 'fan-3',
    author: 'Dev "AimGod"',
    authorTag: 'Tournament Champion',
    title: 'Valorant 1v5 Ace & Minecraft PVP Montage',
    type: 'Montage',
    likes: 710,
    views: '16.2K',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    date: '5 days ago'
  }
];

export const SETUP_SPECS: SetupSpec[] = [
  {
    category: 'Creator Battle Station & PC Rig',
    items: [
      { name: 'Primary Display', value: 'Acer Curved 165Hz/240Hz High-Refresh Gaming Monitor', iconName: 'Monitor' },
      { name: 'Secondary Display', value: 'Acer Multi-Tasking Chat & Stream Control Monitor', iconName: 'Tv' },
      { name: 'Headset', value: 'HyperX Cloud Gaming Headset with Spatial Surround Audio', iconName: 'Mic' },
      { name: 'Microphone & Audio', value: 'Broadcast Studio Boom Arm Mic with Pop Filter & Audio Interface', iconName: 'Mic' },
      { name: 'Gaming PC Tower', value: 'Custom Tempered Glass Dual-Chamber Rig with ARGB Liquid Cooling', iconName: 'Cpu' },
      { name: 'Keyboard & Mouse', value: 'Custom RGB Backlit Mechanical Keyboard + Precision Gaming Mouse', iconName: 'HardDrive' },
      { name: 'Studio Acoustics', value: 'Studio Red & Charcoal Acoustic Foam Sound-Proofing Tiles', iconName: 'Radio' }
    ]
  },
  {
    category: 'Mobile Esports & Streaming Gear',
    items: [
      { name: 'Primary Mobile', value: 'ASUS ROG Phone 8 Pro (165Hz AMOLED, Snapdragon 8 Gen 3)', iconName: 'Smartphone' },
      { name: 'Secondary Phone', value: 'Apple iPhone 15 Pro Max (120Hz ProMotion)', iconName: 'Smartphone' },
      { name: 'Face Camera', value: 'Sony Alpha ZV-E10 Mirrorless 4K Stream Cam', iconName: 'Camera' },
      { name: 'Capture Hardware', value: 'Elgato 4K60 Pro PCIe + HD60 X External Stream Capture', iconName: 'Radio' },
      { name: 'Desk Surface', value: 'Extended High-Glide Micro-Woven Gaming Desk Mat', iconName: 'HardDrive' }
    ]
  }
];

export const STATS_DATA = [
  { label: 'Total Community Views', value: 65200000, suffix: '+', icon: 'Eye' },
  { label: 'YouTube Network Subs', value: 410000, suffix: '+', icon: 'Users' },
  { label: 'Rooter Followers', value: 515900, suffix: '+', icon: 'Radio' },
  { label: 'Live Broadcasts Hosted', value: 1700, suffix: '+', icon: 'Award' }
];

export const GAMES_PLAYED = GAMES_PLAYED_DATA;

export interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface GameTriviaCategory {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  color: string;
  themeGradient: string;
  icon: string;
  description: string;
  questions: TriviaQuestion[];
}

export const MULTI_GAME_TRIVIA: Record<string, GameTriviaCategory> = {
  minecraft: {
    id: 'minecraft',
    title: 'Minecraft Pro Builder & Survival Trivia',
    shortTitle: 'Minecraft',
    badge: '🧱 Block Master',
    color: 'border-emerald-500 text-emerald-400',
    themeGradient: 'from-emerald-500 to-teal-600',
    icon: 'Box',
    description: 'Test your knowledge on redstone automation, crafting recipes, Nether boss fights, and hardcore survival mechanics!',
    questions: [
      {
        question: 'Which item is required in a Smithing Table alongside a Diamond tool to upgrade it to Netherite in modern Minecraft?',
        options: ['Netherite Scrap', 'Netherite Upgrade Smithing Template', 'Blaze Rod', 'Dragon Breath'],
        correct: 1,
        explanation: 'In Minecraft 1.20+, upgrading diamond gear to Netherite requires finding a Netherite Upgrade Smithing Template inside a Bastion Remnant!'
      },
      {
        question: 'What is the maximum number of blocks a standard Piston can push in vanilla Minecraft?',
        options: ['10 Blocks', '12 Blocks', '15 Blocks', '16 Blocks'],
        correct: 1,
        explanation: 'A regular or sticky piston can push a maximum of exactly 12 blocks at one time.'
      },
      {
        question: 'Which hostile mob in the Deep Dark biome has 500 HP (250 Hearts) and is immune to knockback?',
        options: ['The Wither', 'Ender Dragon', 'The Warden', 'Elder Guardian'],
        correct: 2,
        explanation: 'The Warden has 500 HP and attacks using sonic booms, making it the highest HP mob in standard vanilla Minecraft.'
      },
      {
        question: 'Which enchantment prevents your tools and armor from disappearing when you die, instead binding them (or vanishing on death)?',
        options: ['Curse of Binding', 'Curse of Vanishing', 'Mending', 'Unbreaking III'],
        correct: 1,
        explanation: 'Curse of Vanishing causes the item to completely disappear forever if you die while carrying it.'
      },
      {
        question: 'What ingredient is brewed with an Awkward Potion to create a Potion of Fire Resistance?',
        options: ['Blaze Powder', 'Ghast Tear', 'Magma Cream', 'Fermented Spider Eye'],
        correct: 2,
        explanation: 'Magma Cream brewed with an Awkward Potion creates an 8-minute or 3-minute Potion of Fire Resistance for exploring the Nether!'
      }
    ]
  },
  valorant: {
    id: 'valorant',
    title: 'Valorant Tactical Esports & Agent Trivia',
    shortTitle: 'Valorant',
    badge: '🎯 Radiant Aim',
    color: 'border-rose-500 text-rose-400',
    themeGradient: 'from-rose-500 to-red-600',
    icon: 'Crosshair',
    description: 'Test your tactical game sense on agent abilities, ultimate points, weapon economy, and map callouts!',
    questions: [
      {
        question: 'How long does the Spike take to detonate from the moment it is planted in competitive Valorant?',
        options: ['35 Seconds', '40 Seconds', '45 Seconds', '50 Seconds'],
        correct: 2,
        explanation: 'The Spike takes exactly 45 seconds to detonate, with a 7-second defuse time (or 3.5 seconds to reach the half-defuse checkpoint).'
      },
      {
        question: 'Which Agent category does Reyna belong to in Valorant?',
        options: ['Initiator', 'Controller', 'Duelist', 'Sentinel'],
        correct: 2,
        explanation: 'Reyna is a pure self-sufficient Duelist who thrives on securing entry kills and utilizing Dismiss / Devour souls.'
      },
      {
        question: 'What is the full price of the Vandal assault rifle in the buy menu?',
        options: ['2,700 Credits', '2,900 Credits', '3,200 Credits', '4,700 Credits'],
        correct: 1,
        explanation: 'Both the Vandal and Phantom cost exactly 2,900 Credits in the tactical buy menu.'
      },
      {
        question: 'Which Agent possesses the ultimate ability "Resurrection" that revives a fallen teammate with full HP?',
        options: ['Skye', 'Sage', 'Killjoy', 'Deadlock'],
        correct: 1,
        explanation: 'Sage uses her Radiant healing magic to cast Resurrection on a dead ally soul orb.'
      },
      {
        question: 'How many Ultimate Points are required to activate Jett’s "Blade Storm" ultimate?',
        options: ['7 Points', '8 Points', '9 Points', '6 Points'],
        correct: 1,
        explanation: 'Jett requires 8 Ultimate Points to summon her set of 5 deadly, highly accurate throwing knives.'
      }
    ]
  },
  gtav: {
    id: 'gtav',
    title: 'Grand Theft Auto V & Los Santos Trivia',
    shortTitle: 'GTA V',
    badge: '🚗 Los Santos Kingpin',
    color: 'border-amber-500 text-amber-400',
    themeGradient: 'from-amber-500 to-yellow-600',
    icon: 'Gamepad',
    description: 'Test your Los Santos criminal mastermind skills across story heists, vehicles, and crazy stunt mechanics!',
    questions: [
      {
        question: 'What are the names of the three main playable protagonists in the GTA V story campaign?',
        options: ['Franklin, Michael & Trevor', 'CJ, Tommy & Claude', 'Nico, Roman & Brucie', 'Arthur, John & Dutch'],
        correct: 0,
        explanation: 'Franklin Clinton, Michael De Santa, and Trevor Philips form the legendary trio of Los Santos!'
      },
      {
        question: 'What is the special ability of Franklin Clinton when driving vehicles in GTA V?',
        options: ['Invulnerability shield', 'Time slowdown for precision handling', 'Bullet damage multiplier', 'Super jump thrust'],
        correct: 1,
        explanation: 'Franklin has the Driving Focus special ability which slows down time, allowing him to take sharp corners and dodge traffic at top speeds.'
      },
      {
        question: 'What is the highest mountain peak in the state of San Andreas in GTA V?',
        options: ['Mount Chiliad', 'Mount Gordo', 'Mount Josiah', 'Vinewood Hills'],
        correct: 0,
        explanation: 'Mount Chiliad is the tallest mountain peak in GTA V, famous for stunt bike leaps and the mysterious cable car station.'
      },
      {
        question: 'Which massive heist finale in GTA V Story Mode targets the Union Depository for gold bullion?',
        options: ['The Jewel Store Job', 'The Paleto Score', 'The Big Score', 'The Bureau Raid'],
        correct: 2,
        explanation: 'The Big Score is the ultimate heist targeting the Union Depository for over $200,000,000 worth of gold bars!'
      },
      {
        question: 'In GTA Online, which military base contains fighter jets (P-996 Lazer) and tanks?',
        options: ['Fort Zancudo', 'Bolingbroke Penitentiary', 'Los Santos International Airport', 'Merryweather Docks'],
        correct: 0,
        explanation: 'Fort Zancudo is the heavily fortified military base located on Route 68 in Blaine County.'
      }
    ]
  },
  roblox: {
    id: 'roblox',
    title: 'Roblox Universe & Community Trivia',
    shortTitle: 'Roblox',
    badge: '🕹️ Obby Master',
    color: 'border-blue-500 text-blue-400',
    themeGradient: 'from-blue-500 to-indigo-600',
    icon: 'Gamepad',
    description: 'Test your knowledge on Blox Fruits, Doors entities, Brookhaven roleplay, and legendary Roblox experiences!',
    questions: [
      {
        question: 'In Roblox Blox Fruits, what are the three main fighting seas players progress through?',
        options: ['Alpha, Beta & Gamma Sea', 'First Sea, Second Sea & Third Sea', 'Oceania, Atlantis & Pacific', 'East Blue, West Blue & Grand Line'],
        correct: 1,
        explanation: 'Players journey from the First Sea (Old World) to Second Sea at level 700, and Third Sea at level 1500!'
      },
      {
        question: 'In the popular horror game "DOORS" on Roblox, which entity rushes down the hallway flickering the lights?',
        options: ['Figure', 'Seek', 'Rush', 'Screech'],
        correct: 2,
        explanation: 'Rush flickers room lights as an early warning before flying through the room, requiring players to quickly hide inside a closet or under a bed.'
      },
      {
        question: 'What is the official virtual currency used to buy avatar accessories, gamepasses, and server VIPs on Roblox?',
        options: ['V-Bucks', 'Robux (R$)', 'Minecoins', 'Gems'],
        correct: 1,
        explanation: 'Robux is the global official currency of the Roblox platform.'
      },
      {
        question: 'What is the common term used on Roblox for obstacle course parkour challenge games?',
        options: ['Obby', 'Raid', 'SMP', 'Scramble'],
        correct: 0,
        explanation: '"Obby" is the universally recognized short term for obstacle course games on Roblox.'
      },
      {
        question: 'In Roblox "Blade Ball", what is the primary objective of players in the arena?',
        options: ['Build the tallest tower', 'Deflect the homing ball with sword swings without getting hit', 'Collect 100 gold coins', 'Shoot arrows at flying targets'],
        correct: 1,
        explanation: 'Blade Ball challenges players to time their sword strikes and abilities to deflect a high-speed homing energy ball at opponents!'
      }
    ]
  },
  pubg: {
    id: 'pubg',
    title: 'PUBG Mobile & BGMI Battle Royale Trivia',
    shortTitle: 'PUBG / BGMI',
    badge: '🪂 Erangel Veteran',
    color: 'border-orange-500 text-orange-400',
    themeGradient: 'from-orange-500 to-red-600',
    icon: 'Shield',
    description: 'Test your veteran battle royale instincts on Erangel hot-drops, weapon recoil, airdrop crates, and zone rotations!',
    questions: [
      {
        question: 'Which iconic sniper rifle found only in Air Drop crates in PUBG/BGMI uses specialized .300 Magnum ammo?',
        options: ['Kar98k', 'M24', 'AWM', 'Mosin Nagant'],
        correct: 2,
        explanation: 'The AWM is the king of snipers in PUBG, capable of knocking an enemy wearing a Level 3 Helmet with a single headshot using .300 Magnum ammunition.'
      },
      {
        question: 'Which legendary hot-drop location is situated right in the center of the original Erangel map?',
        options: ['Pochinki', 'Novorepnoye', 'Sosnovka Military Base', 'Georgopol'],
        correct: 0,
        explanation: 'Pochinki is the bustling town located dead-center on Erangel, famous for aggressive early squad combat and roof-jumping.'
      },
      {
        question: 'What is the highest competitive tier rank achievable in PUBG Mobile / BGMI before reaching regional Top 500?',
        options: ['Diamond', 'Crown', 'Ace (Ace Master / Dominator)', 'Conqueror'],
        correct: 3,
        explanation: 'Reaching the regional Top 500 of Ace players grants the coveted Conqueror title at daily rank reset!'
      },
      {
        question: 'Which 7.62mm light machine gun holds 100 rounds of ammo and features a deployable bipod when prone?',
        options: ['DP-28', 'M249', 'MG3', 'Groza'],
        correct: 1,
        explanation: 'The M249 unleashes 100-150 rounds of devastating suppressive firepower with minimal recoil when lying prone.'
      },
      {
        question: 'How much health does a First Aid Kit restore when applied to an injured player?',
        options: ['Up to 50% HP', 'Up to 75% HP', '100% Full HP', '85% HP'],
        correct: 1,
        explanation: 'A First Aid Kit heals an injured player up to exactly 75% HP, after which Boosters (Energy Drinks / Painkillers) are needed for full 100% health.'
      }
    ]
  },
  freefire: {
    id: 'freefire',
    title: 'Free Fire Legacy & Esports Trivia',
    shortTitle: 'Free Fire',
    badge: '🔥 1-Tap Legend',
    color: 'border-zinc-500 text-zinc-300',
    themeGradient: 'from-amber-600 to-orange-700',
    icon: 'Flame',
    description: 'Test your classic knowledge on the historic foundation of UltraOP: 1-tap drag shots, Grandmaster custom rooms, and character skills!',
    questions: [
      {
        question: 'In Free Fire, which specialized sniper rifle possesses the ability to pierce directly through enemy Gloo Walls?',
        options: ['AWM', 'M82B (Barett)', 'Kar98k', 'Treatment Sniper'],
        correct: 1,
        explanation: 'The M82B is famous for its specialized high-caliber rounds that deal direct damage through enemy Gloo Walls and vehicles!'
      },
      {
        question: 'What is the real name of creator UltraOP?',
        options: ['Ahsan Ahmad (Sk Ahsan Ahmad)', 'Rohan Sharma', 'Aditya Roy', 'Farhan Sheikh'],
        correct: 0,
        explanation: 'UltraOP is founded and led by prominent Indian gaming streamer Sk Ahsan Ahmad!'
      },
      {
        question: 'How many followers has UltraOP achieved on the Rooter streaming platform?',
        options: ['100K+', '250K+', '515K+', '1 Million'],
        correct: 2,
        explanation: 'UltraOP has crossed over 515.9K+ dedicated followers and 65.2M+ views on Rooter!'
      },
      {
        question: 'Which character in Free Fire has the signature ability "Drop the Beat" granting speed and HP aura?',
        options: ['Chrono', 'DJ Alok', 'K (Captain Booyah)', 'Dimitri'],
        correct: 1,
        explanation: 'DJ Alok creates a 5-meter aura that boosts teammate movement speed and restores HP gradually.'
      },
      {
        question: 'What was the signature aiming technique popularized by UltraOP in his viral tutorial series?',
        options: ['J-Shape Drag Headshot', 'Drop-shot prone crawl', 'No-scope hip-fire spray', 'Jump-throw grenade flick'],
        correct: 0,
        explanation: 'The smooth upward J-drag shot lifts the crosshair smoothly toward the enemy head hitbox for instant 1-tap elimination.'
      }
    ]
  }
};

export const TRIVIA_QUESTIONS = MULTI_GAME_TRIVIA.minecraft.questions;
