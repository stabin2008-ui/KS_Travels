import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { FLEET_CATEGORIES, type FleetCategory } from '../data/fleet';
import { FleetDetailModal } from './FleetDetailModal';

interface FleetSectionProps {
  onSelectVehicleForBooking: (vehicle: FleetCategory) => void;
}

type PhotoMode = 'exterior' | 'interior';

export function FleetSection({ onSelectVehicleForBooking }: FleetSectionProps) {
  const [activeVehicleModal, setActiveVehicleModal] = useState<FleetCategory | null>(null);
  const [photoModes, setPhotoModes] = useState<Record<string, PhotoMode>>({});
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const getMode = (id: string): PhotoMode => photoModes[id] ?? 'exterior';

  const setMode = (id: string, mode: PhotoMode) => {
    setPhotoModes((prev) => ({ ...prev, [id]: mode }));
  };

  const scrollToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(FLEET_CATEGORIES.length - 1, index));
    setActiveSlideIndex(clamped);
    const container = carouselRef.current;
    if (!container) return;
    const card = container.children[clamped] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - 16,
        behavior: 'smooth',
      });
    }
  };

  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    const scrollLeft = container.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;
    children.forEach((child, idx) => {
      const dist = Math.abs(child.offsetLeft - 16 - scrollLeft);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });
    setActiveSlideIndex(closestIndex);
  };

  const handleBookFromModal = (vehicle: FleetCategory) => {
    setActiveVehicleModal(null);
    onSelectVehicleForBooking(vehicle);
  };

  return (
    <section
      id="fleet"
      className="bg-[#101C2C] py-14 text-white sm:py-20 lg:py-24"
      aria-labelledby="fleet-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#C5A46D] uppercase sm:text-sm">
            Our Fleet
          </p>
          <h2
            id="fleet-heading"
            className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Neat, Clean &amp; Well-Maintained Vehicles
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#F7F5F0]/80 sm:text-lg">
            Choose from our Sedan, SUV / XUV or Tempo Traveller categories. Inspect both
            exterior and interior cabins before sending your booking request.
          </p>
        </div>

        {/* Mobile Category Quick Tabs + Swipe Cue */}
        <div className="mt-7 flex items-center justify-between gap-2 lg:hidden">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Fleet categories">
            {FLEET_CATEGORIES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSlideIndex === idx}
                onClick={() => scrollToSlide(idx)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeSlideIndex === idx
                    ? 'bg-[#C5A46D] text-[#101C2C]'
                    : 'border border-white/15 bg-[#17263B] text-[#F7F5F0]/80 hover:border-[#C5A46D]/60'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlideIndex - 1)}
              disabled={activeSlideIndex === 0}
              aria-label="Previous vehicle category"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#17263B] text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlideIndex + 1)}
              disabled={activeSlideIndex === FLEET_CATEGORIES.length - 1}
              aria-label="Next vehicle category"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#17263B] text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Swipeable Snap Carousel on Mobile/Tablet -> 3-Column Grid on Desktop */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {FLEET_CATEGORIES.map((vehicle) => {
            const currentMode = getMode(vehicle.id);
            const activeSrc =
              currentMode === 'exterior' ? vehicle.exteriorImage : vehicle.interiorImage;
            const activeAlt =
              currentMode === 'exterior' ? vehicle.exteriorAlt : vehicle.interiorAlt;

            return (
              <article
                key={vehicle.id}
                className="flex w-[88vw] max-w-[380px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-[#C5A46D]/25 bg-[#17263B] shadow-xl transition-all duration-300 hover:border-[#C5A46D]/60 lg:w-auto lg:max-w-none"
              >
                {/* Main Featured Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101C2C]">
                  <img
                    src={activeSrc}
                    alt={activeAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/70 via-transparent to-transparent"
                  />

                  {/* Toggle Pill Inside Photo Frame */}
                  <div className="absolute bottom-3 left-3 flex rounded-lg border border-white/15 bg-[#101C2C]/85 p-1 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setMode(vehicle.id, 'exterior')}
                      className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                        currentMode === 'exterior'
                          ? 'bg-[#C5A46D] text-[#101C2C]'
                          : 'text-[#F7F5F0]/85 hover:text-white'
                      }`}
                    >
                      Exterior
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode(vehicle.id, 'interior')}
                      className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                        currentMode === 'interior'
                          ? 'bg-[#C5A46D] text-[#101C2C]'
                          : 'text-[#F7F5F0]/85 hover:text-white'
                      }`}
                    >
                      Interior
                    </button>
                  </div>
                </div>

                {/* Visible Dual Thumbnail Strip (Exterior + Interior both displayed on card) */}
                <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-[#101C2C]/50 p-3">
                  <button
                    type="button"
                    onClick={() => setMode(vehicle.id, 'exterior')}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg border text-left transition-all ${
                      currentMode === 'exterior'
                        ? 'border-[#C5A46D] ring-1 ring-[#C5A46D]'
                        : 'border-white/15 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={vehicle.exteriorImage}
                        alt={vehicle.exteriorAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="block bg-[#101C2C]/90 px-2 py-1 text-[11px] font-medium text-[#F7F5F0]">
                      Exterior Photo
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode(vehicle.id, 'interior')}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg border text-left transition-all ${
                      currentMode === 'interior'
                        ? 'border-[#C5A46D] ring-1 ring-[#C5A46D]'
                        : 'border-white/15 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={vehicle.interiorImage}
                        alt={vehicle.interiorAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="block bg-[#101C2C]/90 px-2 py-1 text-[11px] font-medium text-[#F7F5F0]">
                      Interior Photo
                    </span>
                  </button>
                </div>

                {/* Card Copy & Actions */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#C5A46D] uppercase">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{vehicle.categoryLabel}</span>
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                    {vehicle.name}
                  </h3>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#F7F5F0]/80 sm:text-base">
                    {vehicle.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveVehicleModal(vehicle)}
                      className="inline-flex min-h-[46px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C5A46D]/60 bg-[#101C2C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#C5A46D] hover:text-[#C5A46D]"
                    >
                      <Eye className="h-4 w-4 text-[#C5A46D]" />
                      <span>View Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectVehicleForBooking(vehicle)}
                      className="inline-flex min-h-[46px] flex-1 cursor-pointer items-center justify-center rounded-xl bg-[#C5A46D] px-4 py-2.5 text-sm font-bold text-[#101C2C] transition-colors hover:bg-[#B39158]"
                    >
                      Book {vehicle.name}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Carousel Pagination Dots */}
        <div className="mt-5 flex justify-center gap-2 lg:hidden" aria-hidden="true">
          {FLEET_CATEGORIES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                activeSlideIndex === idx ? 'w-7 bg-[#C5A46D]' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#F7F5F0]/65 sm:text-sm">
          Representative sample photographs are displayed. Exact vehicle availability and
          suitable capacity are confirmed directly by KS Travels upon enquiry.
        </p>
      </div>

      <FleetDetailModal
        vehicle={activeVehicleModal}
        onClose={() => setActiveVehicleModal(null)}
        onSelectForBooking={handleBookFromModal}
      />
    </section>
  );
}

