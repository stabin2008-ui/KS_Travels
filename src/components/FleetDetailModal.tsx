import { useEffect } from 'react';
import { CalendarCheck, CheckCircle2, MessageCircle, X } from 'lucide-react';
import type { FleetCategory } from '../data/fleet';
import { getGeneralWhatsAppUrl } from '../utils/booking';

interface FleetDetailModalProps {
  vehicle: FleetCategory | null;
  onClose: () => void;
  onSelectForBooking: (vehicle: FleetCategory) => void;
}

export function FleetDetailModal({
  vehicle,
  onClose,
  onSelectForBooking,
}: FleetDetailModalProps) {
  useEffect(() => {
    if (!vehicle) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#101C2C]/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fleet-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-[#C5A46D]/30 bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#101C2C]/10 bg-[#101C2C] px-5 py-4 text-white sm:px-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#C5A46D] uppercase">
              {vehicle.categoryLabel}
            </p>
            <h3 id="fleet-modal-title" className="font-display text-2xl font-bold sm:text-3xl">
              {vehicle.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle details"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#17263B] text-white transition-colors hover:border-[#C5A46D] hover:text-[#C5A46D]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {/* Exterior & Interior Photographs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-[#101C2C]/10 bg-[#F7F5F0]">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={vehicle.exteriorImage}
                  alt={vehicle.exteriorAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="px-3.5 py-2 text-xs font-semibold tracking-wide text-[#101C2C] uppercase">
                Exterior View
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-xl border border-[#101C2C]/10 bg-[#F7F5F0]">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={vehicle.interiorImage}
                  alt={vehicle.interiorAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="px-3.5 py-2 text-xs font-semibold tracking-wide text-[#101C2C] uppercase">
                Interior Cabin
              </figcaption>
            </figure>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#343A40] sm:text-base">
            {vehicle.fullDescription}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-[#101C2C]/10 bg-[#F7F5F0] p-4">
              <h4 className="text-xs font-bold tracking-[0.15em] text-[#101C2C] uppercase">
                Experience Highlights
              </h4>
              <ul className="mt-3 space-y-2.5">
                {vehicle.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#343A40]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9E7D47]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#101C2C]/10 bg-[#F7F5F0] p-4">
              <h4 className="text-xs font-bold tracking-[0.15em] text-[#101C2C] uppercase">
                Recommended Journeys
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {vehicle.idealFor.map((useCase) => (
                  <span
                    key={useCase}
                    className="rounded-lg border border-[#C5A46D]/40 bg-white px-3 py-1.5 text-xs font-semibold text-[#101C2C]"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#343A40]/80">
                Sample photography shown. Our team confirms exact vehicle availability, passenger
                comfort suitability and fare details directly on enquiry.
              </p>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 border-t border-[#101C2C]/10 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={() => onSelectForBooking(vehicle)}
              className="inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C5A46D] px-5 py-3 text-sm font-bold text-[#101C2C] shadow-md transition-colors hover:bg-[#B39158]"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Book {vehicle.name}</span>
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#101C2C]/20 bg-[#101C2C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#17263B]"
            >
              <MessageCircle className="h-4 w-4 text-[#C5A46D]" />
              <span>Enquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

