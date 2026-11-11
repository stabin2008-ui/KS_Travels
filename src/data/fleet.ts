import { MEDIA_ASSETS } from './media';

export type VehicleCategoryOption = 'Sedan' | 'SUV / XUV' | 'Tempo Traveller';

export interface FleetCategory {
  id: string;
  name: VehicleCategoryOption;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  exteriorImage: string;
  exteriorAlt: string;
  interiorImage: string;
  interiorAlt: string;
  highlights: string[];
  idealFor: string[];
}

export const FLEET_CATEGORIES: FleetCategory[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    categoryLabel: 'Executive City & Airport Comfort',
    shortDescription:
      'Refined, smooth-riding sedans maintained to high cleanliness standards for effortless city commutes, airport drops and business travel.',
    fullDescription:
      'Our Sedan category is well suited for solo travellers, couples and small families seeking a quiet, comfortable cabin and smooth city or highway rides. Every vehicle is thoroughly cleaned before each trip.',
    exteriorImage: MEDIA_ASSETS.fleet.sedan.exterior.src,
    exteriorAlt: MEDIA_ASSETS.fleet.sedan.exterior.alt,
    interiorImage: MEDIA_ASSETS.fleet.sedan.interior.src,
    interiorAlt: MEDIA_ASSETS.fleet.sedan.interior.alt,
    highlights: [
      'Neat and thoroughly sanitised interior cabin',
      'Air-conditioned comfort for Bengaluru traffic and highways',
      'Smooth suspension and calm ride quality',
      'Courteous, experienced chauffeur service',
    ],
    idealFor: ['Airport Pickup & Drop', 'Local City Travel', 'Corporate Visits', 'Short Outstation Trips'],
  },
  {
    id: 'suv-xuv',
    name: 'SUV / XUV',
    categoryLabel: 'Spacious Family & Highway Travel',
    shortDescription:
      'Commanding, spacious SUV / XUV vehicles offering elevated seating and generous cabin room for comfortable family and outstation journeys.',
    fullDescription:
      'Designed for relaxed long-distance travel and extra passenger comfort, our SUV / XUV category delivers a stable highway ride, roomy leg space and dependable climate control throughout your journey.',
    exteriorImage: MEDIA_ASSETS.fleet.suv.exterior.src,
    exteriorAlt: MEDIA_ASSETS.fleet.suv.exterior.alt,
    interiorImage: MEDIA_ASSETS.fleet.suv.interior.src,
    interiorAlt: MEDIA_ASSETS.fleet.suv.interior.alt,
    highlights: [
      'Elevated ride stance for comfortable highway visibility',
      'Generous interior room for relaxed long journeys',
      'Clean, well-upholstered cabin kept fresh for every trip',
      'Ideal balance of comfort and affordable outstation value',
    ],
    idealFor: ['Family Outstation Trips', 'Airport Transfers with Luggage', 'Weekend Getaways', 'Round Trips'],
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    categoryLabel: 'Coordinated Group Travel',
    shortDescription:
      'Well-maintained Tempo Traveller vans offering spacious group seating and wide aisles so families and teams can travel together comfortably.',
    fullDescription:
      'Keep your whole group together without splitting into multiple vehicles. Our Tempo Traveller category provides neat high-back seating, wide cabin visibility and comfortable climate control for coordinated group journeys.',
    exteriorImage: MEDIA_ASSETS.fleet.tempo.exterior.src,
    exteriorAlt: MEDIA_ASSETS.fleet.tempo.exterior.alt,
    interiorImage: MEDIA_ASSETS.fleet.tempo.interior.src,
    interiorAlt: MEDIA_ASSETS.fleet.tempo.interior.alt,
    highlights: [
      'Clean high-back seating arranged for group comfort',
      'Spacious central aisle and neat cabin upkeep',
      'Reliable air-conditioning across passenger rows',
      'Experienced highway chauffeurs for safe group travel',
    ],
    idealFor: ['Family Tours & Pilgrimages', 'Corporate Team Outings', 'Wedding & Event Transfers', 'Multi-Day Round Trips'],
  },
];

