/**
 * Centralized Media Registry for KS Travels.
 *
 * To replace any sample photo with an actual KS Travels vehicle or service photograph:
 * 1. Place the new optimized image inside `public/images/` (recommended: 16:10 or 16:9 JPG/WebP).
 * 2. Keep the same filename OR update the corresponding path below.
 */
export const MEDIA_ASSETS = {
  hero: {
    src: '/images/hero-sedan.jpg',
    alt: 'Premium black executive sedan parked on an illuminated avenue in Bengaluru at night',
  },
  about: {
    src: '/images/about-chauffeur.jpg',
    alt: 'Professional chauffeur welcoming a passenger beside a clean black executive taxi in Bengaluru',
  },
  services: {
    local: {
      src: '/images/service-local.jpg',
      alt: 'Clean black sedan travelling along a tree-lined avenue in Bengaluru',
    },
    airport: {
      src: '/images/service-airport.jpg',
      alt: 'Executive black taxi waiting outside an illuminated airport terminal at twilight',
    },
    outstation: {
      src: '/images/service-outstation.jpg',
      alt: 'Black SUV travelling along a scenic green highway out of Bengaluru',
    },
    oneWay: {
      src: '/images/service-oneway.jpg',
      alt: 'Executive sedan cruising smoothly on a clear highway at sunrise for a one-way journey',
    },
    roundTrip: {
      src: '/images/service-roundtrip.jpg',
      alt: 'Clean black sedan parked peacefully at a scenic heritage getaway destination',
    },
  },
  fleet: {
    sedan: {
      exterior: {
        src: '/images/fleet-sedan-exterior.jpg',
        alt: 'Clean black executive sedan exterior parked at a stone driveway',
      },
      interior: {
        src: '/images/fleet-sedan-interior.jpg',
        alt: 'Neat and spotless sedan rear passenger cabin with comfortable upholstery',
      },
    },
    suv: {
      exterior: {
        src: '/images/fleet-suv-exterior.jpg',
        alt: 'Sleek black executive SUV exterior parked cleanly at dusk',
      },
      interior: {
        src: '/images/fleet-suv-interior.jpg',
        alt: 'Spacious and clean SUV passenger interior cabin with comfortable seating',
      },
    },
    tempo: {
      exterior: {
        src: '/images/fleet-tempo-exterior.jpg',
        alt: 'Clean white and silver Tempo Traveller executive van exterior on a Bengaluru boulevard',
      },
      interior: {
        src: '/images/fleet-tempo-interior.jpg',
        alt: 'Spotless Tempo Traveller passenger cabin interior with comfortable reclining seats',
      },
    },
  },
} as const;

