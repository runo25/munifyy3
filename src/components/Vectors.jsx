import React from "react";

/**
 * Munify Precision Vector & Asset Suite
 * Exact SVGs and photorealistic digital assets matching Munify UI templates.
 */

// Munify Wordmark Logo
export function MunifyLogo({ className = "w-24 h-6", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="0"
        y="24"
        fill={color}
        fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.5px"
      >
        Munify
      </text>
    </svg>
  );
}

// Base Network Logo (Official blue circle with white accent)
export function BaseLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#0052FF" />
      <path d="M7 16H25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Authentic USDC Token Icon
export function UsdcIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <circle cx="16" cy="16" r="12" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
      <path
        d="M17.5 10.5C15.5 10.5 14 11.5 14 13C14 16 20 15 20 18C20 19.5 18.5 20.5 16.5 20.5C14.5 20.5 13.2 19.5 13 18M16.5 8.5V10.5M16.5 20.5V22.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Polygon 3D Token Graphic
export function PolygonCoin({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="polyGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="35%" stopColor="#9333ea" />
          <stop offset="75%" stopColor="#6b21a8" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>
        <radialGradient id="polyRim" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#a855f7" />
          <stop offset="98%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <filter id="polyShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#7e22ce" floodOpacity="0.5" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#polyRim)" filter="url(#polyShadow)" />
      <circle cx="50" cy="50" r="41" fill="url(#polyGrad)" stroke="#e9d5ff" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Specular ring highlight */}
      <ellipse cx="44" cy="32" rx="28" ry="16" fill="#ffffff" fillOpacity="0.18" />
      {/* Polygon geometric symbol */}
      <path
        d="M40 37.5L50 31.5L60 37.5V49.5L50 55.5L40 49.5V37.5Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="31.5" r="3.5" fill="#ffffff" />
      <circle cx="60" cy="37.5" r="3.5" fill="#ffffff" />
      <circle cx="60" cy="49.5" r="3.5" fill="#ffffff" />
      <circle cx="50" cy="55.5" r="3.5" fill="#ffffff" />
      <circle cx="40" cy="49.5" r="3.5" fill="#ffffff" />
      <circle cx="40" cy="37.5" r="3.5" fill="#ffffff" />
    </svg>
  );
}

// Base 3D Token Graphic
export function BaseCoin({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="baseGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="35%" stopColor="#2563eb" />
          <stop offset="75%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id="baseRim" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#3b82f6" />
          <stop offset="98%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#172554" />
        </radialGradient>
        <filter id="baseShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1d4ed8" floodOpacity="0.5" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#baseRim)" filter="url(#baseShadow)" />
      <circle cx="50" cy="50" r="41" fill="url(#baseGrad)" stroke="#bfdbfe" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Specular highlight */}
      <ellipse cx="44" cy="32" rx="28" ry="16" fill="#ffffff" fillOpacity="0.2" />
      {/* Inner white circle with blue cutout */}
      <circle cx="50" cy="50" r="22" fill="#ffffff" />
      <rect x="42" y="42" width="16" height="16" rx="3" fill="#0052FF" />
    </svg>
  );
}

// Orbiting Bridge Graphic (Polygon & Base with curved arrows)
export function BridgeOrbitGraphic({ className = "w-48 h-36" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Purple Polygon coin top-left */}
      <div className="absolute top-0 left-6 z-10 transform -rotate-6 hover:scale-105 transition-transform duration-300">
        <PolygonCoin className="w-20 h-20 drop-shadow-[0_12px_24px_rgba(147,51,234,0.45)]" />
      </div>

      {/* Orbiting grey curved arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 150" fill="none">
        {/* Top curved arrow going clockwise to Base */}
        <path
          d="M 95 35 C 135 25, 155 45, 145 75"
          stroke="#4b5563"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <polygon points="146,75 140,65 152,69" fill="#9ca3af" />

        {/* Bottom curved arrow going counter-clockwise to Polygon */}
        <path
          d="M 125 115 C 85 125, 60 105, 68 75"
          stroke="#4b5563"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <polygon points="67,75 73,85 61,81" fill="#9ca3af" />
      </svg>

      {/* Blue Base coin bottom-right */}
      <div className="absolute bottom-0 right-6 z-10 transform rotate-6 hover:scale-105 transition-transform duration-300">
        <BaseCoin className="w-20 h-20 drop-shadow-[0_12px_24px_rgba(37,99,235,0.45)]" />
      </div>
    </div>
  );
}

// European Union Flag Pill / Badge
export function FlagEU({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`rounded-full overflow-hidden ${className}`}>
      <rect width="24" height="24" fill="#003399" />
      <g fill="#FFCC00" transform="translate(12, 12)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 7 * Math.sin(rad);
          const y = -7 * Math.cos(rad);
          return <circle key={deg} cx={x} cy={y} r="0.9" />;
        })}
      </g>
    </svg>
  );
}

// USA Flag Pill / Badge
export function FlagUS({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`rounded-full overflow-hidden ${className}`}>
      <rect width="24" height="24" fill="#b91c1c" />
      <path d="M0 3h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z" fill="#ffffff" />
      <rect width="11" height="12" fill="#1e3a8a" />
      <circle cx="3" cy="3" r="0.8" fill="#ffffff" />
      <circle cx="7" cy="3" r="0.8" fill="#ffffff" />
      <circle cx="5" cy="6" r="0.8" fill="#ffffff" />
      <circle cx="3" cy="9" r="0.8" fill="#ffffff" />
      <circle cx="7" cy="9" r="0.8" fill="#ffffff" />
    </svg>
  );
}

// Philippines Flag Circular Badge
export function FlagPhilippines({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 48 48" className={`rounded-full shadow-md overflow-hidden ${className}`}>
      {/* Top half blue */}
      <rect width="48" height="24" fill="#0038A8" />
      {/* Bottom half red */}
      <rect y="24" width="48" height="24" fill="#CE1126" />
      {/* White chevron triangle */}
      <polygon points="0,0 26,24 0,48" fill="#FFFFFF" />
      {/* Golden yellow sun */}
      <circle cx="9" cy="24" r="4.5" fill="#FCD116" />
      {/* 3 yellow stars */}
      <circle cx="4" cy="7" r="1.3" fill="#FCD116" />
      <circle cx="4" cy="41" r="1.3" fill="#FCD116" />
      <circle cx="20" cy="24" r="1.3" fill="#FCD116" />
    </svg>
  );
}

// Official Visa Wordmark SVG
export function VisaLogo({ className = "w-12 h-4", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M48.2 3.2L31.6 38.6H21.2L13.1 9.8C12.6 7.8 12.1 7.1 10.4 6.1C7.6 4.6 3.6 3.3 0 2.5L0.5 0.5H18.8C21.2 0.5 23.3 2.1 23.8 4.9L28.3 26.6L39.8 0.5H48.2V3.2ZM91.4 25.8C91.5 16.5 78.4 16 78.6 11.6C78.7 10.2 80 8.7 82.8 8.3C84.2 8.1 88 7.9 91.9 9.7L93.5 2.1C91.3 1.3 88.4 0.5 84.7 0.5C74.4 0.5 67.2 6 67 13.8C66.8 19.6 72 22.8 76 24.8C80.1 26.8 81.5 28.1 81.5 29.9C81.4 32.7 78.1 33.9 75.1 34C69.8 34.1 66.8 32.5 64.3 31.4L62.7 39.1C65.1 40.2 69.5 41.1 74.1 41.2C84.9 41.2 91.4 35.8 91.4 25.8ZM119.7 38.6H127.8L120.7 0.5H113.8C111.9 0.5 110.3 1.6 109.6 3.3L93.7 38.6H104.9L107.1 32.4H120.8L119.7 38.6ZM110.2 24.1L114.7 11.8L117.3 24.1H110.2ZM65.8 0.5L57.5 38.6H46.8L55.1 0.5H65.8Z"
        fill={color}
      />
    </svg>
  );
}

// Potted Plant Icon (Daily Earnings on Home)
export function PottedPlantIcon({ className = "w-6 h-6", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Leaves */}
      <path
        d="M12 12C12 7.5 8 6 7 6C7 10 9.5 12 12 12Z"
        fill={color}
      />
      <path
        d="M12 12C12 7.5 16 6 17 6C17 10 14.5 12 12 12Z"
        fill={color}
      />
      <path
        d="M12 14V11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Flower Pot */}
      <path
        d="M7 14H17L15.5 20H8.5L7 14Z"
        fill={color}
      />
      <rect x="6.5" y="13" width="11" height="2" rx="1" fill={color} />
    </svg>
  );
}

// 3D Plant in Frosted Glass Pot (Earn Tab Hero Artwork)
export function Plant3DIllustration({ className = "w-36 h-40" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_16px_32px_rgba(105,234,100,0.2)]">
        <defs>
          {/* Leaf 1 Vibrant Green Gradient */}
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#99f67a" />
            <stop offset="60%" stopColor="#55e04d" />
            <stop offset="100%" stopColor="#22a829" />
          </linearGradient>
          {/* Leaf 2 Radiant Lime Gradient */}
          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3ff85" />
            <stop offset="70%" stopColor="#5ce650" />
            <stop offset="100%" stopColor="#1f9e29" />
          </linearGradient>
          {/* Frosted Glass Pot Gradient */}
          <linearGradient id="glassGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.7" />
          </linearGradient>
          {/* Soil / Water Level in Pot */}
          <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Small floating seed/drop above */}
        <ellipse cx="68" cy="28" rx="2.5" ry="3.5" fill="#5ce650" transform="rotate(-15 68 28)" />

        {/* Left Leaf (organic curved kidney shape) */}
        <path
          d="M 60 70 C 45 45, 30 50, 40 38 C 55 24, 78 30, 75 50 C 72 65, 66 70, 60 70 Z"
          fill="url(#leafGrad1)"
        />
        {/* Left Leaf Stem */}
        <path
          d="M 72 105 C 70 85, 64 70, 62 60"
          stroke="#166534"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Right Leaf (rounded organic fan shape) */}
        <path
          d="M 95 62 C 105 40, 125 42, 120 54 C 115 68, 92 78, 85 70 C 80 65, 88 55, 95 62 Z"
          fill="url(#leafGrad2)"
        />
        {/* Right Leaf Stem */}
        <path
          d="M 86 105 C 88 88, 92 74, 94 65"
          stroke="#15803d"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Center Stem */}
        <path
          d="M 80 115 L 76 60"
          stroke="#14532d"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Frosted Glass Bulbous Pot Body */}
        <path
          d="M 62 108 C 50 116, 48 138, 58 148 C 68 156, 92 156, 102 148 C 112 138, 110 116, 98 108 Z"
          fill="url(#glassGrad)"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />

        {/* Water / Medium Line */}
        <path
          d="M 54 134 C 65 140, 95 140, 106 134 C 104 144, 98 152, 80 152 C 62 152, 56 144, 54 134 Z"
          fill="url(#soilGrad)"
        />

        {/* Specular highlight on glass */}
        <ellipse cx="64" cy="126" rx="4" ry="10" fill="#ffffff" fillOpacity="0.7" transform="rotate(-20 64 126)" />
      </svg>
    </div>
  );
}

// Munify Virtual Card Mockup
export function MunifyVirtualCardGraphic({ className = "w-full" }) {
  return (
    <div className={`relative aspect-[1.58/1] rounded-[24px] bg-[#0c0d0c] border border-[#69ea64]/70 p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(105,234,100,0.18)] ${className}`}>
      {/* Ambient subtle neon green corner aura */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#69ea64]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#69ea64]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Munify Logo */}
      <div className="flex items-center justify-between z-10">
        <span className="text-white text-xl font-bold tracking-tight">Munify</span>
      </div>

      {/* Bottom Visa Logo */}
      <div className="flex items-center justify-end z-10">
        <VisaLogo className="w-14 h-5" color="#ffffff" />
      </div>
    </div>
  );
}

// Munify Promo Card Peek (for Carousel Slide 1 on Home)
export function MunifyPromoCardPeek({ className = "w-28 h-28" }) {
  return (
    <div className={`relative overflow-hidden rounded-l-[18px] bg-gradient-to-br from-[#103a19] via-[#09220f] to-[#041107] border-l border-t border-b border-[#69ea64]/30 shadow-xl flex items-center justify-center p-3 ${className}`}>
      <span className="text-white text-base font-bold tracking-tight transform -rotate-3">Munify</span>
    </div>
  );
}

// General UI Icon Library
export function IconHouse({ className = "w-5 h-5", active = false }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} className={className}>
      <path d="M12 2.5L2 11h3v10h6v-6h2v6h6V11h3L12 2.5z" />
    </svg>
  );
}

export function IconCard({ className = "w-5 h-5", active = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.4" : "2"} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  );
}

export function IconLeaf({ className = "w-5 h-5", active = false }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "2"} className={className}>
      <path d="M19.5 4.5c-4.5 0-9 2-11.5 5.5-2.5 3.5-3.5 8-3.5 9.5 1.5 0 6-1 9.5-3.5 3.5-2.5 5.5-7 5.5-11.5z" />
      <path d="M8 16c2-2 5-5 8-7" stroke={active ? "#131513" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPayments({ className = "w-5 h-5", active = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.6" : "2"} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 7H5" />
      <path d="M9 3L5 7l4 4" />
      <path d="M5 17h14" />
      <path d="M15 13l4 4-4 4" />
    </svg>
  );
}

export function IconGift({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M20 7h-2.1a3.5 3.5 0 0 0-5.9-2.5L12 5.5l-.9-1A3.5 3.5 0 0 0 5.1 7H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-9-2.5a1.5 1.5 0 0 1 2.3 1.9L12.5 7H9.7a1.5 1.5 0 0 1 1.3-2.5zm-3.5.5a1.5 1.5 0 0 1 1.5 1.5V7H6.7a1.5 1.5 0 0 1 .8-1.5zM11 20H6v-8h5v8zm2 0v-8h5v8h-5z" />
    </svg>
  );
}

export function IconArrowUpRight({ className = "w-5 h-5", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function IconArrowDownLeft({ className = "w-5 h-5", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="17" y1="7" x2="7" y2="17" />
      <polyline points="17 17 7 17 7 7" />
    </svg>
  );
}

export function IconClockOrange({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IconPlus({ className = "w-5 h-5", color = "#69ea64" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconBridgeCycle({ className = "w-5 h-5", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l6.73-1.19" />
    </svg>
  );
}

export function IconCopy({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5", color = "#ffffff" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconCheck({ className = "w-3 h-3", color = "#000000" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ==================== NEW EXACT SCREENSHOT VECTOR SUITE ====================

// Top Header: Gear / Settings
export function IconGear({ className = "w-6 h-6", color = "#1F2937" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Top Header: QR Scanner Viewfinder
export function IconQrScanner({ className = "w-6 h-6", color = "#1F2937" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* 4 corner brackets */}
      <path d="M4 8V5a1 1 0 0 1 1-1h3" />
      <path d="M16 4h3a1 1 0 0 1 1 1v3" />
      <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
      <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
      {/* QR internal squares */}
      <rect x="7" y="7" width="3" height="3" fill={color} stroke="none" />
      <rect x="14" y="7" width="3" height="3" fill={color} stroke="none" />
      <rect x="7" y="14" width="3" height="3" fill={color} stroke="none" />
      <rect x="14" y="14" width="3" height="3" fill={color} stroke="none" />
    </svg>
  );
}

// Top Header: Notification Bell
export function IconBell({ className = "w-6 h-6", color = "#1F2937" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// Carousel: Info Circle
export function IconInfo({ className = "w-4 h-4", color = "#6B7280" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <circle cx="12" cy="8" r="0.75" fill={color} />
    </svg>
  );
}

// Quick Action 1: Send (Upward Arrow)
export function IconSend({ className = "w-5 h-5", color = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </svg>
  );
}

// Quick Action 2: Add Money (Plus Sign)
export function IconAdd({ className = "w-5 h-5", color = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// Quick Action 3: Exchange (Circular Rotating Arrows)
export function IconExchange({ className = "w-5 h-5", color = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <polyline points="3 3 3 8 8 8" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <polyline points="21 21 21 16 16 16" />
    </svg>
  );
}

// Quick Action 4: More (Three Dots)
export function IconMoreDots({ className = "w-5 h-5", color = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <circle cx="6" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18" cy="12" r="1.8" />
    </svg>
  );
}

// Transaction Hourglass Badge Overlay (for pending transactions)
export function HourglassOverlay({ className = "w-4.5 h-4.5" }) {
  return (
    <div className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-[#4B5563] border-2 border-white flex items-center justify-center p-[2px] shadow-xs ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </svg>
    </div>
  );
}

// Bottom Nav Tab 1: Wallet (Active Bright Blue)
export function IconWalletNav({ className = "w-6 h-6", active = false }) {
  const color = active ? "#1E5BF8" : "#6B7280";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Wallet Body */}
      <rect
        x="3"
        y="5"
        width="18"
        height="15"
        rx="2.5"
        fill={active ? "#1E5BF8" : "none"}
        stroke={color}
        strokeWidth="1.8"
      />
      {/* Top Card Pocket Lip */}
      <path
        d="M6 5V3.5A1.5 1.5 0 0 1 7.5 2h9A1.5 1.5 0 0 1 18 3.5V5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Clasp */}
      <rect
        x="13.5"
        y="10.5"
        width="7.5"
        height="5"
        rx="2.5"
        fill={active ? "#FFFFFF" : "#F3F4F6"}
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="16" cy="13" r="1" fill={active ? "#1E5BF8" : "#6B7280"} />
    </svg>
  );
}

// Bottom Nav Tab 2: Cards
export function IconCardsNav({ className = "w-6 h-6", active = false }) {
  const color = active ? "#1E5BF8" : "#6B7280";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2.5" fill={active ? "#1E5BF8" : "none"} />
      <line x1="2" y1="9.5" x2="22" y2="9.5" stroke={active ? "#FFFFFF" : color} strokeWidth="1.6" />
      <rect x="5" y="13.5" width="4" height="2.5" rx="0.5" fill={active ? "#FFFFFF" : color} stroke="none" />
    </svg>
  );
}

// Bottom Nav Tab 3: Transfers (Opposing horizontal arrows)
export function IconTransfersNav({ className = "w-6 h-6", active = false }) {
  const color = active ? "#1E5BF8" : "#6B7280";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Top arrow pointing right */}
      <path d="M4 9h14M14 5l4 4-4 4" />
      {/* Bottom arrow pointing left */}
      <path d="M20 15H6M10 19l-4-4 4-4" />
    </svg>
  );
}

// Bottom Nav Tab 4: Top Up (Circle with +)
export function IconTopUpNav({ className = "w-6 h-6", active = false }) {
  const color = active ? "#1E5BF8" : "#4B5563";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill={color} />
      <line x1="12" y1="7.5" x2="12" y2="16.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Bottom Nav Tab 5: More (Three horizontal dots)
export function IconMoreNav({ className = "w-6 h-6", active = false }) {
  const color = active ? "#1E5BF8" : "#6B7280";
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <circle cx="6" cy="12" r="1.9" />
      <circle cx="12" cy="12" r="1.9" />
      <circle cx="18" cy="12" r="1.9" />
    </svg>
  );
}
