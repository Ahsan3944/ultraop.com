/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GamesHub } from './components/GamesHub';
import { SocialHub } from './components/SocialHub';
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

type Page = 'home' | 'channels' | 'about-faq';
type LegalPath = 'privacy' | 'terms' | 'disclaimer' | null;

function normalizePath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') + '/';
}

function resolveRoute(pathname: string, hash: string): { page: Page; legal: LegalPath } {
  const path = normalizePath(pathname);

  if (path === '/channels/') return { page: 'channels', legal: null };
  if (path === '/about/' || path === '/faq/' || path === '/about-faq/') return { page: 'about-faq', legal: null };
  if (path === '/privacy/') return { page: 'home', legal: 'privacy' };
  if (path === '/terms/') return { page: 'home', legal: 'terms' };

  if (hash === '#channels' || hash.startsWith('#/channels')) return { page: 'channels', legal: null };
  if (hash === '#about-faq' || hash === '#faq' || hash.startsWith('#/about-faq') || hash.startsWith('#/faq') || hash.startsWith('#faq-')) {
    return { page: 'about-faq', legal: null };
  }
  if (hash === '#privacy' || hash === '#/privacy') return { page: 'home', legal: 'privacy' };
  if (hash === '#terms' || hash === '#/terms') return { page: 'home', legal: 'terms' };
  if (hash === '#disclaimer' || hash === '#/disclaimer') return { page: 'home', legal: 'disclaimer' };

  return { page: 'home', legal: null };
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const applyRoute = () => {
      const { page, legal } = resolveRoute(window.location.pathname, window.location.hash);
      setCurrentPage(page);

      if (legal) {
        setLegalTab(legal);
        setLegalModalOpen(true);
      } else {
        setLegalModalOpen(false);
      }

      if (page === 'channels') updateDocumentSEO(ROUTE_SEO.channels);
      else if (page === 'about-faq') {
        updateDocumentSEO(window.location.pathname.startsWith('/faq') ? ROUTE_SEO.faq : ROUTE_SEO.about);
      } else if (legal === 'privacy') updateDocumentSEO(ROUTE_SEO.privacy);
      else if (legal === 'terms') updateDocumentSEO(ROUTE_SEO.terms);
      else updateDocumentSEO(ROUTE_SEO.home);
    };

    applyRoute();
    window.addEventListener('hashchange', applyRoute);
    window.addEventListener('popstate', applyRoute);
    return () => {
      window.removeEventListener('hashchange', applyRoute);
      window.removeEventListener('popstate', applyRoute);
    };
  }, []);

  const navigateTo = (page: Page, targetHash?: string) => {
    const targetPath = page === 'channels' ? '/channels/' : page === 'about-faq' ? '/about/' : '/';

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    setCurrentPage(page);
    setLegalModalOpen(false);

    if (targetHash) {
      window.history.replaceState(null, '', `${targetPath}${targetHash}`);
      requestAnimationFrame(() => {
        document.querySelector(targetHash)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateDocumentSEO(page === 'channels' ? ROUTE_SEO.channels : page === 'about-faq' ? ROUTE_SEO.about : ROUTE_SEO.home);
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
    const path = tab === 'privacy' ? '/privacy/' : tab === 'terms' ? '/terms/' : '/#disclaimer';
    window.history.pushState(null, '', path);
    updateDocumentSEO(tab === 'privacy' ? ROUTE_SEO.privacy : tab === 'terms' ? ROUTE_SEO.terms : ROUTE_SEO.home);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-[#F4F4F1] text-[#121212] selection:bg-[#FF3E00] selection:text-white relative transition-colors duration-300">
          <Navbar
            onOpenSearch={() => setSearchOpen(true)}
            currentPage={currentPage}
            onNavigateHome={() => navigateTo('home')}
            onNavigateChannels={() => navigateTo('channels')}
            onNavigateAboutFaq={() => navigateTo('about-faq')}
          />

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
              <Hero onExploreChannels={() => navigateTo('channels')} />
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

          <Footer
            onNavigateChannels={() => navigateTo('channels')}
            onNavigateAboutFaq={() => navigateTo('about-faq')}
            onOpenLegal={handleOpenLegal}
          />

          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          <LegalModal
            isOpen={legalModalOpen}
            initialTab={legalTab}
            onClose={() => {
              setLegalModalOpen(false);
              if (window.location.pathname !== '/') window.history.pushState(null, '', '/');
              updateDocumentSEO(ROUTE_SEO.home);
            }}
          />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
