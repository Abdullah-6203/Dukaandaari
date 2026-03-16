// ===== inventory.js =====

const inventoryData = [
  { name: "Tata Salt 1kg",        category: "Staples",       stock: 42, price: 24  },
  { name: "Amul Butter 500g",     category: "Dairy & Eggs",  stock: 8,  price: 280 },
  { name: "Parle-G 800g",         category: "Snacks",        stock: 3,  price: 60  },
  { name: "Surf Excel 1kg",       category: "Personal Care", stock: 29, price: 120 },
  { name: "Maggi Noodles",        category: "Snacks",        stock: 6,  price: 14  },
  { name: "Amul Milk 1L",         category: "Dairy & Eggs",  stock: 55, price: 68  },
  { name: "Fortune Rice 5kg",     category: "Staples",       stock: 18, price: 380 },
  { name: "Coca-Cola 2L",         category: "Beverages",     stock: 4,  price: 95  },
  { name: "Colgate 200g",         category: "Personal Care", stock: 22, price: 99  },
  { name: "Haldiram Bhujia",      category: "Snacks",        stock: 31, price: 30  },
  { name: "Tata Tea 500g",        category: "Beverages",     stock: 14, price: 220 },
  { name: "Aashirvaad Atta 5kg",  category: "Staples",       stock: 9,  price: 290 },
];

function getStatus(stock) {
  if (stock <= 5)  return "Critical";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

function getBadgeClass(status) {
  return { "In Stock": "badge-green", "Low Stock": "badge-orange", "Critical": "badge-red" }[status];
}

function updateSummaryCards() {
  document.getElementById("totalCount").textContent    = inventoryData.length;
  document.getElementById("inStockCount").textContent  = inventoryData.filter(i => getStatus(i.stock) === "In Stock").length;
  document.getElementById("lowCount").textContent      = inventoryData.filter(i => getStatus(i.stock) === "Low Stock").length;
  document.getElementById("criticalCount").textContent = inventoryData.filter(i => getStatus(i.stock) === "Critical").length;
}

function renderTable(data) {
  const tbody = document.getElementById("inventoryTable");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:#9ca3af;font-size:13px;">No products found</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map((item) => {
    const status     = getStatus(item.stock);
    const badgeClass = getBadgeClass(status);
    const realIndex  = inventoryData.indexOf(item);
    return `
      <tr>
        <td style="font-weight:600;color:#111827">${item.name}</td>
        <td>${item.category}</td>
        <td style="font-weight:600">${item.stock} units</td>
        <td>₹${item.price}</td>
        <td><span class="badge ${badgeClass}">${status}</span></td>
        <td><button class="btn-danger" onclick="window.deleteProduct(${realIndex})">Remove</button></td>
      </tr>`;
  }).join("");
}

function filterTable() {
  const search   = document.getElementById("searchInput").value.toLowerCase();
  const status   = document.getElementById("statusFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const filtered = inventoryData.filter(item => {
    return item.name.toLowerCase().includes(search) &&
           (status === "all"   || getStatus(item.stock) === status) &&
           (category === "all" || item.category === category);
  });
  renderTable(filtered);
}

function addProduct() {
  const name     = document.getElementById("newName").value.trim();
  const category = document.getElementById("newCategory").value;
  const stock    = parseInt(document.getElementById("newStock").value);
  const price    = parseInt(document.getElementById("newPrice").value);

  if (!name)                     { showToast("⚠️ Please enter a product name!", "orange");        return; }
  if (isNaN(stock) || stock < 0) { showToast("⚠️ Please enter a valid stock quantity!", "orange"); return; }
  if (isNaN(price) || price < 0) { showToast("⚠️ Please enter a valid price!", "orange");          return; }

  inventoryData.unshift({ name, category, stock, price });
  renderTable(inventoryData);
  updateSummaryCards();
  hideModal();
  showToast(`✅ "${name}" added to inventory!`, "green");

  // Sync overview dashboard if open
  if (window.dashboardState && window.updateDashboard) {
    window.dashboardState.totalProducts = inventoryData.length;
    window.dashboardState.lowStock = inventoryData.filter(i =>
      getStatus(i.stock) === "Low Stock" || getStatus(i.stock) === "Critical"
    ).length;
    window.updateDashboard();
  }
}

function deleteProduct(index) {
  const name = inventoryData[index].name;
  inventoryData.splice(index, 1);
  renderTable(inventoryData);
  updateSummaryCards();
  showToast(`🗑️ "${name}" removed.`, "gray");

  // Sync overview dashboard if open
  if (window.dashboardState && window.updateDashboard) {
    window.dashboardState.totalProducts = inventoryData.length;
    window.dashboardState.lowStock = inventoryData.filter(i =>
      getStatus(i.stock) === "Low Stock" || getStatus(i.stock) === "Critical"
    ).length;
    window.updateDashboard();
  }
}

// ---- Modal: using display style directly, no CSS class needed ----
function showModal() {
  const modal = document.getElementById("addModal");
  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background = "rgba(0,0,0,0.45)";
  modal.style.zIndex = "999";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  setTimeout(() => document.getElementById("newName").focus(), 100);
}

function hideModal() {
  const modal = document.getElementById("addModal");
  modal.style.display = "none";
  document.getElementById("newName").value  = "";
  document.getElementById("newStock").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newCategory").selectedIndex = 0;
}

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
  setTimeout(() => { if (t) t.remove(); }, 3000);
}

// ---- Expose everything to window ----
window.showModal     = showModal;
window.hideModal     = hideModal;
window.addProduct    = addProduct;
window.deleteProduct = deleteProduct;
window.filterTable   = filterTable;

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  // Hide modal on outside click
  document.getElementById("addModal").addEventListener("click", function(e) {
    if (e.target === this) hideModal();
  });
  renderTable(inventoryData);
  updateSummaryCards();
});