/* Miraki Gardens — menu admin panel
   Edits menu-data.js and photos in the GitHub repo that hosts the menu (GitHub Pages).
   No server: changes are committed with the GitHub API using a personal access token
   that is stored only on this device. */
(function(){
  "use strict";

  // ------------------------------------------------------------------ config
  var DEFAULT_CFG = { owner:"Behruzbeky", repo:"miraki-gardens-menu", branch:"main", token:"" };
  var DATA_PATH = "menu-data.js";
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
      tokenLabel:"Ключ доступа (GitHub token)",
      loginBtn:"Войти",
      pinLabel:"Код доступа", useToken:"Настроить заново по ключу GitHub", usePin:"← Войти по коду",
      newPinLabel:"Код для сотрудников", newPinHintSet:"Этот код сотрудники будут вводить для входа.",
      newPinHintKeep:"Оставьте пустым, чтобы не менять текущий код.",
      setupNote:"Настройка этого устройства (один раз): вставьте ключ GitHub и задайте код. Дальше на этом устройстве вход только по коду.",
      pinWrong:"Неверный код", pinWait:"Слишком много попыток. Подождите {s} сек.",
      pinShort:"Код должен быть не короче 4 цифр", pinSaved:"Новый код сохранён на этом устройстве.",
      noLock:"На этом устройстве вход ещё не настроен — нужен ключ GitHub.", pinWiped:"Слишком много неверных попыток — ключ удалён с этого устройства. Нужна повторная настройка с ключом GitHub.", lockNow:"Заблокировать",
      pinStale:"Код верный, но сохранённый ключ GitHub больше не работает. Владельцу нужно войти по новому ключу.",
      changePin:"Новый код для сотрудников",
      howtoTitle:"Как получить ключ доступа (делается один раз)",
      howto:[
        "Войдите в аккаунт GitHub, которому принадлежит сайт меню.",
        "Откройте <b>github.com/settings/personal-access-tokens/new</b> (Settings → Developer settings → Fine-grained tokens → Generate new token).",
        "Название — например <code>Miraki menu admin</code>. Срок действия — 1 год (или «No expiration»).",
        "Repository access → <b>Only select repositories</b> → выберите <code>miraki-gardens-menu</code>.",
        "Permissions → Repository permissions → <b>Contents: Read and write</b>.",
        "Нажмите <b>Generate token</b>, скопируйте ключ (начинается с <code>github_pat_</code>) и вставьте сюда."
      ],
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
      busyLoad:"Загружаю меню…", busyPhoto:"Обрабатываю фото…", busyPub:"Публикую…",
      pubOk:"Опубликовано! На планшетах меню обновится в течение 1–10 минут.",
      pubNothing:"Нет изменений для публикации.",
      conflict:"Меню уже изменили с другого устройства после того, как вы его открыли. Если продолжить — ваши изменения заменят чужие. Продолжить?",
      draftQ:"Найден неопубликованный черновик ({d}). Продолжить с ним?\n\n«Отмена» — загрузить опубликованное меню.",
      discardQ:"Отменить все неопубликованные изменения?",
      leaveQ:"Есть неопубликованные изменения.",
      errToken:"Ключ не подходит или устарел. Войдите заново.",
      errPerm:"У ключа нет права на запись. Проверьте: Contents — Read and write, доступ к репозиторию miraki-gardens-menu.",
      errNet:"Нет связи с GitHub. Проверьте интернет и попробуйте ещё раз.",
      errGeneric:"Ошибка: ",
      errPhoto:"Не удалось открыть фото. Попробуйте другое (JPG или PNG).",
      draftFull:"Черновик слишком большой для памяти устройства — опубликуйте изменения, чтобы не потерять фото.",
      settings:"Настройки", repoSettings:"Репозиторий (менять не нужно)", owner:"Владелец", repo:"Репозиторий", branch:"Ветка",
      logout:"Удалить ключ с этого устройства", save:"Сохранить",
      lastUpdate:"Последнее обновление меню",
      texts:"Тексты меню", priceNote:"Примечание под названием категории", tagline:"Слоган",
      cmsg:"Обновление меню через админ-панель"
    },
    uz:{
      loginTitle:"Menyu admin paneli",
      loginText:"Bu yerda taomlar, narxlar, rasmlar va kategoriyalarni o‘zgartirish mumkin. O‘zgarishlar e’lon qilingandan keyin planshetlarda chiqadi.",
      tokenLabel:"Kirish kaliti (GitHub token)",
      loginBtn:"Kirish",
      pinLabel:"Kirish kodi", useToken:"GitHub kaliti bilan qayta sozlash", usePin:"← Kod bilan kirish",
      newPinLabel:"Xodimlar uchun kod", newPinHintSet:"Xodimlar kirish uchun shu kodni kiritadi.",
      newPinHintKeep:"Joriy kodni o‘zgartirmaslik uchun bo‘sh qoldiring.",
      setupNote:"Bu qurilmani sozlash (bir marta): GitHub kalitini qo‘ying va kod belgilang. Keyin bu qurilmada faqat kod bilan kiriladi.",
      pinWrong:"Kod noto‘g‘ri", pinWait:"Juda ko‘p urinish. {s} soniya kuting.",
      pinShort:"Kod kamida 4 ta raqam bo‘lishi kerak", pinSaved:"Yangi kod shu qurilmada saqlandi.",
      noLock:"Bu qurilmada kirish hali sozlanmagan — GitHub kaliti kerak.", pinWiped:"Juda ko‘p noto‘g‘ri urinish — kalit bu qurilmadan o‘chirildi. GitHub kaliti bilan qayta sozlash kerak.", lockNow:"Qulflash",
      pinStale:"Kod to‘g‘ri, lekin saqlangan GitHub kaliti endi ishlamaydi. Egasi yangi kalit bilan kirishi kerak.",
      changePin:"Xodimlar uchun yangi kod",
      howtoTitle:"Kirish kalitini qanday olish (bir marta qilinadi)",
      howto:[
        "Menyu sayti tegishli bo‘lgan GitHub akkauntiga kiring.",
        "<b>github.com/settings/personal-access-tokens/new</b> sahifasini oching (Settings → Developer settings → Fine-grained tokens → Generate new token).",
        "Nomi — masalan <code>Miraki menu admin</code>. Muddati — 1 yil (yoki «No expiration»).",
        "Repository access → <b>Only select repositories</b> → <code>miraki-gardens-menu</code> ni tanlang.",
        "Permissions → Repository permissions → <b>Contents: Read and write</b>.",
        "<b>Generate token</b> ni bosing, kalitni nusxalang (<code>github_pat_</code> bilan boshlanadi) va shu yerga qo‘ying."
      ],
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
      busyLoad:"Menyu yuklanmoqda…", busyPhoto:"Rasm tayyorlanmoqda…", busyPub:"E’lon qilinmoqda…",
      pubOk:"E’lon qilindi! Planshetlarda menyu 1–10 daqiqada yangilanadi.",
      pubNothing:"E’lon qilish uchun o‘zgarish yo‘q.",
      conflict:"Siz ochgandan keyin menyu boshqa qurilmadan o‘zgartirilgan. Davom etsangiz, sizning o‘zgarishlaringiz ularning o‘rnini egallaydi. Davom etilsinmi?",
      draftQ:"E’lon qilinmagan qoralama topildi ({d}). U bilan davom etilsinmi?\n\n«Bekor qilish» — e’lon qilingan menyuni yuklash.",
      discardQ:"Barcha e’lon qilinmagan o‘zgarishlar bekor qilinsinmi?",
      leaveQ:"E’lon qilinmagan o‘zgarishlar bor.",
      errToken:"Kalit mos emas yoki muddati o‘tgan. Qaytadan kiring.",
      errPerm:"Kalitda yozish huquqi yo‘q. Tekshiring: Contents — Read and write, miraki-gardens-menu repozitoriyasiga ruxsat.",
      errNet:"GitHub bilan aloqa yo‘q. Internetni tekshirib, qayta urinib ko‘ring.",
      errGeneric:"Xatolik: ",
      errPhoto:"Rasmni ochib bo‘lmadi. Boshqasini sinab ko‘ring (JPG yoki PNG).",
      draftFull:"Qoralama qurilma xotirasiga sig‘madi — rasmlar yo‘qolmasligi uchun o‘zgarishlarni e’lon qiling.",
      settings:"Sozlamalar", repoSettings:"Repozitoriy (o‘zgartirish shart emas)", owner:"Egasi", repo:"Repozitoriy", branch:"Branch",
      logout:"Kalitni bu qurilmadan o‘chirish", save:"Saqlash",
      lastUpdate:"Menyu oxirgi marta yangilangan",
      texts:"Menyu matnlari", priceNote:"Kategoriya nomi ostidagi izoh", tagline:"Shior",
      cmsg:"Admin panel orqali menyu yangilandi"
    }
  };

  // ------------------------------------------------------------------ state
  var storedCfg = readJSON("mg_admin_cfg") || {};
  var LEGACY_TOKEN = storedCfg.token || "";            // key saved in plain text by the first version
  var cfg = Object.assign({}, DEFAULT_CFG, storedCfg, { token:"" });
  try{ cfg.token = sessionStorage.getItem("mg_admin_tok") || ""; }catch(e){}
  function saveCfg(){ writeJSON("mg_admin_cfg", { owner:cfg.owner, repo:cfg.repo, branch:cfg.branch }); }
  var S = {
    lang: (function(){ try{ return localStorage.getItem("mg_admin_lang") || "ru"; }catch(e){ return "ru"; } })(),
    menu: null,          // working copy of window.MENU
    baseSha: null,       // commit the working copy started from
    origText: null,      // menu-data.js text at baseSha
    newImages: {},       // "images/<file>" -> base64, not yet published
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
  function draftKey(){ return "mg_admin_draft:"+cfg.owner+"/"+cfg.repo+"@"+cfg.branch; }

  function utf8ToB64(str){
    var bytes = new TextEncoder().encode(str), bin = "";
    for(var i=0;i<bytes.length;i+=0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i,i+0x8000));
    return btoa(bin);
  }
  function b64ToUtf8(b64){
    var bin = atob(String(b64).replace(/\s/g,"")), bytes = new Uint8Array(bin.length);
    for(var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function toast(msg, kind, ms){
    var el=$("toast"); el.textContent=msg; el.className="toast"+(kind?" "+kind:""); el.hidden=false;
    clearTimeout(toast._t); toast._t=setTimeout(function(){ el.hidden=true; }, ms || 3800);
  }
  function busy(on, text){ $("busy").hidden=!on; $("busyText").textContent=text||""; }

  // ------------------------------------------------------------------ GitHub API
  function ApiError(status, msg){ this.status=status; this.message=msg; }
  function gh(path, opts){
    opts = opts || {};
    var url = "https://api.github.com/repos/"+cfg.owner+"/"+cfg.repo+"/"+path;
    var init = { method: opts.method || "GET", cache:"no-store",
      headers: { "Accept":"application/vnd.github+json", "Authorization":"Bearer "+cfg.token, "X-GitHub-Api-Version":"2022-11-28" } };
    if(opts.body){ init.body = JSON.stringify(opts.body); init.headers["Content-Type"]="application/json"; }
    return fetch(url, init).catch(function(){ throw new ApiError(0, T("errNet")); }).then(function(r){
      return r.text().then(function(txt){
        var data=null; try{ data = txt ? JSON.parse(txt) : null; }catch(e){}
        if(!r.ok) throw new ApiError(r.status, (data && data.message) || ("HTTP "+r.status));
        return data;
      });
    });
  }
  function errText(e){
    if(!e) return T("errGeneric");
    if(e.status===0) return T("errNet");
    if(e.status===401) return T("errToken");
    if(e.status===403 || e.status===404) return T("errPerm");
    return T("errGeneric") + (e.message || e);
  }
  function getHeadSha(){ return gh("git/ref/heads/"+encodeURIComponent(cfg.branch)).then(function(r){ return r.object.sha; }); }
  function getFileText(path, ref){
    return gh("contents/"+path+"?ref="+encodeURIComponent(ref)).then(function(r){
      if(r.content && r.encoding==="base64") return b64ToUtf8(r.content);
      // files >1MB come without inline content — fall back to the blob API
      return gh("git/blobs/"+r.sha).then(function(b){ return b64ToUtf8(b.content); });
    });
  }

  // ------------------------------------------------------------------ menu-data.js parse / serialize
  function parseMenu(text){
    var sandbox = {};
    /* the file is our own data file: `window.MENU = {...}` */
    new Function("window", text)(sandbox);
    if(!sandbox.MENU || !Array.isArray(sandbox.MENU.categories)) throw new Error("menu-data.js: MENU not found");
    var m = sandbox.MENU;
    m.categories.forEach(function(c){
      c.name = L3(c.name); c.items = c.items || [];
      c.items.forEach(function(it){ it.name=L3(it.name); it.desc=L3(it.desc); it.price=Number(it.price)||0; if(it.img==null) it.img=""; if(it.unit==null) it.unit=""; });
    });
    return m;
  }
  function orderKeys(obj, keys){
    var out = {};
    keys.forEach(function(k){ if(obj[k]!==undefined) out[k]=obj[k]; });
    Object.keys(obj).forEach(function(k){ if(!(k in out)) out[k]=obj[k]; });
    return out;
  }
  function cleanItem(it){
    var o = clone(it);
    if(!o.hidden) delete o.hidden;
    return orderKeys(o, ["id","img","unit","price","hidden","name","desc"]);
  }
  function serialize(m){
    var L = [];
    L.push("/* Miraki Gardens — tablet menu data");
    L.push("   Edited with admin.html — you can also edit this file by hand (it is plain JSON after `window.MENU =`).");
    L.push("   Languages: uz (O'zbekcha), ru (Русский), en (English)");
    L.push("   price: integer in so'm. img: photo file in images/ (name without .webp, or full name with extension).");
    L.push("   hidden: true = not shown on the tablets (stop-list). */");
    L.push("window.MENU = {");
    L.push('  "updatedAt": '+JSON.stringify(m.updatedAt || new Date().toISOString())+",");
    Object.keys(m).forEach(function(k){
      if(k==="updatedAt" || k==="categories") return;
      L.push('  '+JSON.stringify(k)+': '+JSON.stringify(m[k], null, 2).replace(/\n/g,"\n  ")+",");
    });
    L.push('  "categories": [');
    m.categories.forEach(function(c, ci){
      var head = {};
      head.id=c.id; head.group=c.group; head.icon=c.icon; if(c.hidden) head.hidden=true; head.name=c.name;
      Object.keys(c).forEach(function(k){ if(!(k in head) && k!=="items" && k!=="hidden") head[k]=c[k]; });
      var hs = JSON.stringify(head);
      L.push("    "+hs.slice(0,-1)+', "items": [');
      c.items.forEach(function(it, ii){ L.push("      "+JSON.stringify(cleanItem(it))+(ii<c.items.length-1?",":"")); });
      L.push("    ]}"+(ci<m.categories.length-1?",":""));
    });
    L.push("  ]");
    L.push("};");
    return L.join("\n")+"\n";
  }

  // ------------------------------------------------------------------ images
  function imgFile(img){ if(!img) return null; return img.indexOf(".")>=0 ? img : img+".webp"; }
  function imgSrc(img){
    var f = imgFile(img); if(!f) return null;
    var key = "images/"+f;
    if(S.newImages[key]) return "data:image/"+(/\.jpe?g$/i.test(f)?"jpeg":"webp")+";base64,"+S.newImages[key];
    return "images/"+f;
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
          var name = "p"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
          resolve({ value: ext==="webp" ? name : name+"."+ext, path:"images/"+name+"."+ext, b64:data.split(",")[1], dataUrl:data });
        }catch(e){ reject(e); }
      };
      img.onerror = function(){ URL.revokeObjectURL(url); reject(new Error("image")); };
      img.src = url;
    });
  }

  // ------------------------------------------------------------------ draft (local autosave)
  function markDirty(){ S.dirty = true; saveDraft(); renderStatus(); }
  function saveDraft(){
    try{
      writeJSON(draftKey(), { menu:S.menu, baseSha:S.baseSha, origText:S.origText, newImages:S.newImages, ts:Date.now() });
    }catch(e){
      try{ writeJSON(draftKey(), { menu:S.menu, baseSha:S.baseSha, origText:S.origText, newImages:{}, ts:Date.now() }); }catch(e2){}
      toast(T("draftFull"), "err", 6000);
    }
  }
  function clearDraft(){ try{ localStorage.removeItem(draftKey()); }catch(e){} }

  // ------------------------------------------------------------------ load
  function loadFromGitHub(){
    busy(true, T("busyLoad"));
    return getHeadSha().then(function(sha){
      return getFileText(DATA_PATH, sha).then(function(text){
        S.baseSha = sha; S.origText = text; S.menu = parseMenu(text); S.newImages = {}; S.dirty = false;
      });
    }).finally(function(){ busy(false); });
  }
  function boot(){
    applyStaticTexts();
    if(!cfg.token){ showLogin(); return; }
    var draft = readJSON(draftKey());
    var p;
    if(draft && draft.menu && confirm(T("draftQ",{d:new Date(draft.ts).toLocaleString()}))){
      S.menu = draft.menu; S.baseSha = draft.baseSha; S.origText = draft.origText; S.newImages = draft.newImages || {}; S.dirty = true;
      p = Promise.resolve();
    } else {
      if(draft) clearDraft();
      p = loadFromGitHub();
    }
    p.then(showApp).catch(function(e){
      if(e && e.status===401){ setSessionToken(""); showLogin(errText(e)); }
      else { showLogin(errText(e)); }
    });
  }

  // ------------------------------------------------------------------ device code (PIN)
  // The GitHub key never leaves this device: it is stored here encrypted with the code
  // (PBKDF2-SHA256 + AES-GCM). Day to day the admin types only the code.
  var LOCK_KEY = "mg_admin_lock", TOK_KEY = "mg_admin_tok", PBKDF2_ITER = 310000, MAX_FAILS = 10;
  function bytesToB64(u8){ var s=""; for(var i=0;i<u8.length;i++) s+=String.fromCharCode(u8[i]); return btoa(s); }
  function b64ToBytes(b64){ var s=atob(b64), u=new Uint8Array(s.length); for(var i=0;i<s.length;i++) u[i]=s.charCodeAt(i); return u; }
  function pinKey(pin, salt, iter){
    return crypto.subtle.importKey("raw", new TextEncoder().encode(pin), "PBKDF2", false, ["deriveKey"]).then(function(k){
      return crypto.subtle.deriveKey({ name:"PBKDF2", salt:salt, iterations:iter, hash:"SHA-256" }, k, { name:"AES-GCM", length:256 }, false, ["encrypt","decrypt"]);
    });
  }
  function encryptToken(token, pin){
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return pinKey(pin, salt, PBKDF2_ITER).then(function(key){
      return crypto.subtle.encrypt({ name:"AES-GCM", iv:iv }, key, new TextEncoder().encode(token));
    }).then(function(ct){
      return { v:1, iter:PBKDF2_ITER, salt:bytesToB64(salt), iv:bytesToB64(iv), data:bytesToB64(new Uint8Array(ct)), fails:0 };
    });
  }
  function decryptToken(lock, pin){
    return pinKey(pin, b64ToBytes(lock.salt), lock.iter).then(function(key){
      return crypto.subtle.decrypt({ name:"AES-GCM", iv:b64ToBytes(lock.iv) }, key, b64ToBytes(lock.data));
    }).then(function(pt){ return new TextDecoder().decode(pt); });
  }
  function getLock(){ var l = readJSON(LOCK_KEY); return (l && l.data) ? l : null; }
  function saveLocalLock(pin){ return encryptToken(cfg.token, pin).then(function(l){ writeJSON(LOCK_KEY, l); }); }
  function removeLock(){ try{ localStorage.removeItem(LOCK_KEY); }catch(e){} }
  function setSessionToken(t){ cfg.token = t || ""; try{ if(t) sessionStorage.setItem(TOK_KEY, t); else sessionStorage.removeItem(TOK_KEY); }catch(e){} }
  function validPin(p){ return /^\d{4,16}$/.test(p); }

  // ------------------------------------------------------------------ login
  var pinBlockedUntil = 0;
  function showLogin(err, forceToken){
    $("app").hidden = true; $("login").hidden = false;
    setLoginErr(err);
    var lock = getLock(), tokenMode = forceToken || !lock;
    $("pinBox").hidden = tokenMode;
    $("tokenBox").hidden = !tokenMode;
    $("setupNote").hidden = false;
    $("toPinBtn").hidden = !lock;
    $("tokenInput").value = (!lock && LEGACY_TOKEN) ? LEGACY_TOKEN : "";
    $("pinInput").value = "";
    $("newPinInput").value = "8008";
    $("newPinHint").textContent = T("newPinHintSet");
    setTimeout(function(){ (tokenMode ? $("tokenInput") : $("pinInput")).focus(); }, 50);
  }
  function setLoginErr(msg){ $("loginErr").hidden = !msg; $("loginErr").textContent = msg || ""; }

  function enterWithToken(){
    return gh("").then(function(){ return loadFromGitHub(); }).then(function(){ showApp(); });
  }
  function doPinLogin(){
    var pin = $("pinInput").value.trim(), lock = getLock();
    if(!pin){ $("pinInput").focus(); return; }
    if(!lock){ showLogin(T("noLock"), true); return; }
    var wait = Math.ceil((pinBlockedUntil - Date.now())/1000);
    if(wait > 0){ setLoginErr(T("pinWait",{s:wait})); return; }
    $("pinBtn").disabled = true; setLoginErr("");
    decryptToken(lock, pin).then(function(tok){
      lock.fails = 0; writeJSON(LOCK_KEY, lock);
      setSessionToken(tok);
      busy(true, T("busyLoad"));
      return enterWithToken().catch(function(e){
        setSessionToken("");
        throw (e && e.status===401) ? new ApiError(-2, T("pinStale")) : e;
      });
    }, function(){
      lock.fails = (lock.fails||0) + 1;
      if(lock.fails >= MAX_FAILS){ removeLock(); throw new ApiError(-3, T("pinWiped")); }
      writeJSON(LOCK_KEY, lock);
      if(lock.fails % 5 === 0) pinBlockedUntil = Date.now() + 30000;
      throw new ApiError(-1, T("pinWrong"));
    }).catch(function(e){
      busy(false);
      if(e && e.status===-3){ showLogin(e.message, true); return; }
      setLoginErr(e && e.status<0 ? e.message : errText(e));
      $("pinInput").value = ""; $("pinInput").focus();
    }).finally(function(){ $("pinBtn").disabled = false; });
  }
  function doLogin(){ // owner: GitHub key + code for this device
    var tok = $("tokenInput").value.trim(), pin = $("newPinInput").value.trim();
    if(!tok){ $("tokenInput").focus(); return; }
    if(!validPin(pin)){ setLoginErr(T("pinShort")); $("newPinInput").focus(); return; }
    $("loginBtn").disabled = true; setLoginErr("");
    setSessionToken(tok);
    gh("").then(function(){ return saveLocalLock(pin); })
      .then(function(){ LEGACY_TOKEN = ""; saveCfg(); clearDraft(); return loadFromGitHub(); })
      .then(function(){ showApp(); })
      .catch(function(e){ setSessionToken(""); setLoginErr(errText(e)); })
      .finally(function(){ $("loginBtn").disabled = false; });
  }
  function lockNow(){ setSessionToken(""); closeSheet(); showLogin(); }

  // ------------------------------------------------------------------ static texts / lang
  function applyStaticTexts(){
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-t]").forEach(function(el){ el.textContent = T(el.getAttribute("data-t")); });
    $("howtoList").innerHTML = T("howto").map(function(s){ return "<li>"+s+"</li>"; }).join("");
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
    var isNewImg = it.img && S.newImages["images/"+imgFile(it.img)];
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
      if(photo.pending) S.newImages[photo.pending.path] = photo.pending.b64;

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
      '<div class="section-label">'+esc(T("pinLabel"))+'</div>'+
      '<label class="field"><span>'+esc(T("changePin"))+'</span><input id="sPin" class="pin" type="text" inputmode="numeric" maxlength="16" autocomplete="off">'+
      '<div class="hint">'+esc(T("newPinHintKeep"))+'</div></label>'+
      '<div class="section-label">'+esc(T("repoSettings"))+'</div>'+
      '<div class="row2"><label class="field"><span>'+esc(T("owner"))+'</span><input id="sOwner" value="'+esc(cfg.owner)+'"></label>'+
      '<label class="field"><span>'+esc(T("repo"))+'</span><input id="sRepo" value="'+esc(cfg.repo)+'"></label></div>'+
      '<label class="field"><span>'+esc(T("branch"))+'</span><input id="sBranch" value="'+esc(cfg.branch)+'"></label>'+
      '<div class="sheet-foot"><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-ghost" id="sLock">🔒 '+esc(T("lockNow"))+'</button>'+
      '<button class="btn btn-danger" id="sLogout">'+esc(T("logout"))+'</button></div>'+
      '<div class="right"><button class="btn btn-ghost" data-x>'+esc(T("cancel"))+'</button><button class="btn btn-primary" id="sSave">'+esc(T("save"))+'</button></div></div>'
    );
    $("sheet").querySelectorAll("[data-x]").forEach(function(b){ b.onclick = closeSheet; });
    $("sLock").onclick = lockNow;
    $("sLogout").onclick = function(){
      if(S.dirty && !confirm(T("leaveQ")+" "+T("discardQ"))) return;
      setSessionToken(""); removeLock(); clearDraft(); S.dirty=false; closeSheet(); showLogin();
    };
    $("sSave").onclick = function(){
      var newPin = $("sPin").value.trim();
      if(newPin){
        if(!validPin(newPin)){ toast(T("pinShort"), "err"); $("sPin").focus(); return; }
        busy(true, T("busyPub"));
        saveLocalLock(newPin).then(function(){ toast(T("pinSaved"), "ok", 6000); }, function(e){ toast(errText(e), "err", 7000); })
          .finally(function(){ busy(false); });
      }
      var newPn = readLang("pn");
      if(JSON.stringify(newPn) !== JSON.stringify(pn)){ S.menu.ui = S.menu.ui || {}; S.menu.ui.priceNote = newPn; markDirty(); }
      var o=$("sOwner").value.trim(), r=$("sRepo").value.trim(), b=$("sBranch").value.trim();
      var repoChanged = o!==cfg.owner || r!==cfg.repo || b!==cfg.branch;
      if(repoChanged && o && r && b){
        cfg.owner=o; cfg.repo=r; cfg.branch=b; saveCfg();
        closeSheet(); boot(); return;
      }
      closeSheet(); renderAll();
    };
  }

  // ------------------------------------------------------------------ publish
  function publish(){
    if(!S.dirty){ toast(T("pubNothing")); return; }
    busy(true, T("busyPub"));
    var head, text;
    getHeadSha().then(function(sha){
      head = sha;
      if(sha === S.baseSha) return true;
      return getFileText(DATA_PATH, sha).then(function(cur){ return cur === S.origText || confirm(T("conflict")); });
    }).then(function(go){
      if(!go) throw "cancel";
      S.menu.updatedAt = new Date().toISOString();
      text = serialize(S.menu);
      // only upload photos that are still used
      var used = {}; S.menu.categories.forEach(function(c){ c.items.forEach(function(it){ var f=imgFile(it.img); if(f) used["images/"+f]=1; }); });
      var paths = Object.keys(S.newImages).filter(function(p){ return used[p]; });
      return Promise.all(paths.map(function(p){
        return gh("git/blobs", { method:"POST", body:{ content:S.newImages[p], encoding:"base64" } })
          .then(function(b){ return { path:p, mode:"100644", type:"blob", sha:b.sha }; });
      }));
    }).then(function(entries){
      entries.push({ path:DATA_PATH, mode:"100644", type:"blob", content:text });
      return gh("git/commits/"+head).then(function(c){
        return gh("git/trees", { method:"POST", body:{ base_tree:c.tree.sha, tree:entries } });
      });
    }).then(function(tree){
      return gh("git/commits", { method:"POST", body:{ message:T("cmsg"), tree:tree.sha, parents:[head] } });
    }).then(function(commit){
      return gh("git/refs/heads/"+encodeURIComponent(cfg.branch), { method:"PATCH", body:{ sha:commit.sha, force:false } })
        .then(function(){ return commit.sha; });
    }).then(function(newSha){
      S.baseSha = newSha; S.origText = text; S.newImages = {}; S.dirty = false;
      clearDraft(); renderAll();
      toast(T("pubOk"), "ok", 6000);
    }).catch(function(e){
      if(e === "cancel") return;
      if(e && e.status===422) toast(T("conflict").split(".")[0]+". "+T("errGeneric")+e.message, "err", 7000);
      else toast(errText(e), "err", 7000);
      if(e && e.status===401){ setSessionToken(""); showLogin(errText(e)); }
    }).finally(function(){ busy(false); });
  }

  function discard(){
    if(!confirm(T("discardQ"))) return;
    clearDraft();
    loadFromGitHub().then(function(){ S.catId = firstCatId(); renderAll(); }).catch(function(e){ toast(errText(e), "err"); });
  }

  // ------------------------------------------------------------------ wire up
  $("loginBtn").onclick = doLogin;
  $("tokenInput").addEventListener("keydown", function(e){ if(e.key==="Enter") doLogin(); });
  $("pinBtn").onclick = doPinLogin;
  $("pinInput").addEventListener("keydown", function(e){ if(e.key==="Enter") doPinLogin(); });
  $("toTokenBtn").onclick = function(){ showLogin("", true); };
  $("toPinBtn").onclick = function(){ showLogin(""); };
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
  window.__mgAdmin = { serialize:serialize, parseMenu:parseMenu, state:S };

  boot();
})();
