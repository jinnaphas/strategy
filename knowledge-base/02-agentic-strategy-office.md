# Agentic Strategy Office: ต้องมี AI Agent กี่ตัว และทำหน้าที่อะไร

> ต่อจาก [01 — หน้าที่งานหลักของนักกลยุทธ์องค์กร](01-strategist-core-functions.md)
> เอกสารนี้เป็นแบบโครงสร้าง (design) ทั่วไป ไม่มีข้อมูลกลยุทธ์จริงขององค์กร

## 1. คำตอบสั้น

**9 Agents = 1 Orchestrator + 8 Specialist Agents** และเปิดใช้ทีละระลอก **เริ่ม 4 ตัวใน 90 วันแรก**

| เกณฑ์ที่ใช้กำหนดจำนวน | ผลลัพธ์ |
|---|---|
| ครอบคลุมหน้าที่งานนักกลยุทธ์ครบ 10 ด้าน (F1–F10) | ทุกหน้าที่มี Agent รับผิดชอบอย่างน้อย 1 ตัว |
| 1 Agent = เจ้าของที่เป็นคน 1 บทบาท + ข้อมูลเข้า 1 ชุด + ผลลัพธ์ที่ชัด | ไม่มี Agent ที่ไม่มีคนกำกับ |
| แยก Agent เมื่อ **จังหวะเวลา** หรือ **แหล่งข้อมูล** ต่างกัน | Radar (ข่าว รายสัปดาห์) แยกจาก Tender Intelligence (ประกาศจัดซื้อ รายวัน) |
| รวม Agent เมื่อใช้ข้อมูลและเจ้าของเดียวกัน | ตรวจตัวเลขขัดกันรวมไว้ใน Orchestrator |
| เปิดตามความพร้อมของข้อมูล | Agent ที่ต้องใช้ตัวเลขการเงินจริงรอระบบ ERP |

## 2. สถาปัตยกรรม

```mermaid
flowchart TB
    EXEC["CEO · EC · BOD<br/>ตัดสินใจ เลือก และแลก"]
    SO["Strategy Office (คน 4–5 คน)<br/>กำกับและตรวจงานของ Agent"]
    ORC["A0 Strategy Orchestrator<br/>ทะเบียนกลยุทธ์ · ตรวจความสอดคล้อง · Weekly Brief"]
    subgraph SENSE["Sense"]
        A1["A1 Strategy Radar"]
        A2["A2 Tender & Competitor Intelligence"]
    end
    subgraph DECIDE["Decide"]
        A3["A3 Forecast & Scenario"]
        A4["A4 Portfolio & Capital Allocation"]
        A5["A5 Ecosystem & Growth Scout"]
    end
    subgraph DELIVER["Deliver"]
        A6["A6 Execution Tracker (AI-PMO)"]
    end
    subgraph LEARN["Learn & Communicate"]
        A7["A7 Strategy Review & Learning"]
        A8["A8 Board & Communication"]
    end
    DATA[("ทะเบียนกลยุทธ์ + Strategy Cockpit DB<br/>กลยุทธ์ · สมมติฐาน · สัญญาณ · Must-Win · มติ")]

    EXEC <--> SO
    SO <--> ORC
    ORC --> SENSE & DECIDE & DELIVER & LEARN
    SENSE & DECIDE & DELIVER & LEARN <--> DATA
```

## 3. รายชื่อ Agent

| ID | Agent | ทำอะไร | หน้าที่ | ระยะของแผน | Input → Output | รอบ | เจ้าของ (คน) | อิสระ | ระลอก |
|---|---|---|---|---|---|---|---|---|---|
| A0 | **Strategy Orchestrator** | ดูแลทะเบียนกลยุทธ์ให้เป็นข้อมูลชุดเดียว ตรวจตัวเลขขัดกัน ส่งงานต่อ รวมผล | F7, F10 | ทุกระยะ | เอกสารกลยุทธ์ + ผลจาก Agent อื่น → Weekly Brief, รายการข้อมูลค้าง | รายสัปดาห์ | Strategy Lead | L2 | 1 |
| A1 | **Strategy Radar** ✅ | สแกนข่าว/นโยบาย/ตลาด จับคู่กับกลยุทธ์และสมมติฐาน | F1, F2 | Externally-Oriented | ทะเบียน + ข่าว → รายงาน Radar, Signal log, Assumption Watch | รายสัปดาห์ | CI Analyst | L2 | 1 |
| A2 | **Tender & Competitor Intelligence** | ประกาศจัดซื้อ ผลผู้ชนะ ประกาศตลาดหลักทรัพย์ของคู่แข่ง win/loss และโจทย์ Pre-TOR | F2, F6 | Externally-Oriented | e-GP, เว็บลูกค้า, ประกาศบริษัทจดทะเบียน → Tender pipeline, Win/Loss brief | รายวัน–รายสัปดาห์ | Business Generation | L2 | 1 |
| A3 | **Forecast & Scenario** | Rolling forecast และฉากทัศน์ที่ผูกกับสมมติฐาน (ดึงตัวเลขจากระบบ ไม่สร้างเอง) | F3, F4 | Forecast-Based | ERP, งบประมาณ, Radar → Forecast 3–4 ปี, Scenario pack | รายเดือน–ไตรมาส | CFO | L1 | 3 |
| A4 | **Portfolio & Capital Allocation** | ติด Strategy ID ให้ Capex/Opex คำนวณ Strategic Fit เตือน say–do gap | F4 | Budgeting–Forecast | รายการ Capex/Opex + ทะเบียน → Capex fit report, Investment memo draft | ตามรอบงบ | CFO + Strategy Office | L2 | 2 |
| A5 | **Ecosystem & Growth Scout** | หาพันธมิตร/complementor คัดกรอง M&A/JV | F5, F6 | Strategic Management | ข้อมูลบริษัท ข่าว BOI → Partner pipeline, Deal screening | รายเดือน | Investment / Holding | L1 | 3 |
| A6 | **Execution Tracker (AI-PMO)** | สรุปสถานะ Tactical Plan และงานรายคน เตือนงานล่าช้า ตรวจการถ่ายทอด KPI | F7, F8 | Budgeting / Execution | Business plan, ERP, ระบบ HR → Status report, Escalation list | ทุก 2 สัปดาห์ | COO + HR | L3 | 2 |
| A7 | **Strategy Review & Learning** | Dashboard และรายงาน Non-Realized & Emerging Strategy (Mintzberg) รายไตรมาส | F9 | Strategic Management | Radar + Execution + KPI → Review pack, Assumption scorecard | รายไตรมาส | Strategy Office → CEO | L2 | 2 |
| A8 | **Board & Communication** | ร่างเอกสาร EC/BOD (ปรับรูปแบบเท่านั้น ห้ามสร้าง/แก้ตัวเลข) และสารสื่อสารกลยุทธ์ | F10 | ทุกระยะ | ทะเบียน + รายงาน → Board pack draft, Strategy narrative | ตามรอบประชุม | Strategy Office + Corporate Comms | L2 | 1 |

### ความครอบคลุมหน้าที่งาน

| หน้าที่ | A0 | A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 |
|---|---|---|---|---|---|---|---|---|---|
| F1 มองอนาคต & สแกนสภาพแวดล้อม | | ● | | | | | | | |
| F2 วิเคราะห์ข้อมูลเชิงกลยุทธ์ | | ● | ● | | | | | | |
| F3 กำหนดกลยุทธ์ & ทางเลือก | | | | ● | | | | | |
| F4 บริหารพอร์ต & จัดสรรทรัพยากร | | | | ● | ● | | | | |
| F5 การเติบโต & โมเดลธุรกิจ | | | | | | ● | | | |
| F6 Corporate Development & Ecosystem | | | ● | | | ● | | | |
| F7 แปลงกลยุทธ์เป็นแผน & ถ่ายทอด | ● | | | | | | ● | | |
| F8 บริหารโครงการ & Transformation | | | | | | | ● | | |
| F9 ติดตามผล ทบทวน & ปรับ | | | | | | | | ● | |
| F10 ที่ปรึกษาผู้บริหาร & สื่อสาร | ● | | | | | | | | ● |

## 4. ระดับความอิสระ (Autonomy)

| ระดับ | ความหมาย | ตัวอย่าง |
|---|---|---|
| **L1** ช่วยเมื่อสั่ง | ทำงานเมื่อคนสั่ง คนตรวจทุกครั้ง | ทำฉากทัศน์ตามสมมติฐานที่ CFO กำหนด |
| **L2** ทำตามรอบ | ทำงานเองตามตารางเวลา คนตรวจก่อนนำไปใช้ | Radar รายสัปดาห์, ร่าง Board pack |
| **L3** ลงมือในกรอบ | ทำการกระทำที่ย้อนกลับได้เองภายในกติกา | ส่งเตือนเจ้าของงานที่เลยกำหนด |
| ~~L4~~ ตัดสินใจเอง | **ไม่ใช้กับงานกลยุทธ์** | — |

## 5. แผนเปิดใช้ 3 ระลอก

| ระลอก | ช่วงเวลา | Agent | เหตุผล |
|---|---|---|---|
| 1 | 0–3 เดือน | A0, A1 ✅, A2, A8 | อ่านและร่างได้ทันที ความเสี่ยงต่ำ ได้ผลเร็ว |
| 2 | 3–9 เดือน | A4, A6, A7 | ผูกกลยุทธ์กับงบและการปฏิบัติ |
| 3 | หลังระบบ ERP พร้อม | A3, A5 | ต้องใช้ตัวเลขการเงินจริงและข้อมูลภายนอกเชิงลึก |

## 6. ทีมคนที่กำกับ Agent

| บทบาท | กำกับ Agent |
|---|---|
| Strategy Lead | A0, A7, A8 |
| CI / Strategy Analyst | A1, A2, A5 |
| Strategy PMO | A6 |
| Finance Partner | A3, A4 |
| CoE / Data–AI Engineer | ดูแลแพลตฟอร์ม, skill และการเชื่อมต่อข้อมูลของทุก Agent |

## 7. Strategy Cockpit: หน้าบ้านกลางของทุก Agent

ทุก Agent อ่าน/เขียนข้อมูลชุดเดียวกัน และผู้บริหารดูผ่านหน้าเดียว (Cockpit) แทนการเปิดหลายไฟล์

| Collection | เนื้อหา | Agent ที่เขียน | คนที่แก้ |
|---|---|---|---|
| `strategies` | ทะเบียนกลยุทธ์ + สถานะสมมติฐาน | A0, A1 | Strategy Office |
| `signals` | สัญญาณภายนอก (Impact × Likelihood, กลยุทธ์ × ด้าน) | A1, A2, A5 | สถานะ/บันทึก |
| `battles` | Must-Win และงานถัดไป | A0, A6 | เจ้าของ Must-Win |
| `decisions` | บันทึกมติ EC/BOD/MM | — | Strategy Office |
| `issues` | ตัวเลข/นิยามที่ขัดกัน | A0 | Strategy Office |
| `events` | วันสำคัญ | A0, A1 | — |
| `agents` | ทีม Agent และสถานะ | A0 | — |
| `meta/cockpit` | วันที่รัน Radar ล่าสุด, รุ่นทะเบียน | A1 | — |

> Cockpit ที่มีข้อมูลจริงเป็น artifact ส่วนตัว (private) — ไม่อยู่ใน repo นี้

## 8. หลักกำกับ (Guardrails)

1. **AI เสนอ คนตัดสินใจ** — การเลือกและการแลกเป็นของผู้บริหาร
2. **ห้าม Agent สร้างหรือแก้ตัวเลขทางการเงิน** — ดึงจากระบบต้นทางเท่านั้น
3. **ทุกข้อสรุปมีแหล่งอ้างอิงและวันที่** — สัญญาณระดับวิกฤตต้องตรวจต้นฉบับ
4. **แยกข้อมูลลับออกจากโค้ด** — Skill อยู่ใน repo ได้ ข้อมูลจริงอยู่ในพื้นที่ private
5. **Audit log** — เก็บว่าใช้ข้อมูลใด เสนออะไร ใครอนุมัติ (รองรับกฎหมาย AI ที่กำลังจะมา)
