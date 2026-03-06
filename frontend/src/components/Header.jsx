import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import XenoraLogo from '../pictures/Screenshot 2026-02-24 110550.svg';

/* Placeholder user — swap with real auth context once backend is ready */
const CURRENT_USER = {
  name: 'Tanishq Verma',
  avatar:
    'https://avatars.githubusercontent.com/u/185518962?s=400&u=3064ad82532b7b0473ef22110b342e4bf760aeb3&v=4',
};

/* Unread count — swap with real notification context once backend is ready */
const UNREAD_COUNT = 3;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifPulse, setNotifPulse] = useState(true);

  /* Stop pulsing after 4s so it's not distracting */
  useEffect(() => {
    const t = setTimeout(() => setNotifPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const onAddItemPage = location.pathname === '/add-item';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
        </a>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Add Item / Find Item — swaps based on current page */}
          {onAddItemPage ? (
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-white tracking-wide transition-opacity hover:opacity-90"
              style={{ background: '#84cc16' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Find Item</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/add-item')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-white tracking-wide transition-opacity hover:opacity-90"
              style={{ background: '#84cc16' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Add Item</span>
            </button>
          )}

          {/* Notification bell */}
          <button
            onClick={() => navigate('/chat')}
            className="relative flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {/* Badge */}
            <span
              className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-[9px] font-black text-white px-0.5"
              style={{ background: '#84cc16' }}
            >
              {UNREAD_COUNT}
            </span>
            {/* Pulse ring */}
            {notifPulse && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping opacity-60"
                style={{ background: '#84cc16' }}
              />
            )}
          </button>

          {/* Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 px-3 py-2 border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-5 h-5 rounded-full object-cover border border-gray-100"
            />
            <span className="hidden sm:block">Dashboard</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
