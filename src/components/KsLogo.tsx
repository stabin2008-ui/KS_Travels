import type { SVGProps } from 'react';
import { BUSINESS_INFO } from '../config/business';

interface KsLogoProps {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  lightText?: boolean;
}

export function KsMonogramSvg({
  className = 'h-10 w-10',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="ksCrestGold"
          x1="10"
          y1="8"
          x2="54"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#E4C892" />
          <stop offset="50%" stopColor="#C5A46D" />
          <stop offset="100%" stopColor="#9E7D47" />
        </linearGradient>
        <linearGradient
          id="ksCrestNavy"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#17263B" />
          <stop offset="100%" stopColor="#101C2C" />
        </linearGradient>
      </defs>

      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#ksCrestNavy)"
        stroke="url(#ksCrestGold)"
        strokeWidth="2.5"
      />
      <rect
        x="6.5"
        y="6.5"
        width="51"
        height="51"
        rx="12"
        stroke="#C5A46D"
        strokeOpacity="0.28"
        strokeWidth="1"
      />

      {/* Compass star accent */}
      <path
        d="M32 10.5L33.4 13.5L36.5 14.9L33.4 16.3L32 19.3L30.6 16.3L27.5 14.9L30.6 13.5L32 10.5Z"
        fill="#C5A46D"
        fillOpacity="0.9"
      />

      {/* Letter K */}
      <path
        d="M16 19V45M16 32.5L28.5 19.5M20.5 28L30.5 45"
        stroke="url(#ksCrestGold)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flowing road-inspired S */}
      <path
        d="M47 22.5C47 19.6 43.8 18 40.2 18C36.5 18 33.8 20.1 33.8 23.2C33.8 26.8 37.2 28.4 41.2 30.2C45.3 32 48.2 33.9 48.2 38C48.2 42.1 44.5 45 39.8 45C35.8 45 33 43.3 32 41"
        stroke="url(#ksCrestGold)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* Route dashed ribbon beneath monogram */}
      <path
        d="M15 49.5C23 47 36 51.5 49 48"
        stroke="#F7F5F0"
        strokeOpacity="0.65"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="3 2.5"
      />
    </svg>
  );
}

export function KsLogo({
  className = '',
  iconSize = 42,
  iconClassName,
  showWordmark = true,
  showTagline = false,
  lightText = true,
}: KsLogoProps) {
  return (
    <span className={`inline-flex max-w-full items-center gap-2.5 sm:gap-3 ${className}`}>
      <KsMonogramSvg
        style={iconClassName ? undefined : { width: iconSize, height: iconSize }}
        className={`shrink-0 drop-shadow-sm ${iconClassName ?? ''}`}
      />
      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={`font-display text-lg font-bold tracking-wide sm:text-2xl ${
              lightText ? 'text-white' : 'text-[#101C2C]'
            }`}
          >
            {BUSINESS_INFO.name}
          </span>
          {showTagline && (
            <span className="truncate text-[9.5px] font-medium tracking-[0.06em] text-[#C5A46D] uppercase sm:text-[11px] sm:tracking-[0.14em]">
              {BUSINESS_INFO.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

