# 🏪 Dukaandaari

> Because every dukaan deserves to be a smart dukaan.

Dukaandaari is an AI-powered retail management dashboard built for small 
and mid-size Indian kirana stores. It gives store owners real-time insights 
into their inventory, sales, and business performance — without needing any 
technical knowledge.

---

## ✨ Features

- 📊 **Overview Dashboard** — Live stat cards for sales, revenue, stock and orders
- 📦 **Inventory Tracker** — Add, remove and monitor stock with low stock alerts
- 📈 **Sales Analytics** — Weekly/monthly revenue trends, peak hours, top products
- 🛒 **Sell Items** — Record sales, auto-deduct stock, track daily transactions
- 📒 **Udhaar Khata** — Credit tracker with automatic defaulter highlighting
- 🤖 **AI Insights** — Ask business questions in plain language via Gemini AI
- 💬 **WhatsApp Alerts** — Send low stock alerts directly via Twilio WhatsApp
- 🌐 **Hindi Support** — Full Hindi language toggle on the login page
- 🎯 **Onboarding Tutorial** — 5-step guided tour for first-time users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Tailwind CSS, JavaScript |
| Charts | Chart.js |
| AI | Google Gemini API (gemini-1.5-flash) |
| WhatsApp | Twilio WhatsApp API |
| Backend | Node.js + Express.js |
| State | sessionStorage (cross-page persistence) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Gemini API key (free from [aistudio.google.com](https://aistudio.google.com))
- Twilio account (free trial from [twilio.com](https://twilio.com))

### Installation

1. Clone the repository
   git clone https://github.com/yourusername/dukaandaari.git
   cd dukaandaari

2. Install dependencies
   npm install express twilio node-fetch

3. Add your credentials in backend/server.js
   const GEMINI_API_KEY = "your_key_here";
   const TWILIO_SID     = "your_sid_here";
   const TWILIO_AUTH    = "your_auth_token";
   const TWILIO_WA_TO   = "whatsapp:+91XXXXXXXXXX";

4. Start the server
   node backend/server.js

5. Open in browser
   http://localhost:3000/login.html

### Login Credentials (Demo)
- Username: chaitanya
- Password: dukaan123

---

## 📁 Project Structure

dukaandaari/
├── login.html              # Login page with Hindi toggle
├── index.html              # Overview dashboard
├── inventory.html          # Inventory tracker
├── sales.html              # Sales analytics
├── ai-insights.html        # AI chat interface
├── CSS/
│   └── style.css           # All styles
├── JS/
│   ├── ai.js               # Gemini AI logic
│   ├── charts.js           # Chart.js configurations
│   ├── whatsapp.js         # WhatsApp alert logic
│   ├── tutorial.js         # Onboarding tour
│   ├── translations.js     # Hindi/English translations
│   └── state.js            # Cross-page state management
└── backend/
    └── server.js           # Express server + API proxy

---

## 👥 Team

Built by **LogicFlux** for **GenCode X — Catalyst Gen AI, JEMTEC 2026**

---

## ⚠️ Note

This project was built as a hackathon submission. The login credentials 
and API keys in the demo are for testing purposes only. Do not expose 
real credentials in public repositories.
```

---

**Topics/Tags to add on GitHub:**
```
retail-management, kirana, dashboard, gemini-ai, twilio, whatsapp, 
javascript, tailwindcss, nodejs, hackathon, hindi, india
