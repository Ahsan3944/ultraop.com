export interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Arcade' | 'Reflex' | 'Quiz' | 'Casual' | 'Relaxing';
  description: string;
  plays: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Pro';
  badge?: string;
  color: string;
  thumbnail: string;
  instructions: string[];
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  platform: 'YouTube' | 'Rooter' | 'Discord' | 'Instagram' | 'Twitch' | 'Kick';
  subscribers: string;
  views: string;
  streams?: string;
  description: string;
  url: string;
  instagramUrl?: string;
  instagramHandle?: string;
  avatar: string;
  banner: string;
  isLive?: boolean;
  featuredVideo?: string;
  color: string;
  focus?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  date: string;
  channel: string;
  channelId?: string;
  channelHandle?: string;
  channelUrl?: string;
  category: string;
  categories?: string[];
  thumbnail: string;
  youtubeId: string;
  videoUrl: string;
  isPopular?: boolean;
  isLive?: boolean;
  publishedAt?: string;
}

export interface InstagramAccount {
  id: string;
  handle: string;
  username: string;
  name: string;
  bio: string;
  url: string;
  avatar: string;
  followers: string;
  postsCount: string;
  badge?: string;
}

export interface InstagramPost {
  id: string;
  accountId: string;
  accountHandle: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
  date?: string;
  permalink?: string;
}

export interface GamePlayed {
  id: string;
  name: string;
  status: 'Daily Live Streams' | 'Competitive Focus' | 'Active & Upcoming Series' | 'Used to Play (Legendary)' | 'Played Long Ago (Veteran)' | 'Community Sessions' | string;
  statusColor: string;
  iconName: string;
  description: string;
  hoursPlayed: string;
  achievements: string;
  peakRank: string;
  image: string;
  primaryStreamChannel: string;
  streamUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  category: 'Esports' | 'Guides' | 'Gaming Tech' | 'Creator Tips';
  image: string;
  likes: number;
  tags: string[];
}

export interface FanCreation {
  id: string;
  author: string;
  authorTag: string;
  title: string;
  type: 'Fan Art' | 'Gameplay Clip' | 'Montage' | 'Thumbnail Design';
  likes: number;
  views: string;
  image: string;
  date: string;
}

export interface SetupSpec {
  category: string;
  items: { name: string; value: string; iconName: string }[];
}
