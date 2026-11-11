import { useEffect, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '../config/business';
import { getGeneralWhatsAppUrl } from '../utils/booking';
import { KsLogo } from './KsLogo';

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#C5A46D]/25 bg-[#101C2C]/95 shadow-lg backdrop-blur-md'
          : 'border-b border-white/10 bg-[#101C2C]/95 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A46D] rounded-lg"
          aria-label="KS Travels Home"
        >
          <KsLogo iconSize={40} showTagline className="sm:hidden" />
          <KsLogo iconSize={44} showTagline className="hidden sm:inline-flex" />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="text-sm font-medium tracking-wide text-[#F7F5F0]/90 transition-colors hover:text-[#C5A46D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A46D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2.5 text-sm font-medium text-[#F7F5F0] transition-colors hover:border-[#C5A46D]/60 hover:text-[#C5A46D]"
          >
            <Phone className="h-4 w-4 text-[#C5A46D]" />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#C5A46D] px-5 py-2.5 text-sm font-semibold text-[#101C2C] shadow-md transition-all hover:bg-[#B39158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
          >
            Book Your Taxi
          </button>
        </div>

        {/* Tablet/Mobile Compact Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="hidden cursor-pointer rounded-lg bg-[#C5A46D] px-3.5 py-2 text-xs font-semibold text-[#101C2C] shadow-sm transition-colors hover:bg-[#B39158] sm:inline-flex"
          >
            Book Your Taxi
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-[#17263B] text-[#F7F5F0] transition-colors hover:border-[#C5A46D] hover:text-[#C5A46D]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#C5A46D]/20 bg-[#101C2C] px-4 pb-5 pt-3 shadow-2xl lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-base font-medium text-[#F7F5F0] transition-colors hover:bg-[#17263B] hover:text-[#C5A46D]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#C5A46D] px-4 py-3 text-sm font-bold text-[#101C2C] shadow-md transition-colors hover:bg-[#B39158]"
            >
              Book Your Taxi
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#17263B] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#C5A46D]"
              >
                <Phone className="h-4 w-4 text-[#C5A46D]" />
                <span>Call Now</span>
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#C5A46D]/40 bg-[#17263B] px-3 py-2.5 text-sm font-medium text-[#F7F5F0] transition-colors hover:border-[#C5A46D]"
              >
                <MessageCircle className="h-4 w-4 text-[#C5A46D]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

