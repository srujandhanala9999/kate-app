const $=s=>document.querySelector(s), h=(el,html)=>el.innerHTML=html;
const CATS={
 fb:{n:'Food & Beverage',i:'🍽',d:'Cafés to full-service restaurants, from first order to final bill.',
  t:['Coffee Shops','Quick Service','Drive-through','Full Service','Bars & Breweries','Food Trucks','Catering','Bakeries','Pizzerias'],
  c:['Take payments','Manage orders','Table management','QR ordering','Kitchen orders','Menu management','Inventory','Ingredient tracking','Recipe management','Track wastage','Customer management','Customer loyalty','KATE Marketing','Employee management','Sales analytics','Cash-flow management']},
 re:{n:'Retail',i:'🛍',d:'Barcode, variants and multi-store stock that stays accurate.',
  t:['Clothing','Footwear','Grocery','Kirana / Convenience','Electronics','Home & Gift','Jewellery','Hardware','Beauty Retail','Garden','Specialty Stores','Other Retail'],
  c:['Take payments','Track inventory','Barcode management','SKU management','Product variants','Size & color management','Purchase orders','Supplier management','Stock transfers','Returns & exchanges','Customer management','Loyalty','KATE Marketing','Employee management','Sales analytics','Cash-flow management','Multi-store management','Online catalog','Business website']},
 be:{n:'Beauty',i:'✂',d:'Bookings, staff and memberships in one calendar.',
  t:['Salons','Barbers','Spas','Nail Salons','Beauty Stores','Wellness Businesses'],
  c:['Appointments','Services','Staff scheduling','Customer profiles','Customer history','Memberships','Packages','Payments','Service inventory','Employee commissions','Customer loyalty','Marketing','Reminders','Reports','Analytics']},
 sv:{n:'Services',i:'🔧',d:'Quotes, bookings and invoices for teams on the move.',
  t:['Professional Services','Repair Services','Automotive','Cleaning','Home Services','Consulting','Education & Training','Other Services'],
  c:['Appointments','Bookings','Customer management','Service management','Employee scheduling','Invoices','Payments','Quotes','Expenses','Customer communication','Marketing','Reports','Analytics']}
};
const ALL=[...Object.values(CATS).map(c=>c.n),'Restaurants','Coffee Shops','Bakeries','Pizzerias','Grocery','Kirana','Clothing','Footwear','Electronics','Jewellery','Hardware','Salons','Barbers','Spas','Repair Shops','Automotive','Professional Services','Education','Cleaning','Home Services'];
const chips=(a,cls='bg-mist')=>a.map(x=>`<span class="text-sm ${cls} rounded-full px-3 py-1.5">${x}</span>`).join('');

/* ---------- NAV ---------- */
const links=['Products','Solutions','KATE Marketing','KATE AI','Pricing','Resources'];
h($('#navlinks'),`<button id="btBtn" aria-expanded="false" aria-controls="mega" class="px-3 py-2 rounded-lg hover:bg-mist font-semibold">Business Types ▾</button>`+links.map(l=>`<a href="#products" class="px-3 py-2 rounded-lg hover:bg-mist">${l}</a>`).join(''));
let active='fb';
function renderMega(){
 const keys=[...Object.keys(CATS),'all'];
 const left=keys.map(k=>`<button data-k="${k}" class="w-full text-left px-4 py-3 rounded-xl font-semibold flex justify-between ${k===active?'bg-kate/10 text-kate':'hover:bg-mist'}">${k==='all'?'All Business Types':CATS[k].n}<span>›</span></button>`).join('');
 let right;
 if(active==='all') right=`<h3 class="text-xl font-extrabold">All Business Types</h3><input id="q" placeholder="Search industries…" aria-label="Search industries" class="mt-3 w-full border border-black/15 rounded-xl px-4 py-2.5"><div id="allGrid" class="mt-4 flex flex-wrap gap-2">${chips(ALL)}</div><p class="mt-4 text-sm text-ink/60">Hundreds more categories are supported by the same schema.</p>`;
 else{const c=CATS[active];right=`<div class="grid md:grid-cols-3 gap-8">
  <div><p class="text-xs font-bold tracking-widest text-ink/50">DISCOVER</p><p class="mt-2 font-semibold">Overview</p><p class="mt-1 font-semibold">Why KATE for ${c.n}</p><p class="mt-2 text-sm text-ink/60">${c.d}</p>
  <p class="mt-6 text-xs font-bold tracking-widest text-ink/50">BUSINESS TYPES</p><ul class="mt-2 space-y-1.5 text-sm">${c.t.map(x=>`<li><a href="#start" class="hover:text-kate">${x}</a></li>`).join('')}</ul></div>
  <div class="md:col-span-2"><p class="text-xs font-bold tracking-widest text-ink/50">CAPABILITIES</p><div class="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">${c.c.map(x=>`<div class="flex gap-2"><span class="text-kate">✓</span>${x}</div>`).join('')}</div></div></div>`}
 h($('#mega'),`<div class="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-[260px_1fr] gap-8"><div role="tablist" class="space-y-1">${left}</div><div class="fade">${right}</div></div>`);
 $('#mega').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{active=b.dataset.k;renderMega()});
 const q=$('#q'); if(q) q.oninput=()=>h($('#allGrid'),chips(ALL.filter(x=>x.toLowerCase().includes(q.value.toLowerCase()))));
}
const mega=$('#mega'),btn=$('#btBtn');
const setMega=o=>{mega.classList.toggle('hidden',!o);btn.setAttribute('aria-expanded',o);if(o){renderMega();mega.classList.add('fade')}};
btn.onclick=e=>{e.stopPropagation();setMega(mega.classList.contains('hidden'))};
document.addEventListener('click',e=>{if(!mega.contains(e.target))setMega(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMega(false);btn.focus()}});

/* mobile accordion */
const mob=$('#mobile'),bg=$('#burger');
h(mob,`<details class="border-b border-black/5"><summary class="py-3 font-semibold cursor-pointer">Business Types</summary><div class="pb-3 space-y-2">${Object.values(CATS).map(c=>`<details class="ml-2"><summary class="py-2 cursor-pointer">${c.i} ${c.n}</summary><ul class="pl-6 pb-2 text-sm space-y-1.5 text-ink/70">${c.t.map(t=>`<li>${t}</li>`).join('')}</ul></details>`).join('')}<a href="#start" class="ml-2 block py-2 font-semibold">All Business Types</a></div></details>`+links.map(l=>`<a href="#products" class="block py-3 border-b border-black/5">${l}</a>`).join('')+`<div class="flex gap-3 pt-4"><a href="#" class="flex-1 text-center border border-black/15 rounded-full py-3 font-semibold">Sign In</a><a href="#start" class="flex-1 text-center bg-ink text-white rounded-full py-3 font-semibold">Get Started</a></div>`);
bg.onclick=()=>{const o=mob.classList.toggle('hidden');bg.setAttribute('aria-expanded',!o);bg.textContent=o?'☰':'✕'};

/* ---------- SECTIONS ---------- */
h($('#bars'),[40,65,50,80,60,95,72].map((v,i)=>`<div class="flex-1 rounded-t-lg ${i===5?'bg-kate':'bg-ink/15'}" style="height:${v}%"></div>`).join(''));
h($('#industryCards'),Object.values(CATS).map(c=>`<article class="card rounded-3xl border border-black/10 p-6 bg-white"><div class="text-3xl">${c.i}</div><h3 class="mt-4 text-xl font-bold">${c.n}</h3><p class="mt-2 text-sm text-ink/70">${c.d}</p><p class="mt-4 text-xs text-ink/50">${c.t.slice(0,3).join(' · ')}</p></article>`).join(''));

const SETUP={Restaurant:['Tables','Orders','KOT','Kitchen','Menu','Modifiers','Ingredients','Recipes','Wastage','Delivery','Takeaway','Dine-in','QR ordering'],
 'Clothing Store':['Sizes','Colors','Brands','Variants','SKU','Barcode','Stock','Purchase','Returns','Exchanges'],
 'Grocery Store':['Barcode','Weighing scale','Batch & expiry','Suppliers','Purchase orders','Stock alerts'],
 Salon:['Appointments','Services','Staff','Customers','Memberships','Packages','Commissions','Reminders'],
 'Repair Shop':['Job cards','Quotes','Parts stock','Technicians','Invoices','Status updates'],
 'Service Business':['Bookings','Quotes','Invoices','Scheduling','Expenses','Customer messages']};
function setup(k){
 h($('#setupTabs'),Object.keys(SETUP).map(x=>`<button role="tab" aria-selected="${x===k}" data-s="${x}" class="px-4 py-2 rounded-full text-sm font-semibold ${x===k?'bg-kate':'bg-white/10 hover:bg-white/20'}">${x}</button>`).join(''));
 h($('#setupOut'),`<div class="fade"><p class="text-sm text-white/60">KATE automatically enables for <b class="text-white">${k}</b>:</p><div class="mt-4 flex flex-wrap gap-2">${chips(SETUP[k],'bg-white/10')}</div></div>`);
 document.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>setup(b.dataset.s));
}
setup('Restaurant');

const P=[['🧾','KATE POS','Fast checkout on desktop, tablet and mobile.'],['📊','KATE Business','Orders, staff, expenses and reports in one dashboard.'],['📦','KATE Inventory','Stock, suppliers, variants and purchase orders.'],['💳','KATE Payments','UPI, cards and cash reconciled automatically.'],['📣','KATE Marketing','Campaigns built from real customer data.'],['✦','KATE AI','Ask your business questions in plain language.'],['🌐','KATE Website','A live website generated from your catalog.']];
h($('#productCards'),P.map(p=>`<article class="card rounded-3xl border border-black/10 p-6 bg-white"><div class="w-11 h-11 rounded-2xl bg-kate/10 grid place-items-center text-xl">${p[0]}</div><h3 class="mt-4 font-bold text-lg">${p[1]}</h3><p class="mt-1 text-sm text-ink/70">${p[2]}</p><a href="#" class="mt-4 inline-block text-sm font-semibold text-kate">Learn More →</a></article>`).join(''));

h($('#flow'),['Sale','Customer data','Segment','KATE AI','Campaign','Customer','Repeat sale'].map((s,i)=>`<li class="rounded-2xl p-4 text-center text-sm font-bold ${i===3?'bg-kate text-white':'bg-white border border-black/10'}"><span class="block text-xs opacity-50">${i+1}</span>${s}</li>`).join(''));
h($('#mktFeat'),chips(['Segmentation','Campaigns','Offers','Coupons','Loyalty','Win-back','Repeat purchase','Birthday offers','WhatsApp','SMS','Email','Reminders','Analytics','AI-generated campaigns'],'bg-white border border-black/10'));

const AI={"Which products sold the most this month?":"Top sellers: Cappuccino (612), Butter Croissant (455), Cold Brew (398). Cappuccino drove 21% of revenue.",
 "Which products are running low?":"3 items below reorder level: Oat milk (6 left), Paper cups 12oz (40), Croissant dough (2 kg).",
 "Why did sales decrease this week?":"Sales are down 9%: weekday lunch orders fell after a 2-day stock-out on sandwiches. Weekend sales rose 4%.",
 "Create a promotion for customers who haven't visited in 60 days.":"Draft ready: 87 customers · “We miss you — 15% off this week” via WhatsApp. Review and send?",
 "How much did I make this month?":"Revenue ₹9.4L, expenses ₹6.1L, estimated profit ₹3.3L (35%)."};
h($('#aiQs'),Object.keys(AI).map(q=>`<button class="text-left text-sm border border-black/15 rounded-full px-3 py-2 hover:border-kate hover:text-kate">${q}</button>`).join(''));
h($('#aiAns'),'<span class="text-ink/50">Pick a question to see KATE AI answer.</span>');
document.querySelectorAll('#aiQs button').forEach(b=>b.onclick=()=>h($('#aiAns'),`<div class="fade"><p class="text-xs text-ink/50">You asked</p><p class="font-semibold">${b.textContent}</p><p class="mt-3">✦ ${AI[b.textContent]}</p></div>`));

h($('#webFlow'),['KATE POS','KATE Database','Business Website','Online Store'].map((s,i,a)=>`<span class="bg-white border border-black/10 rounded-full px-4 py-2">${s}</span>${i<a.length-1?'<span class="text-kate">→</span>':''}`).join(''));
$('#price').oninput=e=>$('#webPrice').textContent='₹'+(e.target.value||0);

/* ---------- LOGIN ---------- */
const login=$('#login');
const openLogin=e=>{e&&e.preventDefault();login.classList.remove('hidden');document.body.style.overflow='hidden';setMega(false);mob.classList.add('hidden')};
const closeLogin=()=>{login.classList.add('hidden');document.body.style.overflow=''};
document.querySelectorAll('a').forEach(a=>{if(a.textContent.trim()==='Sign In')a.onclick=openLogin});
['#loginClose','#loginClose2','#loginStart'].forEach(x=>$(x).addEventListener('click',closeLogin));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLogin()});

/* ---------- APP: roles + domain workspaces ---------- */
const ROLES={admin:'Admin · Accounts (ERP)',owner:'Owner',pos:'POS',sup:'Supervisor'};
const COMMON={admin:['Dashboard','Chart of Accounts','Journal Entries','Invoices','Bills & Payables','Bank Reconciliation','GST & Taxes','Payroll','Reports'],
 owner:['Overview','Sales & Profit','Cash Flow','Stores','Staff','Approvals','KATE AI','Settings']};
const IND={
 food:{n:'Food & Beverage',i:'🍽',mods:['Tables','KOT','Modifiers','Recipes','Wastage','QR ordering'],
  items:[['Cappuccino',180],['Veg Burger',220],['Margherita Pizza',350],['Cold Brew',210],['Croissant',120],['Pasta Alfredo',320]],
  ex:['Table',['T1','T2','T3','T4','T5','T6']],
  kpi:[['Open KOTs','7'],['Avg prep time','11 min'],['Wastage today','₹640'],['Tables busy','4 / 12']],
  rows:[['KOT #218 · Table T2','Kitchen','Preparing'],['Wastage: 2 kg dough','Approve','Pending'],['15% discount · Table T5','Approve','Pending'],['Recipe cost alert: Pizza','Review','Open']]},
 salon:{n:'Salon',i:'✂',mods:['Appointments','Services','Staff','Memberships','Packages','Commissions'],
  items:[['Haircut',400],['Hair Colour',1800],['Facial',1200],['Beard Trim',200],['Manicure',600],['Spa Package',2500]],
  ex:['Stylist',['Anita','Rahul','Meena','Sara']],
  kpi:[['Appointments today','24'],['Staff on duty','5'],['Commission due','₹8,420'],['No-shows','2']],
  rows:[['4:30 PM · Hair Colour · Anita','Confirmed','Booked'],['Membership refund ₹1,200','Approve','Pending'],['Rahul leave request','Approve','Pending'],['Package expiring: 6 clients','Remind','Open']]},
 retail:{n:'Retail Shop',i:'🛍',mods:['Barcode','SKU','Variants','Purchase','Returns','Exchanges'],
  items:[['T-Shirt · M · Blue',799],['Jeans · 32 · Black',1799],['Sneakers · 9 · White',2999],['Cap · Free · Red',399],['Belt · 34 · Brown',699],['Socks · Pack of 3',249]],
  ex:['Scan',['Barcode','SKU search','Size M','Size L']],
  kpi:[['Low-stock SKUs','14'],['Returns today','3'],['Transfers pending','2'],['Bills today','96']],
  rows:[['Stock transfer · Store 2 → Store 1','Approve','Pending'],['Return · Jeans 32 · ₹1,799','Approve','Pending'],['PO #331 · Denim Co.','Receive','Open'],['Price override ₹200 off','Approve','Pending']]},
 battery:{n:'Battery Shop',i:'🔋',mods:['Serial numbers','Warranty','Old battery exchange','Charging','Dealers','Service jobs'],
  items:[['Exide 150Ah Tubular',14500],['Luminous 12V 7Ah',1100],['Amaron Car 65Ah',6200],['Inverter Trolley',2400],['Distilled Water 5L',120],['Charging Service',300]],
  ex:['Old battery',['Exchange −₹2,000','No exchange','Scrap by weight']],
  kpi:[['Warranty claims','6'],['Old batteries in stock','18'],['Under charging','9'],['Dealer dues','₹1.4L']],
  rows:[['Claim · SN EX-88213 · 14 mo','Approve','Pending'],['Exchange value override','Approve','Pending'],['Replacement · Amaron 65Ah','Issue','Open'],['Scrap lot · 220 kg','Sell','Open']]}
};
let role='admin',ind='food',cart=[];
const rs=n=>'₹'+n.toLocaleString('en-IN');
const kpis=a=>`<div class="grid grid-cols-2 xl:grid-cols-4 gap-3">${a.map(k=>`<div class="bg-white rounded-2xl p-4 border border-black/5"><p class="text-xs text-ink/60">${k[0]}</p><p class="text-2xl font-extrabold mt-1">${k[1]}</p></div>`).join('')}</div>`;
const table=(head,rows)=>`<div class="bg-white rounded-2xl border border-black/5 overflow-x-auto"><table class="w-full text-sm"><thead class="text-left text-ink/50"><tr>${head.map(x=>`<th class="p-3 font-semibold">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr class="border-t border-black/5">${r.map(c=>`<td class="p-3">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const bars=v=>`<div class="bg-white rounded-2xl border border-black/5 p-4"><p class="font-bold mb-3">Last 7 days</p><div class="flex items-end gap-2 h-32">${v.map((x,i)=>`<div class="flex-1 rounded-t-lg ${i===6?'bg-kate':'bg-ink/15'}" style="height:${x}%"></div>`).join('')}</div></div>`;

const VIEWS={
 admin:()=>`<p class="text-sm text-ink/60 mb-3">Same accounts & ERP core for every business type.</p>`+kpis([['Receivables','₹4.2L'],['Payables','₹2.8L'],['Cash & Bank','₹6.9L'],['GST payable','₹52,300']])+`<div class="mt-4 grid xl:grid-cols-2 gap-4">${bars([45,60,52,78,66,88,72])}<div class="bg-white rounded-2xl border border-black/5 p-4"><p class="font-bold mb-3">Books at a glance</p><div class="flex flex-wrap gap-2">${chips(COMMON.admin.slice(1))}</div></div></div><p class="font-bold mt-5 mb-2">Recent journal entries</p>`+table(['Date','Entry','Account','Amount'],[['29 Sep','Sales – POS batch #4821','Sales Income','₹48,260'],['29 Sep','Supplier payment','Accounts Payable','₹12,400'],['28 Sep','Rent','Rent Expense','₹25,000'],['28 Sep','Bank deposit','Cash → Bank','₹30,000']]),
 owner:()=>`<p class="text-sm text-ink/60 mb-3">Same owner view for every business type.</p>`+kpis([['Revenue (month)','₹9.4L'],['Net profit','₹3.3L'],['Stores','3'],['Staff','18']])+`<div class="mt-4 grid xl:grid-cols-2 gap-4">${bars([50,42,68,74,61,90,80])}<div class="bg-white rounded-2xl border border-black/5 p-4"><p class="font-bold mb-3">Needs your approval</p><ul class="space-y-2 text-sm"><li>Purchase order ₹84,000 <b class="text-kate">Approve</b></li><li>Salary run – September <b class="text-kate">Approve</b></li><li>New store: Banjara Hills <b class="text-kate">Review</b></li></ul><p class="mt-4 text-sm bg-ink text-white rounded-xl p-3">✦ KATE AI: Weekend sales are up 4%. Consider a Monday offer.</p></div></div>`,
 pos:()=>{const d=IND[ind],t=cart.reduce((a,c)=>a+c[1],0);return `<div class="flex items-center gap-2 mb-3"><span class="text-2xl">${d.i}</span><b class="text-lg">${d.n} POS</b></div><div class="grid xl:grid-cols-[1fr_320px] gap-4"><div><p class="text-xs font-bold tracking-widest text-ink/50 mb-2">${d.ex[0].toUpperCase()}</p><div class="flex flex-wrap gap-2 mb-4">${d.ex[1].map((x,i)=>`<button class="px-3 py-1.5 rounded-full text-sm border ${i?'border-black/15 bg-white':'border-kate bg-kate/10 text-kate'}">${x}</button>`).join('')}</div><div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${d.items.map((x,i)=>`<button data-add="${i}" class="card bg-white rounded-2xl border border-black/5 p-4 text-left"><p class="font-semibold text-sm">${x[0]}</p><p class="text-kate font-bold mt-2">${rs(x[1])}</p></button>`).join('')}</div></div><div class="bg-white rounded-2xl border border-black/5 p-4 h-fit"><p class="font-bold mb-3">Current bill</p>${cart.length?cart.map(c=>`<div class="flex justify-between text-sm py-1"><span>${c[0]}</span><span>${rs(c[1])}</span></div>`).join(''):'<p class="text-sm text-ink/50">Tap an item to add it.</p>'}<div class="border-t border-black/10 mt-3 pt-3 flex justify-between font-extrabold"><span>Total</span><span>${rs(t)}</span></div><button id="clr" class="mt-3 w-full bg-ink text-white rounded-full py-3 font-semibold hover:bg-kate transition">Take Payment</button></div></div>`},
 sup:()=>{const d=IND[ind];return `<div class="flex items-center gap-2 mb-3"><span class="text-2xl">${d.i}</span><b class="text-lg">${d.n} Supervisor</b></div>`+kpis(d.kpi)+`<p class="font-bold mt-5 mb-2">Live queue & approvals</p>`+table(['Item','Action','Status'],d.rows.map(r=>[r[0],`<button class="text-kate font-semibold">${r[1]}</button>`,`<span class="px-2 py-1 rounded-full bg-mist text-xs">${r[2]}</span>`]))}
};
function renderApp(){
 h($('#roleTabs'),Object.entries(ROLES).map(([k,v])=>`<button data-r="${k}" role="tab" aria-selected="${k===role}" class="px-3 py-1.5 rounded-full ${k===role?'bg-ink text-white':''}">${v}</button>`).join(''));
 const dom=role==='pos'||role==='sup';
 h($('#indTabs'),dom?Object.entries(IND).map(([k,v])=>`<button data-i="${k}" class="px-3 py-1.5 rounded-full border ${k===ind?'border-kate bg-kate/10 text-kate font-semibold':'border-black/15 bg-white'}">${v.i} ${v.n}</button>`).join(''):'<span class="text-xs text-ink/50 px-2">Common for all business types</span>');
 const nav=dom?['Home',...IND[ind].mods,'Customers','Reports']:COMMON[role];
 h($('#side'),nav.map((n,i)=>`<div class="px-3 py-2 rounded-lg ${i?'text-ink/70':'bg-kate/10 text-kate font-semibold'}">${n}</div>`).join(''));
 h($('#main'),`<div class="fade">${VIEWS[role]()}</div>`);
 document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{role=b.dataset.r;renderApp()});
 document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{ind=b.dataset.i;cart=[];renderApp()});
 document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{cart.push(IND[ind].items[+b.dataset.add]);renderApp()});
 const c=$('#clr');if(c)c.onclick=()=>{cart=[];renderApp()};
}
const app=$('#app');
$('#loginBtn').onclick=()=>{closeLogin();app.classList.remove('hidden');document.body.style.overflow='hidden';renderApp()};
$('#appClose').onclick=()=>{app.classList.add('hidden');document.body.style.overflow=''};
