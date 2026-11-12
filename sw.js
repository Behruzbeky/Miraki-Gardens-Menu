/* Miraki Gardens menu — offline service worker
   - photos from cloud storage: cache first
   - pages, scripts, styles, menu-data.js: network first (fresh menu after admin edits), cache as offline fallback
   - images: cache first (photo files never change; new photos get new file names) */
var CACHE = "miraki-menu-v3";
var CORE = [
  "./", "index.html", "styles.css", "app.js", "menu-data.js", "cloud-config.js", "manifest.json",
  "images/logo.png", "images/icon-192.png", "images/icon-512.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

function put(req, res){
  if(res && res.status===200 && res.type==="basic"){
    var copy=res.clone();
    caches.open(CACHE).then(function(c){ c.put(req, copy); });
  }
  return res;
}

self.addEventListener("fetch", function(e){
  var req=e.request;
  if(req.method!=="GET") return;
  var url=new URL(req.url);
  // photos uploaded from the admin panel (cloud storage): cache first, they never change
  if(/\/storage\/v1\/object\/public\//.test(url.pathname)){
    e.respondWith(caches.match(req).then(function(hit){
      return hit || fetch(req).then(function(res){
        if(res && (res.ok || res.type==="opaque")){ var copy=res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
        return res;
      });
    }));
    return;
  }
  if(url.origin!==self.location.origin) return;           // fonts, cloud API etc. go straight to network
  if(url.pathname.indexOf("admin")>=0) return;             // admin panel always online
  if(url.search) return;                                   // update checks (?check=…) bypass the cache

  if(/\/images\//.test(url.pathname)){
    e.respondWith(caches.match(req).then(function(hit){
      return hit || fetch(req).then(function(res){ return put(req, res); });
    }));
    return;
  }

  e.respondWith(
    fetch(req.mode==="navigate" ? req : new Request(req, {cache:"no-cache"})).then(function(res){ return put(req, res); })
      .catch(function(){
        return caches.match(req).then(function(hit){ return hit || caches.match("index.html"); });
      })
  );
});
