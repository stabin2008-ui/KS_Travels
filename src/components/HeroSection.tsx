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
          className="h-full w-full object-cover object-[68%_center] sm:object-center opacity-55 sm:opacity-65"
        />
        {/* Luxury Directional Navy Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#101C2C]/90 via-[#101C2C]/75 to-[#101C2C] sm:bg-gradient-to-r sm:from-[#101C2C] sm:via-[#101C2C]/85 sm:to-[#101C2C]/40"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="max-w-2xl animate-fade-in-up">
          {/* Location & Heritage Pill */}
          <div className="mb-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-[#C5A46D]/40 bg-[#17263B]/85 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#F7F5F0] backdrop-blur-sm sm:rounded-full sm:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A46D]" />
            <span>Bengaluru, Karnataka</span>
            <span className="text-[#C5A46D]" aria-hidden="true">
              •
            </span>
            <span className="text-[#C5A46D]">{BUSINESS_INFO.tagline}</span>
          </div>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {BUSINESS_INFO.mainHeading}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#F7F5F0]/90 sm:mt-5 sm:text-lg">
            Experience reliable and comfortable journeys with KS Travels. With 25 years of
            experience, affordable rates and neat, clean vehicles, we make every journey
            comfortable.
          </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#C5A46D] px-6 py-3.5 text-base font-bold text-[#101C2C] shadow-lg shadow-black/25 transition-all hover:bg-[#B39158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] sm:w-auto sm:px-8"
            >
              <CalendarCheck className="h-5 w-5" />
              <span>Book Your Taxi</span>
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#C5A46D]/60 bg-[#17263B]/80 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-[#C5A46D] hover:bg-[#17263B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] sm:w-auto sm:px-8"
            >
              <MessageCircle className="h-5 w-5 text-[#C5A46D]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Trust Highlights Strip */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {TRUST_HIGHLIGHTS.map((highlight, idx) => {
            const Icon = HIGHLIGHT_ICONS[idx] ?? Award;
            return (
              <div
                key={highlight}
                className="flex items-center gap-3.5 rounded-xl border border-[#C5A46D]/25 bg-[#17263B]/80 px-4 py-3.5 backdrop-blur-md transition-colors hover:border-[#C5A46D]/55"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C5A46D]/15 text-[#C5A46D]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-[#F7F5F0]">
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

