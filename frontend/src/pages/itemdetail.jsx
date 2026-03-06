import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

/* ─────────────────────────────────────────
   DUMMY ITEM — full attribute set
   (mirrors every field in addlostitem.jsx)
───────────────────────────────────────── */
const ITEM = {
  id: 'XN-3001',
  type: 'lost',
  title: 'Black Leather Wallet',
  category: 'Accessories',
  subcategory: 'Bifold Wallet',
  brand: 'Fossil',
  color: 'Black',
  model: 'N/A',
  serial: 'N/A',
  condition: 'Good',
  reward: '₹500',
  date: 'Mar 2, 2026',
  time: '03:30 PM',
  location: 'Connaught Place, New Delhi',
  city: 'Delhi',
  markings: 'Initials "A.K." engraved on the inside. A small scuff on the bottom-right corner.',
  description:
    'Black bifold leather wallet. Contains an Aadhaar card, two bank debit cards, and a student ID. There is also a small folded note inside the card slot. The wallet was last seen near the fountain area at Connaught Place.',
  images: [
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
  ],
  /* Map pin — lat/lng approximation rendered as a styled placeholder */
  mapLocation: 'Connaught Place, New Delhi — 28.6315° N, 77.2167° E',
  user: {
    name: 'Amit Kumar',
    username: '@amitkumar',
    avatar: 'https://i.pravatar.cc/80?img=11',
    joined: 'Jan 2025',
    reports: 3,
    verified: true,
  },
};

/* ─────────────────────────────────────────
   DETAIL ROW helper
───────────────────────────────────────── */
const DetailRow = ({ label, value }) =>
  value && value !== 'N/A' ? (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-3 border-b border-gray-50 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 sm:w-36 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  ) : null;

/* ─────────────────────────────────────────
   MAP PLACEHOLDER
   A styled pseudo-map with SVG grid + pin
───────────────────────────────────────── */
const MapPlaceholder = ({ location }) => (
  <div className="relative w-full h-64 sm:h-80 overflow-hidden border border-gray-200 bg-[#f0f4e8]">
    {/* Grid lines (fake map tiles) */}
    <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#aab87a" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapgrid)" />
      {/* Fake roads */}
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#c8d89a" strokeWidth="6" />
      <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#c8d89a" strokeWidth="4" />
      <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#c8d89a" strokeWidth="4" />
      <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#dde8b0" strokeWidth="3" />
      <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#dde8b0" strokeWidth="3" />
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#dde8b0" strokeWidth="2" />
      {/* Fake blocks */}
      <rect x="10%" y="15%" width="15%" height="12%" rx="2" fill="#e8f0d0" />
      <rect x="35%" y="15%" width="22%" height="12%" rx="2" fill="#e8f0d0" />
      <rect x="70%" y="15%" width="18%" height="12%" rx="2" fill="#e8f0d0" />
      <rect x="10%" y="55%" width="16%" height="12%" rx="2" fill="#e8f0d0" />
      <rect x="35%" y="55%" width="22%" height="12%" rx="2" fill="#e8f0d0" />
      <rect x="70%" y="55%" width="18%" height="12%" rx="2" fill="#e8f0d0" />
    </svg>

    {/* Watermark */}
    <span className="absolute bottom-2 right-3 text-xs text-gray-400 font-semibold opacity-60 select-none">
      Map preview — interactive map coming soon
    </span>

    {/* Pin */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        style={{ background: '#84cc16' }}
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      {/* Pulse ring */}
      <div
        className="absolute w-10 h-10 rounded-full animate-ping opacity-30"
        style={{ background: '#84cc16' }}
      />
      {/* Drop shadow */}
      <div className="w-2 h-1 rounded-full bg-black opacity-20 mt-0.5" />
    </div>

    {/* Location label */}
    <div className="absolute left-1/2 top-[calc(50%+28px)] -translate-x-1/2 z-10">
      <div className="bg-white border border-gray-200 shadow-md px-3 py-1.5 text-xs font-bold text-gray-800 whitespace-nowrap">
        {location}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const ItemDetail = () => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)' }}
      />

      <Header />

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12">
          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)] p-6 sm:p-10">

          {/* ── Breadcrumb ── */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <button onClick={() => navigate('/home')} className="hover:text-gray-700 transition-colors">Listed Items</button>
            <span>/</span>
            <span className="text-gray-600 font-semibold">{ITEM.title}</span>
            <span className="ml-auto font-mono text-gray-300">{ITEM.id}</span>
          </div>

          {/* ── Main layout: left col (image) + right col (details) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ────────────── LEFT — Images ────────────── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={ITEM.images[activeImg]}
                  alt={ITEM.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                />
                {/* Type badge */}
                <span
                  className="absolute top-3 left-3 text-xs font-black uppercase px-2.5 py-1 text-white"
                  style={{ background: ITEM.type === 'lost' ? '#ef4444' : '#34d399' }}
                >
                  {ITEM.type}
                </span>
              </div>

              {/* Thumbnails */}
              {ITEM.images.length > 1 && (
                <div className="flex gap-2">
                  {ITEM.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="relative w-20 h-16 flex-shrink-0 border-2 overflow-hidden transition-all duration-150"
                      style={{ borderColor: activeImg === i ? '#84cc16' : '#e5e7eb' }}
                    >
                      <img src={src} alt={`thumb-${i}`} className="absolute inset-0 w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ────────────── RIGHT — Seller + Details ────────────── */}
            <div className="flex flex-col gap-5">

              {/* Title + category */}
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-0.5">{ITEM.category}</span>
                  {ITEM.subcategory && (
                    <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-0.5">{ITEM.subcategory}</span>
                  )}
                </div>
                <h1 className="text-2xl font-black text-gray-900 leading-tight">{ITEM.title}</h1>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {ITEM.location}
                  </span>
                  <span>·</span>
                  <span>{ITEM.date}</span>
                </div>
              </div>

              {/* ── Seller info card ── */}
              <div className="border border-gray-200 p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/user')} className="flex-shrink-0">
                      <img src={ITEM.user.avatar} alt={ITEM.user.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 hover:opacity-80 transition-opacity" />
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => navigate('/user')} className="text-sm font-black text-gray-900 hover:underline">{ITEM.user.name}</button>
                        {ITEM.user.verified && (
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#84cc16' }}
                            title="Verified user"
                          >
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{ITEM.user.username} · Joined {ITEM.user.joined}</span>
                      <div className="text-xs text-gray-400 mt-0.5">{ITEM.user.reports} reports filed</div>
                    </div>
                  </div>
                </div>

                {/* Chat with seller button */}
                <button
                  onClick={() => setChatOpen((v) => !v)}
                  className="w-full flex items-center justify-center gap-2.5 py-3 text-sm font-black text-white tracking-wide transition-opacity hover:opacity-90"
                  style={{ background: '#111' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  Chat with Reporter
                </button>

                {/* Inline chat box */}
                {chatOpen && (
                  <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                    <p className="text-xs text-gray-400 font-medium">Send a message to {ITEM.user.name.split(' ')[0]}</p>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi, I think I may have found your ${ITEM.title}…`}
                      className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 resize-none"
                    />
                    <button
                      className="self-end px-4 py-2 text-xs font-black text-white transition-opacity hover:opacity-90"
                      style={{ background: '#84cc16' }}
                    >
                      Send Message
                    </button>
                  </div>
                )}
              </div>

              {/* Reward badge */}
              {ITEM.reward && (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border text-sm font-bold"
                  style={{ borderColor: '#84cc16', color: '#4d7c0f', background: '#84cc1610' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reward offered: <strong>{ITEM.reward}</strong>
                </div>
              )}
            </div>
          </div>

          {/* ── Full-width lower section ── */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ────────────── Product Details ────────────── */}
            <div className="border border-gray-200 bg-white">
              {/* Section header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#84cc16' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest text-gray-700">Item Details</span>
              </div>

              <div className="px-6 py-2 divide-y divide-gray-50">
                <DetailRow label="Item Name"        value={ITEM.title} />
                <DetailRow label="Category"         value={ITEM.category} />
                <DetailRow label="Subcategory"      value={ITEM.subcategory} />
                <DetailRow label="Brand / Make"     value={ITEM.brand} />
                <DetailRow label="Primary Color"    value={ITEM.color} />
                <DetailRow label="Model / Size"     value={ITEM.model} />
                <DetailRow label="Serial / ID No."  value={ITEM.serial} />
                <DetailRow label="Condition"        value={ITEM.condition} />
                <DetailRow label="Date"             value={ITEM.date} />
                <DetailRow label="Time"             value={ITEM.time} />
                <DetailRow label="Location"         value={ITEM.location} />
                <DetailRow label="Markings"         value={ITEM.markings} />
              </div>

              {/* Description */}
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{ITEM.description}</p>
              </div>
            </div>

            {/* ────────────── Map ────────────── */}
            <div className="border border-gray-200 bg-white flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#84cc16' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest text-gray-700">Where It Was Lost</span>
              </div>

              <MapPlaceholder location={ITEM.city} />

              <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{ITEM.location}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ITEM.mapLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Back button ── */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all listings
            </button>
          </div>

          </div>{/* end slab */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetail;
