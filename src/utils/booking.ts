import { BUSINESS_INFO } from '../config/business';
import type { JourneyTypeOption, ServiceTypeOption } from '../data/services';
import type { VehicleCategoryOption } from '../data/fleet';

export type Meridiem = 'AM' | 'PM';

export interface BookingFormValues {
  customerName: string;
  mobileNumber: string;
  email: string;
  serviceType: ServiceTypeOption | '';
  journeyType: JourneyTypeOption | '';
  vehicleCategory: VehicleCategoryOption | '';
  passengers: string;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  pickupHour: string;
  pickupMinute: string;
  pickupMeridiem: Meridiem;
  additionalRequirements: string;
}

export type BookingFieldKey = keyof BookingFormValues | 'pickupTime';

export type BookingFormErrors = Partial<Record<BookingFieldKey, string>>;

/**
 * Returns today's date in YYYY-MM-DD using the user's local clock.
 */
export function getLocalTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatReadableDate(isoDate: string): string {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatPickupTime(
  hour: string,
  minute: string,
  meridiem: Meridiem,
): string {
  if (!hour || !minute || !meridiem) return '';
  return `${hour}:${minute} ${meridiem}`;
}

export function validateBookingForm(values: BookingFormValues): {
  isValid: boolean;
  errors: BookingFormErrors;
} {
  const errors: BookingFormErrors = {};

  const trimmedName = values.customerName.trim();
  if (!trimmedName) {
    errors.customerName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  const rawMobile = values.mobileNumber.trim();
  const digitsOnly = rawMobile.replace(/\D/g, '');
  if (!rawMobile) {
    errors.mobileNumber = 'Please enter your mobile number.';
  } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
  } else if (!/^[+\d\s()-]+$/.test(rawMobile)) {
    errors.mobileNumber = 'Mobile number contains invalid characters.';
  }

  const trimmedEmail = values.email.trim();
  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address or leave this blank.';
  }

  if (!values.serviceType) {
    errors.serviceType = 'Please select a service type.';
  }

  if (!values.journeyType) {
    errors.journeyType = 'Please select a journey type.';
  }

  if (!values.vehicleCategory) {
    errors.vehicleCategory = 'Please select a vehicle category.';
  }

  const passengerCount = Number(values.passengers);
  if (!values.passengers.trim()) {
    errors.passengers = 'Please enter the number of passengers.';
  } else if (!Number.isInteger(passengerCount) || passengerCount < 1 || passengerCount > 60) {
    errors.passengers = 'Enter a valid passenger count (1 or more).';
  }

  if (!values.pickupLocation.trim()) {
    errors.pickupLocation = 'Please enter your pickup location.';
  }

  if (!values.dropLocation.trim()) {
    errors.dropLocation = 'Please enter your drop location.';
  }

  const todayIso = getLocalTodayIsoDate();
  if (!values.travelDate) {
    errors.travelDate = 'Please select a travel date.';
  } else if (values.travelDate < todayIso) {
    errors.travelDate = 'Travel date cannot be in the past.';
  }

  if (!values.pickupHour || !values.pickupMinute || !values.pickupMeridiem) {
    errors.pickupTime = 'Please select a complete pickup time (Hour, Minute, AM/PM).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppBookingMessage(values: BookingFormValues): string {
  const emailValue = values.email.trim() || 'Not provided';
  const requirementsValue = values.additionalRequirements.trim() || 'None';
  const formattedDate = formatReadableDate(values.travelDate);
  const pickupTime = formatPickupTime(
    values.pickupHour,
    values.pickupMinute,
    values.pickupMeridiem,
  );

  return [
    'KS Travels - Taxi Booking Request',
    `Customer Name: ${values.customerName.trim()}`,
    `Mobile Number: ${values.mobileNumber.trim()}`,
    `Email: ${emailValue}`,
    `Service Type: ${values.serviceType}`,
    `Journey Type: ${values.journeyType}`,
    `Vehicle Category: ${values.vehicleCategory}`,
    `Number of Passengers: ${values.passengers.trim()}`,
    `Pickup Location: ${values.pickupLocation.trim()}`,
    `Drop Location: ${values.dropLocation.trim()}`,
    `Travel Date: ${formattedDate}`,
    `Pickup Time: ${pickupTime}`,
    `Additional Requirements: ${requirementsValue}`,
    'Origin: Website Booking Request (Bengaluru).',
    'Please contact me regarding vehicle availability and fare details.',
  ].join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(BUSINESS_INFO.generalWhatsappMessage);
}

