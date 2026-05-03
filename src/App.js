import React, { useState, useRef, useEffect } from 'react';

const EXERCISES = [
  { name: 'Squat', cat: 'Legs' },
  { name: 'Romanian Deadlift', cat: 'Legs' },
  { name: 'Leg Press', cat: 'Legs' },
  { name: 'Bulgarian Split Squat', cat: 'Legs' },
  { name: 'Hip Thrust', cat: 'Legs' },
  { name: 'Bench Press', cat: 'Chest' },
  { name: 'Incline DB Press', cat: 'Chest' },
  { name: 'Cable Fly', cat: 'Chest' },
  { name: 'Dips', cat: 'Chest' },
  { name: 'Pull-Up', cat: 'Back' },
  { name: 'Barbell Row', cat: 'Back' },
  { name: 'Lat Pulldown', cat: 'Back' },
  { name: 'Deadlift', cat: 'Back' },
  { name: 'Overhead Press', cat: 'Shoulders' },
  { name: 'Lateral Raise', cat: 'Shoulders' },
  { name: 'Face Pull', cat: 'Shoulders' },
  { name: 'Bicep Curl', cat: 'Arms' },
  { name: 'Tricep Pushdown', cat: 'Arms' },
  { name: 'Hammer Curl', cat: 'Arms' },
  { name: 'Skull Crusher', cat: 'Arms' },
  { name: 'Plank', cat: 'Core' },
  { name: 'Dead Bug', cat: 'Core' },
  { name: 'Hanging Leg Raise', cat: 'Core' },
  { name: 'Ab Wheel', cat: 'Core' },
  { name: 'Box Jump', cat: 'Power' },
  { name: 'Sled Push', cat: 'Conditioning' },
  { name: 'Battle Ropes', cat: 'Conditioning' },
  { name: 'Burpee', cat: 'Conditioning' },
  { name: 'Hip Flexor Stretch', cat: 'Mobility' },
  { name: 'Ankle Mobility', cat: 'Mobility' },
  { name: 'Thoracic Rotation', cat: 'Mobility' },
];
const CATS = [
  'All',
  'Legs',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Core',
  'Power',
  'Conditioning',
  'Mobility',
];
const AVATAR_COLORS = [
  '#E24B4A',
  '#378ADD',
  '#BA7517',
  '#639922',
  '#D4537E',
  '#7F77DD',
  '#1D9E75',
];
const ac = (name) =>
  AVATAR_COLORS[name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0];
const inits = (name) =>
  name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '';

function theme(dark) {
  return dark
    ? {
        bg: '#0a0a0a',
        bg2: '#111',
        bg3: '#161616',
        bg4: '#1e1e1e',
        border: '#1e1e1e',
        border2: '#2a2a2a',
        text: '#e8e8e8',
        text2: '#888',
        text3: '#3a3a3a',
        accent: '#E24B4A',
        accentDark: '#c03030',
        accentBg: '#1a0808',
        accentLight: '#2a0a0a',
        green: '#4CAF50',
        greenBg: '#0d2010',
        amber: '#f59e0b',
        amberBg: '#2a1a00',
        blue: '#378ADD',
        blueBg: '#0a1a2e',
        inputBg: '#161616',
        shadow: 'none',
      }
    : {
        bg: '#f0eeeb',
        bg2: '#f5f4f2',
        bg3: '#ffffff',
        bg4: '#f0eeeb',
        border: 'rgba(0,0,0,.09)',
        border2: 'rgba(0,0,0,.15)',
        text: '#111',
        text2: '#666',
        text3: '#bbb',
        accent: '#E24B4A',
        accentDark: '#c03030',
        accentBg: '#fff0f0',
        accentLight: '#FCEBEB',
        green: '#2d8a2d',
        greenBg: '#eaf5ea',
        amber: '#b45309',
        amberBg: '#fef3c7',
        blue: '#185FA5',
        blueBg: '#e6f0fb',
        inputBg: '#fafafa',
        shadow: '0 1px 3px rgba(0,0,0,.06)',
      };
}

function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <rect width="34" height="34" rx="8" fill="#E24B4A" />
      <circle
        cx="17"
        cy="17"
        r="8"
        stroke="white"
        strokeWidth="1.7"
        fill="none"
      />
      <line
        x1="17"
        y1="5"
        x2="17"
        y2="9"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="17"
        y1="25"
        x2="17"
        y2="29"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="17"
        x2="9"
        y2="17"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="17"
        x2="29"
        y2="17"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="9.5"
        y1="9.5"
        x2="11.8"
        y2="11.8"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".45"
      />
      <line
        x1="22.2"
        y1="22.2"
        x2="24.5"
        y2="24.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".45"
      />
      <line
        x1="24.5"
        y1="9.5"
        x2="22.2"
        y2="11.8"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".45"
      />
      <line
        x1="9.5"
        y1="24.5"
        x2="11.8"
        y2="22.2"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".45"
      />
      <circle cx="17" cy="17" r="3" fill="white" />
      <circle cx="17" cy="17" r="1.2" fill="#E24B4A" />
    </svg>
  );
}

function LogoWordmark({ T }) {
  return (
    <div style={{ lineHeight: 1 }}>
      <div
        style={{
          fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 1,
          color: T.text,
        }}
      >
        DIALED <span style={{ color: '#E24B4A' }}>IN</span>
      </div>
      <svg
        width="88"
        height="10"
        viewBox="0 0 88 10"
        style={{ display: 'block', marginTop: 1 }}
      >
        <polyline
          points="0,5 10,5 13,5 15,1 17,9 19,0 21,10 23,5 36,5 39,5 41,3 43,7 45,5 88,5"
          fill="none"
          stroke="#E24B4A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          fontSize: 8,
          color: T.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginTop: 3,
        }}
      >
        personal training
      </div>
    </div>
  );
}

const NavIcons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  clients: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  workouts: (
    <>
      <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4M6 9h12M6 15h12" />
    </>
  ),
  programs: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  messages: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  invoices: (
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </>
  ),
};
function NI({ name }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {NavIcons[name]}
    </svg>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const fr = lang === 'fr';
  const T = theme(dark);
  const msgBottom = useRef(null);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      goal: 'Weight loss',
      freq: '3x',
      rate: 280,
      tags: ['Cardio', 'HIIT'],
      weeks: 8,
    },
    {
      id: 2,
      name: 'Marcus Reid',
      goal: 'Strength',
      freq: '4x',
      rate: 380,
      tags: ['Powerlifting', 'Hypertrophy'],
      weeks: 16,
    },
    {
      id: 3,
      name: 'Aisha Lopez',
      goal: 'Injury rehab',
      freq: '2x',
      rate: 180,
      tags: ['Rehab', 'Mobility'],
      weeks: 1,
    },
    {
      id: 4,
      name: 'Tom Kim',
      goal: 'Athletic performance',
      freq: '5x',
      rate: 480,
      tags: ['Speed', 'Power'],
      weeks: 24,
    },
    {
      id: 5,
      name: 'Priya Wang',
      goal: 'General fitness',
      freq: '3x',
      rate: 280,
      tags: ['Functional', 'Core'],
      weeks: 4,
    },
  ]);
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      client: 'Marcus Reid',
      amount: 280,
      status: 'paid',
      date: 'Apr 28',
      desc: '4 PT sessions',
    },
    {
      id: 'INV-002',
      client: 'Sarah Chen',
      amount: 380,
      status: 'paid',
      date: 'Apr 30',
      desc: 'Monthly package',
    },
    {
      id: 'INV-003',
      client: 'Tom Kim',
      amount: 520,
      status: 'pending',
      date: 'May 1',
      desc: '5 sessions + program',
    },
    {
      id: 'INV-004',
      client: 'Aisha Lopez',
      amount: 180,
      status: 'pending',
      date: 'May 2',
      desc: 'Assessment + 2 sessions',
    },
  ]);
  const [msgs, setMsgs] = useState({
    1: [
      { f: 'recv', t: 'Hi! Do we still start at 9?', ts: '8:42 AM' },
      { f: 'sent', t: 'Yes 9am sharp! Full Body A today.', ts: '8:45 AM' },
      { f: 'recv', t: 'Thanks! Makes sense', ts: '8:49 AM' },
    ],
    2: [
      { f: 'recv', t: "Can we move Tuesday's session?", ts: 'Mon 4pm' },
      { f: 'sent', t: 'Wednesday 11am work?', ts: 'Mon 4:30pm' },
      { f: 'recv', t: 'Perfect, thanks!', ts: 'Mon 4:31pm' },
    ],
    3: [
      { f: 'recv', t: 'My knee feels much better!', ts: '9am' },
      {
        f: 'sent',
        t: 'Great! Hip work is doing its job. See you Thursday.',
        ts: '9:15am',
      },
    ],
    4: [
      { f: 'recv', t: "PR'd my deadlift! 180kg!!", ts: 'Tue 7:30pm' },
      {
        f: 'sent',
        t: 'LETS GO TOM! 10kg PR. Rest tomorrow.',
        ts: 'Tue 7:35pm',
      },
    ],
    5: [
      { f: 'recv', t: 'Really enjoying the training!', ts: 'Wed 2pm' },
      {
        f: 'sent',
        t: "You're progressing really well Priya!",
        ts: 'Wed 2:10pm',
      },
    ],
  });
  const [chatClient, setChatClient] = useState(null);
  const [chatText, setChatText] = useState('');
  const [customEx, setCustomEx] = useState([]);
  const [newMove, setNewMove] = useState({ name: '', cat: 'Legs' });
  const [blocks, setBlocks] = useState([]);
  const [wName, setWName] = useState('');
  const [wClient, setWClient] = useState('');
  const [wCat, setWCat] = useState('Strength');
  const [exSearch, setExSearch] = useState('');
  const [exCat, setExCat] = useState('All');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [wTab, setWTab] = useState('builder');
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    goal: 'Weight loss',
    freq: '3x',
    rate: '',
  });
  const [newInv, setNewInv] = useState({
    client: '',
    amount: '',
    desc: 'PT sessions',
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (clients.length) {
      setWClient(clients[0].name);
      setNewInv((i) => ({ ...i, client: clients[0].name }));
      setChatClient(clients[0]);
    }
  }, []);
  useEffect(() => {
    msgBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, chatClient]);

  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 2200);
  };
  const sendMsg = () => {
    if (!chatText.trim() || !chatClient) return;
    const now = new Date(),
      ts = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMsgs((p) => ({
      ...p,
      [chatClient.id]: [
        ...(p[chatClient.id] || []),
        { f: 'sent', t: chatText, ts },
      ],
    }));
    setChatText('');
  };
  const addBlock = (name) =>
    setBlocks((p) => [
      ...p,
      {
        id: Date.now(),
        name,
        sets: [{ reps: '', weight: '', rest: '', rpe: '' }],
        notes: '',
      },
    ]);
  const removeBlock = (id) => setBlocks((p) => p.filter((b) => b.id !== id));
  const addSet = (id) =>
    setBlocks((p) =>
      p.map((b) =>
        b.id === id
          ? {
              ...b,
              sets: [...b.sets, { reps: '', weight: '', rest: '', rpe: '' }],
            }
          : b
      )
    );
  const updSet = (bid, si, f, v) =>
    setBlocks((p) =>
      p.map((b) => {
        if (b.id !== bid) return b;
        const s = [...b.sets];
        s[si] = { ...s[si], [f]: v };
        return { ...b, sets: s };
      })
    );
  const updNotes = (id, v) =>
    setBlocks((p) => p.map((b) => (b.id === id ? { ...b, notes: v } : b)));
  const saveWorkout = () => {
    if (!wName) {
      showToast(fr ? 'Entrez un nom' : 'Enter a workout name');
      return;
    }
    if (!blocks.length) {
      showToast(fr ? 'Ajoutez un exercice' : 'Add an exercise');
      return;
    }
    setSavedWorkouts((p) => [
      {
        id: Date.now(),
        name: wName,
        client: wClient,
        cat: wCat,
        exercises: blocks,
        date: new Date().toLocaleDateString(),
      },
      ...p,
    ]);
    showToast(fr ? `"${wName}" sauvegardé!` : `"${wName}" saved!`);
    setBlocks([]);
    setWName('');
  };
  const addClientFn = () => {
    if (!newClient.name) {
      showToast('Enter a name');
      return;
    }
    setClients((p) => [
      ...p,
      { id: Date.now(), ...newClient, tags: [newClient.goal], weeks: 0 },
    ]);
    setShowAddClient(false);
    setNewClient({ name: '', goal: 'Weight loss', freq: '3x', rate: '' });
    showToast(`${newClient.name} ${fr ? 'ajouté' : 'added'}!`);
  };
  const addInvoiceFn = () => {
    if (!newInv.amount) {
      showToast('Enter an amount');
      return;
    }
    const id = 'INV-' + String(invoices.length + 1).padStart(3, '0');
    const now = new Date(),
      mo = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
    setInvoices((p) => [
      {
        id,
        ...newInv,
        amount: parseFloat(newInv.amount),
        status: 'pending',
        date: `${mo[now.getMonth()]} ${now.getDate()}`,
      },
      ...p,
    ]);
    setShowAddInvoice(false);
    setNewInv({
      client: clients[0]?.name || '',
      amount: '',
      desc: 'PT sessions',
    });
    showToast(fr ? `Facture ${id} créée` : `Invoice ${id} created`);
  };
  const markPaid = (id) => {
    setInvoices((p) =>
      p.map((i) => (i.id === id ? { ...i, status: 'paid' } : i))
    );
    showToast(fr ? 'Marquée payée' : 'Marked as paid');
  };
  const addMovement = () => {
    if (!newMove.name) return;
    setCustomEx((p) => [...p, { ...newMove, id: Date.now(), custom: true }]);
    setNewMove({ name: '', cat: 'Legs' });
    showToast(fr ? 'Ajouté!' : 'Movement added!');
  };
  const delMovement = (id) => setCustomEx((p) => p.filter((e) => e.id !== id));

  const allEx = [...EXERCISES, ...customEx];
  const filtEx = allEx.filter(
    (e) =>
      e.name.toLowerCase().includes(exSearch.toLowerCase()) &&
      (exCat === 'All' || e.cat === exCat)
  );
  const outstanding = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((s, i) => s + i.amount, 0);
  const paidTotal = invoices
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + i.amount, 0);

  // style helpers
  const C = (extra = {}) => ({
    background: T.bg3,
    border: `1px solid ${T.border}`,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    boxShadow: T.shadow,
    ...extra,
  });
  const SC = () => ({
    background: T.bg3,
    border: `1px solid ${T.border}`,
    borderRadius: 9,
    padding: '14px 16px',
    boxShadow: T.shadow,
  });
  const TB = () => ({
    padding: '13px 22px',
    borderBottom: `1px solid ${T.border}`,
    background: dark ? T.bg : T.bg3,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  });
  const btn = (extra = {}) => ({
    padding: '6px 14px',
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid ${T.border2}`,
    background: T.bg3,
    color: T.text2,
    fontFamily: 'inherit',
    ...extra,
  });
  const btnP = () => ({
    padding: '6px 14px',
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    background: T.accent,
    color: 'white',
    fontFamily: 'inherit',
  });
  const btnSm = (extra = {}) => ({
    padding: '4px 10px',
    borderRadius: 5,
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid ${T.border2}`,
    background: T.bg3,
    color: T.text2,
    fontFamily: 'inherit',
    ...extra,
  });
  const inp = (extra = {}) => ({
    padding: '8px 10px',
    borderRadius: 7,
    border: `1px solid ${T.border2}`,
    background: T.inputBg,
    color: T.text,
    fontSize: 13,
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    ...extra,
  });
  const sl = () => ({
    padding: '8px 10px',
    borderRadius: 7,
    border: `1px solid ${T.border2}`,
    background: T.inputBg,
    color: T.text,
    fontSize: 13,
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
  });
  const pill = (s) => {
    if (s === 'paid' || s === 'active')
      return {
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 20,
        fontWeight: 600,
        background: T.greenBg,
        color: T.green,
      };
    if (s === 'pending' || s === 'onboarding')
      return {
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 20,
        fontWeight: 600,
        background: T.amberBg,
        color: T.amber,
      };
    return {
      fontSize: 10,
      padding: '2px 8px',
      borderRadius: 20,
      fontWeight: 600,
      background: T.blueBg,
      color: T.blue,
    };
  };
  const av = (name, size = 30) => ({
    width: size,
    height: size,
    borderRadius: '50%',
    background: ac(name),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size > 38 ? 15 : 11,
    fontWeight: 600,
    color: 'white',
    flexShrink: 0,
  });
  const FL = () => ({
    fontSize: 10,
    color: T.text2,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 5,
    display: 'block',
  });
  const CT = () => ({
    fontSize: 10,
    fontWeight: 500,
    color: T.text2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  });
  const OV = () => ({
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.6)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  });
  const MO = () => ({
    background: T.bg3,
    borderRadius: 12,
    padding: 24,
    width: 480,
    maxHeight: '88vh',
    overflowY: 'auto',
    border: `1px solid ${T.border2}`,
    boxShadow: '0 24px 64px rgba(0,0,0,.5)',
  });

  const navItems = [
    {
      id: 'dashboard',
      label: fr ? 'Tableau de bord' : 'Dashboard',
      section: fr ? 'Aperçu' : 'Overview',
    },
    { id: 'clients', label: 'Clients' },
    {
      id: 'workouts',
      label: fr ? 'Entraînements' : 'Workouts',
      section: fr ? 'Entraînement' : 'Training',
    },
    { id: 'programs', label: fr ? 'Programmes' : 'Programs' },
    {
      id: 'messages',
      label: 'Messages',
      section: fr ? 'Gestion' : 'Business',
      badge: 2,
    },
    { id: 'invoices', label: fr ? 'Factures' : 'Invoices' },
  ];

  const Row = ({ children, last }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderBottom: last ? 'none' : `1px solid ${T.border}`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Inter',-apple-system,sans-serif",
        fontSize: 13,
        background: T.bg,
        color: T.text,
        transition: 'background .25s,color .25s',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Inter:wght@400;500;600&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${T.border2};border-radius:3px;}`}</style>

      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          background: dark ? T.bg : T.bg3,
          borderRight: `1px solid ${T.border}`,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          transition: 'background .25s',
        }}
      >
        <div
          style={{
            padding: '18px 16px',
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoMark size={34} />
            <LogoWordmark T={T} />
          </div>
        </div>
        <nav style={{ padding: '10px 8px', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.section && (
                <div
                  style={{
                    fontSize: 9,
                    color: T.text3,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    padding: '0 8px',
                    margin: '14px 0 4px',
                  }}
                >
                  {item.section}
                </div>
              )}
              <div
                onClick={() => setView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 8px',
                  borderRadius: 7,
                  cursor: 'pointer',
                  fontSize: 12.5,
                  marginBottom: 1,
                  background:
                    view === item.id
                      ? dark
                        ? T.accentBg
                        : T.accentLight
                      : 'transparent',
                  color: view === item.id ? T.accent : T.text2,
                  fontWeight: view === item.id ? 500 : 400,
                  transition: 'all .1s',
                }}
              >
                <NI name={item.id} />
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      background: T.accent,
                      color: 'white',
                      fontSize: 9,
                      fontWeight: 600,
                      borderRadius: 10,
                      padding: '1px 5px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>
        <div
          style={{ padding: '12px 16px', borderTop: `1px solid ${T.border}` }}
        >
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <button
              onClick={() => setDark((d) => !d)}
              style={btnSm({ flex: 1, textAlign: 'center' })}
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              style={btnSm({ flex: 1, textAlign: 'center' })}
            >
              {lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{ ...av('MB', 28), background: T.accent, fontSize: 10 }}
            >
              MB
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.text,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                Mitch Brown
              </div>
              <div style={{ fontSize: 10, color: T.text3 }}>
                {fr ? 'Entraîneur principal' : 'Head Trainer'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: T.bg2,
          transition: 'background .25s',
        }}
      >
        {/* DASHBOARD */}
        {view === 'dashboard' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                {fr ? 'Tableau de bord' : 'Dashboard'}
              </h1>
              <span style={{ fontSize: 12, color: T.text3 }}>
                {new Date().toLocaleDateString('en-CA', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                {[
                  {
                    l: fr ? 'Clients actifs' : 'Active clients',
                    v: clients.length,
                    s: '+2 this month',
                    c: T.green,
                  },
                  {
                    l: fr ? 'Sessions' : 'Sessions this week',
                    v: 28,
                    s: '4 today',
                    c: T.text3,
                  },
                  {
                    l: fr ? 'Solde dû' : 'Outstanding',
                    v: '$' + outstanding.toLocaleString(),
                    s:
                      invoices.filter((i) => i.status === 'pending').length +
                      ' pending',
                    c: T.amber,
                  },
                  {
                    l: fr ? 'Revenu' : 'Revenue this month',
                    v: '$6,200',
                    s: '+12% vs last',
                    c: T.green,
                  },
                ].map((st, i) => (
                  <div key={i} style={SC()}>
                    <div
                      style={{ fontSize: 11, color: T.text3, marginBottom: 5 }}
                    >
                      {st.l}
                    </div>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, color: T.text }}
                    >
                      {st.v}
                    </div>
                    <div style={{ fontSize: 11, color: st.c, marginTop: 3 }}>
                      {st.s}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <div style={C()}>
                  <div style={CT()}>
                    {fr ? 'Clients récents' : 'Recent clients'}
                  </div>
                  {clients.map((c, i) => (
                    <Row key={c.id} last={i === clients.length - 1}>
                      <div style={av(c.name, 30)}>{inits(c.name)}</div>
                      <div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 12.5,
                            color: T.text,
                          }}
                        >
                          {c.name}
                        </div>
                        <div style={{ fontSize: 11, color: T.text3 }}>
                          {c.goal}
                        </div>
                      </div>
                      <span style={{ ...pill('active'), marginLeft: 'auto' }}>
                        {fr ? 'Actif' : 'Active'}
                      </span>
                    </Row>
                  ))}
                </div>
                <div style={C()}>
                  <div style={CT()}>
                    {fr ? "Sessions d'aujourd'hui" : "Today's sessions"}
                  </div>
                  {[
                    { t: '9:00', c: clients[0] },
                    { t: '11:00', c: clients[1] },
                    { t: '14:00', c: clients[3] },
                    { t: '16:30', c: clients[2] },
                  ].map((row, i) => (
                    <Row key={i} last={i === 3}>
                      <div
                        style={{
                          width: 36,
                          fontSize: 10,
                          color: T.text3,
                          fontFamily: 'monospace',
                          flexShrink: 0,
                        }}
                      >
                        {row.t}
                      </div>
                      <div style={av(row.c?.name || '', 30)}>
                        {inits(row.c?.name || '')}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 12.5,
                            color: T.text,
                          }}
                        >
                          {row.c?.name}
                        </div>
                        <div style={{ fontSize: 11, color: T.text3 }}>
                          Session
                        </div>
                      </div>
                    </Row>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CLIENTS */}
        {view === 'clients' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                Clients
              </h1>
              <button style={btnP()} onClick={() => setShowAddClient(true)}>
                + {fr ? 'Ajouter' : 'Add client'}
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 12,
                }}
              >
                {clients.map((c) => (
                  <div key={c.id} style={C({ marginBottom: 0 })}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 12,
                      }}
                    >
                      <div style={av(c.name, 42)}>{inits(c.name)}</div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: T.text,
                          }}
                        >
                          {c.name}
                        </div>
                        <div style={{ fontSize: 11, color: T.text3 }}>
                          {c.goal}
                        </div>
                      </div>
                      <span style={pill('active')}>
                        {fr ? 'Actif' : 'Active'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                      {[
                        { v: c.freq, l: fr ? 'par sem' : 'per wk' },
                        { v: c.weeks, l: fr ? 'semaines' : 'weeks' },
                        { v: '$' + c.rate, l: fr ? 'mensuel' : 'monthly' },
                      ].map((s, i) => (
                        <div key={i} style={{ fontSize: 11, color: T.text3 }}>
                          <strong
                            style={{
                              display: 'block',
                              fontSize: 15,
                              fontWeight: 600,
                              color: T.text,
                            }}
                          >
                            {s.v}
                          </strong>
                          {s.l}
                        </div>
                      ))}
                    </div>
                    <div>
                      {(c.tags || []).map((t) => (
                        <span
                          key={t}
                          style={{
                            display: 'inline-block',
                            fontSize: 10,
                            padding: '2px 7px',
                            borderRadius: 4,
                            background: T.bg4,
                            color: T.text3,
                            marginRight: 4,
                            marginTop: 4,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div
                  style={C({
                    marginBottom: 0,
                    border: `1px dashed ${T.border2}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 8,
                    color: T.text3,
                    cursor: 'pointer',
                    minHeight: 150,
                  })}
                  onClick={() => setShowAddClient(true)}
                >
                  <div style={{ fontSize: 30, lineHeight: 1 }}>+</div>
                  <div style={{ fontSize: 12 }}>
                    {fr ? 'Ajouter un client' : 'Add new client'}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* WORKOUTS */}
        {view === 'workouts' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                {fr ? 'Entraînements' : 'Workouts'}
              </h1>
              <button style={btn()} onClick={() => setShowLibrary(true)}>
                {fr ? 'Gérer' : 'Manage library'}
              </button>
              <button
                style={btn()}
                onClick={() =>
                  setWTab(wTab === 'builder' ? 'saved' : 'builder')
                }
              >
                {wTab === 'builder'
                  ? fr
                    ? 'Sauvegardés'
                    : 'Saved'
                  : fr
                  ? 'Retour'
                  : 'Builder'}
              </button>
              {wTab === 'builder' && (
                <button style={btnP()} onClick={saveWorkout}>
                  {fr ? 'Sauvegarder' : 'Save'}
                </button>
              )}
            </div>
            {wTab === 'builder' ? (
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr',
                  gap: 14,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    background: T.bg3,
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    overflowY: 'auto',
                  }}
                >
                  <div
                    style={{ fontWeight: 600, fontSize: 12, color: T.text2 }}
                  >
                    {fr ? 'Bibliothèque' : 'Library'}
                  </div>
                  <input
                    style={inp()}
                    placeholder={fr ? 'Rechercher...' : 'Search...'}
                    value={exSearch}
                    onChange={(e) => setExSearch(e.target.value)}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {CATS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setExCat(c)}
                        style={{
                          fontSize: 9,
                          padding: '3px 7px',
                          borderRadius: 20,
                          border: 'none',
                          background: exCat === c ? T.accent : T.bg4,
                          color: exCat === c ? 'white' : T.text3,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontWeight: 500,
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filtEx.map((e, i) => (
                      <div
                        key={i}
                        onClick={() => addBlock(e.name)}
                        style={{
                          padding: '7px 8px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: 12,
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: e.custom ? T.accent : T.text2,
                          marginBottom: 1,
                        }}
                      >
                        <span>
                          {e.name}
                          {e.custom ? ' ★' : ''}
                        </span>
                        <span style={{ fontSize: 9, color: T.text3 }}>
                          {e.cat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    overflowY: 'auto',
                  }}
                >
                  <div
                    style={{
                      background: T.bg3,
                      border: `1px solid ${T.border}`,
                      borderRadius: 10,
                      padding: 14,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr auto',
                      gap: 10,
                      alignItems: 'end',
                    }}
                  >
                    <div>
                      <label style={FL()}>{fr ? 'Nom' : 'Name'}</label>
                      <input
                        style={inp()}
                        placeholder="e.g. Push Day A"
                        value={wName}
                        onChange={(e) => setWName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={FL()}>Client</label>
                      <select
                        style={sl()}
                        value={wClient}
                        onChange={(e) => setWClient(e.target.value)}
                      >
                        {clients.map((c) => (
                          <option key={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={FL()}>
                        {fr ? 'Catégorie' : 'Category'}
                      </label>
                      <select
                        style={sl()}
                        value={wCat}
                        onChange={(e) => setWCat(e.target.value)}
                      >
                        {[
                          'Strength',
                          'Hypertrophy',
                          'HIIT',
                          'Cardio',
                          'Mobility',
                          'Rehab',
                        ].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      style={btn()}
                      onClick={() => {
                        const n = prompt('Exercise name:');
                        if (n) addBlock(n);
                      }}
                    >
                      + Custom
                    </button>
                  </div>
                  {blocks.length === 0 ? (
                    <div
                      style={{
                        background: T.bg3,
                        border: `1px dashed ${T.border2}`,
                        borderRadius: 10,
                        padding: 48,
                        textAlign: 'center',
                        color: T.text3,
                        fontSize: 13,
                      }}
                    >
                      {fr
                        ? "Cliquez sur un exercice pour l'ajouter"
                        : 'Click an exercise to add it'}
                    </div>
                  ) : (
                    blocks.map((block, bi) => (
                      <div
                        key={block.id}
                        style={{
                          background: T.bg3,
                          border: `1px solid ${T.border}`,
                          borderRadius: 10,
                          padding: '14px 16px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 5,
                              background: T.accentLight,
                              color: T.accent,
                              fontSize: 11,
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {bi + 1}
                          </div>
                          <div
                            style={{ fontWeight: 600, flex: 1, color: T.text }}
                          >
                            {block.name}
                          </div>
                          <button
                            style={btnSm({
                              color: T.accent,
                              borderColor: T.accentLight,
                              background: T.accentLight,
                            })}
                            onClick={() => removeBlock(block.id)}
                          >
                            {fr ? 'Retirer' : 'Remove'}
                          </button>
                        </div>
                        <table
                          style={{ width: '100%', borderCollapse: 'collapse' }}
                        >
                          <thead>
                            <tr>
                              {[
                                '#',
                                'Reps',
                                fr ? 'Poids' : 'Weight',
                                fr ? 'Repos' : 'Rest',
                                'RPE',
                              ].map((h) => (
                                <th
                                  key={h}
                                  style={{
                                    fontSize: 10,
                                    color: T.text3,
                                    textAlign: 'left',
                                    padding: '4px 6px',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.sets.map((set, si) => (
                              <tr key={si}>
                                <td
                                  style={{
                                    padding: '3px 6px',
                                    fontSize: 11,
                                    color: T.text3,
                                    width: 24,
                                  }}
                                >
                                  {si + 1}
                                </td>
                                {['reps', 'weight', 'rest', 'rpe'].map((f) => (
                                  <td key={f} style={{ padding: '3px 6px' }}>
                                    <input
                                      type="number"
                                      value={set[f]}
                                      onChange={(e) =>
                                        updSet(block.id, si, f, e.target.value)
                                      }
                                      style={inp({
                                        textAlign: 'center',
                                        padding: '5px 6px',
                                        fontSize: 12,
                                      })}
                                      placeholder={
                                        f === 'reps'
                                          ? '10'
                                          : f === 'weight'
                                          ? '60'
                                          : f === 'rest'
                                          ? '90'
                                          : '7'
                                      }
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          onClick={() => addSet(block.id)}
                          style={{
                            fontSize: 11,
                            color: T.accent,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: 8,
                            fontFamily: 'inherit',
                          }}
                        >
                          + {fr ? 'Série' : 'Add set'}
                        </button>
                        <textarea
                          value={block.notes}
                          onChange={(e) => updNotes(block.id, e.target.value)}
                          placeholder={
                            fr ? 'Notes de coaching...' : 'Coaching notes...'
                          }
                          rows={2}
                          style={inp({
                            marginTop: 8,
                            fontSize: 11,
                            resize: 'none',
                          })}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
                <div style={C()}>
                  <div style={CT()}>
                    {fr ? 'Entraînements sauvegardés' : 'Saved workouts'} (
                    {savedWorkouts.length})
                  </div>
                  {savedWorkouts.length === 0 ? (
                    <div style={{ color: T.text3, fontSize: 12 }}>
                      {fr ? 'Aucun.' : 'None yet.'}
                    </div>
                  ) : (
                    <table
                      style={{ width: '100%', borderCollapse: 'collapse' }}
                    >
                      <thead>
                        <tr>
                          {[
                            fr ? 'Nom' : 'Name',
                            'Client',
                            'Category',
                            'Exercises',
                            'Date',
                          ].map((h) => (
                            <th
                              key={h}
                              style={{
                                fontSize: 10,
                                color: T.text3,
                                textAlign: 'left',
                                padding: '8px 10px',
                                borderBottom: `1px solid ${T.border}`,
                                fontWeight: 500,
                                textTransform: 'uppercase',
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {savedWorkouts.map((w) => (
                          <tr key={w.id}>
                            <td
                              style={{
                                padding: '10px 10px',
                                fontWeight: 600,
                                color: T.text,
                              }}
                            >
                              {w.name}
                            </td>
                            <td
                              style={{ padding: '10px 10px', color: T.text2 }}
                            >
                              {w.client}
                            </td>
                            <td style={{ padding: '10px 10px' }}>
                              <span
                                style={{
                                  ...pill('info'),
                                  background: T.blueBg,
                                  color: T.blue,
                                }}
                              >
                                {w.cat}
                              </span>
                            </td>
                            <td
                              style={{ padding: '10px 10px', color: T.text3 }}
                            >
                              {w.exercises.length}
                            </td>
                            <td
                              style={{
                                padding: '10px 10px',
                                color: T.text3,
                                fontSize: 11,
                              }}
                            >
                              {w.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* PROGRAMS */}
        {view === 'programs' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                {fr ? 'Programmes' : 'Programs'}
              </h1>
              <button style={btnP()}>+ {fr ? 'Nouveau' : 'New'}</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 12,
                }}
              >
                {[
                  {
                    name: '12-Week Fat Loss',
                    client: 'Sarah Chen',
                    days: 3,
                    level: 'Intermediate',
                    total: 12,
                    cur: 8,
                  },
                  {
                    name: 'PPL Hypertrophy Block',
                    client: 'Marcus Reid',
                    days: 6,
                    level: 'Advanced',
                    total: 0,
                    cur: 0,
                  },
                  {
                    name: 'Athletic Perf Block',
                    client: 'Tom Kim',
                    days: 5,
                    level: 'Advanced',
                    total: 24,
                    cur: 12,
                  },
                ].map((p, i) => (
                  <div key={i} style={C({ marginBottom: 0 })}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13.5,
                          color: T.text,
                          flex: 1,
                        }}
                      >
                        {p.name}
                      </div>
                      <span style={pill('active')}>
                        {fr ? 'Actif' : 'Active'}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: 11, color: T.text3, marginBottom: 6 }}
                    >
                      {p.days} {fr ? 'jours/sem' : 'days/wk'} · {p.level}
                    </div>
                    <div
                      style={{ fontSize: 11, color: T.text2, marginBottom: 10 }}
                    >
                      Client:{' '}
                      <strong style={{ color: T.text }}>{p.client}</strong>
                    </div>
                    <div
                      style={{
                        background: T.bg4,
                        borderRadius: 4,
                        height: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            p.total ? Math.round((p.cur / p.total) * 100) : 100
                          }%`,
                          height: '100%',
                          background: T.accent,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 10, color: T.text3, marginTop: 5 }}>
                      {p.total
                        ? `${fr ? 'Sem.' : 'Week'} ${p.cur} ${
                            fr ? 'sur' : 'of'
                          } ${p.total}`
                        : fr
                        ? 'En cours'
                        : 'Ongoing'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MESSAGES */}
        {view === 'messages' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                Messages
              </h1>
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '210px 1fr',
              }}
            >
              <div
                style={{
                  background: dark ? T.bg : T.bg3,
                  borderRight: `1px solid ${T.border}`,
                  overflowY: 'auto',
                }}
              >
                {clients.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setChatClient(c)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 14px',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${T.border}`,
                      background:
                        chatClient?.id === c.id
                          ? dark
                            ? T.accentBg
                            : T.accentLight
                          : 'transparent',
                      transition: 'background .1s',
                    }}
                  >
                    <div style={av(c.name, 30)}>{inits(c.name)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: chatClient?.id === c.id ? T.accent : T.text,
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: T.text3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 130,
                        }}
                      >
                        {(msgs[c.id] || []).slice(-1)[0]?.t || '...'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {chatClient && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: T.bg2,
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderBottom: `1px solid ${T.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: dark ? T.bg : T.bg3,
                      flexShrink: 0,
                    }}
                  >
                    <div style={av(chatClient.name, 30)}>
                      {inits(chatClient.name)}
                    </div>
                    <div>
                      <div
                        style={{ fontWeight: 600, fontSize: 13, color: T.text }}
                      >
                        {chatClient.name}
                      </div>
                      <div style={{ fontSize: 11, color: T.green }}>
                        {fr ? 'Client actif' : 'Active client'}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {(msgs[chatClient.id] || []).map((m, i) => (
                      <div
                        key={i}
                        style={{
                          maxWidth: '68%',
                          alignSelf: m.f === 'sent' ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            padding: '9px 13px',
                            fontSize: 13,
                            lineHeight: 1.55,
                            borderRadius:
                              m.f === 'sent'
                                ? '12px 3px 12px 12px'
                                : '3px 12px 12px 12px',
                            background: m.f === 'sent' ? T.accent : T.bg3,
                            color: m.f === 'sent' ? 'white' : T.text,
                            border:
                              m.f === 'recv' ? `1px solid ${T.border}` : 'none',
                          }}
                        >
                          {m.t}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: T.text3,
                            marginTop: 3,
                            textAlign: m.f === 'sent' ? 'right' : 'left',
                          }}
                        >
                          {m.ts}
                        </div>
                      </div>
                    ))}
                    <div ref={msgBottom} />
                  </div>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderTop: `1px solid ${T.border}`,
                      display: 'flex',
                      gap: 8,
                      background: dark ? T.bg : T.bg3,
                      flexShrink: 0,
                    }}
                  >
                    <input
                      style={inp({ flex: 1 })}
                      placeholder={`${fr ? 'Message à' : 'Message'} ${
                        chatClient.name.split(' ')[0]
                      }...`}
                      value={chatText}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMsg();
                      }}
                    />
                    <button style={btnP()} onClick={sendMsg}>
                      {fr ? 'Envoyer' : 'Send'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* INVOICES */}
        {view === 'invoices' && (
          <>
            <div style={TB()}>
              <h1
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                  color: T.text,
                }}
              >
                {fr ? 'Factures' : 'Invoices'}
              </h1>
              <button style={btnP()} onClick={() => setShowAddInvoice(true)}>
                + {fr ? 'Nouvelle' : 'New'}
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    l: fr ? 'Solde dû' : 'Outstanding',
                    v: '$' + outstanding.toLocaleString(),
                  },
                  {
                    l: fr ? 'Total payé' : 'Total paid',
                    v: '$' + paidTotal.toLocaleString(),
                  },
                  { l: fr ? 'Factures' : 'Invoices', v: invoices.length },
                ].map((st, i) => (
                  <div key={i} style={SC()}>
                    <div
                      style={{ fontSize: 11, color: T.text3, marginBottom: 5 }}
                    >
                      {st.l}
                    </div>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, color: T.text }}
                    >
                      {st.v}
                    </div>
                  </div>
                ))}
              </div>
              <div style={C()}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[
                        fr ? 'Facture #' : 'Invoice #',
                        'Client',
                        'Description',
                        fr ? 'Montant' : 'Amount',
                        'Date',
                        fr ? 'Statut' : 'Status',
                        '',
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontSize: 10,
                            color: T.text3,
                            textAlign: 'left',
                            padding: '8px 10px',
                            borderBottom: `1px solid ${T.border}`,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr
                        key={inv.id}
                        style={{ borderBottom: `1px solid ${T.border}` }}
                      >
                        <td
                          style={{
                            padding: '10px 10px',
                            fontFamily: 'monospace',
                            fontSize: 11,
                            color: T.text3,
                          }}
                        >
                          {inv.id}
                        </td>
                        <td
                          style={{
                            padding: '10px 10px',
                            fontWeight: 500,
                            color: T.text,
                          }}
                        >
                          {inv.client}
                        </td>
                        <td
                          style={{
                            padding: '10px 10px',
                            color: T.text2,
                            fontSize: 12,
                          }}
                        >
                          {inv.desc}
                        </td>
                        <td
                          style={{
                            padding: '10px 10px',
                            fontWeight: 600,
                            color: T.text,
                          }}
                        >
                          ${inv.amount.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: '10px 10px',
                            color: T.text3,
                            fontSize: 11,
                          }}
                        >
                          {inv.date}
                        </td>
                        <td style={{ padding: '10px 10px' }}>
                          <span style={pill(inv.status)}>
                            {inv.status === 'paid'
                              ? fr
                                ? 'Payé'
                                : 'Paid'
                              : fr
                              ? 'En attente'
                              : 'Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 10px' }}>
                          {inv.status !== 'paid' && (
                            <button
                              style={btnSm()}
                              onClick={() => markPaid(inv.id)}
                            >
                              {fr ? 'Marquer payé' : 'Mark paid'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ADD CLIENT */}
      {showAddClient && (
        <div
          style={OV()}
          onClick={(e) =>
            e.target === e.currentTarget && setShowAddClient(false)
          }
        >
          <div style={MO()}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 20,
                color: T.text,
              }}
            >
              {fr ? 'Ajouter un client' : 'Add new client'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={FL()}>{fr ? 'Nom complet' : 'Full name'}</label>
                <input
                  style={inp()}
                  placeholder="Jane Smith"
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <div>
                  <label style={FL()}>{fr ? 'Objectif' : 'Goal'}</label>
                  <select
                    style={sl()}
                    value={newClient.goal}
                    onChange={(e) =>
                      setNewClient({ ...newClient, goal: e.target.value })
                    }
                  >
                    {[
                      fr ? 'Perte de poids' : 'Weight loss',
                      fr ? 'Force' : 'Strength',
                      'Hypertrophy',
                      fr ? 'Performance' : 'Athletic performance',
                      fr ? 'Rééducation' : 'Injury rehab',
                      fr ? 'Forme générale' : 'General fitness',
                    ].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={FL()}>
                    {fr ? 'Sessions/sem' : 'Sessions/wk'}
                  </label>
                  <select
                    style={sl()}
                    value={newClient.freq}
                    onChange={(e) =>
                      setNewClient({ ...newClient, freq: e.target.value })
                    }
                  >
                    {['1x', '2x', '3x', '4x', '5x'].map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={FL()}>
                  {fr ? 'Tarif mensuel ($)' : 'Monthly rate ($)'}
                </label>
                <input
                  style={inp()}
                  type="number"
                  placeholder="280"
                  value={newClient.rate}
                  onChange={(e) =>
                    setNewClient({ ...newClient, rate: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
                marginTop: 22,
              }}
            >
              <button style={btn()} onClick={() => setShowAddClient(false)}>
                {fr ? 'Annuler' : 'Cancel'}
              </button>
              <button style={btnP()} onClick={addClientFn}>
                {fr ? 'Ajouter' : 'Add client'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD INVOICE */}
      {showAddInvoice && (
        <div
          style={OV()}
          onClick={(e) =>
            e.target === e.currentTarget && setShowAddInvoice(false)
          }
        >
          <div style={MO()}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 20,
                color: T.text,
              }}
            >
              {fr ? 'Nouvelle facture' : 'New invoice'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={FL()}>Client</label>
                <select
                  style={sl()}
                  value={newInv.client}
                  onChange={(e) =>
                    setNewInv({ ...newInv, client: e.target.value })
                  }
                >
                  {clients.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={FL()}>{fr ? 'Description' : 'Description'}</label>
                <input
                  style={inp()}
                  value={newInv.desc}
                  onChange={(e) =>
                    setNewInv({ ...newInv, desc: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={FL()}>{fr ? 'Montant ($)' : 'Amount ($)'}</label>
                <input
                  style={inp()}
                  type="number"
                  placeholder="280"
                  value={newInv.amount}
                  onChange={(e) =>
                    setNewInv({ ...newInv, amount: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
                marginTop: 22,
              }}
            >
              <button style={btn()} onClick={() => setShowAddInvoice(false)}>
                {fr ? 'Annuler' : 'Cancel'}
              </button>
              <button style={btnP()} onClick={addInvoiceFn}>
                {fr ? 'Créer' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIBRARY */}
      {showLibrary && (
        <div
          style={OV()}
          onClick={(e) => e.target === e.currentTarget && setShowLibrary(false)}
        >
          <div style={MO()}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 20,
                color: T.text,
              }}
            >
              {fr ? 'Gérer la bibliothèque' : 'Manage exercise library'}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto',
                gap: 8,
                marginBottom: 14,
                alignItems: 'end',
              }}
            >
              <div>
                <label style={FL()}>{fr ? 'Mouvement' : 'Movement'}</label>
                <input
                  style={inp()}
                  placeholder={fr ? 'ex: Squat gobelet' : 'e.g. Goblet Squat'}
                  value={newMove.name}
                  onChange={(e) =>
                    setNewMove({ ...newMove, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={FL()}>
                  {fr ? 'Groupe musculaire' : 'Muscle group'}
                </label>
                <select
                  style={sl()}
                  value={newMove.cat}
                  onChange={(e) =>
                    setNewMove({ ...newMove, cat: e.target.value })
                  }
                >
                  {CATS.filter((c) => c !== 'All').map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button style={btnP()} onClick={addMovement}>
                +
              </button>
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
              <div
                style={{
                  fontSize: 10,
                  color: T.text3,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginBottom: 10,
                }}
              >
                {fr ? 'Mouvements personnalisés' : 'Custom movements'} (
                {customEx.length})
              </div>
              {customEx.length === 0 ? (
                <div style={{ color: T.text3, fontSize: 12 }}>—</div>
              ) : (
                customEx.map((ex) => (
                  <div
                    key={ex.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 10px',
                      background: T.bg4,
                      borderRadius: 6,
                      marginBottom: 4,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 500,
                        color: T.text,
                      }}
                    >
                      {ex.name}
                    </span>
                    <span style={{ fontSize: 10, color: T.text3 }}>
                      {ex.cat}
                    </span>
                    <button
                      style={btnSm({
                        color: T.accent,
                        background: T.accentLight,
                        borderColor: T.accentLight,
                      })}
                      onClick={() => delMovement(ex.id)}
                    >
                      {fr ? 'Supprimer' : 'Delete'}
                    </button>
                  </div>
                ))
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 20,
              }}
            >
              <button style={btn()} onClick={() => setShowLibrary(false)}>
                {fr ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: T.text,
            color: T.bg,
            padding: '10px 18px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            zIndex: 999,
            boxShadow: '0 4px 20px rgba(0,0,0,.3)',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
