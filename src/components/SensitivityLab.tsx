import React, { useState } from 'react';
import { Target, Smartphone, RefreshCw, Copy, Check, Zap, Sparkles, Sliders, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DevicePreset {
  name: string;
  brand: string;
  defaultHz: number;
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  dpi: number;
  buttonSize: number;
  dragTechnique: string;
}

const DEVICE_PRESETS: Record<string, DevicePreset> = {
  'rog-phone': {
    name: 'ASUS ROG Phone 8 / 7 Pro',
    brand: 'ASUS',
    defaultHz: 165,
    general: 94,
    redDot: 86,
    scope2x: 82,
    scope4x: 78,
    sniper: 58,
    freeLook: 70,
    dpi: 460,
    buttonSize: 48,
    dragTechnique: 'Fast Straight J-Drag (Ultra-low touch latency)'
  },
  'iphone-pro': {
    name: 'Apple iPhone 15 / 14 Pro Max',
    brand: 'Apple',
    defaultHz: 120,
    general: 98,
    redDot: 92,
    scope2x: 88,
    scope4x: 84,
    sniper: 62,
    freeLook: 75,
    dpi: 420,
    buttonSize: 52,
    dragTechnique: 'Smooth Curved Upward Drag'
  },
  'oneplus': {
    name: 'OnePlus 12 / 11 5G',
    brand: 'OnePlus',
    defaultHz: 120,
    general: 96,
    redDot: 89,
    scope2x: 85,
    scope4x: 80,
    sniper: 60,
    freeLook: 72,
    dpi: 440,
    buttonSize: 50,
    dragTechnique: 'Fast Diagonal Drag with Quick Gloo'
  },
  'samsung-ultra': {
    name: 'Samsung Galaxy S24 / S23 Ultra',
    brand: 'Samsung',
    defaultHz: 120,
    general: 95,
    redDot: 88,
    scope2x: 84,
    scope4x: 79,
    sniper: 56,
    freeLook: 68,
    dpi: 411,
    buttonSize: 54,
    dragTechnique: 'Linear Vertical Drag with 240Hz touch polling'
  },
  'poco-x6': {
    name: 'POCO X6 Pro / F5 5G',
    brand: 'POCO',
    defaultHz: 120,
    general: 99,
    redDot: 94,
    scope2x: 90,
    scope4x: 86,
    sniper: 65,
    freeLook: 80,
    dpi: 480,
    buttonSize: 46,
    dragTechnique: 'High-speed Snap Drag'
  },
  'redmi-note': {
    name: 'Redmi Note 13 Pro+ / 12 Pro',
    brand: 'Xiaomi',
    defaultHz: 90,
    general: 100,
    redDot: 95,
    scope2x: 92,
    scope4x: 88,
    sniper: 68,
    freeLook: 85,
    dpi: 440,
    buttonSize: 50,
    dragTechnique: 'Wide Arc J-Drag for 90Hz stability'
  },
  'ipad-pro': {
    name: 'Apple iPad Pro M2 (11 / 12.9")',
    brand: 'Apple',
    defaultHz: 120,
    general: 92,
    redDot: 82,
    scope2x: 78,
    scope4x: 74,
    sniper: 50,
    freeLook: 60,
    dpi: 380,
    buttonSize: 60,
    dragTechnique: '4-Finger Claw Precision Flick'
  }
};

export const SensitivityLab: React.FC = () => {
  const [selectedDeviceKey, setSelectedDeviceKey] = useState<string>('rog-phone');
  const [refreshRate, setRefreshRate] = useState<number>(120);
  const [playstyle, setPlaystyle] = useState<'rusher' | 'sniper' | 'balanced'>('balanced');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Interactive drag test state
  const [dragScore, setDragScore] = useState<number | null>(null);
  const [dragRating, setDragRating] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number>(0);

  const currentPreset = DEVICE_PRESETS[selectedDeviceKey] || DEVICE_PRESETS['rog-phone'];

  // Apply playstyle modifiers
  const calculateSensitivity = (base: number) => {
    let modifier = 0;
    if (playstyle === 'rusher') modifier = 2;
    if (playstyle === 'sniper') modifier = -3;
    if (refreshRate === 60) modifier += 3;
    if (refreshRate === 165) modifier -= 2;
    return Math.min(100, Math.max(20, base + modifier));
  };

  const currentSettings = {
    general: calculateSensitivity(currentPreset.general),
    redDot: calculateSensitivity(currentPreset.redDot),
    scope2x: calculateSensitivity(currentPreset.scope2x),
    scope4x: calculateSensitivity(currentPreset.scope4x),
    sniper: calculateSensitivity(currentPreset.sniper),
    freeLook: calculateSensitivity(currentPreset.freeLook),
    dpi: currentPreset.dpi,
    buttonSize: currentPreset.buttonSize
  };

  const handleCopySettings = () => {
    sound.playScore();
    const text = `UltraOP Pro Sensitivity (${currentPreset.name} - ${refreshRate}Hz):\n• General: ${currentSettings.general}\n• Red Dot: ${currentSettings.redDot}\n• 2X Scope: ${currentSettings.scope2x}\n• 4X Scope: ${currentSettings.scope4x}\n• Sniper Scope: ${currentSettings.sniper}\n• Free Look: ${currentSettings.freeLook}\n• DPI: ${currentSettings.dpi}\n• Fire Button: ${currentSettings.buttonSize}%\nTechnique: ${currentPreset.dragTechnique}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  // Drag-shot interactive test handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStartY(clientY);
    setDragScore(null);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    const distance = dragStartY - clientY; // Upward drag distance

    if (distance < 20) {
      setDragScore(42);
      setDragRating('Too Short! Drag higher towards enemy head.');
      sound.playHit();
    } else if (distance >= 50 && distance <= 140) {
      setDragScore(99);
      setDragRating('PERFECT 1-TAP HEADSHOT! 🔥 (UltraOP Pro Timing)');
      sound.playSniper();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else if (distance > 140) {
      setDragScore(74);
      setDragRating('Overshot Crosshair! Reduce drag speed slightly.');
      sound.playClick();
    } else {
      setDragScore(82);
      setDragRating('Upper Chest Hit! Smooth upward flick needed.');
      sound.playHit();
    }
  };

  return (
    <section id="sensitivity-lab" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        AIM LAB
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
            <span>06 / Esports Aim Calibration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            PRO 1-TAP <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              sensitivity lab.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            UltraOP's signature drag-shot DPI & sensitivity calculator. Calibrate your exact phone model, screen refresh rate, and combat playstyle for pinpoint headshots in Free Fire Max.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Device Selector Card */}
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <label className="text-[10px] text-[#777777] font-black uppercase tracking-wider block mb-3">
                Select Your Gaming Hardware
              </label>
              <div className="space-y-2">
                {Object.entries(DEVICE_PRESETS).map(([key, device]) => (
                  <button
                    key={key}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDeviceKey(key);
                      setRefreshRate(device.defaultHz);
                    }}
                    className={`w-full p-3 text-left border flex items-center justify-between transition-all ${
                      selectedDeviceKey === key
                        ? 'bg-[#121212] text-white border-black shadow-sm'
                        : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black font-heading">{device.name}</div>
                      <div className={`text-[10px] ${selectedDeviceKey === key ? 'text-gray-400' : 'text-[#777777]'}`}>
                        {device.brand} • Default {device.defaultHz}Hz
                      </div>
                    </div>
                    {selectedDeviceKey === key && (
                      <span className="w-2 h-2 rounded-full bg-[#FF3E00]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh Rate & Playstyle */}
            <div className="bg-white border border-black/15 p-6 shadow-sm space-y-5">
              <div>
                <label className="text-[10px] text-[#777777] font-black uppercase tracking-wider block mb-2">
                  Display Refresh Rate
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[60, 90, 120, 144, 165].map(hz => (
                    <button
                      key={hz}
                      onClick={() => {
                        sound.playClick();
                        setRefreshRate(hz);
                      }}
                      className={`py-2 text-xs font-black font-mono border transition-all ${
                        refreshRate === hz
                          ? 'bg-[#121212] text-white border-black'
                          : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                      }`}
                    >
                      {hz}Hz
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#777777] font-black uppercase tracking-wider block mb-2">
                  Combat Playstyle Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'rusher', label: 'Aggressive Rusher' },
                    { key: 'balanced', label: 'Balanced Hybrid' },
                    { key: 'sniper', label: 'AWM Sniper' }
                  ].map(style => (
                    <button
                      key={style.key}
                      onClick={() => {
                        sound.playClick();
                        setPlaystyle(style.key as any);
                      }}
                      className={`py-2 px-2 text-[10px] font-black uppercase tracking-wider border transition-all ${
                        playstyle === style.key
                          ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                          : 'bg-[#F4F4F1] hover:bg-white text-[#121212] border-black/10'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Output Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-white border border-black/15 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/10 gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF3E00]">
                    Calculated In-Game Settings
                  </span>
                  <h3 className="text-xl font-black text-[#121212] font-heading">
                    {currentPreset.name} ({refreshRate}Hz Mode)
                  </h3>
                </div>

                <button
                  onClick={handleCopySettings}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#121212] hover:bg-[#FF3E00] text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Settings
                    </>
                  )}
                </button>
              </div>

              {/* Sensitivity Sliders Visual */}
              <div className="space-y-4 mb-6">
                {[
                  { label: 'General Sensitivity (Movement & Drag)', value: currentSettings.general },
                  { label: 'Red Dot Sight (1-Tap Sweet Spot)', value: currentSettings.redDot },
                  { label: '2X Scope Sensitivity', value: currentSettings.scope2x },
                  { label: '4X Scope Sensitivity', value: currentSettings.scope4x },
                  { label: 'AWM Sniper Scope', value: currentSettings.sniper },
                  { label: 'Free Look 360°', value: currentSettings.freeLook }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#333333]">{item.label}</span>
                      <span className="font-mono text-base font-black text-[#121212]">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-[#ECECE8] border border-black/10 overflow-hidden">
                      <div
                        className="h-full bg-[#121212] transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-black/10">
                <div className="p-3 bg-[#F4F4F1] border border-black/10">
                  <div className="text-[10px] text-[#777777] font-black uppercase">Android / iOS DPI</div>
                  <div className="text-xl font-black font-mono text-[#121212] mt-0.5">{currentSettings.dpi} DPI</div>
                </div>
                <div className="p-3 bg-[#F4F4F1] border border-black/10">
                  <div className="text-[10px] text-[#777777] font-black uppercase">Fire Button Size</div>
                  <div className="text-xl font-black font-mono text-[#FF3E00] mt-0.5">{currentSettings.buttonSize}%</div>
                </div>
                <div className="p-3 bg-[#F4F4F1] border border-black/10 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-[#777777] font-black uppercase">Recommended Drag</div>
                  <div className="text-xs font-black text-[#121212] mt-1 leading-tight">{currentPreset.dragTechnique}</div>
                </div>
              </div>
            </div>

            {/* Interactive Drag-Shot Flick Test Sandbox */}
            <div className="bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FF3E00]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#121212]">
                    Interactive Drag-Shot Timing Tester
                  </h4>
                </div>
                <span className="text-[10px] text-[#777777] font-medium">
                  Click and drag UPWARDS rapidly
                </span>
              </div>

              <div
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                className="relative h-28 bg-[#121212] border border-black/20 flex flex-col items-center justify-center cursor-ns-resize select-none overflow-hidden group"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                  <Target className="w-24 h-24 text-white animate-spin" style={{ animationDuration: '20s' }} />
                </div>

                <div className="relative z-10 text-center pointer-events-none">
                  {dragScore !== null ? (
                    <div className="space-y-1">
                      <div className="text-2xl font-black font-mono text-[#FF3E00]">
                        Score: {dragScore}/100
                      </div>
                      <div className="text-xs font-bold text-white max-w-sm px-4">
                        {dragRating}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-white">
                        [ Drag Up Rapidly to Fire 1-Tap ]
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">
                        Tests upward touch velocity & crosshair lift
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
