import React from 'react';

interface UltraLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const UltraLogo: React.FC<UltraLogoProps> = ({
  className = 'w-10 h-10',
  size,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className="relative shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#2A1B14] to-[#121212] border-2 border-[#FF3E00] shadow-sm"
        style={size ? { width: size, height: size } : undefined}
      >
        {/* Crisp Vector Gamer Avatar of Ahsan / UltraOP */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="50%" stopColor="#FF3E00" />
              <stop offset="100%" stopColor="#B32B00" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFDFCB" />
              <stop offset="100%" stopColor="#F5C0A0" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1E24" />
              <stop offset="100%" stopColor="#0B0B0E" />
            </linearGradient>
          </defs>

          {/* Headband of Headset */}
          <path
            d="M 45 90 A 60 60 0 0 1 155 90"
            fill="none"
            stroke="#222222"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 50 86 A 55 55 0 0 1 150 86"
            fill="none"
            stroke="url(#headphoneGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Head/Face shape */}
          <ellipse cx="100" cy="105" rx="42" ry="46" fill="url(#skinGrad)" />

          {/* Hair */}
          <path
            d="M 60 92 C 55 60, 90 40, 130 50 C 145 54, 150 75, 142 90 C 136 82, 126 78, 115 82 C 105 76, 92 78, 85 86 C 75 84, 68 88, 60 92 Z"
            fill="url(#hairGrad)"
          />
          {/* Hair highlight */}
          <path
            d="M 85 52 Q 105 48 125 56"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Ears */}
          <ellipse cx="58" cy="108" rx="8" ry="12" fill="#F5C0A0" />
          <ellipse cx="142" cy="108" rx="8" ry="12" fill="#F5C0A0" />

          {/* Eyebrows */}
          <path d="M 72 90 Q 86 84 94 90" fill="none" stroke="#121212" strokeWidth="5" strokeLinecap="round" />
          <path d="M 106 90 Q 114 84 128 90" fill="none" stroke="#121212" strokeWidth="5" strokeLinecap="round" />

          {/* Glasses Frame */}
          <rect x="68" y="93" width="28" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.8" stroke="#121212" strokeWidth="4" />
          <rect x="104" y="93" width="28" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.8" stroke="#121212" strokeWidth="4" />
          {/* Bridge */}
          <line x1="96" y1="102" x2="104" y2="102" stroke="#121212" strokeWidth="4" />
          {/* Glasses arms */}
          <line x1="68" y1="100" x2="52" y2="98" stroke="#121212" strokeWidth="4" />
          <line x1="132" y1="100" x2="148" y2="98" stroke="#121212" strokeWidth="4" />

          {/* Eyes behind glasses */}
          <ellipse cx="82" cy="102" rx="4" ry="5" fill="#121212" />
          <ellipse cx="118" cy="102" rx="4" ry="5" fill="#121212" />
          <circle cx="80.5" cy="100" r="1.5" fill="#FFFFFF" />
          <circle cx="116.5" cy="100" r="1.5" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M 98 107 Q 100 115 104 116 Q 96 117 96 116" fill="#D98A6A" />

          {/* Beard & Mustache */}
          {/* Mustache */}
          <path
            d="M 82 120 Q 100 126 118 120 Q 108 124 100 123 Q 92 124 82 120 Z"
            fill="#121212"
          />
          {/* Mouth open smile */}
          <path
            d="M 85 125 Q 100 148 115 125 Z"
            fill="#8B0000"
          />
          {/* Teeth */}
          <path
            d="M 87 125 Q 100 131 113 125 Z"
            fill="#FFFFFF"
          />
          {/* Tongue */}
          <ellipse cx="100" cy="136" rx="9" ry="5" fill="#FF3E00" />

          {/* Full Beard Outline */}
          <path
            d="M 64 105 C 64 148, 80 162, 100 162 C 120 162, 136 148, 136 105 C 130 116, 126 128, 118 134 C 114 146, 86 146, 82 134 C 74 128, 70 116, 64 105 Z"
            fill="#121212"
          />
          {/* Soul patch */}
          <polygon points="97,140 103,140 100,146" fill="#121212" />

          {/* Big Orange Gaming Earcups */}
          {/* Left Earcup */}
          <rect x="36" y="85" width="20" height="38" rx="8" fill="#1A1A1A" stroke="url(#headphoneGrad)" strokeWidth="3" />
          <ellipse cx="46" cy="104" rx="5" ry="11" fill="url(#headphoneGrad)" />

          {/* Right Earcup */}
          <rect x="144" y="85" width="20" height="38" rx="8" fill="#1A1A1A" stroke="url(#headphoneGrad)" strokeWidth="3" />
          <ellipse cx="154" cy="104" rx="5" ry="11" fill="url(#headphoneGrad)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-black text-xl tracking-tighter text-[#121212] leading-none">
            ULTRA<span className="text-[#FF3E00]">OP</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.25em] text-[#666666] font-black mt-0.5">
            Official Gaming Hub
          </span>
        </div>
      )}
    </div>
  );
};
