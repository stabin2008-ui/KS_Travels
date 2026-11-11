import { MEDIA_ASSETS } from './media';

export type ServiceTypeOption =
  | 'Local Taxi'
  | 'Airport Pickup & Drop'
  | 'Outstation Trips'
  | 'One-Way Trips'
  | 'Round Trips';

export type JourneyTypeOption = 'One-Way' | 'Round Trip';

export interface ServiceItem {
  id: string;
  title: ServiceTypeOption;
  badge: string;
  description: string;
  defaultJourneyType: JourneyTypeOption;
  image: string;
  imageAlt: string;
  iconKey: 'building' | 'plane' | 'compass' | 'arrowRight' | 'repeat';
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'local-taxi',
    title: 'Local Taxi',
    badge: 'Bengaluru City Travel',
    description:
      'Dependable point-to-point rides, business meetings, shopping trips and full-day travel across Bengaluru in neat, air-conditioned vehicles.',
    defaultJourneyType: 'One-Way',
    image: MEDIA_ASSETS.services.local.src,
    imageAlt: MEDIA_ASSETS.services.local.alt,
    iconKey: 'building',
  },
  {
    id: 'airport-transfer',
    title: 'Airport Pickup & Drop',
    badge: 'Punctual Transfers',
    description:
      'Timely, stress-free pickups and drops to and from Bengaluru airport with courteous service and comfortable cabin space.',
    defaultJourneyType: 'One-Way',
    image: MEDIA_ASSETS.services.airport.src,
    imageAlt: MEDIA_ASSETS.services.airport.alt,
    iconKey: 'plane',
  },
  {
    id: 'outstation-trips',
    title: 'Outstation Trips',
    badge: 'Intercity Journeys',
    description:
      'Smooth highway travel from Bengaluru to destinations across Karnataka and neighbouring states with experienced, road-smart chauffeurs.',
    defaultJourneyType: 'Round Trip',
    image: MEDIA_ASSETS.services.outstation.src,
    imageAlt: MEDIA_ASSETS.services.outstation.alt,
    iconKey: 'compass',
  },
  {
    id: 'one-way-trips',
    title: 'One-Way Trips',
    badge: 'Direct Drops',
    description:
      'Straightforward one-way intercity and point-to-point drops designed for convenient travel at transparent, affordable rates.',
    defaultJourneyType: 'One-Way',
    image: MEDIA_ASSETS.services.oneWay.src,
    imageAlt: MEDIA_ASSETS.services.oneWay.alt,
    iconKey: 'arrowRight',
  },
  {
    id: 'round-trips',
    title: 'Round Trips',
    badge: 'Flexible Returns',
    description:
      'Dedicated vehicles for family getaways, temple visits and corporate tours where a clean car stays ready for your return journey.',
    defaultJourneyType: 'Round Trip',
    image: MEDIA_ASSETS.services.roundTrip.src,
    imageAlt: MEDIA_ASSETS.services.roundTrip.alt,
    iconKey: 'repeat',
  },
];

