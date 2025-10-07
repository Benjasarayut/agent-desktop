
# Agent Desktop (Electron + React)

แอปเดสก์ท็อปสำหรับ **Agent Wallboard System** พัฒนาด้วย **Electron.js + React**  
มีฟีเจอร์ล็อกอิน เปลี่ยนสถานะ (Available/Busy/Break/Offline), รับข้อความแบบเรียลไทม์, ระบบแจ้งเตือนเดสก์ท็อป และ System Tray

---

## ✨ ฟีเจอร์
- ⚡ Electron + React โครงสร้างพร้อมรัน Dev/Prod
- 🔐 Login (mock เมื่อยังไม่มี backend)
- 📊 เปลี่ยนสถานะ Agent + ปุ่มลัดใน **System Tray**
- 💬 รับข้อความจาก Supervisor (ผ่าน WebSocket)
- 🔔 Desktop Notification + (ตัวเลือก) เสียงแจ้งเตือน
- ♻️ Auto-reconnect socket, กันเปิดแอปซ้ำ (single instance)
- 🧰 โค้ด IPC ครบ (`show-notification`, `close-app`, `get-version`)

---

## 🧱 เทคโนโลยี
- **Electron** (main, preload)
- **React 18** (CRA)
- **socket.io-client**
- **electron-builder** (แพ็กเป็น .exe)

---

## 📁 โครงสร้างโปรเจกต์

```text
agent-desktop/
|-- package.json
|-- .env.example
|-- main.js
|-- preload.js
|-- public/
|   |-- index.html
|   `-- assets/
|       |-- icon.png
|       |-- tray-icon.png
|       `-- notify.mp3
|-- src/
|   |-- index.js
|   |-- App.js
|   |-- components/
|   |   |-- LoginForm.js
|   |   |-- StatusPanel.js
|   |   |-- MessagePanel.js
|   |   `-- AgentInfo.js
|   |-- services/
|   |   |-- api.js
|   |   |-- socket.js
|   |   `-- notifications.js
|   |-- styles/
|   |   |-- App.css
|   |   `-- components.css
|   `-- utils/
|       |-- dateUtils.js
|       `-- validation.js
`-- build/


---
```

## 🚀 เริ่มต้นใช้งาน

### 1) เตรียมเครื่อง
- Node.js 18+ แนะนำ LTS
- npm 9+

### 2) ติดตั้งแพ็กเกจ
```bash
npm install
