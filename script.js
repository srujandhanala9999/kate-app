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
const sl=x=>x.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const chips=(a,cls='bg-mist')=>a.map(x=>`<span class="text-sm ${cls} rounded-full px-3 py-1.5">${x}</span>`).join('');

const TYPES=[];Object.entries(CATS).forEach(([k,c])=>c.t.forEach(n=>TYPES.push({k,n,s:sl(n)})));
const lchips=a=>a.map(t=>`<a href="#/type/${t.k}/${t.s}" class="text-sm bg-mist rounded-full px-3 py-1.5 hover:bg-kate/10 hover:text-kate">${t.n}</a>`).join('');
/* ---------- NAV ---------- */
const links=[['Products','#/products'],['Solutions','#/solutions'],['KATE Marketing','#/marketing'],['KATE AI','#/ai'],['Pricing','#/pricing'],['Resources','#/resources']];
h($('#navlinks'),`<button id="btBtn" aria-expanded="false" aria-controls="mega" class="px-3 py-2 rounded-lg hover:bg-mist font-semibold">Business Types ▾</button>`+links.map(l=>`<a href="${l[1]}" class="px-3 py-2 rounded-lg hover:bg-mist">${l[0]}</a>`).join(''));
let active='fb';
function renderMega(){
 const keys=[...Object.keys(CATS),'all'];
 const left=keys.map(k=>`<button data-k="${k}" class="w-full text-left px-4 py-3 rounded-xl font-semibold flex justify-between ${k===active?'bg-kate/10 text-kate':'hover:bg-mist'}">${k==='all'?'All Business Types':CATS[k].n}<span>›</span></button>`).join('');
 let right;
 if(active==='all') right=`<h3 class="text-xl font-extrabold">All Business Types</h3><input id="q" placeholder="Search industries…" aria-label="Search industries" class="mt-3 w-full border border-black/15 rounded-xl px-4 py-2.5"><div id="allGrid" class="mt-4 flex flex-wrap gap-2">${lchips(TYPES)}</div><p class="mt-4 text-sm text-ink/60">Hundreds more categories are supported by the same schema. <a href="#/all" class="text-kate font-semibold">Open full page →</a></p>`;
 else{const c=CATS[active];right=`<div class="grid md:grid-cols-3 gap-8">
  <div><p class="text-xs font-bold tracking-widest text-ink/50">DISCOVER</p><a href="#/category/${active}" class="mt-2 block font-semibold hover:text-kate">Overview</a><a href="#/category/${active}" class="mt-1 block font-semibold hover:text-kate">Why KATE for ${c.n}</a><p class="mt-2 text-sm text-ink/60">${c.d}</p>
  <p class="mt-6 text-xs font-bold tracking-widest text-ink/50">BUSINESS TYPES</p><ul class="mt-2 space-y-1.5 text-sm">${c.t.map(x=>`<li><a href="#/type/${active}/${sl(x)}" class="hover:text-kate">${x}</a></li>`).join('')}</ul></div>
  <div class="md:col-span-2"><p class="text-xs font-bold tracking-widest text-ink/50">CAPABILITIES</p><div class="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">${c.c.map(x=>`<div class="flex gap-2"><span class="text-kate">✓</span>${x}</div>`).join('')}</div></div></div>`}
 h($('#mega'),`<div class="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-[260px_1fr] gap-8"><div role="tablist" class="space-y-1">${left}</div><div class="fade">${right}</div></div>`);
 $('#mega').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{active=b.dataset.k;renderMega()});
 const q=$('#q'); if(q) q.oninput=()=>h($('#allGrid'),lchips(TYPES.filter(t=>t.n.toLowerCase().includes(q.value.toLowerCase()))));
}
const mega=$('#mega'),btn=$('#btBtn');
const setMega=o=>{mega.classList.toggle('hidden',!o);btn.setAttribute('aria-expanded',o);if(o){renderMega();mega.classList.add('fade')}};
btn.onclick=e=>{e.stopPropagation();setMega(mega.classList.contains('hidden'))};
document.addEventListener('click',e=>{if(!e.composedPath().includes(mega))setMega(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMega(false);btn.focus()}});

/* mobile accordion */
const mob=$('#mobile'),bg=$('#burger');
h(mob,`<details class="border-b border-black/5"><summary class="py-3 font-semibold cursor-pointer">Business Types</summary><div class="pb-3 space-y-2">${Object.entries(CATS).map(([k,c])=>`<details class="ml-2"><summary class="py-2 cursor-pointer">${c.i} ${c.n}</summary><ul class="pl-6 pb-2 text-sm space-y-2 text-ink/80"><li><a href="#/category/${k}" class="font-semibold text-kate">Overview</a></li>${c.t.map(t=>`<li><a href="#/type/${k}/${sl(t)}" class="block">${t}</a></li>`).join('')}</ul></details>`).join('')}<a href="#/all" class="ml-2 block py-2 font-semibold">All Business Types</a></div></details>`+links.map(l=>`<a href="${l[1]}" class="block py-3 border-b border-black/5">${l[0]}</a>`).join('')+`<div class="flex gap-3 pt-4"><a href="#" class="flex-1 text-center border border-black/15 rounded-full py-3 font-semibold">Sign In</a><a href="#start" class="flex-1 text-center bg-ink text-white rounded-full py-3 font-semibold">Get Started</a></div>`);
bg.onclick=()=>{const o=mob.classList.toggle('hidden');bg.setAttribute('aria-expanded',!o);bg.textContent=o?'☰':'✕'};

/* ---------- SECTIONS ---------- */
h($('#bars'),[40,65,50,80,60,95,72].map((v,i)=>`<div class="flex-1 rounded-t-lg ${i===5?'bg-kate':'bg-ink/15'}" style="height:${v}%"></div>`).join(''));
h($('#industryCards'),Object.entries(CATS).map(([k,c])=>`<a href="#/category/${k}" class="card block rounded-3xl border border-black/10 p-6 bg-white"><div class="text-3xl">${c.i}</div><h3 class="mt-4 text-xl font-bold">${c.n}</h3><p class="mt-2 text-sm text-ink/70">${c.d}</p><p class="mt-4 text-xs text-ink/50">${c.t.slice(0,3).join(' · ')}</p></a>`).join(''));

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
h($('#productCards'),P.map(p=>`<article class="card rounded-3xl border border-black/10 p-6 bg-white"><div class="w-11 h-11 rounded-2xl bg-kate/10 grid place-items-center text-xl">${p[0]}</div><h3 class="mt-4 font-bold text-lg">${p[1]}</h3><p class="mt-1 text-sm text-ink/70">${p[2]}</p><a href="#/product/${sl(p[1])}" class="mt-4 inline-block text-sm font-semibold text-kate">Learn More →</a></article>`).join(''));

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
const openLogin=e=>{e&&e.preventDefault&&e.preventDefault();if(U){openApp();return}login.classList.remove('hidden');document.body.style.overflow='hidden';setMega(false);mob.classList.add('hidden');setMode('signin')};
const closeLogin=()=>{login.classList.add('hidden');document.body.style.overflow=''};
document.querySelectorAll('a').forEach(a=>{if(a.textContent.trim()==='Sign In')a.onclick=openLogin});
['#loginClose','#loginClose2'].forEach(x=>$(x).addEventListener('click',closeLogin));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLogin()});

/* ---------- REAL APP: accounts, businesses, operations (data saved in this browser) ---------- */
const KEY='kate_db_v1',SES='kate_ses';
let DB={acc:[],biz:{}},U=null,S={mod:'',cart:[],c:{},q:'',flash:'',last:null,camp:null};
try{DB=JSON.parse(localStorage.getItem(KEY))||DB}catch(e){}
try{const sid=localStorage.getItem(SES);U=DB.acc.find(a=>a.uid===sid)||null}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}};
const uid=()=>Math.random().toString(36).slice(2,10);
const rs=n=>'₹'+Math.round(n||0).toLocaleString('en-IN');
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const B=()=>DB.biz[U.biz],CF=()=>BT[B().type];
const paid=()=>B().sales.filter(s=>s.st==='paid');
const sumT=a=>a.reduce((x,s)=>x+s.total,0);
const d0=t=>{const d=new Date(t);d.setHours(0,0,0,0);return d.getTime()};
const fT=t=>new Date(t).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
const fD=t=>new Date(t).toLocaleDateString('en-IN');
const wa=p=>{const d=(p||'').replace(/\D/g,'');return d.length===10?'91'+d:d};
const val=id=>($('#'+id)||{}).value||'';
const flash=m=>{S.flash=m};
async function hp(pw,salt){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+pw));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return btoa(unescape(encodeURIComponent(salt+pw)))}}
const normId=x=>{x=x.trim().toLowerCase();const d=x.replace(/\D/g,'');return !x.includes('@')&&d.length===10?d:x};

/* business type configs: items, sale fields, special modules, marketing templates */
const MKD=['Hi {name}, we miss you at {biz}! Visit us this week and enjoy 10% off.','Hi {name}, thank you for shopping with {biz}. We have new offers just for you!'];
const BT={
 restaurant:{n:'Restaurant / Café',i:'🍽',w:'Menu',mods:['kitchen','wastage','purchases'],
  ex:[['otype','Order type','sel',['Dine-in','Takeaway','Delivery']],['table','Table no.','txt']],
  items:[['Cappuccino','Beverages',180,60],['Cold Brew','Beverages',210,40],['Masala Chai','Beverages',80,80],['Veg Burger','Food',220,30],['Margherita Pizza','Food',350,20],['Pasta Alfredo','Food',320,20],['Butter Croissant','Bakery',120,25],['Brownie','Bakery',140,25]],
  mk:['Hi {name}, we miss you at {biz}! Show this message for 15% off your next order.','Hi {name}, new dishes are live at {biz}. Come and try them this week!']},
 salon:{n:'Salon',i:'✂',w:'Services',mods:['commission'],ex:[['stylist','Stylist','txt'],['appt','Appointment time','time']],
  items:[['Haircut','Hair',400,null],['Hair Colour','Hair',1800,null],['Beard Trim','Grooming',200,null],['Facial','Skin',1200,null],['Manicure','Nails',600,null],['Head Massage','Spa',350,null],['Bridal Package','Packages',9000,null]],
  mk:['Hi {name}, it has been a while! Book your next visit at {biz} and get 15% off any service.','Hi {name}, happy birthday from {biz}! Enjoy a free head massage with any service this month.']},
 clothing:{n:'Clothing Store',i:'👕',w:'Products',mods:['purchases'],ex:[['size','Size / Colour','txt']],
  items:[['T-Shirt','Tops',799,40],['Formal Shirt','Tops',1299,25],['Jeans','Bottoms',1799,30],['Kurta','Ethnic',1499,20],['Jacket','Winter',2999,12],['Belt','Accessories',599,30]],
  mk:['Hi {name}, new arrivals are in at {biz}! Show this message for 10% off your next purchase.','Hi {name}, our season sale has started at {biz}. Visit us this weekend!']},
 grocery:{n:'Grocery / Kirana',i:'🛒',w:'Products',mods:['purchases'],ex:[],
  items:[['Basmati Rice 5kg','Staples',520,40],['Sunflower Oil 1L','Staples',160,50],['Toor Dal 1kg','Staples',150,40],['Sugar 1kg','Staples',48,60],['Tea 250g','Beverages',130,35],['Biscuits','Snacks',30,100],['Milk 500ml','Dairy',30,60],['Detergent 1kg','Household',110,30]],
  mk:['Hi {name}, monthly grocery offers are live at {biz}. Order on WhatsApp for home delivery!','Hi {name}, we have not seen you in a while at {biz}. Enjoy ₹50 off your next bill above ₹500.']},
 battery:{n:'Battery Shop',i:'🔋',w:'Batteries',mods:['warranty','purchases'],ex:[['serial','Battery serial no.','txt'],['warr','Warranty (months)','num'],['exch','Old battery exchange (₹)','num']],
  items:[['Exide Inverter 150Ah','Inverter',14500,8],['Luminous Tubular 200Ah','Inverter',17800,5],['Amaron Car 65Ah','Automotive',6200,10],['Exide Bike 9Ah','Two-wheeler',1900,15],['Inverter Trolley','Accessories',2400,6],['Distilled Water 5L','Accessories',120,40],['Battery Charging','Service',300,null]],
  mk:['Hi {name}, your battery from {biz} may be due for a check. Visit us for a free health test!','Hi {name}, exchange your old battery at {biz} and get the best value on a new one.']},
 repair:{n:'Repair Shop',i:'🔧',w:'Services & Parts',mods:['purchases'],ex:[['device','Device / job no.','txt']],
  items:[['Screen Replacement','Mobile',2500,null],['Battery Replacement','Mobile',1200,null],['Laptop Service','Laptop',900,null],['Charging Port Repair','Mobile',700,null],['Data Recovery','Software',1500,null],['Tempered Glass','Parts',150,50]],
  mk:['Hi {name}, thanks for trusting {biz}. Get 10% off on your next repair or accessory.','Hi {name}, is your device running slow? Book a service at {biz} this week.']}
};
const MODN={dashboard:['📊','Dashboard'],pos:['🧾','POS'],kitchen:['👨‍🍳','Kitchen'],wastage:['🗑','Wastage'],commission:['💈','Commissions'],warranty:['🛡','Warranty'],purchases:['📥','Stock In'],items:['📦','Items'],sales:['💳','Sales'],customers:['👥','Customers'],marketing:['📣','Marketing'],expenses:['🧮','Expenses'],reports:['📈','Reports'],staff:['🧑‍💼','Staff'],settings:['⚙','Settings']};
const ROLE_L={owner:'Owner',accounts:'Accounts',pos:'POS',supervisor:'Supervisor'};
function mods(){const c=CF().mods,r=U.role;
 if(r==='owner')return ['dashboard','pos',...c,'items','sales','customers','marketing','expenses','reports','staff','settings'];
 if(r==='accounts')return ['dashboard','sales','expenses','reports'];
 if(r==='pos')return ['pos',...c.filter(m=>['kitchen','warranty'].includes(m)),'customers'];
 return ['dashboard','items',...c,'sales','customers','reports'];}

/* ui helpers (all user text is escaped with esc) */
const IN='border border-black/15 rounded-xl px-3 py-2 text-sm w-full bg-white';
const kp=a=>`<div class="grid grid-cols-2 xl:grid-cols-4 gap-3">${a.map(k=>`<div class="bg-white rounded-2xl p-4 border border-black/5"><p class="text-xs text-ink/60">${k[0]}</p><p class="text-2xl font-extrabold mt-1">${k[1]}</p></div>`).join('')}</div>`;
const tb=(hd,rows,em)=>rows.length?`<div class="bg-white rounded-2xl border border-black/5 overflow-x-auto"><table class="w-full text-sm"><thead class="text-left text-ink/50"><tr>${hd.map(x=>`<th class="p-3 font-semibold whitespace-nowrap">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr class="border-t border-black/5">${r.map(c=>`<td class="p-3">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:`<div class="bg-white rounded-2xl border border-black/5 p-8 text-center text-sm text-ink/50">${em||'Nothing here yet.'}</div>`;
const bx=(t,b)=>`<div class="bg-white rounded-2xl border border-black/5 p-4">${t?`<p class="font-bold mb-3">${t}</p>`:''}${b}</div>`;
const fi=(id,ph,t)=>`<input id="${id}" type="${t||'text'}" placeholder="${ph}" aria-label="${ph}" class="${IN}">`;
const fv=(id,l,v,t)=>`<label class="text-xs font-semibold text-ink/60">${l}<input id="${id}" type="${t||'text'}" value="${esc(v)}" class="${IN} font-normal"></label>`;
const bt=(act,txt,a,cls)=>`<button data-act="${act}" data-a="${esc(a==null?'':a)}" class="${cls||'bg-ink text-white hover:bg-kate'} rounded-full px-4 py-2 text-sm font-semibold transition whitespace-nowrap">${txt}</button>`;
const sel=(id,opts,cur,x)=>`<select id="${id}" ${x||''} class="${IN}">${opts.map(o=>{const v=Array.isArray(o)?o[0]:o,l=Array.isArray(o)?o[1]:o;return `<option value="${esc(v)}" ${v==cur?'selected':''}>${esc(l)}</option>`}).join('')}</select>`;
const h2=t=>`<h2 class="text-2xl font-extrabold mb-4">${t}</h2>`;
const topItems=ps=>{const m={};ps.forEach(s=>s.items.forEach(i=>{const x=m[i.n]||(m[i.n]={n:i.n,q:0,r:0});x.q+=i.q;x.r+=i.p*i.q}));return Object.values(m).sort((a,b)=>b.r-a.r)};
function tot(){const sub=S.cart.reduce((a,l)=>a+l.p*l.q,0),cp=B().coupons.find(x=>x.on&&x.code===(S.c.coupon||'').trim().toUpperCase()),disc=cp?Math.round(sub*cp.pct/100):0,exch=CF().ex.some(e=>e[0]==='exch')?Math.max(0,Math.min(+S.c.exch||0,sub-disc)):0;return{sub,cp,disc,exch,total:Math.max(0,sub-disc-exch)}}
const receipt=s=>`${B().name}\nReceipt #${s.no}\n${s.items.map(i=>`${i.n} x${i.q} = ${rs(i.p*i.q)}`).join('\n')}\n${s.disc?'Discount: -'+rs(s.disc)+'\n':''}${s.exch?'Exchange: -'+rs(s.exch)+'\n':''}Total: ${rs(s.total)} (${s.pay})\nThank you!`;
function custUpsert(name,phone,total){name=(name||'').trim();phone=(phone||'').replace(/\D/g,'');if(!name&&!phone)return null;
 const b=B();let c=b.customers.find(x=>(phone&&x.phone===phone)||(!phone&&name&&x.name.toLowerCase()===name.toLowerCase()));
 if(!c){c={id:uid(),name:name||'Customer',phone,dob:'',visits:0,spent:0,points:0,last:0};b.customers.push(c)}
 c.visits++;c.spent+=total;c.points+=Math.floor(total/100);c.last=Date.now();return c}
function segs(){const cs=B().customers,now=Date.now(),mth=new Date().getMonth(),st=[...cs].sort((a,b)=>b.spent-a.spent);
 return{all:cs,repeat:cs.filter(c=>c.visits>=2),inactive:cs.filter(c=>c.last&&now-c.last>30*864e5),top:st.slice(0,Math.max(1,Math.ceil(cs.length/4))).filter(c=>c.spent>0),birthday:cs.filter(c=>c.dob&&new Date(c.dob).getMonth()===mth)}}
const SEGL={all:'All customers',repeat:'Repeat customers (2+ visits)',inactive:'Not visited in 30 days',top:'Top spenders',birthday:'Birthdays this month'};

/* views */
const V={
 dashboard(){const b=B(),ps=paid(),t0=d0(Date.now()),m0=new Date(new Date().getFullYear(),new Date().getMonth(),1).getTime();
  const td=ps.filter(s=>s.t>=t0),mo=ps.filter(s=>s.t>=m0),ex=b.expenses.filter(e=>e.t>=m0).reduce((x,e)=>x+e.amt,0);
  const days=[...Array(7)].map((_,i)=>{const t=t0-(6-i)*864e5;return[new Date(t).toLocaleDateString('en-IN',{weekday:'short'}),sumT(ps.filter(s=>s.t>=t&&s.t<t+864e5))]});
  const mx=Math.max(1,...days.map(d=>d[1])),low=b.items.filter(i=>i.stock!=null&&i.stock<=b.low),top=topItems(ps).slice(0,5);
  return h2('Dashboard')+(ps.length?'':`<div class="mb-4 rounded-2xl bg-kate/10 text-kate p-4 text-sm font-semibold">No sales yet. ${mods().includes('pos')?bt('go','Open POS','pos','bg-kate text-white'):'Sales will appear here once the POS team starts billing.'}</div>`)
  +kp([['Today\'s sales',rs(sumT(td))],['Orders today',td.length],['This month',rs(sumT(mo))],['Profit this month',rs(sumT(mo)-ex)]])
  +`<div class="mt-4 grid xl:grid-cols-2 gap-4">`+bx('Last 7 days',`<div class="flex items-end gap-2 h-36">${days.map((d,i)=>`<div class="flex-1 flex flex-col justify-end items-center gap-1 h-full"><div class="w-full rounded-t-lg ${i===6?'bg-kate':'bg-ink/15'}" style="height:${Math.max(3,d[1]/mx*100)}%" title="${rs(d[1])}"></div><span class="text-[10px] text-ink/50">${d[0]}</span></div>`).join('')}</div>`)
  +bx('Top items',top.length?tb(['Item','Qty','Sales'],top.map(x=>[esc(x.n),x.q,rs(x.r)])):'<p class="text-sm text-ink/50">Top sellers will show here.</p>')+`</div>`
  +(low.length?`<div class="mt-4">`+bx('Low stock ('+low.length+')',`<div class="flex flex-wrap gap-2">${low.map(i=>`<span class="text-sm bg-red-50 text-red-700 rounded-full px-3 py-1">${esc(i.n)}: ${i.stock} left</span>`).join('')}</div>`)+`</div>`:'')},
 pos(){const b=B(),c=CF(),T=tot(),q=(S.q||'').toLowerCase();
  const last=S.last?`<div class="mb-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm p-3">Sale #${S.last.no} recorded · ${rs(S.last.total)} ${S.last.cust&&S.last.cust.ph?`· <a class="font-semibold underline" target="_blank" rel="noopener" href="https://wa.me/${wa(S.last.cust.ph)}?text=${encodeURIComponent(receipt(S.last))}">Send receipt on WhatsApp</a>`:''}</div>`:'';
  const grid=b.items.map(i=>{const out=i.stock===0,nm=(i.n+' '+i.cat).toLowerCase();return `<button data-act="add" data-a="${i.id}" data-nm="${esc(nm)}" ${out?'disabled':''} class="card bg-white rounded-2xl border border-black/5 p-4 text-left ${out?'opacity-40':''} ${nm.includes(q)?'':'hidden'}"><p class="font-semibold text-sm">${esc(i.n)}</p><p class="text-xs text-ink/50">${esc(i.cat)}${i.stock!=null?' · '+i.stock+' left':''}</p><p class="text-kate font-bold mt-2">${rs(i.p)}</p></button>`}).join('');
  const exf=c.ex.map(([k,l,t,o])=>`<label class="block text-xs font-semibold text-ink/60">${l}${t==='sel'?`<select data-c="${k}" class="${IN} font-normal">${o.map(x=>`<option ${S.c[k]===x?'selected':''}>${x}</option>`).join('')}</select>`:`<input data-c="${k}" ${t==='num'?'data-re type="number" min="0"':t==='time'?'type="time"':'type="text"'} value="${esc(S.c[k]||'')}" class="${IN} font-normal">`}</label>`).join('');
  const cart=S.cart.length?S.cart.map(l=>`<div class="flex items-center justify-between text-sm py-1 gap-2"><span class="flex-1">${esc(l.n)}</span><span class="flex items-center gap-1"><button data-act="qty" data-a="${l.id}:-1" class="w-6 h-6 rounded-full bg-mist" aria-label="Less">−</button>${l.q}<button data-act="qty" data-a="${l.id}:1" class="w-6 h-6 rounded-full bg-mist" aria-label="More">+</button></span><span class="w-20 text-right">${rs(l.p*l.q)}</span></div>`).join(''):'<p class="text-sm text-ink/50">Tap an item to add it.</p>';
  return h2(c.i+' '+c.n+' POS')+last+`<div class="grid xl:grid-cols-[1fr_340px] gap-4"><div><input id="pq" value="${esc(S.q||'')}" placeholder="Search ${c.w.toLowerCase()}…" aria-label="Search items" class="${IN} mb-3"><div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${grid||'<p class="text-sm text-ink/50">No items yet. Add some in Items.</p>'}</div></div>`
  +bx('Current bill',`<div class="space-y-2 mb-3">${exf}</div>${cart}<div class="mt-3 pt-3 border-t border-black/10 space-y-2"><div class="grid grid-cols-2 gap-2"><input data-c="cn" value="${esc(S.c.cn||'')}" placeholder="Customer name" aria-label="Customer name" class="${IN}"><input data-c="cp" value="${esc(S.c.cp||'')}" placeholder="Mobile" aria-label="Customer mobile" class="${IN}"></div><div class="grid grid-cols-2 gap-2"><input data-c="coupon" data-re value="${esc(S.c.coupon||'')}" placeholder="Coupon code" aria-label="Coupon" class="${IN}"><select data-c="pay" class="${IN}">${['Cash','UPI','Card'].map(x=>`<option ${S.c.pay===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
  <div class="mt-3 text-sm space-y-1"><div class="flex justify-between"><span>Subtotal</span><span>${rs(T.sub)}</span></div>${T.disc?`<div class="flex justify-between text-green-700"><span>Coupon ${esc(T.cp.code)}</span><span>−${rs(T.disc)}</span></div>`:''}${T.exch?`<div class="flex justify-between text-green-700"><span>Old battery exchange</span><span>−${rs(T.exch)}</span></div>`:''}<div class="flex justify-between font-extrabold text-lg pt-1"><span>Total</span><span>${rs(T.total)}</span></div></div><div class="mt-3 flex gap-2">${bt('pay','Take Payment','','bg-kate text-white hover:bg-ink flex-1')}${bt('clear','Clear','','border border-black/15')}</div>`)+`</div>`},
 items(){const b=B(),c=CF();return h2(c.w)+bx('Add new',`<div class="grid sm:grid-cols-5 gap-2">${fi('iN','Name')}${fi('iC','Category')}${fi('iP','Price ₹','number')}${fi('iS','Stock (blank = not tracked)','number')}${bt('itemAdd','Add')}</div>`)+`<div class="mt-4">`+tb(['Name','Category','Price ₹','Stock',''],b.items.map(i=>[esc(i.n),esc(i.cat),`<input data-edit="p" data-id="${i.id}" type="number" value="${i.p}" aria-label="Price" class="${IN} w-24">`,`<input data-edit="s" data-id="${i.id}" type="number" value="${i.stock==null?'':i.stock}" placeholder="—" aria-label="Stock" class="${IN} w-24">`,bt('itemDel','Delete',i.id,'text-red-600 border border-red-200')]),'No items yet.')+`</div>`},
 sales(){const b=B(),cr=['owner','supervisor'].includes(U.role);return h2('Sales')+tb(['#','When','Items','Customer','Payment','Total','Status',''],b.sales.slice(0,100).map(s=>[s.no,fT(s.t),esc(s.items.map(i=>i.n+' ×'+i.q).join(', '))+(Object.keys(s.ex||{}).length?`<br><span class="text-xs text-ink/50">${esc(Object.values(s.ex).join(' · '))}</span>`:''),esc(s.cust?s.cust.n:'—'),s.pay,rs(s.total),s.st==='paid'?'Paid':'<span class="text-red-600">Refunded</span>',cr&&s.st==='paid'?bt('refund','Refund',s.id,'border border-black/15'):'']),'No sales recorded yet.')},
 customers(){const b=B();return h2('Customers')+bx('Add customer',`<div class="grid sm:grid-cols-4 gap-2">${fi('uN','Name')}${fi('uP','Mobile')}${fi('uD','Birthday','date')}${bt('custAdd','Add')}</div>`)+`<div class="mt-4">`+tb(['Name','Mobile','Visits','Spent','Points','Last visit'],[...b.customers].sort((a,c)=>c.last-a.last).map(c=>[esc(c.name),esc(c.phone||'—'),c.visits,rs(c.spent),c.points,c.last?fD(c.last):'—']),'Customers are added automatically when you enter a name or mobile at billing.')+`</div>`},
 expenses(){const b=B(),m0=new Date(new Date().getFullYear(),new Date().getMonth(),1).getTime();return h2('Expenses')+kp([['This month',rs(b.expenses.filter(e=>e.t>=m0).reduce((a,e)=>a+e.amt,0))],['All time',rs(b.expenses.reduce((a,e)=>a+e.amt,0))]])+`<div class="mt-4">`+bx('Add expense',`<div class="grid sm:grid-cols-4 gap-2">${sel('eC',['Rent','Salaries','Supplies','Utilities','Marketing','Purchases','Other'])}${fi('eA','Amount ₹','number')}${fi('eN','Note')}${bt('expAdd','Add')}</div>`)+`</div><div class="mt-4">`+tb(['Date','Category','Note','Amount',''],b.expenses.slice(0,100).map(e=>[fD(e.t),esc(e.cat),esc(e.note),rs(e.amt),bt('expDel','Delete',e.id,'text-red-600 border border-red-200')]),'No expenses yet.')+`</div>`},
 marketing(){const b=B(),sg=segs(),seg=S.c.seg||'all',ch=S.c.ch||'WhatsApp',tp=CF().mk||MKD,msg=S.c.msg!==undefined?S.c.msg:tp[0];
  const camp=S.camp?`<div class="mt-4">`+bx('Ready to send: '+esc(SEGL[S.camp.seg])+' · '+S.camp.ch,tb(['Customer','Mobile','Message'],S.camp.list.map(r=>[esc(r.n),esc(r.ph),`<a target="_blank" rel="noopener" class="text-kate font-semibold" href="${S.camp.ch==='WhatsApp'?'https://wa.me/'+wa(r.ph)+'?text=':'sms:'+esc(r.ph)+'?body='}${encodeURIComponent(r.m)}">Send ${S.camp.ch} →</a>`])))+`</div>`:'';
  return h2('Marketing')+kp(Object.keys(SEGL).map(k=>[SEGL[k],sg[k].length]))+`<div class="mt-4 grid xl:grid-cols-2 gap-4">`+bx('Create a campaign',`<div class="grid grid-cols-2 gap-2 mb-2">${sel('mSeg',Object.keys(SEGL).map(k=>[k,SEGL[k]]),seg,'data-c="seg" data-re')}${sel('mCh',['WhatsApp','SMS'],ch,'data-c="ch" data-re')}</div><textarea data-c="msg" rows="4" aria-label="Message" class="${IN}">${esc(msg)}</textarea><p class="text-xs text-ink/50 mt-1">Use {name} and {biz}. Templates:</p><div class="flex flex-wrap gap-2 my-2">${tp.map((t,i)=>bt('tpl','Template '+(i+1),i,'border border-black/15')).join('')}</div>${bt('prep','Prepare campaign')}`)
  +bx('Coupons',`<div class="grid grid-cols-3 gap-2 mb-3">${fi('cC','Code e.g. WELCOME10')}${fi('cP','Discount %','number')}${bt('cpAdd','Create')}</div>`+tb(['Code','Off','Status',''],b.coupons.map(c=>[esc(c.code),c.pct+'%',c.on?'Active':'Off',bt('cpTog',c.on?'Turn off':'Turn on',c.id,'border border-black/15')+' '+bt('cpDel','Delete',c.id,'text-red-600 border border-red-200')]),'No coupons yet. Customers can use them at POS.'))+`</div>`+camp
  +`<div class="mt-4">`+bx('Past campaigns',tb(['When','Segment','Channel','Recipients'],b.campaigns.slice(0,20).map(c=>[fT(c.t),esc(SEGL[c.seg]),c.ch,c.n]),'No campaigns yet.'))+`</div>`},
 reports(){const b=B(),r=S.c.rng||'7',lim=r==='all'?0:d0(Date.now())-(+r-1)*864e5,ps=paid().filter(s=>s.t>=lim),ex=b.expenses.filter(e=>e.t>=lim).reduce((a,e)=>a+e.amt,0),t=sumT(ps),by={};ps.forEach(s=>by[s.pay]=(by[s.pay]||0)+s.total);
  return h2('Reports')+`<div class="max-w-xs mb-4">${sel('rRng',[['1','Today'],['7','Last 7 days'],['30','Last 30 days'],['all','All time']],r,'data-c="rng" data-re')}</div>`+kp([['Sales',rs(t)],['Orders',ps.length],['Average bill',rs(ps.length?t/ps.length:0)],['Profit (sales − expenses)',rs(t-ex)]])+`<div class="mt-4 grid xl:grid-cols-2 gap-4"><div><p class="font-bold mb-2">By payment mode</p>${tb(['Mode','Amount'],Object.entries(by).map(([k,v])=>[k,rs(v)]),'No sales in this period.')}</div><div><p class="font-bold mb-2">Top items</p>${tb(['Item','Qty','Sales'],topItems(ps).slice(0,10).map(x=>[esc(x.n),x.q,rs(x.r)]),'No sales in this period.')}</div></div>`},
 staff(){const l=DB.acc.filter(a=>a.biz===U.biz);return h2('Staff & logins')+bx('Add a staff login',`<div class="grid sm:grid-cols-5 gap-2">${fi('tN','Name')}${fi('tI','Login (email / mobile / username)')}${fi('tP','Password (min 6)','password')}${sel('tR',[['pos','POS'],['supervisor','Supervisor'],['accounts','Accounts']])}${bt('staffAdd','Add')}</div>`)+`<div class="mt-4">`+tb(['Name','Login','Role',''],l.map(a=>[esc(a.name),esc(a.id),ROLE_L[a.role],a.role==='owner'?'':bt('staffDel','Remove',a.uid,'text-red-600 border border-red-200')]))+`</div>`},
 settings(){const b=B();return h2('Settings')+bx('Business',`<div class="grid sm:grid-cols-3 gap-3">${fv('sN','Business name',b.name)}${fv('sL','Low-stock alert at (units)',b.low,'number')}${b.type==='salon'?fv('sC','Staff commission %',b.comm,'number'):''}</div><div class="mt-3">${bt('setSave','Save')}</div>`)+`<div class="mt-4">`+bx('Danger zone',`<p class="text-sm text-ink/60 mb-3">Delete all sales, customers, expenses and campaigns for this business. Items stay.</p>${bt('reset',S.rc?'Click again to confirm':'Delete business data','','text-red-600 border border-red-200')}`)+`</div>`},
 kitchen(){const q=B().sales.filter(s=>s.st==='paid'&&s.k&&s.k!=='Served').reverse(),nx={New:'Preparing',Preparing:'Ready',Ready:'Served'};return h2('Kitchen orders')+(q.length?`<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">${q.map(s=>bx('#'+s.no+' · '+esc((s.ex.otype||'')+(s.ex.table?' · Table '+s.ex.table:'')),`<ul class="text-sm mb-3">${s.items.map(i=>`<li>${i.q} × ${esc(i.n)}</li>`).join('')}</ul><div class="flex justify-between items-center"><span class="text-xs bg-mist rounded-full px-2 py-1">${s.k}</span>${bt('kstep','Mark '+nx[s.k],s.id)}</div>`)).join('')}</div>`:tb([],[],'No pending kitchen orders.'))},
 wastage(){const b=B(),tr=b.items.filter(i=>i.stock!=null);return h2('Wastage')+bx('Log wastage',`<div class="grid sm:grid-cols-4 gap-2">${sel('wI',tr.map(i=>[i.id,i.n]))}${fi('wQ','Quantity','number')}${sel('wR',['Spoiled','Expired','Dropped','Other'])}${bt('wasteAdd','Log')}</div>`)+`<div class="mt-4">`+tb(['When','Item','Qty','Reason','Value'],b.waste.slice(0,100).map(w=>[fT(w.t),esc(w.n),w.q,w.r,rs(w.v)]),'No wastage logged.')+`</div>`},
 purchases(){const b=B(),tr=b.items.filter(i=>i.stock!=null);return h2('Stock in / purchases')+bx('Receive stock',`<div class="grid sm:grid-cols-5 gap-2">${sel('pI',tr.map(i=>[i.id,i.n]))}${fi('pQ','Quantity','number')}${fi('pS','Supplier')}${fi('pC','Total cost ₹','number')}${bt('purAdd','Add stock')}</div>`)+`<div class="mt-4">`+tb(['When','Item','Qty','Supplier','Cost'],b.purch.slice(0,100).map(p=>[fT(p.t),esc(p.n),p.q,esc(p.s),rs(p.c)]),'No purchases yet.')+`</div>`},
 commission(){const b=B(),m={};paid().forEach(s=>{const k=((s.ex&&s.ex.stylist)||'Unassigned').trim()||'Unassigned',x=m[k]||(m[k]={n:k,c:0,r:0});x.c++;x.r+=s.total});return h2('Staff commissions')+`<p class="text-sm text-ink/60 mb-3">Rate: ${b.comm}% (change in Settings)</p>`+tb(['Stylist','Bills','Revenue','Commission'],Object.values(m).map(x=>[esc(x.n),x.c,rs(x.r),rs(x.r*b.comm/100)]),'No sales with a stylist name yet.')},
 warranty(){const q=(S.c.wq||'').toLowerCase(),now=Date.now();const rows=paid().filter(s=>s.ex&&s.ex.serial).filter(s=>!q||(s.ex.serial+' '+(s.cust?s.cust.n+s.cust.ph:'')).toLowerCase().includes(q)).map(s=>{const m=+s.ex.warr||0,e=new Date(s.t);e.setMonth(e.getMonth()+m);return[esc(s.ex.serial),esc(s.items.map(i=>i.n).join(', ')),esc(s.cust?s.cust.n+' '+s.cust.ph:'—'),fD(s.t),m+' mo · '+fD(e),e.getTime()>now?'<span class="text-green-700">In warranty</span>':'<span class="text-red-600">Expired</span>']});return h2('Warranty lookup')+`<input data-c="wq" data-re value="${esc(S.c.wq||'')}" placeholder="Search serial no. or customer, then press Enter" aria-label="Search warranty" class="${IN} max-w-md mb-4">`+tb(['Serial','Battery','Customer','Sold on','Warranty till','Status'],rows,'No batteries with a serial number sold yet. Enter the serial at POS.')}
};

/* actions */
const nx={New:'Preparing',Preparing:'Ready',Ready:'Served'};
const ACT={
 go(a){S.mod=a;render();window.scrollTo(0,0)},
 add(id){const it=B().items.find(i=>i.id===id);if(!it)return;const l=S.cart.find(x=>x.id===id);if(it.stock!=null&&(l?l.q:0)>=it.stock){flash('Only '+it.stock+' in stock');return render()}l?l.q++:S.cart.push({id,n:it.n,p:it.p,q:1});render()},
 qty(a){const[id,d]=a.split(':'),l=S.cart.find(x=>x.id===id),it=B().items.find(i=>i.id===id);if(!l)return;if(+d>0&&it&&it.stock!=null&&l.q>=it.stock){flash('Only '+it.stock+' in stock');return render()}l.q+=+d;if(l.q<=0)S.cart=S.cart.filter(x=>x!==l);render()},
 clear(){S.cart=[];S.c={};render()},
 pay(){const b=B(),T=tot();if(!S.cart.length){flash('Add items to the bill first.');return render()}
  S.cart.forEach(l=>{const it=b.items.find(i=>i.id===l.id);if(it&&it.stock!=null)it.stock=Math.max(0,it.stock-l.q)});
  const ex={};CF().ex.forEach(([k,l,t,o])=>{const v=(S.c[k]!==undefined&&S.c[k]!=='')?S.c[k]:(t==='sel'?o[0]:'');if(v!=='')ex[k]=v});
  const cu=custUpsert(S.c.cn,S.c.cp,T.total);
  const sale={id:uid(),no:++b.seq,t:Date.now(),items:S.cart.map(l=>({n:l.n,q:l.q,p:l.p})),sub:T.sub,disc:T.disc,exch:T.exch,total:T.total,pay:S.c.pay||'Cash',cust:cu?{n:cu.name,ph:cu.phone}:null,ex,st:'paid',k:b.type==='restaurant'?'New':'',by:U.name};
  b.sales.unshift(sale);save();S.last=sale;S.cart=[];S.c={};render()},
 itemAdd(){const n=val('iN').trim(),p=+val('iP');if(!n||!(p>=0)||val('iP')===''){flash('Enter a name and price.');return render()}const s=val('iS');B().items.push({id:uid(),n,cat:val('iC').trim()||'General',p,stock:s===''?null:Math.max(0,+s)});save();flash('Item added.');render()},
 itemDel(id){B().items=B().items.filter(i=>i.id!==id);save();render()},
 edit(t){const it=B().items.find(i=>i.id===t.dataset.id);if(!it)return;if(t.dataset.edit==='p')it.p=Math.max(0,+t.value||0);else it.stock=t.value===''?null:Math.max(0,+t.value||0);save()},
 refund(id){const b=B(),s=b.sales.find(x=>x.id===id);if(!s||s.st!=='paid')return;s.st='refunded';s.items.forEach(l=>{const it=b.items.find(i=>i.n===l.n);if(it&&it.stock!=null)it.stock+=l.q});if(s.cust){const c=b.customers.find(x=>(s.cust.ph&&x.phone===s.cust.ph)||x.name===s.cust.n);if(c){c.spent=Math.max(0,c.spent-s.total);c.visits=Math.max(0,c.visits-1);c.points=Math.max(0,c.points-Math.floor(s.total/100))}}save();flash('Sale #'+s.no+' refunded and stock restored.');render()},
 custAdd(){const n=val('uN').trim(),p=val('uP').replace(/\D/g,'');if(!n){flash('Enter a name.');return render()}if(p&&B().customers.some(c=>c.phone===p)){flash('That mobile number already exists.');return render()}B().customers.push({id:uid(),name:n,phone:p,dob:val('uD'),visits:0,spent:0,points:0,last:0});save();render()},
 expAdd(){const a=+val('eA');if(!(a>0)){flash('Enter an amount.');return render()}B().expenses.unshift({id:uid(),t:Date.now(),cat:val('eC'),amt:a,note:val('eN').trim()});save();render()},
 expDel(id){B().expenses=B().expenses.filter(e=>e.id!==id);save();render()},
 cpAdd(){const c=val('cC').trim().toUpperCase().replace(/\s/g,''),p=+val('cP');if(!c||!(p>0&&p<=100)){flash('Enter a code and a discount between 1 and 100.');return render()}if(B().coupons.some(x=>x.code===c)){flash('Code already exists.');return render()}B().coupons.push({id:uid(),code:c,pct:p,on:true});save();render()},
 cpTog(id){const c=B().coupons.find(x=>x.id===id);c.on=!c.on;save();render()},
 cpDel(id){B().coupons=B().coupons.filter(x=>x.id!==id);save();render()},
 tpl(i){S.c.msg=(CF().mk||MKD)[+i];render()},
 prep(){const b=B(),seg=S.c.seg||'all',ch=S.c.ch||'WhatsApp',msg=S.c.msg!==undefined?S.c.msg:(CF().mk||MKD)[0],list=segs()[seg].filter(c=>c.phone);
  if(!list.length){flash('No customers with mobile numbers in this segment yet. They are added when you enter a mobile at billing.');S.camp=null;return render()}
  S.camp={seg,ch,list:list.map(c=>({n:c.name,ph:c.phone,m:msg.replace(/\{name\}/g,c.name).replace(/\{biz\}/g,b.name)}))};b.campaigns.unshift({id:uid(),t:Date.now(),seg,ch,n:list.length});save();render()},
 kstep(id){const s=B().sales.find(x=>x.id===id);if(s&&nx[s.k])s.k=nx[s.k];save();render()},
 wasteAdd(){const b=B(),it=b.items.find(i=>i.id===val('wI')),q=+val('wQ');if(!it||!(q>0)){flash('Choose an item and quantity.');return render()}it.stock=Math.max(0,it.stock-q);b.waste.unshift({id:uid(),t:Date.now(),n:it.n,q,r:val('wR'),v:q*it.p});save();render()},
 purAdd(){const b=B(),it=b.items.find(i=>i.id===val('pI')),q=+val('pQ'),c=+val('pC')||0;if(!it||!(q>0)){flash('Choose an item and quantity.');return render()}it.stock+=q;b.purch.unshift({id:uid(),t:Date.now(),n:it.n,q,s:val('pS').trim()||'—',c});if(c>0)b.expenses.unshift({id:uid(),t:Date.now(),cat:'Purchases',amt:c,note:it.n+' ×'+q+' from '+(val('pS').trim()||'supplier')});save();flash('Stock updated.');render()},
 async staffAdd(){const n=val('tN').trim(),id=normId(val('tI')),pw=val('tP');if(!n||!id||pw.length<6){flash('Enter name, login and a password of at least 6 characters.');return render()}if(DB.acc.some(a=>a.id===id)){flash('That login is already used.');return render()}const salt=uid();DB.acc.push({uid:uid(),id,name:n,salt,ph:await hp(pw,salt),biz:U.biz,role:val('tR')});save();flash('Staff login created. Share the login and password with them.');render()},
 staffDel(id){DB.acc=DB.acc.filter(a=>a.uid!==id||a.role==='owner');save();render()},
 setSave(){const b=B();b.name=val('sN').trim()||b.name;b.low=Math.max(0,+val('sL')||0);if($('#sC'))b.comm=Math.min(100,Math.max(0,+val('sC')||0));save();flash('Saved.');render()},
 reset(){if(!S.rc){S.rc=true;return render()}const b=B();b.sales=[];b.customers=[];b.expenses=[];b.campaigns=[];b.waste=[];b.purch=[];b.seq=0;S.rc=false;S.last=null;save();flash('Business data deleted.');render()}
};

/* render + events */
const app=$('#app');
function render(){const m=mods();if(!m.includes(S.mod))S.mod=m[0];const c=CF(),fl=S.flash;S.flash='';
 $('#appBiz').textContent=c.i+' '+B().name;$('#who').textContent=U.name+' · '+ROLE_L[U.role];
 h($('#side'),m.map(k=>`<button data-act="go" data-a="${k}" class="whitespace-nowrap text-left px-3 py-2 rounded-lg lg:w-full lg:block ${k===S.mod?'bg-kate/10 text-kate font-semibold':'text-ink/70 hover:bg-mist'}">${MODN[k][0]} ${k==='items'?c.w:MODN[k][1]}</button>`).join(''));
 h($('#main'),`<div class="fade">${fl?`<div role="status" class="mb-3 rounded-xl bg-ink text-white text-sm p-3">${esc(fl)}</div>`:''}${V[S.mod]()}</div>`)}
app.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t&&ACT[t.dataset.act])ACT[t.dataset.act](t.dataset.a,t)});
app.addEventListener('input',e=>{const t=e.target;if(t.dataset.c!==undefined)S.c[t.dataset.c]=t.value;if(t.id==='pq'){S.q=t.value;document.querySelectorAll('[data-nm]').forEach(b=>b.classList.toggle('hidden',!b.dataset.nm.includes(t.value.toLowerCase())))}});
app.addEventListener('change',e=>{const t=e.target;if(t.dataset.edit)ACT.edit(t);else if(t.dataset.re!==undefined){S.c[t.dataset.c]=t.value;render()}});
function openApp(){S={mod:'',cart:[],c:{},q:'',flash:'',last:null,camp:null};app.classList.remove('hidden');document.body.style.overflow='hidden';render()}
function signOut(){U=null;try{localStorage.removeItem(SES)}catch(e){}app.classList.add('hidden');document.body.style.overflow=''}
$('#appClose').onclick=signOut;
$('#appHome').onclick=()=>{app.classList.add('hidden');document.body.style.overflow=''};

/* auth: sign in / create account */
function enter(a){U=a;try{localStorage.setItem(SES,a.uid)}catch(e){}closeLogin();openApp()}
const aerr=m=>{const e=$('#aErr');e.textContent=m;e.classList.remove('hidden')};
async function doSignIn(){const id=normId(val('aId')),a=DB.acc.find(x=>x.id===id);
 if(!a||a.ph!==await hp(val('aPw'),a.salt))return aerr('Wrong login or password. New here? Create an account.');enter(a)}
async function doSignUp(){const type=val('sType'),bn=val('sBiz').trim(),nm=val('sName').trim(),id=normId(val('sId')),pw=val('sPw');
 if(!bn||!nm||!id||pw.length<6)return aerr('Please fill every field. Password needs at least 6 characters.');
 if(!(id.includes('@')||/^\d{10}$/.test(id)))return aerr('Enter a valid email or a 10-digit mobile number.');
 if(DB.acc.some(a=>a.id===id))return aerr('This email or mobile is already registered. Please sign in.');
 const bid=uid(),salt=uid();
 DB.biz[bid]={name:bn,type,seq:0,low:5,comm:30,items:BT[type].items.map(x=>({id:uid(),n:x[0],cat:x[1],p:x[2],stock:x[3]})),sales:[],customers:[],expenses:[],coupons:[],campaigns:[],waste:[],purch:[]};
 const a={uid:uid(),id,name:nm,salt,ph:await hp(pw,salt),biz:bid,role:'owner'};DB.acc.push(a);save();enter(a)}
function setMode(m){const su=m==='signup',f=(id,ph,t)=>`<input id="${id}" type="${t||'text'}" placeholder="${ph}" aria-label="${ph}" class="w-full border border-black/15 rounded-xl px-4 py-3">`;
 h($('#authBox'),su?`<h2 class="text-3xl font-extrabold tracking-tight">Create your KATE account</h2><p class="mt-2 text-ink/70">KATE sets up the right tools for your business.</p><div class="mt-6 space-y-3"><label class="block text-sm font-semibold">What type of business do you operate?<select id="sType" class="mt-1.5 w-full border border-black/15 rounded-xl px-4 py-3 font-normal bg-white">${Object.entries(BT).map(([k,v])=>`<option value="${k}">${v.i} ${v.n}</option>`).join('')}</select></label>${f('sBiz','Business name')}${f('sName','Your name')}${f('sId','Email or 10-digit mobile')}${f('sPw','Password (min 6 characters)','password')}<p id="aErr" class="hidden text-sm text-red-600" role="alert"></p><button type="button" id="aGo" class="w-full bg-ink text-white font-semibold py-3.5 rounded-full hover:bg-kate transition">Create account</button></div><p class="mt-5 text-sm text-ink/70">Already have an account? <button type="button" data-m="signin" class="text-kate font-semibold">Sign in</button></p>`
 :`<h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome back.</h2><p class="mt-2 text-ink/70">Sign in to run your business from one place.</p><div class="mt-6 space-y-3">${f('aId','Email, mobile or username')}${f('aPw','Password','password')}<p id="aErr" class="hidden text-sm text-red-600" role="alert"></p><button type="button" id="aGo" class="w-full bg-ink text-white font-semibold py-3.5 rounded-full hover:bg-kate transition">Sign In</button></div><p class="mt-5 text-sm text-ink/70">New to KATE? <button type="button" data-m="signup" class="text-kate font-semibold">Create an account</button></p>`)
 +'<p class="mt-6 text-xs text-ink/50">Prototype note: accounts and business data are saved in this browser only. A server database is needed for multi-device use.</p>';
 $('#aGo').onclick=su?doSignUp:doSignIn;
 $('#authBox').querySelectorAll('input').forEach(i=>i.addEventListener('keydown',e=>{if(e.key==='Enter')(su?doSignUp:doSignIn)()}));
 $('#authBox').querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>setMode(b.dataset.m))}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a');if(a&&a.textContent.trim()==='Get Started'){e.preventDefault();if(U){openApp();return}openLogin();setMode('signup')}});

/* ---------- PAGES / ROUTER ---------- */
const PF={'kate-pos':['Bill on desktop, tablet or mobile','Screens shaped by your business: tables, stylists, barcodes, serial numbers','UPI, cards and cash','Receipts by print, WhatsApp or SMS'],
 'kate-business':['Orders, staff and expenses in one dashboard','Accounts and GST-ready reports','Owner and supervisor approvals','Multi-store view'],
 'kate-inventory':['Barcode, SKU and variants','Purchase orders and suppliers','Ingredient and recipe tracking','Low-stock alerts'],
 'kate-payments':['UPI, cards and cash reconciled','Daily settlement reports','Refunds and split bills','Payment links'],
 'kate-marketing':['Segments built from POS data','WhatsApp, SMS and email','Coupons and loyalty','Win-back campaigns'],
 'kate-ai':['Ask questions in plain language','Reorder and pricing suggestions','Campaign drafts','Daily business summary'],
 'kate-website':['Website generated from your catalog','Online ordering and appointments','Prices sync automatically','Gallery, reviews, hours and location']};
const RES=[['📘','Guides','Step-by-step setup guides for each business type.'],['❓','Help Centre','Answers to common questions about billing and stock.'],['📝','Blog','Ideas for running and growing a small business.'],['🎥','Webinars','Live walkthroughs of KATE for your industry.'],['🆕','What’s New','Product updates and releases.'],['🤝','Partners','Accountants and consultants who work with KATE.']];
const grid=(a,c='sm:grid-cols-2 lg:grid-cols-3')=>`<div class="grid ${c} gap-5">${a.join('')}</div>`;
const cardA=(href,ico,t,d)=>`<a href="${href}" class="card block rounded-3xl border border-black/10 bg-white p-6"><div class="text-3xl">${ico}</div><h3 class="mt-3 font-bold text-lg">${t}</h3><p class="mt-1 text-sm text-ink/70">${d}</p><span class="mt-3 inline-block text-sm font-semibold text-kate">Open →</span></a>`;
const sec=(t,b)=>`<h2 class="text-2xl font-extrabold mt-12 mb-5 first:mt-0">${t}</h2>${b}`;
const caps=a=>`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">${a.map(x=>`<div class="flex gap-2 bg-mist rounded-xl p-3"><span class="text-kate">✓</span>${x}</div>`).join('')}</div>`;
const crumbs=a=>`<a href="#" class="hover:text-kate">Home</a>`+a.map(x=>` / ${x[1]?`<a href="${x[1]}" class="hover:text-kate">${x[0]}</a>`:x[0]}`).join('');
function shell(cr,kick,title,sub,body){
 document.title=title+' — KATE';
 return `<section class="bg-mist"><div class="max-w-7xl mx-auto px-5 py-14"><p class="text-sm text-ink/60">${crumbs(cr)}</p><p class="mt-5 text-kate font-bold text-xs tracking-widest">${kick}</p><h1 class="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">${title}</h1><p class="mt-4 text-lg text-ink/70 max-w-2xl">${sub}</p><div class="mt-7 flex flex-wrap gap-3"><a href="#start" class="bg-kate text-white font-semibold px-6 py-3 rounded-full hover:bg-ink transition">Get Started</a><a href="#" data-signin class="border border-ink/20 font-semibold px-6 py-3 rounded-full hover:bg-white transition">Sign In</a></div></div></section><div class="max-w-7xl mx-auto px-5 py-14">${body}</div><section class="bg-ink text-white"><div class="max-w-7xl mx-auto px-5 py-14 flex flex-wrap items-center justify-between gap-4"><h2 class="text-2xl font-extrabold">Ready to run your business on KATE?</h2><a href="#start" class="bg-kate font-semibold px-6 py-3 rounded-full">Get Started</a></div></section>`;
}
function build(hsh){
 const [r,a,b]=hsh.slice(2).split('/');
 if(r==='category'&&CATS[a]){const c=CATS[a];
  return shell([[c.n]],'BUSINESS TYPES',c.n,c.d,sec('Business types',grid(c.t.map(t=>cardA(`#/type/${a}/${sl(t)}`,c.i,t,`KATE set up for ${t.toLowerCase()}.`))))+sec('Capabilities',caps(c.c)))}
 if(r==='type'&&CATS[a]){const c=CATS[a],t=c.t.find(x=>sl(x)===b);if(t){
  return shell([[c.n,'#/category/'+a],[t]],c.n.toUpperCase(),'KATE for '+t,`Tell KATE you run ${t.toLowerCase()} and it switches on the tools that matter, with nothing extra to set up.`,
   sec('How it works',grid([['1','Choose your business type',`Select “${t}” when you sign up.`],['2','KATE configures itself','Menus, screens and reports are enabled automatically.'],['3','Start selling','Bill, track stock and reach customers from one place.']].map(x=>`<div class="rounded-3xl border border-black/10 p-6"><div class="w-9 h-9 rounded-full bg-kate text-white grid place-items-center font-bold">${x[0]}</div><h3 class="mt-3 font-bold">${x[1]}</h3><p class="text-sm text-ink/70 mt-1">${x[2]}</p></div>`)))+sec('What you get',caps(c.c))+sec('Related business types',`<div class="flex flex-wrap gap-2">${lchips(TYPES.filter(x=>x.k===a&&x.s!==b))}</div>`))}}
 if(r==='all')return shell([['All Business Types']],'BUSINESS TYPES','All Business Types','Find your industry. The same platform supports hundreds of future categories.',`<input id="pq" placeholder="Search industries…" aria-label="Search industries" class="w-full max-w-md border border-black/15 rounded-xl px-4 py-3 mb-6"><div id="pg" class="flex flex-wrap gap-2">${lchips(TYPES)}</div>`);
 if(r==='products')return shell([['Products']],'PRODUCTS','One connected platform','Every KATE product runs on the same business data.',grid(P.map(x=>cardA('#/product/'+sl(x[1]),x[0],x[1],x[2]))));
 if(r==='product'&&PF[a]){const x=P.find(y=>sl(y[1])===a);return shell([['Products','#/products'],[x[1]]],'PRODUCT',x[1],x[2],sec('What it does',caps(PF[a])))}
 if(r==='solutions')return shell([['Solutions']],'SOLUTIONS','Solutions by business type','Pick your industry to see how KATE fits.',grid(Object.entries(CATS).map(([k,c])=>cardA('#/category/'+k,c.i,c.n,c.d)),'sm:grid-cols-2'));
 if(r==='marketing')return shell([['KATE Marketing']],'KATE MARKETING','Turn Every Sale Into Your Next Customer.','KATE Marketing works directly from your POS data.',sec('From sale to repeat sale',`<ol class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">${['Sale','Customer data','Segment','KATE AI','Campaign','Customer','Repeat sale'].map((x,i)=>`<li class="rounded-2xl p-4 text-center text-sm font-bold ${i===3?'bg-kate text-white':'bg-mist'}">${x}</li>`).join('')}</ol>`)+sec('Features',caps(['Customer segmentation','Campaigns','Offers','Coupons','Loyalty','Customer win-back','Repeat purchase campaigns','Birthday offers','WhatsApp','SMS','Email','Customer reminders','Marketing analytics','AI-generated campaigns'])));
 if(r==='ai')return shell([['KATE AI']],'KATE AI','A business assistant, not just a chatbot.','Ask about sales, stock, customers, expenses, profit, staff and products.',sec('Try asking',grid(Object.entries(AI).map(([q,an])=>`<div class="rounded-3xl border border-black/10 p-6"><p class="font-bold">${q}</p><p class="mt-3 text-sm bg-mist rounded-xl p-3">✦ ${an}</p></div>`))));
 if(r==='pricing')return shell([['Pricing']],'PRICING','Simple plans that grow with you','Sample pricing for this prototype. Final plans will be announced.',grid([['Starter','₹499 / month','One store, POS, basic reports'],['Growth','₹1,499 / month','Inventory, marketing, KATE AI'],['Scale','Custom','Multi-store, ERP accounts, priority support']].map((x,i)=>`<div class="rounded-3xl border ${i===1?'border-kate shadow-xl':'border-black/10'} p-6"><h3 class="font-bold text-lg">${x[0]}</h3><p class="mt-2 text-3xl font-extrabold">${x[1]}</p><p class="mt-2 text-sm text-ink/70">${x[2]}</p><a href="#start" class="mt-5 block text-center bg-ink text-white rounded-full py-2.5 font-semibold">Get Started</a></div>`)));
 if(r==='resources')return shell([['Resources']],'RESOURCES','Resources','Learn, get help and stay up to date.',grid(RES.map(x=>cardA('#/resource/'+sl(x[1]),x[0],x[1],x[2]))));
 if(r==='resource'){const x=RES.find(y=>sl(y[1])===a);if(x)return shell([['Resources','#/resources'],[x[1]]],'RESOURCES',x[1],x[2],`<p class="text-ink/70">This section is on the KATE roadmap. Content will appear here soon.</p>`)}
 return shell([['Page not found']],'404','Page not found','That page does not exist yet.','<a href="#" class="text-kate font-semibold">← Back to home</a>');
}
function route(){
 const hsh=location.hash,pg=$('#page'),home=$('#home');
 setMega(false);mob.classList.add('hidden');bg.setAttribute('aria-expanded','false');bg.textContent='☰';
 if(!hsh.startsWith('#/')){pg.classList.add('hidden');home.classList.remove('hidden');document.title='KATE — Business Operating System for MSMEs';
  const el=hsh.length>1&&document.getElementById(hsh.slice(1));if(el)el.scrollIntoView();else window.scrollTo(0,0);return}
 h(pg,`<div class="fade">${build(hsh)}</div>`);
 pg.classList.remove('hidden');home.classList.add('hidden');window.scrollTo(0,0);
 pg.querySelectorAll('[data-signin]').forEach(a=>a.onclick=openLogin);
 const pq=$('#pq');if(pq)pq.oninput=()=>h($('#pg'),lchips(TYPES.filter(t=>t.n.toLowerCase().includes(pq.value.toLowerCase()))));
}
mega.addEventListener('click',e=>{if(e.target.closest('a'))setMega(false)});
mob.addEventListener('click',e=>{if(e.target.closest('a')){mob.classList.add('hidden');bg.textContent='☰'}});
addEventListener('hashchange',route);route();
