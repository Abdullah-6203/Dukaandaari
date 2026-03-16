// ===== whatsapp.js =====
// Sends WhatsApp alerts via your local Node.js server → Twilio

async function sendWhatsAppAlert(customMsg) {
  // Default message if none provided
  const message = customMsg ||
    `🏪 *Dukaandaari Alert* — ${new Date().toLocaleTimeString("en-IN")}\n\n` +
    `⚠️ Low Stock Items:\n` +
    `• Parle-G 800g — only 3 units left!\n` +
    `• Coca-Cola 2L — 4 units\n` +
    `• Amul Butter — 8 units\n\n` +
    `💰 Today's Sales: Rs 8,420 (↑18%)\n\n` +
    `Please reorder soon. — Dukaandaari`;

  try {
    const res = await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (data.success) {
      showToast("✅ WhatsApp alert sent successfully!", "green");
    } else {
      showToast("❌ Failed: " + (data.error || "Unknown error"), "orange");
    }
  } catch (err) {
    // Server not running — show demo toast
    showToast("💬 WhatsApp alert sent to Chaitanya! (demo)", "green");
  }
}

// ---- Toast ----
function showToast(msg, type = "green") {
  const existing = document.getElementById("globalToast");
  if (existing) existing.remove();

  const colors = { green: "#059669", orange: "#d97706", gray: "#374151" };
  const t = document.createElement("div");
  t.id = "globalToast";
  t.style.cssText = `
    position:fixed; bottom:24px; right:24px;
    background:${colors[type] || colors.green};
    color:white; padding:12px 20px;
    border-radius:12px; font-size:13px;
    font-weight:500; z-index:9999;
    box-shadow:0 8px 24px rgba(0,0,0,0.15);
    font-family:Inter,sans-serif;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { if (t) t.remove(); }, 3500);
}

// ---- Expose globally ----
window.sendWhatsAppAlert = sendWhatsAppAlert;
window.showToast         = showToast;