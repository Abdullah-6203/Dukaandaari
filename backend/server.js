// ===== server.js =====
// Run: node backend/server.js
// Open: http://localhost:3000/login.html

const express = require("express");
const path    = require("path");
const twilio  = require("twilio");
const fetch   = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

// =============================================
// ---- YOUR CREDENTIALS — FILL THESE IN ----
// =============================================

const GEMINI_API_KEY = "AIzaSyDSbTY4T83-C9ypYCi_c-IOyn_H4U3s4UE";  // Paste your Gemini key here
const TWILIO_SID     = "ACf4761d7eee955e914e4707d217ef8a62";  // Your Twilio SID
const TWILIO_AUTH    = "a9d7747c39a3711cfc9970650d3779f4";  // Paste your Twilio Auth Token here
const TWILIO_WA_TO   = "whatsapp:+919911992858";  // Your WhatsApp number

// =============================================

const app = express();
app.use(express.json());

// Serve all static files from project root
app.use(express.static(path.join(__dirname, "..")));

// Redirect root to login
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// ============================================================
// ROUTE 1 — Gemini AI
// ============================================================
app.post("/api/gemini", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API key not set in server.js" });
  }

  const STORE_CONTEXT = `You are Dukaandaari AI, a friendly smart retail assistant for a small Indian kirana store owned by Chaitanya.

Store Data:
- Total Products: 248
- Today Sales: Rs 8,420 (up 18%)
- Monthly Revenue: Rs 2,10,000
- Low Stock: Amul Butter 8 units, Maggi Noodles 6 units, Coca-Cola 4 units
- Critical: Parle-G only 3 units
- Best day: Saturday Rs 9,400
- Peak hours: 6pm to 8pm
- Top product: Amul Milk 1L

Reply in 3 to 5 lines max. Be friendly. Call owner Chaitanya sometimes. Use Rs for currency.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: STORE_CONTEXT + "\n\nUser question: " + message }]
          }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini error:", data.error.message);
      return res.status(400).json({ error: data.error.message });
    }

    const reply = data.candidates[0].content.parts[0].text;
    console.log(`🤖 Gemini replied`);
    res.json({ reply });

  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ROUTE 2 — WhatsApp Alert via Twilio
// ============================================================
app.post("/api/whatsapp", async (req, res) => {
  if (!TWILIO_SID || !TWILIO_AUTH) {
    return res.status(500).json({ error: "Twilio credentials not set in server.js" });
  }

  const now  = new Date();
  const date = now.toLocaleDateString("en-IN", { day: "numeric", month: "numeric" });
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  try {
    const client = twilio(TWILIO_SID, TWILIO_AUTH);

    const message =
      `🏪 *Dukaandaari Alert* — ${date} at ${time}\n\n` +
      `⚠️ *Low Stock Items:*\n` +
      `• Parle-G 800g — only 3 units left!\n` +
      `• Coca-Cola 2L — 4 units\n` +
      `• Amul Butter — 8 units\n` +
      `• Maggi Noodles — 6 units\n\n` +
      `💰 *Today Sales:* Rs 8,420 (↑18%)\n\n` +
      `Please reorder soon.\n— Dukaandaari`;

    const result = await client.messages.create({
      from: "whatsapp:+14155238886",
      to:   TWILIO_WA_TO,
      body: message,
    });

    console.log(`✅ WhatsApp sent! SID: ${result.sid}`);
    res.json({ success: true, sid: result.sid });

  } catch (err) {
    console.error("Twilio error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// START SERVER
// ============================================================
const PORT = 3000;

app.listen(PORT, () => {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🏪  Dukaandaari Server Running!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Open: http://localhost:${PORT}/login.html`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(GEMINI_API_KEY ? "  ✅  Gemini API ready"    : "  ⚠️   Gemini key missing — add it at line 16");
  console.log(TWILIO_AUTH    ? "  ✅  Twilio ready"        : "  ⚠️   Twilio auth missing — add it at line 18");
  console.log(`  📱  Alerts → ${TWILIO_WA_TO}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});