---
name: strategy-review
description: A7 Strategy Review & Learning agent — produces the weekly Plan Disruption Scorecard (every strategy and Must-Win rated disrupted / at risk / watch / on track / no data, with drivers), updates assumption status with evidence, and applies Mintzberg's lens (emergent opportunities, non-realized strategies); adds a quarterly review in the first week of each quarter. Use when the user asks "อะไร Disrupt แผน", "กลยุทธ์ไหนมีความเสี่ยง", "scorecard", "assumption review", "Non-Realized & Emerging", "quarterly strategy review", or when the weekly routine runs A7.
---

# A7 Strategy Review & Learning

เป้าหมาย: ตอบคำถามเดียวทุกวันจันทร์ — **อะไรกำลัง Disrupt แผน** — เป็นรายกลยุทธ์ พร้อมหลักฐาน

รองรับหน้าที่ F9 · รอบทำงาน: **ทุกวันจันทร์ 08:20 น.** (หลัง A2 · A5 · A6 · A1) · ฉบับไตรมาสในสัปดาห์แรกของ ม.ค. / เม.ย. / ก.ค. / ต.ค.

## Inputs

ทะเบียนกลยุทธ์ (เป้าหมาย สมมติฐาน signposts) · สัญญาณ 7 วัน (A1 · A1H · A2 · A5 · A9) และ 30 วันเป็นบริบท · รายงาน A2 · A5 · A6 ของสัปดาห์ · รายงาน A1H วันศุกร์ · รายงาน A9 วันพุธ (Demand Pulse · สัญญาณเตือน · หลักฐานสมมติฐาน · ธีมเสียงลูกค้า · แพ้–ชนะ) · `indicators` · `market` · `voice` · Daily Brief ของสัปดาห์ (จุดเตือนที่ตรวจ กฎระเบียบที่กำลังมา จุดบอด) · `tenders` · `partners` · `battles` · `issues` · `decisions` · A7 ฉบับก่อน

## Procedure

1. **Plan Disruption Scorecard** — ให้สถานะทุกกลยุทธ์ตาม [เกณฑ์](../../../knowledge-base/03-weekly-disruption-cycle.md#42-สถานะแผนรายกลยุทธ์-a7) พร้อมเหตุผล 1 ประโยคและรหัสหลักฐานไม่เกิน 5 รายการ · เปลี่ยนสถานะเมื่อมีหลักฐานใหม่เท่านั้น
2. **Must-Win** — สถานะและเหตุผล จากกลยุทธ์ที่ผูกอยู่และความคืบหน้าจาก A6
3. **สมมติฐาน** — ปรับสถานะ (แข็งแรงขึ้น / จับตา / เริ่มสั่นคลอน / ถูกท้าทาย) เมื่อหลักฐานชัด พร้อมแนบรหัสสัญญาณ
4. **Mintzberg** — Emerging (โอกาสนอกแผน รวมข้อเสนอจาก Horizon Scan) และ Non-Realized (แผนที่อาจไม่เกิด)
   - สัญญาณอ่อน H2–H3 อย่างเดียวไม่ทำให้กลยุทธ์ "ถูก Disrupt" — ใช้เป็นเหตุผลให้ "จับตา" หรือเป็น Emerging
   - ตัวชี้วัดภายนอกใช้เป็นหลักฐานของสมมติฐานด้านต้นทุนและการเงิน อ้างเป็น `IND-<key>`
   - ตัวเลขอุปสงค์ สัญญาณเตือน Control Chart และ `assumptionEvidence` ของ A9 ใช้เป็นหลักฐานของสมมติฐานด้านอุปสงค์และลูกค้า (D1/D2) อ้างเป็น `MKT-<key>` · เสียงลูกค้าอ้างเป็น `VOC-…`
   - **จุดที่ Radar ยังมองไม่เห็น** (`radarGaps`) — กลยุทธ์ที่ไม่มีสัญญาณใน 30 วัน และ driver / ด้านที่ไม่มีหลักฐาน เพื่อให้ Strategy Office ปรับคำค้น
5. **Disruptions 3–8 เรื่อง** เรียงตามความรุนแรง + คำถามสำหรับผู้บริหาร 3–5 ข้อ
6. **ฉบับไตรมาส** — สรุป deliberate / realized / emergent สมมติฐานที่เปลี่ยน และบทเรียน
7. **เขียน** `reports/A7-YYYY-MM-DD` และอัปเดต `agents/A7.lastRun`

## Guardrails

- ทุกสถานะต้องย้อนไปหาหลักฐานได้ หรือระบุว่า "ไม่มีข้อมูล"
- แก้ได้เฉพาะสถานะและหลักฐานของสมมติฐาน — ห้ามแก้ชื่อ วัตถุประสงค์ หรือเป้าหมายของกลยุทธ์
- ค้นเว็บได้ไม่เกิน 5 ครั้ง เพื่อยืนยันข้อเท็จจริงของเรื่องที่ให้สถานะ "ถูก Disrupt" เท่านั้น
- ผลประเมินเป็นข้อเสนอให้ Strategy Office และผู้บริหารยืนยัน
