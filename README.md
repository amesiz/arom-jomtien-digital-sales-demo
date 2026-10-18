# AROM Jomtien — Digital Sales Command Center Demo

เดโม่เชิงโต้ตอบสำหรับระบบการตลาดออนไลน์, CRM, ผังห้อง และการจองของโครงการ AROM Jomtien

[เปิดระบบเดโม่ผ่าน GitHub Pages](https://amesiz.github.io/arom-jomtien-digital-sales-demo/)

Sites deployment นี้เป็น private demo สำหรับเจ้าของบัญชี ไม่ใช่เว็บไซต์ทางการของโครงการ

## เปิดใช้งานบน Windows

1. ดับเบิลคลิก `run-demo.ps1` หรือคลิกขวา **Run with PowerShell**
2. ระบบจะเปิดเว็บที่ `http://localhost:4173`
3. ปิดหน้าต่าง PowerShell เมื่อต้องการหยุดเดโม่

หรือเปิด `app/index.html` โดยตรงได้ แต่การเปิดผ่าน local server จะทำงานเหมือนเว็บไซต์จริงมากกว่า

## โมดูล

- Command Center — ภาพรวม funnel, ทีม และคำศัพท์สำคัญ
- Marketing Intelligence — งบ, channel, CPL, lead quality, booking value และ ROAS
- Sales CRM — lead จากออนไลน์/บูธ/นายหน้า/referral, owner, follow-up, visit และสถานะธนาคาร
- Unit Inventory & Booking — ผังห้องตัวอย่าง, hold/interest/booked, การรับเงินจองจำลอง และใบจอง
- Public Website Redesign — หน้าเว็บแนวคิดใหม่พร้อมแบบฟอร์มที่ส่ง lead เข้า CRM บนเบราว์เซอร์เดียวกัน

## ข้อควรทราบ

- นี่คือ concept demo ไม่ใช่เว็บไซต์หรือระบบทางการของ AROM Jomtien
- ข้อมูล performance, ลูกค้า, ราคาห้อง, booking value และรายการชำระเงินเป็นข้อมูลสมมติ
- ไม่มีการเรียกเก็บเงินจริง ข้อมูลเดโม่เก็บเฉพาะใน `localStorage` ของเบราว์เซอร์
- ข้อมูลโครงการอ้างอิงจากหน้าโครงการทางการ: https://www.coloursdevelopment.com/aromjomtien/

## โครงสร้าง

```text
app/
  index.html           Command Center
  marketing/           Performance dashboard
  crm/                 CRM + inventory + booking
  website/             Public website concept
  assets/              Concept visuals
deliverables/           Presentation, PDF and demo clip
```

## Deliverables

- `deliverables/AROM-Jomtien-System-Demo-Guide.pptx`
- `deliverables/AROM-Jomtien-Project-and-Digital-Sales-Proposal.pdf`
- `deliverables/AROM-Jomtien-System-Demo.webm`
