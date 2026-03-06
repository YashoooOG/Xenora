import React, { useState, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const CATEGORIES = ['Electronics', 'Bags', 'Accessories', 'Documents', 'Keys', 'Clothing', 'Other'];

/* ─────────────────────────────────────────
   FORM HELPERS
───────────────────────────────────────── */
const FieldLabel = ({ children, required, hint }) => (
  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
    {children}
    {required && <span className="ml-0.5 text-red-400">*</span>}
    {hint && <span className="ml-2 font-normal normal-case text-gray-300">{hint}</span>}
  </label>
);

const FormInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-500 transition-colors bg-white"
  />
);

const FormSelect = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-gray-500 transition-colors bg-white"
  >
    {children}
  </select>
);

const SectionDivider = ({ children }) => (
  <div className="flex items-center gap-3 pt-2">
    <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#84cc16' }}>{children}</span>
    <span className="flex-1 h-px bg-gray-100" />
  </div>
);

/* ─────────────────────────────────────────
   ADD ITEM PANEL
───────────────────────────────────────── */
const AddItemPanel = () => {
  const [type, setType] = useState('lost');
  const [photos, setPhotos] = useState([]);
  const [mapPinned, setMapPinned] = useState(false);
  const fileRef = useRef(null);

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls].slice(0, 5));
  };

  const accentColor = type === 'lost' ? '#ef4444' : '#34d399';

  return (
    <div className="flex flex-col gap-6">
      {/* Info banner */}
      <div
        className="border border-gray-200 p-5 flex flex-col sm:flex-row gap-5 items-start"
        style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f9fffe 100%)' }}
      >
        <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center" style={{ background: '#84cc1615', color: '#84cc16' }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-black text-gray-900 mb-1">How Xenora works</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">Report a lost or found item — our AI matches it against existing reports. Verified users coordinate a secure handover. No personal details shared until both sides agree.</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {['AI-Powered Matching', 'Verified Handovers', 'Privacy First'].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#84cc16' }} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        {/* Header with Lost/Found toggle */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Report Details</span>
          <div className="flex border border-gray-200">
            {[{ key: 'lost', label: 'I Lost It' }, { key: 'found', label: 'I Found It' }].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setType(key)}
                className="px-4 py-1.5 text-xs font-bold transition-colors"
                style={type === key ? { background: accentColor, color: '#fff' } : { background: 'transparent', color: '#9ca3af' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">

          {/* ── BASIC INFO ── */}
          <SectionDivider>Basic Info</SectionDivider>

          {/* Item name */}
          <div>
            <FieldLabel required>Item Name</FieldLabel>
            <FormInput type="text" placeholder="e.g. Black leather wallet" />
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Category</FieldLabel>
              <FormSelect>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </FormSelect>
            </div>
            <div>
              <FieldLabel>Subcategory</FieldLabel>
              <FormInput type="text" placeholder="e.g. Bifold wallet, Backpack…" />
            </div>
          </div>

          {/* Brand + Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Brand / Make</FieldLabel>
              <FormInput type="text" placeholder="e.g. Nike, Apple, Samsonite" />
            </div>
            <div>
              <FieldLabel>Primary Color</FieldLabel>
              <FormSelect>
                <option value="">Select color</option>
                {['Black', 'White', 'Brown', 'Grey', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Pink', 'Purple', 'Silver', 'Gold', 'Multicolor', 'Other'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </FormSelect>
            </div>
          </div>

          {/* Size / Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Model / Size</FieldLabel>
              <FormInput type="text" placeholder="e.g. iPhone 15 Pro, Large" />
            </div>
            <div>
              <FieldLabel>Serial / ID Number</FieldLabel>
              <FormInput type="text" placeholder="e.g. IMEI, serial no." />
            </div>
          </div>

          {/* Condition + Reward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Condition</FieldLabel>
              <FormSelect>
                <option value="">Select condition</option>
                {['New / Mint', 'Good', 'Fair', 'Worn / Damaged', 'Unknown'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </FormSelect>
            </div>
            {type === 'lost' && (
              <div>
                <FieldLabel>Reward Offered</FieldLabel>
                <FormInput type="text" placeholder="e.g. PKR 500, or leave blank" />
              </div>
            )}
          </div>

          {/* ── WHEN & WHERE ── */}
          <SectionDivider>When & Where</SectionDivider>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Date</FieldLabel>
              <FormInput type="date" />
            </div>
            <div>
              <FieldLabel>Approximate Time</FieldLabel>
              <FormInput type="time" />
            </div>
          </div>

          {/* Location text */}
          <div>
            <FieldLabel required>Location Description</FieldLabel>
            <FormInput type="text" placeholder="e.g. Liberty Market, Lahore — near Gate 3" />
          </div>

          {/* Map pin placeholder */}
          <div>
            <FieldLabel>Pin on Map <span className="font-normal normal-case text-gray-300">(optional)</span></FieldLabel>
            <div
              className="border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors hover:border-gray-400 group"
              onClick={() => setMapPinned((v) => !v)}
              style={mapPinned ? { borderColor: '#84cc16', background: '#84cc1608' } : {}}
            >
              <div
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{ background: mapPinned ? '#84cc1620' : '#f3f4f6', color: mapPinned ? '#84cc16' : '#9ca3af' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              {mapPinned ? (
                <div className="text-center">
                  <p className="text-xs font-black" style={{ color: '#84cc16' }}>Location Pinned</p>
                  <p className="text-xs text-gray-400 mt-0.5">Interactive map coming soon — click to remove pin</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-black text-gray-500 group-hover:text-gray-700">Click to Pin Location on Map</p>
                  <p className="text-xs text-gray-300 mt-0.5">Interactive map picker — coming soon</p>
                </div>
              )}
            </div>
          </div>

          {/* ── DETAILS ── */}
          <SectionDivider>Additional Details</SectionDivider>

          {/* Unique identifiers / markings */}
          <div>
            <FieldLabel>Unique Markings / Identifiers</FieldLabel>
            <FormInput type="text" placeholder="e.g. Sticker on back, engraved initials, scratch on corner" />
          </div>

          {/* Description */}
          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              rows={3}
              placeholder="Describe the item in detail — contents, distinguishing features, packaging, sentimental value…"
              className="w-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-500 transition-colors bg-white resize-none"
            />
          </div>

          {/* ── PHOTOS ── */}
          <SectionDivider>Photos</SectionDivider>

          <div>
            <FieldLabel hint="up to 5">Photos</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {photos.map((url, i) => (
                <div key={i} className="relative w-20 h-20 border border-gray-200 overflow-hidden flex-shrink-0">
                  <img src={url} alt={`photo-${i}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                    className="absolute top-0.5 right-0.5 w-5 h-5 flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                  >×</button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={() => fileRef.current.click()}
                  className="w-20 h-20 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-300 hover:border-gray-400 hover:text-gray-400 transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-xs font-bold">Add</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
          </div>

          {/* Submit */}
          <button
            className="mt-2 w-full py-3 text-sm font-black text-white tracking-wide transition-opacity hover:opacity-90"
            style={{ background: accentColor }}
          >
            {type === 'lost' ? 'Submit Lost Report' : 'Submit Found Report'}
          </button>

        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const AddLostItem = () => {
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
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Report an Item</h1>
            <p className="text-sm text-gray-400 mt-1">Fill in the details below and our AI will match it against existing reports.</p>
          </div>

          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <span style={{ color: '#84cc16' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-sm font-black text-gray-900">Add Item</span>
              <span className="text-xs text-gray-400 font-medium">— Report lost or found</span>
            </div>

            <div className="p-6 sm:p-10">
              <AddItemPanel />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddLostItem;
