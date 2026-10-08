# strategy

Repo สำหรับบริหารงานกลยุทธ์องค์กรร่วมกับ **Agentic AI**
เพื่อรองรับการเปลี่ยนผ่านขององค์กรจาก **Industrial → Platform → Ecosystem Capitalism** สู่ **Agentic AI Organization**

> 🔒 repo นี้เป็น public — ข้อมูลกลยุทธ์จริง รายงานที่ Agent สร้าง และ Strategy Cockpit ถูกเก็บแยกในพื้นที่ private (ดู [`.gitignore`](.gitignore))

## หน้าเว็บ

- [`index.html`](index.html) — หน้าแรกของระบบ (เผยแพร่ผ่าน GitHub Pages ได้ ไม่มีข้อมูลลับ) อธิบาย Strategy Radar รายวัน Horizon Scan รายสัปดาห์ Weekly Disruption Cycle วงจรบริหาร และทีม 10 Agents พร้อมปุ่มไป Strategy Cockpit
- **Strategy Cockpit** — หน้าบริหารที่มีข้อมูลกลยุทธ์จริง เป็น artifact ส่วนตัวบน claude.ai (เปิดได้เฉพาะผู้ได้รับสิทธิ์)

## โครงสร้าง

| โฟลเดอร์ | เนื้อหา |
|---|---|
| [`knowledge-base/`](knowledge-base/) | ฐานความรู้ของงานกลยุทธ์ ใช้เป็นบริบทให้ทั้งคนและ AI Agents |
| [`strategies/`](strategies/) | ทะเบียนกลยุทธ์ (Strategy Register) — แหล่งความจริงเดียวที่ Agents อ่าน |
| [`radar/`](radar/) | Strategy Radar — Agent สแกนข่าวภายนอกและจับคู่กับกลยุทธ์ |
| [`.claude/skills/`](.claude/skills/) | ทักษะ (Skills) ของ AI Agents |

## AI Agents (แผน 10 Agents = 1 Orchestrator + 9 Specialists · ใช้งานแล้ว 9 ตัว)

รายละเอียด: [Agentic Strategy Office](knowledge-base/02-agentic-strategy-office.md) · รอบสัปดาห์: [Weekly Disruption Cycle](knowledge-base/03-weekly-disruption-cycle.md) · Solution และการนำเสนอผู้บริหาร: [Emerging Strategy & Executive Briefing](knowledge-base/04-emerging-strategy-and-executive-briefing.md) · มุมข่าวและ Horizon Scan: [Radar Coverage & Horizon Scan](knowledge-base/05-radar-coverage-and-horizon-scan.md)

| ID | Agent | หน้าที่ | รอบทำงาน (เวลาไทย) | สถานะ |
|---|---|---|---|---|
| A0 | [Strategy Orchestrator](.claude/skills/strategy-orchestrator/SKILL.md) | รวมผลทุก Agent เป็น **Weekly Disruption Brief** + สรุปผู้บริหาร 1 หน้า | จันทร์ 08:50 | ✅ |
| A1 | [Strategy Radar](radar/README.md) | ข่าว/ข้อมูลภายนอก → กลยุทธ์ไหน ด้านไหน โอกาสหรือภัย · ตรวจจุดเตือนสมมติฐาน แหล่งทางการ และจุดบอดทุกวัน | ทุกวัน 07:45 | ✅ |
| A1H | [Horizon Scan & Indicators](.claude/skills/horizon-scan/SKILL.md) | สัญญาณอ่อนระยะ 1–5 ปี (H2–H3) + ตัวชี้วัดภายนอกรายสัปดาห์ที่มีแหล่งอ้างอิง | ศุกร์ 06:40 | ✅ |
| A2 | [Tender & Competitor Intelligence](.claude/skills/tender-intelligence/SKILL.md) | ประกาศจัดซื้อ ผลผู้ชนะ ความเคลื่อนไหวคู่แข่ง | จันทร์ 05:55 | ✅ |
| A5 | [Ecosystem & Growth Scout](.claude/skills/ecosystem-scout/SKILL.md) | พันธมิตร Complementor JV/M&A การเปลี่ยนแปลงของ Ecosystem | จันทร์ 06:25 | ✅ |
| A6 | [Execution Tracker (AI-PMO)](.claude/skills/execution-tracker/SKILL.md) | งาน Must-Win ที่ช้า ประเด็นข้อมูลที่ขวาง สัญญาณค้าง | จันทร์ 06:55 | ✅ |
| A7 | [Strategy Review & Learning](.claude/skills/strategy-review/SKILL.md) | Plan Disruption Scorecard รายสัปดาห์ + ฉบับไตรมาส | จันทร์ 08:20 | ✅ |
| A3 | [Strategic Options & Scenario](.claude/skills/strategic-options/SKILL.md) | ออกแบบ Solution ให้เรื่องที่ Disrupt แผนเป็น **Emerging Strategy** พร้อมทางเลือก (ส่วน Rolling forecast รอระบบ ERP) | จันทร์ 08:35 | ✅ |
| A8 | [Board & Communication](.claude/skills/board-communication/SKILL.md) | ร่าง Pack สไลด์สำหรับ EC / BOD (ปรับถ้อยคำเท่านั้น) | จันทร์ 09:10 (ประชุมใน 10 วัน) | ✅ |
| A4 | Portfolio & Capital Allocation | ผูก Capex/Opex กับกลยุทธ์ | ตามรอบงบ | วางแผน |

## ฐานความรู้

1. [หน้าที่งานหลักของนักกลยุทธ์องค์กร](knowledge-base/01-strategist-core-functions.md) — 10 หน้าที่งานหลัก ปฏิทินกลยุทธ์ บทบาท สมรรถนะ และการเปลี่ยนแปลงตามเส้นทาง Transformation
2. [Agentic Strategy Office](knowledge-base/02-agentic-strategy-office.md) — จำนวนและหน้าที่ของ AI Agents สถาปัตยกรรม ระดับความอิสระ แผนเปิดใช้ และ Strategy Cockpit
3. [Weekly Disruption Cycle](knowledge-base/03-weekly-disruption-cycle.md) — ทุกวันจันทร์ Agent รันต่อกันเพื่อตอบว่าอะไรกำลัง Disrupt แผน มาตรวัดที่ใช้ร่วมกัน และโครงข้อมูล
4. [Emerging Strategy & Executive Briefing](knowledge-base/04-emerging-strategy-and-executive-briefing.md) — Solution ตามกรอบ Mintzberg, Decision Memo แบบ SCQA, สรุปผู้บริหาร 1 หน้า, Pack สำหรับ EC / BOD และโหมดนำเสนอ
5. [Radar Coverage & Horizon Scan](knowledge-base/05-radar-coverage-and-horizon-scan.md) — มุมข่าวที่ Radar ต้องเห็น: จุดเตือนสมมติฐาน อุปสงค์ลูกค้า ต้นทุน กฎระเบียบขั้นร่าง คน · ปิดจุดบอด · Horizon Scan H2–H3 · ตัวชี้วัดที่มีแหล่งอ้างอิง
