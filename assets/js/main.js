/**
 * main.js
 * 名片系統前端邏輯（銘牌版）
 * 本頁面為純前端數位名片範例，不串接 API。
 * 負責：預設資料載入、名片內容渲染、服務項目分項、連結格式化、入場動畫。
 */

/**
 * 預設名片樣板資料。
 * 未來可由 API 或手動替換為真實資料。
 * @type {Object}
 */
const defaultCardData = {
  name: "王小明",
  title: "業務經理",
  company: "精準金屬加工股份有限公司",
  tax_id: "12345678",
  phone: "02-2345-6789",
  fax: "02-2345-6790",
  email: "ming.wang@example.com",
  line_id: "wang_metal",
  services: "CNC 銑削、車床加工、金屬表面處理、雷射切割",
  card_id: "001"
};

/**
 * 初始化名片頁面。
 * 載入預設資料、渲染名片、觸發入場動畫。
 */
function initCardPage() {
  renderBusinessCard(defaultCardData);
  triggerEntranceAnimation();
}

/**
 * 根據資料渲染整張名片。
 * @param {Object} data - 名片資料物件。
 */
function renderBusinessCard(data) {
  if (!data) return;

  // 標頭：姓名 + 職稱
  setTextOrFallback(queryOne("#cardName"), data.name);
  setTextOrFallback(queryOne("#cardTitle"), data.title);

  // 公司名稱與統編
  setTextOrFallback(queryOne("#cardCompany"), data.company);
  setTextOrFallback(queryOne("#cardTaxId"), data.tax_id);

  // 聯絡規格表：電話（可撥打）、傳真（純顯示）、信箱（可寄信）、Line ID
  setLink(queryOne("#cardPhone"), data.phone ? "tel:" + normalizePhone(data.phone) : "", data.phone);
  setTextOrFallback(queryOne("#cardFax"), data.fax);
  setLink(queryOne("#cardEmail"), data.email ? "mailto:" + data.email : "", data.email);
  setTextOrFallback(queryOne("#cardLineId"), data.line_id);

  // 服務項目：以逗號或頓號拆分為標籤列表
  renderServiceTags(data.services);

  // 底部行動按鈕連結
  const actionCall = queryOne("#actionCall");
  const actionEmail = queryOne("#actionEmail");

  if (actionCall) {
    actionCall.href = data.phone ? "tel:" + normalizePhone(data.phone) : "#";
  }
  if (actionEmail) {
    actionEmail.href = data.email ? "mailto:" + data.email : "#";
  }
}

/**
 * 將服務項目字串拆分並渲染為標籤列表。
 * 支援中文頓號、逗號、分號作為分隔符。
 * @param {string} services - 服務項目字串。
 */
function renderServiceTags(services) {
  const listEl = queryOne("#cardServicesList");
  if (!listEl) return;

  listEl.innerHTML = "";

  if (!services || !String(services).trim()) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "np-service-item empty-value";
    emptyItem.textContent = "未填寫";
    listEl.appendChild(emptyItem);
    return;
  }

  const items = String(services)
    .split(/[、,;；，]+/)
    .map(function (item) { return item.trim(); })
    .filter(function (item) { return item.length > 0; });

  items.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "np-service-item";
    li.textContent = item;
    listEl.appendChild(li);
  });
}

/**
 * 將電話號碼格式化為適合 tel: 連結的字串。
 * 移除空格與連字號，保留數字與加號。
 * @param {string} phone - 原始電話號碼。
 * @returns {string} 格式化後的電話號碼。
 */
function normalizePhone(phone) {
  return String(phone || "").replace(/[^0-9+]/g, "");
}

/**
 * 觸發名片入場動畫。
 * 使用 requestAnimationFrame 確保 DOM 已就緒，再加入 is-revealed class。
 */
function triggerEntranceAnimation() {
  const nameplate = queryOne("#nameplate");
  if (!nameplate) return;

  requestAnimationFrame(function () {
    nameplate.classList.add("is-revealed");
  });
}

/**
 * 只有在瀏覽器環境中才綁定 DOMContentLoaded 事件，避免 Node.js 測試報錯。
 */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initCardPage);
}

/**
 * 若環境支援 CommonJS 則匯出主要方法，方便後續測試。
 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    defaultCardData,
    initCardPage,
    renderBusinessCard,
    renderServiceTags,
    normalizePhone,
    triggerEntranceAnimation
  };
}
