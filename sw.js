/* Service worker: deja la app instalable y utilizable sin conexión.
   Si cambias cualquier archivo de la carpeta, cambia VERSION para que los
   dispositivos descarguen la versión nueva. */
const VERSION = 'soai-v4';

// Imprescindibles: si alguno falla, no se instala (así nunca queda una app a medias).
const NUCLEO = [
  './', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
  'vendor/xlsx.full.min.js',
  'fonts/big-shoulders-display-600.woff2', 'fonts/big-shoulders-display-800.woff2',
  'fonts/ibm-plex-sans-400.woff2', 'fonts/ibm-plex-sans-500.woff2', 'fonts/ibm-plex-sans-600.woff2', 'fonts/ibm-plex-sans-700.woff2',
  'fonts/ibm-plex-mono-400.woff2', 'fonts/ibm-plex-mono-500.woff2', 'fonts/ibm-plex-mono-600.woff2'
];
// Lector de fotos (~7 MB): se guarda aparte; si falla, la app se instala igual y se reintenta al usarlo.
const OCR = [
  'ocr/tesseract.min.js', 'ocr/worker.min.js', 'ocr/tesseract-core-lstm.wasm.js', 'ocr/lang/eng.traineddata.gz'
];

self.addEventListener('install', e=>{
  e.waitUntil((async ()=>{
    const cache = await caches.open(VERSION);
    await cache.addAll(NUCLEO);
    await Promise.allSettled(OCR.map(u=>cache.add(u)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e=>{
  e.waitUntil((async ()=>{
    const nombres = await caches.keys();
    await Promise.all(nombres.filter(n=>n.startsWith('soai-') && n !== VERSION).map(n=>caches.delete(n)));
    await self.clients.claim();
  })());
});

function conLimite(promesa, ms){
  return new Promise((res, rej)=>{
    const t = setTimeout(()=>rej(new Error('tiempo')), ms);
    promesa.then(v=>{ clearTimeout(t); res(v); }, err=>{ clearTimeout(t); rej(err); });
  });
}

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;       // GitHub y demás: directo a internet

  if(req.mode === 'navigate'){
    // Página: primero internet (para recibir actualizaciones), con límite de 4 s; si no, la copia guardada.
    e.respondWith((async ()=>{
      const cache = await caches.open(VERSION);
      try{
        const r = await conLimite(fetch(req), 4000);
        if(r && r.ok) cache.put(req, r.clone());
        return r;
      }catch(err){
        return (await cache.match(req)) || (await cache.match('index.html')) || (await cache.match('./')) ||
          new Response('Sin conexión y sin copia guardada.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }

  // Resto de archivos propios: primero la copia guardada; si no está, internet y se guarda.
  e.respondWith((async ()=>{
    const cache = await caches.open(VERSION);
    const guardado = await cache.match(req);
    if(guardado) return guardado;
    const r = await fetch(req);
    if(r && r.ok && r.type === 'basic') cache.put(req, r.clone());
    return r;
  })());
});
