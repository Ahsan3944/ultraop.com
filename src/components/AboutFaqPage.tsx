import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Sparkles, 
  ExternalLink, 
  Youtube, 
  Instagram, 
  Radio, 
  Gamepad2, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  ArrowLeft, 
  Share2, 
  Award, 
  Trophy, 
  Cpu, 
  Box, 
  Crosshair, 
  Flame, 
  BookOpen, 
  Target, 
  Code, 
  Video, 
  Zap, 
  CheckCircle2,
  FolderSync
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { updateDocumentSEO } from '../utils/seo';
import { CREATOR_PROFILE, GAMES_PLAYED_DATA, CHANNELS_DATA } from '../data/gamingData';
import { CreatorAssetImage } from './CreatorAssetImage';
import { UltraLogo } from './UltraLogo';

export interface FAQEntry {
  id: string;
  category: 'about' | 'gaming' | 'youtube' | 'minecraft' | 'projects' | 'business';
  categoryLabel: string;
  question: string;
  answer: string;
  keywords: string[];
  keyTakeaway?: string;
  internalLink?: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
}

export const SEO_FAQS: FAQEntry[] = [
  // 1. About UltraOP & Ahsan
  {
    id: 'who-is-ultraop',
    category: 'about',
    categoryLabel: 'About UltraOP',
    question: 'Who is UltraOP?',
    answer: 'UltraOP (also known as Ultra OP) is the official gaming brand and entertainment media identity of Indian creator Sk Ahsan Ahmad. UltraOP is known for high-tier gaming videos, Minecraft storytelling series, live broadcasts, and community interactive web games across YouTube, Rooter, Twitch, Kick, and Instagram.',
    keywords: ['UltraOP', 'Ultra OP', 'Who is UltraOP', 'UltraOP creator', 'Sk Ahsan Ahmad', 'Gaming creator'],
    keyTakeaway: 'Official gaming and digital content creator brand led by Sk Ahsan Ahmad.',
    internalLink: { text: 'View Channel Suite', href: '#channels' }
  },
  {
    id: 'who-is-ahsan',
    category: 'about',
    categoryLabel: 'About UltraOP',
    question: 'Who is Ahsan?',
    answer: 'Ahsan (full name Sk Ahsan Ahmad) is the founder, video creator, and lead personality behind UltraOP. Based in Kolkata, India, Ahsan has been creating digital gaming media since 2019, growing an active community of over 650,000+ gamers across multiple channels including @ultraoplive, @ultraop2 (Minecraft), @ultraopearnings, and @ahsannow.',
    keywords: ['Who is Ahsan', 'Ahsan', 'Sk Ahsan Ahmad', 'Ahsan UltraOP', 'Ahsan Kolkata', 'Ahsan gaming'],
    keyTakeaway: 'Sk Ahsan Ahmad is the creator and host behind UltraOP, Ahsan Now, and OP Earnings.',
    internalLink: { text: 'Explore Creator Bio', href: '#about' }
  },
  {
    id: 'what-is-ultraop-known-for',
    category: 'about',
    categoryLabel: 'About UltraOP',
    question: 'What is UltraOP known for?',
    answer: 'UltraOP is widely recognized for dynamic gaming videos, immersive Minecraft storytelling & hardcore survival builds, tactical shooter gameplay, creator growth insights on OP Earnings, and engineering browser-playable web games on the official UltraOP portal.',
    keywords: ['What is UltraOP known for', 'UltraOP fame', 'UltraOP achievements', 'Ultra OP videos'],
    keyTakeaway: 'Known for Minecraft storytelling, gaming videos, creator tips, and interactive web tools.'
  },
  {
    id: 'is-ultraop-a-gaming-creator',
    category: 'about',
    categoryLabel: 'About UltraOP',
    question: 'Is UltraOP a gaming creator?',
    answer: 'Yes. UltraOP is a full-time, verified gaming content creator, video producer, and digital entertainer. Over the past 5+ years, UltraOP has hosted more than 1,700+ live sessions, amassed over 65 Million total lifetime views across streaming platforms, and produces regular video and stream entertainment.',
    keywords: ['Is UltraOP a gaming creator', 'UltraOP gamer', 'UltraOP streamer', 'Ultra OP verified'],
    keyTakeaway: 'Verified gaming content creator with 1,700+ broadcasts and 65M+ lifetime views.'
  },

  // 2. Gaming & Content
  {
    id: 'what-games-does-ultraop-play',
    category: 'gaming',
    categoryLabel: 'Gaming & Content',
    question: 'What games does UltraOP play?',
    answer: 'UltraOP actively creates content and streams for Minecraft (Hardcore 100 Days survival, multiplayer SMP realms, and redstone automation), Valorant (tactical FPS ranked gameplay), Grand Theft Auto V (custom stunt races and roleplay), and Roblox (community mini-games and Obbies). Historically, UltraOP originated in the mobile battle royale era with Free Fire and PUBG Mobile.',
    keywords: ['What games does UltraOP play', 'UltraOP games', 'UltraOP Valorant', 'UltraOP GTA V', 'UltraOP Roblox'],
    keyTakeaway: 'Active focus: Minecraft, Valorant, GTA V, Roblox, and interactive web games.',
    internalLink: { text: 'Check Games Breakdown', href: '#gaming' }
  },
  {
    id: 'what-type-of-gaming-content',
    category: 'gaming',
    categoryLabel: 'Gaming & Content',
    question: 'What type of gaming content does UltraOP create?',
    answer: 'UltraOP creates a diverse spectrum of gaming entertainment: 1) Engaging Minecraft storytelling and Hardcore 100 Days survival series; 2) Live gaming broadcasts on YouTube, Twitch, Kick, and Rooter; 3) Long-form survival playthroughs and challenge videos; 4) Daily YouTube Shorts and cinematic gameplay edits; 5) Creator monetization and YouTube growth masterclasses on OP Earnings; and 6) Tech reviews on studio gear and gaming gadgets on Ahsan Now.',
    keywords: ['What type of gaming content does UltraOP create', 'UltraOP content', 'UltraOP guides', 'UltraOP shorts'],
    keyTakeaway: 'Minecraft storytelling, live interactive streams, creator tutorials, shorts, and tech unboxings.',
    internalLink: { text: 'Watch Latest Broadcasts', href: '#videos' }
  },
  {
    id: 'does-ultraop-create-valorant-content',
    category: 'gaming',
    categoryLabel: 'Gaming & Content',
    question: 'Does UltraOP create Valorant and competitive gaming content?',
    answer: 'Yes! UltraOP streams competitive Valorant ranked matches regularly, maining duelists and controllers like Reyna, Jett, and Omen. Content includes aim calibration routines, clutch highlights, crosshair placement tutorials, and 5v5 community custom scrims.',
    keywords: ['Does UltraOP create Valorant content', 'UltraOP Valorant', 'UltraOP FPS', 'Ultra OP aim'],
    keyTakeaway: 'Competitive Immortal/Ascendant rank grinds, agent guides, and aim training routines.',
    internalLink: { text: 'Try Aim Sensitivity Lab', href: '#sensitivity-lab' }
  },

  // 3. Minecraft & Games
  {
    id: 'what-is-ultraop-minecraft',
    category: 'minecraft',
    categoryLabel: 'Minecraft & Games',
    question: 'What is UltraOP Minecraft?',
    answer: 'UltraOP Minecraft refers to the dedicated Minecraft gaming division and content hub led by Ahsan on YouTube channel @ultraop2. It focuses exclusively on daily Minecraft survival live streams, Hardcore 100 Days challenges, community multiplayer SMP realms, netherite speedruns, and automated redstone farms.',
    keywords: ['What is UltraOP Minecraft', 'UltraOP Minecraft', 'Ultra OP 2', 'UltraOP SMP', 'Minecraft Ahsan'],
    keyTakeaway: 'The dedicated Minecraft channel (@ultraop2) featuring daily live SMP and 100 Days survival.',
    internalLink: { text: 'Visit @ultraop2 on YouTube', href: 'https://www.youtube.com/@ultraop2', isExternal: true }
  },
  {
    id: 'does-ultraop-create-minecraft-content',
    category: 'minecraft',
    categoryLabel: 'Minecraft & Games',
    question: 'Does UltraOP create Minecraft content?',
    answer: 'Yes! Minecraft is currently one of UltraOP’s primary active gaming pillars. Fans can watch daily live streams, multiplayer realm builds with subscribers, modded boss challenges, and survival tutorials on the official YouTube channel @ultraop2.',
    keywords: ['Does UltraOP create Minecraft content', 'UltraOP Minecraft videos', 'UltraOP Minecraft survival'],
    keyTakeaway: 'Minecraft is a core daily pillar with dedicated live streams and community SMP realms.'
  },
  {
    id: 'what-is-ultraop-web-arcade',
    category: 'minecraft',
    categoryLabel: 'Minecraft & Games',
    question: 'What is the UltraOP Playable Web Arcade?',
    answer: 'The UltraOP Web Arcade is a zero-installation browser gaming suite built directly into the official website. It features 7 custom-developed games including Multi-Game Esports & Gamer Trivia, Reflex Aim Pro (FPS aim calibration), Zen Harmonic Flow (relaxing 2048), Bubble Zen Garden, Cyber Strike: Galaxy Ops, Neon Cyber Snake, and Ultra Cyber Dash.',
    keywords: ['UltraOP Web Arcade', 'Playable games', 'UltraOP mini games', 'Zero install arcade'],
    keyTakeaway: '7 zero-installation browser games playable instantly on mobile, tablet, and PC.',
    internalLink: { text: 'Play Arcade Games Now', href: '#gaming' }
  },

  // 4. YouTube & Social Media
  {
    id: 'where-can-i-watch-ultraop-videos',
    category: 'youtube',
    categoryLabel: 'YouTube & Social Media',
    question: 'Where can I watch UltraOP videos and live streams?',
    answer: 'You can watch UltraOP live streams and videos across his official verified channels: YouTube (@ultraoplive and @ultraop2), Rooter (@ultraop142404154), Kick (@ultra-op-live), and Twitch (@ultraoplive). Highlights and short-form clips are also published across YouTube Shorts and Instagram (@ultraopp).',
    keywords: ['Where can I watch UltraOP videos', 'UltraOP live stream', 'UltraOP channels', 'Watch UltraOP'],
    keyTakeaway: 'Watch on YouTube (@ultraoplive, @ultraop2), Rooter, Kick, Twitch, and Instagram.',
    internalLink: { text: 'View All Streaming Links', href: '#channels' }
  },
  {
    id: 'what-is-ultraop-live',
    category: 'youtube',
    categoryLabel: 'YouTube & Social Media',
    question: 'What is UltraOP Live?',
    answer: 'UltraOP Live is the flagship live broadcast channel and stream persona operated by Sk Ahsan Ahmad. Under @ultraoplive on YouTube, Twitch, and Kick, it hosts daily interactive gaming sessions, live viewer custom matches, gaming discussions, esports watch parties, and community giveaways.',
    keywords: ['What is UltraOP Live', 'UltraOP Live', 'Ultra OP Live stream', 'ultraoplive channel'],
    keyTakeaway: 'The flagship multi-platform live streaming channel for daily broadcasts and community scrims.',
    internalLink: { text: 'Open YouTube @ultraoplive', href: 'https://www.youtube.com/@ultraoplive', isExternal: true }
  },
  {
    id: 'what-youtube-channels-does-ultraop-have',
    category: 'youtube',
    categoryLabel: 'YouTube & Social Media',
    question: 'What YouTube channels does UltraOP have?',
    answer: 'UltraOP operates a coordinated multi-channel YouTube creator ecosystem: 1) Ultra OP Live (@ultraoplive) – Flagship live gaming & highlights; 2) Ultra OP 2 (@ultraop2) – Dedicated Minecraft SMP and survival hub; 3) Ultra OP 3 (@ultraop3) – Roblox adventures & community challenges; 4) OP Earnings (@ultraopearnings) – Creator growth & monetization masterclasses; and 5) Ahsan Now (@ahsannow) – Futuristic gaming gadgets, PC rigs & tech unboxings.',
    keywords: ['What YouTube channels does UltraOP have', 'UltraOP YouTube network', 'Ahsan YouTube channels', 'ultraoplive', 'ultraop2', 'ultraopearnings', 'ahsannow'],
    keyTakeaway: 'A 5-channel YouTube suite dedicated to live streaming, Minecraft, Roblox, monetization, and tech.',
    internalLink: { text: 'Explore All 5 YouTube Channels', href: '#channels' }
  },
  {
    id: 'where-can-i-follow-ultraop',
    category: 'youtube',
    categoryLabel: 'YouTube & Social Media',
    question: 'Where can I follow UltraOP on social media?',
    answer: 'You can connect with UltraOP on Instagram (@ultraopp for personal & gaming updates, @op_earnings for creator tips, @ahsannow for tech gadgets), join the official UltraOP Discord Community Server for daily custom room announcements, and follow on Rooter (@ultraop142404154).',
    keywords: ['Where can I follow UltraOP', 'UltraOP Instagram', 'UltraOP Discord', 'UltraOP Rooter', 'UltraOP socials'],
    keyTakeaway: 'Instagram @ultraopp, Discord community, Rooter, Kick, and Twitch.',
    internalLink: { text: 'Join Official Discord', href: 'https://discord.gg/ZQ2afmPvuP', isExternal: true }
  },

  // 5. Projects & Brand
  {
    id: 'what-projects-is-ultraop-working-on',
    category: 'projects',
    categoryLabel: 'Projects',
    question: 'What projects is UltraOP currently working on?',
    answer: 'UltraOP is currently expanding multiple flagship projects: 1) Building a persistent community Minecraft SMP realm for loyal subscribers; 2) Expanding the UltraOP Playable Web Arcade with new game genres and leaderboards; 3) Upgrading the live studio battle station with high-refresh multi-cam streaming hardware; and 4) Producing a masterclass video series on creator monetization on OP Earnings.',
    keywords: ['What projects is UltraOP working on', 'UltraOP projects', 'UltraOP upcoming', 'UltraOP roadmap'],
    keyTakeaway: 'Expanding subscriber Minecraft SMP realms, web arcade games, studio tech, and creator courses.',
    internalLink: { text: 'View Tournament Arena', href: '#tournaments' }
  },

  // 6. Business & Contact
  {
    id: 'what-brands-has-ultraop-worked-with',
    category: 'business',
    categoryLabel: 'Business & Contact',
    question: 'What brands and campaigns has UltraOP worked with?',
    answer: 'UltraOP has collaborated with a wide spectrum of recognized consumer and gaming brands on creator promotional campaigns, product launches, and digital sponsorships, including Amazon, THE FINALS (Embark Studios), Wild Stone, Hero MotoCorp, Parallel Mobile, and TVS Motor Company.',
    keywords: ['What brands has UltraOP worked with', 'UltraOP sponsors', 'UltraOP brand campaigns', 'Amazon', 'THE FINALS', 'Wild Stone', 'Hero', 'Parallel Mobile', 'TVS'],
    keyTakeaway: 'Previous collaborations include Amazon, THE FINALS, Wild Stone, Hero, Parallel Mobile, and TVS.',
    internalLink: { text: 'View Brand Campaigns Showcase', href: '#brands-campaigns' }
  },
  {
    id: 'how-to-contact-ultraop-for-business',
    category: 'business',
    categoryLabel: 'Business & Contact',
    question: 'How can I contact UltraOP for business inquiries, brand sponsorships, or collaboration?',
    answer: 'For verified brand sponsorships, game publisher collaborations, esports event partnerships, and commercial inquiries, reach out directly to Sk Ahsan Ahmad via official business email at ultraopbiz@gmail.com or connect with our management team on Discord.',
    keywords: ['How to contact UltraOP for business', 'UltraOP business email', 'UltraOP sponsorship', 'UltraOP collaboration', 'ultraopbiz@gmail.com'],
    keyTakeaway: 'Official business inquiries: ultraopbiz@gmail.com.',
    internalLink: { text: 'Go to Contact Desk', href: '#contact' }
  }
];

interface AboutFaqPageProps {
  onBackToHome: () => void;
  onNavigateSection?: (sectionHash: string) => void;
}

export const AboutFaqPage: React.FC<AboutFaqPageProps> = ({ onBackToHome, onNavigateSection }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>(['who-is-ultraop', 'what-games-does-ultraop-play']);
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Set SEO Document Title, Canonical, Meta tags, and FAQPage JSON-LD
  useEffect(() => {
    const faqSchema = {
      '@type': 'FAQPage',
      '@id': 'https://ultraop.in/faq/#faqpage',
      mainEntity: SEO_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    updateDocumentSEO({
      title: 'About UltraOP & FAQ — Ahsan, Gaming & Minecraft',
      description: 'Frequently asked questions about UltraOP, Ahsan, Minecraft videos, streaming channels, gaming setup, and commercial campaigns.',
      canonicalPath: '/faq/',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About & FAQ', path: '/faq/' }
      ],
      schema: faqSchema
    });
  }, []);

  const categories = [
    { id: 'all', label: 'All Knowledge (16)' },
    { id: 'about', label: 'About UltraOP & Ahsan' },
    { id: 'gaming', label: 'Gaming & Content' },
    { id: 'minecraft', label: 'Minecraft & Games' },
    { id: 'youtube', label: 'YouTube & Socials' },
    { id: 'projects', label: 'Projects & Arcade' },
    { id: 'business', label: 'Business & Contact' }
  ];

  const filteredFaqs = useMemo(() => {
    return SEO_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.keywords.some((k) => k.toLowerCase().includes(q)) ||
        (faq.keyTakeaway && faq.keyTakeaway.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    sound.playClick();
    setOpenAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    sound.playClick();
    if (openAccordionIds.length === filteredFaqs.length) {
      setOpenAccordionIds([]);
    } else {
      setOpenAccordionIds(filteredFaqs.map((f) => f.id));
    }
  };

  const handleCopyFaqLink = (faq: FAQEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playScore();
    const shareUrl = `${window.location.origin}${window.location.pathname}#faq-${faq.id}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedFaqId(faq.id);
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.6 } });
    setTimeout(() => setCopiedFaqId(null), 2500);
  };

  const handleCopyEmail = () => {
    sound.playScore();
    navigator.clipboard?.writeText(CREATOR_PROFILE.businessEmail);
    setCopiedEmail(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleInternalNav = (href: string, isExternal?: boolean, e?: React.MouseEvent) => {
    if (isExternal) return; // standard link
    if (e) e.preventDefault();
    sound.playClick();
    if (href.startsWith('#')) {
      if (onNavigateSection) {
        onNavigateSection(href);
      } else {
        onBackToHome();
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#121212] pt-28 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-16 left-0 text-[180px] sm:text-[260px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        KNOWLEDGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-black/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onBackToHome();
              }}
              className="px-4 py-2.5 bg-white hover:bg-[#121212] hover:text-white border border-black/20 text-[#121212] text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF3E00]" />
              <span>Back to Main Hub</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#666666]">
              <span>Home</span>
              <span>/</span>
              <span className="text-[#FF3E00] font-bold">About UltraOP & Knowledge FAQ</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Verified Brand Page</span>
            </span>
          </div>
        </div>

        {/* SECTION 1: HERO / ABOUT ULTRAOP PREMIUM SECTION */}
        <section id="creator-bio" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Creator Verified Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-white border-2 border-black p-4 shadow-xl relative">
                {/* Photo of Sk Ahsan Ahmad */}
                <div className="relative aspect-[4/5] bg-[#121212] overflow-hidden group">
                  <CreatorAssetImage
                    assetType="creator_photo"
                    alt="Sk Ahsan Ahmad - UltraOP Founder and Streamer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* UltraOP Brand Stamp */}
                  <div className="absolute top-3.5 right-3.5 p-1.5 bg-white/95 backdrop-blur-sm border border-black/30 shadow-md">
                    <UltraLogo size={36} />
                  </div>

                  {/* Live Status Badge */}
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#FF3E00] text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Official Profile</span>
                  </div>

                  {/* Photo Footer Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-0.5">
                      Gaming Creator • Esports Streamer
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
                      Sk Ahsan Ahmad
                    </h1>
                    <div className="text-xs text-gray-300 font-mono mt-0.5">
                      @ultraoplive • Kolkata, India
                    </div>
                  </div>
                </div>

                {/* Quick Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/10 text-center">
                  <div className="p-2 bg-[#F4F4F1] border border-black/10">
                    <div className="text-lg font-black text-[#121212] font-heading">650K+</div>
                    <div className="text-[9px] font-black uppercase text-[#666] tracking-wider">Community</div>
                  </div>
                  <div className="p-2 bg-[#F4F4F1] border border-black/10">
                    <div className="text-lg font-black text-[#FF3E00] font-heading">65M+</div>
                    <div className="text-[9px] font-black uppercase text-[#666] tracking-wider">Lifetime Views</div>
                  </div>
                  <div className="p-2 bg-[#F4F4F1] border border-black/10">
                    <div className="text-lg font-black text-[#121212] font-heading">1,700+</div>
                    <div className="text-[9px] font-black uppercase text-[#666] tracking-wider">Live Streams</div>
                  </div>
                </div>

                {/* Direct Verified Social Links Bar */}
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between gap-1 flex-wrap">
                  <a
                    href="https://www.youtube.com/@ultraoplive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FF3E00] hover:bg-black text-white transition-colors"
                    title="UltraOP YouTube Live"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@ultraop2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-600 hover:bg-black text-white transition-colors"
                    title="UltraOP Minecraft (@ultraop2)"
                  >
                    <Box className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/ultraopp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-pink-600 hover:bg-black text-white transition-colors"
                    title="Instagram (@ultraopp)"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.rooter.gg/profile/142404154"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#121212] hover:bg-[#FF3E00] text-white transition-colors"
                    title="Rooter HQ (515K+ Fans)"
                  >
                    <Radio className="w-4 h-4 text-[#FF3E00]" />
                  </a>
                  <a
                    href="https://discord.gg/ZQ2afmPvuP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-indigo-600 hover:bg-black text-white transition-colors"
                    title="Discord Guild"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  {/* Copy Business Email */}
                  <button
                    onClick={handleCopyEmail}
                    className="ml-auto px-3 py-2 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    title="Copy Official Business Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Mail className="w-3 h-3 text-[#FF3E00]" />}
                    <span>{copiedEmail ? 'Copied' : 'Contact'}</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Editorial Bio & Brand Story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Category Eyebrow */}
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3">
                <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
                <span>Official Creator Profile & Media Kit</span>
              </div>

              {/* Editorial Heading */}
              <h2 className="text-3xl sm:text-5xl font-black text-[#121212] font-heading tracking-tight leading-[0.95]">
                WHO IS <span className="text-[#FF3E00]">ULTRAOP</span>? <br />
                <span className="font-serif-italic font-normal text-[#121212] text-2xl sm:text-4xl">
                  The creator, gamer & digital storyteller.
                </span>
              </h2>

              {/* Bio Narrative */}
              <div className="space-y-4 text-sm sm:text-base text-[#3A3A3A] font-medium leading-relaxed">
                <p>
                  <strong className="text-[#121212] font-black">UltraOP</strong> (commonly searched as <em>Ultra OP</em> or <em>UltraOP Live</em>) is the digital gaming identity of <strong className="text-[#121212] font-black">Sk Ahsan Ahmad</strong>, an accomplished Indian variety streamer, content creator, and esports entertainer based in Kolkata, West Bengal.
                </p>
                <p>
                  Starting his content creation journey in early 2019 with competitive mobile battle royale titles, Ahsan quickly rose to prominence through precision aim mechanics, sharp analytical game sense, and an authentic, high-energy live streaming presence. Over the course of 1,700+ live broadcasts, he built a massive dedicated following exceeding <strong className="text-[#121212]">515,000+ followers and 65 Million total views</strong> on Rooter alongside an expansive multi-channel YouTube suite.
                </p>
                <p>
                  Today, UltraOP’s content spans daily <strong className="text-[#121212]">Minecraft Hardcore 100 Days survival and multiplayer SMP realms</strong> on <a href="https://www.youtube.com/@ultraop2" target="_blank" rel="noopener noreferrer" className="text-[#FF3E00] font-black underline underline-offset-4 hover:text-black">@ultraop2</a>, competitive <strong className="text-[#121212]">Valorant ranked and tactical clutch streams</strong> on <a href="https://www.youtube.com/@ultraoplive" target="_blank" rel="noopener noreferrer" className="text-[#FF3E00] font-black underline underline-offset-4 hover:text-black">@ultraoplive</a>, creator monetization masterclasses on <strong className="text-[#121212]">OP Earnings</strong>, and futuristic studio tech reviews on <strong className="text-[#121212]">Ahsan Now</strong>.
                </p>
              </div>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-black/15 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-[#121212] font-heading uppercase tracking-wide">
                    <Box className="w-4 h-4 text-emerald-600" />
                    <span>Daily Minecraft SMP & Survival</span>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">
                    Hardcore challenges, massive automated redstone builds, netherite speedruns, and community viewer realms.
                  </p>
                </div>

                <div className="p-4 bg-white border border-black/15 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-[#121212] font-heading uppercase tracking-wide">
                    <Crosshair className="w-4 h-4 text-rose-600" />
                    <span>Competitive FPS & Valorant</span>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">
                    Immortal rank pushes, 1v5 clutch execution, crosshair DPI calibration guides, and custom tactical scrims.
                  </p>
                </div>

                <div className="p-4 bg-white border border-black/15 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-[#121212] font-heading uppercase tracking-wide">
                    <Gamepad2 className="w-4 h-4 text-[#FF3E00]" />
                    <span>Playable Web Arcade Portal</span>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">
                    Custom web-engineered mini-games with zero download requirements for mobile, tablet, and PC gamers.
                  </p>
                </div>

                <div className="p-4 bg-white border border-black/15 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-[#121212] font-heading uppercase tracking-wide">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <span>Gaming Tech & Creator Insights</span>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">
                    Unboxing budget studio gear on Ahsan Now and breaking down channel growth strategies on OP Earnings.
                  </p>
                </div>
              </div>

              {/* Direct Jump Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="#faq-accordion"
                  onClick={() => sound.playClick()}
                  className="px-6 py-3.5 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-xs uppercase tracking-[0.25em] flex items-center gap-2 transition-all shadow-sm"
                >
                  <HelpCircle className="w-4 h-4 text-[#FF3E00] group-hover:text-white" />
                  <span>Browse All 16+ FAQs</span>
                </a>

                <button
                  onClick={(e) => handleInternalNav('#channels', false, e)}
                  className="px-6 py-3.5 bg-white hover:bg-[#121212] hover:text-white border border-black/20 text-[#121212] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm"
                >
                  <Youtube className="w-4 h-4 text-[#FF3E00]" />
                  <span>Explore Channel Suite (12)</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SEO FAQ KNOWLEDGE ACCORDION */}
        <section id="faq-accordion" className="pt-12 border-t-2 border-black/10">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="text-left max-w-2xl">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#FF3E00]" />
                <span>SEO Knowledge Base & FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#121212] font-heading tracking-tight leading-tight">
                FREQUENTLY ASKED <span className="font-serif-italic font-normal text-[#FF3E00] lowercase">questions.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] font-medium mt-2">
                Verified answers to common questions about UltraOP, Sk Ahsan Ahmad, YouTube channels, Minecraft broadcasts, gaming tournaments, and business collaborations.
              </p>
            </div>

            {/* Search Input */}
            <div className="flex items-center bg-white border-2 border-black px-4 py-3 w-full md:w-80 shadow-md focus-within:border-[#FF3E00] transition-colors">
              <Search className="w-4 h-4 text-[#FF3E00] mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search topics (e.g. Minecraft, Ahsan, Live)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#121212] placeholder-[#888] focus:outline-none w-full font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#888] hover:text-black font-mono font-bold ml-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Expand/Collapse Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-black/10">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3.5 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#121212] text-white shadow-sm'
                        : 'bg-white hover:bg-[#121212] hover:text-white text-[#121212] border border-black/15'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleExpandAll}
              className="text-[10px] font-black uppercase tracking-widest text-[#FF3E00] hover:text-black underline underline-offset-4 self-start sm:self-auto py-1"
            >
              {openAccordionIds.length === filteredFaqs.length ? 'Collapse All FAQs' : 'Expand All FAQs'}
            </button>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openAccordionIds.includes(faq.id);
              const isCopied = copiedFaqId === faq.id;
              const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`bg-white border-2 transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-black shadow-lg' : 'border-black/15 hover:border-black/50 shadow-sm'
                  }`}
                >
                  {/* Accordion Header Bar */}
                  <div className="flex items-center justify-between p-5 sm:p-6 gap-2">
                    <button
                      type="button"
                      id={`faq-header-${faq.id}`}
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left flex items-center justify-between gap-4 focus:outline-none transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <span
                          className={`font-serif-italic text-lg sm:text-xl shrink-0 mt-0.5 transition-colors ${
                            isOpen ? 'text-[#FF3E00]' : 'text-[#777777]'
                          }`}
                        >
                          {formattedIndex}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-[#F4F4F1] border border-black/15 text-[#121212]">
                              {faq.categoryLabel}
                            </span>
                            {faq.keyTakeaway && (
                              <span className="hidden md:inline-block text-[9px] text-[#555555] font-mono">
                                • {faq.keyTakeaway}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-[#121212] font-heading tracking-tight leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? 'bg-[#121212] text-white border-black rotate-180'
                            : 'bg-[#F4F4F1] text-[#121212] border-black/20'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Copy Link Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyFaqLink(faq, e)}
                      title="Copy direct link to this answer"
                      aria-label={`Copy direct link for ${faq.question}`}
                      className="p-2 text-[#666666] hover:text-[#FF3E00] hover:bg-black/5 transition-colors shrink-0 cursor-pointer ml-1"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Accordion Collapsible Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-header-${faq.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 pt-2 sm:px-6 sm:pb-6 text-sm text-[#444444] leading-relaxed border-t border-black/10 bg-[#FAFAF8] space-y-4 font-medium">
                          <p>{faq.answer}</p>

                          {/* Key Takeaway & Deep Internal Links */}
                          <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            {faq.keyTakeaway && (
                              <div className="flex items-center gap-2 text-[10px] text-[#FF3E00] font-black uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                <span>Takeaway: {faq.keyTakeaway}</span>
                              </div>
                            )}

                            {faq.internalLink && (
                              faq.internalLink.isExternal ? (
                                <a
                                  href={faq.internalLink.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#121212] hover:text-[#FF3E00] font-mono underline underline-offset-4"
                                >
                                  <span>{faq.internalLink.text}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => handleInternalNav(faq.internalLink!.href, false, e)}
                                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#121212] hover:text-[#FF3E00] font-mono underline underline-offset-4"
                                >
                                  <span>{faq.internalLink.text}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="p-12 bg-white border-2 border-black text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-[#FF3E00] mx-auto opacity-80" />
                <h3 className="text-base font-black text-[#121212] font-heading">
                  No matching answers found for "{searchQuery}"
                </h3>
                <p className="text-xs text-[#666] max-w-md mx-auto">
                  Try searching for keywords such as "Minecraft", "Valorant", "Ahsan", "YouTube", "Channels", or "Business".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-2 px-4 py-2 bg-[#121212] text-white text-[10px] font-black uppercase tracking-wider"
                >
                  Clear Search & View All FAQs
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: BUSINESS & CONTACT CALLOUT */}
        <section className="mt-16 bg-white border-2 border-black p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 text-left space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF3E00]">
                Official Commercial Desk
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#121212] font-heading tracking-tight">
                Want to partner or collaborate with UltraOP?
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] font-medium leading-relaxed">
                We collaborate with reputable gaming brands, hardware manufacturers, esports tournaments, and gaming studios for integrated campaigns, custom rooms, and sponsored broadcasts.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={handleCopyEmail}
                className="w-full py-3.5 bg-[#FF3E00] hover:bg-black text-white text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy ultraopbiz@gmail.com'}</span>
              </button>

              <a
                href="https://discord.gg/ZQ2afmPvuP"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full py-3.5 bg-white hover:bg-[#121212] hover:text-white border border-black/20 text-[#121212] text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Join Official Discord Server</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
