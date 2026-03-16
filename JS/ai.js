// ===== ai.js =====
// Calls your local Node.js server which proxies to Gemini
// No CORS issues this way!

// ---- Fallback responses (used when server is not running) ----
function getFallbackResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes("top selling") || m.includes("best product"))
    return "📦 Your top sellers this week:\n1. Amul Milk 1L — Rs 8,840\n2. Parle-G 800g — Rs 6,420\n3. Fortune Rice 5kg — Rs 5,700\n4. Tata Tea 500g — Rs 4,840\n5. Coca-Cola 2L — Rs 3,800\n\nDairy is your strongest category at 32% of total revenue!";
  if (m.includes("reorder") || m.includes("stock") || m.includes("low"))
    return "🚨 Reorder urgently Chaitanya!\n• Parle-G 800g — only 3 units left!\n• Coca-Cola 2L — 4 units\n• Amul Butter — 8 units\n• Maggi Noodles — 6 units";
  if (m.includes("best day") || m.includes("peak day"))
    return "📅 Your best day is Saturday with Rs 9,400 in sales — 30% above daily average. Stock up every Friday evening!";
  if (m.includes("peak hour") || m.includes("busy"))
    return "⏰ Your store is busiest between 6pm–8pm. That's 28% of your daily revenue. Be fully stocked before 5:30pm!";
  if (m.includes("waste") || m.includes("reduce") || m.includes("save"))
    return "♻️ To cut waste Chaitanya:\n• Order dairy in smaller batches\n• Add a near-expiry discount shelf\n• This can save Rs 3,000–5,000 per month!";
  if (m.includes("summary") || m.includes("weekly") || m.includes("report"))
    return "📊 Weekly Summary:\n• Revenue: Rs 51,620 (↑14%)\n• Orders: 384 | Avg: Rs 134\n• Best Day: Saturday\n• Action: Reorder Parle-G and Coca-Cola today!";
  if (m.includes("revenue") || m.includes("sales") || m.includes("money"))
    return "💰 Today: Rs 8,420 (↑18%). This month: Rs 2,10,000. You are on track for a great month Chaitanya!";
  return "🤖 I can answer questions about your inventory, sales, top products, peak hours and more. Try asking something like 'which items should I reorder?'";
}

// ---- Call Gemini via local server (no CORS) ----
async function callGemini(userMsg) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await res.json();

  if (data.error) throw new Error(data.error);
  return data.reply;
}

// ---- Send message ----
async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg   = input.value.trim();
  if (!msg) return;
  input.value = "";

  appendUserMessage(msg);
  const typingId = appendTyping();

  try {
    // Try the server first
    const reply = await callGemini(msg);
    removeTyping(typingId);
    appendAIMessage(reply);
  } catch (err) {
    removeTyping(typingId);
    // If server not running, use smart fallback
    const fallback = getFallbackResponse(msg);
    appendAIMessage(fallback);
  }
}

function askSuggestion(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

// ---- Chat UI helpers ----
function appendUserMessage(msg) {
  const div = document.createElement("div");
  div.className = "chat-bubble";
  div.innerHTML = `
    <div class="bubble-row user">
      <div class="bubble-content"><p class="bubble-text">${msg}</p></div>
      <div class="bubble-avatar user">👤</div>
    </div>`;
  document.getElementById("chatArea").appendChild(div);
  scrollChat();
}

function appendAIMessage(msg) {
  const div = document.createElement("div");
  div.className = "chat-bubble";
  div.innerHTML = `
    <div class="bubble-row">
      <div class="bubble-avatar ai">🤖</div>
      <div class="bubble-content">
        <p class="bubble-name">Dukaandaari AI</p>
        <p class="bubble-text">${msg}</p>
      </div>
    </div>`;
  document.getElementById("chatArea").appendChild(div);
  scrollChat();
}

function appendTyping() {
  const id  = "typing-" + Date.now();
  const div = document.createElement("div");
  div.id    = id;
  div.className = "chat-bubble";
  div.innerHTML = `
    <div class="bubble-row">
      <div class="bubble-avatar ai">🤖</div>
      <div class="bubble-content">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  document.getElementById("chatArea").appendChild(div);
  scrollChat();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function scrollChat() {
  const chat = document.getElementById("chatArea");
  chat.scrollTop = chat.scrollHeight;
}

// ---- Expose to window ----
window.sendMessage   = sendMessage;
window.askSuggestion = askSuggestion;

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  if (input) input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
});