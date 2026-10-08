# Strategy Radar — Agentic AI สแกนข่าวและจับคู่กับกลยุทธ์

Agent ที่ดึงข่าวและข้อมูลภายนอก แล้ววิเคราะห์ว่า **กระทบกลยุทธ์ไหน — ในด้านไหน — เป็นโอกาสหรือภัยคุกคาม — รุนแรงแค่ไหน — เมื่อไร — ควรทำอะไร**

```mermaid
flowchart LR
    R[("ทะเบียนกลยุทธ์<br/>strategy-register.yaml")] --> Q["① วางแผนการค้นหา<br/>keyword ต่อกลยุทธ์"]
    S[("แหล่งข่าว<br/>sources.yaml")] --> Q
    Q --> C["② รวบรวมข่าว<br/>WebSearch ไทย + อังกฤษ"]
    C --> F["③ คัดกรอง<br/>ตัดซ้ำ ตัดเก่า ให้ระดับแหล่ง"]
    F --> A["④ วิเคราะห์และจับคู่<br/>กลยุทธ์ × ด้าน × โอกาส/ภัย"]
    A --> P["⑤ ให้คะแนน<br/>Impact × Likelihood · Horizon"]
    P --> O["⑥ รายงาน + Heatmap<br/>+ Signal log"]
    O --> H{{"ผู้บริหารตัดสินใจ"}}
    O -. "เสนอ keyword/สมมติฐานใหม่" .-> R
```

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ | ขึ้น Git? |
|---|---|---|
| `.claude/skills/strategy-radar/SKILL.md` | ขั้นตอนการทำงานของ Agent | ✅ |
| `.claude/skills/strategy-radar/references/scoring-rubric.md` | เกณฑ์จัดประเภทและให้คะแนน | ✅ |
| `.claude/skills/strategy-radar/references/report-template.md` | รูปแบบรายงาน | ✅ |
| `radar/sources.yaml` | แหล่งข่าว ระดับความน่าเชื่อถือ หัวข้อเฝ้าระวังภาพรวม | ✅ |
| `strategies/strategy-register.example.yaml` | ตัวอย่างทะเบียนกลยุทธ์ (บริษัทสมมติ) | ✅ |
| `strategies/strategy-register.yaml` | **ทะเบียนกลยุทธ์จริง** | ❌ (`.gitignore`) |
| `radar/reports/YYYY-MM-DD-radar.md` | **รายงานแต่ละรอบ** | ❌ (`.gitignore`) |
| `radar/signal-log.csv` | **บันทึกสัญญาณสะสม** | ❌ (`.gitignore`) |

## วิธีใช้

1. **เตรียมทะเบียนกลยุทธ์** — คัดลอก `strategies/strategy-register.example.yaml` เป็น `strategies/strategy-register.yaml` แล้วใส่กลยุทธ์จริง
   (สำคัญที่สุดคือ `assumptions` และ `watch.keywords` — คุณภาพของ radar ขึ้นกับสองส่วนนี้)
2. **สั่งรัน** ใน Claude Code ที่เปิด repo นี้:
   - `ใช้ strategy-radar สแกนข่าว 7 วันล่าสุด`
   - `รัน strategy radar เฉพาะกลยุทธ์ P1-S1 แบบ deep`
   - `สแกนข่าวเดือนนี้ว่ากระทบกลยุทธ์ไหนบ้าง`
3. **อ่านรายงาน** ที่ `radar/reports/` และนำสัญญาณระดับ 🔥 Critical / ⚠️ High เข้าวาระประชุม

## การรันอัตโนมัติ (Daily Routine)

Radar ทำงานเป็น **Claude Code Routine ทุกวัน 07:45 น. (เวลาไทย)** — Daily Brief พร้อมอ่านราว 08:00 น.

```mermaid
flowchart LR
    T(["Routine 07:45 น.<br/>เปิด session ใหม่"]) --> L["อ่านทะเบียนกลยุทธ์ + config<br/>จาก Strategy Cockpit DB"]
    L --> W["ค้นข่าว ~34 คำค้น ไทย + อังกฤษ<br/>รายกลยุทธ์ · จุดบอด · จุดเตือน<br/>แหล่งทางการ · 12 หัวข้อ PESTEL+I"]
    W --> A["คัดกรอง · จับคู่ · ให้คะแนน"]
    A --> D[("เขียน signals + briefs<br/>กลับเข้า Cockpit DB")]
    D --> V{{"ผู้บริหารเปิด Cockpit<br/>อ่าน Daily Brief"}}
```

ทำไมอ่าน/เขียนผ่าน Cockpit DB แทนไฟล์ใน repo:
- Routine เปิด session ใหม่ทุกครั้ง ไฟล์ที่ `.gitignore` ไว้จึงไม่มีใน session นั้น
- repo นี้เป็น public — ทะเบียนกลยุทธ์จริงและผลวิเคราะห์จึงต้องอยู่ในฐานข้อมูลของ Cockpit (artifact ส่วนตัว) เท่านั้น
- prompt ของ Routine เป็นแบบ standalone (ขั้นตอน + เกณฑ์ให้คะแนน + guardrails) ไม่พึ่งไฟล์ใน repo

Collection ที่ Routine ใช้: `strategies` (อ่าน + อัปเดตสถานะสมมติฐาน), `meta/radar` (อ่าน), `signals` (อ่านเพื่อตัดซ้ำ + สร้างใหม่), `briefs` (สร้างรายวัน), `meta/cockpit` (อัปเดต)

### แผนคำค้นรายวัน

| มุม | ต่อวัน | ปิดช่องว่างอะไร |
|---|---|---|
| รายกลยุทธ์ | 1 ต่อกลยุทธ์ | ทุกกลยุทธ์ได้รับการสแกน |
| ปิดจุดบอด | ≤ 4 | กลยุทธ์ที่ไม่มีสัญญาณใน 30 วัน |
| จุดเตือนสมมติฐาน | 3 | ทดสอบสมมติฐานที่สั่นคลอนก่อน |
| แหล่งทางการ (จำกัดโดเมน) | 3 | ร่างกฎ การรับฟังความคิดเห็น มาตรฐาน ประกาศ |
| หัวข้อภาพรวม | 5 จาก 12 | อุปสงค์ลูกค้า · ต้นทุน · คน · ภูมิรัฐศาสตร์ · ภูมิอากาศ · ตลาดทุน · ESG · เสียงสาธารณะ ฯลฯ |

รายละเอียด: [05 — Radar Coverage & Horizon Scan](../knowledge-base/05-radar-coverage-and-horizon-scan.md)

## Horizon Scan รายสัปดาห์ (A1H)

ทุกวันศุกร์ 06:40 น. A1H สแกนสัญญาณอ่อนระยะ 1–5 ปี (H2–H3) 8 ธีม และบันทึกตัวชี้วัดภายนอก 9 ตัว เฉพาะตัวเลขที่มีแหล่งอ้างอิง เขียนลง `signals` (รหัส `-H`), `indicators` และ `reports/A1H-<วันที่>` ให้ A7 · A3 · A0 ใช้ในวันจันทร์ — ดู [skill](../.claude/skills/horizon-scan/SKILL.md)

## ข้อจำกัดปัจจุบัน

- สภาพแวดล้อม cloud ปัจจุบันจำกัด network: **WebSearch ใช้ได้** แต่ WebFetch (เปิดอ่านต้นฉบับข่าว) และ RSS ถูกบล็อก
  → ถ้าต้องการให้ Agent อ่านต้นฉบับได้ ให้เพิ่มโดเมนข่าวและโดเมนทางการ (Tier A ใน `sources.yaml`) ใน Network access ของ environment
- แหล่งทางการค้นผ่าน WebSearch แบบจำกัดโดเมน — ได้เฉพาะหน้าที่เครื่องมือค้นหาเก็บไว้แล้ว
- ผลการค้นหาเป็นสรุปจากเครื่องมือค้นหา — สัญญาณระดับ Critical ควรตรวจสอบกับต้นฉบับก่อนตัดสินใจ
