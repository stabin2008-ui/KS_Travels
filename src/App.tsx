import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingSection, type BookingPrefill } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { FleetSection } from './components/FleetSection';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MobileActionBar } from './components/MobileActionBar';
import { Navbar } from './components/Navbar';
import { ServicesSection } from './components/ServicesSection';
import type { FleetCategory } from './data/fleet';
import type { ServiceItem } from './data/services';

export function App() {
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | null>(null);

  const scrollToBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setBookingPrefill({
      serviceType: service.title,
      journeyType: service.defaultJourneyType,
      nonce: Date.now(),
    });
    scrollToBooking();
  };

  const handleSelectVehicle = (vehicle: FleetCategory) => {
    setBookingPrefill({
      vehicleCategory: vehicle.name,
      nonce: Date.now(),
    });
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#343A40]">
      <Navbar onBookClick={scrollToBooking} />

      <main>
        <HeroSection onBookClick={scrollToBooking} />
        <ServicesSection onBookService={handleSelectService} />
        <FleetSection onSelectVehicleForBooking={handleSelectVehicle} />
        <AboutSection />
        <BookingSection prefill={bookingPrefill} />
        <ContactSection />
      </main>

      <Footer onSelectService={handleSelectService} />

      <MobileActionBar onBookClick={scrollToBooking} />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;

