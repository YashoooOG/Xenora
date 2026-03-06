import React, { useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import XenoraLogo from '../pictures/Screenshot 2026-02-24 110550.svg';

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
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return ref;
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const steps = [
  {
    num: '01',
    color: '#ef4444',
    title: 'Create Your Report',
    summary: 'Submit a detailed lost or found item report in under 60 seconds.',
    detail:
      'Describe the item — its category, colour, size, brand, and any unique identifiers. Add the last known location using our map picker or a simple address. Upload photos directly from your phone or computer. The more detail you add, the better the match accuracy.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    num: '02',
    color: '#38bdf8',
    title: 'Geo-Fenced Alert Network',
    summary: 'Your report is broadcast to verified finders within the same local radius.',
    detail:
      'Once submitted, Xenora pushes an alert to all active users within a configurable radius — default 5 km. Finders who have logged an item in that zone are notified instantly. This geo-fence model ensures your report reaches only locally relevant people, not the whole internet.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    color: '#86efac',
    title: 'Smart Match Engine',
    summary: 'Our AI cross-references descriptions, photos, and location data for high-confidence matches.',
    detail:
      "Xenora's matching engine compares colour profiles, object categories, text descriptions, and GPS proximity simultaneously. Each potential match is scored and ranked by confidence percentage. You only receive matches above a 70% confidence threshold — eliminating noise and false positives.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    num: '04',
    color: '#facc15',
    title: 'Verified Identity Check',
    summary: 'Both parties complete a lightweight identity check before exchanging contact details.',
    detail:
      'Before any personal information is shared, Xenora prompts both the reporter and the finder to verify their identity via phone number or government ID. This optional but encouraged step creates a verified badge on your profile and builds mutual confidence in the handover process.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    num: '05',
    color: '#a78bfa',
    title: 'In-App Secure Chat',
    summary: "Communicate through Xenora's encrypted messaging — no phone numbers shared until you choose.",
    detail:
      'Our end-to-end encrypted chat keeps both parties safe. You control when — and whether — to share your real contact details. Message history is retained for 30 days and can be used if a dispute arises. All chats are moderated by our trust & safety system for abuse detection.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    num: '06',
    color: '#34d399',
    title: 'Safe Handover & Confirmation',
    summary: 'Arrange a public meeting point, complete the handover, and confirm recovery in the app.',
    detail:
      'Xenora suggests safe, public handover spots near both parties. Once the item is returned, both sides confirm the recovery in-app. This closes the report, logs the successful outcome, and earns both parties trust reputation points — making the community stronger with every recovery.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

const trustPillars = [
  {
    color: '#ef4444',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'End-to-End Encrypted Messaging',
    body: 'Every conversation between a reporter and a finder is encrypted in transit and at rest. We use AES-256 encryption — the same standard used by banks. Your words are yours alone.',
  },
  {
    color: '#38bdf8',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'Community-Verified Profiles',
    body: "Every active user builds a trust score through successful recoveries, on-time handovers, and verified transactions. You can see a person's history before you choose to connect with them.",
  },
  {
    color: '#86efac',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'Anti-Fraud Detection',
    body: 'Our automated fraud system flags suspicious behaviour — mass claiming, duplicate reports, and pattern anomalies. Human moderators review flagged cases within 4 hours. Bad actors are permanently removed.',
  },
  {
    color: '#facc15',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Ownership Proof System',
    body: 'Before a match is confirmed, we prompt the claimer to provide ownership evidence — serial numbers, receipts, or unique identifiers only the real owner would know. This step alone eliminates the majority of fraudulent claims.',
  },
  {
    color: '#a78bfa',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Full Transparency Reports',
    body: "We publish quarterly transparency reports covering total recoveries, flagged abuse cases, resolution rates, and response times. We believe accountability is not optional — it's foundational.",
  },
  {
    color: '#34d399',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Zero Monetisation of Your Data',
    body: 'We do not sell, rent, or trade your personal data to third parties. Ever. Our revenue comes from optional premium features — not from your information. Your privacy is not a product.',
  },
];

const awards = [
  { icon: '🏆', title: 'Startup Impact Award 2025', org: 'TechFounders Summit' },
  { icon: '🌐', title: 'Best Community Platform', org: 'Digital Good Awards' },
  { icon: '🚀', title: 'Top 50 Emerging Tech Platforms', org: 'Forbes Tech 2025' },
  { icon: '💡', title: 'Innovation for Good Recognition', org: 'UN Tech Initiative' },
];

/* ─────────────────────────────────────────
   STEP CARD (detail expanded)
───────────────────────────────────────── */
const StepCard = ({ step, delay }) => {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className="reveal border border-gray-200 bg-white hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] transition-all duration-300" style={{ borderLeft: `3px solid ${step.color}` }}>
      <div className="flex items-start gap-5 p-6 border-b border-gray-100">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center" style={{ background: `${step.color}18`, color: step.color }}>
          {step.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-black tracking-widest" style={{ color: step.color }}>{step.num}</span>
            <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
          </div>
          <p className="text-sm font-medium text-gray-500">{step.summary}</p>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   TRUST PILLAR CARD
───────────────────────────────────────── */
const TrustCard = ({ pillar, delay }) => {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className="reveal border border-gray-100 bg-white p-6 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300" style={{ borderTop: `3px solid ${pillar.color}` }}>
      <div className="w-11 h-11 flex items-center justify-center mb-5" style={{ background: `${pillar.color}18`, color: pillar.color }}>
        {pillar.icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{pillar.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{pillar.body}</p>
    </div>
  );
};

/* ─────────────────────────────────────────
   NAVBAR (shared style)
───────────────────────────────────────── */
const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
    <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center flex-shrink-0">
        <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
      </a>
      <div className="flex items-center gap-4">
        <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">← Back to Home</a>
      </div>
    </nav>
  </header>
);

/* ─────────────────────────────────────────
   PAGE HERO
───────────────────────────────────────── */
const PageHero = () => {
  const ref = useReveal();

  return (
    <section className="pt-12 pb-10 px-8 sm:px-12 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="reveal">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>Why Xenora</span>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mt-3 mb-4 leading-[1.05]">
            Why Trust Us.<br />
            <span className="relative inline-block">
              How We Work.
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7 Q75 2 150 6 Q225 10 298 3" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            We built Xenora on a foundation of transparency, security, and community. This page explains exactly how the platform works, how we protect you, and why thousands of people trust us with their most stressful moments.
          </p>
        </div>


      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   HOW IT WORKS (detailed)
───────────────────────────────────────── */
const HowItWorksSection = () => {
  const ref = useReveal();
  return (
    <section className="py-10 px-8 sm:px-12 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="reveal mb-14">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>The Full Process</span>
          <h2 className="text-4xl font-black text-gray-900 mt-3 mb-4">How Xenora Works — Step by Step</h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            From the moment you submit a report to the moment you hold your item again — here's exactly what happens inside Xenora.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   WHY TRUST US (6 pillars)
───────────────────────────────────────── */
const WhyTrustSection = () => {
  const ref = useReveal();
  return (
    <section className="py-10 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal mb-14">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>Security & Trust</span>
          <h2 className="text-4xl font-black text-gray-900 mt-3 mb-4">Built to Protect You</h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            Every design decision we make starts with one question: <em className="text-gray-700 not-italic font-semibold">"Does this keep our users safe?"</em> Here's how we answer that question at every layer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, i) => (
            <TrustCard key={pillar.title} pillar={pillar} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   FOUNDER & AWARDS
───────────────────────────────────────── */
const FounderSection = () => {
  const leftRef = useReveal();
  const rightRef = useReveal(200);
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

          {/* Left — founder portrait */}
          <div ref={leftRef} className="reveal flex-shrink-0">
            <div className="relative">
              <div className="w-64 h-80 overflow-hidden border border-gray-200 shadow-[0_16px_56px_rgba(0,0,0,0.1)]">
                <img
                  src="https://api.dicebear.com/9.x/personas/svg?seed=ArjunMehra&backgroundColor=e5e7eb,d1d5db&scale=110"
                  alt="Arjun Mehra — Founder of Xenora"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-200">
                <div className="text-xs text-gray-400 mb-0.5">Founder & CEO</div>
                <div className="font-black text-gray-900 text-sm">Arjun Mehra</div>
                <div className="text-xs text-gray-400 mt-0.5">Xenora, 2024</div>
              </div>
            </div>
          </div>

          {/* Right — story + awards */}
          <div ref={rightRef} className="reveal flex-1 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Our Story</span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-3 mb-6">Built With Purpose</h2>

            <div className="space-y-4 text-gray-500 leading-relaxed mb-10">
              <p>
                In 2023, <strong className="text-gray-800">Arjun Mehra</strong> lost his laptop bag at a busy airport terminal during a red-eye flight to London. Despite checking every lost and found desk and filing a police report, he never recovered it.
              </p>
              <p>
                That frustration sparked a simple question: <em className="text-gray-700">"Why isn't there a platform that matches lost items with found reports in real-time, locally?"</em>
              </p>
              <p>
                Six months of building later, Xenora launched in three cities. Within a year it had grown to 120+ cities and facilitated over 50,000 recoveries — without any paid advertising. Every user came through word-of-mouth from someone who had their item returned.
              </p>
              <p>
                The founding principle has never changed: <strong className="text-gray-800">technology should reconnect people, not exploit them.</strong> That principle shapes every product decision we make.
              </p>
            </div>

            {/* Awards grid */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-5">Recognition &amp; Awards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {awards.map((award) => (
                  <div
                    key={award.title}
                    className="flex items-start gap-3 p-4 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-200"
                  >
                    <span className="text-xl flex-shrink-0">{award.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900 leading-tight">{award.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{award.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const WhyTrustUs = () => (
  <div className="min-h-screen bg-white overflow-x-hidden">
    {/* Decorative background grid */}
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
    {/* Lime accent blob — top right */}
    <div
      className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.08) 0%, transparent 70%)' }}
    />
    {/* Neutral blob — bottom left */}
    <div
      className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)' }}
    />
    <Navbar />
    <main className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-12">
        <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)]">
          <PageHero />
          <HowItWorksSection />
          <WhyTrustSection />
          {/* <FounderSection /> */}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default WhyTrustUs;
