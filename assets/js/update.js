/**
 * update.js
 * 名片更新頁面邏輯
 * 頁面載入時先以 fetchCardData() 取得資料填入表單；
 * 送出時組裝 9 個欄位並呼叫 updateCardData() 整體覆寫。
 */

const FIELD_NAMES = ["name", "title", "company", "tax_id", "phone", "fax", "email", "line_id", "services"];

/**
 * 初始化更新頁面：載入既有資料並綁定表單提交。
 */
async function initUpdatePage() {
  const form = queryOne("#cardUpdateForm");
  const messageEl = queryOne("#formMessage");
  const submitBtn = queryOne("#submitBtn");

  if (!form) return;

  try {
    setLoading(true, submitBtn);
    const cardData = await fetchCardData();
    populateForm(form, cardData);
    showMessage(messageEl, "資料已載入", "success");
  } catch (error) {
    showMessage(messageEl, "載入失敗：" + error.message, "error");
  } finally {
    setLoading(false, submitBtn);
  }

  bindEvent(form, "submit", function (event) {
    event.preventDefault();
    handleFormSubmit(form, messageEl, submitBtn);
  });
}

/**
 * 將名片資料填入表單各欄位。
 * @param {HTMLFormElement} form - 表單元素。
 * @param {Object} data - 名片資料。
 */
function populateForm(form, data) {
  if (!form || !data) return;
  FIELD_NAMES.forEach(function (field) {
    const input = form.elements[field];
    if (input) {
      input.value = data[field] || "";
    }
  });
}

/**
 * 從表單收集名片資料。
 * @param {HTMLFormElement} form - 表單元素。
 * @returns {Object} 名片資料物件。
 */
function collectFormData(form) {
  const data = {};
  FIELD_NAMES.forEach(function (field) {
    const input = form.elements[field];
    data[field] = input ? String(input.value || "").trim() : "";
  });
  return data;
}

/**
 * 簡易表單驗證：檢查必填欄位是否空白。
 * @param {Object} data - 收集後的資料。
 * @returns {string|null} 錯誤訊息，無誤則回傳 null。
 */
function validateFormData(data) {
  const required = ["name", "title", "company"];
  for (let i = 0; i < required.length; i++) {
    if (!data[required[i]]) {
      return "請填寫「" + fieldLabel(required[i]) + "」";
    }
  }
  return null;
}

/**
 * 將欄位名稱轉為中文標籤。
 * @param {string} field - 欄位名稱。
 * @returns {string} 中文標籤。
 */
function fieldLabel(field) {
  const labels = {
    name: "姓名",
    title: "職稱",
    company: "公司名稱",
    tax_id: "公司統編",
    phone: "連絡電話",
    fax: "傳真號碼",
    email: "信箱",
    line_id: "Line ID",
    services: "服務項目"
  };
  return labels[field] || field;
}

/**
 * 處理表單送出。
 * @param {HTMLFormElement} form - 表單元素。
 * @param {Element} messageEl - 訊息顯示元素。
 * @param {HTMLButtonElement} submitBtn - 送出按鈕。
 */
async function handleFormSubmit(form, messageEl, submitBtn) {
  const data = collectFormData(form);
  const error = validateFormData(data);
  if (error) {
    showMessage(messageEl, error, "error");
    return;
  }

  try {
    setLoading(true, submitBtn);
    const result = await updateCardData(data);
    showMessage(messageEl, result.message || "更新成功", "success");
  } catch (error) {
    showMessage(messageEl, "更新失敗：" + error.message, "error");
  } finally {
    setLoading(false, submitBtn);
  }
}

/**
 * 顯示表單訊息。
 * @param {Element} element - 訊息元素。
 * @param {string} text - 訊息文字。
 * @param {string} type - 訊息類型，"success" 或 "error"。
 */
function showMessage(element, text, type) {
  if (!element) return;
  element.textContent = text;
  element.className = "form-message " + (type === "success" ? "success" : "error");
}

/**
 * 設定送出按鈕的載入狀態。
 * @param {boolean} isLoading - 是否為載入中。
 * @param {HTMLButtonElement} button - 送出按鈕。
 */
function setLoading(isLoading, button) {
  if (!button) return;
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner" aria-hidden="true"></span>處理中…';
  } else {
    button.disabled = false;
    button.textContent = "儲存更新";
  }
}

/**
 * 只有在瀏覽器環境中才綁定 DOMContentLoaded 事件。
 */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initUpdatePage);
}

/**
 * 若環境支援 CommonJS 則匯出主要方法，方便後續測試。
 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FIELD_NAMES,
    initUpdatePage,
    populateForm,
    collectFormData,
    validateFormData,
    fieldLabel,
    handleFormSubmit,
    showMessage,
    setLoading
  };
}
