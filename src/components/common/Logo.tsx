import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'intro';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'intro';
  showSlogan?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  showSlogan = true,
  className = ''
}) => {
  // Dimension mappings for different sizes
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-16 sm:h-20',
    lg: 'h-24 sm:h-28',
    xl: 'h-32 sm:h-40',
    intro: 'h-52 sm:h-64 md:h-80 w-auto'
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 480"
        className={`${heightClasses[size]} w-auto max-w-full drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent' }} // Ensures strict transparent background rule!
      >
        <defs>
          {/* Subtle metallic gold gradient */}
          <linearGradient id="duaGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA6E" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9A7832" />
          </linearGradient>

          {/* Terracotta gradient */}
          <linearGradient id="duaMauveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D89896" />
            <stop offset="50%" stopColor="#B87D7B" />
            <stop offset="100%" stopColor="#8F5553" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------------------
            1. CORNER DECORATIONS (Leaf sprigs & floating hearts)
           ------------------------------------------------------------- */}
        {(variant === 'full' || variant === 'intro') && (
          <>
            {/* Top Right Leaf Sprig */}
            <g transform="translate(415, 20) scale(0.95)">
              <path
                d="M 10 70 C 25 50 45 30 70 10 M 35 45 C 25 35 25 25 38 28 C 45 38 40 45 35 45 Z M 52 30 C 48 15 58 10 65 20 C 65 32 58 35 52 30 Z M 20 60 C 8 52 5 42 16 42 C 22 50 22 58 20 60 Z"
                stroke="#C5A059"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#F0E2C3"
                fillOpacity="0.4"
              />
            </g>

            {/* Bottom Left Leaf Sprig */}
            <g transform="translate(15, 380) scale(0.95)">
              <path
                d="M 60 10 C 45 30 25 50 5 70 M 35 35 C 45 25 45 15 32 18 C 25 28 30 35 35 35 Z M 18 50 C 22 35 12 30 5 40 C 5 52 12 55 18 50 Z M 50 20 C 62 12 65 2 54 2 C 48 10 48 18 50 20 Z"
                stroke="#B87D7B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#E8D4D3"
                fillOpacity="0.4"
              />
            </g>

            {/* Floating Subtle Hearts */}
            <path d="M 80 70 Q 75 62 82 58 Q 88 58 90 64 Q 92 58 98 58 Q 105 62 100 70 L 90 80 Z" fill="#B87D7B" opacity="0.5" />
            <path d="M 425 380 Q 420 374 426 370 Q 431 370 433 375 Q 435 370 440 370 Q 446 374 442 380 L 433 388 Z" fill="#B87D7B" opacity="0.6" />
            <path d="M 120 220 Q 117 215 121 212 Q 125 212 126 215 Q 128 212 132 212 Q 136 215 133 220 L 126 226 Z" fill="#C5A059" opacity="0.5" />
          </>
        )}

        {/* -------------------------------------------------------------
            2. TOP ARTWORK - TWO KIDS (Girl & Boy connected by Heart)
           ------------------------------------------------------------- */}
        <g id="kids-artwork">
          {/* GIRL HEAD (Left) */}
          <g transform="translate(145, 45)">
            {/* Girl Head Circle */}
            <circle cx="50" cy="50" r="42" stroke="#B87D7B" strokeWidth="3.5" fill="none" />
            
            {/* Cute Hair Bow on Top-Left */}
            <path
              d="M 22 18 C 12 8 8 22 22 26 C 8 32 18 42 26 28 C 28 32 32 26 26 22 Z"
              stroke="#B87D7B"
              strokeWidth="3"
              fill="#E8D4D3"
            />
            <circle cx="23" cy="22" r="3.5" fill="#B87D7B" />

            {/* Eyes (Happy Arches) */}
            <path d="M 33 48 Q 40 40 47 48" stroke="#B87D7B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 58 48 Q 65 40 72 48" stroke="#B87D7B" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Smile */}
            <path d="M 43 62 Q 52 72 61 62" stroke="#B87D7B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>

          {/* CENTER CONNECTING HEART */}
          <g transform="translate(230, 80)">
            <path
              d="M 20 12 C 12 0 0 4 0 18 C 0 32 20 44 20 44 C 20 44 40 32 40 18 C 40 4 28 0 20 12 Z"
              fill="url(#duaGoldGradient)"
              stroke="#B87D7B"
              strokeWidth="2.5"
            />
          </g>

          {/* BOY HEAD (Right) */}
          <g transform="translate(255, 45)">
            {/* Boy Head Circle */}
            <circle cx="50" cy="50" r="42" stroke="#2C221E" className="dark:stroke-[#F8F5F2]" strokeWidth="3.5" fill="none" />

            {/* Boy Hair Loop (Cute Hair Swoop) */}
            <path
              d="M 28 16 Q 42 -2 55 12 Q 68 8 72 18"
              stroke="#2C221E"
              className="dark:stroke-[#F8F5F2]"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyes (Happy Arches) */}
            <path d="M 28 48 Q 35 40 42 48" stroke="#2C221E" className="dark:stroke-[#F8F5F2]" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 53 48 Q 60 40 67 48" stroke="#2C221E" className="dark:stroke-[#F8F5F2]" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Smile */}
            <path d="M 39 62 Q 48 72 57 62" stroke="#2C221E" className="dark:stroke-[#F8F5F2]" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            3. MAIN BRAND TITLE: "D U A" WITH SIDE HEART
           ------------------------------------------------------------- */}
        <g id="dua-title">
          {/* LETTER 'D' (Terracotta/Mauve) */}
          <text
            x="65"
            y="280"
            fill="url(#duaMauveGradient)"
            fontFamily="'Cormorant Garamond', 'Playfair Display', 'Georgia', serif"
            fontSize="148"
            fontWeight="700"
            letterSpacing="2"
          >
            D
          </text>

          {/* LETTER 'U' (Dark Charcoal / White in Dark Mode) */}
          <text
            x="195"
            y="280"
            fill="#2C221E"
            className="dark:fill-[#F8F5F2]"
            fontFamily="'Cormorant Garamond', 'Playfair Display', 'Georgia', serif"
            fontSize="148"
            fontWeight="700"
            letterSpacing="2"
          >
            U
          </text>

          {/* LETTER 'A' (Golden Warm Bronze) */}
          <text
            x="315"
            y="280"
            fill="url(#duaGoldGradient)"
            fontFamily="'Cormorant Garamond', 'Playfair Display', 'Georgia', serif"
            fontSize="148"
            fontWeight="700"
            letterSpacing="2"
          >
            A
          </text>

          {/* HAND-DRAWN OUTLINED HEART ON THE RIGHT OF 'A' */}
          <g transform="translate(422, 185) rotate(12)">
            <path
              d="M 24 10 C 15 -6 0 0 0 18 C 0 34 24 50 24 50 C 24 50 48 34 48 18 C 48 0 33 -6 24 10 Z"
              stroke="#B87D7B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>

        {/* -------------------------------------------------------------
            4. LINE DIVIDER WITH CENTER HEART
           ------------------------------------------------------------- */}
        {(variant === 'full' || variant === 'intro') && (
          <>
            <g id="divider" transform="translate(0, 305)">
              <line x1="85" y1="0" x2="235" y2="0" stroke="#B87D7B" strokeWidth="2" strokeLinecap="round" />
              {/* Center Heart */}
              <path
                d="M 250 -7 Q 244 -15 238 -9 Q 234 -3 250 8 Q 266 -3 262 -9 Q 256 -15 250 -7 Z"
                fill="#B87D7B"
              />
              <line x1="265" y1="0" x2="415" y2="0" stroke="#B87D7B" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* -------------------------------------------------------------
                5. SUBTITLE 1: "MODA  BEBÊ INFANTIL E JUVENIL"
               ------------------------------------------------------------- */}
            <text
              x="250"
              y="348"
              textAnchor="middle"
              fill="#2C221E"
              className="dark:fill-[#F8F5F2]"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="18"
              fontWeight="600"
              letterSpacing="7"
            >
              MODA BEBÊ INFANTIL E JUVENIL
            </text>

            {/* -------------------------------------------------------------
                6. SUBTITLE 2: "SÃO ROQUE - SP" (With Side Dots)
               ------------------------------------------------------------- */}
            <g id="location" transform="translate(0, 385)">
              <circle cx="160" cy="-5" r="4" fill="#B87D7B" />
              <text
                x="250"
                y="0"
                textAnchor="middle"
                fill="#2C221E"
                className="dark:fill-[#E8D4D3]"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontSize="17"
                fontWeight="500"
                letterSpacing="6"
              >
                SÃO ROQUE - SP
              </text>
              <circle cx="340" cy="-5" r="4" fill="#B87D7B" />
            </g>

            {/* Bottom Heart Accent */}
            <path
              d="M 250 412 Q 246 406 242 410 Q 239 414 250 422 Q 261 414 258 410 Q 254 406 250 412 Z"
              fill="#B87D7B"
            />
          </>
        )}
      </svg>
    </div>
  );
};
