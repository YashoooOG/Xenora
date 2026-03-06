import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import XenoraLogo from '../pictures/Screenshot 2026-02-24 110550.svg';

/* ─────────────────────────────────────────
   Eye icon (show/hide password)
───────────────────────────────────────── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

/* ─────────────────────────────────────────
   Google icon
───────────────────────────────────────── */
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

/* ─────────────────────────────────────────
   GitHub icon
───────────────────────────────────────── */
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ─────────────────────────────────────────
   Divider
───────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs text-gray-400 font-medium">or continue with</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

/* ─────────────────────────────────────────
   Input field
───────────────────────────────────────── */
const Field = ({ label, type, placeholder, value, onChange, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-sm border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200"
      />
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   FORGOT PASSWORD FORM
───────────────────────────────────────── */
const ForgotForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mb-7">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Reset password.</h2>
        <p className="text-sm text-gray-500 mt-2">We'll send a reset link to your email.</p>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="w-12 h-12 flex items-center justify-center" style={{ background: '#84cc1615' }}>
            <svg className="w-6 h-6" style={{ color: '#84cc16' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Check your inbox</p>
            <p className="text-xs text-gray-400 mt-1">We sent a reset link to <strong>{email}</strong></p>
          </div>
          <button onClick={onBack} className="text-xs font-bold text-gray-500 hover:text-gray-900 mt-2">← Back to Sign In</button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button
            type="button"
            onClick={() => { if (email.trim()) setSent(true); }}
            className="w-full py-3.5 bg-gray-900 text-white text-sm font-bold tracking-wide hover:bg-black transition-colors duration-200"
          >
            Send Reset Link
          </button>
          <button onClick={onBack} className="text-xs font-bold text-gray-500 hover:text-gray-900 mt-4 text-center block w-full">← Back to Sign In</button>
        </>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────── */
const LoginForm = ({ onSwitch, onForgot }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <div className="mb-7">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">
          Welcome{' '}
          <span className="relative inline-block">
            back.
            <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 80 6" fill="none" preserveAspectRatio="none">
              <path d="M1 4 Q20 1 40 3 Q60 5 79 2" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            </svg>
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">Sign in to your Xenora account.</p>
      </div>

      {/* OAuth */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
          <GoogleIcon />
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
          <GithubIcon />
          Continue with GitHub
        </button>
      </div>

      <Divider />

      {/* Fields */}
      <div className="flex flex-col gap-4">
        <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Field label="Password" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}>
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <EyeIcon open={showPw} />
          </button>
        </Field>
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mt-3 mb-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            className="w-3.5 h-3.5 accent-gray-900 cursor-pointer"
          />
          <span className="text-xs text-gray-500">Remember me</span>
        </label>
        <button type="button" onClick={onForgot} className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium">
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="button"
        className="w-full py-3.5 bg-gray-900 text-white text-sm font-bold tracking-wide hover:bg-black transition-colors duration-200"
      >
        Sign In
      </button>

      {/* Switch */}
      <p className="text-center text-xs text-gray-500 mt-5">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="font-bold text-gray-900 hover:underline transition-all">
          Sign up free
        </button>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────
   SIGNUP FORM
───────────────────────────────────────── */
const SignupForm = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <div className="mb-7">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">
          Join{' '}
          <span className="relative inline-block">
            Xenora.
            <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" fill="none" preserveAspectRatio="none">
              <path d="M1 4 Q25 1 50 3 Q75 5 99 2" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            </svg>
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">Create your free account and start recovering.</p>
      </div>

      {/* OAuth */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
          <GoogleIcon />
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
          <GithubIcon />
          Continue with GitHub
        </button>
      </div>

      <Divider />

      {/* Fields */}
      <div className="flex flex-col gap-4">
        <Field label="Full Name" type="text" placeholder="e.g. Tanishq Verma" value={name} onChange={e => setName(e.target.value)} />
        <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Field label="Password" type={showPw ? 'text' : 'password'} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)}>
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <EyeIcon open={showPw} />
          </button>
        </Field>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 cursor-pointer select-none mt-4 mb-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="w-3.5 h-3.5 mt-0.5 accent-gray-900 flex-shrink-0 cursor-pointer"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to the{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 font-semibold hover:underline">Privacy Policy</a>.
        </span>
      </label>

      {/* Submit */}
      <button
        type="button"
        className="w-full py-3.5 bg-gray-900 text-white text-sm font-bold tracking-wide hover:bg-black transition-colors duration-200"
      >
        Create Account
      </button>

      {/* Switch */}
      <p className="text-center text-xs text-gray-500 mt-5">
        Already have an account?{' '}
        <button onClick={onSwitch} className="font-bold text-gray-900 hover:underline transition-all">
          Sign in
        </button>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center flex-shrink-0">
        <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
      </a>
      <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        ← Back to Home
      </a>
    </nav>
  </header>
);

/* ─────────────────────────────────────────
   SLIDING PANEL
───────────────────────────────────────── */
const TRANSITION_MS = 400;

const SlidingPanel = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState(null);
  const timerRef = useRef(null);

  const switchTo = (target) => {
    if (sliding || target === mode) return;
    const dir = (target === 'signup' || target === 'forgot') ? 'left' : 'right';
    setDirection(dir);
    setSliding(true);
    timerRef.current = setTimeout(() => {
      setMode(target);
      setSliding(false);
      setDirection(null);
    }, TRANSITION_MS);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const panelStyle = {
    transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), opacity ${TRANSITION_MS}ms ease`,
    transform: sliding
      ? direction === 'left' ? 'translateX(-48px)' : 'translateX(48px)'
      : 'translateX(0)',
    opacity: sliding ? 0 : 1,
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab switcher — hidden on forgot screen */}
      {mode !== 'forgot' && (
        <div className="flex mb-8 border border-gray-200 bg-gray-50 p-1 gap-1">
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              onClick={() => switchTo(tab)}
              className="flex-1 py-2.5 text-sm font-bold capitalize transition-all duration-300"
              style={
                mode === tab
                  ? { background: '#111', color: '#fff' }
                  : { background: 'transparent', color: '#6b7280' }
              }
            >
              {tab === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
      )}

      {/* Form panel */}
      <div style={panelStyle}>
        {mode === 'login' && <LoginForm onSwitch={() => switchTo('signup')} onForgot={() => switchTo('forgot')} />}
        {mode === 'signup' && <SignupForm onSwitch={() => switchTo('login')} />}
        {mode === 'forgot' && <ForgotForm onBack={() => switchTo('login')} />}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAGE LAYOUT
───────────────────────────────────────── */
const LoginPage = () => (
  <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
    <Navbar />

    {/* Decorative background grid */}
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />

    {/* Lime accent blob — top right */}
    <div
      className="fixed top-0 right-0 w-96 h-96 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at top right, rgba(132,204,22,0.08) 0%, transparent 70%)',
      }}
    />
    {/* Neutral blob — bottom left */}
    <div
      className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)',
      }}
    />

    {/* Center the card */}
    <main className="flex-1 flex items-center justify-center px-4 py-24 relative z-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.08)] px-8 py-10 sm:px-10">
          <SlidingPanel />
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
          By continuing, you acknowledge that you have read and agree to Xenora's{' '}
          <a href="#" className="text-gray-600 hover:underline">Terms</a>{' '}
          and{' '}
          <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default LoginPage;
