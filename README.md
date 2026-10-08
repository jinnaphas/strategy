# strategy

Repo สำหรับบริหารงานกลยุทธ์องค์กรร่วมกับ **Agentic AI**
เพื่อรองรับการเปลี่ยนผ่านขององค์กรจาก **Industrial → Platform → Ecosystem Capitalism** สู่ **Agentic AI Organization**

> 🔒 repo นี้เป็น public — ข้อมูลกลยุทธ์จริงและรายงานที่ Agent สร้าง ถูก `.gitignore` ไว้ (ดู [`.gitignore`](.gitignore))

## โครงสร้าง

| โฟลเดอร์ | เนื้อหา |
|---|---|
| [`knowledge-base/`](knowledge-base/) | ฐานความรู้ตั้งต้นของงานกลยุทธ์ ใช้เป็นบริบทให้ทั้งคนและ AI Agents |
| [`strategies/`](strategies/) | ทะเบียนกลยุทธ์ (Strategy Register) — แหล่งความจริงเดียวที่ Agents อ่าน |
| [`radar/`](radar/) | Strategy Radar — Agent สแกนข่าวภายนอกและจับคู่กับกลยุทธ์ |
| [`.claude/skills/`](.claude/skills/) | ทักษะ (Skills) ของ AI Agents |

## AI Agents

| Agent | หน้าที่ | สถานะ |
|---|---|---|
| [Strategy Radar](radar/README.md) | ดึงข่าว/ข้อมูลภายนอก → จับคู่กับกลยุทธ์ → วิเคราะห์ว่ากระทบกลยุทธ์ไหน ด้านไหน เป็นโอกาสหรือภัย และควรทำอะไร | ✅ พร้อมใช้ |

## ฐานความรู้

1. [หน้าที่งานหลักของนักกลยุทธ์องค์กร](knowledge-base/01-strategist-core-functions.md) — 10 หน้าที่งานหลัก ปฏิทินกลยุทธ์ บทบาท สมรรถนะ การเปลี่ยนแปลงตามเส้นทาง Transformation และแผนที่ Agent เบื้องต้น
