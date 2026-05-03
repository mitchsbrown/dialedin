import React, { useState, useRef, useEffect } from 'react';

const EXERCISES = [
  {name:'Squat',cat:'Legs'},{name:'Romanian Deadlift',cat:'Legs'},{name:'Leg Press',cat:'Legs'},{name:'Bulgarian Split Squat',cat:'Legs'},{name:'Hip Thrust',cat:'Legs'},
  {name:'Bench Press',cat:'Chest'},{name:'Incline DB Press',cat:'Chest'},{name:'Cable Fly',cat:'Chest'},{name:'Dips',cat:'Chest'},
  {name:'Pull-Up',cat:'Back'},{name:'Barbell Row',cat:'Back'},{name:'Lat Pulldown',cat:'Back'},{name:'Deadlift',cat:'Back'},
  {name:'Overhead Press',cat:'Shoulders'},{name:'Lateral Raise',cat:'Shoulders'},{name:'Face Pull',cat:'Shoulders'},
  {name:'Bicep Curl',cat:'Arms'},{name:'Tricep Pushdown',cat:'Arms'},{name:'Hammer Curl',cat:'Arms'},{name:'Skull Crusher',cat:'Arms'},
  {name:'Plank',cat:'Core'},{name:'Dead Bug',cat:'Core'},{name:'Hanging Leg Raise',cat:'Core'},{name:'Ab Wheel',cat:'Core'},
  {name:'Box Jump',cat:'Power'},{name:'Sled Push',cat:'Conditioning'},{name:'Battle Ropes',cat:'Conditioning'},{name:'Burpee',cat:'Conditioning'},
  {name:'Hip Flexor Stretch',cat:'Mobility'},{name:'Ankle Mobility',cat:'Mobility'},{name:'Thoracic Rotation',cat:'Mobility'},
];
const CATS = ['All','Legs','Chest','Back','Shoulders','Arms','Core','Power','Conditioning','Mobility'];
const AVATAR_COLORS = ['#E24B4A','#378ADD','#BA7517','#639922','#D4537E','#7F77DD','#1D9E75','#EF9F27'];
const ac = (name) => AVATAR_COLORS[name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0];
const inits = (name) => name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || '';

const GOALS = ['Weight loss','Strength','Hypertrophy','Athletic performance','Injury rehab','General fitness'];
const FREQS = ['1x','2x','3x','4x','5x','6x'];
const LEVELS = ['Beginner','Intermediate','Advanced'];

function theme(dark) {
  return dark ? {
    bg:'#0a0a0a',bg2:'#111',bg3:'#161616',bg4:'#1e1e1e',
    border:'#1e1e1e',border2:'#2a2a2a',
    text:'#e8e8e8',text2:'#888',text3:'#3a3a3a',
    accent:'#E24B4A',accentDark:'#c03030',accentBg:'#1a0808',accentLight:'#2a0a0a',
    green:'#4CAF50',greenBg:'#0d2010',
    amber:'#f59e0b',amberBg:'#2a1a00',
    blue:'#378ADD',blueBg:'#0a1a2e',
    inputBg:'#161616',shadow:'none',
  } : {
    bg:'#f0eeeb',bg2:'#f5f4f2',bg3:'#ffffff',bg4:'#f0eeeb',
    border:'rgba(0,0,0,.09)',border2:'rgba(0,0,0,.15)',
    text:'#111',text2:'#666',text3:'#bbb',
    accent:'#E24B4A',accentDark:'#c03030',accentBg:'#fff0f0',accentLight:'#FCEBEB',
    green:'#2d8a2d',greenBg:'#eaf5ea',
    amber:'#b45309',amberBg:'#fef3c7',
    blue:'#185FA5',blueBg:'#e6f0fb',
    inputBg:'#fafafa',shadow:'0 1px 3px rgba(0,0,0,.06)',
  };
}

function LogoMark({ size=34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <rect width="34" height="34" rx="8" fill="#E24B4A"/>
      <circle cx="17" cy="17" r="8" stroke="white" strokeWidth="1.7" fill="none"/>
      <line x1="17" y1="5" x2="17" y2="9" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="17" y1="25" x2="17" y2="29" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="5" y1="17" x2="9" y2="17" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="25" y1="17" x2="29" y2="17" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="9.5" y1="9.5" x2="11.8" y2="11.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
      <line x1="22.2" y1="22.2" x2="24.5" y2="24.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
      <line x1="24.5" y1="9.5" x2="22.2" y2="11.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
      <line x1="9.5" y1="24.5" x2="11.8" y2="22.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
      <circle cx="17" cy="17" r="3" fill="white"/>
      <circle cx="17" cy="17" r="1.2" fill="#E24B4A"/>
    </svg>
  );
}

function LogoWordmark({ T }) {
  return (
    <div style={{ lineHeight:1 }}>
      <div style={{ fontFamily:"'Barlow Condensed','Arial Narrow',sans-serif", fontSize:20, fontWeight:700, letterSpacing:1, color:T.text }}>
        DIALED <span style={{ color:'#E24B4A' }}>IN</span>
      </div>
      <svg width="88" height="10" viewBox="0 0 88 10" style={{ display:'block', marginTop:1 }}>
        <polyline points="0,5 10,5 13,5 15,1 17,9 19,0 21,10 23,5 36,5 39,5 41,3 43,7 45,5 88,5" fill="none" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{ fontSize:8, color:T.text3, letterSpacing:2, textTransform:'uppercase', marginTop:3 }}>personal training</div>
    </div>
  );
}

const NavIcons = {
  dashboard:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  clients:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  workouts:<><path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4M6 9h12M6 15h12"/></>,
  programs:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  messages:<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
  invoices:<><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
};

function NI({ name }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{NavIcons[name]}</svg>;
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const fr = lang === 'fr';
  const T = theme(dark);
  const msgBottom = useRef(null);

  // ── TRAINER INFO (editable in settings) ──
  const [trainerInfo, setTrainerInfo] = useState({
    name: 'Mitch Brown',
    title: 'Head Trainer',
    business: 'Dialed IN Personal Training',
    email: '',
    phone: '',
    rate: 70,
    currency: 'CAD',
  });

  // ── CLIENTS ──
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const blankClient = { name:'', goal:'Weight loss', freq:'3x', rate:'', tags:'', weeks:0, email:'', phone:'', notes:'' };
  const [clientForm, setClientForm] = useState(blankClient);
  const [showClientModal, setShowClientModal] = useState(false);

  // ── INVOICES ──
  const [invoices, setInvoices] = useState([]);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [newInv, setNewInv] = useState({ client:'', amount:'', desc:'PT sessions', due:'' });

  // ── MESSAGES ──
  const [msgs, setMsgs] = useState({});
  const [chatClient, setChatClient] = useState(null);
  const [chatText, setChatText] = useState('');

  // ── WORKOUTS ──
  const [customEx, setCustomEx] = useState([]);
  const [newMove, setNewMove] = useState({ name:'', cat:'Legs' });
  const [blocks, setBlocks] = useState([]);
  const [wName, setWName] = useState('');
  const [wClient, setWClient] = useState('');
  const [wCat, setWCat] = useState('Strength');
  const [exSearch, setExSearch] = useState('');
  const [exCat, setExCat] = useState('All');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [wTab, setWTab] = useState('builder');
  const [showLibrary, setShowLibrary] = useState(false);

  // ── SETTINGS ──
  const [settingsTab, setSettingsTab] = useState('trainer');
  const [trainerForm, setTrainerForm] = useState(trainerInfo);

  const [toast, setToast] = useState('');

  useEffect(() => {
    if (clients.length) { setWClient(clients[0].name); setNewInv(i=>({...i,client:clients[0].name})); setChatClient(clients[0]); }
  }, [clients]);
  useEffect(() => { msgBottom.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, chatClient]);

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(''), 2500); };

  // ── CLIENT CRUD ──
  function openAddClient() { setEditingClient(null); setClientForm(blankClient); setShowClientModal(true); }
  function openEditClient(c) {
    setEditingClient(c.id);
    setClientForm({ ...c, tags: (c.tags||[]).join(', ') });
    setShowClientModal(true);
  }
  function saveClient() {
    if (!clientForm.name) { showToast('Enter a name'); return; }
    const parsed = {
      ...clientForm,
      rate: parseFloat(clientForm.rate) || 0,
      tags: clientForm.tags ? clientForm.tags.split(',').map(t=>t.trim()).filter(Boolean) : [],
    };
    if (editingClient) {
      setClients(p => p.map(c => c.id === editingClient ? { ...parsed, id: editingClient } : c));
      showToast(`${parsed.name} updated!`);
    } else {
      const newC = { ...parsed, id: Date.now() };
      setClients(p => [...p, newC]);
      setMsgs(m => ({ ...m, [newC.id]: [] }));
      showToast(`${parsed.name} added!`);
    }
    setShowClientModal(false);
  }
  function deleteClient(id) {
    setClients(p => p.filter(c => c.id !== id));
    if (chatClient?.id === id) setChatClient(null);
    showToast('Client removed');
  }

  // ── MESSAGES ──
  const sendMsg = () => {
    if (!chatText.trim() || !chatClient) return;
    const now = new Date(), ts = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    setMsgs(p => ({ ...p, [chatClient.id]: [...(p[chatClient.id]||[]), { f:'sent', t:chatText, ts }] }));
    setChatText('');
  };

  // ── WORKOUTS ──
  const addBlock = (name) => setBlocks(p=>[...p,{id:Date.now(),name,sets:[{reps:'',weight:'',rest:'',rpe:''}],notes:''}]);
  const removeBlock = (id) => setBlocks(p=>p.filter(b=>b.id!==id));
  const addSet = (id) => setBlocks(p=>p.map(b=>b.id===id?{...b,sets:[...b.sets,{reps:'',weight:'',rest:'',rpe:''}]}:b));
  const updSet = (bid,si,f,v) => setBlocks(p=>p.map(b=>{if(b.id!==bid)return b;const s=[...b.sets];s[si]={...s[si],[f]:v};return{...b,sets:s};}));
  const updNotes = (id,v) => setBlocks(p=>p.map(b=>b.id===id?{...b,notes:v}:b));
  const saveWorkout = () => {
    if (!wName) { showToast('Enter a workout name'); return; }
    if (!blocks.length) { showToast('Add an exercise'); return; }
    setSavedWorkouts(p=>[{id:Date.now(),name:wName,client:wClient,cat:wCat,exercises:blocks,date:new Date().toLocaleDateString()},...p]);
    showToast(`"${wName}" saved!`); setBlocks([]); setWName('');
  };

  // ── INVOICES ──
  const addInvoiceFn = () => {
    if (!newInv.amount) { showToast('Enter an amount'); return; }
    if (!clients.length) { showToast('Add a client first'); return; }
    const id = 'INV-' + String(invoices.length+1).padStart(3,'0');
    const now = new Date(), mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    setInvoices(p=>[{id,...newInv,amount:parseFloat(newInv.amount),status:'pending',date:`${mo[now.getMonth()]} ${now.getDate()}`},...p]);
    setShowAddInvoice(false);
    setNewInv({client:clients[0]?.name||'',amount:'',desc:'PT sessions',due:''});
    showToast(`Invoice ${id} created`);
  };
  const markPaid = (id) => { setInvoices(p=>p.map(i=>i.id===id?{...i,status:'paid'}:i)); showToast('Marked as paid'); };
  const deleteInvoice = (id) => { setInvoices(p=>p.filter(i=>i.id!==id)); showToast('Invoice deleted'); };

  // ── CUSTOM EXERCISES ──
  const addMovement = () => { if(!newMove.name)return; setCustomEx(p=>[...p,{...newMove,id:Date.now(),custom:true}]); setNewMove({name:'',cat:'Legs'}); showToast('Movement added!'); };
  const delMovement = (id) => setCustomEx(p=>p.filter(e=>e.id!==id));

  // ── SETTINGS SAVE ──
  const saveTrainerInfo = () => { setTrainerInfo(trainerForm); showToast('Settings saved!'); };

  const allEx = [...EXERCISES,...customEx];
  const filtEx = allEx.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())&&(exCat==='All'||e.cat===exCat));
  const outstanding = invoices.filter(i=>i.status!=='paid').reduce((s,i)=>s+i.amount,0);
  const paidTotal = invoices.filter(i=>i.status==='paid').reduce((s,i)=>s+i.amount,0);

  // ── STYLE HELPERS ──
  const card = (ex={}) => ({ background:T.bg3, border:`1px solid ${T.border}`, borderRadius:10, padding:16, marginBottom:12, boxShadow:T.shadow, ...ex });
  const sc = () => ({ background:T.bg3, border:`1px solid ${T.border}`, borderRadius:9, padding:'14px 16px', boxShadow:T.shadow });
  const tb = () => ({ padding:'13px 22px', borderBottom:`1px solid ${T.border}`, background:dark?T.bg:T.bg3, display:'flex', alignItems:'center', gap:10, flexShrink:0 });
  const btn = (ex={}) => ({ padding:'6px 14px', borderRadius:7, fontSize:12, fontWeight:500, cursor:'pointer', border:`1px solid ${T.border2}`, background:T.bg3, color:T.text2, fontFamily:'inherit', ...ex });
  const btnP = (ex={}) => ({ padding:'6px 14px', borderRadius:7, fontSize:12, fontWeight:500, cursor:'pointer', border:'none', background:T.accent, color:'white', fontFamily:'inherit', ...ex });
  const btnSm = (ex={}) => ({ padding:'4px 10px', borderRadius:5, fontSize:11, fontWeight:500, cursor:'pointer', border:`1px solid ${T.border2}`, background:T.bg3, color:T.text2, fontFamily:'inherit', ...ex });
  const inp = (ex={}) => ({ padding:'8px 10px', borderRadius:7, border:`1px solid ${T.border2}`, background:T.inputBg, color:T.text, fontSize:13, fontFamily:'inherit', outline:'none', width:'100%', ...ex });
  const sl = (ex={}) => ({ padding:'8px 10px', borderRadius:7, border:`1px solid ${T.border2}`, background:T.inputBg, color:T.text, fontSize:13, fontFamily:'inherit', outline:'none', width:'100%', ...ex });
  const pill = (s) => {
    if (s==='paid'||s==='active') return {fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600,background:T.greenBg,color:T.green};
    if (s==='pending') return {fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600,background:T.amberBg,color:T.amber};
    return {fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600,background:T.blueBg,color:T.blue};
  };
  const av = (name,size=30) => ({ width:size, height:size, borderRadius:'50%', background:ac(name), display:'flex', alignItems:'center', justifyContent:'center', fontSize:size>38?15:11, fontWeight:600, color:'white', flexShrink:0 });
  const fl = () => ({ fontSize:10, color:T.text2, fontWeight:500, textTransform:'uppercase', letterSpacing:.6, marginBottom:5, display:'block' });
  const ct = () => ({ fontSize:10, fontWeight:500, color:T.text2, textTransform:'uppercase', letterSpacing:.8, marginBottom:12 });
  const ov = () => ({ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' });
  const mo = (w=480) => ({ background:T.bg3, borderRadius:12, padding:24, width:w, maxHeight:'90vh', overflowY:'auto', border:`1px solid ${T.border2}`, boxShadow:'0 24px 64px rgba(0,0,0,.5)' });
  const Row = ({children,last}) => <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:last?'none':`1px solid ${T.border}`}}>{children}</div>;

  const navItems = [
    {id:'dashboard',label:fr?'Tableau de bord':'Dashboard',section:fr?'Aperçu':'Overview'},
    {id:'clients',label:'Clients'},
    {id:'workouts',label:fr?"Entraînements":'Workouts',section:fr?'Entraînement':'Training'},
    {id:'programs',label:fr?'Programmes':'Programs'},
    {id:'messages',label:'Messages',section:fr?'Gestion':'Business'},
    {id:'invoices',label:fr?'Factures':'Invoices'},
    {id:'settings',label:fr?'Paramètres':'Settings',section:fr?'Compte':'Account'},
  ];

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',fontFamily:"'Inter',-apple-system,sans-serif",fontSize:13,background:T.bg,color:T.text,transition:'background .25s,color .25s'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Inter:wght@400;500;600&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${T.border2};border-radius:3px;}`}</style>

      {/* SIDEBAR */}
      <div style={{width:220,background:dark?T.bg:T.bg3,borderRight:`1px solid ${T.border}`,display:'flex',flexDirection:'column',flexShrink:0,transition:'background .25s'}}>
        <div style={{padding:'18px 16px',borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <LogoMark size={34}/>
            <LogoWordmark T={T}/>
          </div>
        </div>
        <nav style={{padding:'10px 8px',flex:1,overflowY:'auto'}}>
          {navItems.map(item=>(
            <React.Fragment key={item.id}>
              {item.section && <div style={{fontSize:9,color:T.text3,letterSpacing:1.2,textTransform:'uppercase',padding:'0 8px',margin:'14px 0 4px'}}>{item.section}</div>}
              <div onClick={()=>setView(item.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 8px',borderRadius:7,cursor:'pointer',fontSize:12.5,marginBottom:1,background:view===item.id?(dark?T.accentBg:T.accentLight):'transparent',color:view===item.id?T.accent:T.text2,fontWeight:view===item.id?500:400,transition:'all .1s'}}>
                <NI name={item.id}/>{item.label}
              </div>
            </React.Fragment>
          ))}
        </nav>
        <div style={{padding:'12px 16px',borderTop:`1px solid ${T.border}`}}>
          <div style={{display:'flex',gap:6,marginBottom:10}}>
            <button onClick={()=>setDark(d=>!d)} style={btnSm({flex:1,textAlign:'center'})}>{dark?'☀️ Light':'🌙 Dark'}</button>
            <button onClick={()=>setLang(lang==='en'?'fr':'en')} style={btnSm({flex:1,textAlign:'center'})}>{lang==='en'?'🇫🇷 FR':'🇬🇧 EN'}</button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{...av(trainerInfo.name,28),background:T.accent,fontSize:10}}>{inits(trainerInfo.name)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:T.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{trainerInfo.name}</div>
              <div style={{fontSize:10,color:T.text3}}>{trainerInfo.title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:T.bg2,transition:'background .25s'}}>

        {/* ── DASHBOARD ── */}
        {view==='dashboard'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>{fr?'Tableau de bord':'Dashboard'}</h1><span style={{fontSize:12,color:T.text3}}>{new Date().toLocaleDateString('en-CA',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</span></div>
          <div style={{flex:1,overflowY:'auto',padding:22}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:18}}>
              {[
                {l:fr?'Clients actifs':'Active clients',v:clients.length,s:fr?'Total inscrits':'Total registered',c:T.green},
                {l:fr?'Entraînements':'Saved workouts',v:savedWorkouts.length,s:fr?'Sauvegardés':'All time',c:T.text3},
                {l:fr?'Solde dû':'Outstanding',v:'$'+outstanding.toLocaleString(),s:invoices.filter(i=>i.status==='pending').length+' pending',c:T.amber},
                {l:fr?'Total payé':'Total paid',v:'$'+paidTotal.toLocaleString(),s:fr?'Collecté':'Collected',c:T.green},
              ].map((st,i)=>(
                <div key={i} style={sc()}><div style={{fontSize:11,color:T.text3,marginBottom:5}}>{st.l}</div><div style={{fontSize:24,fontWeight:600,color:T.text}}>{st.v}</div><div style={{fontSize:11,color:st.c,marginTop:3}}>{st.s}</div></div>
              ))}
            </div>
            {clients.length===0?(
              <div style={card({textAlign:'center',padding:48})}>
                <div style={{fontSize:32,marginBottom:12}}>👋</div>
                <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:8}}>Welcome to Dialed IN{trainerInfo.name?`, ${trainerInfo.name.split(' ')[0]}`:''}!</div>
                <div style={{fontSize:13,color:T.text3,marginBottom:20}}>Get started by adding your first client or updating your settings.</div>
                <div style={{display:'flex',gap:10,justifyContent:'center'}}>
                  <button style={btnP()} onClick={()=>setView('clients')}>+ Add first client</button>
                  <button style={btn()} onClick={()=>setView('settings')}>Update settings</button>
                </div>
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div style={card()}>
                  <div style={ct()}>{fr?'Vos clients':'Your clients'}</div>
                  {clients.slice(0,5).map((c,i)=><Row key={c.id} last={i===Math.min(clients.length,5)-1}><div style={av(c.name,30)}>{inits(c.name)}</div><div><div style={{fontWeight:500,fontSize:12.5,color:T.text}}>{c.name}</div><div style={{fontSize:11,color:T.text3}}>{c.goal} · {c.freq}/wk</div></div><span style={{...pill('active'),marginLeft:'auto'}}>{fr?'Actif':'Active'}</span></Row>)}
                  {clients.length>5&&<div style={{fontSize:11,color:T.text3,marginTop:8,textAlign:'center'}}>+{clients.length-5} more</div>}
                </div>
                <div style={card()}>
                  <div style={ct()}>{fr?'Factures récentes':'Recent invoices'}</div>
                  {invoices.length===0?<div style={{fontSize:12,color:T.text3}}>No invoices yet</div>:invoices.slice(0,5).map((inv,i)=>(
                    <Row key={inv.id} last={i===Math.min(invoices.length,5)-1}>
                      <div><div style={{fontWeight:500,fontSize:12.5,color:T.text}}>{inv.client}</div><div style={{fontSize:11,color:T.text3}}>${inv.amount} · {inv.date}</div></div>
                      <span style={{...pill(inv.status),marginLeft:'auto'}}>{inv.status==='paid'?(fr?'Payé':'Paid'):(fr?'En attente':'Pending')}</span>
                    </Row>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>}

        {/* ── CLIENTS ── */}
        {view==='clients'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>Clients</h1><button style={btnP()} onClick={openAddClient}>+ {fr?'Ajouter':'Add client'}</button></div>
          <div style={{flex:1,overflowY:'auto',padding:22}}>
            {clients.length===0?(
              <div style={card({textAlign:'center',padding:48})}>
                <div style={{fontSize:13,color:T.text3,marginBottom:16}}>{fr?'Aucun client pour le moment.':'No clients yet. Add your first one!'}</div>
                <button style={btnP()} onClick={openAddClient}>+ {fr?'Ajouter un client':'Add first client'}</button>
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
                {clients.map(c=>(
                  <div key={c.id} style={card({marginBottom:0})}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                      <div style={av(c.name,42)}>{inits(c.name)}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:600,fontSize:14,color:T.text}}>{c.name}</div>
                        <div style={{fontSize:11,color:T.text3}}>{c.goal}</div>
                      </div>
                      <span style={pill('active')}>{fr?'Actif':'Active'}</span>
                    </div>
                    <div style={{display:'flex',gap:16,marginBottom:10}}>
                      {[{v:c.freq||'—',l:fr?'par sem':'per wk'},{v:c.weeks||0,l:fr?'semaines':'weeks'},{v:'$'+(c.rate||0),l:fr?'mensuel':'monthly'}].map((s,i)=>(
                        <div key={i} style={{fontSize:11,color:T.text3}}><strong style={{display:'block',fontSize:14,fontWeight:600,color:T.text}}>{s.v}</strong>{s.l}</div>
                      ))}
                    </div>
                    {c.email&&<div style={{fontSize:11,color:T.text3,marginBottom:6}}>{c.email}</div>}
                    {c.phone&&<div style={{fontSize:11,color:T.text3,marginBottom:6}}>{c.phone}</div>}
                    {c.notes&&<div style={{fontSize:11,color:T.text3,marginBottom:8,fontStyle:'italic'}}>{c.notes}</div>}
                    <div style={{display:'flex',gap:(c.tags||[]).length?6:0,flexWrap:'wrap',marginBottom:10}}>
                      {(c.tags||[]).map(t=><span key={t} style={{fontSize:10,padding:'2px 7px',borderRadius:4,background:T.bg4,color:T.text3,border:`1px solid ${T.border}`}}>{t}</span>)}
                    </div>
                    <div style={{display:'flex',gap:6,borderTop:`1px solid ${T.border}`,paddingTop:10}}>
                      <button style={btn({flex:1,textAlign:'center',fontSize:11,padding:'5px 8px'})} onClick={()=>openEditClient(c)}>✏️ {fr?'Modifier':'Edit'}</button>
                      <button style={btnSm({color:T.accent,background:T.accentLight,borderColor:T.accentLight})} onClick={()=>deleteClient(c.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
                <div style={card({marginBottom:0,border:`1px dashed ${T.border2}`,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:T.text3,cursor:'pointer',minHeight:160})} onClick={openAddClient}>
                  <div style={{fontSize:30,lineHeight:1}}>+</div>
                  <div style={{fontSize:12}}>{fr?'Ajouter un client':'Add new client'}</div>
                </div>
              </div>
            )}
          </div>
        </>}

        {/* ── WORKOUTS ── */}
        {view==='workouts'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>{fr?"Entraînements":'Workouts'}</h1><button style={btn()} onClick={()=>setShowLibrary(true)}>{fr?'Gérer':'Manage library'}</button><button style={btn()} onClick={()=>setWTab(wTab==='builder'?'saved':'builder')}>{wTab==='builder'?(fr?'Sauvegardés':'Saved'):(fr?'Retour':'Builder')}</button>{wTab==='builder'&&<button style={btnP()} onClick={saveWorkout}>{fr?'Sauvegarder':'Save'}</button>}</div>
          {wTab==='builder'?(
            <div style={{flex:1,overflow:'hidden',display:'grid',gridTemplateColumns:'240px 1fr',gap:14,padding:22}}>
              <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:14,display:'flex',flexDirection:'column',gap:8,overflowY:'auto'}}>
                <div style={{fontWeight:600,fontSize:12,color:T.text2}}>{fr?'Bibliothèque':'Library'}</div>
                <input style={inp()} placeholder={fr?'Rechercher...':'Search...'} value={exSearch} onChange={e=>setExSearch(e.target.value)}/>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {CATS.map(c=><button key={c} onClick={()=>setExCat(c)} style={{fontSize:9,padding:'3px 7px',borderRadius:20,border:'none',background:exCat===c?T.accent:T.bg4,color:exCat===c?'white':T.text3,cursor:'pointer',fontFamily:'inherit',fontWeight:500}}>{c}</button>)}
                </div>
                <div style={{flex:1,overflowY:'auto'}}>
                  {filtEx.map((e,i)=>(
                    <div key={i} onClick={()=>addBlock(e.name)} style={{padding:'7px 8px',borderRadius:6,cursor:'pointer',fontSize:12,display:'flex',justifyContent:'space-between',color:e.custom?T.accent:T.text2,marginBottom:1}}>
                      <span>{e.name}{e.custom?' ★':''}</span><span style={{fontSize:9,color:T.text3}}>{e.cat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:12,overflowY:'auto'}}>
                <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:14,display:'grid',gridTemplateColumns:'1fr 1fr 1fr auto',gap:10,alignItems:'end'}}>
                  <div><label style={fl()}>{fr?'Nom':'Name'}</label><input style={inp()} placeholder="e.g. Push Day A" value={wName} onChange={e=>setWName(e.target.value)}/></div>
                  <div><label style={fl()}>Client</label>
                    <select style={sl()} value={wClient} onChange={e=>setWClient(e.target.value)}>
                      {clients.length===0?<option>— Add a client first —</option>:clients.map(c=><option key={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div><label style={fl()}>{fr?'Catégorie':'Category'}</label><select style={sl()} value={wCat} onChange={e=>setWCat(e.target.value)}>{['Strength','Hypertrophy','HIIT','Cardio','Mobility','Rehab'].map(c=><option key={c}>{c}</option>)}</select></div>
                  <button style={btn()} onClick={()=>{const n=prompt('Exercise name:');if(n)addBlock(n);}}>+ Custom</button>
                </div>
                {blocks.length===0?(
                  <div style={{background:T.bg3,border:`1px dashed ${T.border2}`,borderRadius:10,padding:48,textAlign:'center',color:T.text3,fontSize:13}}>{fr?"Cliquez sur un exercice pour l'ajouter":'Click an exercise to add it'}</div>
                ):blocks.map((block,bi)=>(
                  <div key={block.id} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:'14px 16px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                      <div style={{width:22,height:22,borderRadius:5,background:T.accentLight,color:T.accent,fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{bi+1}</div>
                      <div style={{fontWeight:600,flex:1,color:T.text}}>{block.name}</div>
                      <button style={btnSm({color:T.accent,background:T.accentLight,borderColor:T.accentLight})} onClick={()=>removeBlock(block.id)}>{fr?'Retirer':'Remove'}</button>
                    </div>
                    <table style={{width:'100%',borderCollapse:'collapse'}}>
                      <thead><tr>{['#','Reps',fr?'Poids':'Weight',fr?'Repos':'Rest','RPE'].map(h=><th key={h} style={{fontSize:10,color:T.text3,textAlign:'left',padding:'4px 6px',fontWeight:500,textTransform:'uppercase'}}>{h}</th>)}</tr></thead>
                      <tbody>{block.sets.map((set,si)=>(
                        <tr key={si}><td style={{padding:'3px 6px',fontSize:11,color:T.text3,width:24}}>{si+1}</td>
                        {['reps','weight','rest','rpe'].map(f=><td key={f} style={{padding:'3px 6px'}}><input type="number" value={set[f]} onChange={e=>updSet(block.id,si,f,e.target.value)} style={inp({textAlign:'center',padding:'5px 6px',fontSize:12})} placeholder={f==='reps'?'10':f==='weight'?'60':f==='rest'?'90':'7'}/></td>)}
                        </tr>
                      ))}</tbody>
                    </table>
                    <button onClick={()=>addSet(block.id)} style={{fontSize:11,color:T.accent,background:'none',border:'none',cursor:'pointer',marginTop:8,fontFamily:'inherit'}}>+ {fr?'Série':'Add set'}</button>
                    <textarea value={block.notes} onChange={e=>updNotes(block.id,e.target.value)} placeholder={fr?'Notes de coaching...':'Coaching notes...'} rows={2} style={inp({marginTop:8,fontSize:11,resize:'none'})}/>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{flex:1,overflowY:'auto',padding:22}}>
              <div style={card()}>
                <div style={ct()}>{fr?'Entraînements sauvegardés':'Saved workouts'} ({savedWorkouts.length})</div>
                {savedWorkouts.length===0?<div style={{color:T.text3,fontSize:12}}>{fr?'Aucun.':'None yet.'}</div>:(
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{[fr?'Nom':'Name','Client','Cat','Exercises','Date'].map(h=><th key={h} style={{fontSize:10,color:T.text3,textAlign:'left',padding:'8px 10px',borderBottom:`1px solid ${T.border}`,fontWeight:500,textTransform:'uppercase'}}>{h}</th>)}</tr></thead>
                    <tbody>{savedWorkouts.map(w=>(
                      <tr key={w.id}><td style={{padding:'10px',fontWeight:600,color:T.text}}>{w.name}</td><td style={{padding:'10px',color:T.text2}}>{w.client}</td><td style={{padding:'10px'}}><span style={{...pill('info'),background:T.blueBg,color:T.blue}}>{w.cat}</span></td><td style={{padding:'10px',color:T.text3}}>{w.exercises.length}</td><td style={{padding:'10px',color:T.text3,fontSize:11}}>{w.date}</td></tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </>}

        {/* ── PROGRAMS ── */}
        {view==='programs'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>{fr?'Programmes':'Programs'}</h1><button style={btnP()}>+ {fr?'Nouveau':'New'}</button></div>
          <div style={{flex:1,overflowY:'auto',padding:22}}>
            <div style={card({textAlign:'center',padding:40})}><div style={{fontSize:13,color:T.text3}}>Programs coming soon — use the workout builder for now!</div></div>
          </div>
        </>}

        {/* ── MESSAGES ── */}
        {view==='messages'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>Messages</h1></div>
          <div style={{flex:1,overflow:'hidden',display:'grid',gridTemplateColumns:'210px 1fr'}}>
            <div style={{background:dark?T.bg:T.bg3,borderRight:`1px solid ${T.border}`,overflowY:'auto'}}>
              {clients.length===0&&<div style={{padding:16,fontSize:12,color:T.text3}}>Add clients to message them</div>}
              {clients.map(c=>(
                <div key={c.id} onClick={()=>setChatClient(c)} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',cursor:'pointer',borderBottom:`1px solid ${T.border}`,background:chatClient?.id===c.id?(dark?T.accentBg:T.accentLight):'transparent',transition:'background .1s'}}>
                  <div style={av(c.name,30)}>{inits(c.name)}</div>
                  <div style={{minWidth:0}}><div style={{fontSize:12,fontWeight:500,color:chatClient?.id===c.id?T.accent:T.text}}>{c.name}</div><div style={{fontSize:10,color:T.text3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:130}}>{(msgs[c.id]||[]).slice(-1)[0]?.t||'No messages yet'}</div></div>
                </div>
              ))}
            </div>
            {chatClient?(
              <div style={{display:'flex',flexDirection:'column',background:T.bg2}}>
                <div style={{padding:'12px 16px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',gap:10,background:dark?T.bg:T.bg3,flexShrink:0}}>
                  <div style={av(chatClient.name,30)}>{inits(chatClient.name)}</div>
                  <div><div style={{fontWeight:600,fontSize:13,color:T.text}}>{chatClient.name}</div><div style={{fontSize:11,color:T.green}}>{fr?'Client actif':'Active client'}</div></div>
                </div>
                <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:10}}>
                  {(msgs[chatClient.id]||[]).length===0&&<div style={{textAlign:'center',color:T.text3,fontSize:13,margin:'auto'}}>No messages yet — say hi!</div>}
                  {(msgs[chatClient.id]||[]).map((m,i)=>(
                    <div key={i} style={{maxWidth:'68%',alignSelf:m.f==='sent'?'flex-end':'flex-start'}}>
                      <div style={{padding:'9px 13px',fontSize:13,lineHeight:1.55,borderRadius:m.f==='sent'?'12px 3px 12px 12px':'3px 12px 12px 12px',background:m.f==='sent'?T.accent:T.bg3,color:m.f==='sent'?'white':T.text,border:m.f==='recv'?`1px solid ${T.border}`:'none'}}>{m.t}</div>
                      <div style={{fontSize:10,color:T.text3,marginTop:3,textAlign:m.f==='sent'?'right':'left'}}>{m.ts}</div>
                    </div>
                  ))}
                  <div ref={msgBottom}/>
                </div>
                <div style={{padding:'12px 16px',borderTop:`1px solid ${T.border}`,display:'flex',gap:8,background:dark?T.bg:T.bg3,flexShrink:0}}>
                  <input style={inp({flex:1})} placeholder={`Message ${chatClient.name.split(' ')[0]}...`} value={chatText} onChange={e=>setChatText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')sendMsg();}}/>
                  <button style={btnP()} onClick={sendMsg}>{fr?'Envoyer':'Send'}</button>
                </div>
              </div>
            ):(
              <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',color:T.text3,fontSize:13}}>Select a client to message</div>
            )}
          </div>
        </>}

        {/* ── INVOICES ── */}
        {view==='invoices'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>{fr?'Factures':'Invoices'}</h1><button style={btnP()} onClick={()=>{ if(!clients.length){showToast('Add a client first');return;} setShowAddInvoice(true); }}>+ {fr?'Nouvelle':'New'}</button></div>
          <div style={{flex:1,overflowY:'auto',padding:22}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
              {[{l:fr?'Solde dû':'Outstanding',v:'$'+outstanding.toLocaleString()},{l:fr?'Total payé':'Total paid',v:'$'+paidTotal.toLocaleString()},{l:fr?'Factures':'Invoices',v:invoices.length}].map((st,i)=>(
                <div key={i} style={sc()}><div style={{fontSize:11,color:T.text3,marginBottom:5}}>{st.l}</div><div style={{fontSize:24,fontWeight:600,color:T.text}}>{st.v}</div></div>
              ))}
            </div>
            <div style={card()}>
              {invoices.length===0?<div style={{color:T.text3,fontSize:12,textAlign:'center',padding:20}}>No invoices yet</div>:(
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['#','Client','Description',fr?'Montant':'Amount','Date',fr?'Statut':'Status',''].map(h=><th key={h} style={{fontSize:10,color:T.text3,textAlign:'left',padding:'8px 10px',borderBottom:`1px solid ${T.border}`,fontWeight:500,textTransform:'uppercase'}}>{h}</th>)}</tr></thead>
                  <tbody>{invoices.map(inv=>(
                    <tr key={inv.id} style={{borderBottom:`1px solid ${T.border}`}}>
                      <td style={{padding:'10px',fontFamily:'monospace',fontSize:11,color:T.text3}}>{inv.id}</td>
                      <td style={{padding:'10px',fontWeight:500,color:T.text}}>{inv.client}</td>
                      <td style={{padding:'10px',color:T.text2,fontSize:12}}>{inv.desc}</td>
                      <td style={{padding:'10px',fontWeight:600,color:T.text}}>${inv.amount.toLocaleString()}</td>
                      <td style={{padding:'10px',color:T.text3,fontSize:11}}>{inv.date}</td>
                      <td style={{padding:'10px'}}><span style={pill(inv.status)}>{inv.status==='paid'?(fr?'Payé':'Paid'):(fr?'En attente':'Pending')}</span></td>
                      <td style={{padding:'10px',display:'flex',gap:6}}>
                        {inv.status!=='paid'&&<button style={btnSm()} onClick={()=>markPaid(inv.id)}>{fr?'Payé':'Mark paid'}</button>}
                        <button style={btnSm({color:T.accent,background:T.accentLight,borderColor:T.accentLight})} onClick={()=>deleteInvoice(inv.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </div>
        </>}

        {/* ── SETTINGS ── */}
        {view==='settings'&&<>
          <div style={tb()}><h1 style={{fontSize:15,fontWeight:600,flex:1,color:T.text}}>{fr?'Paramètres':'Settings'}</h1></div>
          <div style={{flex:1,overflowY:'auto',padding:22}}>
            {/* Settings tabs */}
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {[{id:'trainer',l:fr?'Mon profil':'My profile'},{id:'rates',l:fr?'Tarifs':'Rates & billing'},{id:'library',l:fr?'Exercices':'Exercise library'}].map(tab=>(
                <button key={tab.id} onClick={()=>setSettingsTab(tab.id)} style={{...btn(),background:settingsTab===tab.id?(dark?T.accentBg:T.accentLight):T.bg3,color:settingsTab===tab.id?T.accent:T.text2,fontWeight:settingsTab===tab.id?500:400}}>
                  {tab.l}
                </button>
              ))}
            </div>

            {/* Trainer profile */}
            {settingsTab==='trainer'&&(
              <div style={card({maxWidth:540})}>
                <div style={ct()}>{fr?'Informations du profil':'Profile information'}</div>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div><label style={fl()}>{fr?'Nom complet':'Full name'}</label><input style={inp()} value={trainerForm.name} onChange={e=>setTrainerForm({...trainerForm,name:e.target.value})} placeholder="Mitch Brown"/></div>
                    <div><label style={fl()}>{fr?'Titre':'Title'}</label><input style={inp()} value={trainerForm.title} onChange={e=>setTrainerForm({...trainerForm,title:e.target.value})} placeholder="Head Trainer"/></div>
                  </div>
                  <div><label style={fl()}>{fr?'Nom de l\'entreprise':'Business name'}</label><input style={inp()} value={trainerForm.business} onChange={e=>setTrainerForm({...trainerForm,business:e.target.value})} placeholder="Dialed IN Personal Training"/></div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div><label style={fl()}>{fr?'Courriel':'Email'}</label><input style={inp()} type="email" value={trainerForm.email} onChange={e=>setTrainerForm({...trainerForm,email:e.target.value})} placeholder="mitch@dialedin.com"/></div>
                    <div><label style={fl()}>{fr?'Téléphone':'Phone'}</label><input style={inp()} value={trainerForm.phone} onChange={e=>setTrainerForm({...trainerForm,phone:e.target.value})} placeholder="+1 514 555 0100"/></div>
                  </div>
                  <button style={{...btnP(),alignSelf:'flex-start'}} onClick={saveTrainerInfo}>{fr?'Sauvegarder':'Save changes'}</button>
                </div>
              </div>
            )}

            {/* Rates */}
            {settingsTab==='rates'&&(
              <div style={card({maxWidth:540})}>
                <div style={ct()}>{fr?'Tarifs et facturation':'Rates & billing'}</div>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div><label style={fl()}>{fr?'Tarif horaire par défaut ($)':'Default session rate ($)'}</label><input style={inp()} type="number" value={trainerForm.rate} onChange={e=>setTrainerForm({...trainerForm,rate:e.target.value})} placeholder="70"/></div>
                    <div><label style={fl()}>{fr?'Devise':'Currency'}</label>
                      <select style={sl()} value={trainerForm.currency} onChange={e=>setTrainerForm({...trainerForm,currency:e.target.value})}>
                        <option>CAD</option><option>USD</option><option>EUR</option><option>GBP</option><option>AUD</option>
                      </select>
                    </div>
                  </div>
                  <div style={{background:T.bg4,borderRadius:8,padding:14,border:`1px solid ${T.border}`}}>
                    <div style={{fontSize:12,fontWeight:500,color:T.text,marginBottom:4}}>💡 {fr?'Conseil':'Tip'}</div>
                    <div style={{fontSize:12,color:T.text3}}>{fr?'Modifiez le tarif de chaque client individuellement dans la page Clients.':'You can set individual rates per client on the Clients page.'}</div>
                  </div>
                  <button style={{...btnP(),alignSelf:'flex-start'}} onClick={saveTrainerInfo}>{fr?'Sauvegarder':'Save changes'}</button>
                </div>
              </div>
            )}

            {/* Exercise library */}
            {settingsTab==='library'&&(
              <div style={card({maxWidth:600})}>
                <div style={ct()}>{fr?'Bibliothèque d\'exercices personnalisés':'Custom exercise library'}</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:8,marginBottom:16,alignItems:'end'}}>
                  <div><label style={fl()}>{fr?'Nom du mouvement':'Movement name'}</label><input style={inp()} placeholder={fr?'ex: Squat gobelet':'e.g. Goblet Squat'} value={newMove.name} onChange={e=>setNewMove({...newMove,name:e.target.value})} onKeyDown={e=>{if(e.key==='Enter')addMovement();}}/></div>
                  <div><label style={fl()}>{fr?'Groupe musculaire':'Muscle group'}</label><select style={sl()} value={newMove.cat} onChange={e=>setNewMove({...newMove,cat:e.target.value})}>{CATS.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}</select></div>
                  <button style={btnP({alignSelf:'flex-end'})} onClick={addMovement}>+ {fr?'Ajouter':'Add'}</button>
                </div>
                {customEx.length===0?(
                  <div style={{fontSize:12,color:T.text3,textAlign:'center',padding:'20px 0'}}>{fr?'Aucun mouvement personnalisé.':'No custom movements yet. Add one above!'}</div>
                ):customEx.map(ex=>(
                  <div key={ex.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:T.bg4,borderRadius:7,marginBottom:6,border:`1px solid ${T.border}`}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:T.accent,flexShrink:0}}/>
                    <span style={{flex:1,fontSize:13,fontWeight:500,color:T.text}}>{ex.name}</span>
                    <span style={{fontSize:10,padding:'2px 8px',borderRadius:20,background:T.blueBg,color:T.blue,fontWeight:500}}>{ex.cat}</span>
                    <button style={btnSm({color:T.accent,background:T.accentLight,borderColor:T.accentLight})} onClick={()=>delMovement(ex.id)}>{fr?'Supprimer':'Delete'}</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>}
      </div>

      {/* ── ADD / EDIT CLIENT MODAL ── */}
      {showClientModal&&<div style={ov()} onClick={e=>e.target===e.currentTarget&&setShowClientModal(false)}>
        <div style={mo(520)}>
          <div style={{fontSize:16,fontWeight:600,marginBottom:20,color:T.text}}>{editingClient?(fr?'Modifier le client':'Edit client'):(fr?'Ajouter un client':'Add new client')}</div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div><label style={fl()}>{fr?'Prénom et nom':'Full name'} *</label><input style={inp()} placeholder="Jane Smith" value={clientForm.name} onChange={e=>setClientForm({...clientForm,name:e.target.value})}/></div>
              <div><label style={fl()}>{fr?'Courriel':'Email'}</label><input style={inp()} type="email" placeholder="jane@email.com" value={clientForm.email} onChange={e=>setClientForm({...clientForm,email:e.target.value})}/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div><label style={fl()}>{fr?'Téléphone':'Phone'}</label><input style={inp()} placeholder="+1 514 555 0100" value={clientForm.phone} onChange={e=>setClientForm({...clientForm,phone:e.target.value})}/></div>
              <div><label style={fl()}>{fr?'Objectif':'Goal'}</label><select style={sl()} value={clientForm.goal} onChange={e=>setClientForm({...clientForm,goal:e.target.value})}>{GOALS.map(g=><option key={g}>{g}</option>)}</select></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
              <div><label style={fl()}>{fr?'Sessions/sem':'Sessions/wk'}</label><select style={sl()} value={clientForm.freq} onChange={e=>setClientForm({...clientForm,freq:e.target.value})}>{FREQS.map(f=><option key={f}>{f}</option>)}</select></div>
              <div><label style={fl()}>{fr?'Tarif mensuel ($)':'Monthly rate ($)'}</label><input style={inp()} type="number" placeholder="280" value={clientForm.rate} onChange={e=>setClientForm({...clientForm,rate:e.target.value})}/></div>
              <div><label style={fl()}>{fr?'Semaines':'Weeks in'}</label><input style={inp()} type="number" placeholder="0" value={clientForm.weeks} onChange={e=>setClientForm({...clientForm,weeks:e.target.value})}/></div>
            </div>
            <div><label style={fl()}>{fr?'Tags (séparés par virgule)':'Tags (comma separated)'}</label><input style={inp()} placeholder="e.g. Cardio, HIIT, Strength" value={clientForm.tags} onChange={e=>setClientForm({...clientForm,tags:e.target.value})}/></div>
            <div><label style={fl()}>{fr?'Notes':'Notes'}</label><textarea style={inp({resize:'none'})} rows={3} placeholder={fr?'Blessures, objectifs, préférences...':'Injuries, goals, preferences...'} value={clientForm.notes} onChange={e=>setClientForm({...clientForm,notes:e.target.value})}/></div>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:22}}>
            <button style={btn()} onClick={()=>setShowClientModal(false)}>{fr?'Annuler':'Cancel'}</button>
            <button style={btnP()} onClick={saveClient}>{editingClient?(fr?'Enregistrer':'Save changes'):(fr?'Ajouter':'Add client')}</button>
          </div>
        </div>
      </div>}

      {/* ── ADD INVOICE MODAL ── */}
      {showAddInvoice&&<div style={ov()} onClick={e=>e.target===e.currentTarget&&setShowAddInvoice(false)}>
        <div style={mo()}>
          <div style={{fontSize:16,fontWeight:600,marginBottom:20,color:T.text}}>{fr?'Nouvelle facture':'New invoice'}</div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div><label style={fl()}>Client</label><select style={sl()} value={newInv.client} onChange={e=>setNewInv({...newInv,client:e.target.value})}>{clients.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
            <div><label style={fl()}>{fr?'Description':'Description'}</label><input style={inp()} value={newInv.desc} onChange={e=>setNewInv({...newInv,desc:e.target.value})}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div><label style={fl()}>{fr?'Montant ($)':'Amount ($)'}</label><input style={inp()} type="number" placeholder="280" value={newInv.amount} onChange={e=>setNewInv({...newInv,amount:e.target.value})}/></div>
              <div><label style={fl()}>{fr?'Date d\'échéance':'Due date'}</label><input style={inp()} type="date" value={newInv.due} onChange={e=>setNewInv({...newInv,due:e.target.value})}/></div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:22}}>
            <button style={btn()} onClick={()=>setShowAddInvoice(false)}>{fr?'Annuler':'Cancel'}</button>
            <button style={btnP()} onClick={addInvoiceFn}>{fr?'Créer':'Create invoice'}</button>
          </div>
        </div>
      </div>}

      {/* ── MANAGE LIBRARY MODAL ── */}
      {showLibrary&&<div style={ov()} onClick={e=>e.target===e.currentTarget&&setShowLibrary(false)}>
        <div style={mo()}>
          <div style={{fontSize:16,fontWeight:600,marginBottom:4,color:T.text}}>{fr?'Gérer la bibliothèque':'Manage exercise library'}</div>
          <div style={{fontSize:12,color:T.text3,marginBottom:16}}>{fr?'Vous pouvez aussi gérer ça dans Paramètres → Exercices':'You can also manage this in Settings → Exercise library'}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:8,marginBottom:14,alignItems:'end'}}>
            <div><label style={fl()}>{fr?'Mouvement':'Movement'}</label><input style={inp()} placeholder={fr?'ex: Squat gobelet':'e.g. Goblet Squat'} value={newMove.name} onChange={e=>setNewMove({...newMove,name:e.target.value})}/></div>
            <div><label style={fl()}>{fr?'Groupe musculaire':'Muscle group'}</label><select style={sl()} value={newMove.cat} onChange={e=>setNewMove({...newMove,cat:e.target.value})}>{CATS.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}</select></div>
            <button style={btnP({alignSelf:'flex-end'})} onClick={addMovement}>+ {fr?'Ajouter':'Add'}</button>
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:14}}>
            <div style={{fontSize:10,color:T.text3,textTransform:'uppercase',letterSpacing:.8,marginBottom:10}}>{fr?'Mouvements personnalisés':'Custom movements'} ({customEx.length})</div>
            {customEx.length===0?<div style={{color:T.text3,fontSize:12}}>—</div>:customEx.map(ex=>(
              <div key={ex.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',background:T.bg4,borderRadius:6,marginBottom:4,border:`1px solid ${T.border}`}}>
                <span style={{flex:1,fontSize:12,fontWeight:500,color:T.text}}>{ex.name}</span>
                <span style={{fontSize:10,color:T.text3}}>{ex.cat}</span>
                <button style={btnSm({color:T.accent,background:T.accentLight,borderColor:T.accentLight})} onClick={()=>delMovement(ex.id)}>{fr?'Supprimer':'Delete'}</button>
              </div>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:20}}>
            <button style={btn()} onClick={()=>setShowLibrary(false)}>{fr?'Fermer':'Close'}</button>
          </div>
        </div>
      </div>}

      {toast&&<div style={{position:'fixed',bottom:24,right:24,background:T.text,color:T.bg,padding:'10px 18px',borderRadius:8,fontSize:12,fontWeight:500,zIndex:999,boxShadow:'0 4px 20px rgba(0,0,0,.3)'}}>{toast}</div>}
    </div>
  );
}
