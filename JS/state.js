// ===== state.js =====
// Saves and restores dashboard state across page navigations
// Add <script src="JS/state.js"></script> to every page

const State = {

    // ---- Save a value ----
    set(key, value) {
      sessionStorage.setItem('dk_' + key, JSON.stringify(value));
    },
  
    // ---- Get a value ----
    get(key, defaultValue) {
      const val = sessionStorage.getItem('dk_' + key);
      if (val === null) return defaultValue;
      try { return JSON.parse(val); } catch { return defaultValue; }
    },
  
    // ---- Save entire dashboard state ----
    saveDashboard(state) {
      this.set('dashboard', state);
    },
  
    // ---- Load dashboard state ----
    loadDashboard() {
      return this.get('dashboard', {
        totalProducts:  248,
        lowStock:       14,
        todaySales:     0,
        monthlyRevenue: 210000,
        totalOrders:    384,
        todayOrders:    0,
      });
    },
  
    // ---- Save sales log ----
    saveSalesLog(log) {
      this.set('salesLog', log);
    },
  
    // ---- Load sales log ----
    loadSalesLog() {
      return this.get('salesLog', []);
    },
  
    // ---- Save inventory ----
    saveInventory(data) {
      this.set('inventory', data);
    },
  
    // ---- Load inventory ----
    loadInventory() {
      return this.get('inventory', null); // null = use default
    },
  
  };
  
  window.State = State;