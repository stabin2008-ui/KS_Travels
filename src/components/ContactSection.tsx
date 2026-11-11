import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../config/business';
import { getGeneralWhatsAppUrl } from '../utils/booking';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#F7F5F0] py-14 sm:py-20 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#9E7D47] uppercase sm:text-sm">
            Direct Assistance
          </p>
          <h2
            id="contact-heading"
            className="mt-2 font-display text-3xl font-bold text-[#101C2C] sm:text-4xl lg:text-5xl"
          >
            Contact KS Travels
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#343A40]/85 sm:text-lg">
            Reach our Bengaluru team directly by phone, WhatsApp or email for booking enquiries,
            fare estimates and travel planning.
          </p>
        </div>

        {/* Contact Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#C5A46D]/35 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Dark Navy Info Panel */}
            <div className="bg-[#101C2C] p-6 text-white sm:p-8 lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A46D] uppercase">
                {BUSINESS_INFO.tagline}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {BUSINESS_INFO.name}
              </h3>

              <div className="mt-6 space-y-5 text-sm sm:text-base">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#17263B] text-[#C5A46D]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#F7F5F0]/65 uppercase">
                      Operating Area
                    </p>
                    <p className="mt-0.5 font-medium text-white">
                      {BUSINESS_INFO.operatingArea}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#17263B] text-[#C5A46D]">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#F7F5F0]/65 uppercase">
                      Phone
                    </p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-0.5 inline-block font-semibold text-white transition-colors hover:text-[#C5A46D]"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#17263B] text-[#C5A46D]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#F7F5F0]/65 uppercase">
                      WhatsApp
                    </p>
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-block font-semibold text-white transition-colors hover:text-[#C5A46D]"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#17263B] text-[#C5A46D]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-wider text-[#F7F5F0]/65 uppercase">
                      Email
                    </p>
                    <a
                      href={BUSINESS_INFO.emailHref}
                      className="mt-0.5 inline-block break-all font-semibold text-white transition-colors hover:text-[#C5A46D]"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Panel */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-display text-2xl font-bold text-[#101C2C] sm:text-3xl">
                Connect with Our Team Today
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#343A40] sm:text-base">
                Speak with us directly for quick enquiries, airport pickup schedules, outstation
                itineraries or custom travel arrangements across Bengaluru and Karnataka.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#101C2C] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#17263B]"
                >
                  <Phone className="h-4 w-4 text-[#C5A46D]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#C5A46D] px-4 py-3 text-sm font-bold text-[#101C2C] shadow-sm transition-colors hover:bg-[#B39158]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={BUSINESS_INFO.emailHref}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#101C2C]/20 bg-[#F7F5F0] px-4 py-3 text-sm font-semibold text-[#101C2C] transition-colors hover:border-[#C5A46D] hover:bg-white"
                >
                  <Mail className="h-4 w-4 text-[#9E7D47]" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

