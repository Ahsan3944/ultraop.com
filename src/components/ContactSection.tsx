import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, PhoneCall, Sparkles, Instagram, Video, Zap, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import { CREATOR_PROFILE } from '../data/gamingData';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Livestream Sponsorship (YouTube / Twitch / Kick)',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('Please provide a valid name or brand name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setErrorMessage('Please provide some project details or campaign specifications (at least 10 characters).');
      return;
    }

    sound.playScore();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }, 600);
  };

  const mailtoUrl = `mailto:${CREATOR_PROFILE.businessEmail}?subject=${encodeURIComponent(
    `[Collaboration] ${formData.subject} - ${formData.name || 'Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name/Brand: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.subject}\nEstimated Budget: ${formData.budget}\n\nProject Details:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#ECECE8] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        CONNECT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>09 / Studio Inquiries & Partnerships</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            CONNECT <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              with ultraop.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Interested in tournament live stream sponsorships, gaming hardware showcases, or multi-platform brand campaigns? Get in touch directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl items-start">
          {/* Contact Direct Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#121212] text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#121212] font-heading tracking-tight">Official Business Email</h4>
                  <p className="text-[11px] text-[#777777] font-medium">Brand, Sponsorship & Booking Inquiries</p>
                </div>
              </div>
              <a
                href={`mailto:${CREATOR_PROFILE.businessEmail}`}
                className="text-[#FF3E00] hover:text-[#121212] text-sm font-mono font-black block pt-1 transition-colors"
              >
                {CREATOR_PROFILE.businessEmail}
              </a>
            </div>

            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#121212] text-white">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#121212] font-heading tracking-tight">Direct Instagram</h4>
                  <p className="text-[11px] text-[#777777] font-medium">Fast Direct Response</p>
                </div>
              </div>
              <a
                href={CREATOR_PROFILE.instagramMainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] hover:text-[#FF3E00] text-sm font-mono font-bold block pt-1 transition-colors"
              >
                @ultraopp
              </a>
            </div>

            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#121212] text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#121212] font-heading tracking-tight">Discord Headquarters</h4>
                  <p className="text-[11px] text-[#777777] font-medium">Community & Tournament Desk</p>
                </div>
              </div>
              <a
                href={CREATOR_PROFILE.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] hover:text-[#FF3E00] text-sm font-mono font-bold block pt-1 transition-colors"
              >
                discord.gg/ZQ2afmPvuP
              </a>
            </div>
          </motion.div>

          {/* Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white border border-black/15 p-6 sm:p-8 shadow-sm"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[#121212] font-heading tracking-tight">Message Received!</h3>
                <p className="text-sm text-[#555555] max-w-sm mx-auto leading-relaxed font-medium">
                  Thank you for reaching out. The UltraOP management team will review your campaign details and reply to your email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[#121212] text-white hover:bg-[#FF3E00] font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-fade-in flex items-center justify-between">
                    <span>{errorMessage}</span>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-red-900 font-bold ml-2 hover:underline"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-[10px] text-[#555555] font-black uppercase tracking-wider block mb-1.5">
                      Your Name / Brand *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. Acer Predator / RedBull / Aditya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-black/15 px-4 py-3 text-sm text-[#121212] placeholder-[#777777] focus:outline-none focus:border-black transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[10px] text-[#555555] font-black uppercase tracking-wider block mb-1.5">
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={120}
                      placeholder="contact@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-black/15 px-4 py-3 text-sm text-[#121212] placeholder-[#777777] focus:outline-none focus:border-black transition-colors font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-category" className="text-[10px] text-[#555555] font-black uppercase tracking-wider block mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-category"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-black/15 px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-black transition-colors font-medium"
                    >
                      <option>Livestream Sponsorship (YouTube / Twitch / Kick)</option>
                      <option>Product / Gear Review & Battle Station Showcase</option>
                      <option>Custom Room Tournament Partnership</option>
                      <option>Creator Collaboration</option>
                      <option>General Question</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="text-[10px] text-[#555555] font-black uppercase tracking-wider block mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-black/15 px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-black transition-colors font-medium"
                    >
                      <option>₹10,000 - ₹25,000</option>
                      <option>₹25,000 - ₹50,000</option>
                      <option>₹50,000 - ₹1,00,000</option>
                      <option>₹1,00,000+ (Custom Tourney)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-message" className="text-[10px] text-[#555555] font-black uppercase tracking-wider block">
                      Proposal Details / Campaign Brief *
                    </label>
                    <span className="text-[10px] text-[#777777] font-mono">
                      {formData.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell us about the project goals, dates, deliverables or tournament specs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F4F4F1] border border-black/15 px-4 py-3 text-sm text-[#121212] placeholder-[#777777] focus:outline-none focus:border-black transition-colors resize-none font-medium"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Transmitting Brief...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        SUBMIT PROPOSAL BRIEF
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoUrl}
                    className="px-5 py-4 bg-[#F4F4F1] hover:bg-[#EAEAE6] text-[#121212] border border-black/15 font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                    title="Open directly in your mail app"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Open in Email App</span>
                  </a>
                </div>

                <p className="text-[11px] text-[#777777] leading-relaxed pt-1 text-center font-medium">
                  🔒 Information provided is transmitted directly to <span className="font-bold text-black font-mono">ultraopbiz@gmail.com</span> for the purpose of reviewing your inquiry. We never share or sell contact data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


