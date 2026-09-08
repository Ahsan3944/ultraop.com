import React, { useState, useEffect } from 'react';
import { Shield, FileText, AlertCircle, X, CheckCircle2, Lock, Eye, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative text-left">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-black/10 flex items-center justify-between bg-[#F4F4F1]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#FF3E00]" />
            <h2 id="legal-modal-title" className="text-xl font-black text-[#121212] font-heading uppercase tracking-tight">
              Legal, Privacy & Disclaimers
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close legal modal"
            className="p-2 bg-[#121212] text-white hover:bg-[#FF3E00] text-xs font-black uppercase transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-black/10 bg-white px-5 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('privacy');
            }}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[#FF3E00] text-[#FF3E00]'
                : 'border-transparent text-[#777777] hover:text-black'
            }`}
          >
            Privacy Policy
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('terms');
            }}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#FF3E00] text-[#FF3E00]'
                : 'border-transparent text-[#777777] hover:text-black'
            }`}
          >
            Terms of Use
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('disclaimer');
            }}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'disclaimer'
                ? 'border-[#FF3E00] text-[#FF3E00]'
                : 'border-transparent text-[#777777] hover:text-black'
            }`}
          >
            Trademarks & Disclaimers
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#444444] leading-relaxed font-medium">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5 rounded-none">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Clear Creator Transparency:</strong> This website is an independent creator portfolio and interactive gaming portal operated by Sk Ahsan Ahmad (UltraOP). We respect your privacy and do not sell or monetize personal data.
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  1. Information We Collect
                </h3>
                <p>
                  • <strong>Browser Storage (Local Storage):</strong> We store client-side preferences such as arcade mini-game high scores (e.g. Aim Trainer, Space Shooter, Cyber Snake) and theme/sound preferences locally on your browser. This data never leaves your device.
                </p>
                <p className="mt-1">
                  • <strong>Contact Inquiries:</strong> When you submit a sponsorship proposal, message, or email inquiry via our contact form or direct email, your name, email address, and message content are transmitted to our official business inbox (<code className="bg-[#EAEAE6] px-1 py-0.5 font-bold text-black">ultraopbiz@gmail.com</code>) strictly to respond to your inquiry.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  2. Third-Party Services & Links
                </h3>
                <p>
                  This website includes links to external third-party platforms (YouTube, Twitch, Kick, Instagram, Discord, Rooter). When you visit those platforms or interact with their external media, their respective privacy policies and terms apply.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  3. Cookies & Analytics
                </h3>
                <p>
                  This website does not deploy third-party advertising tracking cookies or behavioral tracking pixels. Basic server logs may be generated by the cloud hosting platform (e.g. Cloud Run / reverse proxy) for uptime, security monitoring, and traffic routing.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  4. Contact For Privacy Matters
                </h3>
                <p>
                  For any privacy inquiries, data deletion requests, or questions regarding this website, contact <a href="mailto:ultraopbiz@gmail.com" className="text-[#FF3E00] font-bold hover:underline">ultraopbiz@gmail.com</a>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#F4F4F1] border border-black/10 text-[#121212] flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#FF3E00] shrink-0 mt-0.5" />
                <div>
                  <strong>Website Terms of Use:</strong> By accessing and playing on the UltraOP website, you agree to these standard terms for personal and non-commercial entertainment use.
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  1. Non-Commercial Entertainment
                </h3>
                <p>
                  The interactive mini-games, soundboard, video guides, sensitivity calculators, and media on this website are provided for personal entertainment and community enjoyment. Automated scraping or unauthorized redistribution of custom game code is prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  2. Community Guidelines
                </h3>
                <p>
                  When participating in community events, Discord discussions, custom room tournaments, or live stream interactions, all players are expected to maintain fair play, respect fellow community members, and avoid hateful conduct.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  3. Support & Contributions
                </h3>
                <p>
                  Direct patronage or UPI contributions through the keyword scanner are voluntary gestures from fans and community supporters to fund stream giveaways, tournaments, and studio production.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Trademarks & Collaboration Notice:</strong> All game titles, registered trademarks, and third-party brand logos referenced on this site belong to their respective owners.
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  1. Gaming Trademarks
                </h3>
                <p>
                  • <strong>Minecraft</strong> is a registered trademark of Mojang Synergies AB / Microsoft Corporation.<br />
                  • <strong>Valorant</strong> is a registered trademark of Riot Games, Inc.<br />
                  • <strong>Free Fire</strong> is a registered trademark of Garena Online Private Limited.<br />
                  • <strong>Grand Theft Auto V</strong> is a registered trademark of Take-Two Interactive / Rockstar Games.
                </p>
                <p className="mt-1 text-[#666]">
                  UltraOP is an independent gaming content creator and is not officially affiliated with, endorsed by, or sponsored by these game publishers unless explicitly noted in a sponsored broadcast.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-black text-sm text-[#121212] mb-1 uppercase tracking-wide">
                  2. Brand Collaborations & Campaigns
                </h3>
                <p>
                  Brand names and campaign logos featured in the "Brands & Campaigns I've Worked With" section represent past or verified commercial sponsorships, creator integrations, or promotional campaigns executed by UltraOP. They do not imply permanent corporate endorsement or brand ownership.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F4F1] border-t border-black/10 flex items-center justify-between text-[11px] text-[#777]">
          <span>© {new Date().getFullYear()} UltraOP • All rights reserved.</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-[#121212] hover:bg-[#FF3E00] text-white font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
