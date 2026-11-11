import { useId, type SVGProps } from 'react';
import { BUSINESS_INFO } from '../config/business';

export type KsLogoVariant = 'header' | 'mobile' | 'footer' | 'favicon';

interface KsMonogramSvgProps extends SVGProps<SVGSVGElement> {
  variant?: KsLogoVariant;
}

interface KsLogoProps {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
  variant?: KsLogoVariant;
  showWordmark?: boolean;
  showTagline?: boolean;
  lightText?: boolean;
}

const SHIELD_OUTER_PATH =
  'M32 3.8 Q45.2 3.8 53.8 7.8 Q55.6 8.6 55.6 11.2 C55.6 34.4 50 48.4 32 60 C14 48.4 8.4 34.4 8.4 11.2 Q8.4 8.6 10.2 7.8 Q18.8 3.8 32 3.8 Z';

const SHIELD_FAVICON_PATH =
  'M32 2.5 Q46.2 2.5 55.6 7.0 Q57.6 8.0 57.6 10.8 C57.6 34.8 51.4 49.4 32 61.5 C12.6 49.4 6.4 34.8 6.4 10.8 Q6.4 8.0 8.4 7.0 Q17.8 2.5 32 2.5 Z';

const SHIELD_FILLET_PATH =
  'M32 7.4 Q43.4 7.4 51 10.7 Q51.8 11.1 51.8 12.6 C51.8 33.2 46.8 45.6 32 55.8 C17.2 45.6 12.2 33.2 12.2 12.6 Q12.2 11.1 13 10.7 Q20.6 7.4 32 7.4 Z';

const S_ROAD_PATH =
  'M44.2 20.5 C44.2 17.4 41.0 15.8 36.6 15.8 C32.0 15.8 29.2 18.4 29.2 22.0 C29.2 26.4 33.8 27.8 38.4 29.6 C43.0 31.4 45.8 33.6 45.8 37.8 C45.8 41.6 42.0 43.8 36.8 43.8 C32.6 43.8 29.6 42.0 28.0 39.4';

const S_LOWER_WEAVE_PATH =
  'M40.5 31.0 C43.8 32.6 45.8 34.8 45.8 37.8 C45.8 41.6 42.0 43.8 36.8 43.8 C32.6 43.8 29.6 42.0 28.0 39.4';

export function KsMonogramSvg({
  className = 'h-10 w-10',
  variant = 'header',
  ...props
}: KsMonogramSvgProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const goldGradId = `ksGold-${uid}`;
  const navyGradId = `ksNavy-${uid}`;
  const kOverMaskId = `ksKOver-${uid}`;
  const sOverMaskId = `ksSOver-${uid}`;

  const isFavicon = variant === 'favicon';
  const isCompact = variant === 'mobile' || isFavicon;
  const outerBorderWidth = isFavicon ? 3.2 : variant === 'mobile' ? 2.75 : 2.4;
  const sRibbonWidth = isFavicon ? 5.6 : isCompact ? 5.3 : 5.1;
  const sMedianWidth = isFavicon ? 1.05 : 1.0;
  const kArmWidth = isFavicon ? 4.2 : isCompact ? 3.95 : 3.75;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      data-logo-variant={variant}
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id={goldGradId}
          x1="10"
          y1="6"
          x2="54"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EBD2A0" />
          <stop offset="46%" stopColor="#C5A46D" />
          <stop offset="100%" stopColor="#9A7842" />
        </linearGradient>
        <linearGradient
          id={navyGradId}
          x1="10"
          y1="4"
          x2="54"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#192B43" />
          <stop offset="100%" stopColor="#0D1726" />
        </linearGradient>

        {/* Weave mask so K upper diagonal crosses cleanly over S upper curve */}
        <mask id={kOverMaskId}>
          <rect x="0" y="0" width="64" height="64" fill="white" />
          <path
            d="M22.2 28.0 L33.8 15.8"
            stroke="black"
            strokeWidth={kArmWidth + 2.8}
            strokeLinecap="butt"
          />
        </mask>

        {/* Weave mask so S lower road sweep crosses cleanly over K lower leg */}
        <mask id={sOverMaskId}>
          <rect x="0" y="0" width="64" height="64" fill="white" />
          <path
            d={S_LOWER_WEAVE_PATH}
            stroke="black"
            strokeWidth={sRibbonWidth + 2.8}
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* Heraldic Shield Crest on Transparent Canvas */}
      <path
        d={isFavicon ? SHIELD_FAVICON_PATH : SHIELD_OUTER_PATH}
        fill={`url(#${navyGradId})`}
        stroke={`url(#${goldGradId})`}
        strokeWidth={outerBorderWidth}
        strokeLinejoin="round"
      />

      {/* Inner chamfer trim shown on desktop header & footer scales */}
      {!isCompact && (
        <path
          d={SHIELD_FILLET_PATH}
          stroke="#C5A46D"
          strokeOpacity="0.32"
          strokeWidth="0.9"
          className={variant === 'header' ? 'hidden sm:block' : undefined}
        />
      )}

      {/* Sweeping S letterform with integrated curved highway median */}
      <g mask={`url(#${kOverMaskId})`}>
        <path
          d={S_ROAD_PATH}
          stroke={`url(#${goldGradId})`}
          strokeWidth={sRibbonWidth}
          strokeLinecap="round"
        />
        <path
          d={S_ROAD_PATH}
          stroke="#101C2C"
          strokeWidth={sMedianWidth}
          strokeLinecap="round"
        />
      </g>

      {/* Architectural K stem & upper diagonal arm */}
      <path
        d={isFavicon ? 'M17.8 15.6 H22.0 V41.0 H17.8 Z' : 'M18.2 15.8 H22.0 V40.8 H18.2 Z'}
        fill={`url(#${goldGradId})`}
      />
      <path
        d="M20.2 29.8 L33.6 15.9"
        stroke={`url(#${goldGradId})`}
        strokeWidth={kArmWidth}
        strokeLinecap="butt"
      />

      {/* K lower diagonal leg passing seamlessly beneath S */}
      <path
        d="M22.8 26.8 L33.2 40.8"
        stroke={`url(#${goldGradId})`}
        strokeWidth={kArmWidth}
        strokeLinecap="butt"
        mask={`url(#${sOverMaskId})`}
      />
    </svg>
  );
}

export function KsLogo({
  className = '',
  iconSize = 42,
  iconClassName,
  variant = 'header',
  showWordmark = true,
  showTagline = false,
  lightText = true,
}: KsLogoProps) {
  return (
    <span className={`inline-flex max-w-full items-center gap-2.5 sm:gap-3 ${className}`}>
      <KsMonogramSvg
        variant={variant}
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
            <span
              className={`truncate text-[9.5px] font-medium tracking-[0.06em] uppercase sm:text-[11px] sm:tracking-[0.14em] ${
                lightText ? 'text-[#C5A46D]' : 'text-[#9A7842]'
              }`}
            >
              {BUSINESS_INFO.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
