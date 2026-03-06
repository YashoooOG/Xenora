import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────
   REUSABLE ITEM CARD
   Props:
     item: {
       id, title, category, location, date,
       image (optional — null/undefined = placeholder),
       user: { name, avatar }
     }
   variant: 'listed' | 'unlisted'  (default: 'listed')
───────────────────────────────────────── */
const ItemCard = ({ item, variant = 'listed' }) => {
  const navigate = useNavigate();
  const hasImage = item.image && item.image.trim() !== '';

  return (
    <div className="border border-gray-200 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer">

      {/* ── Image area (fixed height, always present) ── */}
      <div className="relative w-full h-48 flex-shrink-0 bg-gray-50 overflow-hidden">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* No-image placeholder */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50">
            <span className="text-5xl select-none" role="img" aria-label="no image">🖼️</span>
            <span className="text-xs font-semibold text-gray-300 tracking-wide">No image provided</span>
          </div>
        )}

        {/* Category pill — top right */}
        <span
          className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 bg-white border border-gray-200 text-gray-600 shadow-sm"
        >
          {item.category}
        </span>

        {/* Unlisted badge */}
        {variant === 'unlisted' && (
          <span
            className="absolute top-2 left-2 text-xs font-black uppercase px-2 py-0.5 text-white"
            style={{ background: '#f59e0b' }}
          >
            Unlisted
          </span>
        )}
      </div>

      {/* ── Info area ── */}
      <div className="flex flex-col gap-2 p-4">
        {/* Title */}
        <h3 className="text-sm font-black text-gray-900 leading-snug line-clamp-2">{item.title}</h3>

        {/* Location */}
        <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
          <svg className="w-3 h-3 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{item.location}</span>
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Footer: listed by + date + action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-5 h-5 rounded-full object-cover border border-gray-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xs text-gray-500 font-semibold truncate block max-w-[90px]">{item.user.name}</span>
              <span className="text-xs text-gray-300 block">{item.date}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/item')}
            className="text-xs font-black px-3 py-1.5 flex-shrink-0 transition-colors border"
            style={{ borderColor: '#84cc16', color: '#4d7c0f', background: '#84cc1612' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
