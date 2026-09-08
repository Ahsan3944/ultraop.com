/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Scalable High-Fidelity Brand Logos
 * Optimized vector SVGs matching authentic brand marks with full theme adaptability.
 */

import React from 'react';

interface BrandLogoProps {
  logoKey: 'parallel' | 'wildstone' | 'amazon' | 'hero' | 'thefinals' | 'tvs' | 'ecricket';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ logoKey, className = 'h-9 w-auto' }) => {
  switch (logoKey) {
    case 'amazon':
      return (
        <svg
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="Amazon brand mark"
        >
          {/* amazon text */}
          <text
            x="8"
            y="30"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="28"
            letterSpacing="-0.8px"
          >
            amazon
          </text>
          {/* iconic smile curve */}
          <path
            d="M 12 37 C 50 50, 110 50, 142 36"
            stroke="#FF9900"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* smile arrow head */}
          <path
            d="M 136 34 L 146 37 L 140 46 Z"
            fill="#FF9900"
          />
        </svg>
      );

    case 'thefinals':
      return (
        <svg
          viewBox="0 0 170 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="THE FINALS game logo"
        >
          {/* Red angular accent badge */}
          <path
            d="M 6 8 L 22 8 L 16 40 L 0 40 Z"
            fill="#FF3E00"
          />
          <path
            d="M 18 8 L 24 8 L 18 40 L 12 40 Z"
            fill="currentColor"
            opacity="0.18"
          />
          {/* THE FINALS text in heavy display typography */}
          <text
            x="30"
            y="32"
            fill="currentColor"
            fontFamily="'Syne', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="1px"
          >
            THE FINALS
          </text>
          {/* Yellow micro target dot */}
          <circle cx="162" cy="18" r="3" fill="#FFC700" />
        </svg>
      );

    case 'wildstone':
      return (
        <svg
          viewBox="0 0 175 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="Wild Stone logo"
        >
          {/* Wild Stone stylized emblem */}
          <rect x="6" y="10" width="22" height="28" rx="2" fill="currentColor" />
          <path d="M 12 16 L 17 28 L 22 16" stroke="#FF3E00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* WILD STONE lettering */}
          <text
            x="36"
            y="26"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="16"
            letterSpacing="2.5px"
          >
            WILD STONE
          </text>
          <text
            x="36"
            y="37"
            fill="#888888"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="7.5"
            letterSpacing="3.5px"
          >
            MALE GROOMING
          </text>
        </svg>
      );

    case 'hero':
      return (
        <svg
          viewBox="0 0 150 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="Hero MotoCorp logo"
        >
          {/* Hero Red Cube Mark */}
          <path
            d="M 6 12 L 20 6 L 30 18 L 16 24 Z"
            fill="#E50914"
          />
          <path
            d="M 16 24 L 30 18 L 30 36 L 16 42 Z"
            fill="#B8000B"
          />
          <path
            d="M 6 12 L 16 24 L 16 42 L 6 30 Z"
            fill="#FF2E3B"
          />
          {/* Hero text */}
          <text
            x="38"
            y="32"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="-0.5px"
          >
            Hero
          </text>
        </svg>
      );

    case 'parallel':
      return (
        <svg
          viewBox="0 0 170 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="Parallel Mobile logo"
        >
          {/* Parallel geometric bars */}
          <rect x="6" y="8" width="6" height="32" rx="1.5" fill="currentColor" />
          <rect x="16" y="8" width="6" height="32" rx="1.5" fill="#FF3E00" />
          {/* Parallel Mobile typography */}
          <text
            x="30"
            y="26"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="17"
            letterSpacing="0.8px"
          >
            PARALLEL
          </text>
          <text
            x="31"
            y="37"
            fill="#888888"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="8.5"
            letterSpacing="2.5px"
          >
            MOBILE
          </text>
        </svg>
      );

    case 'tvs':
      return (
        <svg
          viewBox="0 0 150 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="TVS Motor logo"
        >
          {/* TVS Red Galloping Stallion Silhouette */}
          <path
            d="M 6 26 C 10 18, 18 12, 28 10 C 26 14, 28 18, 32 18 C 28 22, 24 28, 16 34 L 10 38 L 12 30 Z"
            fill="#D92228"
          />
          {/* TVS text */}
          <text
            x="38"
            y="32"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="1px"
          >
            TVS
          </text>
        </svg>
      );

    case 'ecricket':
    default:
      return (
        <svg
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-[#121212] dark:text-[#F4F4F1] transition-colors`}
          role="img"
          aria-label="E-Cricket logo"
        >
          <circle cx="18" cy="24" r="14" fill="currentColor" />
          <path d="M 12 24 L 24 24 M 18 18 L 18 30" stroke="#FF3E00" strokeWidth="2" strokeLinecap="round" />
          <text
            x="40"
            y="30"
            fill="currentColor"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="18"
            letterSpacing="0.5px"
          >
            E-CRICKET
          </text>
        </svg>
      );
  }
};
