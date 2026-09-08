# UltraOP — Gaming Hub & Creator Portal

Official web application and technical portfolio for **UltraOP (Sk Ahsan Ahmad)**, featuring interactive gaming hubs, a playable in-browser web arcade, YouTube multi-channel live synchronization, multi-account Instagram showcases, verified brand partnership archives, and comprehensive creator knowledge bases.

---

## 1. Project Overview

- **Project Name:** UltraOP Gaming Hub & Creator Portal
- **Primary Production Domain:** `https://ultraop.in/`
- **Secondary Domain / Alias:** `https://www.ultraop.in/`
- **Creator / Founder:** Sk Ahsan Ahmad (known as UltraOP / Ahsan)
- **Official Business Email:** `ultraopbiz@gmail.com`
- **UPI Creator Support:** `ultraop001@ybl`
- **Purpose:** Centralize the entire UltraOP creator brand—spanning 4 YouTube channels, Twitch, Kick, Rooter, 3 Instagram profiles, playable browser games, previous commercial brand campaigns, and verified community resources—under a unified, high-performance web platform.
- **Architecture Overview:**
  - **Frontend:** Single-page application (SPA) built with React 19, TypeScript, and Tailwind CSS v4, utilizing a deterministic, zero-lag client-side hash router.
  - **Backend / API Layer:** Node.js Express server providing secure API routes for multi-channel YouTube aggregation, caching, category classification, live stream detection, and production static asset serving with security headers.
  - **Fallback System:** The frontend is completely resilient. If the Express server or external APIs are unavailable, the client gracefully falls back to built-in verified static datasets.

---

## 2. Technology Stack

The versions and libraries documented below reflect the exact declarations in `package.json`:

| Category | Package / Technology | Version | Purpose in Project |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | `react` | `^19.0.1` | Declarative UI rendering & state management |
| **DOM Renderer** | `react-dom` | `^19.0.1` | React DOM mounting & portal support |
| **Language** | `typescript` | `~5.8.2` | Strict compile-time type safety across client and server |
| **Build Tool & Bundler** | `vite` | `^6.2.3` | Ultra-fast local development and frontend production bundler |
| **Vite React Plugin** | `@vitejs/plugin-react` | `^5.0.4` | Fast Refresh and JSX transformation |
| **Backend Framework** | `express` | `^4.21.2` | Server-side routing, API proxies, and static asset middleware |
| **Backend TypeScript Runner** | `tsx` | `^4.21.0` | Direct execution of `server.ts` in development mode |
| **Production Server Bundler** | `esbuild` | `^0.25.0` | Compiles `server.ts` into a standalone CommonJS bundle (`dist/server.cjs`) |
| **Styling Engine** | `tailwindcss` | `^4.1.14` | Modern CSS-first styling framework |
| **Tailwind Vite Plugin** | `@tailwindcss/vite` | `^4.1.14` | Native Tailwind CSS v4 integration with Vite |
| **CSS Post-Processor** | `autoprefixer` | `^10.4.21` | Automatic CSS vendor prefixing |
| **Animation Library** | `motion` (`motion/react`) | `^12.23.24` | Smooth declarative layout and entry transitions |
| **Icon Library** | `lucide-react` | `^0.546.0` | Feather-style SVG icon system |
| **Interactive Confetti** | `canvas-confetti` | `^1.9.4` | Particle confetti effects for subscribe and score actions |
| **Environment Config** | `dotenv` | `^17.2.3` | Server-side environment variable loading |
| **AI SDK** | `@google/genai` | `^2.4.0` | Google GenAI SDK integration support |
| **Audio Engine** | Custom Web Audio API | Native Browser | Custom oscillator-based UI sound effects & synthesizer |

---

## 3. Complete Project Structure

```
.
├── .env.example                     # Environment variable declarations template
├── .gitignore                       # Git ignore rules for node_modules, dist, logs, etc.
├── index.html                       # HTML entry point with metadata, Open Graph, and JSON-LD
├── metadata.json                    # AI Studio metadata and frame permissions
├── package.json                     # Project manifest, dependency definitions, and npm scripts
├── tsconfig.json                    # TypeScript compiler configuration (strict mode)
├── vite.config.ts                   # Vite bundler configuration with Tailwind CSS plugin
├── server.ts                        # Express server entry point with API routes and security headers
│
├── public/                          # Static public assets served at root
│   ├── favicon.svg                  # Global SVG browser favicon
│   ├── robots.txt                   # Production search engine crawl rules & sitemap pointer
│   ├── sitemap.xml                  # XML sitemap detailing public URLs and priorities
│   ├── Creator Photos/              # Drop-in image directory for creator photo, logo, and setup
│   └── assets/                      # Structured static web assets
│       └── images/                  # Organized asset folders (brand, creator, setup, games, blog)
│
├── server/                          # Server-side backend modules
│   └── youtubeService.ts            # YouTube multi-channel aggregator, caching, and classification
│
├── src/                             # React frontend source code
│   ├── main.tsx                     # React DOM root entry point
│   ├── App.tsx                      # Main application orchestrator & hash router
│   ├── index.css                    # Tailwind CSS v4 entry point and typography definitions
│   ├── types.ts                     # Central TypeScript interfaces, types, and enums
│   │
│   ├── components/                  # React UI components
│   │   ├── Navbar.tsx               # Sticky navigation header with sound toggle & search
│   │   ├── Hero.tsx                 # Landing hero section with creator identity & key CTAs
│   │   ├── GamesHub.tsx             # Playable web arcade section & game selector
│   │   ├── ChannelsSection.tsx      # Channels overview section on Homepage
│   │   ├── ExploreChannelsPage.tsx  # Full Explore Channels page (`#channels`)
│   │   ├── AboutFaqPage.tsx         # Comprehensive Knowledge FAQ page (`#about-faq`)
│   │   ├── StatsCounter.tsx         # Real-time aggregated statistics counter bar
│   │   ├── SensitivityLab.tsx       # Interactive DPI / eDPI calculator & crosshair lab
│   │   ├── TournamentArena.tsx      # Tournament & custom scrims information panel
│   │   ├── VideoSection.tsx         # Video vault with category filtering & YouTube playback
│   │   ├── SoundboardCinema.tsx     # Streamer soundboard audio effects & sound bites
│   │   ├── AboutSection.tsx         # Creator biography, career timeline & setup gear
│   │   ├── BrandCampaignsSection.tsx# Commercial brand collaborations & sponsorships
│   │   ├── BrandLogos.tsx           # High-precision SVG brand marks
│   │   ├── BlogSection.tsx          # Creator articles, gaming tips & DPI guides
│   │   ├── FanShowcase.tsx          # Community fan art & clips gallery
│   │   ├── SupportSection.tsx       # Support creator via UPI & memberships
│   │   ├── ContactSection.tsx       # Direct business inquiry contact form & email
│   │   ├── Footer.tsx               # Global footer with legal links & sitemap references
│   │   ├── SearchModal.tsx          # Global search dialog (Cmd+K / Ctrl+K)
│   │   ├── LegalModal.tsx           # Privacy Policy, Terms of Service & Disclaimer modal
│   │   ├── ErrorBoundary.tsx        # React UI error boundary fallback wrapper
│   │   ├── CreatorAssetImage.tsx    # Intelligent image resolver with fallback candidates
│   │   ├── ThemeToggle.tsx          # Dark / Light / System theme selector button
│   │   ├── UltraLogo.tsx            # Scalable SVG UltraOP brand signature logo
│   │   └── game-engines/            # Embedded playable game engine components
│   │       ├── TriviaQuizGame.tsx   # Multi-category trivia quiz game engine
│   │       ├── ZenTileGame.tsx      # 2048 harmonic merge game engine
│   │       ├── BubblePopZenGame.tsx # Bubble blossom physics game engine
│   │       ├── AimTrainerGame.tsx   # Reaction & flick target training engine
│   │       ├── SpaceShooterGame.tsx # Top-down starship arcade game engine (Cyber Strike)
│   │       ├── NeonSnakeGame.tsx    # Neon snake arcade game engine
│   │       └── FlappyGame.tsx       # Hovercraft timing game engine (Cyber Dash)
│   │
│   ├── config/                      # Application configuration constants
│   ├── data/                        # Static datasets and configuration files
│   │   ├── brandCampaigns.ts        # Brand sponsorship records & logo references
│   │   └── gamingData.ts            # Channels, games, trivia, setup specs & videos data
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useYouTubeStats.ts       # Hook for querying `/api/youtube/stats`
│   │   └── useYouTubeVideos.ts      # Hook for querying `/api/youtube/videos`
│   │
│   └── utils/                       # Utility helper functions
│       ├── audio.ts                 # Web Audio API sound effects & synthesizer
│       ├── creatorAssets.ts         # Asset registry & file resolver
│       ├── seo.ts                   # Dynamic document title & meta tag updater
│       └── theme.tsx                # Theme provider & color-scheme hook
```

---

## 4. Routing Architecture

The application implements a deterministic, client-side hash routing architecture managed in `src/App.tsx`.

### Route Destinations & URL Structure

1. **Home Page / Main Hub (`/`):**
   - **State:** `currentPage === 'home'`
   - **Behavior:** This is the default landing destination. When the root URL `/` is loaded or refreshed, the Home page is rendered.
2. **Explore Channels Page (`/#channels`):**
   - **State:** `currentPage === 'channels'`
   - **Behavior:** Renders `ExploreChannelsPage.tsx` with all 12 channels and social profiles, search filters, and live subscriber metrics.
3. **About & Knowledge FAQ Page (`/#about-faq`):**
   - **State:** `currentPage === 'about-faq'`
   - **Behavior:** Renders `AboutFaqPage.tsx` with verified creator biography, career milestones, gear specs, and searchable FAQ accordions.
4. **Legal Modals (`/#privacy`, `/#terms`, `/#disclaimer`):**
   - **Behavior:** Opens `LegalModal.tsx` on the selected tab without unmounting the active page.

### Navigation Lifecycle & Reload Safety

- **Initial State:** `useState<'home' | 'channels' | 'about-faq'>('home')` strictly initializes `currentPage` to `'home'`.
- **Reload Normalization:** On component mount (`useEffect`), the app inspects `performance.getEntriesByType('navigation')`. If a page reload is detected (`type === 'reload'`) or a stale `#channels` hash exists on boot, `window.history.replaceState` normalizes the URL back to the root path and keeps the user on Home.
- **Explicit Navigation:**
  - Clicking **Channels** in the Navbar or Hero invokes `navigateTo('channels')`, updating `window.location.hash = '#channels'`, setting `currentPage = 'channels'`, and scrolling to the top.
  - Clicking **Home** or **Back to Main Hub** invokes `navigateTo('home')`, which removes `#channels` from the address bar via `window.history.pushState` and smoothly scrolls to top.
  - In-page anchors (e.g. `#collaborations`, `#social-hub`, `#videos`, `#support`) smoothly scroll to the section. If clicked from Channels or FAQ, the router switches to Home before scrolling.
- **Persistence:** No `localStorage` or `sessionStorage` keys are used to force route restoration.

---

## 5. Component Architecture

| Component Name | File Path | Purpose | Data Source | Page / Section |
| :--- | :--- | :--- | :--- | :--- |
| **Navbar** | `src/components/Navbar.tsx` | Fixed header with navigation links, search trigger, sound toggle, and theme switch. | `CREATOR_PROFILE` | All Pages |
| **Hero** | `src/components/Hero.tsx` | Visual banner with creator identity, live stats, and explore CTA buttons. | `useYouTubeStats` | Home |
| **GamesHub** | `src/components/GamesHub.tsx` | Playable browser arcade section with category filters and game modal launcher. | `GAMES_DATA` | Home (`#arcade`) |
| **ChannelsSection** | `src/components/ChannelsSection.tsx` | Overview of YouTube, Twitch, Kick, and Rooter channels on Home. | `useYouTubeStats` | Home |
| **ExploreChannelsPage**| `src/components/ExploreChannelsPage.tsx` | Full discovery page for all 12 channels and social profiles with search. | `ALL_CREATOR_CHANNELS` | Channels (`#channels`) |
| **AboutFaqPage** | `src/components/AboutFaqPage.tsx` | Searchable knowledge base, creator biography, PC specs, and FAQ. | `SEO_FAQS`, `CREATOR_PROFILE` | FAQ (`#about-faq`) |
| **StatsCounter** | `src/components/StatsCounter.tsx` | Real-time animated counters (650K+ Reach, 65M+ Views, 1,700+ Streams). | `useYouTubeStats` | Home |
| **SensitivityLab** | `src/components/SensitivityLab.tsx` | Interactive DPI / eDPI calculator and crosshair customizer for FPS titles. | Interactive State | Home |
| **TournamentArena** | `src/components/TournamentArena.tsx` | Tournament showcase, scrim highlights, and room rules. | `GAMES_PLAYED_DATA` | Home |
| **VideoSection** | `src/components/VideoSection.tsx` | Categorized video archive with YouTube video player and category filters. | `useYouTubeVideos` | Home (`#videos`) |
| **SoundboardCinema** | `src/components/SoundboardCinema.tsx` | Streamer sound bites and SFX board with Web Audio API synthesis. | Built-in Audio Registry | Home |
| **AboutSection** | `src/components/AboutSection.tsx` | Sk Ahsan Ahmad biography, battle station PC specs, and gear list. | `CREATOR_PROFILE`, `SETUP_SPECS_DATA` | Home (`#about`) |
| **BrandCampaignsSection**| `src/components/BrandCampaignsSection.tsx` | Verified commercial brand sponsorships and past campaign highlights. | `BRAND_CAMPAIGNS_DATA` | Home (`#collaborations`) |
| **BrandLogos** | `src/components/BrandLogos.tsx` | Precision SVG brand marks (Amazon, THE FINALS, Wild Stone, Hero, etc.). | SVG Vectors | Home (`#collaborations`) |
| **SocialHub** | `src/components/SocialHub.tsx` | Multi-account Instagram feeds, reels showcase, and Discord card. | `INSTAGRAM_ACCOUNTS_DATA`, `INSTAGRAM_POSTS_DATA` | Home (`#social-hub`) |
| **BlogSection** | `src/components/BlogSection.tsx` | Articles on creator tips, gaming guides, and streaming gear. | `BLOG_POSTS_DATA` | Home (`#blog`) |
| **FanShowcase** | `src/components/FanShowcase.tsx` | Community artwork, Minecraft SMP builds, and video montages. | `FAN_CREATIONS_DATA` | Home |
| **SupportSection** | `src/components/SupportSection.tsx` | Creator support options via UPI QR code (`ultraop001@ybl`) and memberships. | `CREATOR_PROFILE` | Home (`#support`) |
| **ContactSection** | `src/components/ContactSection.tsx` | Business inquiries contact form and official email links. | `CREATOR_PROFILE` | Home (`#contact`) |
| **Footer** | `src/components/Footer.tsx` | Navigation links, legal triggers, social links, and copyright notices. | `CREATOR_PROFILE` | All Pages |
| **SearchModal** | `src/components/SearchModal.tsx` | Command Palette dialog (`Cmd+K` / `Ctrl+K`) for games, channels, and videos. | `GAMES_DATA`, `VIDEOS_DATA` | All Pages |
| **LegalModal** | `src/components/LegalModal.tsx` | Accessible modal dialog for Privacy Policy, Terms of Service, and Disclaimers. | Static Legal Text | All Pages |
| **CreatorAssetImage** | `src/components/CreatorAssetImage.tsx` | Multi-format image resolver with automatic SVG fallbacks. | `CREATOR_ASSET_REGISTRY` | All Pages |
| **ThemeToggle** | `src/components/ThemeToggle.tsx` | Theme selector (Dark / Light / System). | `ThemeProvider` | Navbar |
| **UltraLogo** | `src/components/UltraLogo.tsx` | Scalable SVG UltraOP signature brand mark. | SVG Vector | Navbar & Cards |
| **TriviaQuizGame** | `src/components/game-engines/TriviaQuizGame.tsx` | Multi-category trivia quiz game engine. | `MULTI_GAME_TRIVIA` | Arcade Modal |
| **ZenTileGame** | `src/components/game-engines/ZenTileGame.tsx` | 2048 harmonic merge puzzle game engine. | Game State Engine | Arcade Modal |
| **BubblePopZenGame** | `src/components/game-engines/BubblePopZenGame.tsx` | Relaxing bubble popping physics game engine. | HTML5 Canvas | Arcade Modal |
| **AimTrainerGame** | `src/components/game-engines/AimTrainerGame.tsx` | FPS reflex flick and tracking trainer engine. | HTML5 Canvas | Arcade Modal |
| **SpaceShooterGame** | `src/components/game-engines/SpaceShooterGame.tsx` | Cyber Strike galaxy arcade shooter engine. | HTML5 Canvas | Arcade Modal |
| **NeonSnakeGame** | `src/components/game-engines/NeonSnakeGame.tsx` | Neon Cyber Snake arcade game engine. | HTML5 Canvas | Arcade Modal |
| **FlappyGame** | `src/components/game-engines/FlappyGame.tsx` | Ultra Cyber Dash hovercraft timing game engine. | HTML5 Canvas | Arcade Modal |

---

## 6. Data Architecture

The project maintains data in modular, statically typed TypeScript files located in `src/data/`:

### 1. `src/data/gamingData.ts`
- **Stored Data:**
  - `GAMES_DATA`: Definitions, ratings, play counts, instructions for 7 browser games.
  - `CREATOR_PROFILE`: Creator bio, handles, social URLs, UPI ID (`ultraop001@ybl`), business email.
  - `CHANNELS_DATA`: Metadata for YouTube, Twitch, Kick, Rooter, Discord, and Instagram channels.
  - `GAMES_PLAYED_DATA`: History and stats for Minecraft, Valorant, GTA V, Roblox, PUBG, and Free Fire.
  - `INSTAGRAM_ACCOUNTS_DATA`: Metadata for 3 distinct Instagram accounts.
  - `INSTAGRAM_POSTS_DATA`: Curated feed posts with likes, comments, captions, and links.
  - `VIDEOS_DATA`: YouTube videos mapped to categories (Minecraft, Roblox, Valorant, Earnings, Tech).
  - `BLOG_POSTS_DATA`: Creator guides and tech articles.
  - `FAN_CREATIONS_DATA`: Community artwork and builds.
  - `SETUP_SPECS_DATA`: Studio PC specifications and battle station hardware.
  - `MULTI_GAME_TRIVIA`: Multi-category trivia question bank.
- **Nature:** Statically typed fallback and initial state, refreshed dynamically when connected to the backend.

### 2. `src/data/brandCampaigns.ts`
- **Stored Data:** `BRAND_CAMPAIGNS_DATA` containing records for past commercial partnerships (Amazon, THE FINALS, Wild Stone, Hero, Parallel Mobile, TVS, E-Cricket).
- **Properties:** `id`, `name`, `logo`, `logoKey`, `campaignType`, `category`, `year`, `shortDescription`, `visible`, `status`, `altText`.

---

## 7. YouTube Integration

Backend aggregation and caching are handled by `server/youtubeService.ts` and consumed by frontend hooks.

### YouTube Channels Configured

| Channel Name | Handle | YouTube Channel ID | Primary Content Focus |
| :--- | :--- | :--- | :--- |
| **Ultra OP Live** | `@ultraoplive` | `UCAxlmL3_721xzOjQVe5Klbg` | Daily Minecraft, Valorant, GTA V, Live Streams |
| **Ultra OP 2.0 (Minecraft)** | `@ultraop2` | `UC-ASoLp2wfxVLJFDnVXwrGA` | Minecraft Hardcore, SMP builds, Redstone |
| **Roblox UltraOP3** | `@ultraop3` | `UCKdJiKSiO382Hvczh_Q2kyg` | Roblox adventures, Blox Fruits, Obbies |
| **Op Earnings** | `@ultraopearnings` | `UC-KkWDruqOobwZgylSb4kwA` | Creator growth, YouTube monetization, Tech |

### Backend Service Architecture (`server/youtubeService.ts`)
- **API Key Handling:** If `process.env.YOUTUBE_API_KEY` is present, the service makes authenticated batch requests to `https://www.googleapis.com/youtube/v3/channels` and `search`. If the key is missing or quota is exhausted, it automatically falls back to verified cached data.
- **Background Synchronization:** Runs on initial server boot and every 5 minutes (`5 * 60 * 1000 ms`).
- **Live Stream Detection:** Detects active live broadcasts and populates `liveStatus` with stream title and viewer metrics.
- **Video Classification Rules:**
  - `Minecraft`: Channel `UC-ASoLp2wfxVLJFDnVXwrGA` or titles containing Minecraft, SMP, Hardcore, Redstone.
  - `Roblox`: Channel `UCKdJiKSiO382Hvczh_Q2kyg` or titles containing Roblox, Blox Fruits, Obby, Blade Ball.
  - `Valorant`: Titles containing Valorant, VCT, Radiant, Reyna, Jett.
  - `Earnings`: Channel `UC-KkWDruqOobwZgylSb4kwA` or titles containing Earnings, Monetization, Redeem.
  - `Tech & Gadgets`: Titles containing Setup, PC, Microphone, Monitor.
  - `Live Streams`: Videos with `isLive: true` or duration marked `LIVE`.
  - `Highlights`: Videos tagged with `Highlights` or curated showcase clips.

### Frontend Data Hooks
- `src/hooks/useYouTubeStats.ts`: Queries `GET /api/youtube/stats`, providing network-wide reach (650K+), views (65M+), channel metrics map, and sync status.
- `src/hooks/useYouTubeVideos.ts`: Queries `GET /api/youtube/videos?category=...`, handling category filtering and video cards.

---

## 8. Instagram Integration

The website showcases 3 distinct Instagram accounts managed by Sk Ahsan Ahmad, presented with dedicated tabs in `SocialHub.tsx`:

1. **Main Gaming & Streamer Profile (`@ultraopp`):**
   - **URL:** `https://www.instagram.com/ultraopp/`
   - **Followers:** 45.8K+
   - **Content:** Stream highlights, tournament stories, setup photos, and clutch reels.
2. **OP Earnings Official (`@op_earnings`):**
   - **URL:** `https://www.instagram.com/op_earnings/`
   - **Followers:** 12.4K+
   - **Content:** Gaming monetization tips, creator revenue case studies, and redeem codes.
3. **Ahsan Now Lifestyle (`@ahsannow`):**
   - **URL:** `https://www.instagram.com/ahsannow/`
   - **Followers:** 28.6K+
   - **Content:** Behind-the-scenes vlogs, desk aesthetics, and travel moments.

- **Data Files:** Accounts are configured in `INSTAGRAM_ACCOUNTS_DATA`, and posts are defined in `INSTAGRAM_POSTS_DATA` (`src/data/gamingData.ts`).
- **How to Update:** Add or edit entries in `INSTAGRAM_POSTS_DATA` with post image URL, caption, likes, comments, and permalink.

---

## 9. Twitch Integration

- **Channel Name:** Ultra OP (Twitch)
- **Handle:** `@ultraoplive`
- **URL:** `https://www.twitch.tv/ultraoplive`
- **Metrics Displayed:** 38K+ Followers, 1.4M+ Views, 140+ Interactive Streams.
- **Integration Nature:** Maintained via structured data in `CHANNELS_DATA` and `ALL_CREATOR_CHANNELS`. Live Twitch API polling is not currently active; metrics are served via verified configuration data.

---

## 10. Kick Integration

- **Channel Name:** Ultra OP (Kick)
- **Handle:** `@ultra-op-live`
- **URL:** `https://kick.com/ultra-op-live`
- **Metrics Displayed:** 31K+ Followers, 960K+ Views, 85+ Squad Streams.
- **Integration Nature:** Maintained via structured data in `CHANNELS_DATA` and `ALL_CREATOR_CHANNELS`. Metrics are served via verified configuration data.

---

## 11. Rooter Integration

- **Platform:** Rooter Esports & Streaming
- **Profile URL:** `https://www.rooter.gg/profile/142404154`
- **Metrics:** 515.9K+ Dedicated Followers, 65.2M+ Broadcast Views, 1,700+ Verified Live Broadcasts.
- **Separation:** Rooter data is preserved as an independent flagship platform and is never merged or replaced with YouTube statistics. Displayed in `StatsCounter.tsx`, `ChannelsSection.tsx`, and `ExploreChannelsPage.tsx`.

---

## 12. Discord Integration

- **Community Name:** UltraOP Official Gaming Army
- **Invite Link:** `https://discord.gg/ZQ2afmPvuP`
- **Displayed Community Size:** 8,500+ Community Members.
- **Integration Nature:** The member count is maintained as static configuration data. No Discord Bot or OAuth integration is required, ensuring fast load times and zero API rate-limiting issues.

---

## 13. Image & Asset Management

The platform utilizes a structured directory hierarchy and an asset resolution system in `src/utils/creatorAssets.ts` and `src/components/CreatorAssetImage.tsx`.

### Asset Specifications & Paths

| Category | Folder Location | Example File | Dimensions | Ratio | Formats | Max Size |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Creator Hero Photo** | `/public/assets/images/creator/hero/` | `hero-creator.webp` | 1200 x 1500 px | 4:5 | WebP, JPG, PNG | 300 KB |
| **Creator Profile Photo** | `/public/assets/images/creator/profile/` | `creator-profile.webp` | 800 x 1000 px | 4:5 | WebP, JPG, PNG | 200 KB |
| **Studio Setup Photo** | `/public/assets/images/setup/` | `gaming-setup.webp` | 1600 x 900 px | 16:9 | WebP, JPG, PNG | 400 KB |
| **Brand / Channel Logo** | `/public/assets/images/brand/logo/` | `ultraop-logo.svg` | Vector | 1:1 / Wide | SVG, PNG, WebP | 50 KB |
| **Campaign Brand Logos** | `/public/assets/images/brands/campaigns/` | `amazon.svg` | Vector | 16:9 / 1:1 | SVG | 50 KB |
| **Open Graph Banner** | `/public/assets/images/brand/og/` | `og-default.svg` | 1200 x 630 px | 1.91:1 | SVG, JPG | 250 KB |
| **Favicon** | `/public/favicon.svg` | `favicon.svg` | 512 x 512 px | 1:1 | SVG | 30 KB |

### Drop-in Replacement (`/public/Creator Photos/`)

Creators can replace photos without modifying source code by placing files into `/public/Creator Photos/`:
1. `creator_photo.webp` (or `.jpg`, `.png`, `.svg`)
2. `channel_logo.svg` (or `.png`, `.jpg`)
3. `setup_photo.webp` (or `.jpg`, `.png`, `.svg`)
4. `game_profile_logo.svg` (or `.png`)

### Resolution Order (`CreatorAssetImage`)
1. Standardized asset directory path (`/public/assets/images/...`)
2. User drop-in directory path (`/public/Creator Photos/...`)
3. Guaranteed SVG vector fallback illustration

---

## 14. Logo Management

- **Main Brand Logo (`UltraLogo.tsx`):** Scalable vector logo component rendering the signature typography and brand emblem.
- **Brand Sponsorship Logos (`BrandLogos.tsx`):** Renders high-precision SVGs for commercial partners (Amazon, THE FINALS, Wild Stone, Hero, Parallel Mobile, TVS, E-Cricket).
- **Channel / Platform Logos:** SVG vector icons imported from `lucide-react` for YouTube, Twitch, Kick, Instagram, Rooter, Discord, and Web.

---

## 15. Video & Archive System

The video system is organized in `src/components/VideoSection.tsx` and backed by `GET /api/youtube/videos`:
- **Categories:** Minecraft, Roblox, Valorant, Earnings, Tech & Gadgets, Live Streams, Highlights.
- **Interactive Player:** Clicking any video card opens an embedded YouTube player modal or launches the video directly on YouTube.
- **Empty State Handling:** Displays informative fallback states if a category filter returns no active videos.

---

## 16. Brand Collaborations / Sponsorships

Managed via `src/data/brandCampaigns.ts` and rendered in `src/components/BrandCampaignsSection.tsx` (`#collaborations`):
- **Verified Campaigns:** Amazon, THE FINALS, Wild Stone, Hero, Parallel Mobile, TVS.
- **Pending Campaigns:** E-Cricket (flagged `visible: false` until final asset verification).
- **Adding a Campaign:** Add a new record in `BRAND_CAMPAIGNS_DATA` and register its SVG in `BrandLogos.tsx`.

---

## 17. Games / Interactive Features

All 7 browser games are located in `src/components/game-engines/` and launched through `GamesHub.tsx`:

1. **Multi-Game Esports & Gamer Trivia (`TriviaQuizGame.tsx`):** 6 categories (Minecraft, Valorant, GTA V, Roblox, PUBG, Free Fire), 15-second timer, streak multipliers, downloadable pro certificate.
2. **Zen Harmonic Flow 2048 (`ZenTileGame.tsx`):** Relaxing 2048 tile merge puzzle with infinite undo steps and harmonic sound chimes.
3. **Bubble Zen Garden & Color Bloom (`BubblePopZenGame.tsx`):** Calming bubble-popping physics engine with water ripples.
4. **Reflex Aim Pro: Esports Edition (`AimTrainerGame.tsx`):** Precision target flick trainer for FPS players with score tracking.
5. **Cyber Strike: Galaxy Ops (`SpaceShooterGame.tsx`):** Top-down starship arcade game with laser bursts, shield cores, and boss fights.
6. **Neon Cyber Snake (`NeonSnakeGame.tsx`):** Modern neon snake with speed turbo bursts and mobile touch D-pad.
7. **Ultra Cyber Dash (`FlappyGame.tsx`):** Precision anti-gravity hovercraft obstacle timing game.

---

## 18. Search Engine Optimization (SEO)

- **Canonical URL:** `https://ultraop.in/`
- **Dynamic SEO Updater (`src/utils/seo.ts`):** Automatically updates `document.title`, meta description, canonical link, and Open Graph tags on route changes.
- **Open Graph & Twitter Cards:** Full metadata tags in `index.html` for rich social preview cards.
- **Structured Data (JSON-LD):** Embedded in `index.html` with Schema.org `@type: WebSite` and `@type: Person` linking all verified handles.
- **Robots Directives (`public/robots.txt`):** Permits crawling of public pages, blocks private build directories, and references `https://ultraop.in/sitemap.xml`.
- **Sitemap (`public/sitemap.xml`):** Complete XML sitemap detailing public URLs and update frequencies.

---

## 19. Security Architecture

### Implemented Security Measures
1. **Server-Side API Key Isolation:** `YOUTUBE_API_KEY` is consumed exclusively on the backend (`server.ts`). Secret keys are never sent to or visible in client-side code.
2. **Security Headers Middleware:** Configured in `server.ts`:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
3. **Server Footprint Protection:** Express `app.disable('x-powered-by')` removes framework fingerprinting.
4. **Payload Limiting:** Express JSON body parser strictly capped at `50kb` to prevent memory flooding.
5. **Input Sanitization:** URL query parameters are typed and parsed with safe defaults.
6. **Safe Fallbacks:** The application boots cleanly even if environment variables are missing.

---

## 20. Environment Variables

Documented in `.env.example`:

| Variable Name | Required? | Location | Purpose |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Server-side | Google GenAI API integration key |
| `APP_URL` | Auto-injected | Server-side | Deployment host URL for self-referential links |
| `YOUTUBE_API_KEY` | Optional | Server-side | Google YouTube Data API v3 key for live data polling |

*Note: Client-side variables (if needed) must be prefixed with `VITE_` and declared in `.env.example`.*

---

## 21. API Endpoints

All backend endpoints are defined in `server.ts`:

### 1. `GET /api/youtube/stats`
- **Purpose:** Returns aggregated subscriber counts, view totals, video counts, and channel breakdown.
- **Response Format:**
  ```json
  {
    "success": true,
    "data": {
      "updatedAt": "2026-08-19T...",
      "youtubeTotals": { "subscriberCountRaw": 85000, "viewsFormatted": "21.5M+", "videosFormatted": "500+" },
      "rooterTotals": { "followerCountRaw": 515900, "viewsFormatted": "65.2M+", "broadcastsFormatted": "1,700+" },
      "totalReach": "650K+",
      "totalViews": "65M+",
      "totalVideos": "2,200+",
      "channels": [...]
    },
    "source": "live_youtube_api"
  }
  ```

### 2. `GET /api/youtube/videos`
- **Parameters:** `category` (string, optional), `limit` (number, default 24), `featured` (boolean, optional).
- **Purpose:** Returns dynamic categorized video lists across all 4 YouTube channels.

### 3. `GET /api/youtube/live`
- **Purpose:** Returns active live broadcast status and metadata.

### 4. `POST /api/youtube/sync`
- **Purpose:** Triggers an immediate background synchronization cycle across all 4 YouTube channels.

---

## 22. Development Setup

### Prerequisites
- Node.js 20+ installed
- npm (or bun/yarn) package manager

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ultraop-gaming-hub.git
   cd ultraop-gaming-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Add your optional YOUTUBE_API_KEY in .env
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Run type-checking / linter:**
   ```bash
   npm run lint
   ```

6. **Build for production:**
   ```bash
   npm run build
   ```

7. **Test production server locally:**
   ```bash
   npm run start
   ```

---

## 23. Production Deployment

### Full-Stack Container (Recommended: Cloud Run / Node.js)
The project is built to run as a full-stack Node.js Express service:
1. `npm run build` compiles frontend assets into `dist/` and bundles `server.ts` into `dist/server.cjs`.
2. `npm run start` launches `node dist/server.cjs` listening on port `3000`.

---

## 24. GitHub Deployment

### Static Hosting (GitHub Pages)
- **What Works:** The React client SPA in `dist/` can be deployed directly to GitHub Pages. All 7 playable arcade games, audio synthesizers, video playback modals, and hash routing work 100% client-side.
- **Backend Behavior:** On static hosts where the Express server cannot run, the application automatically uses the embedded fallback data in `src/data/gamingData.ts`.
- **Recommendation:** Deploy to a Node.js runtime (e.g. Cloud Run, Railway, Render, VPS) to enable live background YouTube synchronization and security headers.

---

## 25. Domain Mapping

To map `ultraop.in` and `www.ultraop.in` to your deployment:

1. **Apex Domain (`ultraop.in`):**
   - Record Type: `A`
   - Host: `@`
   - Target: Your production server IP address
2. **Subdomain (`www.ultraop.in`):**
   - Record Type: `CNAME`
   - Host: `www`
   - Target: `ultraop.in` (or container service domain)
3. **SSL Certificate:** Provision automated TLS/SSL certificates via your hosting provider or Cloudflare.

---

## 26. Maintenance Guide

| Want to change... | Edit this file / path |
| :--- | :--- |
| **YouTube Channels & Fallback Stats** | `src/data/gamingData.ts` & `server/youtubeService.ts` |
| **Instagram Profiles & Feeds** | `src/data/gamingData.ts` (`INSTAGRAM_ACCOUNTS_DATA` / `POSTS`) |
| **Playable Arcade Games & Instructions** | `src/data/gamingData.ts` (`GAMES_DATA`) & `src/components/game-engines/` |
| **Brand Sponsorships & Collaborations** | `src/data/brandCampaigns.ts` & `src/components/BrandLogos.tsx` |
| **Creator Biography & PC Specs** | `src/data/gamingData.ts` (`CREATOR_PROFILE`, `SETUP_SPECS_DATA`) |
| **Knowledge FAQ Questions & Answers** | `src/components/AboutFaqPage.tsx` (`SEO_FAQS`) |
| **Navigation Bar & Footer Links** | `src/components/Navbar.tsx` & `src/components/Footer.tsx` |
| **Creator Photos & Logos (No Code)** | Place files in `/public/Creator Photos/` |
| **SEO Metadata & Route Titles** | `src/utils/seo.ts` & `index.html` |
| **API Endpoints & Sync Interval** | `server.ts` & `server/youtubeService.ts` |

---

## 27. Backup & Recovery

### Critical Files to Backup
1. `src/` (All frontend components, game engines, data, hooks, and utilities)
2. `server/` & `server.ts` (Backend aggregation logic and API routes)
3. `public/` (Sitemap, robots.txt, icons, and creator assets)
4. `package.json` & `tsconfig.json`
5. `.env` (Environment secrets)

### Restoration Steps
1. Clone or extract the backup archive.
2. Run `npm install` to install dependencies.
3. Run `npm run build` and verify with `npm run lint`.

---

## 28. Troubleshooting

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **Website opened on Channels on reload** | Stale hash in previous versions. | Resolved in `src/App.tsx`. Reloads normalize to `/` and default to Home. |
| **YouTube live stats not updating** | Missing `YOUTUBE_API_KEY` or quota limit. | Add a valid key in `.env`. The app falls back to verified data automatically. |
| **Audio click sounds not playing** | Browser autoplay policy / muted navbar. | Click anywhere on the page or unmute via the sound toggle in the navbar. |
| **Static hosting 404s on refresh** | Server SPA fallback missing. | Hash routing (`/#channels`, `/#about-faq`) prevents 404s on static hosts. |
| **Images failing to load** | Missing custom image file. | `CreatorAssetImage.tsx` automatically resolves to built-in SVG vector fallbacks. |

---

## 29. Developer Quick Reference

| I want to change... | Edit this file / folder |
| :--- | :--- |
| **Home Page Sections & Flow** | `src/App.tsx` |
| **Navbar & Header Navigation** | `src/components/Navbar.tsx` |
| **Explore Channels Page** | `src/components/ExploreChannelsPage.tsx` |
| **Knowledge FAQ Page** | `src/components/AboutFaqPage.tsx` |
| **YouTube Channel Configuration** | `server/youtubeService.ts` & `src/data/gamingData.ts` |
| **Instagram Accounts & Posts** | `src/data/gamingData.ts` |
| **Brand Sponsorships & Logos** | `src/data/brandCampaigns.ts` & `src/components/BrandLogos.tsx` |
| **Playable Arcade Games** | `src/components/game-engines/` |
| **SEO & Meta Tags** | `src/utils/seo.ts` & `index.html` |
| **Image Resolution & Fallbacks** | `src/utils/creatorAssets.ts` & `src/components/CreatorAssetImage.tsx` |
| **Audio Effects & Synthesizer** | `src/utils/audio.ts` & `src/components/SoundboardCinema.tsx` |
| **Backend API Endpoints** | `server.ts` |
