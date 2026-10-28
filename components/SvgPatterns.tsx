import React from 'react';

/**
 * 1. Architectural Tactical Pitch Blueprint SVG Pattern
 * Renders crisp technical pitch lines (center circle, 18-yard box, penalty arc, tactical arrows)
 */
export const PitchTacticalPattern: React.FC<{
  className?: string;
  strokeColor?: string;
  accentColor?: string;
  opacity?: number;
}> = ({
  className = '',
  strokeColor = 'currentColor',
  accentColor = '#88b03f',
  opacity = 0.14,
}) => {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`micro-grid-${id}`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeOpacity="0.35"
          />
        </pattern>
      </defs>

      {/* Subtle Technical Grid Field */}
      <rect width="1200" height="600" fill={`url(#micro-grid-${id})`} />

      {/* Outer Pitch Touchlines */}
      <rect
        x="40"
        y="40"
        width="1120"
        height="520"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      {/* Halfway Line & Center Circle */}
      <line
        x1="600"
        y1="40"
        x2="600"
        y2="560"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <circle
        cx="600"
        cy="300"
        r="92"
        stroke={strokeColor}
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <circle cx="600" cy="300" r="4" fill={accentColor} />

      {/* Left 18-Yard Penalty Area & 6-Yard Box */}
      <rect
        x="40"
        y="145"
        width="175"
        height="310"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="220"
        width="65"
        height="160"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d="M 215 235 A 75 75 0 0 1 215 365"
        stroke={strokeColor}
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />

      {/* Right 18-Yard Penalty Area & 6-Yard Box */}
      <rect
        x="985"
        y="145"
        width="175"
        height="310"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <rect
        x="1095"
        y="220"
        width="65"
        height="160"
        stroke={strokeColor}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d="M 985 235 A 75 75 0 0 0 985 365"
        stroke={strokeColor}
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />

      {/* Tactical Passing & Pressing Vectors */}
      <path
        d="M 380 420 Q 510 260 690 210"
        stroke={accentColor}
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <circle cx="380" cy="420" r="6" stroke={accentColor} strokeWidth="2" />
      <polygon points="695,208 682,206 687,218" fill={accentColor} />

      <path
        d="M 690 210 Q 840 190 960 285"
        stroke={accentColor}
        strokeWidth="1.75"
        strokeDasharray="4 4"
      />
      <circle cx="960" cy="285" r="5" fill={accentColor} />
    </svg>
  );
};

/**
 * 2. Official Brand Book-Stripe Circle Graphic (Direct from Brand Guidelines Page 40 Notebooks)
 * Diagonal parallel green bars clipped inside a circular emblem geometry
 */
export const BookStripeGraphic: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <circle
      cx="120"
      cy="120"
      r="116"
      stroke="#88b03f"
      strokeOpacity="0.22"
      strokeWidth="1.5"
      strokeDasharray="4 6"
    />
    <g opacity="0.85">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y1 = 46 + i * 24;
        const y2 = 68 + i * 24;
        const width = 180 - Math.abs(2.5 - i) * 22;
        const xStart = 120 - width / 2;
        return (
          <line
            key={i}
            x1={xStart}
            y1={y1}
            x2={xStart + width}
            y2={y2}
            stroke="#88b03f"
            strokeWidth="9"
            strokeLinecap="square"
          />
        );
      })}
    </g>
  </svg>
);

/**
 * 3. Architectural Swiss Crosshair & Grid Pattern
 */
export const ArchitecturalGridPattern: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = '#121e34' }) => {
  const id = React.useId();
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`swiss-cross-${id}`}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 64 0 L 0 0 0 64"
            fill="none"
            stroke={color}
            strokeWidth="0.75"
            strokeOpacity="0.06"
          />
          <path
            d="M 0 -4 L 0 4 M -4 0 L 4 0"
            stroke={color}
            strokeWidth="1.2"
            strokeOpacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#swiss-cross-${id})`} />
    </svg>
  );
};

/**
 * 4. Diagonal Kinetic Speed-Line SVG Pattern for Section Dividers & Banners
 */
export const DiagonalStripePattern: React.FC<{
  className?: string;
  color?: string;
  opacity?: number;
}> = ({ className = '', color = '#88b03f', opacity = 1 }) => {
  const id = React.useId();
  return (
    <svg
      style={{ opacity }}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`diag-stripe-${id}`}
          width="16"
          height="16"
          patternTransform="rotate(35 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="16"
            stroke={color}
            strokeWidth="2"
            strokeOpacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#diag-stripe-${id})`} />
    </svg>
  );
};
