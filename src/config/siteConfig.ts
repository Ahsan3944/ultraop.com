/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP Global Website Configuration
 * Centralized site metadata, creator identities, brand asset paths, and external channels.
 */

export const SITE_CONFIG = {
  meta: {
    siteName: 'UltraOP',
    domain: 'https://ultraop.in',
    title: 'UltraOP — Gaming Creator, Minecraft & Gaming Content',
    tagline: 'Gaming Beyond Limits',
    description: 'Official website of UltraOP, a gaming content creator focused on Minecraft, gaming videos, storytelling, creator projects and community.',
    creatorName: 'Ahsan',
    creatorFullName: 'Sk Ahsan Ahmad',
    creatorAlias: 'UltraOP',
    jobTitle: 'Gaming Content Creator',
    officialEmail: 'ultraopbiz@gmail.com',
    themeColor: '#FF3E00',
    currentYear: 2025
  },
  assets: {
    brand: {
      primaryLogo: '/assets/images/brand/logo/ultraop-logo.svg',
      logoLight: '/assets/images/brand/logo/ultraop-logo-light.svg',
      logoDark: '/assets/images/brand/logo/ultraop-logo-dark.svg',
      mark: '/assets/images/brand/logo/ultraop-mark.svg',
      favicon: '/assets/images/brand/favicon/favicon.svg',
      appleTouchIcon: '/assets/images/brand/favicon/apple-touch-icon.svg',
      ogDefault: '/assets/images/brand/og/og-default.svg'
    },
    creator: {
      heroPortrait: '/assets/images/creator/hero/hero-creator.svg',
      profileAvatar: '/assets/images/creator/profile/creator-profile.svg',
      setupPhoto: '/assets/images/setup/gaming-setup.svg'
    }
  },
  socialLinks: {
    youtubeLive: 'https://www.youtube.com/@ultraoplive',
    youtubeMinecraft: 'https://www.youtube.com/@ultraop2',
    youtubeRoblox: 'https://www.youtube.com/@ultraop3',
    youtubeEarnings: 'https://www.youtube.com/@ultraopearnings',
    youtubeAhsanNow: 'https://www.youtube.com/@ahsannow',
    twitch: 'https://www.twitch.tv/ultraoplive',
    kick: 'https://kick.com/ultra-op-live',
    instagramMain: 'https://www.instagram.com/ultraopp/',
    instagramEarnings: 'https://www.instagram.com/op_earnings/',
    instagramAhsanNow: 'https://www.instagram.com/ahsannow/',
    rooter: 'https://www.rooter.gg/profile/142404154',
    discord: 'https://discord.gg/ZQ2afmPvuP',
    whatsapp: 'https://www.whatsapp.com/channel/0029VaeMLDaHgZWfuPDefa0t'
  },
  navigation: [
    { label: 'Live Broadcasts', href: '#channels', id: 'nav-channels' },
    { label: 'Gaming Arcade', href: '#games', id: 'nav-games' },
    { label: 'Minecraft SMP', href: '#projects', id: 'nav-projects' },
    { label: 'Tournament Scrims', href: '#tournaments', id: 'nav-tournaments' },
    { label: 'Sensitivity Lab', href: '#sensitivity', id: 'nav-sensitivity' },
    { label: 'Meet Ahsan', href: '#creator', id: 'nav-creator' },
    { label: 'Soundboard Cinema', href: '#soundboard', id: 'nav-soundboard' },
    { label: 'Editorial Guides', href: '#blog', id: 'nav-blog' },
    { label: 'Sponsorships', href: '#campaigns', id: 'nav-campaigns' }
  ]
} as const;
