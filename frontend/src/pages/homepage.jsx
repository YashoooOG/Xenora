import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';

/* ─────────────────────────────────────────
   DUMMY LISTED ITEMS
───────────────────────────────────────── */
const DUMMY_ITEMS = [
  {
    id: 'XN-3001',
    title: 'Black Leather Wallet',
    category: 'Accessories',
    city: 'Delhi',
    location: 'Connaught Place, New Delhi',
    date: 'Mar 2, 2026',
    description: 'Black bifold wallet with initials "A.K." engraved. Contains ID card and a few bank cards.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=280&fit=crop',
    user: { name: 'Amit K.', avatar: 'https://i.pravatar.cc/32?img=11' },
  },
  {
    id: 'XN-2998',
    title: 'iPhone 15 Pro (Blue)',
    category: 'Electronics',
    city: 'Delhi',
    location: 'Delhi University North Campus, Delhi',
    date: 'Mar 1, 2026',
    description: 'Lost near the cafeteria. Screen has a small crack on top-left corner. No SIM inside.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=280&fit=crop',
    user: { name: 'Sneha R.', avatar: 'https://i.pravatar.cc/32?img=5' },
  },
  {
    id: 'XN-2975',
    title: 'Student ID Card',
    category: 'Documents',
    city: 'Lucknow',
    location: 'Hazratganj Market, Lucknow',
    date: 'Feb 27, 2026',
    description: 'Blue student ID card. Name: Harsh M. If found please contact via Xenora.',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&h=280&fit=crop',
    user: { name: 'Harsh M.', avatar: 'https://i.pravatar.cc/32?img=8' },
  },
  {
    id: 'XN-2960',
    title: 'Laptop Bag (Grey)',
    category: 'Bags',
    city: 'Delhi',
    location: 'Indira Gandhi International Airport, Delhi',
    date: 'Feb 25, 2026',
    description: 'Grey laptop bag misplaced in Terminal 3. Contains a charger and some notebooks inside.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=280&fit=crop',
    user: { name: 'Neha V.', avatar: 'https://i.pravatar.cc/32?img=20' },
  },
  {
    id: 'XN-2941',
    title: 'AirPods Pro Case',
    category: 'Electronics',
    city: 'Mumbai',
    location: 'Phoenix Marketcity, Mumbai',
    date: 'Feb 23, 2026',
    description: 'White AirPods Pro charging case. Has a small black sticker on the back.',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?w=400&h=280&fit=crop',
    user: { name: 'Zara T.', avatar: 'https://i.pravatar.cc/32?img=47' },
  },
  {
    id: 'XN-2920',
    title: 'House Keys (3-ring set)',
    category: 'Keys',
    city: 'Bangalore',
    location: 'MG Road, Bangalore',
    date: 'Feb 20, 2026',
    description: 'Set of 3 keys on a red keychain with a small metal tag that reads "Home".',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop',
    user: { name: 'Rohan B.', avatar: 'https://i.pravatar.cc/32?img=33' },
  },
  {
    id: 'XN-2905',
    title: 'Navy Blue Backpack',
    category: 'Bags',
    city: 'Delhi',
    location: 'Select Citywalk Mall, Saket, Delhi',
    date: 'Feb 18, 2026',
    description: 'Navy blue backpack with a laptop sleeve. Brand: Targus. Has a torn zipper on front pocket.',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=280&fit=crop',
    user: { name: 'Priya A.', avatar: 'https://i.pravatar.cc/32?img=29' },
  },
  {
    id: 'XN-2890',
    title: 'Prescription Glasses',
    category: 'Accessories',
    city: 'Mumbai',
    location: 'Juhu Beach, Mumbai',
    date: 'Feb 16, 2026',
    description: 'Black rectangular frame glasses. Comes with a brown case.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=280&fit=crop',
    user: { name: 'Imran S.', avatar: 'https://i.pravatar.cc/32?img=15' },
  },
];
const CITIES = [
  'All Cities',
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Lucknow',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Chennai'
];

const CATEGORIES = [
  'All Categories',
  'Electronics',
  'Bags',
  'Accessories',
  'Documents',
  'Keys',
  'Clothing',
  'Wallets',
  'Phones',
  'Other'
];

/* ─────────────────────────────────────────
   FIND ITEM PANEL
───────────────────────────────────────── */
const FindItemPanel = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All Cities');
  const [category, setCategory] = useState('All Categories');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = DUMMY_ITEMS.filter((item) => {
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

        {/* Filter toggle button */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 px-3 sm:px-4 border text-xs font-bold transition-colors flex-shrink-0"
          style={
            filtersOpen || activeFilters > 0
              ? { borderColor: '#84cc16', background: '#84cc1610', color: '#4d7c0f' }
              : { borderColor: '#e5e7eb', background: '#fff', color: '#6b7280' }
          }
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
          {activeFilters > 0 && (
            <span
              className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-black text-white"
              style={{ background: '#84cc16' }}
            >
              {activeFilters}
            </span>
          )}
        </button>

        {/* Unlisted reports button */}
        <button
          onClick={() => navigate('/unlisted')}
          className="flex items-center gap-2 px-3 sm:px-4 border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          <span className="hidden sm:inline">Unlisted Reports</span>
        </button>
      </div>

      {/* ── Filter dropdown ── */}
      {filtersOpen && (
        <div className="border border-gray-200 bg-white p-4 flex flex-col sm:flex-row gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          {/* City filter */}
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
                      ? { background: '#84cc16', borderColor: '#84cc16', color: '#fff' }
                      : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-100 self-stretch" />
          <div className="block sm:hidden h-px bg-gray-100" />
          {/* Category filter */}
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
          {/* Clear */}
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
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} listed
        </span>
        <span className="text-xs text-gray-300">Sorted by most recent</span>
      </div>

      {/* ── Item grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} variant="listed" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
          <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-sm font-semibold">No items match your filters</p>
          <p className="text-xs mt-1">Try a different keyword or clear the filters</p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const Homepage = () => {
  const navigate = useNavigate();

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
      {/* Lime blob */}
      <div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.08) 0%, transparent 70%)' }}
      />
      {/* Neutral blob */}
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)' }}
      />

      <Header />

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12">
          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)]">

            {/* Section content */}
            <div className="p-6 sm:p-10">
              <FindItemPanel />
            </div>

          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-10 border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-black text-gray-900">Can't find your item above?</h2>
              <p className="text-sm text-gray-400 mt-1 max-w-md">List your missing item so others can help. Our AI will try to match it with any new reports that come in.</p>
            </div>
            <button
              onClick={() => navigate('/add-item')}
              className="flex items-center gap-2.5 px-6 py-3 text-sm font-black text-white tracking-wide transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: '#84cc16' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              List My Missing Item
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
