import React, { useState, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

/* 
   INITIAL USER STATE
 */
const INITIAL_USER = {
  name: 'Tanishq Verma',
  username: '@tanishq.verma',
  avatar: 'https://avatars.githubusercontent.com/u/185518962?s=400&u=3064ad82532b7b0473ef22110b342e4bf760aeb3&v=4',
  location: 'Rajpura, Punjab',
  joined: 'January 2026',
  badge: 'Verified Reclaimer',
  bio: 'Second-year student. Building things that help people. Lost my keys once — never again.',
  dob: '2004-08-14',
  gender: 'Male',
  nationality: 'Indian',
};

/* 
   BOXY TOGGLE
 */
const BoxToggle = ({ on, onToggle }) => (
  <button
    onClick={onToggle}
    aria-pressed={on}
    className="flex items-center flex-shrink-0 border transition-colors duration-150 focus:outline-none"
    style={{ borderColor: on ? '#84cc16' : '#d1d5db', background: 'transparent' }}
  >
    <span
      className="text-xs font-bold px-2.5 py-1.5 transition-colors duration-150"
      style={{ background: on ? '#84cc16' : 'transparent', color: on ? '#fff' : '#9ca3af' }}
    >
      Public
    </span>
    <span
      className="text-xs font-bold px-2.5 py-1.5 transition-colors duration-150"
      style={{ background: !on ? '#111' : 'transparent', color: !on ? '#fff' : '#9ca3af' }}
    >
      Private
    </span>
  </button>
);

/* 
   SECTION LABEL
 */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>
      {children}
    </span>
    <span className="flex-1 h-px bg-gray-100" />
  </div>
);

/* 
   PROFILE HEADER
 */
const ProfileHeader = ({ user, onAvatarChange }) => {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onAvatarChange(url);
  };

  return (
    <div className="px-8 sm:px-12 pt-10 pb-8 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar with upload hover */}
        <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => fileRef.current.click()}>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          />
          <span
            className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full"
            style={{ background: '#34d399' }}
          />
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>

        {/* Name / meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
            <span>{user.username}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {user.location}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
              </svg>
              Joined {user.joined}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2 max-w-lg">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

/* 
   PROFILE DETAILS SECTION
 */
const FieldRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-gray-50 last:border-0">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-32 flex-shrink-0">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full text-sm font-semibold text-gray-800 placeholder-gray-300 border border-gray-200 px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors bg-white"
  />
);

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={3}
    className="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors bg-white resize-none"
  />
);

const SelectInput = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="text-sm font-semibold text-gray-800 border border-gray-200 px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors bg-white"
  >
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

const UserDetails = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false);
  const update = (key) => (val) => setUser((u) => ({ ...u, [key]: val }));

  return (
    <div className="px-8 sm:px-12 py-8 border-b border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>Profile Details</span>
          <span className="flex-1 h-px bg-gray-100 w-20" />
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          className="px-4 py-1.5 text-xs font-bold border transition-colors"
          style={editing
            ? { borderColor: '#111', background: '#111', color: '#fff' }
            : { borderColor: '#d1d5db', background: '#fff', color: '#374151' }
          }
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="border border-gray-100 px-6">
        <FieldRow label="Full Name">
          {editing
            ? <TextInput value={user.name} onChange={update('name')} placeholder="Your full name" />
            : <span className="text-sm font-semibold text-gray-800">{user.name}</span>}
        </FieldRow>
        <FieldRow label="Username">
          {editing
            ? <TextInput value={user.username} onChange={update('username')} placeholder="@username" />
            : <span className="text-sm font-semibold text-gray-800">{user.username}</span>}
        </FieldRow>
        <FieldRow label="Bio">
          {editing
            ? <TextArea value={user.bio} onChange={update('bio')} placeholder="Tell others a bit about yourself" />
            : <span className="text-sm text-gray-600 leading-relaxed">{user.bio}</span>}
        </FieldRow>
        <FieldRow label="Location">
          {editing
            ? <TextInput value={user.location} onChange={update('location')} placeholder="City, Country" />
            : <span className="text-sm font-semibold text-gray-800">{user.location}</span>}
        </FieldRow>
        <FieldRow label="Date of Birth">
          {editing
            ? <input type="date" value={user.dob} onChange={(e) => update('dob')(e.target.value)} className="text-sm font-semibold text-gray-800 border border-gray-200 px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors bg-white" />
            : <span className="text-sm font-semibold text-gray-800">{user.dob}</span>}
        </FieldRow>
        <FieldRow label="Gender">
          {editing
            ? <SelectInput value={user.gender} onChange={update('gender')} options={['Male', 'Female', 'Non-binary', 'Prefer not to say']} />
            : <span className="text-sm font-semibold text-gray-800">{user.gender}</span>}
        </FieldRow>
        <FieldRow label="Nationality">
          {editing
            ? <TextInput value={user.nationality} onChange={update('nationality')} placeholder="e.g. Indian" />
            : <span className="text-sm font-semibold text-gray-800">{user.nationality}</span>}
        </FieldRow>
      </div>
    </div>
  );
};

/* 
   CONTACT INFO SECTION
 */
const CONTACT_DEFS = [
  {
    key: 'email', label: 'Email Address', placeholder: 'you@example.com',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    key: 'phone', label: 'Phone Number', placeholder: '+1 234 567 8900',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    key: 'whatsapp', label: 'WhatsApp', placeholder: '+1 234 567 8900',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    key: 'instagram', label: 'Instagram', placeholder: '@yourhandle',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    key: 'discord', label: 'Discord', placeholder: 'username or @handle',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

const ContactInfo = () => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    email: 'tanishq@xenora.app',
    phone: '+92 300 1234567',
    whatsapp: '+92 300 1234567',
    instagram: '@tanishq.__.verma',
    discord: 'tanishq#0001',
  });

  const [visibility, setVisibility] = useState({
    email: false,
    phone: false,
    whatsapp: false,
    instagram: true,
    discord: true,
  });

  const updateValue = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggleVisibility = (key) =>
    setVisibility((v) => ({ ...v, [key]: !v[key] }));

  const allPublic = Object.values(visibility).every(Boolean);
  const masterToggle = () => {
    const next = !allPublic;
    setVisibility(Object.fromEntries(Object.keys(visibility).map((k) => [k, next])));
  };

  return (
    <div className="px-8 sm:px-12 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#84cc16' }}>
            Contact Info
          </span>
          <span className="h-px bg-gray-100 w-20" />
        </div>
        <div className="flex items-center gap-3">
          {editing && (
            <>
              <span className="text-xs text-gray-400 font-medium">All public</span>
              <BoxToggle on={allPublic} onToggle={masterToggle} />
            </>
          )}
          <button
            onClick={() => setEditing((e) => !e)}
            className="px-4 py-1.5 text-xs font-bold border transition-colors"
            style={editing
              ? { borderColor: '#111', background: '#111', color: '#fff' }
              : { borderColor: '#d1d5db', background: '#fff', color: '#374151' }
            }
          >
            {editing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Info note — only shown in edit mode */}
      {editing && (
        <div
          className="flex items-start gap-3 p-4 mb-5 border"
          style={{ background: '#84cc1608', borderColor: '#84cc1630' }}
        >
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#84cc16' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">
            Fields set to <strong className="text-gray-700">Public</strong> are visible to verified Xenora users during item recovery handovers.{' '}
            <strong className="text-gray-700">Private</strong> fields stay hidden until you explicitly share them in a chat.
          </p>
        </div>
      )}

      {/* Fields */}
      <div className="flex flex-col gap-3">
        {CONTACT_DEFS.map((field) => {
          const isPublic = visibility[field.key];
          return (
            <div
              key={field.key}
              className="border border-gray-200 transition-opacity duration-200"
              style={{ opacity: isPublic ? 1 : 0.65 }}
            >
              {/* Field header */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100"
                style={{ background: '#fafafa' }}
              >
                <div className="flex items-center gap-2.5" style={{ color: '#6b7280' }}>
                  {field.icon}
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {field.label}
                  </span>
                </div>
                {editing && <BoxToggle on={isPublic} onToggle={() => toggleVisibility(field.key)} />}
                {!editing && (
                  <span
                    className="text-xs font-bold px-2 py-0.5"
                    style={{ color: isPublic ? '#84cc16' : '#9ca3af', background: isPublic ? '#84cc1612' : '#f3f4f6' }}
                  >
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                )}
              </div>
              {/* Value / Input */}
              <div className="px-4 py-3">
                {editing
                  ? <input type="text" value={values[field.key]} onChange={updateValue(field.key)} placeholder={field.placeholder} className="w-full text-sm font-semibold text-gray-800 placeholder-gray-300 focus:outline-none bg-transparent" />
                  : <span className="text-sm font-semibold text-gray-800">{values[field.key] || <span className="text-gray-300">{field.placeholder}</span>}</span>
                }
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

/* 
   DANGER ZONE
 */
const DangerZone = () => {
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="px-6 sm:px-10 py-8 border-t border-gray-100">
      <SectionLabel>Account</SectionLabel>

      {/* Deactivate */}
      <div className="border border-gray-200 mb-4">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-bold text-gray-800">Deactivate Account</p>
            <p className="text-xs text-gray-400 mt-0.5">Your profile will be hidden until you log back in.</p>
          </div>
          <button
            onClick={() => setShowDeactivate((v) => !v)}
            className="text-xs font-bold px-4 py-2 border transition-colors duration-150"
            style={showDeactivate
              ? { borderColor: '#facc15', background: '#facc1510', color: '#ca8a04' }
              : { borderColor: '#d1d5db', background: '#fafafa', color: '#6b7280' }
            }
          >
            Deactivate
          </button>
        </div>
        {showDeactivate && (
          <div className="px-5 py-4 border-t border-gray-100" style={{ background: '#fffbeb' }}>
            <p className="text-xs text-yellow-700 mb-3">Are you sure? You can reactivate anytime by logging back in.</p>
            <div className="flex gap-2">
              <button
                className="text-xs font-black px-4 py-2 border transition-colors duration-150"
                style={{ borderColor: '#facc15', background: '#facc15', color: '#111' }}
              >
                Yes, Deactivate
              </button>
              <button
                onClick={() => setShowDeactivate(false)}
                className="text-xs font-bold px-4 py-2 border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete */}
      <div className="border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-bold" style={{ color: '#ef4444' }}>Delete Account</p>
            <p className="text-xs text-gray-400 mt-0.5">This is permanent. All your data will be erased.</p>
          </div>
          <button
            onClick={() => setShowDelete((v) => !v)}
            className="text-xs font-bold px-4 py-2 border transition-colors duration-150"
            style={showDelete
              ? { borderColor: '#ef4444', background: '#ef444410', color: '#ef4444' }
              : { borderColor: '#d1d5db', background: '#fafafa', color: '#6b7280' }
            }
          >
            Delete
          </button>
        </div>
        {showDelete && (
          <div className="px-5 py-4 border-t border-gray-100" style={{ background: '#fff5f5' }}>
            <p className="text-xs mb-3" style={{ color: '#b91c1c' }}>This action cannot be undone. Your account and all associated data will be permanently deleted.</p>
            <div className="flex gap-2">
              <button
                className="text-xs font-black px-4 py-2 border transition-colors duration-150"
                style={{ borderColor: '#ef4444', background: '#ef4444', color: '#fff' }}
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="text-xs font-bold px-4 py-2 border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* 
   PAGE ROOT
 */
const UserDashboard = () => {
  const [user, setUser] = useState(INITIAL_USER);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(17,17,17,0.05) 0%, transparent 70%)' }}
      />

      <Header />

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12">
          <div className="bg-white border border-gray-200 shadow-[0_8px_48px_rgba(0,0,0,0.06)]">
            <ProfileHeader user={user} onAvatarChange={(url) => setUser((u) => ({ ...u, avatar: url }))} />
            <UserDetails user={user} setUser={setUser} />
            <ContactInfo />
            <DangerZone />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
