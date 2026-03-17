// ===== tutorial.js =====
// 5-step spotlight tutorial shown after first login

const tutorialSteps = [
  {
    targetId: "tour-stats",
    title: "📊 Your Store at a Glance",
    titleHi: "📊 आपकी दुकान एक नज़र में",
    text: "These 4 cards show your most important numbers — total products, low stock alerts, today's sales, and monthly revenue. Updated in real time.",
    textHi: "ये 4 कार्ड आपके सबसे ज़रूरी नंबर दिखाते हैं — कुल उत्पाद, कम स्टॉक अलर्ट, आज की बिक्री और मासिक आय।",
    position: "bottom"
  },
  {
    targetId: "tour-chart",
    title: "📈 Weekly Sales Chart",
    titleHi: "📈 साप्ताहिक बिक्री चार्ट",
    text: "This bar chart shows your sales for each day of the week. Spot your best and worst days instantly.",
    textHi: "यह बार चार्ट सप्ताह के हर दिन की बिक्री दिखाता है। अपने सबसे अच्छे और बुरे दिन तुरंत पहचानें।",
    position: "top"
  },
  {
    targetId: "tour-inventory",
    title: "📦 Inventory Status",
    titleHi: "📦 इन्वेंटरी स्थिति",
    text: "Keep an eye on items running low. Red means critical — reorder immediately. Click View All to manage your full stock.",
    textHi: "कम हो रही वस्तुओं पर नज़र रखें। लाल मतलब ज़रूरी — तुरंत ऑर्डर करें। पूरा स्टॉक देखने के लिए 'सभी देखें' पर क्लिक करें।",
    position: "top"
  },
  {
    targetId: "tour-udhaar",
    title: "📒 Udhaar Khata",
    titleHi: "📒 उधार खाता",
    text: "Track credit given to customers. Names highlighted in red are defaulters who haven't paid back on time. Add partial payments, notes, or mark as paid.",
    textHi: "ग्राहकों को दिए गए उधार को ट्रैक करें। लाल रंग में हाइलाइट नाम डिफॉल्टर हैं जिन्होंने समय पर भुगतान नहीं किया। आंशिक भुगतान जोड़ें या पेड मार्क करें।",
    position: "top"
  },
  {
    targetId: "tour-ai",
    title: "🤖 AI Insights",
    titleHi: "🤖 AI अंतर्दृष्टि",
    text: "Your AI assistant analyses store data and gives smart suggestions. Ask it anything — 'What should I reorder?' or 'What is my best seller?'",
    textHi: "AI सहायक आपके स्टोर डेटा का विश्लेषण करता है। कुछ भी पूछें — 'क्या ऑर्डर करूं?' या 'सबसे ज़्यादा क्या बिकता है?'",
    position: "top"
  },
  {
    targetId: "tour-sidebar",
    title: "🗂️ Navigation",
    titleHi: "🗂️ नेविगेशन",
    text: "Use the sidebar to switch between Overview, Inventory, Sales Analytics, and AI Insights. You are all set — welcome to Dukaandaari!",
    textHi: "ओवरव्यू, इन्वेंटरी, सेल्स और AI इनसाइट्स के बीच जाने के लिए साइडबार उपयोग करें। आप तैयार हैं — Dukaandaari में आपका स्वागत है!",
    position: "right"
  }
];

let currentStep = 0;
let isHindi = false;

function startTutorial() {
  if (sessionStorage.getItem("tourDone")) return;
  isHindi = localStorage.getItem("lang") === "hi";
  currentStep = 0;
  buildOverlay();
  showStep(0);
}

function buildOverlay() {
  // Dark overlay
  const overlay = document.createElement("div");
  overlay.id = "tourOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:8000;pointer-events:none;";
  document.body.appendChild(overlay);

  // Spotlight box
  const spot = document.createElement("div");
  spot.id = "tourSpotlight";
  spot.style.cssText = `
    position:fixed;border-radius:12px;z-index:8001;pointer-events:none;
    box-shadow:0 0 0 9999px rgba(0,0,0,0.65);
    border:2.5px solid #06b6d4;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
  `;
  document.body.appendChild(spot);

  // Tooltip card
  const tip = document.createElement("div");
  tip.id = "tourTooltip";
  tip.style.cssText = `
    position:fixed;background:#fff;border-radius:16px;padding:22px 24px;
    width:300px;box-shadow:0 24px 64px rgba(0,0,0,0.22);
    z-index:8002;font-family:Inter,sans-serif;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
  `;
  tip.innerHTML = `
    <div id="tourBadge" style="font-size:11px;font-weight:700;color:#06b6d4;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px;"></div>
    <div id="tourTitle" style="font-size:15px;font-weight:800;color:#111827;margin-bottom:8px;line-height:1.3;"></div>
    <div id="tourText"  style="font-size:13px;color:#6b7280;line-height:1.7;margin-bottom:20px;"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div id="tourDots" style="display:flex;gap:5px;"></div>
      <div style="display:flex;gap:8px;">
        <button id="tourSkipBtn" style="padding:7px 13px;border-radius:8px;border:1px solid #e5e7eb;background:#f9fafb;color:#6b7280;font-size:12px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;"></button>
        <button id="tourNextBtn" style="padding:7px 16px;border-radius:8px;border:none;background:#06b6d4;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"></button>
      </div>
    </div>
  `;
  document.body.appendChild(tip);

  document.getElementById("tourSkipBtn").addEventListener("click", endTutorial);
  document.getElementById("tourNextBtn").addEventListener("click", nextStep);
}

function showStep(index) {
  const step   = tutorialSteps[index];
  const target = document.getElementById(step.targetId);
  if (!target) { nextStep(); return; }

  target.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    const rect = target.getBoundingClientRect();
    const pad  = 10;

    // Spotlight
    const spot = document.getElementById("tourSpotlight");
    spot.style.left   = (rect.left   - pad) + "px";
    spot.style.top    = (rect.top    - pad) + "px";
    spot.style.width  = (rect.width  + pad * 2) + "px";
    spot.style.height = (rect.height + pad * 2) + "px";

    // Content
    const isLast = index === tutorialSteps.length - 1;
    document.getElementById("tourBadge").textContent = (isHindi ? "चरण " : "Step ") + (index + 1) + " / " + tutorialSteps.length;
    document.getElementById("tourTitle").textContent = isHindi ? step.titleHi : step.title;
    document.getElementById("tourText").textContent  = isHindi ? step.textHi  : step.text;
    document.getElementById("tourSkipBtn").textContent = isHindi ? "छोड़ें" : "Skip";
    document.getElementById("tourNextBtn").textContent = isLast ? (isHindi ? "✓ शुरू करें" : "✓ Get Started") : (isHindi ? "अगला →" : "Next →");

    // Dots
    document.getElementById("tourDots").innerHTML = tutorialSteps.map((_, i) =>
      `<div style="width:7px;height:7px;border-radius:50%;background:${i === index ? "#06b6d4" : "#e5e7eb"};transition:background 0.3s;"></div>`
    ).join("");

    // Position tooltip
    const tipW = 300, tipH = 200, margin = 18;
    let tipLeft, tipTop;

    if (step.position === "right") {
      tipLeft = rect.right + margin;
      tipTop  = rect.top + (rect.height / 2) - (tipH / 2);
    } else if (step.position === "bottom") {
      tipLeft = rect.left + (rect.width / 2) - (tipW / 2);
      tipTop  = rect.bottom + margin + pad;
    } else {
      tipLeft = rect.left + (rect.width / 2) - (tipW / 2);
      tipTop  = rect.top - tipH - margin;
    }

    // Keep inside viewport
    tipLeft = Math.max(16, Math.min(tipLeft, window.innerWidth  - tipW - 16));
    tipTop  = Math.max(16, Math.min(tipTop,  window.innerHeight - tipH - 16));

    const tip = document.getElementById("tourTooltip");
    tip.style.left = tipLeft + "px";
    tip.style.top  = tipTop  + "px";
  }, 300);
}

function nextStep() {
  currentStep++;
  if (currentStep >= tutorialSteps.length) {
    endTutorial();
  } else {
    showStep(currentStep);
  }
}

function endTutorial() {
  ["tourOverlay", "tourSpotlight", "tourTooltip"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  sessionStorage.setItem("tourDone", "true");
}

window.startTutorial = startTutorial;
window.endTutorial   = endTutorial;