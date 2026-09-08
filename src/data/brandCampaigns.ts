/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP Brand Collaborations & Promotional Campaign Registry
 * Dedicated data module for previous commercial experience and brand associations.
 */

export interface BrandCampaign {
  id: string;
  name: string;
  logo: string;
  logoKey: 'parallel' | 'wildstone' | 'amazon' | 'hero' | 'thefinals' | 'tvs' | 'ecricket';
  campaignType: string;
  category: string;
  year?: string;
  shortDescription?: string;
  description?: string;
  visible: boolean;
  status: 'verified' | 'pending' | 'archived';
  altText: string;
}

export const BRAND_CAMPAIGNS_DATA: BrandCampaign[] = [
  {
    id: 'brand-amazon',
    name: 'Amazon',
    logo: '/assets/images/brands/campaigns/amazon.svg',
    logoKey: 'amazon',
    campaignType: 'Promotional Campaign',
    category: 'E-Commerce & Tech Ecosystem',
    year: '2023–2024',
    shortDescription: 'Creator promotional integrations and digital shopping campaign activations.',
    description: 'Creator promotional integrations and digital shopping campaign activations.',
    visible: true,
    status: 'verified',
    altText: 'Amazon logo — previous UltraOP campaign'
  },
  {
    id: 'brand-the-finals',
    name: 'THE FINALS',
    logo: '/assets/images/brands/campaigns/the-finals.svg',
    logoKey: 'thefinals',
    campaignType: 'Game Launch & Esports Campaign',
    category: 'Competitive FPS Gaming',
    year: '2024',
    shortDescription: 'Title launch promotional gameplay showcases and community tournament broadcasts.',
    description: 'Title launch promotional gameplay showcases and community tournament broadcasts.',
    visible: true,
    status: 'verified',
    altText: 'THE FINALS game logo — previous UltraOP campaign'
  },
  {
    id: 'brand-wild-stone',
    name: 'Wild Stone',
    logo: '/assets/images/brands/campaigns/wild-stone.svg',
    logoKey: 'wildstone',
    campaignType: 'Creator Lifestyle Campaign',
    category: 'Men\'s Grooming & Lifestyle',
    year: '2023',
    shortDescription: 'Lifestyle sponsorship integration and youth audience engagement campaign.',
    description: 'Lifestyle sponsorship integration and youth audience engagement campaign.',
    visible: true,
    status: 'verified',
    altText: 'Wild Stone logo — previous UltraOP campaign'
  },
  {
    id: 'brand-hero',
    name: 'Hero',
    logo: '/assets/images/brands/campaigns/hero.svg',
    logoKey: 'hero',
    campaignType: 'Brand Campaign',
    category: 'Mobility & Automotive',
    year: '2023–2024',
    shortDescription: 'Youth-targeted brand awareness campaign and digital creator collaboration.',
    description: 'Youth-targeted brand awareness campaign and digital creator collaboration.',
    visible: true,
    status: 'verified',
    altText: 'Hero logo — previous UltraOP campaign'
  },
  {
    id: 'brand-parallel-mobile',
    name: 'Parallel Mobile',
    logo: '/assets/images/brands/campaigns/parallel-mobile.svg',
    logoKey: 'parallel',
    campaignType: 'Mobile App Campaign',
    category: 'Mobile Gaming & Utilities',
    year: '2024',
    shortDescription: 'Mobile app spotlight, feature demonstrations, and creator audience activations.',
    description: 'Mobile app spotlight, feature demonstrations, and creator audience activations.',
    visible: true,
    status: 'verified',
    altText: 'Parallel Mobile logo — previous UltraOP campaign'
  },
  {
    id: 'brand-tvs',
    name: 'TVS',
    logo: '/assets/images/brands/campaigns/tvs.svg',
    logoKey: 'tvs',
    campaignType: 'Brand Campaign',
    category: 'Automotive & Lifestyle',
    year: '2023',
    shortDescription: 'Digital brand awareness campaign and creator lifestyle promotional partnership.',
    description: 'Digital brand awareness campaign and creator lifestyle promotional partnership.',
    visible: true,
    status: 'verified',
    altText: 'TVS logo — previous UltraOP campaign'
  },
  {
    id: 'brand-e-cricket',
    name: 'E-Cricket',
    logo: '/assets/images/brands/campaigns/ecricket.svg',
    logoKey: 'ecricket',
    campaignType: 'Gaming Campaign',
    category: 'Sports & Cricket Gaming',
    year: '',
    shortDescription: 'Promotional gameplay broadcast and community cricket challenges.',
    description: 'Promotional gameplay broadcast and community cricket challenges.',
    // Marked as pending / disabled until official trademark and brand asset pack are verified
    visible: false,
    status: 'pending',
    altText: 'E-Cricket game logo — previous UltraOP campaign (pending verification)'
  }
];
