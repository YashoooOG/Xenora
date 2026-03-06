import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import XenoraLogo from '../pictures/Screenshot 2026-02-24 110550.svg';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ─────────────────────────────────────────
   Utility: scroll-reveal hook
───────────────────────────────────────── */
const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
        { threshold: 0.12 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return ref;
};

/* ─────────────────────────────────────────
   Micro components
───────────────────────────────────────── */
const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Avatar = ({ seed, size = 48 }) => (
  <img
    src={`https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=e5e7eb,d1d5db,f3f4f6,9ca3af`}
    alt={seed}
    width={size}
    height={size}
    className="object-cover border-2 border-white shadow"
    style={{ width: size, height: size }}
  />
);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const heroTestimonials = [
  { seed: 'Mia', name: 'Mia Chen', role: 'Recovered her wallet', text: 'Got my wallet back within 24 hours. Xenora is genuinely magical!', accent: '#ef4444' },
  { seed: 'Carlos', name: 'Carlos Rivera', role: 'Found lost keys', text: 'The smart match system paired me with someone who found my keys 3 blocks away.', accent: '#38bdf8' },
  { seed: 'Priya', name: 'Priya Sharma', role: 'Recovered a passport', text: 'Lost my passport at the airport. Xenora connected me in under an hour!', accent: '#86efac' },
];

const backedBy = [
  { name: 'Vercel',  logo: 'https://cdn.simpleicons.org/vercel' },
  { name: 'GitHub',  logo: 'https://cdn.simpleicons.org/github' },
  { name: 'Slack',   logo: 'https://companieslogo.com/img/orig/WORK-d00db09e.png?t=1720244494'  },
  { name: 'Render',  logo: 'https://cdn.simpleicons.org/render' },
  { name: 'Figma',   logo: 'https://cdn.simpleicons.org/figma'  },
];

const navLinks = [
  { label: 'Discover', hasDropdown: true },
  { label: "Reclaimers Review", hasDropdown: false, href: '/reclaimerreview' },
  { label: 'Why Trust Us', hasDropdown: false, href: '/whytrsutus' },
];

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center flex-shrink-0">
          <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, hasDropdown, href }) => (
            <li key={label}>
              <a href={href || '#'} className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1 transition-colors duration-150">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline px-4 py-2 transition-colors">
            Sign In
          </a>
          <a
            href="/home"
            className="text-sm font-semibold px-5 py-2.5 border-2 text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white hover:scale-[1.03] active:scale-[0.98]"
            style={{ borderColor: '#111111' }}
          >
            Find Your Items
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4 shadow-lg">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href || '#'} className="text-gray-700 font-medium text-base py-1">{label}</a>
          ))}
          <hr className="border-gray-100" />
          <a href="/login" className="text-gray-600 font-medium text-left">Sign In</a>
          <a
            href="/home"
            className="w-full py-3 border-2 font-semibold text-sm text-center block"
            style={{ borderColor: '#111111' }}
          >
            Find Your Items
          </a>
        </div>
      )}
    </header>
  );
};

/* ─────────────────────────────────────────
   WORLD MAP — pulsing lost/found dots
───────────────────────────────────────── */
const LOST_COORDS = [
  [40.7128, -74.006], [51.5074, -0.1278], [48.8566, 2.3522],
  [35.6762, 139.6503], [28.6139, 77.209], [37.7749, -122.4194],
  [52.52, 13.405], [55.7558, 37.6173], [-23.5505, -46.6333],
  [1.3521, 103.8198], [19.076, 72.8777], [31.2304, 121.4737],
  [41.9028, 12.4964], [30.0444, 31.2357], [-33.9249, 18.4241],
  [43.6532, -79.3832], [34.0522, -118.2437], [25.2048, 55.2708],
];

const FOUND_COORDS = [
  [40.75, -73.98], [51.52, -0.09], [48.87, 2.37],
  [35.69, 139.67], [28.63, 77.22], [37.8, -122.4],
  [52.53, 13.42], [-33.8688, 151.2093], [19.08, 72.88],
  [-22.9068, -43.1729], [6.5244, 3.3792], [53.3498, -6.2603],
  [59.3293, 18.0686], [45.4215, -75.698], [50.0755, 14.4378],
  [33.5731, -7.5898], [13.7563, 100.5018],
];

const MapDots = () => {
  const map = useMap();
  useEffect(() => {
    const markers = [];
    LOST_COORDS.forEach(([lat, lng]) => {
      const icon = L.divIcon({ className: '', html: '<div class="map-dot-lost"></div>', iconSize: [12, 12], iconAnchor: [6, 6] });
      markers.push(L.marker([lat, lng], { icon, interactive: false }).addTo(map));
    });
    FOUND_COORDS.forEach(([lat, lng]) => {
      const icon = L.divIcon({ className: '', html: '<div class="map-dot-found"></div>', iconSize: [12, 12], iconAnchor: [6, 6] });
      markers.push(L.marker([lat, lng], { icon, interactive: false }).addTo(map));
    });
    return () => markers.forEach(m => map.removeLayer(m));
  }, [map]);
  return null;
};

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
const HeroSection = () => {
  const textRef = useReveal();
  const cardsRef = useReveal(200);

  return (
    <section className="relative flex-1 overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* ── Interactive world map background ── */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[20, 10]}
          zoom={2}
          minZoom={2}
          scrollWheelZoom
          zoomControl
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapDots />
        </MapContainer>
      </div>

      {/* ── Semi-transparent overlay for text readability ── */}
      <div className="absolute inset-0 z-10 bg-white/55" />

      {/* ── Map legend ── */}
      <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md px-4 py-2.5 flex items-center gap-4 text-xs font-medium text-gray-600">
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-red-500"></span> Lost here</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> Found here</span>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 pt-16 flex items-center" style={{ minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left — text */}
          <div ref={textRef} className="reveal flex-1 max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
              Lost{' '}
              <span
                className="relative inline-block"
              >
                Something?
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 8 Q225 14 298 6" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                </svg>
              </span>
              <br />
              Found Something?
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
              We connect people and their lost belongings <span style={{ color: '#84cc16' }}>—</span>{' '}
              <strong style={{ color: '#84cc16' }} className="font-semibold">quickly</strong> and{' '}
              <strong style={{ color: '#84cc16' }} className="font-semibold">locally</strong>.
              No hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/home"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-base font-semibold bg-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-white hover:text-black"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Discover Lost Items
          </a>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-800 text-base font-semibold border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black transition-colors duration-200">
                Sign Up Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

          </div>

          {/* Right — floating testimonial cards */}
          <div ref={cardsRef} className="reveal flex-1 flex flex-col gap-0 items-center lg:items-start w-full max-w-sm mx-auto lg:mx-0 relative">
            {heroTestimonials.map((t, i) => (
              <div
                key={t.seed}
                className="w-full bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-gray-100 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderLeft: `4px solid ${t.accent}`,
                  marginTop: i === 0 ? 0 : '-12px',
                  zIndex: heroTestimonials.length - i,
                  transform: `rotate(${i === 0 ? '-1.5deg' : i === 1 ? '1deg' : '-0.5deg'})`,
                  position: 'relative',
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar seed={t.seed} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                      <Stars />
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600">
                      {t.role}
                    </span>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{t.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-2 anim-float"
            >
              <span className="text-2xl">🎉</span>
              <div>
                <div className="text-xs font-bold text-gray-900">Item Recovered!</div>
                <div className="text-xs text-gray-400">2 min ago · NYC</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   BACKED BY
───────────────────────────────────────── */
const BackedBySection = () => {
  const ref = useReveal();
  return (
    <section className="py-5 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          {/* Backed By &amp;  */}
          Integrated With
        </p>
        <div ref={ref} className="reveal flex flex-wrap justify-center gap-6 md:gap-10 items-center">
          {backedBy.map(({ name, logo }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 px-6 py-3 border border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 group cursor-default"
            >
              <img src={logo} alt={name} className="w-6 h-6 object-contain" />
              <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 tracking-wide transition-colors">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   LANDING PAGE (root)
───────────────────────────────────────── */
const Landing = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col" style={{ minHeight: '100vh' }}>
        <HeroSection />
        <BackedBySection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
