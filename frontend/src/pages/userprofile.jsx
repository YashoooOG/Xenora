import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';

/* ─────────────────────────────────────────
   DUMMY USER
───────────────────────────────────────── */
const USER = {
  name: 'Amit Kumar',
  username: '@amitkumar',
  avatar: 'https://i.pravatar.cc/160?img=11',
  coverColor: '#111',
  joined: 'January 2025',
  location: 'New Delhi, India',
  bio: 'Just a guy trying to help people get their lost items back. Filed 3 reports on Xenora so far. Believe in community-first recovery.',
  verified: true,
  reports: 3,
  recovered: 1,
  socials: [
    {
      label: 'Twitter / X',
      handle: '@amitkr_del',
      url: 'https://twitter.com/amitkr_del',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: '#000',
    },
    {
      label: 'Instagram',
      handle: 'amit.kumar.ig',
      url: 'https://instagram.com/amit.kumar.ig',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      color: '#E1306C',
    },
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/amitkumar',
      url: 'https://linkedin.com/in/amitkumar',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: '#0A66C2',
    },
  ],
};

/* ─────────────────────────────────────────
   DUMMY ITEMS — items he reported found
───────────────────────────────────────── */
const FOUND_ITEMS = [
  {
    id: 'XN-3001',
    title: 'Black Leather Wallet',
    category: 'Accessories',
    city: 'Delhi',
    location: 'Connaught Place, New Delhi',
    date: 'Mar 2, 2026',
    description: 'Black bifold wallet with initials "A.K."',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=280&fit=crop',
    user: { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/32?img=11' },
  },
  {
    id: 'XN-3007',
    title: 'Blue JanSport Backpack',
    category: 'Bags',
    city: 'Delhi',
    location: 'India Gate, New Delhi',
    date: 'Feb 20, 2026',
    description: 'Blue backpack with a broken zipper on the front pocket.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=280&fit=crop',
    user: { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/32?img=11' },
  },
];

/* Items HE lost himself */
const LOST_ITEMS = [
  {
    id: 'XN-U-041',
    title: 'OnePlus Nord Earbuds Case',
    category: 'Electronics',
    city: 'Delhi',
    location: 'Lajpat Nagar Metro, New Delhi',
    date: 'Mar 1, 2026',
    description: 'White charging case, small crack on lid.',
    image: null,
    user: { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/32?img=11' },
  },
];

/* ─────────────────────────────────────────
   STAT BOX helper
───────────────────────────────────────── */
const Stat = ({ value, label }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-2xl font-black text-gray-900">{value}</span>
    <span className="text-xs text-gray-400 font-medium">{label}</span>
  </div>
);

/* ─────────────────────────────────────────
   SECTION HEADER helper
───────────────────────────────────────── */
const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
    <span style={{ color: '#84cc16' }}>{icon}</span>
    <span className="text-xs font-black uppercase tracking-widest text-gray-700">{title}</span>
  </div>
);

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const UserProfile = () => {
  const navigate = useNavigate();
  const [itemTab, setItemTab] = useState('found'); // 'found' | 'lost'

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
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 pb-12">
          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)] overflow-hidden">

            {/* ══════════════════════════════════
                SECTION 1 — PROFILE DETAILS
            ══════════════════════════════════ */}

            {/* Cover bar */}
            <div className="h-24 sm:h-32 w-full relative" style={{ background: '#111' }}>
              {/* Subtle grid overlay on cover */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(132,204,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            <div className="px-6 sm:px-10 pb-8">
              {/* Avatar — overlaps cover */}
              <div className="relative -mt-12 mb-4 flex items-end justify-between">
                <div className="relative">
                  <img
                    src={USER.avatar}
                    alt={USER.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {USER.verified && (
                    <span
                      className="absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ background: '#84cc16' }}
                      title="Verified user"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              {/* Name + username */}
              <div className="mb-3">
                <h1 className="text-xl font-black text-gray-900">{USER.name}</h1>
                <p className="text-sm text-gray-400">{USER.username}</p>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl mb-5">{USER.bio}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {USER.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Joined {USER.joined}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 py-4 border-t border-b border-gray-100">
                <Stat value={USER.reports} label="Reports Filed" />
                <div className="w-px h-8 bg-gray-100" />
                <Stat value={USER.recovered} label="Recovered" />
                <div className="w-px h-8 bg-gray-100" />
                <Stat value={FOUND_ITEMS.length} label="Found & Listed" />
                <div className="w-px h-8 bg-gray-100" />
                <Stat value={LOST_ITEMS.length} label="Own Items Lost" />
              </div>
            </div>

            {/* ══════════════════════════════════
                SECTION 2 — SOCIAL LINKS
            ══════════════════════════════════ */}
            <div className="px-6 sm:px-10 py-8 border-t border-gray-100">
              <SectionHeader
                title="Social Profiles"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                }
              />
              <div className="flex flex-col sm:flex-row gap-3">
                {USER.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors flex-1 group"
                  >
                    <span
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: s.color }}
                    >
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-700 group-hover:text-gray-900 transition-colors">{s.label}</p>
                      <p className="text-xs text-gray-400 truncate">{s.handle}</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-300 ml-auto flex-shrink-0 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════
                SECTION 3 — ITEMS
            ══════════════════════════════════ */}
            <div className="px-6 sm:px-10 py-8 border-t border-gray-100">
              <SectionHeader
                title="Listed Items"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                }
              />

              {/* Tabs */}
              <div className="flex gap-0 border border-gray-200 w-fit mb-6">
                <button
                  onClick={() => setItemTab('found')}
                  className="px-5 py-2 text-xs font-black transition-colors"
                  style={
                    itemTab === 'found'
                      ? { background: '#84cc16', color: '#fff' }
                      : { background: 'white', color: '#9ca3af' }
                  }
                >
                  Found & Reported ({FOUND_ITEMS.length})
                </button>
                <button
                  onClick={() => setItemTab('lost')}
                  className="px-5 py-2 text-xs font-black transition-colors border-l border-gray-200"
                  style={
                    itemTab === 'lost'
                      ? { background: '#ef4444', color: '#fff' }
                      : { background: 'white', color: '#9ca3af' }
                  }
                >
                  My Lost Items ({LOST_ITEMS.length})
                </button>
              </div>

              {/* Grid */}
              {itemTab === 'found' && (
                FOUND_ITEMS.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FOUND_ITEMS.map((item) => (
                      <ItemCard key={item.id} item={item} variant="listed" />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No found items reported yet.</p>
                )
              )}

              {itemTab === 'lost' && (
                LOST_ITEMS.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {LOST_ITEMS.map((item) => (
                      <ItemCard key={item.id} item={item} variant="unlisted" />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No lost items listed.</p>
                )
              )}
            </div>

          </div>

          {/* Back link */}
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Go back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
