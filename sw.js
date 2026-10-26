const CACHE='beetend-v130-cache';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('beetend-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'||new URL(req.url).pathname.endsWith('/index.html')){e.respondWith(fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return resp}).catch(()=>caches.match(req)));return}
 e.respondWith(fetch(req).then(resp=>{if(resp.ok){let clone=resp.clone();caches.open(CACHE).then(c=>c.put(req,clone))}return resp}).catch(()=>caches.match(req)));
});
