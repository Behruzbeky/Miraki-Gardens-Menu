/* Miraki Gardens — menu admin panel
   Login with the admin password. The menu and new photos are saved to the cloud
   (Supabase, see cloud-config.js) through the "menu-admin" function, which checks the password.
   The tablets read the menu from the same place. */
(function(){
  "use strict";

  // ------------------------------------------------------------------ config
  var C = window.MENU_CLOUD;
  var PASS_KEY = "mg_admin_pass", DRAFT_KEY = "mg_admin_draft_cloud";
  var LANGS = ["ru","uz","en"];
  var LANG_LABEL = { ru:"RU", uz:"UZ", en:"EN" };
  var EMOJI = ["🥗","🍤","🥬","🍲","🍖","🍝","🍕","🍟","🔥","🥫","➕","🍞","🧒","🍰","🍸","🍺","🥃","🍾","🍷",
               "🍵","☕","🧊","🍋","🥤","🍹","🍳","🥟","🍣","🍔","🥙","🍛","🍜","🍢","🐟","🍗","🍦","🍨","🥐",
               "🧁","🍫","🍉","🥛","🧃","🌿","⭐"];

  // ------------------------------------------------------------------ i18n (admin UI)
  var I18N = {
    ru:{
      loginTitle:"Админ-панель меню",
      loginText:"Здесь можно менять блюда, цены, фото и категории. Изменения появятся на планшетах после публикации.",
      loginBtn:"Войти",
      passLabel:"Пароль", passWrong:"Неверный пароль",
      locked:"Слишком много неверных попыток. Попробуйте через 15 минут.",
      appTitle:"Админ-панель меню",
      openMenu:"Открыть меню ↗", publish:"Опубликовать", discard:"Отменить изменения",
      stPublished:"Всё опубликовано", stDirty:"Есть неопубликованные изменения",
      food:"Кухня", drinks:"Напитки", search:"Поиск блюда…",
      addCat:"+ Новая категория", addItem:"+ Добавить блюдо", editCat:"✎ Категория",
      itemsCount:"позиций", hiddenBadge:"скрыта",
      catSub:"Нажмите на блюдо, чтобы изменить. Переключатель — показывать в меню или нет (стоп-лист). Стрелки — порядок.",
      searchRes:"Результаты поиска", noItems:"В этой категории пока нет блюд", noResults:"Ничего не найдено",
      newItem:"Новое блюдо", editItem:"Изменить блюдо", newCat:"Новая категория", editCatTitle:"Изменить категорию",
      photo:"Фото", uploadPhoto:"Загрузить фото", replacePhoto:"Заменить фото", removePhoto:"Убрать фото",
      photoHint:"Лучше квадратное фото, блюдо по центру. Фото сожмётся автоматически.",
      names:"Название", descs:"Описание (состав)", nameReq:"Укажите название хотя бы на одном языке",
      unit:"Порция / объём", unitPh:"например 300 gr или 0,5 L",
      price:"Цена, сум", priceErr:"Введите цену цифрами",
      category:"Категория", visible:"Показывать в меню (есть в наличии)",
      catVisible:"Показывать категорию в меню",
      icon:"Значок", group:"Раздел",
      del:"Удалить", cancel:"Отмена", done:"Готово", close:"Закрыть",
      delItemQ:"Удалить «{n}» из меню?",
      delCatQ:"Удалить категорию «{n}»?",
      delCatItemsQ:"В категории «{n}» {c} блюд. Удалить категорию вместе со всеми блюдами?",
      busyLoad:"Загружаю меню…", busyPhoto:"Обрабатываю фото…", busyPub:"Публикую…", photosLost:"{n} фото не сохранились в черновике — загрузите их заново (у этих блюд сейчас нет фото).", busyPhotos:"Загружаю фото: {a} из {b}…",
      pubOk:"Опубликовано! Планшеты обновят меню в течение 1–3 минут.",
      pubNothing:"Нет изменений для публикации.",
      conflict:"Меню уже изменили с другого устройства после того, как вы его открыли. Если продолжить — ваши изменения заменят чужие. Продолжить?",
      draftQ:"Найден неопубликованный черновик ({d}). Продолжить с ним?\n\n«Отмена» — загрузить опубликованное меню.",
      discardQ:"Отменить все неопубликованные изменения?",
      leaveQ:"Есть неопубликованные изменения.",
      errNet:"Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.",
      errGeneric:"Ошибка: ",
      errPhoto:"Не удалось открыть фото. Попробуйте другое (JPG или PNG).",
      draftFull:"Черновик слишком большой для памяти устройства — опубликуйте изменения, чтобы не потерять фото.",
      settings:"Настройки",
      logout:"Выйти", save:"Сохранить",
      lastUpdate:"Последнее обновление меню",
      texts:"Тексты меню", priceNote:"Примечание под названием категории", tagline:"Слоган"
    },
    uz:{
      loginTitle:"Menyu admin paneli",
      loginText:"Bu yerda taomlar, narxlar, rasmlar va kategoriyalarni o‘zgartirish mumkin. O‘zgarishlar e’lon qilingandan keyin planshetlarda chiqadi.",
      loginBtn:"Kirish",
      passLabel:"Parol", passWrong:"Parol noto‘g‘ri",
      locked:"Juda ko‘p noto‘g‘ri urinish. 15 daqiqadan keyin urinib ko‘ring.",
      appTitle:"Menyu admin paneli",
      openMenu:"Menyuni ochish ↗", publish:"E’lon qilish", discard:"O‘zgarishlarni bekor qilish",
      stPublished:"Hammasi e’lon qilingan", stDirty:"E’lon qilinmagan o‘zgarishlar bor",
      food:"Taomlar", drinks:"Ichimliklar", search:"Taom qidirish…",
      addCat:"+ Yangi kategoriya", addItem:"+ Taom qo‘shish", editCat:"✎ Kategoriya",
      itemsCount:"ta", hiddenBadge:"yashirin",
      catSub:"O‘zgartirish uchun taomni bosing. Tugma — menyuda ko‘rsatish yoki yo‘q (stop-list). Strelkalar — tartib.",
      searchRes:"Qidiruv natijalari", noItems:"Bu kategoriyada hali taom yo‘q", noResults:"Hech narsa topilmadi",
      newItem:"Yangi taom", editItem:"Taomni o‘zgartirish", newCat:"Yangi kategoriya", editCatTitle:"Kategoriyani o‘zgartirish",
      photo:"Rasm", uploadPhoto:"Rasm yuklash", replacePhoto:"Rasmni almashtirish", removePhoto:"Rasmni olib tashlash",
      photoHint:"Kvadrat rasm yaxshiroq, taom markazda. Rasm avtomatik siqiladi.",
      names:"Nomi", descs:"Tavsif (tarkibi)", nameReq:"Kamida bitta tilda nom kiriting",
      unit:"Porsiya / hajm", unitPh:"masalan 300 gr yoki 0,5 L",
      price:"Narx, so‘m", priceErr:"Narxni raqamlarda kiriting",
      category:"Kategoriya", visible:"Menyuda ko‘rsatish (mavjud)",
      catVisible:"Kategoriyani menyuda ko‘rsatish",
      icon:"Belgi", group:"Bo‘lim",
      del:"O‘chirish", cancel:"Bekor qilish", done:"Tayyor", close:"Yopish",
      delItemQ:"«{n}» menyudan o‘chirilsinmi?",
      delCatQ:"«{n}» kategoriyasi o‘chirilsinmi?",
      delCatItemsQ:"«{n}» kategoriyasida {c} ta taom bor. Kategoriya barcha taomlari bilan o‘chirilsinmi?",
      busyLoad:"Menyu yuklanmoqda…", busyPhoto:"Rasm tayyorlanmoqda…", busyPub:"E’lon qilinmoqda…", photosLost:"{n} ta rasm qoralamada saqlanmagan — ularni qayta yuklang (bu taomlarda hozir rasm yo‘q).", busyPhotos:"Rasmlar yuklanmoqda: {a} / {b}…",
      pubOk:"E’lon qilindi! Planshetlar menyuni 1–3 daqiqada yangilaydi.",
      pubNothing:"E’lon qilish uchun o‘zgarish yo‘q.",
      conflict:"Siz ochgandan keyin menyu boshqa qurilmadan o‘zgartirilgan. Davom etsangiz, sizning o‘zgarishlaringiz ularning o‘rnini egallaydi. Davom etilsinmi?",
      draftQ:"E’lon qilinmagan qoralama topildi ({d}). U bilan davom etilsinmi?\n\n«Bekor qilish» — e’lon qilingan menyuni yuklash.",
      discardQ:"Barcha e’lon qilinmagan o‘zgarishlar bekor qilinsinmi?",
      leaveQ:"E’lon qilinmagan o‘zgarishlar bor.",
      errNet:"Server bilan aloqa yo‘q. Internetni tekshirib, qayta urinib ko‘ring.",
      errGeneric:"Xatolik: ",
      errPhoto:"Rasmni ochib bo‘lmadi. Boshqasini sinab ko‘ring (JPG yoki PNG).",
      draftFull:"Qoralama qurilma xotirasiga sig‘madi — rasmlar yo‘qolmasligi uchun o‘zgarishlarni e’lon qiling.",
      settings:"Sozlamalar",
      logout:"Chiqish", save:"Saqlash",
      lastUpdate:"Menyu oxirgi marta yangilangan",
      texts:"Menyu matnlari", priceNote:"Kategoriya nomi ostidagi izoh", tagline:"Shior"
    }
  };

  // ------------------------------------------------------------------ state
  var S = {
    lang: (function(){ try{ return localStorage.getItem("mg_admin_lang") || "ru"; }catch(e){ return "ru"; } })(),
    password: (function(){ try{ return localStorage.getItem(PASS_KEY) || ""; }catch(e){ return ""; } })(),
    menu: null,          // working copy of the menu
    baseUpdated: null,   // cloud version the working copy started from (null = never published yet)
    newImages: {},       // "<file>" -> base64, not yet published
    dirty: false,
    group: "food",
    catId: null,
    search: ""
  };
  if(!I18N[S.lang]) S.lang = "ru";

  // ------------------------------------------------------------------ helpers
  function T(k, vars){
    var s = (I18N[S.lang] && I18N[S.lang][k]); if(s==null) s = I18N.ru[k]; if(s==null) s = k;
    if(vars && typeof s === "string") for(var v in vars) s = s.split("{"+v+"}").join(vars[v]);
    return s;
  }
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function clone(o){ return JSON.parse(JSON.stringify(o)); }
  function money(n){ return String(n||0).replace(/\B(?=(\d{3})+(?!\d))/g," "); }
  function readJSON(k){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch(e){ return null; } }
  function writeJSON(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
  function L3(o){ o = o || {}; return { uz:o.uz||"", ru:o.ru||"", en:o.en||"" }; }
  function pick(o){ if(!o) return ""; return o[S.lang] || o.ru || o.uz || o.en || ""; }
  function draftKey(){ return DRAFT_KEY; }

  function toast(msg, kind, ms){
    var el=$("toast"); el.textContent=msg; el.className="toast"+(kind?" "+kind:""); el.hidden=false;
    clearTimeout(toast._t); toast._t=setTimeout(function(){ el.hidden=true; }, ms || 3800);
  }
  function busy(on, text){ $("busy").hidden=!on; $("busyText").textContent=text||""; }

  // ------------------------------------------------------------------ cloud API
  function ApiError(status, msg){ this.status=status; this.message=msg; }
  function api(body){
    body.password = S.password;
    return fetch(C.endpoint, {
      method:"POST", cache:"no-store",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(body)
    }).catch(function(){ throw new ApiError(0, T("errNet")); }).then(function(r){
      return r.text().then(function(txt){
        var data = {}; try{ data = txt ? JSON.parse(txt) : {}; }catch(e){}
        if(!r.ok) throw new ApiError(r.status, data.error || ("HTTP "+r.status));
        return data;
      });
    });
  }
  function errText(e){
    if(!e) return T("errGeneric");
    if(e.status===0) return T("errNet");
    if(e.status===401) return T("passWrong");
    if(e.status===429) return T("locked");
    return T("errGeneric") + (e.message || e);
  }

  // ------------------------------------------------------------------ menu data
  function normalizeMenu(m){
    if(!m || !Array.isArray(m.categories)) throw new Error("menu: categories not found");
    m.categories.forEach(function(c){
      c.name = L3(c.name); c.items = c.items || [];
      c.items.forEach(function(it){ it.name=L3(it.name); it.desc=L3(it.desc); it.price=Number(it.price)||0; if(it.img==null) it.img=""; if(it.unit==null) it.unit=""; });
    });
    return m;
  }
  function parseMenu(text){
    var sandbox = {};
    /* built-in data file of this site: `window.MENU = {...}` */
    new Function("window", text)(sandbox);
    return normalizeMenu(sandbox.MENU);
  }
  function cleanForSave(m){
    var o = clone(m);
    o.categories.forEach(function(c){ if(!c.hidden) delete c.hidden; c.items.forEach(function(it){ if(!it.hidden) delete it.hidden; }); });
    return o;
  }

  // ------------------------------------------------------------------ images
  var PHOTO_BASE = C.url+"/storage/v1/object/public/"+C.bucket+"/";
  function isCloud(img){ return /^https?:/.test(img||""); }
  function imgFile(img){ if(!img) return null; if(isCloud(img)) return img.split("/").pop(); return img.indexOf(".")>=0 ? img : img+".webp"; }
  function imgSrc(img){
    var f = imgFile(img); if(!f) return null;
    if(S.newImages[f]) return "data:image/"+(/\.jpe?g$/i.test(f)?"jpeg":"webp")+";base64,"+S.newImages[f];
    return isCloud(img) ? img : "images/"+f;
  }
  function processImage(file){
    return new Promise(function(resolve, reject){
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function(){
        try{
          var max = 1200, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max/Math.max(w,h));
          var cw = Math.max(1,Math.round(w*k)), ch = Math.max(1,Math.round(h*k));
          var c = document.createElement("canvas"); c.width=cw; c.height=ch;
          c.getContext("2d").drawImage(img, 0, 0, cw, ch);
          URL.revokeObjectURL(url);
          var data = c.toDataURL("image/webp", 0.82), ext = "webp";
          if(data.indexOf("data:image/webp")!==0){ data = c.toDataURL("image/jpeg", 0.85); ext = "jpg"; }
          var name = "p"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)+"."+ext;
          resolve({ value: PHOTO_BASE+name, path:name, b64:data.split(",")[1], dataUrl:data });
        }catch(e){ reject(e); }
      };
      img.onerror = function(){ URL.revokeObjectURL(url); reject(new Error("image")); };
      img.src = url;
    });
  }

  // ------------------------------------------------------------------ draft (local autosave)
  // The menu itself goes to localStorage; new photos go to IndexedDB (localStorage holds only ~5 MB).
  var idbP = null;
  function idb(){
    if(!idbP) idbP = new Promise(function(res, rej){
      try{
        var r = indexedDB.open("mg_admin", 1);
        r.onupgradeneeded = function(){ r.result.createObjectStore("img"); };
        r.onsuccess = function(){ res(r.result); };
        r.onerror = function(){ rej(r.error); };
      }catch(e){ rej(e); }
    });
    return idbP;
  }
  function idbRun(mode, fn){
    return idb().then(function(db){
      return new Promise(function(res, rej){
        var tx = db.transaction("img", mode), out = fn(tx.objectStore("img"));
        tx.oncomplete = function(){ res(out); };
        tx.onerror = tx.onabort = function(){ rej(tx.error); };
      });
    });
  }
  function idbPut(name, b64){ return idbRun("readwrite", function(st){ st.put(b64, name); }); }
  function idbAll(){
    return idbRun("readonly", function(st){
      var out = {}, cur = st.openCursor();
      cur.onsuccess = function(){ var c = cur.result; if(c){ out[c.key] = c.value; c.continue(); } };
      return out;
    });
  }
  function idbClear(){ return idbRun("readwrite", function(st){ st.clear(); }); }

  function markDirty(){ S.dirty = true; saveDraft(); renderStatus(); }
  function saveDraft(){
    try{ writeJSON(draftKey(), { menu:S.menu, baseUpdated:S.baseUpdated, ts:Date.now() }); }
    catch(e){ toast(T("draftFull"), "err", 6000); }
  }
  function addNewImage(name, b64){
    S.newImages[name] = b64;
    idbPut(name, b64).catch(function(){ toast(T("draftFull"), "err", 6000); });
  }
  function clearDraft(){ try{ localStorage.removeItem(draftKey()); }catch(e){} idbClear().catch(function(){}); }

  // ------------------------------------------------------------------ load
  function loadMenu(){
    busy(true, T("busyLoad"));
    return C.read().then(function(row){
      if(row && row.data && row.data.categories){
        S.menu = normalizeMenu(row.data); S.menu.updatedAt = row.updated_at; S.baseUpdated = row.updated_at;
        return;
      }
      // nothing published to the cloud yet: start from the site's built-in menu
      return fetch("menu-data.js?t="+Date.now(), { cache:"no-store" }).then(function(r){ return r.text(); })
        .then(function(t){ S.menu = parseMenu(t); S.baseUpdated = null; });
    }, function(){ throw new ApiError(0, T("errNet")); })
    .then(function(){ S.newImages = {}; S.dirty = false; })
    .finally(function(){ busy(false); });
  }
  function openEditor(){
    var draft = readJSON(draftKey());
    var p;
    if(draft && draft.menu && confirm(T("draftQ",{d:new Date(draft.ts).toLocaleString()}))){
      S.menu = draft.menu; S.baseUpdated = draft.baseUpdated || null; S.newImages = draft.newImages || {}; S.dirty = true;
      p = idbAll().then(function(imgs){ for(var k in imgs) S.newImages[k] = imgs[k]; }, function(){})
        .then(dropLostPhotos);
    } else {
      if(draft) clearDraft();
      p = loadMenu();
    }
    return p.then(showApp);
  }
  // A draft saved by an older version could lose new photos (device storage was full).
  // Remove references to photos that exist neither in the draft nor in the published menu.
  function dropLostPhotos(){
    return C.read().then(function(row){
      var live = {};
      if(row && row.data) row.data.categories.forEach(function(c){ (c.items||[]).forEach(function(it){ if(it.img) live[it.img] = 1; }); });
      var lost = 0;
      S.menu.categories.forEach(function(c){ c.items.forEach(function(it){
        if(isCloud(it.img) && !S.newImages[imgFile(it.img)] && !live[it.img]){ it.img = ""; lost++; }
      }); });
      if(lost){ saveDraft(); setTimeout(function(){ toast(T("photosLost",{n:lost}), "err", 9000); }, 400); }
    }, function(){});
  }
  function boot(){
    applyStaticTexts();
    if(!S.password){ showLogin(); return; }
    api({ action:"login" }).then(openEditor).catch(function(e){
      if(e && e.status===401) setPassword("");
      showLogin(errText(e));
    });
  }

  // ------------------------------------------------------------------ login
  function setPassword(p){ S.password = p || ""; try{ if(p) localStorage.setItem(PASS_KEY, p); else localStorage.removeItem(PASS_KEY); }catch(e){} }
  function setLoginErr(msg){ $("loginErr").hidden = !msg; $("loginErr").textContent = msg || ""; }
  function showLogin(err){
    $("app").hidden = true; $("login").hidden = false;
    setLoginErr(err);
    $("passInput").value = "";
    setTimeout(function(){ $("passInput").focus(); }, 50);
  }
  function doLogin(){
    var pass = $("passInput").value.trim();
    if(!pass){ $("passInput").focus(); return; }
    $("loginBtn").disabled = true; setLoginErr("");
    S.password = pass;
    busy(true, T("busyLoad"));
    api({ action:"login" }).then(function(){ setPassword(pass); return openEditor(); })
      .catch(function(e){ busy(false); S.password = ""; setLoginErr(errText(e)); $("passInput").value = ""; $("passInput").focus(); })
      .finally(function(){ $("loginBtn").disabled = false; });
  }

  // ------------------------------------------------------------------ static texts / lang
  function applyStaticTexts(){
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-t]").forEach(function(el){ el.textContent = T(el.getAttribute("data-t")); });
    $("searchInput").placeholder = T("search");
    ["loginLang","appLang"].forEach(function(id){
      var el = $(id); el.innerHTML = "";
      ["ru","uz"].forEach(function(l){
        var b = document.createElement("button"); b.textContent = LANG_LABEL[l]; b.className = l===S.lang?"active":"";
        b.onclick = function(){ S.lang = l; try{ localStorage.setItem("mg_admin_lang", l); }catch(e){} applyStaticTexts(); if(S.menu) renderAll(); };
        el.appendChild(b);
      });
    });
  }

  // ------------------------------------------------------------------ render
  function showApp(){
    $("login").hidden = true; $("app").hidden = false;
    if(!S.catId || !findCat(S.catId)) S.catId = firstCatId();
    renderAll();
  }
  function renderAll(){ renderStatus(); renderGroups(); renderCats(); renderItems(); }
  function renderStatus(){
    var st = $("status");
    st.textContent = S.dirty ? T("stDirty") : T("stPublished");
    st.className = "status " + (S.dirty ? "dirty" : "ok");
    $("discardBtn").hidden = !S.dirty;
    $("publishBtn").disabled = !S.dirty;
  }
  function catsOf(g){ return S.menu.categories.filter(function(c){ return c.group===g; }); }
  function firstCatId(){ var c = catsOf(S.group)[0]; return c ? c.id : null; }
  function findCat(id){ return S.menu.categories.find(function(c){ return c.id===id; }) || null; }
  function allItemIds(){ var o={}; S.menu.categories.forEach(function(c){ c.items.forEach(function(it){ o[it.id]=1; }); }); return o; }

  function renderGroups(){
    var el = $("groupTabs"); el.innerHTML = "";
    ["food","drinks"].forEach(function(g){
      var b = document.createElement("button"); b.textContent = T(g); b.className = S.group===g?"active":"";
      b.onclick = function(){ S.group = g; S.catId = firstCatId(); clearSearch(); renderAll(); };
      el.appendChild(b);
    });
  }

  function renderCats(){
    var el = $("cats"), cats = catsOf(S.group), html = "";
    cats.forEach(function(c, i){
      var active = !S.search && c.id===S.catId;
      html += '<div class="cat-row'+(active?" active":"")+(c.hidden?" off":"")+'">'+
        '<button class="cat-btn" data-act="cat" data-id="'+esc(c.id)+'"><span class="ico">'+esc(c.icon||"🍽")+'</span>'+
        '<span class="nm">'+esc(pick(c.name))+'</span><span class="cnt">'+c.items.length+'</span></button>'+
        '<div class="cat-moves">'+
          '<button data-act="cat-up" data-id="'+esc(c.id)+'"'+(i===0?" disabled":"")+' aria-label="up">▲</button>'+
          '<button data-act="cat-down" data-id="'+esc(c.id)+'"'+(i===cats.length-1?" disabled":"")+' aria-label="down">▼</button>'+
        '</div></div>';
    });
    html += '<button class="add-cat" data-act="cat-new">'+esc(T("addCat"))+'</button>';
    el.innerHTML = html;
  }

  function itemRow(it, cat, idx, count, showCat){
    var src = imgSrc(it.img);
    var thumb = src ? '<img src="'+esc(src)+'" alt="" loading="lazy" onerror="this.remove()">' : esc(cat.icon||"🍽");
    var others = LANGS.filter(function(l){ return l!==S.lang; }).map(function(l){ return it.name[l]; }).filter(Boolean).join(" · ");
    var isNewImg = it.img && S.newImages[imgFile(it.img)];
    return '<div class="irow'+(it.hidden?" off":"")+'" data-id="'+esc(it.id)+'" data-cat="'+esc(cat.id)+'">'+
      (showCat ? "" :
      '<div class="imoves">'+
        '<button class="icon-btn sm" data-act="item-up"'+(idx===0?" disabled":"")+' aria-label="up">▲</button>'+
        '<button class="icon-btn sm" data-act="item-down"'+(idx===count-1?" disabled":"")+' aria-label="down">▼</button>'+
      '</div>')+
      '<div class="ithumb" data-act="item-edit">'+thumb+'</div>'+
      '<div class="iinfo" data-act="item-edit">'+
        '<div class="iname">'+esc(pick(it.name) || "—")+(isNewImg?'<span class="new-dot" title="new photo"></span>':"")+'</div>'+
        '<div class="isub">'+esc(others || pick(it.desc))+'</div>'+
        (showCat ? '<div class="icat">'+esc((cat.icon||"")+" "+pick(cat.name))+'</div>' : "")+
      '</div>'+
      '<div class="iright">'+
        '<div class="iprice">'+money(it.price)+' '+(S.lang==="uz"?"so‘m":"сум")+'<small>'+esc(it.unit||"")+'</small></div>'+
        '<label class="switch" title="'+esc(T("visible"))+'"><input type="checkbox" data-act="item-vis"'+(it.hidden?"":" checked")+'><span class="track"></span></label>'+
        '<button class="icon-btn sm" data-act="item-edit" aria-label="edit">✎</button>'+
      '</div></div>';
  }

  function renderItems(){
    var el = $("items"), html = "";
    if(S.search){
      var q = S.search.toLowerCase(), hits = [];
      S.menu.categories.forEach(function(c){ c.items.forEach(function(it){
        var hay = [it.name.ru,it.name.uz,it.name.en,it.desc.ru,it.desc.uz,it.desc.en,it.id].join(" ").toLowerCase();
        if(hay.indexOf(q)>=0) hits.push([it,c]);
      }); });
      html += '<div class="items-head"><h2>⌕ '+esc(T("searchRes"))+'</h2></div><p class="items-sub">'+hits.length+' '+esc(T("itemsCount"))+'</p>';
      if(!hits.length) html += '<div class="empty"><div class="e-ico">🔍</div>'+esc(T("noResults"))+'</div>';
      hits.forEach(function(h){ html += itemRow(h[0], h[1], 0, 1, true); });
      el.innerHTML = html; return;
    }
    var cat = findCat(S.catId);
    if(!cat){ el.innerHTML = '<div class="empty"><div class="e-ico">🍽</div></div>'; return; }
    html += '<div class="items-head"><h2><span>'+esc(cat.icon||"")+'</span>'+esc(pick(cat.name))+
            (cat.hidden?' <span class="badge-off">'+esc(T("hiddenBadge"))+'</span>':"")+'</h2>'+
            '<div class="acts"><button class="btn btn-ghost btn-sm" data-act="cat-edit">'+esc(T("editCat"))+'</button>'+
            '<button class="btn btn-primary btn-sm" data-act="item-new">'+esc(T("addItem"))+'</button></div></div>'+
            '<p class="items-sub">'+esc(T("catSub"))+'</p>';
    if(!cat.items.length) html += '<div class="empty"><div class="e-ico">'+esc(cat.icon||"🍽")+'</div>'+esc(T("noItems"))+'</div>';
    cat.items.forEach(function(it, i){ html += itemRow(it, cat, i, cat.items.length, false); });
    el.innerHTML = html;
  }

  function clearSearch(){ S.search = ""; $("searchInput").value = ""; }

  // ------------------------------------------------------------------ list interactions
  function move(arr, i, d){ var j=i+d; if(j<0||j>=arr.length) return false; var t=arr[i]; arr[i]=arr[j]; arr[j]=t; return true; }
  function moveCat(id, d){
    // move within the same group, keeping other group's positions
    var all = S.menu.categories, same = all.filter(function(c){ return c.group===S.group; });
    var i = same.findIndex(function(c){ return c.id===id; });
    if(!move(same, i, d)) return;
    var k = 0; for(var x=0; x<all.length; x++){ if(all[x].group===S.group) all[x] = same[k++]; }
    markDirty(); renderCats();
  }

  function onCatsClick(e){
    var b = e.target.closest("[data-act]"); if(!b) return;
    var act = b.getAttribute("data-act"), id = b.getAttribute("data-id");
    if(act==="cat"){ S.catId = id; clearSearch(); renderCats(); renderItems(); $("items").scrollTop = 0; }
    else if(act==="cat-up") moveCat(id, -1);
    else if(act==="cat-down") moveCat(id, 1);
    else if(act==="cat-new") openCatEditor(null);
  }
  function onItemsClick(e){
    var b = e.target.closest("[data-act]"); if(!b) return;
    var act = b.getAttribute("data-act");
    if(act==="item-new"){ openItemEditor(null, S.catId); return; }
    if(act==="cat-edit"){ openCatEditor(findCat(S.catId)); return; }
    if(act==="item-vis") return; // handled in change
    var row = b.closest(".irow"); if(!row) return;
    var cat = findCat(row.getAttribute("data-cat")), id = row.getAttribute("data-id");
    var idx = cat.items.findIndex(function(it){ return it.id===id; });
    if(act==="item-edit") openItemEditor(cat.items[idx], cat.id);
    else if(act==="item-up"){ if(move(cat.items, idx, -1)){ markDirty(); renderItems(); } }
    else if(act==="item-down"){ if(move(cat.items, idx, 1)){ markDirty(); renderItems(); } }
  }
  function onItemsChange(e){
    if(e.target.getAttribute("data-act")!=="item-vis") return;
    var row = e.target.closest(".irow"), cat = findCat(row.getAttribute("data-cat"));
    var it = cat.items.find(function(x){ return x.id===row.getAttribute("data-id"); });
    if(e.target.checked) delete it.hidden; else it.hidden = true;
    row.classList.toggle("off", !!it.hidden);
    markDirty();
  }

  // ------------------------------------------------------------------ sheet helpers
  function openSheet(html){ $("sheet").innerHTML = html; $("sheetWrap").hidden = false; $("sheetWrap").scrollTop = 0; document.body.style.overflow="hidden"; }
  function closeSheet(){ $("sheetWrap").hidden = true; $("sheet").innerHTML = ""; document.body.style.overflow=""; }
  function langFields(prefix, obj, label, textarea, ph){
    return '<div class="section-label">'+esc(label)+'</div>'+LANGS.map(function(l){
      var inp = textarea
        ? '<textarea id="'+prefix+'_'+l+'" rows="2">'+esc(obj[l])+'</textarea>'
        : '<input id="'+prefix+'_'+l+'" value="'+esc(obj[l])+'"'+(ph?' placeholder="'+esc(ph)+'"':"")+'>';
      return '<label class="field"><span><span class="lang-tag">'+LANG_LABEL[l]+'</span></span>'+inp+'</label>';
    }).join("");
  }
  function readLang(prefix){ var o={}; LANGS.forEach(function(l){ o[l] = $(prefix+"_"+l).value.trim(); }); return o; }

  // ------------------------------------------------------------------ item editor
  function openItemEditor(item, catId){
    var isNew = !item;
    var d = isNew ? { id:"", img:"", unit:"", price:0, name:L3(), desc:L3() } : clone(item);
    var photo = { value: d.img, pending: null };   // pending = processed new photo

    var catOpts = ["food","drinks"].map(function(g){
      return '<optgroup label="'+esc(T(g))+'">'+catsOf(g).map(function(c){
        return '<option value="'+esc(c.id)+'"'+(c.id===catId?" selected":"")+'>'+esc((c.icon||"")+" "+pick(c.name))+'</option>';
      }).join("")+'</optgroup>';
    }).join("");

    openSheet(
      '<h3>'+esc(isNew?T("newItem"):T("editItem"))+'<button class="icon-btn sm" data-x>✕</button></h3>'+
      '<div class="photo"><div class="photo-box" id="phBox"></div><div class="photo-acts">'+
        '<button class="btn btn-ghost btn-sm" id="phPick"></button>'+
        '<button class="btn btn-danger btn-sm" id="phDel">'+esc(T("removePhoto"))+'</button>'+
        '<div class="hint">'+esc(T("photoHint"))+'</div>'+
        '<input type="file" id="phFile" accept="image/*" hidden></div></div>'+
      langFields("nm", d.name, T("names"), false)+
      '<div class="row2">'+
        '<label class="field" id="fPrice"><span>'+esc(T("price"))+' <span class="req">*</span></span><input id="iPrice" inputmode="numeric" value="'+esc(d.price?money(d.price):"")+'"></label>'+
        '<label class="field"><span>'+esc(T("unit"))+'</span><input id="iUnit" value="'+esc(d.unit)+'" placeholder="'+esc(T("unitPh"))+'"></label>'+
      '</div>'+
      '<div class="row2">'+
        '<label class="field"><span>'+esc(T("category"))+'</span><select id="iCat">'+catOpts+'</select></label>'+
        '<div class="field" style="display:flex;align-items:flex-end;padding-bottom:8px"><label class="switch"><input type="checkbox" id="iVis"'+(d.hidden?"":" checked")+'><span class="track"></span>'+esc(T("visible"))+'</label></div>'+
      '</div>'+
      langFields("ds", d.desc, T("descs"), true)+
      '<div class="sheet-foot">'+
        (isNew?"":'<button class="btn btn-danger" id="iDel">'+esc(T("del"))+'</button>')+
        '<div class="right"><button class="btn btn-ghost" data-x>'+esc(T("cancel"))+'</button><button class="btn btn-primary" id="iSave">'+esc(T("done"))+'</button></div>'+
      '</div>'
    );

    function drawPhoto(){
      var src = photo.pending ? photo.pending.dataUrl : imgSrc(photo.value);
      var cat = findCat($("iCat").value) || {};
      $("phBox").innerHTML = src ? '<img src="'+esc(src)+'" alt="" onerror="this.remove()">' : esc(cat.icon||"🍽");
      $("phPick").textContent = src ? T("replacePhoto") : T("uploadPhoto");
      $("phDel").hidden = !src;
    }
    drawPhoto();

    $("phPick").onclick = function(){ $("phFile").click(); };
    $("phFile").onchange = function(e){
      var f = e.target.files && e.target.files[0]; if(!f) return;
      busy(true, T("busyPhoto"));
      processImage(f).then(function(p){ photo.pending = p; photo.value = p.value; drawPhoto(); })
        .catch(function(){ toast(T("errPhoto"), "err"); })
        .finally(function(){ busy(false); e.target.value = ""; });
    };
    $("phDel").onclick = function(){ photo.pending = null; photo.value = ""; drawPhoto(); };
    $("iCat").onchange = drawPhoto;
    $("iPrice").oninput = function(e){
      var digits = e.target.value.replace(/\D/g,"");
      e.target.value = digits ? money(parseInt(digits,10)) : "";
    };
    $("sheet").querySelectorAll("[data-x]").forEach(function(b){ b.onclick = closeSheet; });

    if(!isNew) $("iDel").onclick = function(){
      if(!confirm(T("delItemQ",{n:pick(item.name)}))) return;
      var c = findCat(catId); c.items.splice(c.items.indexOf(item), 1);
      markDirty(); closeSheet(); renderCats(); renderItems();
    };

    $("iSave").onclick = function(){
      var name = readLang("nm");
      if(!name.ru && !name.uz && !name.en){ toast(T("nameReq"), "err"); $("nm_ru").focus(); return; }
      var digits = $("iPrice").value.replace(/\D/g,"");
      if(!digits){ $("fPrice").classList.add("err"); toast(T("priceErr"), "err"); $("iPrice").focus(); return; }
      d.name = name; d.desc = readLang("ds");
      d.price = parseInt(digits, 10);
      d.unit = $("iUnit").value.trim();
      d.img = photo.value || "";
      if($("iVis").checked) delete d.hidden; else d.hidden = true;
      if(photo.pending) addNewImage(photo.pending.path, photo.pending.b64);

      var newCat = findCat($("iCat").value);
      if(isNew){
        d.id = makeId(name.en || name.uz || name.ru);
        newCat.items.push(d);
      } else {
        var oldCat = findCat(catId), idx = oldCat.items.indexOf(item);
        if(newCat === oldCat) oldCat.items[idx] = d;
        else { oldCat.items.splice(idx, 1); newCat.items.push(d); }
      }
      markDirty(); closeSheet();
      if(!S.search && newCat.group!==S.group){ S.group = newCat.group; }
      if(!S.search) S.catId = newCat.id;
      renderAll();
    };
  }

  function slug(s){
    var map = {"ʻ":"","‘":"","’":"","'":"","ё":"e"};
    s = String(s||"").toLowerCase().replace(/[ʻ‘’'ё]/g, function(c){ return map[c]; });
    return s.replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,28);
  }
  function makeId(base){
    var taken = allItemIds(), b = slug(base) || "item", id = b, n = 2;
    while(taken[id]) id = b+"_"+(n++);
    return id;
  }

  // ------------------------------------------------------------------ category editor
  function openCatEditor(cat){
    var isNew = !cat;
    var d = isNew ? { id:"", group:S.group, icon:"🍽", name:L3(), items:[] } : cat;
    var icon = d.icon || "🍽";
    openSheet(
      '<h3>'+esc(isNew?T("newCat"):T("editCatTitle"))+'<button class="icon-btn sm" data-x>✕</button></h3>'+
      langFields("cn", d.name, T("names"), false)+
      '<div class="row2">'+
        '<label class="field"><span>'+esc(T("group"))+'</span><select id="cGroup">'+
          ["food","drinks"].map(function(g){ return '<option value="'+g+'"'+(d.group===g?" selected":"")+'>'+esc(T(g))+'</option>'; }).join("")+
        '</select></label>'+
        '<label class="field"><span>'+esc(T("icon"))+'</span><input id="cIcon" value="'+esc(icon)+'" maxlength="8"></label>'+
      '</div>'+
      '<div class="emoji-grid" id="cEmoji">'+EMOJI.map(function(e){ return '<button type="button" data-e="'+e+'"'+(e===icon?' class="sel"':"")+'>'+e+'</button>'; }).join("")+'</div>'+
      '<div style="margin-top:16px"><label class="switch"><input type="checkbox" id="cVis"'+(d.hidden?"":" checked")+'><span class="track"></span>'+esc(T("catVisible"))+'</label></div>'+
      '<div class="sheet-foot">'+
        (isNew?"":'<button class="btn btn-danger" id="cDel">'+esc(T("del"))+'</button>')+
        '<div class="right"><button class="btn btn-ghost" data-x>'+esc(T("cancel"))+'</button><button class="btn btn-primary" id="cSave">'+esc(T("done"))+'</button></div>'+
      '</div>'
    );
    $("sheet").querySelectorAll("[data-x]").forEach(function(b){ b.onclick = closeSheet; });
    $("cEmoji").onclick = function(e){
      var b = e.target.closest("[data-e]"); if(!b) return;
      $("cIcon").value = b.getAttribute("data-e");
      $("cEmoji").querySelectorAll("button").forEach(function(x){ x.classList.toggle("sel", x===b); });
    };
    if(!isNew) $("cDel").onclick = function(){
      var q = cat.items.length ? T("delCatItemsQ",{n:pick(cat.name), c:cat.items.length}) : T("delCatQ",{n:pick(cat.name)});
      if(!confirm(q)) return;
      S.menu.categories.splice(S.menu.categories.indexOf(cat), 1);
      S.catId = firstCatId(); markDirty(); closeSheet(); renderAll();
    };
    $("cSave").onclick = function(){
      var name = readLang("cn");
      if(!name.ru && !name.uz && !name.en){ toast(T("nameReq"), "err"); $("cn_ru").focus(); return; }
      d.name = name; d.icon = $("cIcon").value.trim() || "🍽";
      if($("cVis").checked) delete d.hidden; else d.hidden = true;
      var g = $("cGroup").value;
      if(isNew){
        var taken = {}; S.menu.categories.forEach(function(c){ taken[c.id]=1; });
        var b = slug(name.en || name.uz || name.ru) || "cat", id = b, n = 2;
        while(taken[id]) id = b+"_"+(n++);
        d.id = id; d.group = g;
        // insert after the last category of that group
        var last = -1; S.menu.categories.forEach(function(c,i){ if(c.group===g) last = i; });
        S.menu.categories.splice(last+1, 0, d);
      } else if(g !== d.group){
        // move to the end of the other group
        S.menu.categories.splice(S.menu.categories.indexOf(d), 1);
        d.group = g;
        var lastG = -1; S.menu.categories.forEach(function(c,i){ if(c.group===g) lastG = i; });
        S.menu.categories.splice(lastG+1, 0, d);
      }
      S.group = d.group; S.catId = d.id; clearSearch();
      markDirty(); closeSheet(); renderAll();
    };
  }

  // ------------------------------------------------------------------ settings
  function openSettings(){
    var ui = S.menu.ui || {};
    var pn = L3(ui.priceNote);
    openSheet(
      '<h3>'+esc(T("settings"))+'<button class="icon-btn sm" data-x>✕</button></h3>'+
      '<p class="muted" style="margin:0 0 6px;font-size:13px">'+esc(T("lastUpdate"))+': <b>'+esc(S.menu.updatedAt ? new Date(S.menu.updatedAt).toLocaleString() : "—")+'</b></p>'+
      langFields("pn", pn, T("priceNote"), true)+
      '<div class="sheet-foot"><button class="btn btn-danger" id="sLogout">'+esc(T("logout"))+'</button>'+
      '<div class="right"><button class="btn btn-ghost" data-x>'+esc(T("cancel"))+'</button><button class="btn btn-primary" id="sSave">'+esc(T("save"))+'</button></div></div>'
    );
    $("sheet").querySelectorAll("[data-x]").forEach(function(b){ b.onclick = closeSheet; });
    $("sLogout").onclick = function(){
      if(S.dirty && !confirm(T("leaveQ")+" "+T("discardQ"))) return;
      setPassword(""); clearDraft(); S.dirty=false; closeSheet(); showLogin();
    };
    $("sSave").onclick = function(){
      var newPn = readLang("pn");
      if(JSON.stringify(newPn) !== JSON.stringify(pn)){ S.menu.ui = S.menu.ui || {}; S.menu.ui.priceNote = newPn; markDirty(); }
      closeSheet(); renderAll();
    };
  }

  // ------------------------------------------------------------------ publish
  // Photos are sent in small batches (the server takes a limited number per request);
  // the menu itself is switched over only with the last request, so tablets never see missing photos.
  var BATCH_MAX_COUNT = 8, BATCH_MAX_CHARS = 3000000;
  function publish(){
    if(!S.dirty){ toast(T("pubNothing")); return; }
    var used = {}; S.menu.categories.forEach(function(c){ c.items.forEach(function(it){ var f=imgFile(it.img); if(f) used[f]=1; }); });
    var images = Object.keys(S.newImages).filter(function(f){ return used[f]; }).map(function(f){ return { name:f, b64:S.newImages[f] }; });
    var batches = [], cur = [], size = 0;
    images.forEach(function(im){
      if(cur.length && (cur.length >= BATCH_MAX_COUNT || size + im.b64.length > BATCH_MAX_CHARS)){ batches.push(cur); cur = []; size = 0; }
      cur.push(im); size += im.b64.length;
    });
    if(cur.length) batches.push(cur);
    if(!batches.length) batches.push([]);

    var finalMenu = cleanForSave(S.menu), base, liveMenu;
    busy(true, T("busyPub"));
    C.read().catch(function(){ throw new ApiError(0, T("errNet")); }).then(function(row){
      var liveUpdated = row ? row.updated_at : null;
      if(liveUpdated !== (S.baseUpdated || null)){
        busy(false);
        if(!confirm(T("conflict"))) throw "cancel";
        busy(true, T("busyPub"));
      }
      base = liveUpdated;
      if(row){ liveMenu = row.data; return; }
      // first publish ever: while photos upload, keep the site's built-in menu live
      return fetch("menu-data.js?t="+Date.now(), { cache:"no-store" }).then(function(r){ return r.text(); })
        .then(function(t){ liveMenu = cleanForSave(parseMenu(t)); });
    }).then(function(){
      var chain = Promise.resolve(), done = 0;
      batches.forEach(function(batch, k){
        var last = k === batches.length - 1;
        chain = chain.then(function(){
          if(images.length) busy(true, T("busyPhotos", { a:done, b:images.length }));
          return api({ action:"save", menu: last ? finalMenu : liveMenu, baseUpdatedAt: base, images: batch });
        }).then(function(d){ base = d.updatedAt; done += batch.length; return d; });
      });
      return chain;
    }).then(function(d){
      S.baseUpdated = d.updatedAt; S.menu.updatedAt = d.updatedAt; S.newImages = {}; S.dirty = false;
      clearDraft(); renderAll();
      toast(T("pubOk"), "ok", 6000);
    }).catch(function(e){
      if(e === "cancel") return;
      toast(e && e.status===409 ? T("conflict").split(".")[0]+"." : errText(e), "err", 7000);
      if(e && e.status===401){ setPassword(""); showLogin(errText(e)); }
    }).finally(function(){ busy(false); });
  }

  function discard(){
    if(!confirm(T("discardQ"))) return;
    clearDraft();
    loadMenu().then(function(){ S.catId = firstCatId(); renderAll(); }).catch(function(e){ toast(errText(e), "err"); });
  }

  // ------------------------------------------------------------------ wire up
  $("loginBtn").onclick = doLogin;
  $("passInput").addEventListener("keydown", function(e){ if(e.key==="Enter") doLogin(); });
  $("cats").addEventListener("click", onCatsClick);
  $("items").addEventListener("click", onItemsClick);
  $("items").addEventListener("change", onItemsChange);
  $("publishBtn").onclick = publish;
  $("discardBtn").onclick = discard;
  $("settingsBtn").onclick = openSettings;
  $("searchInput").addEventListener("input", function(e){ S.search = e.target.value.trim(); renderCats(); renderItems(); });
  $("sheetWrap").addEventListener("click", function(e){ if(e.target === $("sheetWrap")) closeSheet(); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && !$("sheetWrap").hidden) closeSheet(); });
  window.addEventListener("beforeunload", function(e){ if(S.dirty){ e.preventDefault(); e.returnValue = T("leaveQ"); } });

  // for tests
  window.__mgAdmin = { parseMenu:parseMenu, state:S };

  boot();
})();
