import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import { getGeneralWhatsAppUrl } from '../utils/booking';

interface MobileActionBarProps {
  onBookClick: () => void;
}

export function MobileActionBar({ onBookClick }: MobileActionBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C5A46D]/35 bg-[#101C2C]/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(16,28,44,0.35)] backdrop-blur-md md:hidden"
      role="region"
      aria-label="Quick mobile actions"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1.5">
        <a
          href={BUSINESS_INFO.phoneHref}
          className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl border border-white/15 bg-[#17263B] px-1 py-1.5 text-center text-[11px] font-semibold leading-tight text-white transition-colors active:bg-[#17263B]/80"
        >
          <Phone className="h-4 w-4 text-[#C5A46D]" />
          <span>Call Now</span>
        </a>

        <button
          type="button"
          onClick={onBookClick}
          className="flex min-h-[48px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl bg-[#C5A46D] px-1 py-1.5 text-center text-[11px] font-bold leading-tight text-[#101C2C] shadow-sm transition-colors active:bg-[#B39158]"
        >
          <CalendarCheck className="h-4 w-4" />
          <span>Book Your Taxi</span>
        </button>

        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl border border-[#C5A46D]/45 bg-[#17263B] px-1 py-1.5 text-center text-[11px] font-semibold leading-tight text-white transition-colors active:bg-[#17263B]/80"
        >
          <MessageCircle className="h-4 w-4 text-[#C5A46D]" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
