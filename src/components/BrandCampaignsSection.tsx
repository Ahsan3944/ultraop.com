/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP - Brands & Campaigns Section
 * Showcases verified brand collaborations, creator integrations, and commercial campaign history.
 */

import React from 'react';
import { BRAND_CAMPAIGNS_DATA, BrandCampaign } from '../data/brandCampaigns';
import { BrandLogo } from './BrandLogos';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BrandCampaignsSection: React.FC = () => {
  // Only display active and verified commercial campaigns
  const activeBrands = BRAND_CAMPAIGNS_DATA.filter((item) => item.visible);

  // Repeat the list 4 times for seamless infinite horizontal marquee continuity
  const marqueeItems: BrandCampaign[] = [
    ...activeBrands,
    ...activeBrands,
    ...activeBrands,
    ...activeBrands,
  ];

  return (
    <section
      id="collaborations"
      className="py-20 sm:py-24 bg-[#F4F4F1] dark:bg-[#0C0C0E] relative overflow-hidden border-t border-black/10 dark:border-white/10 select-none transition-colors duration-300"
      aria-label="Commercial Collaborations, Brands and Sponsorships UltraOP has worked with"
    >
      <span id="brands-campaigns" className="absolute -top-24" />
      {/* Subtle Background Watermark */}
      <div className="absolute top-8 left-0 text-[140px] sm:text-[200px] font-black text-black/[0.03] dark:text-white/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        CAMPAIGNS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6"
        >
          <div className="max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.35em] text-[#FF3E00] flex items-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]" />
              <span>Commercial Collaborations</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#121212] dark:text-[#F4F4F1] tracking-tighter font-heading leading-tight transition-colors">
              Brands & Campaigns <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                I’ve worked with.
              </span>
            </h2>

            <p className="mt-4 text-[#555555] dark:text-[#9E9E99] text-sm sm:text-base leading-relaxed font-medium max-w-2xl transition-colors">
              From gaming and technology to lifestyle and entertainment, I’ve worked on promotional campaigns with a range of recognized brands and platforms.
            </p>
          </div>

          {/* Experience Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-[#151518] border border-black/10 dark:border-white/10 text-[#121212] dark:text-[#F4F4F1] shadow-sm self-start md:self-auto shrink-0 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#FF3E00]" />
            <div className="text-[11px] font-black uppercase tracking-wider">
              Verified Creator Campaigns
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee Track Container with Subtle Edge Fades */}
      <div className="relative w-full overflow-hidden mt-2">
        {/* Left Gradient Mask for smooth entry */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#F4F4F1] dark:from-[#0C0C0E] to-transparent z-20 pointer-events-none" />
        {/* Right Gradient Mask for smooth exit */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F4F4F1] dark:from-[#0C0C0E] to-transparent z-20 pointer-events-none" />

        {/* Marquee Strip (Right -> Left Infinite Flow) */}
        <div className="w-full overflow-hidden py-4 cursor-default">
          <div
            className="animate-marquee-smooth flex items-stretch gap-4 sm:gap-6 px-4"
            aria-hidden="true"
          >
            {marqueeItems.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="w-[260px] sm:w-[300px] shrink-0 bg-[#F5F5F5] dark:bg-[#151518] border border-black/10 dark:border-white/10 rounded-none p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#FF3E00]/50 dark:hover:border-[#FF3E00]/50 hover:shadow-[0_10px_30px_rgba(255,62,0,0.08)] hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* Brand Logo Container with contrast background */}
                <div className="h-16 sm:h-18 flex items-center justify-center border-b border-black/5 dark:border-white/5 pb-4 mb-4 bg-[#EAEAE6] dark:bg-[#1E1E22] p-3 transition-colors group-hover:bg-[#E2E2DC] dark:group-hover:bg-[#25252A]">
                  <BrandLogo
                    logoKey={brand.logoKey}
                    className="h-8 sm:h-9 max-w-[180px] w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Brand Name & Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-base sm:text-lg text-[#121212] dark:text-[#F4F4F1] group-hover:text-[#FF3E00] dark:group-hover:text-[#FF3E00] transition-colors">
                      {brand.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] opacity-75" />
                  </div>

                  {/* Campaign Type Pill */}
                  <div className="inline-block px-2.5 py-0.5 bg-[#EAEAE6] dark:bg-[#202024] border border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-wider text-[#555555] dark:text-[#A0A09C] group-hover:bg-[#121212] group-hover:text-white dark:group-hover:bg-[#FF3E00] dark:group-hover:text-white transition-colors">
                    {brand.campaignType}
                  </div>

                  {/* Category description */}
                  <p className="text-[11px] text-[#666666] dark:text-[#999999] font-medium leading-snug pt-1 transition-colors">
                    {brand.category}
                  </p>
                </div>

                {/* Card Bottom subtle trust indicator */}
                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] text-[#888888] dark:text-[#777777] font-medium transition-colors">
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Campaign Completed
                  </span>
                  {brand.year && (
                    <span className="font-mono text-[9px] font-bold text-[#666] dark:text-[#888]">
                      {brand.year}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Semantics & Screen Reader Data */}
      <div className="sr-only">
        <h3>List of Brands Collaborated with:</h3>
        <ul>
          {activeBrands.map((b) => (
            <li key={b.id}>
              {b.name} - {b.campaignType} ({b.category}). {b.shortDescription}
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle Bottom Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] dark:text-[#888888] border-t border-black/5 dark:border-white/5 pt-4 gap-2 transition-colors">
          <span>
            Featured brands represent past creator sponsorships, product integrations, and promotional campaigns.
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#121212] dark:text-[#F4F4F1] transition-colors">
            Kolkata, India • Global Creator Reach
          </span>
        </div>
      </div>
    </section>
  );
};
