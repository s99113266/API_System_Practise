/**
 * utils.js
 * 名片系統通用工具模組
 * 集中可複用的 DOM 操作、資料渲染與動畫輔助方法，避免重複撰寫。
 */

/**
 * 取得單一 DOM 元素。
 * @param {string} selector - CSS 選擇器。
 * @param {ParentNode} [parent=document] - 查詢範圍，預設為 document。
 * @returns {Element|null} 符合條件的第一個元素。
 */
function queryOne(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 為元素設定文字內容，若值為空則顯示預設提示文字。
 * @param {Element} element - 目標 DOM 元素。
 * @param {string} value - 要顯示的文字。
 * @param {string} [emptyText="未填寫"] - 空值時顯示的提示文字。
 */
function setTextOrFallback(element, value, emptyText = "未填寫") {
  if (!element) return;
  const text = value && String(value).trim() ? String(value).trim() : emptyText;
  element.textContent = text;
  element.classList.toggle("empty-value", !value || !String(value).trim());
}

/**
 * 為連結元素設定 href，同時保留顯示文字。
 * @param {HTMLAnchorElement} element - 目標連結元素。
 * @param {string} href - 連結網址。若為空則移除 href。
 * @param {string} text - 顯示文字。
 */
function setLink(element, href, text) {
  if (!element) return;
  setTextOrFallback(element, text);
  if (href && String(href).trim()) {
    element.href = href;
  } else {
    element.removeAttribute("href");
  }
}

/**
 * 為元素綁定單一事件監聽器。
 * @param {Element} element - 目標 DOM 元素。
 * @param {string} eventType - 事件類型，例如 "click"。
 * @param {Function} handler - 事件處理函式。
 */
function bindEvent(element, eventType, handler) {
  if (!element || typeof handler !== "function") return;
  element.addEventListener(eventType, handler);
}

/**
 * 將物件序列化為 JSON 字串，處理潛在錯誤。
 * @param {Object} data - 要序列化的物件。
 * @returns {string|null} JSON 字串，失敗則回傳 null。
 */
function safeStringify(data) {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error("JSON 序列化失敗：", error);
    return null;
  }
}

/**
 * 將 JSON 字串解析為物件，處理潛在錯誤。
 * @param {string} json - JSON 字串。
 * @returns {Object|null} 解析後的物件，失敗則回傳 null。
 */
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("JSON 解析失敗：", error);
    return null;
  }
}

/**
 * 產生一個不重複的識別碼，前綴為 card-。
 * @returns {string} 唯一識別碼。
 */
function generateId() {
  return "card-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

/* 模組匯出：若環境支援 CommonJS 則使用 module.exports */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    queryOne,
    setTextOrFallback,
    setLink,
    bindEvent,
    safeStringify,
    safeParse,
    generateId
  };
}
