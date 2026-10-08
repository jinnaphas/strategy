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

## การรันอัตโนมัติ (Routine)

ตั้ง Claude Code Routine ให้รันทุกสัปดาห์ได้ เช่น ทุกวันจันทร์ 07:45 น. (เวลาไทย) ด้วยคำสั่ง
`รัน strategy-radar สแกนข่าว 7 วันล่าสุด แบบ standard แล้วสรุป Top 5 สัญญาณ`

ข้อควรรู้ก่อนตั้ง Routine:
- Routine เริ่ม session ใหม่จาก repo ทุกครั้ง จึง **ต้องมีทะเบียนกลยุทธ์อยู่ใน repo** → ต้องเปลี่ยน repo เป็น **Private** ก่อน แล้วลบบรรทัดใน `.gitignore`
- ทางเลือกถ้ายังต้องการให้ repo เป็น public: เก็บทะเบียนไว้ใน Google Drive / SharePoint แล้วให้ Agent อ่านผ่าน connector

## ข้อจำกัดปัจจุบัน

- สภาพแวดล้อม cloud ปัจจุบันจำกัด network: **WebSearch ใช้ได้** แต่ WebFetch (เปิดอ่านต้นฉบับข่าว) และ RSS ถูกบล็อก
  → ถ้าต้องการให้ Agent อ่านต้นฉบับได้ ให้เพิ่มโดเมนข่าวใน Network access ของ environment
- ผลการค้นหาเป็นสรุปจากเครื่องมือค้นหา — สัญญาณระดับ Critical ควรตรวจสอบกับต้นฉบับก่อนตัดสินใจ
