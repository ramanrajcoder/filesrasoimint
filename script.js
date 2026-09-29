const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const put=(id,h)=>{$(id).innerHTML=h};
const card=(t,d,x='')=>`<div class="card fc ${x}"><span class="ico">${t[1]||''}</span><h3>${t[0]}</h3><p>${d}</p></div>`;

/* ---------- LANDING ---------- */
put('#heroArt',`<div class="thali"><b>₹</b></div>
<div class="chip" style="top:10px;left:0">Food cost<b>31.4%</b></div>
<div class="chip" style="top:120px;right:0">Gross margin<b style="color:#0E8F76">54.2%</b></div>
<div class="chip" style="bottom:20px;left:30px">Rice ₹4/kg cheaper<b>↓ Sharma Foods</b></div>`);
put('#mock',`<div class="kpis">${[['Today\'s Sales','₹48,650','+8.4%'],['Purchases','₹12,400','-3.2%'],['Food Cost','31.4%','Target &lt; 32%'],['Gross Margin','54.2%',''],['Inventory','₹3.82L','']].map(k=>`<div class="card kpi"><span>${k[0]}</span><div class="kv">${k[1]}</div><span class="up">${k[2]}</span></div>`).join('')}</div>
<div class="grid g2"><div class="card"><h3>Sales vs Purchases</h3>${bars([[41,12],[44,15],[39,11],[52,18],[58,14],[47,13],[49,12]],['M','T','W','T','F','S','S'],2)}</div><div class="card"><h3>Food cost trend</h3>${line([33,32.6,32.1,31.9,32.4,31.8,31.4,31.5,31.2,31.4],'%')}</div></div>`);
put('#chaos',['WhatsApp','Excel','Notebooks','Multiple suppliers','Manual stock counting','Scattered bills'].map(x=>`<span>${x}</span>`).join(''));
const FEATS=[['Procurement','🛒'],['Supplier Management','🤝'],['Inventory','📦'],['Recipe Costing','🍛'],['Food Cost','📉'],['Wastage','🗑️'],['Expenses','🧾'],['Margins','💹'],['Analytics','📊']];
const FD=['Raise requests and POs, compare rates before you buy.','Track delivery, price consistency and dues per supplier.','Live stock, reorder levels and counts by outlet.','Cost every dish down to the gram.','See food cost against your target, daily.','Log spoilage and waste, spot the leaks.','Rent, salary, utilities and packaging in one ledger.','Item-level and outlet-level profitability.','Reports and insights that read like advice.'];
put('#featGrid',FEATS.map((f,i)=>card(f,FD[i])).join(''));
put('#flow',['Demand','Procurement','Supplier','Inventory','Recipe Cost','Sales','Margin'].map(x=>`<span>${x}</span>`).join('<i>→</i>'));
put('#audGrid',[['Restaurants','🍽️','Dine-in kitchens with long menus.'],['Cafés','☕','Tight margins on dairy and bakery.'],['QSRs','🥡','High-volume, fast-moving stock.'],['Small Hotels','🏨','Kitchen, banquet and room service.'],['Multi-outlet Businesses','🏬','Compare 2–5 outlets side by side.']].map(a=>card([a[0],a[1]],a[2])).join(''));
put('#metricGrid',[['Monthly Revenue','₹14.8L'],['Food Cost','31.4%'],['Gross Margin','54.2%'],['Wastage','₹42,800'],['Inventory','₹3.82L']].map(m=>`<div class="card"><span class="mut">${m[0]}</span><div class="kv">${m[1]}</div></div>`).join(''));
put('#insGrid',['Chicken consumption is 18% above average.','Rice purchase price decreased by ₹4/kg.','Butter Chicken margin fell by 4.2%.','8 inventory items need reordering.'].map((t,i)=>`<div class="card ins ${i==1?'op':''}"><p style="color:var(--ink);font-weight:500">${t}</p></div>`).join(''));
put('#priceGrid',[['Starter','₹1,499','per outlet / month','Inventory, suppliers, expenses'],['Growth','₹2,999','per outlet / month','+ Recipes, food cost, reports','hot'],['Multi-outlet','Custom','2–5 outlets','+ Outlet comparison, priority support']].map(p=>`<div class="card plan ${p[4]||''}"><h3>${p[0]}</h3><div class="kv">${p[1]}</div><small>${p[2]}</small><p style="margin:10px 0 16px">${p[3]}</p><a class="btn ${p[4]?'':'ghost'}" href="#/app/dashboard">Get Started</a></div>`).join(''));
put('#soonGrid',['Supplier Network','Smart Procurement','Payments','Credit','Demand Forecasting'].map(x=>`<div class="card"><h3>${x}</h3><span class="tag">Coming Soon</span></div>`).join(''));
$('#navBtn').onclick=()=>$('#navLinks').classList.toggle('open');
$('#navLinks').onclick=()=>$('#navLinks').classList.remove('open');

/* ---------- CHARTS (inline SVG) ---------- */
function bars(d,l,n=1,cols=['#0E8F76','#F0A02B']){const W=520,H=190,m=26,max=Math.max(...d.flat())*1.1,bw=(W-m)/d.length,w=bw/(n+1);
 let s=`<svg class="ch" viewBox="0 0 ${W} ${H}" width="100%">`;
 d.forEach((r,i)=>{(Array.isArray(r)?r:[r]).forEach((v,j)=>{const h=(H-m)*v/max,x=m+i*bw+w*(j+.5);s+=`<rect x="${x}" y="${H-m-h}" width="${w*.9}" height="${h}" rx="3" fill="${cols[j]}"><title>${l[i]}: ${v}</title></rect>`});
 s+=`<text x="${m+i*bw+bw/2}" y="${H-8}" text-anchor="middle">${l[i]}</text>`});
 return s+'</svg>'}
function line(v,u=''){const W=520,H=190,m=26,mn=Math.min(...v)*.97,mx=Math.max(...v)*1.02,p=v.map((y,i)=>[m+i*(W-m-8)/(v.length-1),H-m-(H-2*m)*(y-mn)/(mx-mn)]);
 return `<svg class="ch" viewBox="0 0 ${W} ${H}" width="100%"><path d="M${p.map(a=>a.join(',')).join('L')}" fill="none" stroke="#0E8F76" stroke-width="2.5"/>${p.map((a,i)=>`<circle cx="${a[0]}" cy="${a[1]}" r="4" fill="#0E8F76"><title>${v[i]}${u}</title></circle>`).join('')}<text x="4" y="${H-m}">${mn.toFixed(0)}</text><text x="4" y="${m}">${mx.toFixed(0)}</text></svg>`}
function donut(d){const C=['#0E8F76','#F0A02B','#D9482B','#3b6ea5','#8a6bbf'],t=d.reduce((a,b)=>a+b[1],0);let a=0;
 const arcs=d.map((x,i)=>{const f=x[1]/t*100,o=`<circle r="15.9" cx="21" cy="21" fill="none" stroke="${C[i%5]}" stroke-width="7" stroke-dasharray="${f} ${100-f}" stroke-dashoffset="${25-a}"><title>${x[0]}: ${x[1]}%</title></circle>`;a+=f;return o}).join('');
 return `<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><svg class="ch" viewBox="0 0 42 42" width="150">${arcs}</svg><div>${d.map((x,i)=>`<div><span style="color:${C[i%5]}">●</span> ${x[0]} — ${x[1]}%</div>`).join('')}</div></div>`}

/* ---------- HELPERS ---------- */
const tag=(t)=>{const c={Low:'r',Healthy:'g',Pending:'y','Due Soon':'r',Paid:'g',Approved:'g',Delivered:'g','In transit':'y',Open:'y'}[t]||'';return `<span class="tag ${c}">${t}</span>`};
const btn=(t,m,c='ghost sm')=>`<button class="btn ${c}" data-m="${t}|${m||''}">${t}</button>`;
const tbl=(h,r)=>`<div class="tw"><table><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
const kpis=k=>`<div class="kpis">${k.map(x=>`<div class="card kpi"><span>${x[0]}</span><div class="kv">${x[1]}</div><span class="${(x[2]||'').startsWith('-')?'dn':'up'}">${x[2]||''}</span></div>`).join('')}</div>`;
const head=(t,a='',s='')=>`<div class="ph"><div><h1>${t}</h1><span class="mut">${s}</span></div><div class="acts">${a}</div></div>`;
const cd=(t,b)=>`<div class="card"><h3 style="margin-bottom:10px">${t}</h3>${b}</div>`;
const g2=(a,b)=>`<div class="grid g2 sec">${a}${b}</div>`;
const li=(a,b,c='')=>`<div class="li"><div>${a}</div><div>${b}</div>${c?`<div>${c}</div>`:''}</div>`;

/* ---------- DATA ---------- */
const INV=[['Chicken Breast','Meat',18,25,'kg',260],['Basmati Rice','Grains',82,50,'kg',92],['Cream','Dairy',6,10,'L',180],['Tomato','Vegetables',12,20,'kg',48],['Butter','Dairy',14,8,'kg',540],['Paneer','Dairy',22,15,'kg',320],['Onion','Vegetables',60,40,'kg',32],['Refined Oil','Oils',45,30,'L',135]];
const SUP=[['Sharma Foods','Rice, Pulses, Flour',48,94,'15 days','₹32,400'],['FreshMart','Vegetables, Dairy',63,89,'7 days','₹18,200'],['Metro Wholesale','Grocery, Oils, Packaging',37,92,'30 days','₹64,500'],['Local Supplier','Vegetables, Spices',71,86,'Cash / COD','₹0']];
const PAY=[['Sharma Foods','INV-2398','₹32,400','2 Oct','Pending'],['FreshMart','INV-8921','₹18,200','30 Sep','Due Soon'],['Metro Wholesale','INV-7712','₹64,500','5 Oct','Pending']];
const OUT=[['Gurugram','₹14.8L','31.4%','₹3.82L','₹42,800','54.2%'],['Delhi','₹18.2L','30.1%','₹4.6L','₹38,100','56.0%'],['Noida','₹9.6L','33.2%','₹2.4L','₹31,500','51.8%'],['Jaipur','₹7.9L','32.5%','₹1.9L','₹24,900','52.9%']];
const REC=[['Chicken 300g',78],['Butter 40g',24],['Cream 50ml',18],['Tomato 100g',6],['Spices',8],['Other',5]];
const MENU=[['Butter Chicken',399,139],['Dal Makhani',299,64],['Paneer Tikka',349,118],['Veg Biryani',279,88],['Masala Chai',80,14],['Gulab Jamun',120,33]];
const pct=(c,p)=>(c/p*100).toFixed(1)+'%';
const ins=(t,c,x='')=>`<div class="card ins ${c} sec" style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><span style="font-weight:500">${t}</span>${x}</div>`;
const INSIGHTS=`<h3 class="sec">High priority</h3>${['Chicken consumption is 18% above your normal average.','3 suppliers increased prices this week.','Your monthly wastage is ₹6,400 higher than last month.'].map(t=>ins(t,'hi',btn('Review'))).join('')}<h3 class="sec">Opportunity</h3>${['Local Supplier can save approximately ₹1,250 on this week\'s vegetable purchases.','Butter Chicken has a 34.8% food cost. A ₹20 price change brings it near 33%.'].map(t=>ins(t,'op',btn('Act on this'))).join('')}`;

/* ---------- PAGES ---------- */
const P={
dashboard:()=>head('Dashboard',btn('+ Create Purchase Order','','sm'),'The Spice Route — overview')+kpis([["Today's Sales",'₹48,650','+8.4%'],["Today's Purchases",'₹12,400','-3.2%'],['Food Cost','31.4%','Target < 32%'],['Gross Margin','54.2%',''],['Inventory Value','₹3.82L',''],['Pending Payments','₹1.82L','']])+
 g2(cd('Sales vs Purchases — last 7 days (₹K)',bars([[41,12],[44,15],[39,11],[52,18],[58,14],[47,13],[49,12]],['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],2)),cd('Food cost trend — last 30 days (%)',line([33,32.8,32.6,32.9,32.1,31.9,32.4,31.8,31.6,31.9,31.4,31.5,31.2,31.4])))+
 g2(cd('Monthly revenue vs expenses (₹L)',bars([[12.1,8.2],[13.0,8.6],[13.6,9.0],[14.2,9.4],[14.8,10.9]],['May','Jun','Jul','Aug','Sep'],2)),cd('Inventory by category',donut([['Meat',34],['Grains',22],['Dairy',18],['Vegetables',14],['Oils & other',12]])))+
 g2(cd('Low stock',INV.filter(i=>i[2]<i[3]).slice(0,3).map(i=>li(`<b>${i[0]}</b><br><small>${i[2]} ${i[4]} / minimum ${i[3]} ${i[4]}</small>`,btn('Reorder',i[0]+' — raise a purchase request.'))).join('')),cd('Supplier payments due',[['Sharma Foods','₹32,400','2 Oct'],['FreshMart','₹18,200','30 Sep'],['Metro Wholesale','₹64,500','5 Oct']].map(p=>li(`<b>${p[0]}</b>`,p[1],`<small>Due ${p[2]}</small>`)).join('')))+
 cd('RasoiMint Insights',['Chicken consumption is 18% above average.','Your tomato purchase price increased 14%.','8 items need replenishment.'].map(t=>li(t,'')).join('')),

procurement:()=>head('Procurement',btn('+ Create Purchase Request','Item, quantity and needed-by date.','ghost')+btn('+ Create Purchase Order','Choose supplier, items and delivery date.','btn'))+
 kpis([['Purchase Requests','6','2 awaiting approval'],['Purchase Orders','14','This month'],['Pending Deliveries','3','Next: today 4 PM'],['Purchase History','₹4.82L','This month']])+
 `<div class="sec">${cd('Supplier price comparison — Basmati Rice, 25 kg',tbl(['Supplier','Price','Previous','Change','Delivery','Payment terms','Performance',''],[['Sharma Foods','₹92/kg','₹96/kg','<span class="up">↓ ₹4</span>','Next day','15 days','94%',btn('Create PO','Basmati Rice 25 kg from Sharma Foods at ₹92/kg = ₹2,300.','sm')],['Metro Wholesale','₹94/kg','₹94/kg','–','2 days','30 days','92%',btn('Create PO','Basmati Rice 25 kg from Metro Wholesale at ₹94/kg = ₹2,350.')],['Local Supplier <span class="tag g">Best price</span>','₹90/kg','₹91/kg','<span class="up">↓ ₹1</span>','Same day','Cash / COD','86%',btn('Create PO','Basmati Rice 25 kg from Local Supplier at ₹90/kg = ₹2,250.','sm')]])+'<div class="hl"><span>Potential saving: ₹100 (Local Supplier vs Metro Wholesale)</span>'+btn('Create PO','Basmati Rice 25 kg from Local Supplier.','sm')+'</div>')}</div>`+
 cd('Recent purchase orders',tbl(['PO','Supplier','Amount','Expected','Status'],[['PO-1042','FreshMart','₹8,450','Today','In transit'],['PO-1041','Sharma Foods','₹32,400','28 Sep','Delivered'],['PO-1040','Metro Wholesale','₹64,500','27 Sep','Delivered'],['PO-1039','Local Supplier','₹3,950','Tomorrow','Open']].map(r=>{r[4]=tag(r[4]);return r}))),

suppliers:()=>head('Suppliers',btn('+ Add Supplier','Name, categories, payment terms.','btn'))+`<div class="grid g2">${SUP.map(s=>`<div class="card"><h3>${s[0]}</h3><small>${s[1]}</small><div class="grid g2" style="margin:12px 0;gap:6px"><span>Orders: <b>${s[2]}</b></span><span>On-time: <b>${s[3]}%</b></span><span>Terms: <b>${s[4]}</b></span><span>Outstanding: <b>${s[5]}</b></span></div>${btn('View',s[0])} ${btn('Edit',s[0])} ${btn('Create Order',s[0]+' — new purchase order.','sm')}</div>`).join('')}</div>`,

performance:()=>head('Supplier Performance','','Last 90 days — sample data')+tbl(['Supplier','Delivery %','Price consistency','Order frequency','Quality','Total purchases','Outstanding'],SUP.map((s,i)=>[`<b>${s[0]}</b>`,`<div class="bar"><i style="width:${s[3]}%"></i></div>${s[3]}%`,['High','Medium','High','Medium'][i],`${s[2]} orders`,['4.6','4.3','4.4','4.0'][i]+' ★',['₹1.9L','₹1.2L','₹2.8L','₹0.9L'][i],s[5]])),

inventory:()=>head('Inventory',['Stock In','Stock Out','Adjustment','Wastage','Stock Count'].map(x=>btn(x,'Select ingredient, quantity and note.','ghost sm')).join(''))+
 kpis([['Inventory Value','₹3.82L',''],['Items tracked','142',''],['Low stock','8','-Needs action']])+
 tbl(['Ingredient','Category','Current Stock','Minimum Stock','Unit Cost','Value','Status'],INV.map(i=>[`<b>${i[0]}</b>`,i[1],i[2]+' '+i[4],i[3]+' '+i[4],'₹'+i[5]+'/'+i[4],'₹'+(i[2]*i[5]).toLocaleString('en-IN'),tag(i[2]<i[3]?'Low':'Healthy')])),

recipes:()=>{const t=REC.reduce((a,b)=>a+b[1],0);return head('Recipes',btn('+ Add Ingredient','Ingredient and quantity.','ghost')+btn('Update Recipe','Recipe saved.','btn')+btn('Change Selling Price','Enter new price.','ghost'),'Recipe costing')+
 g2(cd('Butter Chicken — ingredients',tbl(['Ingredient','Cost'],REC.map(r=>[r[0],'₹'+r[1]]).concat([['<b>Total cost</b>','<b>₹'+t+'</b>']]))),cd('Profitability',kpis([['Selling Price','₹399',''],['Food Cost',pct(t,399),'Target < 32%'],['Gross Contribution','₹'+(399-t),'']])+'<div class="hl"><span>Food cost is above the 32% target. Try ₹420 or trim chicken to 280g.</span></div>'))},

foodcost:()=>head('Food Cost')+kpis([['Overall Food Cost','31.4%','Target 32%'],['Food','31.4%',''],['Beverages','18.2%',''],['Desserts','27.6%','']])+g2(cd('By category (%)',bars([31.4,18.2,27.6],['Food','Beverages','Desserts'])),cd('Menu item profitability',tbl(['Item','Price','Cost','Food cost'],MENU.map(m=>[m[0],'₹'+m[1],'₹'+m[2],pct(m[2],m[1])])))),

wastage:()=>head('Wastage',btn('+ Record Wastage','Item, quantity and reason.','btn'))+kpis([["Today's Wastage",'₹2,840','+₹640 vs avg'],['Monthly Wastage','₹42,800','+₹6,400 vs last month']])+g2(cd('Reasons (₹K)',bars([14.2,10.1,8.4,5.3,4.8],['Spoilage','Overprod.','Expired','Damaged','Prep'])),cd('Daily trend (₹)',line([1800,2100,1600,2400,2840,2200,1900,2840]))),

expenses:()=>head('Expenses',btn('+ Add Expense','Category, amount, date.','btn'),'September 2026')+kpis([['Procurement','₹4.82L',''],['Salary','₹2.10L',''],['Rent','₹85K',''],['Utilities','₹42K',''],['Packaging','₹31K',''],['Other','₹22K','']])+cd('Expense split',donut([['Procurement',54],['Salary',24],['Rent',10],['Utilities',5],['Packaging & other',7]])),

payables:()=>head('Payables','','Total pending: ₹1.15L across 3 invoices')+tbl(['Supplier','Invoice','Amount','Due Date','Status',''],PAY.map(p=>[p[0],p[1],p[2],p[3],tag(p[4]),btn('View Invoice',p[1]+' — '+p[0]+' — '+p[2])+btn('Record Payment',p[1]+' — mark payment received.','sm')])),

payments:()=>head('Payments')+`<div class="hl"><span>Pay suppliers directly from RasoiMint <span class="tag">Coming Soon</span></span></div>`+tbl(['Date','Supplier','Reference','Amount','Mode'],[['27 Sep','Metro Wholesale','INV-7690','₹41,200','Bank transfer'],['25 Sep','Sharma Foods','INV-2371','₹27,800','UPI'],['24 Sep','FreshMart','INV-8870','₹15,300','UPI']]),

margins:()=>head('Margins')+kpis([['Revenue','₹14.8L',''],['COGS','₹4.7L',''],['Gross Profit','₹10.1L',''],['Operating Expenses','₹6.2L',''],['Operating Profit','₹3.9L','']])+cd('Item-level profitability',tbl(['Item','Price','Cost','Contribution','Margin'],MENU.map(m=>[m[0],'₹'+m[1],'₹'+m[2],'₹'+(m[1]-m[2]),((m[1]-m[2])/m[1]*100).toFixed(1)+'%']))),

reports:()=>head('Reports','','Sample exports for the current month')+`<div class="grid g3">${['Sales','Purchase','Inventory','Food Cost','Wastage','Supplier','Expense','Profitability','Payment'].map(r=>`<div class="card"><h3>${r} Report</h3><p style="margin-bottom:12px">Sep 2026 · Gurugram</p>${['CSV','Excel','PDF'].map(f=>btn('Export '+f,r+' Report — generating '+f+'…')).join(' ')}</div>`).join('')}</div>`,

insights:()=>head('RasoiMint Insights')+INSIGHTS,

outlets:()=>head('All Outlets',btn('+ Add Outlet','Outlet name, city, manager.','btn'))+kpis([['Combined Sales','₹50.5L',''],['Avg Food Cost','31.8%','']])+tbl(['Outlet','Sales','Food Cost','Inventory','Wastage','Gross Margin'],OUT.map(o=>o.map((c,i)=>i?c:`<b>${c}</b>`))),

settings:()=>head('Settings')+cd('Restaurant profile','<label>Name</label><input value="The Spice Route"><label>Food cost target</label><input value="32%"><br><br>'+btn('Save changes','Saved.','btn'))
};
P.po=P.procurement;

/* ---------- APP SHELL ---------- */
const NAV=[['dashboard','Dashboard'],['h','OPERATIONS'],['procurement','Procurement'],['po','Purchase Orders'],['inventory','Inventory'],['wastage','Wastage'],['h','SUPPLIERS'],['suppliers','Suppliers'],['performance','Supplier Performance'],['h','COST & PROFIT'],['recipes','Recipes'],['foodcost','Food Cost'],['margins','Margins'],['expenses','Expenses'],['h','FINANCE'],['payables','Payables'],['payments','Payments'],['h','ANALYTICS'],['reports','Reports'],['insights','Insights'],['h','OUTLETS'],['outlets','All Outlets'],['h','SETTINGS'],['settings','Settings']];
function route(){const h=location.hash.slice(1)||'/',isApp=h.startsWith('/app');
 $('#site').hidden=isApp;$('#app').hidden=!isApp;window.scrollTo(0,0);
 if(!isApp){const id=h.replace('/','');return}
 const pg=P[h.split('/')[2]]?h.split('/')[2]:'dashboard';
 put('#side',`<a class="logo" href="#/"><span class="lm">R</span>RasoiMint</a>`+NAV.map(n=>n[0]=='h'?`<h6>${n[1]}</h6>`:`<a href="#/app/${n[0]}" class="${n[0]==pg?'on':''}">${n[1]}</a>`).join(''));
 put('#view',P[pg]());$('#side').classList.remove('open')}
window.addEventListener('hashchange',route);route();

/* ---------- MODALS & TOASTS ---------- */
function modal(t,m){const form=/^(\+|Update|Change|Stock|Adjust|Wastage$|Record|Create|Edit|Reorder)/.test(t);
 put('#mbox',`<h3>${t.replace(/^\+ /,'')}</h3>${m?`<p class="mut">${m}</p>`:''}${form?'<label>Name / item</label><input placeholder="Type here"><label>Quantity / amount</label><input placeholder="e.g. 25">':''}<div class="acts"><button class="btn ghost" data-x>Close</button>${form?`<button class="btn" data-ok>Confirm</button>`:''}</div>`);$('#modal').hidden=false}
document.addEventListener('click',e=>{const b=e.target.closest('[data-m]');
 if(b){const [t,m]=b.dataset.m.split('|');return modal(t,m)}
 if(e.target.closest('[data-ok]')){$('#modal').hidden=true;toast('Saved (demo only)')}
 if(e.target.closest('[data-x]')||e.target.id=='modal')$('#modal').hidden=true;
 if(e.target.closest('#sideBtn'))$('#side').classList.add('open');
 if(e.target.classList.contains('shade'))$('#side').classList.remove('open');
 const tab=e.target.closest('.tabs button');if(tab){$$('.tabs button').forEach(x=>x.classList.remove('on'));tab.classList.add('on')}});
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2200)}
$('#outletSel').onchange=e=>toast('Viewing outlet: '+e.target.value+' (sample data)');
