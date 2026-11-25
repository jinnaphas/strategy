/**
 * ตัวรับบันทึกดูงาน (ตัวอย่าง — ฉบับจริงเก็บไว้ใน Apps Script เท่านั้น)
 *
 * รับข้อความและไฟล์จากหน้าเว็บ (GitHub Pages) แล้วบันทึกลงโฟลเดอร์ Drive
 *   Dailly Information / <เมือง> / <ชื่อ>
 *
 * Deploy: Deploy > New deployment > Web app
 *   Execute as: Me   ·   Who has access: Anyone
 * แล้วนำ Web app URL ไปใส่ใน API_URL ของ index.html
 *
 * v2 (25 พ.ย.): เพิ่ม action=roster (รายชื่อทีมอยู่ที่นี่ ไม่อยู่ในหน้าเว็บสาธารณะ),
 *   ปฏิเสธไฟล์ใหญ่เกินด้วยรหัส too_large, และล็อกตอนตรวจชื่อซ้ำ/สร้างไฟล์ กันไฟล์ซ้ำเมื่อส่งซ้อนกัน
 * แก้โค้ดแล้ว: Deploy > Manage deployments > ✎ > Version: New version > Deploy (URL เดิมใช้ต่อได้)
 */

// ── ตั้งค่า ─────────────────────────────────────────────
// รหัสทีม: เปลี่ยนเป็นรหัสของคุณเอง แล้วส่งลิงก์ให้ทีมในรูปแบบ  ...github.io/<repo>/?code=<รหัสนี้>
const TEAM_CODE = 'CHANGE-ME';
const TZ = 'Asia/Shanghai';
const MAX_BYTES = 12 * 1024 * 1024;   // หน้าเว็บจำกัดไฟล์ที่ไม่ใช่รูปไว้ 10 MB เผื่อไว้เล็กน้อย

const PEOPLE = {
  p1: 'Person 1', p2: 'Person 2', p3: 'Person 3',
  p4: 'Person 4', p5: 'Person 5', p6: 'Person 6'
};

// กลุ่มของแต่ละคน และชื่อเรียกกลุ่ม (หน้าเว็บขอผ่าน action=roster หลังตรวจรหัสทีม)
const GROUP = {
  p1: 1, p2: 1, p3: 1,
  p4: 2, p5: 2, p6: 2
};
const GROUP_NICK = { 1: 'ชื่อเล่นกลุ่ม 1', 2: 'ชื่อเล่นกลุ่ม 2' };

const CITY_NAME = {
  shanghai: 'Shanghai Exhibition',
  hangzhou: 'Hangzhou Group 1',
  suzhou: 'Suzhou Group 2'
};

// ID โฟลเดอร์รายคน (ใต้ Dailly Information) · ID ไม่เปลี่ยนแม้เปลี่ยนชื่อโฟลเดอร์
const FOLDERS = {
  shanghai: {
    p4: 'FOLDER_ID',
    p1:     'FOLDER_ID',
    p5:  'FOLDER_ID',
    p2:    'FOLDER_ID',
    p6:  'FOLDER_ID',
    p3:  'FOLDER_ID'
  },
  hangzhou: {
    p1:     'FOLDER_ID',
    p2:    'FOLDER_ID',
    p3:  'FOLDER_ID'
  },
  suzhou: {
    p4: 'FOLDER_ID',
    p5:  'FOLDER_ID',
    p6:  'FOLDER_ID'
  }
};

// ── รับข้อมูล ───────────────────────────────────────────
// body (JSON ส่งเป็น text/plain เพื่อเลี่ยง CORS preflight):
// { code, action:'note'|'file', person, city, entry, ts, booth, text,
//   idx, name, mime, data(base64) }
function doPost(e) {
  try {
    const b = JSON.parse(e.postData.contents);
    if (b.code !== TEAM_CODE) return out_({ ok: false, error: 'bad_code' });
    const folder = folderFor_(b.city, b.person);
    const base = baseName_(b);

    if (b.action === 'note') {
      const name = base + '_note.txt';
      return writeOnce_(folder, name, function () {
        folder.createFile(name, noteText_(b), MimeType.PLAIN_TEXT);
      });
    }

    if (b.action === 'file') {
      const name = base + '_' + ('0' + (b.idx || 1)).slice(-2) + ext_(b.name, b.mime);
      const data = String(b.data || '');
      if (!data) return out_({ ok: false, error: 'empty_file' });
      if (data.length * 3 / 4 > MAX_BYTES) return out_({ ok: false, error: 'too_large' });
      const blob = Utilities.newBlob(Utilities.base64Decode(data), b.mime || 'application/octet-stream', name);
      return writeOnce_(folder, name, function () {
        const file = folder.createFile(blob);
        const cap = caption_(b);
        if (cap) file.setDescription(cap);
      });
    }

    return out_({ ok: false, error: 'bad_action' });
  } catch (err) {
    return out_({ ok: false, error: String(err && err.message || err) });
  }
}

// ── อ่านรายการของวัน (แท็บ "ทีม") ─────────────────────────
// GET ?action=list&code=...&date=yyyy-MM-dd
// GET ?action=ping&code=...
function doGet(e) {
  const p = e.parameter || {};
  if (p.code !== TEAM_CODE) return out_({ ok: false, error: 'bad_code' });
  if (p.action === 'ping') return out_({ ok: true, v: 2 });
  if (p.action === 'roster') {
    return out_({
      ok: true,
      people: Object.keys(PEOPLE).map(function (k) { return { k: k, n: PEOPLE[k], g: GROUP[k] }; }),
      groups: GROUP_NICK
    });
  }
  if (p.action !== 'list') return out_({ ok: false, error: 'bad_action' });

  const date = /^\d{4}-\d{2}-\d{2}$/.test(p.date || '') ? p.date
    : Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  const entries = {};

  Object.keys(FOLDERS).forEach(function (city) {
    Object.keys(FOLDERS[city]).forEach(function (person) {
      const folder = DriveApp.getFolderById(FOLDERS[city][person]);
      const it = folder.searchFiles("title contains '" + date + "' and trashed = false");
      while (it.hasNext()) {
        const f = it.next();
        const m = f.getName().match(/^(\d{4}-\d{2}-\d{2})_(\d{4})_([^_]+)_([a-z0-9]+)_(.+)$/i);
        if (!m || m[1] !== date) continue;
        const key = city + '|' + person + '|' + m[2] + '|' + m[4];
        const en = entries[key] || (entries[key] = {
          person: person, city: city, time: m[2].slice(0, 2) + ':' + m[2].slice(2),
          booth: '', text: '', files: 0, images: 0
        });
        if (m[5] === 'note.txt') {
          const parsed = parseNote_(f.getBlob().getDataAsString('UTF-8'));
          en.booth = parsed.booth; en.text = parsed.text;
        } else {
          en.files++;
          if ((f.getMimeType() || '').indexOf('image/') === 0) en.images++;
        }
      }
    });
  });

  const list = Object.keys(entries).map(function (k) { return entries[k]; })
    .sort(function (a, b) { return a.time < b.time ? 1 : -1; });
  return out_({ ok: true, date: date, entries: list });
}

// ── ตัวช่วย ─────────────────────────────────────────────
function folderFor_(city, person) {
  const id = FOLDERS[city] && FOLDERS[city][person];
  if (!id) throw new Error('bad_target');
  return DriveApp.getFolderById(id);
}

function baseName_(b) {
  const d = b.ts ? new Date(b.ts) : new Date();
  const stamp = Utilities.formatDate(d, TZ, 'yyyy-MM-dd_HHmm');
  const entry = String(b.entry || '').replace(/[^a-z0-9]/gi, '').slice(-4) || 'x000';
  return stamp + '_' + PEOPLE[b.person] + '_' + entry;
}

function noteText_(b) {
  const d = b.ts ? new Date(b.ts) : new Date();
  return [
    'ผู้บันทึก: ' + PEOPLE[b.person],
    'เมือง: ' + CITY_NAME[b.city],
    'เวลา: ' + Utilities.formatDate(d, TZ, 'yyyy-MM-dd HH:mm') + ' (เวลาจีน)',
    'บูธ/บริษัท: ' + (b.booth || '-'),
    'ไฟล์แนบ: ' + (b.files || 0),
    '---',
    b.text || ''
  ].join('\n');
}

function parseNote_(s) {
  const parts = s.split('\n---\n');
  const head = parts[0] || '';
  const booth = (head.match(/บูธ\/บริษัท: (.*)/) || [])[1] || '';
  return { booth: booth === '-' ? '' : booth, text: (parts.slice(1).join('\n---\n') || '').slice(0, 500) };
}

function caption_(b) {
  const bits = [];
  if (b.booth) bits.push('บูธ/บริษัท: ' + b.booth);
  if (b.text) bits.push(String(b.text).slice(0, 400));
  return bits.join('\n');
}

function ext_(name, mime) {
  const m = String(name || '').match(/\.[a-z0-9]{1,5}$/i);
  if (m) return m[0].toLowerCase();
  const map = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'application/pdf': '.pdf',
    'video/mp4': '.mp4', 'video/quicktime': '.mov', 'audio/mp4': '.m4a', 'audio/mpeg': '.mp3' };
  return map[mime] || '';
}

function exists_(folder, name) {
  return folder.getFilesByName(name).hasNext();
}

// ตรวจชื่อซ้ำแล้วสร้างไฟล์ภายใต้ล็อกเดียว กันไฟล์ซ้ำเมื่อชิ้นเดียวกันถูกส่งซ้อนกัน 2 ครั้ง
function writeOnce_(folder, name, create) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) return out_({ ok: false, error: 'busy' });
  try {
    if (exists_(folder, name)) return out_({ ok: true, name: name, dup: true });
    create();
    return out_({ ok: true, name: name });
  } finally {
    lock.releaseLock();
  }
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ── รันครั้งแรกในหน้า Editor เพื่ออนุญาตสิทธิ์และเช็กว่าเข้าถึงทุกโฟลเดอร์ได้ ─────
function checkFolders() {
  Object.keys(PEOPLE).forEach(function (k) {
    if (!GROUP[k]) Logger.log('⚠ ' + k + ' ยังไม่มีกลุ่มใน GROUP');
  });
  Object.keys(FOLDERS).forEach(function (city) {
    Object.keys(FOLDERS[city]).forEach(function (person) {
      const f = DriveApp.getFolderById(FOLDERS[city][person]);
      Logger.log(CITY_NAME[city] + ' / ' + PEOPLE[person] + ' → ' + f.getName());
    });
  });
}
