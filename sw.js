// BeeTend 1.1.3 – network-first update so users do not stay on stale RuchePilot assets.
const CACHE = 'beetend-v113-20261026';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.add('./index.html')).catch(()=>{}).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('beetend-')||key.startsWith('ruchepilot-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  event.respondWith(fetch(req).then(response=>{
    if(response.ok && (req.mode==='navigate'||new URL(req.url).pathname.endsWith('/index.html'))){
      const copy=response.clone(); caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});
    }
    return response;
  }).catch(()=>caches.match(req).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
