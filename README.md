# strategy

Repo สำหรับบริหารงานกลยุทธ์องค์กรร่วมกับ **Agentic AI**
เพื่อรองรับการเปลี่ยนผ่านขององค์กรจาก **Industrial → Platform → Ecosystem Capitalism** สู่ **Agentic AI Organization**

> 🔒 repo นี้เป็น public — ข้อมูลกลยุทธ์จริง รายงานที่ Agent สร้าง และ Strategy Cockpit ถูกเก็บแยกในพื้นที่ private (ดู [`.gitignore`](.gitignore))

## โครงสร้าง

| โฟลเดอร์ | เนื้อหา |
|---|---|
| [`knowledge-base/`](knowledge-base/) | ฐานความรู้ของงานกลยุทธ์ ใช้เป็นบริบทให้ทั้งคนและ AI Agents |
| [`strategies/`](strategies/) | ทะเบียนกลยุทธ์ (Strategy Register) — แหล่งความจริงเดียวที่ Agents อ่าน |
| [`radar/`](radar/) | Strategy Radar — Agent สแกนข่าวภายนอกและจับคู่กับกลยุทธ์ |
| [`.claude/skills/`](.claude/skills/) | ทักษะ (Skills) ของ AI Agents |

## AI Agents (แผน 9 Agents = 1 Orchestrator + 8 Specialists)

รายละเอียด: [Agentic Strategy Office](knowledge-base/02-agentic-strategy-office.md)

| ID | Agent | หน้าที่ | ระลอก | สถานะ |
|---|---|---|---|---|
| A0 | Strategy Orchestrator | ทะเบียนกลยุทธ์ ตรวจความสอดคล้อง Weekly Brief | 1 | 🔜 |
| A1 | [Strategy Radar](radar/README.md) | ข่าว/ข้อมูลภายนอก → กลยุทธ์ไหน ด้านไหน โอกาสหรือภัย | 1 | ✅ พร้อมใช้ |
| A2 | Tender & Competitor Intelligence | ประกาศจัดซื้อ ผลผู้ชนะ ความเคลื่อนไหวคู่แข่ง | 1 | 🔜 |
| A3 | Forecast & Scenario | Rolling forecast + ฉากทัศน์ | 3 | วางแผน |
| A4 | Portfolio & Capital Allocation | ผูก Capex/Opex กับกลยุทธ์ | 2 | วางแผน |
| A5 | Ecosystem & Growth Scout | พันธมิตร M&A/JV | 3 | วางแผน |
| A6 | Execution Tracker (AI-PMO) | ติดตาม Tactical Plan และงานรายคน | 2 | วางแผน |
| A7 | Strategy Review & Learning | Non-Realized & Emerging report รายไตรมาส | 2 | วางแผน |
| A8 | Board & Communication | ร่างเอกสาร EC/BOD และสารสื่อสาร | 1 | 🔜 |

## ฐานความรู้

1. [หน้าที่งานหลักของนักกลยุทธ์องค์กร](knowledge-base/01-strategist-core-functions.md) — 10 หน้าที่งานหลัก ปฏิทินกลยุทธ์ บทบาท สมรรถนะ และการเปลี่ยนแปลงตามเส้นทาง Transformation
2. [Agentic Strategy Office](knowledge-base/02-agentic-strategy-office.md) — จำนวนและหน้าที่ของ AI Agents สถาปัตยกรรม ระดับความอิสระ แผนเปิดใช้ และ Strategy Cockpit
