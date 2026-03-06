import React, { useEffect, useRef, useState } from 'react';
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
   Micro components
───────────────────────────────────────── */
const Stars = ({ count = 5 }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Avatar = ({ seed, size = 44 }) => (
    <img
        src={`https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=e5e7eb,d1d5db,f3f4f6,c7d2fe,fde68a`}
        alt={seed}
        width={size}
        height={size}
        className="object-cover border-2 border-white shadow-sm"
        style={{ width: size, height: size, borderRadius: '50%' }}
    />
);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const reviews = [
    {
        seed: 'Ayesha',
        name: 'Ayesha Rauf',
        location: 'Lahore, PK',
        stars: 5,
        tag: 'Wallet Recovery',
        tagColor: '#ef4444',
        date: 'Feb 2026',
        text: "I lost my wallet at a shopping mall and genuinely thought it was gone forever. Posted on Xenora and within 3 hours someone had found it near a food court. The verification process made me feel safe — I knew exactly who I was meeting. This platform is a lifesaver.",
    },
    {
        seed: 'Rohan',
        name: 'Rohan Kapoor',
        location: 'Mumbai, IN',
        stars: 5,
        tag: 'Passport Found',
        tagColor: '#38bdf8',
        date: 'Jan 2026',
        text: "Lost my passport two days before an international flight. My mom was panicking more than me. Xenora matched me with a finder at the same train station in under an hour. Got it back same evening. No paid ads, no scams — just real people helping real people.",
    },
    {
        seed: 'Sara',
        name: 'Sara Imtiaz',
        location: 'Karachi, PK',
        stars: 5,
        tag: 'Keys Returned',
        tagColor: '#86efac',
        date: 'Feb 2026',
        text: "Dropped my car keys somewhere between the university library and the bus stop. I was ready to call a locksmith. A girl from my own campus had already posted them on Xenora. We met the next morning. The geo-fenced alerts are incredibly smart — it only showed my post to nearby students.",
    },
    {
        seed: 'Bilal',
        name: 'Bilal Siddiqui',
        location: 'Islamabad, PK',
        stars: 4,
        tag: 'Laptop Bag',
        tagColor: '#facc15',
        date: 'Dec 2025',
        text: "Found a laptop bag on a metro station bench. Didn't know what to do with it. Uploaded it to Xenora, the owner got a match notification and contacted me within two hours. Honestly I was impressed how smooth the handover was. Would have given 5 stars but the photo upload was a bit slow.",
    },
    {
        seed: 'Neha',
        name: 'Neha Verma',
        location: 'Delhi, IN',
        stars: 5,
        tag: 'AirPods Case',
        tagColor: '#a78bfa',
        date: 'Jan 2026',
        text: "Okay I know it's just AirPods but they were a gift and I was devastated. Posted on Xenora expecting nothing. Someone found them in a café and had already uploaded a found report before I even searched. The AI match system is genuinely impressive. Thank you Xenora team!",
    },
    {
        seed: 'Omar',
        name: 'Omar Farooq',
        location: 'Dubai, UAE',
        stars: 5,
        tag: 'Phone Recovered',
        tagColor: '#fb923c',
        date: 'Feb 2026',
        text: "Left my phone in an Uber. Driver didn't respond. Posted on Xenora with the route details and a user who had found it at the same area reached out. Verified, handed over, done. The identity check gave both of us confidence. This is what community-driven tech should look like.",
    },
    {
        seed: 'Fatima',
        name: 'Fatima Malik',
        location: 'Lahore, PK',
        stars: 5,
        tag: 'Travel Bag',
        tagColor: '#34d399',
        date: 'Mar 2026',
        text: "Xenora is different because it actually cares. Other platforms are just forums. Xenora actively matches, notifies locally, and protects both sides. I got my travel bag back at an airport. The person who found it said they used Xenora because they trusted the verification system. Build more platforms like this!",
    },
    {
        seed: 'Zara',
        name: 'Zara Hussain',
        location: 'Karachi, PK',
        stars: 5,
        tag: 'Student ID Card',
        tagColor: '#38bdf8',
        date: 'Nov 2025',
        text: "Lost my university ID right before exams — I was spiralling. Posted on Xenora and a classmate I'd never met had found it in the campus cafeteria. We connected through the platform safely. I never expected something this simple to work this well. Everyone at my uni uses it now.",
    },
];

const navLinks = [
    { label: 'Discover', href: '/#' },
    { label: 'Reclaimers Review', href: '/reclaimerreview' },
    { label: 'Why Trust Us', href: '/whytrsutus' },
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
            className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
                : 'bg-white/80 backdrop-blur-sm'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="/" className="flex items-center flex-shrink-0">
                    <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
                </a>

                <a href="/" className="hidden md:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">← Back to Home</a>

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

            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4 shadow-lg">
                    <a href="/" className="text-gray-600 font-medium text-sm py-1">← Back to Home</a>
                </div>
            )}
        </header>
    );
};

/* ─────────────────────────────────────────
   FOUNDER BLOG SECTION
───────────────────────────────────────── */
const FounderNote = () => {
    const ref = useReveal();
    const imgRef = useReveal(150);

    return (
        <section className="pt-12 pb-10 px-8 sm:px-12 border-b border-gray-100">
            <div className="max-w-5xl mx-auto">
                {/* Label */}
                <div className="flex items-center gap-3 mb-10">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">From the Founder</span>
                    <span className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-14">

                    {/* Left — founder card */}
                    <div ref={imgRef} className="reveal flex-shrink-0 flex flex-col items-center lg:items-start">
                        <div className="relative">
                            <div
                                className="w-52 h-64 overflow-hidden border border-gray-200 shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
                                style={{ borderRadius: '2px' }}
                            >
                                <img
                                    src="https://avatars.githubusercontent.com/u/185518962?s=400&u=3064ad82532b7b0473ef22110b342e4bf760aeb3&v=4"
                                    alt="Tanishq Verma — Founder, Xenora"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Name card */}
                            <div className="absolute -bottom-5 -right-5 bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-200">
                                <div className="text-xs text-gray-400 mb-0.5">Founder & Builder</div>
                                <div className="font-black text-gray-900 text-sm">Tanishq Verma</div>
                                <div className="text-xs text-gray-400 mt-0.5">Xenora, 2026</div>
                            </div>
                        </div>

                        {/* Quote chip below image */}
                        {/* <div className="mt-10 lg:mt-14 bg-gray-50 border border-gray-200 px-4 py-3 max-w-[208px] text-xs text-gray-500 leading-relaxed italic">
                "I'm not a startup guy. I'm just someone who got tired of losing things and finding no help."
                </div> */}
                    </div>

                    {/* Right — blog text */}
                    <div ref={ref} className="reveal flex-1">
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
                            I Built Xenora {' '}
                            {/* <span className="relative inline-block">
                I Am One Of You.
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 380 10" fill="none">
                  <path d="M2 8 Q95 2 190 6 Q285 10 378 4" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" opacity="1"/>
                </svg>
              </span> */}
                        </h1>

                        <div className="space-y-5 text-gray-500 leading-relaxed text-[15px]">
                            <p>
                                My name is <strong className="text-gray-800">Tanishq Verma</strong>, and I'm not a founder with a co-working space. I'm a second-year student who knows the feeling of losing something or someone important.
                            </p>
                            <p>
                                I noticed something simple — people lose things all the time. Phones, wallets, IDs, bags.
                                Most of the time someone nearby actually finds them, but there’s no easy way for the
                                two people to connect locally. It felt like a problem technology should already solve.
                            </p>
                            <p>
                                I'm just someone who enjoys building things that help people. If you like what I'm
                                building and want to support the project, you can buy me a coffee ☕
                                <a
                                    href="https://buymeacoffee.com/yashoooog"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lime-600 font-semibold hover:underline ml-1"
                                >
                                    here
                                </a>.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-8 flex items-center gap-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/185518962?s=400&u=3064ad82532b7b0473ef22110b342e4bf760aeb3&v=4"
                                alt="Tanishq Verma"
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div>
                                <div className="font-black text-gray-900 text-sm">Tanishq Verma</div>
                                <div className="text-xs text-gray-400">Founder, Xenora · Built with ❤️ for marks</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────── */
const ReviewCard = ({ review, delay }) => {
    const ref = useReveal(delay);
    return (
        <div ref={ref} className="reveal bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.11)] transition-shadow duration-300 p-6 flex flex-col gap-4" style={{ borderTop: `3px solid ${review.tagColor}` }}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Avatar seed={review.seed} size={44} />
                    <div>
                        <div className="font-bold text-gray-900 text-sm leading-tight">{review.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {review.location}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <Stars count={review.stars} />
                    <span className="text-xs text-gray-400">{review.date}</span>
                </div>
            </div>

            {/* Tag */}
            <div>
                <span
                    className="text-xs font-bold px-2.5 py-1 tracking-wide"
                    style={{ background: `${review.tagColor}18`, color: review.tagColor }}
                >
                    {review.tag}
                </span>
            </div>

            {/* Review text */}
            <p className="text-gray-500 text-sm leading-relaxed flex-1">"{review.text}"</p>

            {/* Footer */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-400 font-medium">Verified Reclaimer</span>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   ADD REVIEW POPUP
───────────────────────────────────────── */
const AddReviewPopup = ({ onClose }) => {
    const [hovered, setHovered] = useState(0);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !name.trim() || !message.trim()) return;
        setSubmitted(true);
        setTimeout(onClose, 1800);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className="bg-white border border-gray-200 shadow-[0_24px_64px_rgba(0,0,0,0.15)] w-full max-w-md p-8 relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {submitted ? (
                    <div className="text-center py-6">
                        <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="font-black text-gray-900 text-lg">Thanks for sharing!</div>
                        <p className="text-gray-400 text-sm mt-1">Your review means a lot to us.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Your Review</div>
                            <h3 className="text-xl font-black text-gray-900">How was your experience?</h3>
                        </div>

                        {/* Star rating */}
                        <div>
                            <label className="text-xs text-gray-400 font-medium mb-2 block">Rating</label>
                            <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => (
                                    <button
                                        key={i}
                                        type="button"
                                        onMouseEnter={() => setHovered(i)}
                                        onMouseLeave={() => setHovered(0)}
                                        onClick={() => setRating(i)}
                                        className="focus:outline-none"
                                    >
                                        <svg
                                            className={`w-7 h-7 transition-colors duration-100 ${
                                                i <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-200'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="e.g. Ayesha Rauf"
                                className="w-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your Story</label>
                            <textarea
                                rows={4}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Tell us what you recovered and how Xenora helped..."
                                className="w-full border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!rating || !name.trim() || !message.trim()}
                            className="w-full py-3 bg-gray-900 text-white font-bold text-sm hover:bg-black transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Submit Review
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   REVIEWS SECTION
───────────────────────────────────────── */
const ReviewsSection = () => {
    const titleRef = useReveal();
    const [showPopup, setShowPopup] = useState(false);
    return (
        <section className="py-10 px-8 sm:px-12">
            <div className="max-w-6xl mx-auto">
                <div ref={titleRef} className="reveal text-center mb-14">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Real People. Real Recoveries.</span>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-3 mb-4">
                        What Reclaimers Are Saying
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
                        These are unedited, honest reviews from people who used Xenora to recover what mattered most to them.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <ReviewCard key={review.seed} review={review} delay={i * 80} />
                    ))}
                </div>

                {/* Add Review CTA */}
                <div className="text-center mt-8 pt-8 border-t border-gray-100">
                    <p className="text-gray-300 text-xs tracking-wide mb-3">
                        Found your thing? Happy with Xenora? — we'd love to hear your story.
                    </p>
                    <button
                        onClick={() => setShowPopup(true)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-400 font-semibold text-xs hover:border-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Your Review
                    </button>
                </div>

                {showPopup && <AddReviewPopup onClose={() => setShowPopup(false)} />}
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const ReclaimerReview = () => (
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
                    <FounderNote />
                    <ReviewsSection />
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default ReclaimerReview;
