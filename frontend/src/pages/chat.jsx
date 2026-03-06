import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

/* ─────────────────────────────────────────
   DUMMY CONVERSATIONS
───────────────────────────────────────── */
const CONVERSATIONS = {
    bot: {
        id: 'bot',
        name: 'Xenora AI',
        avatar: null,
        isBot: true,
        subtitle: 'Match assistant · always here',
        messages: [
            { id: 1, from: 'bot', text: 'Hi! I found a potential match for your lost item "Black Leather Wallet".', time: '10:02 AM' },
            { id: 2, from: 'bot', text: 'A user named Amit Kumar reported finding a black bifold wallet near Connaught Place on Mar 2. The match confidence is 91%.', time: '10:02 AM' },
            { id: 3, from: 'bot', text: 'Would you like me to connect you with Amit so you can verify and arrange a handover?', time: '10:03 AM' },
            { id: 4, from: 'me', text: 'Yes please! That sounds like mine.', time: '10:05 AM' },
            { id: 5, from: 'bot', text: "Great! I've notified Amit. He should message you shortly. You can also open his chat directly from the sidebar.", time: '10:05 AM' },
        ],
    },
    amit: {
        id: 'amit',
        name: 'Amit Kumar',
        avatar: 'https://i.pravatar.cc/40?img=11',
        isBot: false,
        subtitle: 'Found: Black Leather Wallet · CP',
        messages: [
            { id: 1, from: 'other', text: 'Hi! I think I found your wallet near CP. Can we connect to verify?', time: '10:20 AM' },
            { id: 2, from: 'me', text: 'Hey Amit! Yes, it has initials A.K. engraved inside and a small scuff on the bottom corner.', time: '10:22 AM' },
            { id: 3, from: 'other', text: "Yes! That's exactly it. I can see the initials. When are you free to meet?", time: '10:24 AM' },
            { id: 4, from: 'me', text: 'Tomorrow afternoon around 4PM near the Connaught Place metro exit?', time: '10:26 AM' },
            { id: 5, from: 'other', text: "Perfect, I'll be there. I'll bring the wallet. See you!", time: '10:27 AM' },
        ],
    },
    sneha: {
        id: 'sneha',
        name: 'Sneha R.',
        avatar: 'https://i.pravatar.cc/40?img=5',
        isBot: false,
        subtitle: 'Re: iPhone 15 Pro (Blue)',
        messages: [
            { id: 1, from: 'me', text: 'Hi Sneha, did you update your found report for the iPhone?', time: '9:00 AM' },
            { id: 2, from: 'other', text: 'Yes that sounds like mine! When are you free to meet?', time: '9:05 AM' },
        ],
    },
};

/* ─────────────────────────────────────────
   DUMMY NOTIFICATIONS
───────────────────────────────────────── */
const INITIAL_NOTIFS = [
    {
        id: 1, type: 'match', read: false, time: '2 min ago', isBot: true,
        title: 'Xenora AI found a potential match!',
        body: 'Your lost "Black Leather Wallet" has a 91% match with a found report in Connaught Place.',
        chatId: 'bot',
    },
    {
        id: 2, type: 'message', read: false, time: '14 min ago',
        avatar: 'https://i.pravatar.cc/40?img=11', sender: 'Amit Kumar', isBot: false,
        title: 'Amit Kumar sent you a message',
        body: '"Hi! I think I found your wallet near CP. Can we connect to verify?"',
        chatId: 'amit',
    },
    {
        id: 3, type: 'match', read: false, time: '1 hr ago', isBot: true,
        title: 'New match on your found report',
        body: 'Someone lost a "Blue JanSport Backpack" near India Gate — matches your found report XN-3007.',
        chatId: 'bot',
    },
    {
        id: 4, type: 'message', read: true, time: '3 hrs ago',
        avatar: 'https://i.pravatar.cc/40?img=5', sender: 'Sneha R.', isBot: false,
        title: 'Sneha R. replied to you',
        body: '"Yes that sounds like mine! When are you free to meet?"',
        chatId: 'sneha',
    },
    {
        id: 5, type: 'system', read: true, time: 'Yesterday', isBot: true,
        title: 'Your report was verified',
        body: 'Report XN-3001 "Black Leather Wallet" has been marked as verified by our trust team.',
        chatId: null,
    },
    {
        id: 6, type: 'match', read: true, time: '2 days ago', isBot: true,
        title: 'Match confidence updated',
        body: 'A finder updated their report — match confidence on your wallet rose to 94%.',
        chatId: 'bot',
    },
];

/* ─────────────────────────────────────────
   BOT TYPING INDICATOR
───────────────────────────────────────── */
const TypingDots = () => (
    <div className="flex items-center gap-1 px-4 py-3">
        {[0, 1, 2].map(i => (
            <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
                style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }}
            />
        ))}
        <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
    </div>
);

/* ─────────────────────────────────────────
   BOT AVATAR
───────────────────────────────────────── */
const BotAvatar = ({ size = 36 }) => (
    <div
        className="flex-shrink-0 flex items-center justify-center border border-gray-200"
        style={{ width: size, height: size, background: '#84cc1615' }}
    >
        <svg style={{ width: size * 0.5, height: size * 0.5, color: '#84cc16' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
    </div>
);

/* ─────────────────────────────────────────
   SYSTEM ICON (for non-bot, non-user notifs)
───────────────────────────────────────── */
const SystemIcon = () => (
    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: '#f0f9ff' }}>
        <svg style={{ width: 16, height: 16, color: '#38bdf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
    </div>
);

/* ─────────────────────────────────────────
   NOTIFICATIONS PANEL (rendered in sidebar)
───────────────────────────────────────── */
const NotificationsPanel = ({ notifs, setNotifs, onOpenChat }) => {
    const [filter, setFilter] = useState('all');
    const unreadCount = notifs.filter(n => !n.read).length;

    const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
    const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));

    const filtered = notifs.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter === 'matches') return n.type === 'match';
        if (filter === 'messages') return n.type === 'message';
        return true;
    });

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-600">Alerts</span>
                    {unreadCount > 0 && (
                        <span className="text-[9px] font-black px-1.5 py-0.5 text-white" style={{ background: '#84cc16' }}>{unreadCount}</span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] font-bold text-gray-400 hover:text-gray-700 transition-colors">
                        Mark all read
                    </button>
                )}
            </div>

            {/* Filter tabs */}
            <div className="flex border-b border-gray-100 flex-shrink-0">
                {[
                    { key: 'all', label: 'All' },
                    { key: 'unread', label: unreadCount > 0 ? `Unread (${unreadCount})` : 'Unread' },
                    { key: 'matches', label: 'Matches' },
                    { key: 'messages', label: 'Msgs' },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className="flex-1 py-2 text-[9px] font-bold transition-colors border-b-2 leading-tight"
                        style={filter === key
                            ? { borderColor: '#84cc16', color: '#4d7c0f' }
                            : { borderColor: 'transparent', color: '#9ca3af' }
                        }
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Notif list */}
            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <svg className="w-7 h-7 text-gray-200 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        <p className="text-xs text-gray-300 font-medium">Nothing here</p>
                    </div>
                ) : filtered.map(n => {
                    const canOpen = !!n.chatId;
                    return (
                        <div
                            key={n.id}
                            onClick={() => { markRead(n.id); if (canOpen) onOpenChat(n.chatId); }}
                            className={`flex items-start gap-2.5 px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors ${
                                !n.read ? 'bg-[#fafff5] hover:bg-[#f3fde8]' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {n.avatar
                                    ? <img src={n.avatar} alt={n.sender} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                    : n.type === 'match' ? <BotAvatar size={32} /> : <SystemIcon />
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                    <p className={`text-[11px] leading-snug ${!n.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-600'}`}>
                                        {n.title}
                                    </p>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <span className="text-[9px] text-gray-300 whitespace-nowrap">{n.time}</span>
                                        {!n.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#84cc16' }} />}
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                                {canOpen && (
                                    <span className="mt-1 inline-block text-[10px] font-bold" style={{ color: '#4d7c0f' }}>
                                        {n.type === 'message' ? 'Open chat →' : 'Ask Xenora AI →'}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const ChatPage = () => {
    const location = useLocation();
    const initialChatId = location.state?.chatId || null;

    const [convos, setConvos] = useState(CONVERSATIONS);
    const [activeChatId, setActiveChatId] = useState(initialChatId || 'bot');
    const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
    const [sidebarTab, setSidebarTab] = useState(initialChatId ? 'chats' : 'notifications');
    const [input, setInput] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    const unreadCount = notifs.filter(n => !n.read).length;
    const activeConvo = convos[activeChatId];

    /* Open a chat and switch sidebar to chats tab */
    const openChat = (chatId) => {
        setActiveChatId(chatId);
        setSidebarTab('chats');
        setSidebarOpen(false);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChatId, convos, botTyping]);

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;
        const newMsg = { id: Date.now(), from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

        setConvos(c => ({
            ...c,
            [activeChatId]: { ...c[activeChatId], messages: [...c[activeChatId].messages, newMsg] },
        }));
        setInput('');

        /* Bot auto-reply */
        if (activeChatId === 'bot') {
            setBotTyping(true);
            setTimeout(() => {
                setBotTyping(false);
                const botReplies = [
                    "I'm checking if there are any new updates on your report...",
                    "I've scanned 200+ new found reports in your area. No new matches yet, but I'll notify you immediately when one appears.",
                    "Tip: Adding more photos to your report improves match accuracy by up to 40%.",
                    "Is there anything else you'd like me to help with?",
                ];
                const reply = { id: Date.now() + 1, from: 'bot', text: botReplies[Math.floor(Math.random() * botReplies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                setConvos(c => ({
                    ...c,
                    bot: { ...c.bot, messages: [...c.bot.messages, reply] },
                }));
            }, 1400);
        }
    };

    const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

    return (
        <div className="flex flex-col" style={{ height: '100dvh' }}>
            <Header />

            {/* Chat shell — below header */}
            <div className="flex flex-1 overflow-hidden pt-16">

                {/* ── Sidebar ── */}
                <aside
                    className={`
                        flex-shrink-0 w-72 border-r border-gray-200 bg-white flex flex-col
                        fixed md:relative top-16 md:top-0 bottom-0 left-0 z-30
                        transition-transform duration-200
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}
                >
                    {/* Tab switcher */}
                    <div className="flex border-b border-gray-200 flex-shrink-0">
                        <button
                            onClick={() => setSidebarTab('notifications')}
                            className="flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2"
                            style={sidebarTab === 'notifications'
                                ? { borderColor: '#84cc16', color: '#4d7c0f', background: '#fafff4' }
                                : { borderColor: 'transparent', color: '#9ca3af', background: 'white' }
                            }
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            Alerts
                            {unreadCount > 0 && (
                                <span className="text-[9px] font-black px-1 py-0.5 text-white" style={{ background: '#84cc16' }}>{unreadCount}</span>
                            )}
                        </button>
                        <button
                            onClick={() => setSidebarTab('chats')}
                            className="flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2"
                            style={sidebarTab === 'chats'
                                ? { borderColor: '#111', color: '#111', background: 'white' }
                                : { borderColor: 'transparent', color: '#9ca3af', background: 'white' }
                            }
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            Chats
                        </button>
                        {/* Mobile close */}
                        <button className="md:hidden px-3 text-gray-400" onClick={() => setSidebarOpen(false)}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tab content */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        {sidebarTab === 'notifications' ? (
                            <NotificationsPanel notifs={notifs} setNotifs={setNotifs} onOpenChat={openChat} />
                        ) : (
                            /* Conversations list */
                            <div className="flex-1 overflow-y-auto">
                                {Object.values(convos).map(c => {
                                    const lastMsg = c.messages[c.messages.length - 1];
                                    const isActive = c.id === activeChatId;
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => { setActiveChatId(c.id); setSidebarOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors border-b border-gray-50 ${isActive ? 'bg-[#fafff5]' : 'hover:bg-gray-50'}`}
                                        >
                                            {c.isBot ? <BotAvatar size={36} /> : (
                                                <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className={`text-xs font-bold truncate ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{c.name}</span>
                                                    {c.isBot && (
                                                        <span className="text-[9px] font-black px-1.5 py-0.5 flex-shrink-0" style={{ background: '#84cc16', color: '#fff' }}>AI</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">{lastMsg?.text}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-20 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* ── Chat panel ── */}
                <div className="flex-1 flex flex-col overflow-hidden bg-white">

                    {/* Chat header */}
                    <div className="px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center gap-3 bg-white flex-shrink-0">
                        {/* Mobile sidebar toggle */}
                        <button className="md:hidden text-gray-400 hover:text-gray-700 -ml-1" onClick={() => setSidebarOpen(true)}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </button>

                        {activeConvo.isBot ? <BotAvatar size={34} /> : (
                            <img src={activeConvo.avatar} alt={activeConvo.name} className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-gray-900">{activeConvo.name}</span>
                                {activeConvo.isBot && (
                                    <span className="text-[9px] font-black px-1.5 py-0.5" style={{ background: '#84cc16', color: '#fff' }}>AI</span>
                                )}
                                {!activeConvo.isBot && (
                                    <span className="flex items-center gap-1 text-[10px] text-green-500 font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        Online
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 truncate">{activeConvo.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-4"
                        style={{ background: 'linear-gradient(rgba(0,0,0,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.015) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
                    >
                        {/* Bot intro banner */}
                        {activeConvo.isBot && (
                            <div className="text-center mb-2">
                                <div className="inline-flex flex-col items-center gap-2">
                                    <BotAvatar size={44} />
                                    <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                                        <strong className="text-gray-600">Xenora AI</strong> — your match assistant. I scan reports in real-time and connect you with finders safely.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeConvo.messages.map(msg => {
                            const isMe = msg.from === 'me';
                            return (
                                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    {!isMe && (
                                        activeConvo.isBot
                                            ? <BotAvatar size={28} />
                                            : <img src={activeConvo.avatar} alt={activeConvo.name} className="w-7 h-7 rounded-full object-cover border border-gray-200 flex-shrink-0 mb-0.5" />
                                    )}

                                    <div className={`flex flex-col gap-0.5 max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className="px-4 py-2.5 text-sm leading-relaxed"
                                            style={isMe
                                                ? { background: '#111', color: '#fff', borderRadius: '12px 12px 2px 12px' }
                                                : { background: '#f3f4f6', color: '#111827', borderRadius: '12px 12px 12px 2px' }
                                            }
                                        >
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-300 px-1">{msg.time}</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bot typing */}
                        {botTyping && activeChatId === 'bot' && (
                            <div className="flex items-end gap-2">
                                <BotAvatar size={28} />
                                <div style={{ background: '#f3f4f6', borderRadius: '12px 12px 12px 2px' }}>
                                    <TypingDots />
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input bar */}
                    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                        <div className="flex items-end gap-3">
                            <div className="flex-1 border border-gray-200 bg-gray-50 flex items-end px-4 py-2.5 gap-2">
                                <textarea
                                    ref={inputRef}
                                    rows={1}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder={activeChatId === 'bot' ? 'Ask Xenora AI anything…' : `Message ${activeConvo.name}…`}
                                    className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent max-h-32"
                                    style={{ lineHeight: '1.5' }}
                                />
                            </div>
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim()}
                                className="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30"
                                style={{ background: '#111', color: '#fff' }}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-300 mt-1.5 text-center">
                            {activeChatId === 'bot' ? 'Xenora AI · responses are simulated for demo' : 'Messages are end-to-end encrypted · Xenora'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
