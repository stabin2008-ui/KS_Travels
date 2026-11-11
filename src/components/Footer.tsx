import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '../config/business';
import { SERVICES_LIST, type ServiceItem } from '../data/services';
import { getGeneralWhatsAppUrl } from '../utils/booking';
import { KsLogo } from './KsLogo';

interface FooterProps {
  onSelectService: (service: ServiceItem) => void;
}

export function Footer({ onSelectService }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#C5A46D]/25 bg-[#101C2C] pb-24 pt-12 text-[#F7F5F0] md:pb-10 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkScroll('#home');
              }}
              aria-label="Back to KS Travels home"
            >
              <KsLogo iconSize={46} showTagline />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F7F5F0]/80">
              Trusted taxi and travel services in Bengaluru backed by 25 years of industry
              experience, neat and clean vehicles, affordable rates and customer-focused care.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-bold text-[#C5A46D]">Quick Links</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkScroll(link.href);
                    }}
                    className="inline-block py-0.5 text-[#F7F5F0]/80 transition-colors hover:text-[#C5A46D]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkScroll('#booking');
                  }}
                  className="inline-block py-0.5 text-[#F7F5F0]/80 transition-colors hover:text-[#C5A46D]"
                >
                  Book Your Taxi
                </a>
              </li>
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-bold text-[#C5A46D]">Our Services</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="cursor-pointer py-0.5 text-left text-[#F7F5F0]/80 transition-colors hover:text-[#C5A46D]"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-bold text-[#C5A46D]">Contact Us</h3>
            <ul className="mt-3 space-y-3 text-sm text-[#F7F5F0]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A46D]" />
                <span>{BUSINESS_INFO.operatingArea}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#C5A46D]" />
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="transition-colors hover:text-[#C5A46D]"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#C5A46D]" />
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#C5A46D]"
                >
                  WhatsApp: {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#C5A46D]" />
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="break-all transition-colors hover:text-[#C5A46D]"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center text-xs text-[#F7F5F0]/65 sm:flex-row sm:text-left">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p className="text-[#C5A46D]">{BUSINESS_INFO.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

