import { Award, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import { MEDIA_ASSETS } from '../data/media';

const ABOUT_PILLARS = [
  '25 years in the travel industry',
  'Neat, clean and well-maintained fleet',
  'Transparent, affordable rates',
  'Customer-first Bengaluru hospitality',
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#F7F5F0] py-14 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Premium Travel Image Column */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-[#C5A46D]/40 bg-[#101C2C] p-2 shadow-xl">
                <div className="aspect-[16/11] w-full overflow-hidden rounded-xl">
                  <img
                    src={MEDIA_ASSETS.about.src}
                    alt={MEDIA_ASSETS.about.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Experience Credential Badge */}
              <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-[#C5A46D]/35 bg-[#101C2C] px-4 py-3.5 text-white shadow-lg sm:absolute sm:-bottom-5 sm:right-5 sm:mt-0 sm:max-w-xs">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C5A46D] text-[#101C2C]">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold leading-tight text-white">
                    25 Years Experience
                  </p>
                  <p className="text-xs text-[#C5A46D]">Trusted Travel Partner in Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-[0.2em] text-[#9E7D47] uppercase sm:text-sm">
              {BUSINESS_INFO.tagline}
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-bold text-[#101C2C] sm:text-4xl lg:text-5xl"
            >
              About KS Travels
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#343A40] sm:mt-5 sm:text-lg">
              With 25 years of experience in the travel industry, KS Travels is committed to
              providing comfortable, reliable and affordable travel services. We focus on neat and
              clean vehicles, customer satisfaction and making every journey comfortable.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ABOUT_PILLARS.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-start gap-2.5 rounded-xl border border-[#101C2C]/10 bg-white p-3.5 shadow-xs"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A46D]" />
                  <span className="text-sm font-medium text-[#101C2C]">{pillar}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-[#101C2C]/10 pt-5 text-sm font-medium text-[#101C2C]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C5A46D]" />
                <span>{BUSINESS_INFO.operatingArea}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C5A46D]" />
                <span>Personalised Customer Support</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

