import {
  Award,
  BadgeIndianRupee,
  CalendarCheck,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_INFO, TRUST_HIGHLIGHTS } from '../config/business';
import { MEDIA_ASSETS } from '../data/media';
import { getGeneralWhatsAppUrl } from '../utils/booking';

interface HeroSectionProps {
  onBookClick: () => void;
}

const HIGHLIGHT_ICONS = [Award, BadgeIndianRupee, Sparkles, HeartHandshake];

export function HeroSection({ onBookClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#101C2C] text-white"
      aria-labelledby="hero-heading"
    >
      {/* Background Photograph with Bengaluru Night Atmosphere */}
      <div className="absolute inset-0">
        <img
          src={MEDIA_ASSETS.hero.src}
          alt={MEDIA_ASSETS.hero.alt}
          fetchPriority="high"
          className="h-full w-full object-cover object-[72%_52%] opacity-65 sm:object-center sm:opacity-70"
        />
        {/* Luxury Directional Navy Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#101C2C]/85 via-[#101C2C]/60 to-[#101C2C] sm:bg-gradient-to-r sm:from-[#101C2C]/95 sm:via-[#101C2C]/80 sm:to-[#101C2C]/35"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-7 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="max-w-2xl animate-fade-in-up">
          {/* Location & Heritage Pill */}
          <div className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-[#C5A46D]/40 bg-[#17263B]/85 px-3 py-1.5 text-[11px] font-medium tracking-wider text-[#F7F5F0] backdrop-blur-sm sm:mb-5 sm:rounded-full sm:px-3.5 sm:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A46D]" />
            <span>Bengaluru, Karnataka</span>
            <span className="text-[#C5A46D]" aria-hidden="true">
              •
            </span>
            <span className="text-[#C5A46D]">{BUSINESS_INFO.tagline}</span>
          </div>

          <h1
            id="hero-heading"
            className="font-display text-[1.95rem] font-bold leading-[1.14] tracking-tight text-white min-[360px]:text-[2.15rem] sm:text-5xl sm:leading-[1.12] lg:text-6xl"
          >
            {BUSINESS_INFO.mainHeading}
          </h1>

          <p className="mt-3.5 text-[15px] leading-relaxed text-[#F7F5F0]/90 sm:mt-5 sm:text-lg">
            Experience reliable and comfortable journeys with KS Travels. With 25 years of
            experience, affordable rates and neat, clean vehicles, we make every journey
            comfortable.
          </p>

          {/* Primary CTAs */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 min-[375px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#C5A46D] px-4 py-3 text-sm font-bold text-[#101C2C] shadow-lg shadow-black/25 transition-all hover:bg-[#B39158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] sm:min-h-[52px] sm:w-auto sm:gap-2.5 sm:px-8 sm:text-base"
            >
              <CalendarCheck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span>Book Your Taxi</span>
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#C5A46D]/60 bg-[#17263B]/85 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#C5A46D] hover:bg-[#17263B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] sm:min-h-[52px] sm:w-auto sm:gap-2.5 sm:px-8 sm:text-base"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-[#C5A46D] sm:h-5 sm:w-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Trust Highlights Strip (2x2 Grid on Mobile, 4-Col on Desktop) */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-3.5 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {TRUST_HIGHLIGHTS.map((highlight, idx) => {
            const Icon = HIGHLIGHT_ICONS[idx] ?? Award;
            return (
              <div
                key={highlight}
                className="flex flex-col items-start gap-2 rounded-xl border border-[#C5A46D]/25 bg-[#17263B]/85 p-3 backdrop-blur-md transition-colors hover:border-[#C5A46D]/55 sm:flex-row sm:items-center sm:gap-3.5 sm:px-4 sm:py-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C5A46D]/15 text-[#C5A46D] sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="text-xs font-semibold leading-snug text-[#F7F5F0] sm:text-sm">
                  {highlight}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

