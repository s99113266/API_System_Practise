/**
 * api.js
 * 名片系統 API 請求模組
 * 透過 utils.js 的 getApiUrl() 取得端點，統一以 POST 送出 JSON 請求，
 * 並依 docs/api-doc.md 規範呼叫 read / update 動作。
 */

/**
 * 呼叫名片 API 的共用底層方法。
 * 統一處理 URL 取得、請求主體組裝、錯誤拋出與成功欄位檢查。
 * @param {string} action - 動作類型，目前支援 "read" / "update"。
 * @param {Object} [payload={}] - 動作額外帶入的欄位，例如 update 時要寫入的名片資料。
 * @returns {Promise<Object>} 後端回應物件（已通過 success 欄位檢查）。
 */
async function callCardApi(action, payload = {}) {
  const apiUrl = await getApiUrl();

  const body = Object.assign(
    {
      action: action,
      timestamp: new Date().toISOString(),
      request_id: generateId()
    },
    payload || {}
  );

  let response;
  try {
    response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: safeStringify(body)
    });
  } catch (error) {
    throw new Error("網路請求失敗：" + (error && error.message ? error.message : String(error)));
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("回應解析失敗（HTTP " + response.status + "）");
  }

  if (!response.ok) {
    const msg = data && data.message ? data.message : "HTTP " + response.status;
    throw new Error("API 錯誤：" + msg);
  }

  if (!data || data.success !== true) {
    const msg = data && data.message ? data.message : "操作失敗";
    throw new Error(msg);
  }

  return data;
}

/**
 * 向後端讀取唯一一筆名片資料。
 * 後端於資料庫預先建立該紀錄，前端不需也不應傳送 card_id。
 * @returns {Promise<Object>} 名片資料物件，欄位對應 api-doc.md 的名片欄位。
 */
async function fetchCardData() {
  const data = await callCardApi("read");
  const card = {
    name: data.name,
    title: data.title,
    company: data.company,
    tax_id: data.tax_id,
    phone: data.phone,
    fax: data.fax,
    email: data.email,
    line_id: data.line_id,
    services: data.services
  };
  if (typeof console !== "undefined" && console.log) {
    console.log("[api] 讀取名片成功：", data.message || "");
  }
  return card;
}

/**
 * 更新唯一一筆名片資料。
 * 依 api-doc.md 規範，動作為 "update"，並送出完整名片欄位整體覆寫。
 * @param {Object} cardData - 名片資料物件，需包含 9 個名片欄位。
 * @returns {Promise<Object>} 後端回應物件。
 */
async function updateCardData(cardData) {
  const payload = {
    name: cardData.name,
    title: cardData.title,
    company: cardData.company,
    tax_id: cardData.tax_id,
    phone: cardData.phone,
    fax: cardData.fax,
    email: cardData.email,
    line_id: cardData.line_id,
    services: cardData.services
  };
  const data = await callCardApi("update", payload);
  if (typeof console !== "undefined" && console.log) {
    console.log("[api] 更新名片成功：", data.message || "");
  }
  return data;
}

/* 模組匯出：若環境支援 CommonJS 則使用 module.exports */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    callCardApi,
    fetchCardData,
    updateCardData
  };
}
