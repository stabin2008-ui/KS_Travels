import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/booking';

export function FloatingWhatsAppButton() {
  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KS Travels on WhatsApp"
      title="WhatsApp Us"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-[#C5A46D]/60 bg-[#101C2C] px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C5A46D] hover:bg-[#17263B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] md:inline-flex"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C5A46D] text-[#101C2C]">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span>WhatsApp Us</span>
    </a>
  );
}

