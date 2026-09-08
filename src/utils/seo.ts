/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP SEO & Metadata Manager
 * Manages dynamic document title, meta descriptions, canonical URLs, and structured JSON-LD schemas.
 */

export interface PageSEOConfig {
  title: string;
  description: string;
  canonicalPath: string; // e.g. '/', '/about/', '/games/', etc.
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export const BASE_PRODUCTION_URL = 'https://ultraop.in';
export const DEFAULT_OG_IMAGE = `${BASE_PRODUCTION_URL}/assets/images/brand/og/og-default.svg`;

export const ROUTE_SEO: Record<string, PageSEOConfig> = {
  home: {
    title: 'UltraOP — Gaming Creator, Minecraft & Gaming Content',
    description: 'Official website of UltraOP, a gaming content creator focused on Minecraft, gaming videos, storytelling, creator projects and community.',
    canonicalPath: '/',
    breadcrumbs: [
      { name: 'Home', path: '/' }
    ]
  },
  about: {
    title: 'About UltraOP — Ahsan | Gaming Content Creator',
    description: 'Learn about UltraOP (Sk Ahsan Ahmad / Ahsan), an Indian gaming content creator focused on Minecraft storytelling, gaming videos, and community creator projects.',
    canonicalPath: '/about/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about/' }
    ]
  },
  channels: {
    title: 'UltraOP Channels — YouTube, Twitch, Kick & Rooter Broadcasts',
    description: 'Explore the 5-channel digital network of UltraOP. Daily Minecraft hardcore livestreams, Roblox games, OP Earnings creator tips, and tech reviews.',
    canonicalPath: '/channels/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Channels', path: '/channels/' }
    ]
  },
  projects: {
    title: 'UltraOP Projects — Minecraft, Gaming & Creator Projects',
    description: 'Explore UltraOP Minecraft SMP realms, community survival projects, tournament custom scrims, and gaming creations by Ahsan.',
    canonicalPath: '/projects/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects/' }
    ]
  },
  games: {
    title: 'UltraOP Games — Free Browser Games',
    description: 'Play free browser games and esports trivia quizzes on the official UltraOP portal. Zero installation required on mobile and desktop.',
    canonicalPath: '/games/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Games', path: '/games/' }
    ]
  },
  blog: {
    title: 'UltraOP Blog — Gaming, Minecraft & Creator Content',
    description: 'Read gaming guides, Minecraft PVP sensitivity calibration, creator monetization strategies, and hardware reviews by UltraOP.',
    canonicalPath: '/blog/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' }
    ]
  },
  setup: {
    title: 'UltraOP Gaming Setup — PC, Streaming & Creator Gear',
    description: 'Discover the full streaming battle station, gaming PC specs, dual monitors, microphone, and mobile creator gear used by UltraOP.',
    canonicalPath: '/setup/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Setup', path: '/setup/' }
    ]
  },
  contact: {
    title: 'Contact UltraOP — Business & Collaboration',
    description: 'Get in touch with UltraOP (Ahsan) for business collaborations, brand sponsorships, tournament hosting, and creator partnerships.',
    canonicalPath: '/contact/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact/' }
    ]
  },
  faq: {
    title: 'About UltraOP & FAQ — Ahsan, Gaming & Minecraft',
    description: 'Frequently asked questions about UltraOP, Ahsan, Minecraft videos, streaming channels, gaming setup, and commercial campaigns.',
    canonicalPath: '/faq/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq/' }
    ]
  },
  mediaKit: {
    title: 'UltraOP Media Kit — Creator Analytics & Brand Collaborations',
    description: 'Official brand and commercial media kit for UltraOP. Audience demographics, channel statistics, and campaign case studies.',
    canonicalPath: '/media-kit/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Media Kit', path: '/media-kit/' }
    ]
  },
  privacy: {
    title: 'Privacy Policy — UltraOP Gaming Portal',
    description: 'Privacy policy and data protection standards for visitors and players on the official UltraOP website.',
    canonicalPath: '/privacy/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy', path: '/privacy/' }
    ]
  },
  terms: {
    title: 'Terms of Service — UltraOP Gaming Portal',
    description: 'Terms of service and acceptable use guidelines for the UltraOP digital portal, web games, and community tools.',
    canonicalPath: '/terms/',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms', path: '/terms/' }
    ]
  }
};

/**
 * Generates BreadcrumbList Schema JSON-LD
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${BASE_PRODUCTION_URL}${crumb.path === '/' ? '/' : crumb.path}`
    }))
  };
}

/**
 * Updates document head tags for client-side navigation
 */
export function updateDocumentSEO(config: PageSEOConfig) {
  // 1. Update Title
  document.title = config.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Update Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const canonicalUrl = `${BASE_PRODUCTION_URL}${config.canonicalPath}`;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 4. Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) ogImg.setAttribute('content', config.ogImage || DEFAULT_OG_IMAGE);

  // 5. Update Twitter Card
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', config.title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', config.description);

  // 6. Dynamic JSON-LD Structured Data
  let dynamicScript = document.getElementById('json-ld-page-schema') as HTMLScriptElement | null;
  if (!dynamicScript) {
    dynamicScript = document.createElement('script');
    dynamicScript.id = 'json-ld-page-schema';
    dynamicScript.type = 'application/ld+json';
    document.head.appendChild(dynamicScript);
  }

  const schemas: Array<Record<string, unknown>> = [];

  if (config.breadcrumbs && config.breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchema(config.breadcrumbs));
  }

  if (config.schema) {
    if (Array.isArray(config.schema)) {
      schemas.push(...config.schema);
    } else {
      schemas.push(config.schema);
    }
  }

  if (schemas.length > 0) {
    dynamicScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemas
    });
  } else {
    dynamicScript.textContent = '';
  }
}
