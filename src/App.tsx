/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GamesHub } from './components/GamesHub';
import { SocialHub } from './components/SocialHub';
import { ChannelsSection } from './components/ChannelsSection';
import { ExploreChannelsPage } from './components/ExploreChannelsPage';
import { AboutFaqPage } from './components/AboutFaqPage';
import { StatsCounter } from './components/StatsCounter';
import { SensitivityLab } from './components/SensitivityLab';
import { TournamentArena } from './components/TournamentArena';
import { VideoSection } from './components/VideoSection';
import { SoundboardCinema } from './components/SoundboardCinema';
import { AboutSection } from './components/AboutSection';
import { BrandCampaignsSection } from './components/BrandCampaignsSection';
import { BlogSection } from './components/BlogSection';
import { FanShowcase } from './components/FanShowcase';
import { SupportSection } from './components/SupportSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './utils/theme';
import { updateDocumentSEO, ROUTE_SEO } from './utils/seo';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  // The default route is ALWAYS 'home'
  const [currentPage, setCurrentPage] = useState<'home' | 'channels' | 'about-faq'>('home');

  useEffect(() => {
    // Check if this is a browser page reload
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        isReload = true;
      }
    } catch {
      isReload = false;
    }

    const initialHash = window.location.hash;

    // If page was reloaded or has stale #channels on startup, normalize to Home
    if (isReload || initialHash === '#channels' || initialHash.startsWith('#/channels')) {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      setCurrentPage('home');
      updateDocumentSEO(ROUTE_SEO.home);
    } else if (initialHash === '#privacy' || initialHash === '#/privacy') {
      setLegalTab('privacy');
      setLegalModalOpen(true);
      setCurrentPage('home');
    } else if (initialHash === '#terms' || initialHash === '#/terms') {
      setLegalTab('terms');
      setLegalModalOpen(true);
      setCurrentPage('home');
    } else if (initialHash === '#disclaimer' || initialHash === '#/disclaimer') {
      setLegalTab('disclaimer');
      setLegalModalOpen(true);
      setCurrentPage('home');
    } else if (initialHash === '#about-faq' || initialHash === '#faq' || initialHash.startsWith('#/about-faq') || initialHash.startsWith('#/faq') || initialHash.startsWith('#faq-')) {
      setCurrentPage('about-faq');
      updateDocumentSEO(ROUTE_SEO.about);
    } else {
      setCurrentPage('home');
      updateDocumentSEO(ROUTE_SEO.home);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy' || hash === '#/privacy') {
        setLegalTab('privacy');
        setLegalModalOpen(true);
      } else if (hash === '#terms' || hash === '#/terms') {
        setLegalTab('terms');
        setLegalModalOpen(true);
      } else if (hash === '#disclaimer' || hash === '#/disclaimer') {
        setLegalTab('disclaimer');
        setLegalModalOpen(true);
      } else if (hash === '#channels' || hash.startsWith('#/channels')) {
        setCurrentPage('channels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateDocumentSEO(ROUTE_SEO.channels);
      } else if (hash === '#about-faq' || hash === '#faq' || hash.startsWith('#/about-faq') || hash.startsWith('#/faq') || hash.startsWith('#faq-')) {
        setCurrentPage('about-faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateDocumentSEO(ROUTE_SEO.about);
      } else if (!hash || hash === '#' || hash === '#/') {
        setCurrentPage('home');
        updateDocumentSEO(ROUTE_SEO.home);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'channels' | 'about-faq', targetHash?: string) => {
    if (page === 'channels') {
      window.location.hash = '#channels';
      setCurrentPage('channels');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateDocumentSEO(ROUTE_SEO.channels);
    } else if (page === 'about-faq') {
      window.location.hash = '#about-faq';
      setCurrentPage('about-faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateDocumentSEO(ROUTE_SEO.about);
    } else {
      setCurrentPage('home');
      if (targetHash) {
        window.location.hash = targetHash;
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      updateDocumentSEO(ROUTE_SEO.home);
    }
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-[#F4F4F1] text-[#121212] selection:bg-[#FF3E00] selection:text-white relative transition-colors duration-300">
          {/* Top Navbar */}
          <Navbar 
            onOpenSearch={() => setSearchOpen(true)} 
            currentPage={currentPage}
            onNavigateHome={() => navigateTo('home')}
            onNavigateChannels={() => navigateTo('channels')}
            onNavigateAboutFaq={() => navigateTo('about-faq')}
          />

          {/* Dynamic View Flow */}
          {currentPage === 'channels' ? (
            <main className="relative animate-fade-in">
              <ExploreChannelsPage onBackToHome={() => navigateTo('home')} />
            </main>
          ) : currentPage === 'about-faq' ? (
            <main className="relative animate-fade-in">
              <AboutFaqPage 
                onBackToHome={() => navigateTo('home')}
                onNavigateSection={(hash) => navigateTo('home', hash)}
              />
            </main>
          ) : (
            <main className="relative">
              <Hero 
                onExploreChannels={() => navigateTo('channels')} 
              />
              <GamesHub />
              <SocialHub onExploreChannels={() => navigateTo('channels')} />
              <StatsCounter />
              <SensitivityLab />
              <TournamentArena />
              <VideoSection />
              <SoundboardCinema />
              <AboutSection onNavigateAboutFaq={() => navigateTo('about-faq')} />
              <BrandCampaignsSection />
              <BlogSection />
              <FanShowcase />
              <SupportSection onExploreAllFaqs={() => navigateTo('about-faq')} />
              <ContactSection />
            </main>
          )}

          {/* Footer */}
          <Footer 
            onNavigateChannels={() => navigateTo('channels')} 
            onNavigateAboutFaq={() => navigateTo('about-faq')}
            onOpenLegal={handleOpenLegal}
          />

          {/* Global Command Palette / Search Modal */}
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          {/* Legal, Privacy & Trademarks Modal */}
          <LegalModal
            isOpen={legalModalOpen}
            initialTab={legalTab}
            onClose={() => setLegalModalOpen(false)}
          />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
