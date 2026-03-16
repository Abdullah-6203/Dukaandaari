// ===== translations.js =====
// Hindi / English language translations

const translations = {
    en: {
      // Login page
      welcomeBack: "Welcome back 👋",
      signInTo: "Sign in to your Dukaandaari account",
      username: "Username",
      password: "Password",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password",
      signIn: "Sign In",
      signingIn: "Signing in...",
      errorEmpty: "Please enter both username and password.",
      errorWrong: "Incorrect username or password. Please try again.",
      demoCredentials: "Demo credentials",
      switchToHindi: "हिंदी में देखें",
      switchToEnglish: "View in English",
      footerNote: "Dukaandaari · Built by LogicFlux · GenCode X 2026",
  
      // Sidebar
      smartRetail: "Smart Retail",
      welcomeText: "Welcome back,",
      greeting: "Hi, Chaitanya! 👋",
      mainMenu: "Main Menu",
      overview: "Overview",
      inventory: "Inventory Tracker",
      sales: "Sales Analytics",
      aiInsights: "AI Insights",
      alerts: "Alerts",
      whatsappAlerts: "WhatsApp Alerts",
      systemOnline: "System Online",
  
      // Overview page
      todayDate: "Monday, 16 March 2026",
      sendAlert: "💬 Send WhatsApp Alert",
      totalProducts: "Total Products",
      lowStockItems: "Low Stock Items",
      todaySales: "Today's Sales",
      monthlyRevenue: "Monthly Revenue",
      weeklySales: "Weekly Sales Performance",
      last7days: "Last 7 days revenue breakdown",
      thisWeek: "This Week",
      inventoryStatus: "Inventory Status",
      itemsAttention: "Items needing attention",
      viewAll: "View All →",
      topCategories: "Top Selling Categories",
      revenueShare: "Revenue share by category",
      details: "Details →",
      aiInsightDay: "AI Insight of the Day",
      askAI: "Ask AI →",
    },
  
    hi: {
      // Login page
      welcomeBack: "वापसी पर स्वागत है 👋",
      signInTo: "अपने Dukaandaari खाते में साइन इन करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      usernamePlaceholder: "अपना उपयोगकर्ता नाम दर्ज करें",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      errorEmpty: "कृपया उपयोगकर्ता नाम और पासवर्ड दोनों दर्ज करें।",
      errorWrong: "गलत उपयोगकर्ता नाम या पासवर्ड। कृपया पुनः प्रयास करें।",
      demoCredentials: "डेमो क्रेडेंशियल",
      switchToHindi: "हिंदी में देखें",
      switchToEnglish: "View in English",
      footerNote: "Dukaandaari · LogicFlux द्वारा निर्मित · GenCode X 2026",
  
      // Sidebar
      smartRetail: "स्मार्ट रिटेल",
      welcomeText: "वापसी पर स्वागत,",
      greeting: "नमस्ते, Chaitanya! 👋",
      mainMenu: "मुख्य मेनू",
      overview: "अवलोकन",
      inventory: "इन्वेंटरी ट्रैकर",
      sales: "बिक्री विश्लेषण",
      aiInsights: "AI अंतर्दृष्टि",
      alerts: "अलर्ट",
      whatsappAlerts: "WhatsApp अलर्ट",
      systemOnline: "सिस्टम ऑनलाइन",
  
      // Overview page
      todayDate: "सोमवार, 16 मार्च 2026",
      sendAlert: "💬 WhatsApp अलर्ट भेजें",
      totalProducts: "कुल उत्पाद",
      lowStockItems: "कम स्टॉक आइटम",
      todaySales: "आज की बिक्री",
      monthlyRevenue: "मासिक आय",
      weeklySales: "साप्ताहिक बिक्री प्रदर्शन",
      last7days: "पिछले 7 दिनों का राजस्व",
      thisWeek: "इस सप्ताह",
      inventoryStatus: "इन्वेंटरी स्थिति",
      itemsAttention: "ध्यान देने योग्य वस्तुएं",
      viewAll: "सभी देखें →",
      topCategories: "शीर्ष बिकने वाली श्रेणियां",
      revenueShare: "श्रेणी अनुसार राजस्व",
      details: "विवरण →",
      aiInsightDay: "आज की AI अंतर्दृष्टि",
      askAI: "AI से पूछें →",
    }
  };
  
  // ---- Get current language ----
  function getLang() {
    return localStorage.getItem("lang") || "en";
  }
  
  // ---- Get a translation string ----
  function t(key) {
    const lang = getLang();
    return translations[lang][key] || translations["en"][key] || key;
  }
  
  // ---- Toggle language and reload ----
  function toggleLanguage() {
    const current = getLang();
    localStorage.setItem("lang", current === "en" ? "hi" : "en");
    location.reload();
  }
  
  window.t = t;
  window.getLang = getLang;
  window.toggleLanguage = toggleLanguage;