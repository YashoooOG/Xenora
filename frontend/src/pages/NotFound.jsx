import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import XenoraLogo from '../pictures/Screenshot 2026-02-24 110550.svg';

const NotFound = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    /* Floating particles effect */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 28 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 2.5 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(132,204,22,${p.alpha})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col overflow-hidden relative">
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
                style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.1) 0%, transparent 70%)' }}
            />

            {/* Particle canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

            {/* Navbar */}
            <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center">
                        <img src={XenoraLogo} alt="Xenora" className="h-9 w-auto" />
                    </a>
                    <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        ← Back to Home
                    </a>
                </nav>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-6 relative z-10">
                <div className="text-center max-w-lg">
                    {/* 404 number */}
                    <div className="relative inline-block mb-6">
                        <span
                            className="text-[140px] sm:text-[180px] font-black leading-none select-none"
                            style={{ color: '#f3f4f6', letterSpacing: '-0.04em' }}
                        >
                            404
                        </span>
                        {/* Floating lost item icon over the 404 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300"
                                    style={{ borderRadius: '50%' }}
                                >
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Page Lost</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                        This page went missing.
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                        Looks like this page got lost — just like the items on Xenora.
                        But unlike those, we can't help you find it.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-gray-900 text-white font-bold text-sm hover:bg-black transition-colors duration-200 w-full sm:w-auto"
                        >
                            Go Home
                        </button>
                        <button
                            onClick={() => navigate('/home')}
                            className="px-8 py-3 border border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 w-full sm:w-auto"
                        >
                            Browse Items
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-3 border border-gray-200 text-gray-400 font-semibold text-sm hover:border-gray-300 hover:text-gray-600 transition-colors duration-200 w-full sm:w-auto"
                        >
                            ← Go Back
                        </button>
                    </div>

                    {/* Fun stat */}
                    <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#84cc16' }} />
                        <span>Error code 404 · Xenora is still running fine</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#84cc16' }} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
