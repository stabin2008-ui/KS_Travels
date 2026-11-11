import { ArrowRight, Building2, Compass, Plane, Repeat } from 'lucide-react';
import { SERVICES_LIST, type ServiceItem } from '../data/services';

interface ServicesSectionProps {
  onBookService: (service: ServiceItem) => void;
}

const SERVICE_ICON_MAP = {
  building: Building2,
  plane: Plane,
  compass: Compass,
  arrowRight: ArrowRight,
  repeat: Repeat,
} as const;

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="bg-[#F7F5F0] py-14 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#9E7D47] uppercase sm:text-sm">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="mt-2 font-display text-3xl font-bold text-[#101C2C] sm:text-4xl lg:text-5xl"
          >
            Thoughtful Travel Solutions for Every Route
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#343A40]/85 sm:text-lg">
            Whether it is an early morning airport drop or an extended outstation journey from
            Bengaluru, travel with neat vehicles and dependable hospitality.
          </p>
        </div>

        {/* Responsive Service Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((service) => {
            const Icon = SERVICE_ICON_MAP[service.iconKey];
            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#101C2C]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A46D]/60 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101C2C]">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/75 via-[#101C2C]/15 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D]/40 bg-[#101C2C]/85 px-3 py-1 text-xs font-medium text-[#F7F5F0] backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>{service.badge}</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#101C2C] text-[#C5A46D]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#101C2C]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#343A40] sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-[#101C2C]/8 pt-4">
                    <button
                      type="button"
                      onClick={() => onBookService(service)}
                      className="inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#101C2C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#17263B] hover:text-[#C5A46D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

