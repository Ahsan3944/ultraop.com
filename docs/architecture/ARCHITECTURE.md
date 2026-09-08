# UltraOP Project Architecture & File Hierarchy
==================================================

## Folder Structure:

```
ultraop-portal/
│
├── docs/                                 # Internal project documentation & guidelines
│   ├── roadmap/                          # Phase status & roadmap tracker
│   ├── architecture/                     # System design & file conventions
│   ├── design-system/                    # Typography, palette & token rules
│   ├── content/                          # Channel roster & campaign data registry
│   ├── seo/                              # Structured data JSON-LD & meta tags
│   └── launch/                           # Production deployment verification
│
├── public/                               # Public static web assets
│   ├── assets/                           # Standardized asset library
│   │   ├── images/
│   │   │   ├── brand/
│   │   │   │   ├── logo/                 # Official UltraOP vector brand marks
│   │   │   │   ├── favicon/              # Multi-size favicons & touch icons
│   │   │   │   └── og/                   # Open Graph social preview cards
│   │   │   ├── creator/
│   │   │   │   ├── hero/                 # Hero banner creator portraits
│   │   │   │   ├── profile/              # Biography & author avatars
│   │   │   │   └── gallery/              # Stage & tournament moments
│   │   │   ├── brands/
│   │   │   │   └── campaigns/            # Verified commercial sponsorship logos
│   │   │   ├── projects/                 # Minecraft SMP & community captures
│   │   │   ├── games/                    # Interactive mini-game sprites
│   │   │   ├── blog/                     # Article infographics & guides
│   │   │   ├── setup/                    # Battle station studio tour photography
│   │   │   ├── social/                   # Custom social media stamps
│   │   │   └── tools/                    # Streaming software & capture card marks
│   │   ├── icons/                        # Custom vector iconography
│   │   └── fonts/                        # Local font fallbacks
│   │
│   ├── Creator Photos/                   # Direct user drop-in synchronization folder
│   └── favicon.svg                       # Root browser favicon
│
├── src/                                  # Application source code
│   ├── components/                       # Modular UI components & sections
│   │   └── game-engines/                 # Playable browser game mini-engines
│   ├── config/                           # Global site metadata & link registry
│   ├── data/                             # Data-driven models (games, campaigns)
│   ├── hooks/                            # Custom React hooks (sound, theme, etc.)
│   ├── utils/                            # Helper utilities & asset resolvers
│   ├── types.ts                          # TypeScript interface definitions
│   ├── App.tsx                           # Master view container
│   ├── main.tsx                          # React DOM entry point
│   └── index.css                         # Tailwind CSS design system tokens
│
├── index.html                            # Master HTML template & SEO meta
├── package.json                          # Dependencies & build scripts
└── vite.config.ts                        # Vite build configuration
```
