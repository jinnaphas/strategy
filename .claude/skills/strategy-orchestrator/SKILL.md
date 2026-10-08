---
name: strategy-orchestrator
description: A0 Strategy Orchestrator agent — consolidates the outputs of all strategy agents into one Weekly Disruption Brief (what is disrupting the plan, decisions needed, next 14 days), checks agent health, data issues and the strategy register, and proposes register updates. Use when the user asks for the "Weekly Brief", "Weekly Disruption Brief", "สรุปประจำสัปดาห์", "อะไร Disrupt แผนสัปดาห์นี้", "ต้องตัดสินใจอะไรบ้าง", or when the weekly routine runs A0.
---

# A0 Strategy Orchestrator

เป้าหมาย: ผู้บริหารอ่าน **หน้าเดียว** ทุกวันจันทร์ราว 09:00 น. แล้วรู้ว่าอะไร Disrupt แผน ใครต้องทำอะไร และต้องตัดสินใจอะไร

รองรับหน้าที่ F7 และ F10 · รอบทำงาน: **ทุกวันจันทร์ 08:50 น.** (ตัวสุดท้ายของรอบ) · ทำงานจากฐานข้อมูล Cockpit เท่านั้น

## Inputs

รายงาน A2 · A5 · A6 · A7 ของสัปดาห์ · Daily Brief ของ A1 · สัญญาณวิกฤต/สูงของสัปดาห์ · `events` · `issues` · `battles` · `decisions` · `agents` · ทะเบียนกลยุทธ์

## Procedure

1. **Disruptions** — รวมจาก A7 (หลัก) A2 A5 A6 และสัญญาณวิกฤต/สูงที่ยังไม่ถูกครอบคลุม · ตัดเรื่องซ้ำ · เก็บ 5–8 เรื่อง · ทุกเรื่องมีข้อเสนอ เจ้าของ และวันที่
2. **เรื่องที่ต้องตัดสินใจ** — เวที (EC / BOD / MM / CEO / Strategy Office) วันที่ เหตุผล หลักฐาน
3. **14 วันข้างหน้า** — วันสำคัญและสิ่งที่ต้องเตรียม
4. **สถานะ Agent** — ใครรันแล้ว ใครขาด ใครผิดพลาด
5. **ข้อมูลและทะเบียน** — ประเด็นข้อมูลค้าง · ข้อเสนอปรับทะเบียน (keyword ของ blind spot, สมมติฐานใหม่จาก Emerging)
6. **KPI** — สัญญาณวิกฤตค้าง · สัญญาณ/ประมูล/พันธมิตรใหม่ · งานเลยกำหนด · กลยุทธ์ที่ถูก Disrupt / มีความเสี่ยง
7. **เขียน** `reports/A0-YYYY-MM-DD` · อัปเดต `meta/cockpit.lastWeekly` และ `agents/A0.lastRun`

## Guardrails

- ทุกเรื่องต้องย้อนกลับไปหารหัสหลักฐานได้ — ห้ามสร้างข้อเท็จจริงใหม่
- **เสนอ** การปรับทะเบียนกลยุทธ์เท่านั้น ไม่แก้เอง
- ไม่แก้ข้อมูลที่คนเป็นเจ้าของ และไม่ส่งข้อมูลออกนอก Cockpit
