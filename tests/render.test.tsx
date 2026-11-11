import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App.tsx';

const distDir = path.resolve(process.cwd(), 'dist');

test('renders full KS Travels application with required sections, copy, links, and zero SafeWay text', () => {
  const html = renderToStaticMarkup(<App />);

  // Brand & Zero SafeWay check
  assert.equal(/safeway/i.test(html), false);
  assert.ok(html.includes('KS Travels'));
  assert.ok(html.includes('Your Journey. Our Commitment.'));
  assert.ok(html.includes('Travel in Comfort. Arrive in Style.'));

  // Exact Hero & About copy
  assert.ok(
    html.includes(
      'Experience reliable and comfortable journeys with KS Travels. With 25 years of experience, affordable rates and neat, clean vehicles, we make every journey comfortable.',
    ),
  );
  assert.ok(
    html.includes(
      'With 25 years of experience in the travel industry, KS Travels is committed to providing comfortable, reliable and affordable travel services. We focus on neat and clean vehicles, customer satisfaction and making every journey comfortable.',
    ),
  );

  // Trust highlights
  for (const item of [
    '25+ Years of Experience',
    'Affordable Rates',
    'Clean &amp; Comfortable Vehicles',
    'Customer-Focused Service',
  ]) {
    assert.ok(html.includes(item), `Missing trust highlight: ${item}`);
  }

  // Services
  for (const service of [
    'Local Taxi',
    'Airport Pickup &amp; Drop',
    'Outstation Trips',
    'One-Way Trips',
    'Round Trips',
  ]) {
    assert.ok(html.includes(service), `Missing service: ${service}`);
  }

  // Fleet categories
  for (const category of ['Sedan', 'SUV / XUV', 'Tempo Traveller']) {
    assert.ok(html.includes(category), `Missing fleet category: ${category}`);
  }

  // Required booking form inputs & note
  for (const fieldName of [
    'customerName',
    'mobileNumber',
    'email',
    'serviceType',
    'journeyType',
    'vehicleCategory',
    'passengers',
    'pickupLocation',
    'dropLocation',
    'travelDate',
    'pickupHour',
    'pickupMinute',
    'pickupMeridiem',
    'additionalRequirements',
  ]) {
    assert.ok(html.includes(`name="${fieldName}"`), `Missing form field: ${fieldName}`);
  }
  assert.ok(html.includes('value="AM"'));
  assert.ok(html.includes('value="PM"'));
  assert.ok(
    html.includes(
      'Your booking enquiry will be sent to KS Travels through WhatsApp. Our team will contact you with availability and fare details.',
    ),
  );

  // Contact & Action Links
  assert.ok(html.includes('href="tel:+919980838845"'));
  assert.ok(html.includes('href="mailto:ways63098@gmail.com"'));
  assert.ok(
    html.includes(
      'href="https://wa.me/919980838845?text=Hello%20KS%20Travels%2C%20I%20would%20like%20to%20enquire%20about%20a%20taxi%20booking."',
    ),
  );
  assert.ok(html.includes('Bengaluru, Karnataka, India'));

  // Every rendered image exists in dist/
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(imgMatches.length >= 13, `Expected at least 13 images, found ${imgMatches.length}`);
  for (const src of imgMatches) {
    const filePath = path.join(distDir, src.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Missing image asset in dist/: ${src}`);
    assert.ok(fs.statSync(filePath).size > 10000, `Image unexpectedly small: ${src}`);
  }
});

