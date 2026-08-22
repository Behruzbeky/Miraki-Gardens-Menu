/* Miraki Gardens menu — offline service worker */
var CACHE = "miraki-menu-v1";
var CORE = [
  "index.html", "styles.css", "app.js", "menu-data.js", "manifest.json",
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

// cache-first, then network; runtime-cache images and anything successfully fetched
self.addEventListener("fetch", function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        if(res && res.status===200 && res.type==="basic"){
          var copy=res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return res;
      }).catch(function(){ return caches.match("index.html"); });
    })
  );
});
