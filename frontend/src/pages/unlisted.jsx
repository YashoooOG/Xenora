import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';

/* ─────────────────────────────────────────
   DUMMY UNLISTED REPORTS
   These are missing items not yet found/matched —
   most users won't have a photo of their lost item.
───────────────────────────────────────── */
const UNLISTED_ITEMS = [
  {
    id: 'UL-1021',
    title: 'Gold Bangles (set of 4)',
    category: 'Accessories',
    city: 'Lahore',
    location: 'Anarkali Bazaar, Lahore',
    date: 'Mar 4, 2026',
    description: 'Four gold bangles with small floral engravings. Were in a red velvet pouch.',
    image: null,
    user: { name: 'Nadia B.', avatar: 'https://i.pravatar.cc/32?img=44' },
  },
  {
    id: 'UL-1020',
    title: 'Samsung Galaxy Tab S8',
    category: 'Electronics',
    city: 'Karachi',
    location: 'Dolmen Mall, Karachi',
    date: 'Mar 3, 2026',
    description: 'Black tablet with a blue case. Has stickers on the back cover.',
    image: null,
    user: { name: 'Bilal H.', avatar: 'https://i.pravatar.cc/32?img=12' },
  },
  {
    id: 'UL-1019',
    title: 'University Degree Certificate',
    category: 'Documents',
    city: 'Islamabad',
    location: 'F-10 Markaz, Islamabad',
    date: 'Mar 2, 2026',
    description: 'Original COMSATS University degree certificate in a brown envelope. Name: Usman Ali.',
    image: null,
    user: { name: 'Usman A.', avatar: 'https://i.pravatar.cc/32?img=3' },
  },
  {
    id: 'UL-1018',
    title: 'Vintage Leather Jacket',
    category: 'Clothing',
    city: 'Lahore',
    location: 'Packages Mall, Lahore',
    date: 'Mar 1, 2026',
    description: 'Brown vintage leather jacket, size M. Has a small tear on the left elbow.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    user: { name: 'Rida K.', avatar: 'https://i.pravatar.cc/32?img=9' },
  },
  {
    id: 'UL-1017',
    title: 'Car Keys (Toyota Corolla)',
    category: 'Keys',
    city: 'Rawalpindi',
    location: 'Saddar Bazaar, Rawalpindi',
    date: 'Feb 28, 2026',
    description: 'Toyota key fob on a keychain with a small wooden Quran charm.',
    image: null,
    user: { name: 'Ahmed R.', avatar: 'https://i.pravatar.cc/32?img=17' },
  },
  {
    id: 'UL-1016',
    title: 'Children\'s School Bag',
    category: 'Bags',
    city: 'Faisalabad',
    location: 'Susan Road, Faisalabad',
    date: 'Feb 26, 2026',
    description: 'Blue school bag with cartoon characters. Contains textbooks for Class 4.',
    image: null,
    user: { name: 'Sadia M.', avatar: 'https://i.pravatar.cc/32?img=25' },
  },
  {
    id: 'UL-1015',
    title: 'Reading Glasses + Case',
    category: 'Accessories',
    city: 'Lahore',
    location: 'Gulberg Main Blvd, Lahore',
    date: 'Feb 24, 2026',
    description: 'Round tortoiseshell reading glasses inside a hard grey case. +2.5 prescription.',
    image: null,
    user: { name: 'Tariq N.', avatar: 'https://i.pravatar.cc/32?img=31' },
  },
  {
    id: 'UL-1014',
    title: 'Meezan Bank Debit Card',
    category: 'Documents',
    city: 'Karachi',
    location: 'Clifton Block 2, Karachi',
    date: 'Feb 22, 2026',
    description: 'Meezan Bank Islamic Debit Card. Account holder: Komal Shah.',
    image: null,
    user: { name: 'Komal S.', avatar: 'https://i.pravatar.cc/32?img=49' },
  },
];

const CITIES = ['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
const CATEGORIES = ['All Categories', 'Electronics', 'Bags', 'Accessories', 'Documents', 'Keys', 'Clothing', 'Other'];

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const UnlistedReports = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All Cities');
  const [category, setCategory] = useState('All Categories');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = UNLISTED_ITEMS.filter((item) => {
    const matchesCity = city === 'All Cities' || item.city === city;
    const matchesCat = category === 'All Categories' || item.category === category;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCity && matchesCat && matchesQuery;
  });

  const activeFilters = (city !== 'All Cities' ? 1 : 0) + (category !== 'All Categories' ? 1 : 0);

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
      {/* Amber blob — distinct from homepage lime */}
      <div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at top right, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
      />
      {/* Neutral blob */}
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)' }}
      />

      <Header />

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12">

          {/* ── Page heading ── */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-black uppercase tracking-widest px-2 py-0.5"
                  style={{ background: '#f59e0b', color: '#fff' }}
                >
                  Unlisted
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Missing Item Reports</h1>
              <p className="text-sm text-gray-400 mt-1 max-w-lg">
                These items have been reported missing but haven't been found yet. If you've seen any of these, help the owner by reaching out.
              </p>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0 self-start sm:self-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Listed Items
            </button>
          </div>

          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)]">
            <div className="p-6 sm:p-10">
              <div className="flex flex-col gap-5">

                {/* ── Search bar row ── */}
                <div className="flex gap-3 items-stretch">
                  {/* Search input */}
                  <div className="flex-1 flex items-center gap-3 px-4 border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by item name, location…"
                      className="flex-1 py-3.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none bg-transparent"
                    />
                    {query && (
                      <button onClick={() => setQuery('')} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
                    )}
                  </div>

                  {/* Filter toggle */}
                  <button
                    onClick={() => setFiltersOpen((v) => !v)}
                    className="flex items-center gap-2 px-4 border text-xs font-bold transition-colors flex-shrink-0"
                    style={
                      filtersOpen || activeFilters > 0
                        ? { borderColor: '#f59e0b', background: '#f59e0b10', color: '#92400e' }
                        : { borderColor: '#e5e7eb', background: '#fff', color: '#6b7280' }
                    }
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    <span>Filters</span>
                    {activeFilters > 0 && (
                      <span
                        className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-black text-white"
                        style={{ background: '#f59e0b' }}
                      >
                        {activeFilters}
                      </span>
                    )}
                  </button>
                </div>

                {/* ── Filter dropdown ── */}
                {filtersOpen && (
                  <div className="border border-gray-200 bg-white p-4 flex flex-col sm:flex-row gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">City</label>
                      <div className="flex flex-wrap gap-2">
                        {CITIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => setCity(c)}
                            className="px-3 py-1.5 text-xs font-bold border transition-colors"
                            style={
                              city === c
                                ? { background: '#f59e0b', borderColor: '#f59e0b', color: '#fff' }
                                : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }
                            }
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="hidden sm:block w-px bg-gray-100 self-stretch" />
                    <div className="block sm:hidden h-px bg-gray-100" />
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Item Type</label>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className="px-3 py-1.5 text-xs font-bold border transition-colors"
                            style={
                              category === c
                                ? { background: '#111', borderColor: '#111', color: '#fff' }
                                : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }
                            }
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    {activeFilters > 0 && (
                      <button
                        onClick={() => { setCity('All Cities'); setCategory('All Categories'); }}
                        className="self-end text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2 flex-shrink-0"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}

                {/* ── Results count ── */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {filtered.length} report{filtered.length !== 1 ? 's' : ''} found
                  </span>
                  <span className="text-xs text-gray-300">Sorted by most recent</span>
                </div>

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item) => (
                      <ItemCard key={item.id} item={item} variant="unlisted" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                    <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="text-sm font-semibold">No reports match your filters</p>
                    <p className="text-xs mt-1">Try a different keyword or clear the filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-10 border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-black text-gray-900">Lost something and don't see it here?</h2>
              <p className="text-sm text-gray-400 mt-1 max-w-md">Submit a report with as much detail as you can — even without a photo. Our AI will match it against any items that appear.</p>
            </div>
            <button
              onClick={() => navigate('/add-item')}
              className="flex items-center gap-2.5 px-6 py-3 text-sm font-black text-white tracking-wide transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: '#84cc16' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Submit My Report
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnlistedReports;
