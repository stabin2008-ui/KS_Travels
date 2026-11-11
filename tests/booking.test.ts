import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWhatsAppBookingMessage,
  buildWhatsAppUrl,
  getGeneralWhatsAppUrl,
  getLocalTodayIsoDate,
  validateBookingForm,
  type BookingFormValues,
} from '../src/utils/booking.ts';

function makeValidValues(overrides: Partial<BookingFormValues> = {}): BookingFormValues {
  return {
    customerName: 'Arjun Rao',
    mobileNumber: '+91 9876543210',
    email: 'arjun@example.com',
    serviceType: 'Airport Pickup & Drop',
    journeyType: 'One-Way',
    vehicleCategory: 'Sedan',
    passengers: '3',
    pickupLocation: 'Indiranagar, Bengaluru',
    dropLocation: 'Kempegowda International Airport',
    travelDate: getLocalTodayIsoDate(),
    pickupHour: '06',
    pickupMinute: '30',
    pickupMeridiem: 'AM',
    additionalRequirements: 'Early morning pickup near 100 Feet Road',
    ...overrides,
  };
}

test('rejects missing required fields with clear errors', () => {
  const empty: BookingFormValues = {
    customerName: '',
    mobileNumber: '',
    email: '',
    serviceType: '',
    journeyType: '',
    vehicleCategory: '',
    passengers: '',
    pickupLocation: '',
    dropLocation: '',
    travelDate: '',
    pickupHour: '',
    pickupMinute: '',
    pickupMeridiem: 'AM',
    additionalRequirements: '',
  };

  const result = validateBookingForm(empty);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.customerName);
  assert.ok(result.errors.mobileNumber);
  assert.ok(result.errors.serviceType);
  assert.ok(result.errors.journeyType);
  assert.ok(result.errors.vehicleCategory);
  assert.ok(result.errors.passengers);
  assert.ok(result.errors.pickupLocation);
  assert.ok(result.errors.dropLocation);
  assert.ok(result.errors.travelDate);
  assert.ok(result.errors.pickupTime);
});

test('rejects past travel dates', () => {
  const result = validateBookingForm(makeValidValues({ travelDate: '2020-01-01' }));
  assert.equal(result.isValid, false);
  assert.match(result.errors.travelDate ?? '', /past/i);
});

test('validates optional email only when provided', () => {
  const validBlank = validateBookingForm(makeValidValues({ email: '' }));
  assert.equal(validBlank.isValid, true);

  const invalidEmail = validateBookingForm(makeValidValues({ email: 'not-an-email' }));
  assert.equal(invalidEmail.isValid, false);
  assert.ok(invalidEmail.errors.email);
});

test('builds exact WhatsApp booking message with 12-hour AM/PM time and no SafeWay', () => {
  const message = buildWhatsAppBookingMessage(
    makeValidValues({
      pickupHour: '09',
      pickupMinute: '45',
      pickupMeridiem: 'PM',
      email: '',
      additionalRequirements: '',
    }),
  );

  assert.equal(/safeway/i.test(message), false);
  assert.ok(message.startsWith('KS Travels - Taxi Booking Request\n'));
  assert.ok(message.includes('Customer Name: Arjun Rao'));
  assert.ok(message.includes('Mobile Number: +91 9876543210'));
  assert.ok(message.includes('Email: Not provided'));
  assert.ok(message.includes('Service Type: Airport Pickup & Drop'));
  assert.ok(message.includes('Journey Type: One-Way'));
  assert.ok(message.includes('Vehicle Category: Sedan'));
  assert.ok(message.includes('Number of Passengers: 3'));
  assert.ok(message.includes('Pickup Location: Indiranagar, Bengaluru'));
  assert.ok(message.includes('Drop Location: Kempegowda International Airport'));
  assert.ok(message.includes('Pickup Time: 09:45 PM'));
  assert.ok(message.includes('Additional Requirements: None'));
  assert.ok(message.includes('Origin: Website Booking Request (Bengaluru).'));
  assert.ok(
    message.includes('Please contact me regarding vehicle availability and fare details.'),
  );
});

test('encodes booking and general WhatsApp URLs to 919980838845', () => {
  const generalUrl = getGeneralWhatsAppUrl();
  assert.equal(
    generalUrl,
    'https://wa.me/919980838845?text=Hello%20KS%20Travels%2C%20I%20would%20like%20to%20enquire%20about%20a%20taxi%20booking.',
  );

  const bookingMessage = buildWhatsAppBookingMessage(makeValidValues());
  const bookingUrl = buildWhatsAppUrl(bookingMessage);
  assert.ok(bookingUrl.startsWith('https://wa.me/919980838845?text='));
  assert.equal(decodeURIComponent(bookingUrl.split('?text=')[1]), bookingMessage);
});

