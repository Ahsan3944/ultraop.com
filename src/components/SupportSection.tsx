import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, Sparkles, Youtube, ShieldCheck, Award, Zap, Edit3, Smartphone, ExternalLink, ArrowRight, Tag, Scan, KeyRound, ChevronDown, HelpCircle, Trophy, CreditCard, MessageSquare, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FAQItem {
  id: string;
  category: 'tournaments' | 'payments' | 'perks';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'tournaments',
    question: 'How do I join the Free Fire and Valorant custom tournament rooms?',
    answer: 'Custom room IDs and entry passwords are broadcasted live during official YouTube and Rooter streams, and posted 15 minutes prior in the #custom-rooms channel on our official Discord. For VIP-tier tournaments, slots are reserved for members holding the VIP Pass.',
    highlight: 'Discord & Stream Live Broadcast'
  },
  {
    id: 'faq-2',
    category: 'payments',
    question: 'What happens when I send a UPI contribution with a custom keyword?',
    answer: 'Every payment attached with a keyword (e.g., #BOOYAH, #VIP-PASS, #DIAMONDS) is automatically logged by our live broadcast overlay bot. Your gamer tag and custom message are triggered on-screen with sound effects during the next live stream segment.',
    highlight: 'Instant Live Stream Overlay Alert'
  },
  {
    id: 'faq-3',
    category: 'tournaments',
    question: 'How are tournament prize pools and Free Fire Diamonds distributed?',
    answer: 'Winners receive their Diamond top-ups directly via official UID redemption within 2-4 hours post-tournament. Cash prize pools are disbursed instantly via UPI or bank transfer to the winning squad captain after UID verification.',
    highlight: 'Disbursed Within 2-4 Hours'
  },
  {
    id: 'faq-4',
    category: 'payments',
    question: 'Which UPI payment apps and payment methods are supported?',
    answer: 'Our dynamic QR code and UPI URI work seamlessly across all Indian UPI applications including Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay, and all mobile banking apps. Zero extra convenience fees are charged.',
    highlight: 'Google Pay, PhonePe, Paytm, BHIM & Cred'
  },
  {
    id: 'faq-5',
    category: 'perks',
    question: 'How do I claim my VIP Pass & Discord role after donating?',
    answer: 'Take a quick screenshot of your payment receipt showing the keyword tag (e.g., #VIP-PASS), head over to our official Discord server, and open a ticket in #verify-patron. Our moderation team assigns your custom color role and private channel access within minutes.',
    highlight: 'Instant Discord Verification Ticket'
  },
  {
    id: 'faq-6',
    category: 'payments',
    question: 'Is there a minimum or maximum limit on contributions?',
    answer: 'You can contribute as little as ₹1 or set any custom amount using the number selector. There is no maximum limit, and all funds directly fuel high-spec tournament prize pools, community giveaways, and studio broadcast equipment.',
    highlight: 'Starting from ₹1 to Any Custom Amount'
  },
  {
    id: 'faq-7',
    category: 'payments',
    question: 'What if my payment is deducted but stream alert does not fire?',
    answer: 'Banking servers occasionally delay UPI webhook confirmations by a couple of minutes. If your alert doesn’t show on stream within 5 minutes, share your UPI reference number (UTR) with moderators in the live stream chat or Discord, and we will trigger the on-screen shoutout manually.',
    highlight: 'Manual Streamer Guarantee'
  },
  {
    id: 'faq-8',
    category: 'tournaments',
    question: 'Are tournament custom matches recorded and uploaded as highlights?',
    answer: 'Yes! High-intensity clutch moments, winning squad interviews, and all final circles are recorded in 1080p 60FPS and featured across UltraOP Live YouTube broadcasts and the Short clip ecosystem.',
    highlight: '1080p 60FPS Full Highlight Coverage'
  }
];

interface SupportSectionProps {
  onExploreAllFaqs?: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onExploreAllFaqs }) => {
  const [copiedUpi, setCopiedUpi] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentKeyword, setPaymentKeyword] = useState<string>('BOOYAH');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [showCheer, setShowCheer] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Featured Homepage FAQ State (Only 1-2 featured questions)
  const [openFaqId, setOpenFaqId] = useState<string | null>('featured-1');
  
  // Default official UPI accounts
  const officialUpi = 'ultraopbiz@gmail.com';
  const alternateUpi = 'ultraop001@ybl';
  const [selectedUpi, setSelectedUpi] = useState<string>(officialUpi);

  const activeAmount = customAmount ? Math.max(1, parseInt(customAmount, 10) || 1) : tipAmount;
  const activeKeyword = customKeyword.trim() ? customKeyword.trim().toUpperCase() : paymentKeyword;

  const handleCopyUPI = (upiText: string) => {
    sound.playScore();
    navigator.clipboard?.writeText(upiText);
    setCopiedUpi(upiText);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedUpi(null), 3000);
  };

  const handlePresetTip = (amount: number) => {
    sound.playClick();
    setTipAmount(amount);
    setCustomAmount('');
  };

  const handleKeywordSelect = (kw: string) => {
    sound.playClick();
    setPaymentKeyword(kw);
    setCustomKeyword('');
  };

  const toggleFaq = (id: string) => {
    sound.playClick();
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleNavigateFaq = () => {
    sound.playClick();
    if (onExploreAllFaqs) {
      onExploreAllFaqs();
    } else {
      window.location.hash = '#about-faq';
    }
  };

  // Standard UPI URI format supported by GPay, PhonePe, Paytm, BHIM, Cred, AmazonPay
  const upiUri = `upi://pay?pa=${encodeURIComponent(selectedUpi)}&pn=UltraOP%20Live&am=${activeAmount}&cu=INR&tn=UltraOP%20${encodeURIComponent(activeKeyword)}`;
  
  // Dynamic QR Code generating service
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUri)}&color=121212&bgcolor=ffffff&margin=1`;

  const handleSimulateScan = () => {
    sound.playClick();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      sound.playWin();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setTimeout(() => setScanSuccess(false), 5000);
    }, 1200);
  };

  const handleDirectRedirect = () => {
    sound.playWin();
    setShowCheer(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setShowCheer(false), 4000);
  };

  const popularKeywords = [
    { label: '🔥 BOOYAH', value: 'BOOYAH', desc: 'Stream Victory Alert' },
    { label: '👑 VIP PASS', value: 'VIP-PASS', desc: 'Discord & Custom Rooms' },
    { label: '💎 DIAMOND', value: 'DIAMONDS', desc: 'Subscriber Giveaway Fund' },
    { label: '🎯 HEADSHOT', value: 'HEADSHOT', desc: 'Top Supporter Shoutout' },
    { label: '⚡ CHAT-HERO', value: 'CHAT-HERO', desc: 'Live Broadcast Hero' }
  ];

  const featuredFaqs = [
    {
      id: 'featured-1',
      category: 'About UltraOP & Gaming',
      question: 'Who is UltraOP (Sk Ahsan Ahmad) and what content does he create?',
      answer: 'UltraOP is the gaming identity of Indian creator Sk Ahsan Ahmad. He creates daily Minecraft survival & SMP live streams (@ultraop2), competitive Valorant ranked grinds (@ultraoplive), custom esports tournaments, and interactive web games with over 65M+ views and 650K+ community members.',
      highlight: 'Minecraft Daily Streams, Valorant & 65M+ Lifetime Views'
    },
    {
      id: 'featured-2',
      category: 'UPI & Tournaments',
      question: 'How do custom keyword UPI alerts and tournament room access work?',
      answer: 'Payments with keywords (e.g., #BOOYAH, #VIP-PASS, #DIAMONDS) trigger instant on-screen stream overlay alerts. Room IDs and passwords for Free Fire and Valorant custom tournaments are shared during live streams and inside the VIP Discord channels.',
      highlight: 'Instant Live Stream Alerts & Discord VIP Access'
    }
  ];

  return (
    <section id="support" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        PATRON
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>08 / Direct Patronage & Studio Fund</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            KEYWORD <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              upi payment scanner.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Set your desired contribution amount, pick or enter your payment keyword, and scan the dynamically generated QR code. The set amount is automatically redirected to the official UPI handle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mb-20">
          {/* Left Column: Interactive Payment Setup & Keyword Config */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white border border-black/15 p-6 sm:p-8 shadow-sm relative space-y-6"
          >
            {/* Step 1: Set Amount of Money */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] text-[#121212] font-black uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#121212] text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  Set Amount of Money:
                </label>
                <span className="text-xs font-mono font-black text-[#FF3E00]">
                  Selected: ₹{activeAmount} INR
                </span>
              </div>

              {/* Preset Chips */}
              <div className="grid grid-cols-5 gap-2">
                {[20, 50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handlePresetTip(amt)}
                    className={`py-2.5 font-mono text-xs sm:text-sm font-bold border transition-all ${
                      activeAmount === amt && !customAmount
                        ? 'bg-[#121212] text-white border-black shadow-sm'
                        : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom numerical input */}
              <div className="mt-3 flex items-center bg-[#F4F4F1] border border-black/15 px-3.5 py-2.5 focus-within:border-black transition-colors">
                <span className="text-[#FF3E00] font-mono font-bold mr-2 text-base">₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Or enter any custom amount in INR (e.g. 750)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="bg-transparent text-sm text-[#121212] placeholder-[#888888] focus:outline-none w-full font-mono font-bold"
                />
              </div>
            </div>

            {/* Step 2: Payment Keyword Config */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] text-[#121212] font-black uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FF3E00] text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  Attach Payment Keyword:
                </label>
                <span className="text-xs font-mono font-black text-[#121212] bg-[#F4F4F1] px-2 py-0.5 border border-black/10">
                  Tag: #{activeKeyword}
                </span>
              </div>

              {/* Keyword chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw.value}
                    onClick={() => handleKeywordSelect(kw.value)}
                    className={`p-2.5 text-left border transition-all ${
                      activeKeyword === kw.value && !customKeyword
                        ? 'bg-[#121212] text-white border-black shadow-sm'
                        : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                    }`}
                  >
                    <div className="text-[11px] font-black">{kw.label}</div>
                    <div className={`text-[9px] truncate ${activeKeyword === kw.value && !customKeyword ? 'text-gray-300' : 'text-[#777]'}`}>
                      {kw.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Keyword Input */}
              <div className="mt-2.5 flex items-center bg-[#F4F4F1] border border-black/15 px-3 py-2">
                <Tag className="w-4 h-4 text-[#777] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Or type custom keyword / message tag (e.g. AHSAN-FAN-ROOM)"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="bg-transparent text-xs text-[#121212] placeholder-[#888888] focus:outline-none w-full font-mono font-bold uppercase"
                />
              </div>
            </div>

            {/* Step 3: Official UPI ID Selection */}
            <div className="pt-2 border-t border-black/10">
              <label className="text-[10px] text-[#777] font-black uppercase tracking-wider block mb-2">
                Target UPI ID Destination:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div
                  onClick={() => setSelectedUpi(officialUpi)}
                  className={`p-3 border cursor-pointer transition-all flex items-center justify-between ${
                    selectedUpi === officialUpi
                      ? 'bg-[#121212] text-white border-black'
                      : 'bg-[#F4F4F1] text-[#121212] border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-[9px] font-black uppercase tracking-wider opacity-75">Business Official UPI</div>
                    <div className="font-mono text-xs font-bold truncate">{officialUpi}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUPI(officialUpi);
                    }}
                    className="p-1.5 hover:opacity-80 transition-opacity"
                    title="Copy UPI"
                  >
                    {copiedUpi === officialUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div
                  onClick={() => setSelectedUpi(alternateUpi)}
                  className={`p-3 border cursor-pointer transition-all flex items-center justify-between ${
                    selectedUpi === alternateUpi
                      ? 'bg-[#121212] text-white border-black'
                      : 'bg-[#F4F4F1] text-[#121212] border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-[9px] font-black uppercase tracking-wider opacity-75">Alternate Handle</div>
                    <div className="font-mono text-xs font-bold truncate">{alternateUpi}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUPI(alternateUpi);
                    }}
                    className="p-1.5 hover:opacity-80 transition-opacity"
                    title="Copy UPI"
                  >
                    {copiedUpi === alternateUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Virtual Cheer Modal / Alert */}
            {showCheer && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in z-20 border border-black">
                <Sparkles className="w-14 h-14 text-[#FF3E00] mb-3 animate-spin" />
                <h4 className="text-3xl font-black text-[#121212] mb-2 font-heading tracking-tight">THANK YOU, LEGEND!</h4>
                <p className="text-sm text-[#555555] max-w-sm font-medium">
                  Redirecting with ₹{activeAmount} with Keyword Tag #{activeKeyword} to {selectedUpi}!
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Live Dynamic QR Scanner Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white border border-black/15 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-5"
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-black/10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF3E00] flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5" />
                Live Generated QR
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider border border-emerald-300">
                Ready to Scan
              </span>
            </div>

            {/* QR Code Container with Frame */}
            <div className="relative p-3 bg-white border-2 border-black shadow-md">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center bg-white">
                <img
                  src={qrUrl}
                  alt={`UPI QR for ₹${activeAmount} with keyword ${activeKeyword}`}
                  className="w-full h-full object-contain"
                />

                {/* Laser scan line animation effect when simulating */}
                {isScanning && (
                  <div className="absolute inset-0 bg-red-500/15 animate-pulse flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#FF3E00] shadow-[0_0_8px_#FF3E00] animate-bounce" />
                  </div>
                )}
              </div>

              {/* Amount badge on QR corner */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#121212] text-white px-3 py-1 text-xs font-black font-mono tracking-wider shadow-sm">
                ₹{activeAmount} INR
              </div>
            </div>

            {/* Keyword Banner */}
            <div className="w-full bg-[#F4F4F1] p-3 border border-black/10 space-y-1">
              <div className="text-[9px] text-[#777] font-black uppercase tracking-wider">
                Embedded Note & Keyword:
              </div>
              <div className="font-mono text-xs font-black text-[#121212] break-all">
                "UltraOP {activeKeyword}" → {selectedUpi}
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="w-full space-y-2.5 pt-2">
              <a
                href={upiUri}
                onClick={handleDirectRedirect}
                className="w-full py-4 bg-[#FF3E00] hover:bg-[#121212] text-white font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Pay & Redirect to UPI (₹{activeAmount})</span>
              </a>

              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2.5 bg-[#F4F4F1] hover:bg-white text-[#121212] border border-black/15 font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all"
              >
                <Scan className="w-3.5 h-3.5 text-[#FF3E00]" />
                <span>{isScanning ? 'Scanning Payment Code...' : 'Test Scan Keyword in Browser'}</span>
              </button>
            </div>

            {/* Scan Simulation Success Toast */}
            {scanSuccess && (
              <div className="w-full p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold animate-fade-in flex items-center gap-2 text-left">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  Payment payload verified! ₹{activeAmount} with keyword #{activeKeyword} directed to {selectedUpi}.
                </div>
              </div>
            )}

            <div className="text-[10px] text-[#777] leading-relaxed pt-1">
              Supported by Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay, and all UPI mobile banking apps.
            </div>
          </motion.div>
        </div>

        {/* Featured FAQ & Knowledge Base Card (1-2 Featured Questions) */}
        <motion.div
          id="support-faq"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-black/10"
        >
          {/* FAQ Header with CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div className="text-left max-w-2xl">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#FF3E00]" />
                <span>Featured Creator & Stream FAQ</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#121212] font-heading tracking-tight">
                FREQUENTLY ASKED <span className="font-serif-italic font-normal text-[#FF3E00] lowercase">questions.</span>
              </h3>
              <p className="text-[#666666] text-xs sm:text-sm mt-1.5 font-medium">
                Quick answers on UltraOP, live broadcasts, custom tournaments, and creator identity. Explore our dedicated knowledge base for the complete FAQ suite.
              </p>
            </div>

            <button
              onClick={handleNavigateFaq}
              className="px-5 py-3 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm shrink-0 self-start sm:self-auto"
            >
              <span>View All 16+ FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00] group-hover:text-white" />
            </button>
          </div>

          {/* 2 Featured Accordion Questions */}
          <div className="space-y-3">
            {featuredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const itemNumber = `0${index + 1}`;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`bg-white border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-black shadow-md'
                      : 'border-black/15 hover:border-black/40 shadow-sm'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <span
                        className={`font-serif-italic text-lg sm:text-xl shrink-0 transition-colors ${
                          isOpen ? 'text-[#FF3E00]' : 'text-[#888888]'
                        }`}
                      >
                        {itemNumber}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-[#F4F4F1] border border-black/15 text-[#121212]">
                            {faq.category}
                          </span>
                          {faq.highlight && (
                            <span className="hidden sm:inline-block text-[9px] text-[#777] font-mono">
                              • {faq.highlight}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-[#121212] font-heading tracking-tight leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-none border flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#121212] text-white border-black rotate-180'
                          : 'bg-[#F4F4F1] text-[#121212] border-black/15 hover:bg-black hover:text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </button>

                  {/* Accordion Collapsible Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed border-t border-black/10 bg-[#FAFAF8] space-y-3 font-medium">
                          <p>{faq.answer}</p>
                          {faq.highlight && (
                            <div className="pt-2 flex items-center gap-2 text-[10px] text-[#FF3E00] font-black uppercase tracking-wider">
                              <Sparkles className="w-3 h-3" />
                              <span>Key Takeaway: {faq.highlight}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Prominent CTA Banner: View All FAQs & Learn More About UltraOP */}
          <div className="mt-8 bg-gradient-to-r from-[#121212] to-[#1E1E1E] text-white border-2 border-black p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-left space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FF3E00] text-white text-[9px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Dedicated SEO Knowledge Base</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                Want in-depth answers about UltraOP, Minecraft, and channels?
              </h4>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                Check our official verified biography of Sk Ahsan Ahmad, gaming journey, 5-channel YouTube suite, and complete 16+ topic FAQ directory.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleNavigateFaq}
                className="px-6 py-3.5 bg-[#FF3E00] hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span>View All FAQs</span>
              </button>

              <button
                onClick={handleNavigateFaq}
                className="px-6 py-3.5 bg-transparent hover:bg-white hover:text-black border border-white/30 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <span>Learn More About UltraOP →</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


