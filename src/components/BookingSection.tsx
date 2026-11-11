import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Users,
} from 'lucide-react';
import type { VehicleCategoryOption } from '../data/fleet';
import type { JourneyTypeOption, ServiceTypeOption } from '../data/services';
import {
  buildWhatsAppBookingMessage,
  buildWhatsAppUrl,
  getLocalTodayIsoDate,
  validateBookingForm,
  type BookingFieldKey,
  type BookingFormErrors,
  type BookingFormValues,
  type Meridiem,
} from '../utils/booking';

export interface BookingPrefill {
  serviceType?: ServiceTypeOption;
  journeyType?: JourneyTypeOption;
  vehicleCategory?: VehicleCategoryOption;
  nonce: number;
}

interface BookingSectionProps {
  prefill: BookingPrefill | null;
}

const SERVICE_OPTIONS: ServiceTypeOption[] = [
  'Local Taxi',
  'Airport Pickup & Drop',
  'Outstation Trips',
  'One-Way Trips',
  'Round Trips',
];

const JOURNEY_OPTIONS: JourneyTypeOption[] = ['One-Way', 'Round Trip'];

const VEHICLE_OPTIONS: VehicleCategoryOption[] = ['Sedan', 'SUV / XUV', 'Tempo Traveller'];

const HOURS_12 = Array.from({ length: 12 }, (_, idx) => String(idx + 1).padStart(2, '0'));
const MINUTES_STEP_5 = Array.from({ length: 12 }, (_, idx) => String(idx * 5).padStart(2, '0'));

const INITIAL_VALUES: BookingFormValues = {
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
  pickupHour: '09',
  pickupMinute: '00',
  pickupMeridiem: 'AM',
  additionalRequirements: '',
};

export function BookingSection({ prefill }: BookingSectionProps) {
  const [values, setValues] = useState<BookingFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submissionState, setSubmissionState] = useState<{
    whatsappUrl: string;
    messagePreview: string;
  } | null>(null);

  const todayIso = getLocalTodayIsoDate();

  useEffect(() => {
    if (!prefill) return;
    setValues((prev) => ({
      ...prev,
      serviceType: prefill.serviceType ?? prev.serviceType,
      journeyType: prefill.journeyType ?? prev.journeyType,
      vehicleCategory: prefill.vehicleCategory ?? prev.vehicleCategory,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      if (prefill.serviceType) delete next.serviceType;
      if (prefill.journeyType) delete next.journeyType;
      if (prefill.vehicleCategory) delete next.vehicleCategory;
      return next;
    });
  }, [prefill]);

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K],
    errorKey?: BookingFieldKey,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    const keyToClear = errorKey ?? field;
    if (errors[keyToClear]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[keyToClear];
        return next;
      });
    }
    if (submissionState) {
      setSubmissionState(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateBookingForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmissionState(null);

      // Focus or scroll cleanly to the first field with an error on mobile
      const firstErrorKey = Object.keys(validation.errors)[0];
      if (firstErrorKey) {
        const fieldId =
          firstErrorKey === 'pickupTime' ? 'booking-pickupHour' : `booking-${firstErrorKey}`;
        const element = document.getElementById(fieldId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus({ preventScroll: true });
        }
      }
      return;
    }

    setErrors({});
    const whatsappMessage = buildWhatsAppBookingMessage(values);
    const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

    setSubmissionState({
      whatsappUrl,
      messagePreview: whatsappMessage,
    });

    // Open WhatsApp with the prefilled booking enquiry; customer presses Send manually.
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputBaseClass =
    'min-h-[48px] min-w-0 w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-[#101C2C] placeholder:text-[#343A40]/50 transition-colors focus:outline-none focus:ring-2';

  const getBorderClass = (key: BookingFieldKey) =>
    errors[key]
      ? 'border-red-600 focus:border-red-600 focus:ring-red-200'
      : 'border-[#101C2C]/20 focus:border-[#C5A46D] focus:ring-[#C5A46D]/30';

  return (
    <section
      id="booking"
      className="bg-[#101C2C] py-14 sm:py-20 lg:py-24"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="text-xs font-bold tracking-[0.2em] text-[#C5A46D] uppercase sm:text-sm">
            Instant Booking Request
          </p>
          <h2
            id="booking-heading"
            className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Book Your Taxi with KS Travels
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#F7F5F0]/80 sm:text-lg">
            Share your journey details below. We will open WhatsApp with your complete request so
            our team can promptly share vehicle availability and fare details.
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#C5A46D]/35 bg-white shadow-2xl sm:mt-10">
          <div className="border-b border-[#101C2C]/10 bg-[#F7F5F0] px-5 py-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[#101C2C]">
                Trip &amp; Passenger Details
              </p>
              <span className="text-xs font-medium text-[#343A40]/75">
                Fields marked with <span className="text-red-600">*</span> are required
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="booking-customerName"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Customer Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-customerName"
                  name="customerName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  value={values.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  aria-invalid={Boolean(errors.customerName)}
                  aria-describedby={errors.customerName ? 'err-customerName' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('customerName')}`}
                />
                {errors.customerName && (
                  <p id="err-customerName" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="booking-mobileNumber"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={values.mobileNumber}
                  onChange={(e) => updateField('mobileNumber', e.target.value)}
                  aria-invalid={Boolean(errors.mobileNumber)}
                  aria-describedby={errors.mobileNumber ? 'err-mobileNumber' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('mobileNumber')}`}
                />
                {errors.mobileNumber && (
                  <p id="err-mobileNumber" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.mobileNumber}</span>
                  </p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label
                  htmlFor="booking-email"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Email <span className="font-normal text-[#343A40]/65">(Optional)</span>
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('email')}`}
                />
                {errors.email && (
                  <p id="err-email" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="booking-serviceType"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Service Type <span className="text-red-600">*</span>
                </label>
                <select
                  id="booking-serviceType"
                  name="serviceType"
                  required
                  value={values.serviceType}
                  onChange={(e) =>
                    updateField('serviceType', e.target.value as ServiceTypeOption | '')
                  }
                  aria-invalid={Boolean(errors.serviceType)}
                  aria-describedby={errors.serviceType ? 'err-serviceType' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('serviceType')}`}
                >
                  <option value="">Select service type</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p id="err-serviceType" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.serviceType}</span>
                  </p>
                )}
              </div>

              {/* Journey Type */}
              <div>
                <label
                  htmlFor="booking-journeyType"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Journey Type <span className="text-red-600">*</span>
                </label>
                <select
                  id="booking-journeyType"
                  name="journeyType"
                  required
                  value={values.journeyType}
                  onChange={(e) =>
                    updateField('journeyType', e.target.value as JourneyTypeOption | '')
                  }
                  aria-invalid={Boolean(errors.journeyType)}
                  aria-describedby={errors.journeyType ? 'err-journeyType' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('journeyType')}`}
                >
                  <option value="">Select journey type</option>
                  {JOURNEY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.journeyType && (
                  <p id="err-journeyType" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.journeyType}</span>
                  </p>
                )}
              </div>

              {/* Vehicle Category */}
              <div>
                <label
                  htmlFor="booking-vehicleCategory"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Vehicle Category <span className="text-red-600">*</span>
                </label>
                <select
                  id="booking-vehicleCategory"
                  name="vehicleCategory"
                  required
                  value={values.vehicleCategory}
                  onChange={(e) =>
                    updateField('vehicleCategory', e.target.value as VehicleCategoryOption | '')
                  }
                  aria-invalid={Boolean(errors.vehicleCategory)}
                  aria-describedby={errors.vehicleCategory ? 'err-vehicleCategory' : undefined}
                  className={`${inputBaseClass} ${getBorderClass('vehicleCategory')}`}
                >
                  <option value="">Select vehicle category</option>
                  {VEHICLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.vehicleCategory && (
                  <p id="err-vehicleCategory" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.vehicleCategory}</span>
                  </p>
                )}
              </div>

              {/* Number of Passengers */}
              <div>
                <label
                  htmlFor="booking-passengers"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Number of Passengers <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Users
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E7D47]"
                  />
                  <input
                    id="booking-passengers"
                    name="passengers"
                    type="number"
                    min={1}
                    max={60}
                    inputMode="numeric"
                    required
                    placeholder="e.g. 4"
                    value={values.passengers}
                    onChange={(e) => updateField('passengers', e.target.value)}
                    aria-invalid={Boolean(errors.passengers)}
                    aria-describedby={errors.passengers ? 'err-passengers' : undefined}
                    className={`${inputBaseClass} pl-10 ${getBorderClass('passengers')}`}
                  />
                </div>
                {errors.passengers && (
                  <p id="err-passengers" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.passengers}</span>
                  </p>
                )}
              </div>

              {/* Travel Date */}
              <div>
                <label
                  htmlFor="booking-travelDate"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Travel Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E7D47]"
                  />
                  <input
                    id="booking-travelDate"
                    name="travelDate"
                    type="date"
                    min={todayIso}
                    required
                    value={values.travelDate}
                    onChange={(e) => updateField('travelDate', e.target.value)}
                    aria-invalid={Boolean(errors.travelDate)}
                    aria-describedby={errors.travelDate ? 'err-travelDate' : undefined}
                    className={`${inputBaseClass} pl-10 ${getBorderClass('travelDate')}`}
                  />
                </div>
                {errors.travelDate && (
                  <p id="err-travelDate" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.travelDate}</span>
                  </p>
                )}
              </div>

              {/* Pickup Location */}
              <div>
                <label
                  htmlFor="booking-pickupLocation"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Pickup Location <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E7D47]"
                  />
                  <input
                    id="booking-pickupLocation"
                    name="pickupLocation"
                    type="text"
                    required
                    placeholder="Area, landmark or airport terminal"
                    value={values.pickupLocation}
                    onChange={(e) => updateField('pickupLocation', e.target.value)}
                    aria-invalid={Boolean(errors.pickupLocation)}
                    aria-describedby={errors.pickupLocation ? 'err-pickupLocation' : undefined}
                    className={`${inputBaseClass} pl-10 ${getBorderClass('pickupLocation')}`}
                  />
                </div>
                {errors.pickupLocation && (
                  <p id="err-pickupLocation" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.pickupLocation}</span>
                  </p>
                )}
              </div>

              {/* Drop Location */}
              <div>
                <label
                  htmlFor="booking-dropLocation"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Drop Location <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E7D47]"
                  />
                  <input
                    id="booking-dropLocation"
                    name="dropLocation"
                    type="text"
                    required
                    placeholder="Destination address or city"
                    value={values.dropLocation}
                    onChange={(e) => updateField('dropLocation', e.target.value)}
                    aria-invalid={Boolean(errors.dropLocation)}
                    aria-describedby={errors.dropLocation ? 'err-dropLocation' : undefined}
                    className={`${inputBaseClass} pl-10 ${getBorderClass('dropLocation')}`}
                  />
                </div>
                {errors.dropLocation && (
                  <p id="err-dropLocation" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.dropLocation}</span>
                  </p>
                )}
              </div>

              {/* Pickup Time (Explicit 12-hour format with AM/PM) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="booking-pickupHour"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#101C2C]"
                >
                  <Clock className="h-4 w-4 text-[#9E7D47]" />
                  <span>
                    Pickup Time (12-Hour Format) <span className="text-red-600">*</span>
                  </span>
                </label>

                <div className="grid grid-cols-3 gap-2 sm:max-w-md sm:gap-2.5">
                  <div>
                    <label
                      htmlFor="booking-pickupHour"
                      className="mb-1 block text-[11px] font-medium text-[#343A40]/75"
                    >
                      Hour
                    </label>
                    <select
                      id="booking-pickupHour"
                      name="pickupHour"
                      aria-label="Pickup Hour"
                      value={values.pickupHour}
                      onChange={(e) =>
                        updateField('pickupHour', e.target.value, 'pickupTime')
                      }
                      className={`min-h-[48px] min-w-0 w-full rounded-xl border bg-white px-2.5 py-2.5 text-base text-[#101C2C] transition-colors focus:outline-none focus:ring-2 sm:px-3.5 ${getBorderClass('pickupTime')}`}
                    >
                      {HOURS_12.map((hr) => (
                        <option key={hr} value={hr}>
                          {hr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-pickupMinute"
                      className="mb-1 block text-[11px] font-medium text-[#343A40]/75"
                    >
                      Minute
                    </label>
                    <select
                      id="booking-pickupMinute"
                      name="pickupMinute"
                      aria-label="Pickup Minute"
                      value={values.pickupMinute}
                      onChange={(e) =>
                        updateField('pickupMinute', e.target.value, 'pickupTime')
                      }
                      className={`min-h-[48px] min-w-0 w-full rounded-xl border bg-white px-2.5 py-2.5 text-base text-[#101C2C] transition-colors focus:outline-none focus:ring-2 sm:px-3.5 ${getBorderClass('pickupTime')}`}
                    >
                      {MINUTES_STEP_5.map((min) => (
                        <option key={min} value={min}>
                          {min}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-pickupMeridiem"
                      className="mb-1 block text-[11px] font-medium text-[#343A40]/75"
                    >
                      AM / PM
                    </label>
                    <select
                      id="booking-pickupMeridiem"
                      name="pickupMeridiem"
                      aria-label="AM or PM"
                      value={values.pickupMeridiem}
                      onChange={(e) =>
                        updateField(
                          'pickupMeridiem',
                          e.target.value as Meridiem,
                          'pickupTime',
                        )
                      }
                      className={`min-h-[48px] min-w-0 w-full rounded-xl border bg-white px-2.5 py-2.5 text-base font-semibold text-[#101C2C] transition-colors focus:outline-none focus:ring-2 sm:px-3.5 ${getBorderClass('pickupTime')}`}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {errors.pickupTime && (
                  <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.pickupTime}</span>
                  </p>
                )}
              </div>

              {/* Additional Requirements (Optional) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="booking-additionalRequirements"
                  className="mb-1.5 block text-sm font-semibold text-[#101C2C]"
                >
                  Additional Requirements{' '}
                  <span className="font-normal text-[#343A40]/65">(Optional)</span>
                </label>
                <textarea
                  id="booking-additionalRequirements"
                  name="additionalRequirements"
                  rows={3}
                  placeholder="Flight number, extra pickup stops, luggage notes or special preferences..."
                  value={values.additionalRequirements}
                  onChange={(e) => updateField('additionalRequirements', e.target.value)}
                  className="w-full rounded-xl border border-[#101C2C]/20 bg-white px-3.5 py-3 text-base text-[#101C2C] placeholder:text-[#343A40]/50 transition-colors focus:border-[#C5A46D] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/30"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#C5A46D] px-6 py-3.5 text-base font-bold text-[#101C2C] shadow-lg transition-all hover:bg-[#B39158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101C2C]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Send Booking Request via WhatsApp</span>
              </button>
            </div>

            {/* Success / WhatsApp Redirect Notice */}
            {submissionState && (
              <div
                role="status"
                aria-live="polite"
                className="mt-5 rounded-xl border border-emerald-700/25 bg-emerald-50 p-4 text-[#101C2C] sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-emerald-950 sm:text-base">
                      WhatsApp is opening with your booking enquiry details
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-900 sm:text-sm">
                      Please press <strong>Send</strong> inside WhatsApp to deliver your request to
                      KS Travels. Our team will contact you to confirm vehicle availability and fare
                      details.
                    </p>
                    <a
                      href={submissionState.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#101C2C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#17263B] sm:text-sm"
                    >
                      <span>Open WhatsApp Now</span>
                      <ExternalLink className="h-4 w-4 text-[#C5A46D]" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Required Clarification Note Below Form */}
            <p className="mt-4 rounded-xl border border-[#101C2C]/10 bg-[#F7F5F0] px-4 py-3 text-center text-xs leading-relaxed text-[#343A40] sm:text-sm">
              Your booking enquiry will be sent to KS Travels through WhatsApp. Our team will
              contact you with availability and fare details.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
