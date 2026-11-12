/* Miraki Gardens — tablet menu app (Level 1: browse + cart + call waiter)
   The live menu is edited in admin.html and stored in the cloud (cloud-config.js).
   menu-data.js is the built-in fallback for the very first start without internet. */
(function(){
  "use strict";
  var CLOUD_CACHE = "mg_menu_cloud";
  function readCache(){ try{ var c = JSON.parse(localStorage.getItem(CLOUD_CACHE)||"null"); return c && c.categories ? c : null; }catch(e){ return null; } }
  function writeCache(m){ try{ localStorage.setItem(CLOUD_CACHE, JSON.stringify(m)); }catch(e){} }
  function fromCloud(){
    if(!window.MENU_CLOUD) return Promise.resolve(null);
    return window.MENU_CLOUD.read().then(function(row){
      if(!row || !row.data || !row.data.categories) return null;
      row.data.updatedAt = row.updated_at; return row.data;
    });
  }
  var cached = readCache();
  if(cached){ startMenu(cached); return; }
  // first start on this tablet: wait a moment for the cloud menu, otherwise use the built-in one
  var started = false;
  function go(m){ if(started) return; started = true; startMenu(m || window.MENU); }
  setTimeout(function(){ go(null); }, 3500);
  fromCloud().then(function(m){ if(m) writeCache(m); go(m); }).catch(function(){ go(null); });

  function startMenu(MENU_DATA){
  var DATA = MENU_DATA;
  var UI = DATA.ui;

  var state = {
    lang: localStorage.getItem("mg_lang") || "ru",
    group: "food",
    cat: null,
    cart: JSON.parse(localStorage.getItem("mg_cart") || "{}"),  // { itemId: qty }
    table: localStorage.getItem("mg_table") || "",
    search: ""
  };

  // ---- helpers ----
  function t(key){ var o = UI[key]; return o ? (o[state.lang]||o.ru) : key; }
  function tt(obj){ return obj ? (obj[state.lang]||obj.ru||obj.en||"") : ""; }
  function money(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," "); }
  function som(){ return t("som"); }
  // hidden categories / items (stop-list) are not shown on the tablets
  function visible(x){ return x && !x.hidden; }
  function visItems(c){ return (c.items||[]).filter(visible); }
  var ITEMS = {};   // id -> {item, cat}
  DATA.categories.filter(visible).forEach(function(c){ visItems(c).forEach(function(it){ ITEMS[it.id]={item:it,cat:c}; }); });
  // drop cart lines whose dish was removed or hidden since last visit
  for(var cid in state.cart){ if(!ITEMS[cid]) delete state.cart[cid]; }

  function imgFor(item){
    if(!item.img) return null;
    if(/^https?:/.test(item.img)) return item.img;
    return "images/"+(item.img.indexOf(".")>=0 ? item.img : item.img+".webp");
  }
  function saveCart(){ localStorage.setItem("mg_cart", JSON.stringify(state.cart)); }
  function cartCount(){ var n=0; for(var k in state.cart) n+=state.cart[k]; return n; }
  function subtotal(){ var s=0; for(var k in state.cart){ if(ITEMS[k]) s+=ITEMS[k].item.price*state.cart[k]; } return s; }

  // ---- render: language switch ----
  function renderLang(){
    var el=document.getElementById("langSwitch"); el.innerHTML="";
    UI.langs.forEach(function(l){
      var b=document.createElement("button");
      b.textContent=l.label; b.className=(l.code===state.lang?"active":"");
      b.onclick=function(){ state.lang=l.code; localStorage.setItem("mg_lang",l.code); document.documentElement.lang=l.code; renderAll(); };
      el.appendChild(b);
    });
  }

  // ---- render: group tabs ----
  function renderGroups(){
    var el=document.getElementById("groupTabs"); el.innerHTML="";
    [["food","food"],["drinks","drinks"]].forEach(function(g){
      var b=document.createElement("button");
      b.textContent=t(g[1]); b.className=(state.group===g[0]?"active":"");
      b.onclick=function(){ state.group=g[0]; state.search=""; document.getElementById("searchInput").value=""; state.cat=firstCat(); renderRail(); renderContent(); renderGroups(); };
      el.appendChild(b);
    });
  }
  function catsOfGroup(){ return DATA.categories.filter(function(c){return c.group===state.group && visible(c);}); }
  function firstCat(){ var c=catsOfGroup()[0]; return c?c.id:null; }

  // ---- render: rail ----
  function renderRail(){
    var el=document.getElementById("rail"); el.innerHTML="";
    catsOfGroup().forEach(function(c){
      var b=document.createElement("button");
      b.className=(c.id===state.cat && !state.search ?"active":"");
      b.innerHTML='<span class="rico">'+c.icon+'</span><span>'+tt(c.name)+'</span>';
      b.onclick=function(){ state.cat=c.id; state.search=""; document.getElementById("searchInput").value=""; document.getElementById("searchClear").hidden=true; renderRail(); renderContent(); document.getElementById("content").scrollTop=0; };
      el.appendChild(b);
    });
  }

  // ---- dish card ----
  function dishCard(item){
    var card=document.createElement("div"); card.className="card";
    var media=document.createElement("div"); media.className="card-media";
    var src=imgFor(item);
    if(src){ var im=document.createElement("img"); im.loading="lazy"; im.src=src; im.alt=tt(item.name);
      im.onerror=function(){ media.innerHTML=phHTML(); };
      media.appendChild(im);
    } else { media.innerHTML=phHTML(); }
    card.appendChild(media);

    var body=document.createElement("div"); body.className="card-body";
    var nm=document.createElement("div"); nm.className="card-name"; nm.textContent=tt(item.name); body.appendChild(nm);
    var d=tt(item.desc);
    if(d){ var de=document.createElement("div"); de.className="card-desc"; de.textContent=d; body.appendChild(de); }
    var meta=document.createElement("div"); meta.className="card-meta";
    meta.innerHTML='<span class="card-unit">'+(item.unit||"")+'</span><span class="card-price">'+money(item.price)+' '+som()+'</span>';
    body.appendChild(meta);
    var foot=document.createElement("div"); foot.className="card-foot"; foot.appendChild(cartControl(item)); body.appendChild(foot);
    card.appendChild(body);
    return card;
  }
  function phHTML(){ var cat=ITEMS && null; return '<div class="ph"><span class="ph-ico">'+(currentCatIcon())+'</span></div>'; }
  function currentCatIcon(){ var c=DATA.categories.find(function(x){return x.id===state.cat;}); return c?c.icon:"🍽"; }

  function cartControl(item){
    var qty=state.cart[item.id]||0;
    if(qty<=0){
      var b=document.createElement("button"); b.className="add-btn"; b.textContent=t("add");
      b.onclick=function(){ state.cart[item.id]=1; afterCart(); };
      return b;
    }
    var wrap=document.createElement("div"); wrap.className="stepper";
    var minus=document.createElement("button"); minus.textContent="−";
    minus.onclick=function(){ state.cart[item.id]=(state.cart[item.id]||0)-1; if(state.cart[item.id]<=0) delete state.cart[item.id]; afterCart(); };
    var q=document.createElement("span"); q.className="qty"; q.textContent=qty;
    var plus=document.createElement("button"); plus.textContent="+";
    plus.onclick=function(){ state.cart[item.id]=(state.cart[item.id]||0)+1; afterCart(); };
    wrap.appendChild(minus); wrap.appendChild(q); wrap.appendChild(plus);
    return wrap;
  }
  function afterCart(){ saveCart(); renderContent(); renderCart(); renderFab(); }

  // ---- content ----
  function renderContent(){
    var el=document.getElementById("content"); el.innerHTML="";
    if(state.search){
      var q=state.search.toLowerCase();
      var results=[];
      catsOfGroup().forEach(function(c){ visItems(c).forEach(function(it){
        var hay=(tt(it.name)+" "+tt(it.desc)+" "+it.name.en+" "+it.name.uz+" "+it.name.ru).toLowerCase();
        if(hay.indexOf(q)>=0) results.push(it);
      });});
      var h=document.createElement("h1"); h.className="cat-title"; h.textContent=(state.search); el.appendChild(h);
      var grid=document.createElement("div"); grid.className="grid";
      if(!results.length){ el.innerHTML+='<p class="cat-note">—</p>'; }
      results.forEach(function(it){ grid.appendChild(dishCard(it)); });
      el.appendChild(grid);
      return;
    }
    var cat=DATA.categories.find(function(c){return c.id===state.cat;});
    if(!cat) return;
    var title=document.createElement("h1"); title.className="cat-title";
    title.innerHTML='<span class="cat-emoji">'+cat.icon+'</span>'+tt(cat.name);
    el.appendChild(title);
    var note=document.createElement("p"); note.className="cat-note"; note.textContent=t("priceNote"); el.appendChild(note);
    var grid=document.createElement("div"); grid.className="grid";
    visItems(cat).forEach(function(it){ grid.appendChild(dishCard(it)); });
    el.appendChild(grid);
  }

  // ---- cart ----
  function renderCart(){
    document.getElementById("cartTitle").textContent=t("cart");
    var body=document.getElementById("cartBody");
    var foot=document.getElementById("cartFoot");
    var ids=Object.keys(state.cart);
    if(!ids.length){
      body.innerHTML='<div class="cart-empty"><div class="ce-ico">🛒</div><div class="ce-t">'+t("cartEmpty")+'</div><div class="ce-s">'+t("cartHint")+'</div></div>';
      foot.innerHTML="";
      return;
    }
    body.innerHTML="";
    ids.forEach(function(id){
      var rec=ITEMS[id]; if(!rec) return; var item=rec.item; var qty=state.cart[id];
      var row=document.createElement("div"); row.className="crow";
      var src=imgFor(item);
      if(src){ row.innerHTML='<img class="crow-img" src="'+src+'" alt="">'; }
      else { row.innerHTML='<div class="crow-ph">'+rec.cat.icon+'</div>'; }
      var info=document.createElement("div"); info.className="crow-info";
      info.innerHTML='<div class="crow-name">'+tt(item.name)+'</div><div class="crow-price">'+money(item.price)+' '+som()+' · '+(item.unit||"")+'</div>';
      row.appendChild(info);
      var right=document.createElement("div"); right.className="crow-right";
      var sum=document.createElement("div"); sum.className="crow-sum"; sum.textContent=money(item.price*qty)+" "+som();
      var step=document.createElement("div"); step.className="mini-step";
      var m=document.createElement("button"); m.textContent="−"; m.onclick=function(){ state.cart[id]--; if(state.cart[id]<=0) delete state.cart[id]; afterCart(); };
      var qq=document.createElement("span"); qq.className="q"; qq.textContent=qty;
      var p=document.createElement("button"); p.textContent="+"; p.onclick=function(){ state.cart[id]++; afterCart(); };
      step.appendChild(m); step.appendChild(qq); step.appendChild(p);
      right.appendChild(sum); right.appendChild(step); row.appendChild(right);
      body.appendChild(row);
    });
    var sub=subtotal(); var service=Math.round(sub*0.10); var total=sub+service;
    foot.innerHTML=
      '<div class="sum-row"><span>'+t("subtotal")+'</span><span>'+money(sub)+' '+som()+'</span></div>'+
      '<div class="sum-row"><span>'+t("service")+'</span><span>'+money(service)+' '+som()+'</span></div>'+
      '<div class="sum-row total"><span>'+t("total")+'</span><span class="val">'+money(total)+' '+som()+'</span></div>'+
      '<label class="mo-table" style="display:block;margin:12px 0 4px">'+t("table")+
        '<input id="tableInput" inputmode="numeric" value="'+ (state.table||"") +'" '+
        'style="width:100%;margin-top:6px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font-size:15px"></label>'+
      '<button class="btn-primary" id="orderBtn">'+t("order")+'</button>'+
      '<button class="btn-ghost" id="clearBtn">'+t("clear")+'</button>';
    document.getElementById("tableInput").oninput=function(e){ state.table=e.target.value; localStorage.setItem("mg_table",state.table); };
    document.getElementById("orderBtn").onclick=openOrder;
    document.getElementById("clearBtn").onclick=function(){ state.cart={}; afterCart(); };
  }

  // ---- fab (mobile) ----
  function renderFab(){
    var fab=document.getElementById("cartFab");
    var n=cartCount();
    document.getElementById("fabCount").textContent=n;
    document.getElementById("fabTotal").textContent=money(subtotal())+" "+som();
    fab.hidden=(n===0);
  }

  // ---- order modal ----
  function openOrder(){
    var ids=Object.keys(state.cart); if(!ids.length) return;
    var rows="";
    ids.forEach(function(id){ var rec=ITEMS[id]; if(!rec)return; var it=rec.item; var q=state.cart[id];
      rows+='<div class="mo-row"><span>'+tt(it.name)+' <span class="mo-q">×'+q+'</span></span><span>'+money(it.price*q)+' '+som()+'</span></div>';
    });
    var sub=subtotal(), service=Math.round(sub*0.10), total=sub+service;
    document.getElementById("modalTitle").textContent=t("called");
    document.getElementById("modalMsg").textContent=t("calledMsg");
    var tbl=state.table?('<div class="mo-table">'+t("table")+': <b>'+state.table+'</b></div>'):"";
    document.getElementById("modalOrder").innerHTML=
      tbl+rows+
      '<div class="mo-row" style="color:var(--ink-soft)"><span>'+t("service")+'</span><span>'+money(service)+' '+som()+'</span></div>'+
      '<div class="mo-total"><span>'+t("total")+'</span><span class="val">'+money(total)+' '+som()+'</span></div>';
    document.getElementById("modalOk").textContent=t("close");
    document.getElementById("orderModal").hidden=false;
  }

  // ---- search ----
  function initSearch(){
    var inp=document.getElementById("searchInput");
    var clr=document.getElementById("searchClear");
    inp.placeholder=t("search");
    inp.oninput=function(e){ state.search=e.target.value.trim(); clr.hidden=!state.search; renderRail(); renderContent(); };
    clr.onclick=function(){ inp.value=""; state.search=""; clr.hidden=true; renderRail(); renderContent(); };
  }

  // ---- cart open/close (mobile) ----
  function initCartToggle(){
    var cart=document.getElementById("cart"), scrim=document.getElementById("scrim");
    document.getElementById("cartFab").onclick=function(){ cart.classList.add("open"); scrim.hidden=false; };
    document.getElementById("cartClose").onclick=closeCart;
    scrim.onclick=closeCart;
    function closeCart(){ cart.classList.remove("open"); scrim.hidden=true; }
    document.getElementById("modalOk").onclick=function(){ document.getElementById("orderModal").hidden=true; };
  }

  function renderAll(){
    renderLang(); renderGroups(); initSearch();
    if(!state.cat) state.cat=firstCat();
    renderRail(); renderContent(); renderCart(); renderFab();
  }

  // optional deep-link: #group/category (e.g. #drinks/wine)
  function applyHash(){
    var h=(location.hash||"").replace(/^#/,"");
    if(!h) return;
    var parts=h.split("/");
    if(parts[0]==="food"||parts[0]==="drinks") state.group=parts[0];
    if(parts[1] && catsOfGroup().some(function(c){return c.id===parts[1];})) state.cat=parts[1];
  }

  // init
  document.documentElement.lang=state.lang;
  state.cat=firstCat();
  applyHash();
  renderAll(); initCartToggle();
  window.addEventListener("hashchange",function(){ applyHash(); renderGroups(); renderRail(); renderContent(); });

  // ---- live menu updates ----
  // When admins publish a new menu, tablets pick it up by themselves:
  // every few minutes we check the cloud menu and reload once nobody is in the middle of an order.
  var pendingUpdate=false;
  function idle(){ return cartCount()===0 && document.getElementById("orderModal").hidden && !document.getElementById("cart").classList.contains("open"); }
  function checkForUpdate(){
    if(!navigator.onLine) return;
    fromCloud().then(function(m){
      if(m && m.updatedAt!==(DATA.updatedAt||"")){ writeCache(m); pendingUpdate=true; }
      if(pendingUpdate && idle()) location.reload();
    }).catch(function(){});
  }
  setInterval(checkForUpdate, 2*60*1000);
  setTimeout(checkForUpdate, 5000);
  setInterval(function(){ if(pendingUpdate && idle()) location.reload(); }, 20*1000);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) checkForUpdate(); });

  // service worker
  if("serviceWorker" in navigator){ navigator.serviceWorker.register("sw.js").catch(function(){}); }
  } // startMenu
})();
