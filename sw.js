/* Summit Math 8 — service worker (offline-first) */
var CACHE = "summit-math-8-v2";
var CORE = ["./", "./index.html", "./manifest.json", "./icon.svg", "./install-button.js"];
self.addEventListener("install", function(e){ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).catch(function(){})); });
self.addEventListener("activate", function(e){ e.waitUntil(caches.keys().then(function(keys){ return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener("fetch", function(e){ if(e.request.method!=="GET") return; e.respondWith(caches.match(e.request).then(function(c){ if(c) return c; return fetch(e.request).then(function(res){ try{ var cp=res.clone(); caches.open(CACHE).then(function(ca){ ca.put(e.request,cp); }).catch(function(){}); }catch(err){} return res; }).catch(function(){ if(e.request.mode==="navigate") return caches.match("./index.html"); }); })); });
