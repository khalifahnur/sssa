import React from 'react';

interface AcademyCrestProps {
  className?: string;
  variant?: 'primary' | 'green' | 'navy' | 'reversed';
  size?: number;
}

/**
 * Official St. Sebastian Sports Academy Registered Emblem Crest
 * Strictly adheres to Brand Guidelines Pages 10–13:
 * - Always upright, never distorted, always includes "CHAMPIONS FOR LIFE" tagline
 * - Mountain peaks + Open Green Book (6 lines on left page, Football on right page)
 * - "ST. SEBASTIAN SPORTS ACADEMY" + 5-pointed star at base
 */
export const AcademyCrest: React.FC<AcademyCrestProps> = ({
  className = '',
  variant = 'primary',
  size = 64,
}) => {
  const palette = {
    primary: {
      shieldBg: '#ffffff',
      shieldBorder: '#1f4b50',
      bottomBg: '#1f4b50',
      mountain: '#121e34',
      book: '#88b03f',
      ball: '#121e34',
      topText: '#121e34',
      bottomText: '#ffffff',
      star: '#ffffff',
    },
    green: {
      shieldBg: '#1f4b50',
      shieldBorder: '#88b03f',
      bottomBg: '#88b03f',
      mountain: '#88b03f',
      book: '#88b03f',
      ball: '#88b03f',
      topText: '#88b03f',
      bottomText: '#121e34',
      star: '#121e34',
    },
    navy: {
      shieldBg: '#88b03f',
      shieldBorder: '#121e34',
      bottomBg: '#121e34',
      mountain: '#121e34',
      book: '#121e34',
      ball: '#121e34',
      topText: '#121e34',
      bottomText: '#88b03f',
      star: '#88b03f',
    },
    reversed: {
      shieldBg: '#121e34',
      shieldBorder: '#ffffff',
      bottomBg: '#ffffff',
      mountain: '#ffffff',
      book: '#ffffff',
      ball: '#ffffff',
      topText: '#ffffff',
      bottomText: '#121e34',
      star: '#121e34',
    },
  }[variant];

  const uniqueId = React.useId();

  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      role="img"
      aria-label="St. Sebastian Sports Academy — Champions for Life Official Crest"
    >
      <defs>
        <path
          id={`crest-arch-${uniqueId}`}
          d="M 32,62 Q 100,26 168,62"
          fill="none"
        />
      </defs>

      {/* Outer Shield */}
      <path
        d="M100 6 C130 20 165 24 190 25 L190 132 C190 182 145 208 100 224 C55 208 10 182 10 132 L10 25 C35 24 70 20 100 6 Z"
        fill={palette.shieldBg}
        stroke={palette.shieldBorder}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Arched Tagline: CHAMPIONS FOR LIFE */}
      <text
        fill={palette.topText}
        fontSize="11.5"
        fontWeight="800"
        fontFamily="Plus Jakarta Sans, Arial, sans-serif"
        letterSpacing="1.2"
      >
        <textPath
          href={`#crest-arch-${uniqueId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          CHAMPIONS FOR LIFE
        </textPath>
      </text>

      {/* Mountain Peaks */}
      <path
        d="M42 92 L78 52 L106 78 L128 58 L158 92 Z"
        fill={palette.mountain}
      />
      {/* Mountain Snow Highlights */}
      <path
        d="M78 52 L88 76 L80 74 L75 82 L68 68 Z M128 58 L138 78 L130 76 L124 83 Z"
        fill={palette.shieldBg}
      />

      {/* Open Book Left Page Frame */}
      <path
        d="M36 78 C58 78 82 86 96 102 L96 150 C82 136 58 130 36 130 Z"
        fill={palette.shieldBg}
        stroke={palette.book}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Left Book Outer Spine */}
      <path
        d="M26 85 L26 140 C48 140 74 145 92 156"
        stroke={palette.book}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 6 Horizontal Page Lines on Left Page */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const yStart = 90 + idx * 7.2;
        const yEnd = 98 + idx * 7.2;
        return (
          <line
            key={idx}
            x1="44"
            y1={yStart}
            x2="88"
            y2={yEnd}
            stroke={palette.book}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        );
      })}

      {/* Open Book Right Page Frame */}
      <path
        d="M164 78 C142 78 118 86 104 102 L104 150 C118 136 142 130 164 130 Z"
        fill={palette.shieldBg}
        stroke={palette.book}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Right Book Outer Spine */}
      <path
        d="M174 85 L174 140 C152 140 126 145 108 156"
        stroke={palette.book}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Football inside Right Page */}
      <g>
        <circle
          cx="134"
          cy="111"
          r="21"
          fill={palette.shieldBg}
          stroke={palette.ball}
          strokeWidth="4"
        />
        {/* Central Pentagon */}
        <polygon
          points="134,101 143,107 139,117 129,117 125,107"
          fill={palette.ball}
        />
        {/* Seam Lines & Outer Patches */}
        <line x1="134" y1="101" x2="134" y2="90" stroke={palette.ball} strokeWidth="3" />
        <line x1="143" y1="107" x2="153" y2="103" stroke={palette.ball} strokeWidth="3" />
        <line x1="139" y1="117" x2="147" y2="127" stroke={palette.ball} strokeWidth="3" />
        <line x1="129" y1="117" x2="121" y2="127" stroke={palette.ball} strokeWidth="3" />
        <line x1="125" y1="107" x2="115" y2="103" stroke={palette.ball} strokeWidth="3" />
      </g>

      {/* Lower Shield Dark Teal Base */}
      <path
        d="M12 148 Q55 136 100 158 Q145 136 188 148 L186 142 C184 182 143 206 100 221 C57 206 16 182 14 142 Z"
        fill={palette.bottomBg}
      />

      {/* Academy Name Typography */}
      <text
        x="100"
        y="177"
        textAnchor="middle"
        fill={palette.bottomText}
        fontSize="17"
        fontWeight="800"
        fontFamily="Plus Jakarta Sans, Arial, sans-serif"
        letterSpacing="1"
      >
        ST. SEBASTIAN
      </text>
      <text
        x="100"
        y="194"
        textAnchor="middle"
        fill={palette.bottomText}
        fontSize="11.5"
        fontWeight="700"
        fontFamily="Plus Jakarta Sans, Arial, sans-serif"
        letterSpacing="1.4"
      >
        SPORTS ACADEMY
      </text>

      {/* Bottom 5-Pointed Star */}
      <polygon
        points="100,198 103,205 111,205 105,210 107,217 100,213 93,217 95,210 89,205 97,205"
        fill={palette.star}
      />
    </svg>
  );
};

/**
 * Brand Mountain Range Silhouette Motif (from Brand Guidelines Pages 29–35 & 41)
 */
export const MountainSilhouette: React.FC<{ className?: string; color?: string; snowColor?: string }> = ({
  className = '',
  color = '#121e34',
  snowColor = '#ffffff',
}) => (
  <svg
    viewBox="0 0 1200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full pointer-events-none select-none ${className}`}
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <path
      d="M0 220 L0 165 L140 68 L255 148 L390 32 L540 155 L670 74 L815 168 L960 44 L1110 145 L1200 95 L1200 220 Z"
      fill={color}
    />
    <path
      d="M140 68 L175 118 L152 110 L138 128 L122 104 Z M390 32 L445 108 L412 96 L394 124 L372 88 Z M670 74 L710 126 L685 118 L668 136 Z M960 44 L1015 115 L984 102 L965 128 L942 94 Z"
      fill={snowColor}
      fillOpacity="0.18"
    />
  </svg>
);
