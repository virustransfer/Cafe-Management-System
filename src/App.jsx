import { useState, useEffect } from "react";

// ─── Cafe Info ────────────────────────────────────────────────────────────────
const CAFE = {
  name: "AADHYA FAST FOOD AND CAFE",
  motto: "GOOD FOOD, GOOD MOOD",
  location: "Bhirkuti Chowk, Damak-5, Nepal",
  mobile: "+977-9841234567",
  hours: "10:00 AM – 8:00 PM",
};

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  primary:    "#B83A10", primaryLight: "#F5E6DF", primaryDark: "#8C2A0C",
  accent:     "#E8952A", accentLight:  "#FDF3E3", gold: "#C9972A",
  dark:       "#160E06", surface:      "#FFFAF6", surfaceAlt: "#FFF3EA",
  card:       "#FFFFFF", text:         "#1A1208", muted: "#7A6050",
  border:     "#EAD7C6",
  success:    "#276B2E", successBg:  "#EBF5EC",
  warning:    "#B84F00", warningBg:  "#FFF4EB",
  info:       "#14528C", infoBg:     "#E6F1FB",
  danger:     "#B91C1C", dangerBg:   "#FEF2F2",
};

// ─── Menu ─────────────────────────────────────────────────────────────────────
const MENU_DATA = [
  { id:1,  name:"Chicken Burger",   category:"Burgers",   price:220, desc:"Crispy chicken patty with fresh veggies",   icon:"🍔", available:true, prepTime:8  },
  { id:2,  name:"Veg Burger",       category:"Burgers",   price:160, desc:"Garden fresh veggie burger",                icon:"🥗", available:true, prepTime:6  },
  { id:3,  name:"Momo (Veg)",       category:"Momos",     price:130, desc:"Steamed dumplings with spicy chutney",      icon:"🥟", available:true, prepTime:12 },
  { id:4,  name:"Momo (Chicken)",   category:"Momos",     price:160, desc:"Juicy chicken momos, fresh & hot",          icon:"🥟", available:true, prepTime:12 },
  { id:5,  name:"French Fries",     category:"Snacks",    price:100, desc:"Golden crispy salted fries",                icon:"🍟", available:true, prepTime:5  },
  { id:6,  name:"Spring Roll",      category:"Snacks",    price:120, desc:"Crispy veggie spring rolls",                icon:"🌮", available:true, prepTime:7  },
  { id:7,  name:"Cold Coffee",      category:"Beverages", price:120, desc:"Chilled blended coffee with cream",        icon:"☕", available:true, prepTime:4  },
  { id:8,  name:"Lemon Tea",        category:"Beverages", price:60,  desc:"Fresh lemon & ginger herbal tea",          icon:"🍵", available:true, prepTime:3  },
  { id:9,  name:"Chicken Keema Noodles", category:"Keema Noodles", price:200, desc:"Spicy and chilled noodles with chicken keema",           icon:"🍜", available:true, prepTime:10  },
  { id:10,  name:"Buff Keema Noodles", category:"Keema Noodles", price:200, desc:"Spicy and chilled noodles with buff keema",           icon:"🍜", available:true, prepTime:10  },
  { id:11, name:"Veg Chowmein",     category:"Noodles",   price:130, desc:"Stir-fried noodles with garden veggies",   icon:"🍜", available:true, prepTime:10 },
  { id:12, name:"Chicken Chowmein", category:"Noodles",   price:170, desc:"Stir-fried noodles with tender chicken",   icon:"🍜", available:true, prepTime:12 },
  { id:13, name:"Chicken Pizza",      category:"Pizza",     price:150, desc:"Cheesy loaded pizza with fresh chicken toppings",  icon:"🍕", available:true, prepTime:15 },
];

const CATS = ["All", ...new Set(MENU_DATA.map(i => i.category))];
const TAX  = 0.00;
let _oc = 100;
const newId  = () => `ORD-${_oc++}`;
const nowStr = () => new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
const orderSub = (o) => o.items.reduce((s, i) => s + i.price * i.qty, 0);

const DEMO_ORDERS = [
  
  
];

const STAFF_USERS = [
  { role:"admin", pin:"1234", name:"Nabina (Admin)", avatar:"N", phone:"+9779800000001" },

  { role:"staff", pin:"1111", name:"Priya (Staff)", avatar:"P", phone:"+9779811111111" },
  { role:"staff", pin:"4444", name:"Bibas (Staff)", avatar:"B", phone:"+9779822222222" },

  { role:"chef",  pin:"2222", name:"Ramesh (Chef)", avatar:"R", phone:"+9779833333333" },
  { role:"chef",  pin:"3333", name:"Hari (Chef)", avatar:"H", phone:"+9779844444444" },
];

export default function AadhyaApp() {
  const [user,      setUser]      = useState(null);
  const [lRole,     setLRole]     = useState("staff");
  const [lPin,      setLPin]      = useState("");
  const [lErr,      setLErr]      = useState("");
  const [panel,     setPanel]     = useState("orders");
  const [orders,    setOrders]    = useState(DEMO_ORDERS);
  const [menu,      setMenu]      = useState(MENU_DATA);
  const [dark,      setDark]      = useState(false);
  const [notif,     setNotif]     = useState(null);
  const [adminTab,  setAdminTab]  = useState("dashboard");
  const [cat,       setCat]       = useState("All");
  const [search,    setSearch]    = useState("");
  const [cart,      setCart]      = useState([]);
  const [custName,  setCustName]  = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [tableNo,   setTableNo]   = useState("");
  const [notes,     setNotes]     = useState("");
  const [discPct,   setDiscPct]   = useState(0);
  const [lastPlaced,setLastPlaced]= useState(null);
  const [billOrder, setBillOrder] = useState(null);
  const [payOrder,  setPayOrder]  = useState(null);
  const [payDone,   setPayDone]   = useState(false);
  const [menuForm,  setMenuForm]  = useState(null);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [shiftStart, setShiftStart] = useState({});
  const [dailyReports, setDailyReports] = useState({});
  const [attendance, setAttendance] = useState({});
  const [payrollMonth, setPayrollMonth] = useState(new Date().getMonth());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedStaff, setSelectedStaff] = useState(null);
  // ─── HELPER FUNCTIONS ─────────────────────────

// Get today's date key
const getToday = () => new Date().toDateString();

// Calculate hours between timestamps
const calcHours = (start, end) =>
  (end - start) / (1000 * 60 * 60);

// Salary rate
const getRate = (role) =>
  role === "chef" ? 120 : role === "admin" ? 150 : 80;

// Auto daily reset (IMPORTANT)
const resetDailyData = () => {
  setShiftStart({});
  notify("New day started — shifts reset 🔄");
};

// Monthly payroll calculation
const calculateMonthlyPayroll = () => {
  const payroll = {};

  getMonthlyLogs().forEach(log => {
    const key = log.phone;

    if (!payroll[key]) {
      payroll[key] = {
        name: log.name,
        phone: log.phone,
        role: log.role,
        totalHours: 0,
        totalSalary: 0
      };
    }

    payroll[key].totalHours += log.hours;
    payroll[key].totalSalary += log.salary;
  });

  return Object.values(payroll);
};

// ─── FILTER LOGS BY MONTH ─────────────────────
const getMonthlyLogs = () => {
  return attendanceLogs.filter(log => {
    const d = new Date(log.start);
    return (
      d.getMonth() === selectedMonth &&
      d.getFullYear() === selectedYear
    );
  });
};
  // ─── DAILY AUTO RESET ─────────────────────────────
useEffect(() => {
  const checkAndReset = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // reset at 12:00 AM
    if (hours === 0 && minutes === 0) {
      setAttendance({});
      setShiftStart({});
      setAttendanceLogs([]);
      setDailyReports({});
      notify("🌙 New day started — attendance reset");
    }
  };

  const interval = setInterval(checkAndReset, 60000); // check every 1 min

  return () => clearInterval(interval);
}, []);
  
  // ─── SHIFT START ─────────────────────────────
const clockIn = (user) => {
  const now = Date.now();

  setShiftStart(prev => ({
    ...prev,
    [user.phone]: now
  }));

  setAttendance(prev => ({
    ...prev,
    [user.phone]: true
  }));

  notify(`${user.name} clocked in`);
};

// ─── SHIFT END + LOG ATTENDANCE ──────────────
const clockOut = (user) => {
  const start = shiftStart[user.phone];
  if (!start) return;

  const end = Date.now();
  const hours = (end - start) / (1000 * 60 * 60);

  const rate = user.role === "chef" ? 120 : 80;
  const salary = hours * rate;

  const log = {
    id: Date.now(),
    name: user.name,
    role: user.role,
    phone: user.phone,
    start,
    end,
    hours: Number(hours.toFixed(2)),
    rate,
    salary: Number(salary.toFixed(2)),
    date: new Date().toLocaleDateString()
  };

  setAttendanceLogs(prev => [log, ...prev]);

  setShiftStart(prev => {
    const copy = { ...prev };
    delete copy[user.phone];
    return copy;
  });

  setAttendance(prev => ({
    ...prev,
    [user.phone]: false
  }));

  notify(`${user.name} clocked out`);
};
  const bg   = dark ? "#100A04" : T.surface;
  const cBg  = dark ? "#1C1208" : T.card;
  const cBg2 = dark ? "#251A0E" : T.surfaceAlt;
  const tx   = dark ? "#F0E0D0" : T.text;
  const mu   = dark ? "#8A7060" : T.muted;
  const bdr  = dark ? "#362010" : T.border;

  const notify = (msg, type="success") => { setNotif({msg,type}); setTimeout(()=>setNotif(null),3000); };

  const addToCart = (item) => {
    if (!item.available) return;
    setCart(c => { const ex=c.find(x=>x.id===item.id); return ex?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}]; });
    notify(`${item.name} added`);
  };
  const updQty = (id, qty) => { if(qty<1){setCart(c=>c.filter(x=>x.id!==id));return;} setCart(c=>c.map(x=>x.id===id?{...x,qty}:x)); };
  const cartSub   = cart.reduce((s,i)=>s+i.price*i.qty, 0);
  const cartTax   = cartSub * TAX;
  const cartDisc  = (cartSub * discPct) / 100;
  const cartTotal = cartSub + cartTax - cartDisc;

  const placeOrder = () => {
    if (!cart.length || !custName.trim()) { notify("Add items & enter customer name","error"); return; }
    const o = { id:newId(), table:tableNo||"Takeaway", customer:custName.trim(), phone:custPhone.trim(), items:cart, status:"pending", time:nowStr(), notes, paid:false, discount:discPct };
    setOrders(x=>[o,...x]); setLastPlaced(o);
    setCart([]); setCustName(""); setCustPhone(""); setTableNo(""); setNotes(""); setDiscPct(0);
    notify("Order placed — kitchen notified! 🔔"); setPanel("orders");
  };

  const setStatus = (id, status) => { setOrders(o=>o.map(x=>x.id===id?{...x,status}:x)); notify(`Order ${id} → ${status}`); };

  const openBill = (order) => {
    const sub=orderSub(order), disc=order.discount||0, da=(sub*disc)/100, tax=sub*TAX;
    setBillOrder({...order,sub,da,tax,total:sub+tax-da}); setPayDone(false);
  };

  const login = () => {
    const u=STAFF_USERS.find(x=>x.role===lRole&&x.pin===lPin);
    if(u){setUser(u);setLErr("");setLPin("");}else setLErr("Wrong PIN. Try again.");
  };

  const filtMenu = menu.filter(i=>(cat==="All"||i.category===cat)&&i.name.toLowerCase().includes(search.toLowerCase()));
  const pending   = orders.filter(o=>o.status==="pending");
  const preparing = orders.filter(o=>o.status==="preparing");
  const completed = orders.filter(o=>o.status==="completed");
  const revenue   = orders.filter(o=>o.paid).reduce((s,o)=>s+orderSub(o),0);
  const toWA = (phone) => {
    
   if (!phone) return "";
   return `https://wa.me/${phone.replace(/\D/g, "")}`;
  };
  const S = {
    card:  (x={})=>({background:cBg,  borderRadius:14,border:`1px solid ${bdr}`,padding:"13px 15px",marginBottom:9,...x}),
    card2: (x={})=>({background:cBg2, borderRadius:14,border:`1px solid ${bdr}`,padding:"13px 15px",marginBottom:9,...x}),
    btn: (v="primary",x={})=>({ fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,padding:"9px 16px",borderRadius:9,cursor:"pointer",border:"none",transition:"all 0.15s",
      background:v==="primary"?T.primary:v==="accent"?T.accent:v==="success"?T.success:v==="danger"?T.danger:v==="outline"?"transparent":"#666",
      color:v==="outline"?T.primary:"#fff", border:v==="outline"?`1.5px solid ${T.primary}`:"none", ...x }),
    inp: { fontFamily:"'Nunito',sans-serif",width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${bdr}`,background:cBg2,color:tx,fontSize:14,outline:"none",boxSizing:"border-box" },
    badge: (s)=>({ display:"inline-block",padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:800,
      background:s==="pending"?T.warningBg:s==="preparing"?T.infoBg:s==="completed"?T.successBg:T.primaryLight,
      color:s==="pending"?T.warning:s==="preparing"?T.info:s==="completed"?T.success:T.primary }),
    tag: (a)=>({ display:"inline-flex",alignItems:"center",padding:"5px 13px",borderRadius:20,fontSize:12,fontWeight:700,border:"none",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",background:a?T.primary:T.primaryLight,color:a?"#fff":T.primary }),
    nav: (a)=>({ fontFamily:"'Nunito',sans-serif",padding:"10px 11px",border:"none",background:"none",cursor:"pointer",fontSize:12,fontWeight:a?800:600,color:a?T.primary:mu,borderBottom:a?`2.5px solid ${T.primary}`:"2.5px solid transparent",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,transition:"all 0.2s" }),
  };

  // ── LOGIN SCREEN ────────────────────────────────────────────────────────────
 if (!user)
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/images/aadhya.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        fontFamily: "'Nunito',sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.70)",
          zIndex: 0,
        }}
      ></div>

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo and Info */}
        <div style={{ textAlign: "center", marginBottom: 26, maxWidth: 360 }}>
          <div style={{ fontSize: 54, marginBottom: 6, lineHeight: 1 }}>
            🍽️
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
            }}
          >
            AADHYA
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 14,
              color: "#FFD27A",
              marginBottom: 10,
            }}
          >
            FAST FOOD & CAFE
          </div>

          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 30,
              padding: "6px 18px",
              fontSize: 13,
              fontWeight: 700,
              color: "#FFD27A",
              fontStyle: "italic",
              marginBottom: 16,
              backdropFilter: "blur(6px)",
            }}
          >
            ✦ {CAFE.motto} ✦
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#eee",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              📍 <span>{CAFE.location}</span>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#eee",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              📱 <span>{CAFE.mobile}</span>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#eee",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              🕐 <span>{CAFE.hours}</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 360,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: 20,
            border: `1px solid ${T.border}`,
            padding: "22px 20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: T.muted,
              marginBottom: 10,
              letterSpacing: "0.06em",
            }}
          >
            STAFF LOGIN
          </div>

          <div style={{ display: "flex",justifyContent: "center", gap: 6, marginBottom: 14 }}>
           <div style={{ display: "flex",justifyContent: "center", gap: 8, marginBottom: 14 }}>
  <button
    onClick={() => {
      setLRole("admin");
      setLPin("");
      setLErr("");
    }}
    style={{
      ...S.btn(lRole === "admin" ? "primary" : "outline"),
      flex: 1,
      padding: "10px 6px",
      fontSize: 13,
      minWidth: 90,
    }}
  >
    👑Admin
  </button>

  <button
    onClick={() => {
      setLRole("staff");
      setLPin("");
      setLErr("");
    }}
    style={{
      ...S.btn(lRole === "staff" ? "primary" : "outline"),
      flex: 1,
      padding: "10px 6px",
      fontSize: 13,
      minWidth: 90,
    }}
  >
     🧑Staff
  </button>

  <button
    onClick={() => {
      setLRole("chef");
      setLPin("");
      setLErr("");
    }}
    style={{
      ...S.btn(lRole === "chef" ? "primary" : "outline"),
      flex: 1,
      padding: "10px 6px",
      fontSize: 13,
       minWidth: 90,
    }}
  >
    👨‍🍳 Chef
  </button>
</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.muted,
                marginBottom: 5,
              }}
            >
              PIN
            </div>

            <input
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={lPin}
              onChange={(e) => setLPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              style={{
                ...S.inp,
                background: "#fff",
              }}
            />

            {lErr && (
              <div
                style={{
                  color: T.danger,
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: 700,
                }}
              >
                {lErr}
              </div>
            )}
          </div>

          <button
            onClick={login}
            style={{
              ...S.btn("primary"),
              width: "100%",
              padding: 13,
              fontSize: 15,
            }}
          >
            Login →
          </button>
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "#ddd",
            textAlign: "center",
          }}
        >
          Aadhya Fast Food & Cafe · Staff Management System
        </div>
      </div>
    </div>
  );

  // ── NAV PER ROLE ─────────────────────────────────────────────────────────
  const NAV = {
  staff: [
    { id: "neworder", label: "New Order", icon: "➕" },
    { id: "orders", label: "All Orders", icon: "📋" }
  ],
  chef: [
    { id: "kitchen", label: "Kitchen", icon: "👨‍🍳" }
  ],
  admin: [
    { id: "orders", label: "Orders", icon: "📋" },
    { id: "kitchen", label: "Chef", icon: "👨‍🍳" },
    { id: "menuadmin", label: "Menu", icon: "📝" },
    { id: "admin", label: "Dashboard", icon: "📊" }
  ],
};
  const navItems    = NAV[user.role]||NAV.staff;
  const validPanels = navItems.map(n=>n.id);
  const ap          = validPanels.includes(panel)?panel:navItems[0].id;
   // ─── SECURITY GUARD: ONLY STAFF CAN TAKE ORDERS ─────────────
const canTakeOrder = user.role === "staff";

if (ap === "neworder" && !canTakeOrder) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 900,
      color: "#B91C1C",
      background: "#fff0f0",
      fontSize: 18,
      textAlign: "center",
      padding: 20
    }}>
      🚫 Access Denied<br/>
      Only STAFF members can take new orders.
    </div>
  );
}
  return (
    <div style={{minHeight:"100vh",background:bg,color:tx,fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>

      {notif&&<div style={{position:"fixed",top:62,left:"50%",transform:"translateX(-50%)",background:notif.type==="success"?T.success:T.danger,color:"#fff",padding:"9px 20px",borderRadius:24,fontSize:13,fontWeight:800,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,0.25)",whiteSpace:"nowrap"}}>{notif.msg}</div>}

      {/* Header */}
      <div style={{background:dark?"#0E0800":T.dark,color:"#FFF5EE",padding:"0 14px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 14px rgba(0,0,0,0.35)"}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:T.accent,lineHeight:1.2}}>Aadhya Fast Food & Cafe</div>
          <div style={{fontSize:10,color:"#C09060",marginTop:1}}>✦ {CAFE.motto} ✦ &nbsp; {user.name}</div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setDark(d=>!d)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,padding:"5px 8px",cursor:"pointer",fontSize:15}}>{dark?"☀️":"🌙"}</button>
          <button onClick={()=>{setUser(null);setCart([]);setPanel("orders");}} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:12,color:"#C09060",fontWeight:800,fontFamily:"'Nunito',sans-serif"}}>Logout</button>
        </div>
      </div>

      {/* Info strip */}
      <div style={{background:dark?"#1A0F05":T.accentLight,borderBottom:`1px solid ${dark?"#3A2010":"#F0D0A0"}`,padding:"5px 14px",display:"flex",gap:16,overflowX:"auto",fontSize:11,color:dark?"#B08040":T.gold,fontWeight:700}}>
        <span>📍 {CAFE.location}</span>
        <span>📱 {CAFE.mobile}</span>
        <span>🕐 {CAFE.hours}</span>
      </div>

      {/* Nav */}
      <div style={{display:"flex",borderBottom:`1px solid ${bdr}`,background:dark?"#180F08":"#fff",overflowX:"auto"}}>
        {navItems.map(n=><button key={n.id} onClick={()=>setPanel(n.id)} style={S.nav(ap===n.id)}>{n.icon} {n.label}</button>)}
      </div>

      <div style={{padding:"12px 14px"}}>

        {/* ══ NEW ORDER ══════════════════════════════════════════════════════════ */}
        {ap==="neworder"&&(
          <div>
            <div style={{fontWeight:900,fontSize:18,marginBottom:4}}>Take New Order</div>
            <div style={{fontSize:12,color:mu,marginBottom:14}}>Enter customer details, then pick items from the menu.</div>

            <div style={S.card2()}>
              <div style={{fontWeight:800,fontSize:13,color:T.primary,marginBottom:10}}>👤 Customer Details</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:mu,marginBottom:4}}>Customer Name *</div>
                  <input placeholder="e.g. Raj Kumar" value={custName} onChange={e=>setCustName(e.target.value)} style={S.inp}/>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:mu,marginBottom:4}}>Phone Number</div>
                  <input placeholder="98XXXXXXXX" value={custPhone} onChange={e=>setCustPhone(e.target.value)} style={S.inp}/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:mu,marginBottom:4}}>Table No.</div>
                  <input placeholder="T-1, T-2, Takeaway..." value={tableNo} onChange={e=>setTableNo(e.target.value)} style={S.inp}/>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:mu,marginBottom:4}}>Discount %</div>
                  <input type="number" min={0} max={50} value={discPct} onChange={e=>setDiscPct(Number(e.target.value))} style={S.inp}/>
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:mu,marginBottom:4}}>Special Instructions</div>
                <textarea placeholder="Extra spicy, no onions, pack separately..." value={notes} onChange={e=>setNotes(e.target.value)} style={{...S.inp,minHeight:52,resize:"vertical"}}/>
              </div>
            </div>

            <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:10,paddingBottom:4}}>
              {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={S.tag(cat===c)}>{c}</button>)}
            </div>
            <input placeholder="🔍 Search menu items..." value={search} onChange={e=>setSearch(e.target.value)} style={{...S.inp,marginBottom:12}}/>

            {filtMenu.map(item=>{
              const inCart=cart.find(x=>x.id===item.id);
              return (
                <div key={item.id} style={S.card({display:"flex",gap:10,alignItems:"center"})}>
                  <div style={{fontSize:34,flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13}}>{item.name}</div>
                    <div style={{fontSize:11,color:mu,marginBottom:3}}>{item.desc}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontWeight:900,color:T.primary,fontSize:14}}>NPR {item.price}</span>
                      <span style={{fontSize:10,color:mu}}>~{item.prepTime} min</span>
                    </div>
                  </div>
                  {!item.available?(
                    <span style={{fontSize:11,color:T.danger,fontWeight:800}}>Off</span>
                  ):inCart?(
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <button onClick={()=>updQty(item.id,inCart.qty-1)} style={{width:28,height:28,borderRadius:7,border:`1px solid ${bdr}`,background:cBg2,cursor:"pointer",fontWeight:900,fontSize:16,color:tx}}>−</button>
                      <span style={{fontWeight:900,minWidth:22,textAlign:"center"}}>{inCart.qty}</span>
                      <button onClick={()=>updQty(item.id,inCart.qty+1)} style={{width:28,height:28,borderRadius:7,background:T.primary,border:"none",cursor:"pointer",fontWeight:900,color:"#fff",fontSize:16}}>+</button>
                    </div>
                  ):(
                    <button onClick={()=>addToCart(item)} style={{...S.btn("primary"),padding:"7px 14px",fontSize:18}}>+</button>
                  )}
                </div>
              );
            })}

            {cart.length>0&&(
              <div style={{position:"sticky",bottom:0,background:cBg,borderTop:`1px solid ${bdr}`,padding:"12px 0",marginTop:10}}>
                <div style={{marginBottom:10}}>
                  {cart.map(i=>(
                    <div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"2px 0",color:mu}}>
                      <span>{i.icon} {i.name} ×{i.qty}</span>
                      <span style={{fontWeight:700,color:tx}}>NPR {i.price*i.qty}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:cBg2,borderRadius:10,padding:"10px 12px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}><span style={{color:mu}}>Subtotal</span><span style={{fontWeight:700}}>NPR {cartSub}</span></div>
                  {discPct>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}><span style={{color:mu}}>Discount ({discPct}%)</span><span style={{fontWeight:700,color:T.success}}>−NPR {Math.round(cartDisc)}</span></div>}
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}><span style={{color:mu}}>VAT (13%)</span><span style={{fontWeight:700}}>NPR {Math.round(cartTax)}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:16,borderTop:`1px solid ${bdr}`,paddingTop:6}}><span>Total</span><span style={{color:T.primary}}>NPR {Math.round(cartTotal)}</span></div>
                </div>
                <button onClick={placeOrder} style={{...S.btn("primary"),width:"100%",padding:13,fontSize:15}}>Confirm Order & Notify Kitchen 🔔</button>
                {lastPlaced&&<div style={{background:T.successBg,border:`1px solid ${T.success}`,borderRadius:9,padding:"8px 12px",marginTop:8,fontSize:13}}><span style={{fontWeight:800,color:T.success}}>✅ {lastPlaced.id} placed!</span> Kitchen has been notified.</div>}
              </div>
            )}
          </div>
        )}

        {/* ══ ALL ORDERS ═════════════════════════════════════════════════════════ */}
        {ap==="orders"&&(
          <div>
            <div style={{fontWeight:900,fontSize:18,marginBottom:14}}>All Orders 📋</div>
            {orders.length===0&&<div style={{textAlign:"center",padding:40,color:mu}}>No orders yet.</div>}
            {orders.map(order=>(
              <div key={order.id} style={S.card({borderLeft:`3px solid ${order.status==="pending"?T.warning:order.status==="preparing"?T.info:T.success}`})}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:900,fontSize:14}}>{order.id}</div>
                    <div style={{fontSize:12,color:mu}}>👤 {order.customer}{order.mobile&&` 📱${order.mobile}`}</div>
                    <div style={{fontSize:12,color:mu}}>🪑 {order.table} · 🕐 {order.time}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <span style={S.badge(order.status)}>{order.status.toUpperCase()}</span>
                    <span style={{fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20,background:order.paid?T.successBg:T.warningBg,color:order.paid?T.success:T.warning}}>{order.paid?"PAID":"UNPAID"}</span>
                  </div>
                </div>
                <div style={{fontSize:12,color:mu,marginBottom:6}}>{order.items.map(i=>`${i.icon}${i.name}×${i.qty}`).join("  ")}</div>
                {order.notes&&<div style={{fontSize:12,background:T.warningBg,color:T.warning,padding:"4px 9px",borderRadius:7,marginBottom:7,fontWeight:600}}>📝 {order.notes}</div>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:900,color:T.primary,fontSize:14}}>NPR {orderSub(order)}</span>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {order.status==="pending"&&<button onClick={()=>setStatus(order.id,"preparing")} style={S.btn("primary",{padding:"6px 10px",fontSize:12})}>Send to Kitchen</button>}
                    {order.status==="preparing"&&<button onClick={()=>setStatus(order.id,"completed")} style={S.btn("success",{padding:"6px 10px",fontSize:12})}>Mark Ready</button>}
                    {order.status!=="cancelled"&&order.status!=="completed"&&<button onClick={()=>setStatus(order.id,"cancelled")} style={S.btn("danger",{padding:"6px 10px",fontSize:12})}>Cancel</button>}
                    <button onClick={()=>openBill(order)} style={S.btn("outline",{padding:"6px 10px",fontSize:12})}>Bill</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ KITCHEN ════════════════════════════════════════════════════════════ */}
        {ap==="kitchen"&&(
          <div>
            <div style={{fontWeight:900,fontSize:18,marginBottom:14}}>Kitchen Dashboard 👨‍🍳</div>
            {[
              {label:"🔴 Pending",   list:pending,   next:"preparing",btnLabel:"Start Preparing",  bv:"primary"},
              {label:"🟡 Preparing", list:preparing, next:"completed",btnLabel:"Mark Ready ✅",    bv:"success"},
              {label:"✅ Done",       list:completed, next:null},
            ].map(sec=>(
              <div key={sec.label} style={{marginBottom:22}}>
                <div style={{fontWeight:800,fontSize:14,marginBottom:8,color:sec.label.includes("Pending")?T.warning:sec.label.includes("Preparing")?T.info:T.success}}>{sec.label} ({sec.list.length})</div>
                {sec.list.length===0&&<div style={{color:mu,fontSize:13,paddingLeft:4}}>Nothing here right now.</div>}
                {sec.list.map(order=>(
                  <div key={order.id} style={S.card({borderLeft:`3px solid ${sec.label.includes("Pending")?T.warning:sec.label.includes("Preparing")?T.info:T.success}`})}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <div style={{fontWeight:900,fontSize:14}}>{order.id}</div>
                      <div style={{fontSize:12,color:mu}}>🪑 {order.table} · {order.time}</div>
                    </div>
                    <div style={{fontSize:12,color:mu,marginBottom:4}}>👤 {order.customer}</div>
                    {order.items.map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:14,padding:"3px 0"}}><span>{item.icon} {item.name}</span><strong>×{item.qty}</strong></div>)}
                    {order.notes&&<div style={{fontSize:12,background:T.warningBg,color:T.warning,padding:"4px 9px",borderRadius:7,marginTop:7,fontWeight:600}}>📝 {order.notes}</div>}
                    {sec.next&&<button onClick={()=>setStatus(order.id,sec.next)} style={{...S.btn(sec.bv),marginTop:10,width:"100%",padding:10}}>{sec.btnLabel}</button>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ══ MENU ADMIN ══════════════════════════════════════════════════════════ */}
        {ap==="menuadmin"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:900,fontSize:18}}>Menu Management 📝</div>
              <button onClick={()=>setMenuForm({name:"",category:"Burgers",price:"",desc:"",icon:"🍔",available:true})} style={S.btn("primary",{padding:"8px 13px",fontSize:13})}>+ Add</button>
            </div>
            {menuForm&&(
              <div style={{...S.card2(),marginBottom:14}}>
                <div style={{fontWeight:800,marginBottom:12}}>{menuForm.id?"Edit Item":"New Item"}</div>
                {[["name","Food Name"],["desc","Description"],["price","Price (NPR)"],["icon","Emoji Icon"]].map(([k,l])=>(
                  <div key={k} style={{marginBottom:8}}>
                    <div style={{fontSize:12,fontWeight:700,color:mu,marginBottom:3}}>{l}</div>
                    <input value={menuForm[k]||""} onChange={e=>setMenuForm(f=>({...f,[k]:e.target.value}))} style={S.inp}/>
                  </div>
                ))}
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:700,color:mu,marginBottom:3}}>Category</div>
                  <select value={menuForm.category} onChange={e=>setMenuForm(f=>({...f,category:e.target.value}))} style={S.inp}>
                    {["Burgers","Momos","Snacks","Beverages","Noodles","Pizza","Other"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <input type="checkbox" checked={menuForm.available} onChange={e=>setMenuForm(f=>({...f,available:e.target.checked}))} style={{width:16,height:16}}/>
                  <span style={{fontSize:13,fontWeight:700}}>Available</span>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>{if(menuForm.id)setMenu(m=>m.map(x=>x.id===menuForm.id?{...menuForm,price:Number(menuForm.price)}:x));else setMenu(m=>[...m,{...menuForm,id:Date.now(),price:Number(menuForm.price),prepTime:8}]);setMenuForm(null);notify("Menu updated ✅");}} style={S.btn("primary")}>{menuForm.id?"Update":"Add Item"}</button>
                  <button onClick={()=>setMenuForm(null)} style={S.btn("outline")}>Cancel</button>
                </div>
              </div>
            )}
            {menu.map(item=>(
              <div key={item.id} style={S.card({display:"flex",gap:10,alignItems:"center"})}>
                <div style={{fontSize:30,flexShrink:0}}>{item.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:13}}>{item.name}</div>
                  <div style={{fontSize:11,color:mu}}>{item.category}</div>
                  <div style={{fontWeight:900,color:T.primary}}>NPR {item.price}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5,flexShrink:0}}>
                  <button onClick={()=>setMenuForm({...item,price:String(item.price)})} style={S.btn("outline",{padding:"5px 10px",fontSize:12})}>Edit</button>
                  <button onClick={()=>setMenu(m=>m.map(x=>x.id===item.id?{...x,available:!x.available}:x))} style={{padding:"5px 8px",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:800,fontFamily:"'Nunito',sans-serif",background:item.available?T.successBg:T.dangerBg,color:item.available?T.success:T.danger}}>{item.available?"● On":"● Off"}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ ADMIN DASHBOARD ═════════════════════════════════════════════════════ */}
        {ap==="admin"&&(
          <div>
            <div style={{fontWeight:900,fontSize:18,marginBottom:14}}>Admin Dashboard 📊</div>
            <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
              {["dashboard","reports","payments","staff"].map(t=>(
                <button key={t} onClick={()=>setAdminTab(t)} style={S.btn(adminTab===t?"primary":"outline",{padding:"7px 13px",fontSize:12})}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
              ))}
            </div>

            {adminTab==="dashboard"&&<>
              <div style={{...S.card2(),marginBottom:14}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:T.primary,fontSize:15,marginBottom:4}}>{CAFE.name}</div>
                <div style={{fontSize:12,color:mu,fontStyle:"italic",marginBottom:8}}>"{CAFE.motto}"</div>
                <div style={{fontSize:12,color:mu}}>📍 {CAFE.location}</div>
                <div style={{fontSize:12,color:mu}}>📞 {CAFE.phone} · 📱 {CAFE.mobile}</div>
                <div style={{fontSize:12,color:mu}}>🕐 {CAFE.hours}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
                {[{label:"Total Revenue",value:`NPR ${revenue}`,icon:"💰"},{label:"Total Orders",value:orders.length,icon:"📋"},{label:"Pending",value:pending.length,icon:"⏳"},{label:"Completed",value:completed.length,icon:"✅"}].map((s,i)=>(
                  <div key={i} style={{background:cBg2,borderRadius:13,padding:"14px 12px",border:`1px solid ${bdr}`}}>
                    <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
                    <div style={{fontSize:22,fontWeight:900,color:T.primary}}>{s.value}</div>
                    <div style={{fontSize:11,color:mu}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>Recent Orders</div>
              {orders.slice(0,5).map(o=>(
                <div key={o.id} style={S.card({display:"flex",justifyContent:"space-between",alignItems:"center"})}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>{o.id} · {o.customer}</div>
                    <div style={{fontSize:11,color:mu}}>🪑 {o.table} · mobile {o.mobile||"—"}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span style={S.badge(o.status)}>{o.status}</span>
                    <div style={{fontSize:12,color:T.primary,fontWeight:800,marginTop:3}}>NPR {orderSub(o)}</div>
                  </div>
                </div>
              ))}
            </>}

            {adminTab==="reports"&&(
              <div style={S.card()}>
                {[["Total Orders",orders.length],["Pending",pending.length],["Preparing",preparing.length],["Completed",completed.length],["Revenue (Paid)",`NPR ${revenue}`],["Avg Order Value",`NPR ${orders.length?Math.round(orders.reduce((s,o)=>s+orderSub(o),0)/orders.length):0}`]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${bdr}`}}>
                    <span style={{color:mu,fontSize:14}}>{k}</span><span style={{fontWeight:800}}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            {adminTab==="payments"&&orders.map(o=>(
              <div key={o.id} style={S.card({display:"flex",justifyContent:"space-between",alignItems:"center"})}>
                <div>
                  <div style={{fontWeight:800,fontSize:13}}>{o.id} · {o.customer}</div>
                  <div style={{fontSize:11,color:mu}}>📱 {o.mobile||"—"} · 🪑 {o.table} · {o.time}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:900,color:T.primary}}>NPR {orderSub(o)}</div>
                  <span style={{fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20,marginTop:3,display:"inline-block",background:o.paid?T.successBg:T.warningBg,color:o.paid?T.success:T.warning}}>{o.paid?"PAID":"UNPAID"}</span>
                </div>
              </div>
            ))}

            {adminTab==="staff"&&<>
              <div style={{fontWeight:800,fontSize:15,marginBottom:10}}>Staff Accounts</div>
              {/* MONTH + YEAR SWITCHER */}
<div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
  
  {/* Month Select */}
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(Number(e.target.value))}
    style={S.inp}
  >
    {[
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ].map((m, i) => (
      <option key={i} value={i}>
        {m}
      </option>
    ))}
  </select>

  {/* Year Input */}
  <input
    type="number"
    value={selectedYear}
    onChange={(e) => setSelectedYear(Number(e.target.value))}
    style={S.inp}
  />
</div>
{/* 📊 ATTENDANCE SHEET */}
<div style={{ ...S.card2(), marginBottom: 12 }}>
  <div style={{ fontWeight: 900, marginBottom: 8 }}>
    📊 Attendance Sheet
  </div>

  {getMonthlyLogs().length === 0 ? (
    <div style={{ color: mu, fontSize: 12 }}>
      No attendance records for this month
    </div>
  ) : (
    getMonthlyLogs().map(log => (
      <div
        key={log.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 0",
          borderBottom: `1px solid ${bdr}`
        }}
      >
        <div>
          <div style={{ fontWeight: 800 }}>{log.name}</div>
          <div style={{ fontSize: 11, color: mu }}>
            {log.role} · {log.hours.toFixed(2)} hrs
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 900, color: T.primary }}>
            NPR {log.salary}
          </div>
          <div style={{ fontSize: 10, color: mu }}>
            {log.date}
          </div>
        </div>
      </div>
    ))
  )}
</div>
{/* MONTHLY PAYROLL DASHBOARD */}
<div style={{ ...S.card2(), marginBottom: 12 }}>
  <div style={{ fontWeight: 900 }}>📊 Monthly Payroll</div>

  {calculateMonthlyPayroll().map(emp => (
    <div key={emp.phone} style={{ marginTop: 8 }}>
      <b>{emp.name}</b>
      <div style={{ fontSize: 12, color: mu }}>
        {emp.role} · {emp.totalHours.toFixed(2)} hrs
      </div>
      <div style={{ fontWeight: 900, color: T.primary }}>
        NPR {emp.totalSalary.toFixed(2)}
      </div>
    </div>
  ))}
  <div style={{ fontWeight: 900, marginTop: 10 }}>
  📅 Today Attendance
</div>

{attendanceLogs
  .filter(l => new Date(l.start).toDateString() === new Date().toDateString())
  .map(l => (
    <div key={l.id} style={S.card()}>
      <b>{l.name}</b>
      <div style={{ fontSize: 12, color: mu }}>
        {l.role} · {l.hours} hrs · NPR {l.salary}
      </div>
    </div>
  ))}
  {/* ⭐ EXPERT PAYROLL DASHBOARD */}
<div style={{ ...S.card2(), marginBottom: 12 }}>
  <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>
    💰 Expert Monthly Payroll Summary
  </div>

  {calculateMonthlyPayroll().length === 0 ? (
    <div style={{ color: mu, fontSize: 12 }}>
      No payroll data for selected month
    </div>
  ) : (
    calculateMonthlyPayroll().map(emp => (
      <div
        key={emp.phone}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 0",
          borderBottom: `1px solid ${bdr}`
        }}
      >
        <div>
          <div style={{ fontWeight: 800 }}>{emp.name}</div>
          <div style={{ fontSize: 11, color: mu }}>
            {emp.role.toUpperCase()} · {emp.totalHours.toFixed(2)} hrs
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 900, color: T.primary }}>
            NPR {emp.totalSalary.toFixed(2)}
          </div>
          <div style={{ fontSize: 10, color: mu }}>
            Avg Rate Applied
          </div>
        </div>
      </div>
    ))
  )}
  {/* TOTAL MONTHLY EXPENSE */}
<div style={{ marginTop: 10, fontWeight: 900 }}>
  📊 Total Payroll Expense: NPR{" "}
  {calculateMonthlyPayroll()
    .reduce((s, e) => s + e.totalSalary, 0)
    .toFixed(2)}
    
</div>
</div>
</div>
              {STAFF_USERS.map(u=>(
  <div key={u.role + u.pin} style={S.card({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  })}>

    {/* LEFT SIDE */}
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{
        width:36,height:36,borderRadius:"50%",
        background:T.primaryLight,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontWeight:900,color:T.primary,fontSize:15
      }}>
        {u.avatar}
      </div>

      <div>
        <div style={{fontWeight:800}}>{u.name}</div>

        <div style={{fontSize:12,color:mu}}>
          {u.role.toUpperCase()} · 📱 {u.phone}
        </div>

        <div style={{
          fontSize:11,
          marginTop:3,
          fontWeight:800,
          color:attendance[u.phone] ? T.success : T.warning
        }}>
          {attendance[u.phone] ? "🟢 On Duty" : "🟡 Off Duty"}
        </div>
      </div>
    </div>

    {/* RIGHT ACTIONS */}
    <div style={{display:"flex",flexDirection:"column",gap:5}}>

      {/* CALL */}
      <a href={`tel:${u.phone}`} style={{textDecoration:"none"}}>
        <button style={S.btn("primary",{padding:"5px 10px",fontSize:11})}>
          📞 Call
        </button>
      </a>

      {/* WHATSAPP */}
      <a href={toWA(u.phone)} target="_blank" rel="noreferrer">
        <button style={S.btn("success",{padding:"5px 10px",fontSize:11})}>
          💬 WhatsApp
        </button>
      </a>

      {/* ATTENDANCE TOGGLE */}
      <button
  onClick={() => {
    attendance[u.phone]
      ? clockOut(u)
      : clockIn(u);
  }}
  style={{
    padding:"5px 10px",
    borderRadius:7,
    border:"none",
    cursor:"pointer",
    fontSize:11,
    fontWeight:800,
    background: attendance[u.phone] ? T.successBg : T.warningBg,
    color: attendance[u.phone] ? T.success : T.warning
  }}
>
  {attendance[u.phone] ? "Clock Out" : "Clock In"}
</button>
    </div>
  </div>
))}
              <div style={{...S.card2(),marginTop:6}}>
                <div style={{fontWeight:800,marginBottom:10}}>Add New Staff</div>
                <input placeholder="Full name" style={{...S.inp,marginBottom:8}}/>
                <select style={{...S.inp,marginBottom:10}}><option>Staff</option><option>Chef</option></select>
                <button onClick={()=>notify("Staff account created!")} style={{...S.btn("primary"),width:"100%",padding:10}}>Create Account</button>
              </div>
            </>}
          </div>
        )}
      </div>

      {/* ══ BILL MODAL ══════════════════════════════════════════════════════════ */}
      {billOrder&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:cBg,borderRadius:"20px 20px 0 0",padding:20,width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",color:tx}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700}}>Invoice</div>
              <button onClick={()=>setBillOrder(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:tx}}>✕</button>
            </div>
            <div style={{textAlign:"center",background:cBg2,borderRadius:11,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:T.primary,fontSize:16}}>{CAFE.name}</div>
              <div style={{fontSize:11,color:mu,fontStyle:"italic",marginBottom:4}}>{CAFE.motto}</div>
              <div style={{fontSize:11,color:mu}}>📍 {CAFE.location}</div>
              <div style={{fontSize:11,color:mu}}>📱 {CAFE.mobile}</div>
              <div style={{height:1,background:bdr,margin:"8px 0"}}/>
              <div style={{fontSize:12}}>Order: <strong>{billOrder.id}</strong> · Table: <strong>{billOrder.table}</strong></div>
              <div style={{fontSize:12,color:mu}}>{billOrder.time} · {billOrder.customer}{billOrder.phone&&` · 📱 ${billOrder.mobile}`}</div>
            </div>
            <div style={{borderTop:`1px dashed ${bdr}`,borderBottom:`1px dashed ${bdr}`,padding:"10px 0",marginBottom:12}}>
              {billOrder.items.map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:14,padding:"4px 0"}}><span>{item.icon} {item.name} ×{item.qty}</span><span style={{fontWeight:700}}>NPR {item.price*item.qty}</span></div>)}
            </div>
            <div style={{marginBottom:16}}>
              {[["Subtotal",`NPR ${billOrder.sub}`],[`Discount (${billOrder.discount}%)`,`−NPR ${Math.round(billOrder.da)}`],["VAT (13%)",`NPR ${Math.round(billOrder.tax)}`]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"3px 0",color:mu}}><span>{k}</span><span>{v}</span></div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:17,borderTop:`1px solid ${bdr}`,paddingTop:9,marginTop:6}}><span>Total Payable</span><span style={{color:T.primary}}>NPR {Math.round(billOrder.total)}</span></div>
            </div>
            <div style={{display:"flex",gap:8}}>
              {!billOrder.paid&&<button onClick={()=>{setPayOrder(billOrder);setPayDone(false);}} style={{...S.btn("primary"),flex:1,padding:13}}>Collect Payment 💳</button>}
              <button onClick={()=>{notify("Invoice saved!");setBillOrder(null);}} style={{...S.btn("outline"),flex:1,padding:13}}>Download</button>
            </div>
            <div style={{textAlign:"center",fontSize:11,color:mu,marginTop:14}}>Thank you for visiting!❤️<br/>{CAFE.name}<br/><em>{CAFE.motto}</em></div>
          </div>
        </div>
      )}

      {/* ══ PAYMENT MODAL ═══════════════════════════════════════════════════════ */}
      {payOrder&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:cBg,borderRadius:"20px 20px 0 0",padding:20,width:"100%",maxWidth:480,color:tx}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:900,fontSize:18}}>Payment 💳</div>
              <button onClick={()=>setPayOrder(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:tx}}>✕</button>
            </div>
            {!payDone?<>
              <div style={{textAlign:"center",marginBottom:16}}>
                <div style={{fontSize:13,color:mu,marginBottom:10}}>Scan QR · eSewa · Khalti · IME Pay · ConnectIPS</div>
                <div style={{display:"inline-block",padding:16,background:"#fff",borderRadius:14,border:`2px solid ${T.primary}`}}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect width="120" height="120" fill="white"/>
                    <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="4"/>
                    <rect x="18" y="18" width="24" height="24" fill="black"/>
                    <rect x="70" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="4"/>
                    <rect x="78" y="18" width="24" height="24" fill="black"/>
                    <rect x="10" y="70" width="40" height="40" fill="none" stroke="black" strokeWidth="4"/>
                    <rect x="18" y="78" width="24" height="24" fill="black"/>
                    <rect x="70" y="70" width="8" height="8" fill="black"/>
                    <rect x="82" y="70" width="8" height="8" fill="black"/>
                    <rect x="94" y="70" width="16" height="8" fill="black"/>
                    <rect x="70" y="82" width="16" height="8" fill="black"/>
                    <rect x="90" y="82" width="20" height="8" fill="black"/>
                    <rect x="70" y="94" width="8" height="16" fill="black"/>
                    <rect x="94" y="94" width="16" height="8" fill="black"/>
                    <rect x="55" y="55" width="10" height="10" fill="black"/>
                    <rect x="55" y="10" width="10" height="6" fill="black"/>
                    <rect x="55" y="22" width="10" height="6" fill="black"/>
                    <rect x="55" y="34" width="10" height="6" fill="black"/>
                    <rect x="10" y="55" width="6" height="10" fill="black"/>
                    <rect x="22" y="55" width="6" height="10" fill="black"/>
                    <rect x="34" y="55" width="6" height="10" fill="black"/>
                  </svg>
                </div>
                <div style={{fontSize:14,marginTop:10}}>Amount: <strong style={{color:T.primary,fontSize:17}}>NPR {Math.round(payOrder.total||orderSub(payOrder))}</strong></div>
                <div style={{fontSize:12,color:mu,marginTop:2}}>Order: {payOrder.id} · {payOrder.customer}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{
                  setPayDone(true);
                  setOrders(o=>o.map(x=>x.id===payOrder.id?{...x,paid:true}:x));
                  if(billOrder)setBillOrder(b=>b?{...b,paid:true}:b);
                  notify("Payment confirmed! ✅");
                  setTimeout(()=>{setPayOrder(null);setBillOrder(null);setPayDone(false);},3000);
                }} style={{...S.btn("success"),flex:1,padding:13,fontSize:15}}>✅ Confirm Payment</button>
                <button onClick={()=>setPayOrder(null)} style={{...S.btn("outline"),flex:1,padding:13}}>Cancel</button>
              </div>
            </>:<div style={{textAlign:"center",padding:24}}>
              <div style={{fontSize:56,marginBottom:12}}>✅</div>
              <div style={{fontWeight:900,fontSize:20,color:T.success}}>Payment Successful!</div>
              <div style={{fontSize:14,color:mu,marginTop:6}}>Thank you for visiting!!<br/> {CAFE.name}</div>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}