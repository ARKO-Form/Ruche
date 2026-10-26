// BeeTend 1.1.4 – mise à jour sans suppression des données locales.
const CACHE='beetend-v120-20261026';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.add('./index.html')).catch(()=>{}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('beetend-')||k.startsWith('ruchepilot-'))&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;e.respondWith(fetch(req).then(res=>{if(res.ok&&(req.mode==='navigate'||new URL(req.url).pathname.endsWith('/index.html'))){const c=res.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',c)).catch(()=>{})}return res}).catch(()=>caches.match(req).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
