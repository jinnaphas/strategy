// เก็บหน้าเว็บไว้ในเครื่อง เพื่อให้เปิดได้แม้ไม่มีสัญญาณในฮอลล์งาน
// ใช้แบบ network-first: มีเน็ตจะโหลดเวอร์ชันล่าสุด ไม่มีเน็ตจะใช้ฉบับที่เก็บไว้
// เปลี่ยนเลขเวอร์ชันทุกครั้งที่แก้ไฟล์ในโฟลเดอร์นี้
const CACHE = 'pcc-daily-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // ไม่ยุ่งกับ Apps Script และฟอนต์
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) {
        // เก็บหน้าเว็บโดยตัด ?code=&me= ออก ไม่ให้รหัสทีมค้างอยู่ใน cache
        const key = req.mode === 'navigate' ? './index.html' : req;
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(key, copy));
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
