/**
 * main.js
 * 名片系統前端邏輯（銘牌版）
 * 負責：讀取 mock-data.json、渲染名片內容、服務項目分項、連結格式化、入場動畫。
 * 不再使用 API，改以本地 JSON 作為唯一資料來源。
 */

/**
 * mock-data.json 檔案路徑。
 * 為本地靜態資料來源，啟動時由 fetch 讀取，不再呼叫任何 API。
 */
const MOCK_DATA_URL = "assets/js/mock-data.json";

/**
 * 從 mock-data.json 讀取資料，移除欄位說明物件後回傳純名片內容。
 * 若讀取失敗或檔案不存在，回傳 null。
 * @returns {Promise<Object|null>}
 */
async function loadMockCardData() {
  try {
    const res = await fetch(MOCK_DATA_URL, { cache: "no-store" });
    if (!res.ok) return null;
    const raw = await res.json();
    if (!raw || typeof raw !== "object") return null;

    const card = {};
    const keys = ["name", "title", "company", "tax_id", "phone", "fax", "email", "line_id", "services"];
    keys.forEach(function (k) { card[k] = raw[k]; });
    return card;
  } catch (error) {
    if (typeof console !== "undefined" && console.error) {
      console.error("[main] 讀取 mock-data.json 失敗：", error);
    }
    return null;
  }
}

/**
 * 判斷名片資料是否為空。
 * 規則：物件不存在、所有欄位皆為空字串/空白/null/undefined 時視為空。
 * @param {Object} data - 名片資料物件。
 * @returns {boolean} 是否為空資料。
 */
function isCardDataEmpty(data) {
  if (!data || typeof data !== "object") return true;
  const keys = ["name", "title", "company", "tax_id", "phone", "fax", "email", "line_id", "services"];
  return keys.every(function (k) {
    return data[k] === null || data[k] === undefined || String(data[k]).trim() === "";
  });
}

/**
 * 初始化名片頁面。
 * 從 mock-data.json 讀取資料，渲染名片並觸發入場動畫。
 * 若資料為空或讀取失敗，隱藏整個名片舞台（連標題也不顯示）。
 */
async function initCardPage() {
  const cardData = await loadMockCardData();

  if (!cardData || isCardDataEmpty(cardData)) {
    hideCardStage();
    return;
  }

  renderBusinessCard(cardData);
  triggerEntranceAnimation();
}

/**
 * 隱藏整個名片舞台（含 main 容器、文件標題、meta 描述）。
 * 當資料為空時呼叫，避免顯示空白結構。
 */
function hideCardStage() {
  const stage = queryOne(".card-stage");
  if (stage) stage.style.display = "none";

  if (typeof document !== "undefined" && document.title !== undefined) {
    document.title = "名片尚未建立";
  }

  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", "名片資料尚未填寫，請先建立名片內容。");

  if (typeof console !== "undefined" && console.warn) {
    console.warn("[main] 名片資料為空，已隱藏名片舞台");
  }
}

/**
 * 判斷字串是否視為「有填寫」。
 * null / undefined / 去除頭尾空白後為空字串皆視為空。
 * @param {*} v
 * @returns {boolean}
 */
function hasValue(v) {
  return v !== null && v !== undefined && String(v).trim() !== "";
}

/**
 * 聯絡規格表列定義（顯示順序、欄位鍵、標籤、是否為可點擊連結）。
 */
const SPEC_ROWS = [
  { key: "phone",   label: "電話", type: "tel"    },
  { key: "fax",     label: "傳真", type: "text"   },
  { key: "email",   label: "信箱", type: "mailto" },
  { key: "line_id", label: "Line", type: "text"   },
  { key: "tax_id",  label: "統編", type: "text"   }
];

/**
 * 根據資料渲染整張名片。
 * - 姓名 / 職稱 / 公司 / 服務項目：未填寫時整區隱藏。
 * - 聯絡規格表：未填寫的列隱藏，剩下的列數字編號遞補重編。
 * - 底部行動按鈕：對應欄位空值時隱藏。
 * @param {Object} data - 名片資料物件。
 */
function renderBusinessCard(data) {
  if (!data) return;

  // 標頭：姓名 + 職稱 + 公司
  // 規則：姓名有填才顯示整個身份區；職稱 / 公司沒填就留空，不要隱藏。
  const nameplate = queryOne("#nameplate");
  const identity = queryOne("#cardName") ? queryOne("#cardName").closest(".np-identity") : null;
  if (identity) {
    if (hasValue(data.name)) {
      identity.style.display = "";
      setTextOrFallback(queryOne("#cardName"), data.name);
      setTextOrFallback(queryOne("#cardTitle"), data.title);
      setTextOrFallback(queryOne("#cardCompany"), data.company);

      // 處理「職稱 · 公司」的視覺：
      //   兩者都有 → 顯示 "職稱 · 公司"
      //   只有職稱 → 顯示 "職稱"
      //   只有公司 → 顯示 "公司"
      //   兩者都空 → 隱藏整行 .np-role
      const roleP = queryOne("#cardTitle") ? queryOne("#cardTitle").parentElement : null;
      const titleSpan = queryOne("#cardTitle");
      const companySpan = queryOne("#cardCompany");
      if (roleP) {
        const hasTitle = hasValue(data.title);
        const hasCompany = hasValue(data.company);
        if (hasTitle && hasCompany) {
          roleP.style.display = "";
          if (titleSpan) titleSpan.style.display = "";
          if (companySpan) companySpan.style.display = "";
        } else if (hasTitle) {
          roleP.style.display = "";
          if (titleSpan) titleSpan.style.display = "";
          if (companySpan) companySpan.style.display = "none";
        } else if (hasCompany) {
          roleP.style.display = "";
          if (titleSpan) titleSpan.style.display = "none";
          if (companySpan) companySpan.style.display = "";
        } else {
          roleP.style.display = "none";
        }
      }
    } else {
      identity.style.display = "none";
    }
  }

  // 聯絡規格表：未填寫的列移除，剩下列重新編號
  renderSpecRows(data);

  // 服務項目區：未填寫則整區隱藏
  const servicesSection = queryOne("#cardServicesList")
    ? queryOne("#cardServicesList").closest(".np-services")
    : null;
  if (servicesSection) {
    if (hasValue(data.services)) {
      servicesSection.style.display = "";
      renderServiceTags(data.services);
    } else {
      servicesSection.style.display = "none";
    }
  }

  // 底部行動按鈕：對應欄位空值時隱藏
  const actionCall = queryOne("#actionCall");
  if (actionCall) {
    if (hasValue(data.phone)) {
      actionCall.style.display = "";
      actionCall.href = "tel:" + normalizePhone(data.phone);
    } else {
      actionCall.style.display = "none";
    }
  }
  const actionEmail = queryOne("#actionEmail");
  if (actionEmail) {
    if (hasValue(data.email)) {
      actionEmail.style.display = "";
      actionEmail.href = "mailto:" + data.email;
    } else {
      actionEmail.style.display = "none";
    }
  }

  // 行動區在兩個按鈕都隱藏時整個隱藏
  const actionsFooter = (actionCall || actionEmail)
    ? (actionCall ? actionCall.parentElement : actionEmail.parentElement)
    : null;
  if (actionsFooter) {
    const anyVisible = (actionCall && actionCall.style.display !== "none") ||
                       (actionEmail && actionEmail.style.display !== "none");
    actionsFooter.style.display = anyVisible ? "" : "none";
  }

  // 規格表若全部列都被隱藏則整個規格區隱藏
  const specSection = nameplate ? nameplate.querySelector(".np-spec") : null;
  if (specSection) {
    const visibleRows = specSection.querySelectorAll(".np-spec-row");
    let hasVisible = false;
    visibleRows.forEach(function (r) {
      if (r.style.display !== "none") hasVisible = true;
    });
    specSection.style.display = hasVisible ? "" : "none";
  }
}

/**
 * 渲染聯絡規格表：未填寫的列整列隱藏，剩下列的編號自動遞補（01, 02, ...）。
 * @param {Object} data - 名片資料物件。
 */
function renderSpecRows(data) {
  const nameplate = queryOne("#nameplate");
  if (!nameplate) return;
  const list = nameplate.querySelector(".np-spec-list");
  if (!list) return;

  const rows = list.querySelectorAll(".np-spec-row");
  let visibleIndex = 0;

  rows.forEach(function (row) {
    const key = row.getAttribute("data-key");
    const valEl = row.querySelector(".np-spec-val");
    const noEl = row.querySelector(".np-spec-no");
    const def = SPEC_ROWS.find(function (r) { return r.key === key; });
    if (!def) return;

    const value = data ? data[key] : "";
    if (hasValue(value)) {
      row.style.display = "";
      visibleIndex += 1;
      if (noEl) noEl.textContent = String(visibleIndex).padStart(2, "0");

      if (def.type === "tel") {
        valEl.textContent = value;
        if (valEl.tagName === "A") valEl.setAttribute("href", "tel:" + normalizePhone(value));
      } else if (def.type === "mailto") {
        valEl.textContent = value;
        if (valEl.tagName === "A") valEl.setAttribute("href", "mailto:" + value);
      } else {
        valEl.textContent = value;
        if (valEl.tagName === "A") valEl.setAttribute("href", "#");
      }
    } else {
      row.style.display = "none";
    }
  });
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
    MOCK_DATA_URL,
    loadMockCardData,
    isCardDataEmpty,
    hasValue,
    SPEC_ROWS,
    initCardPage,
    hideCardStage,
    renderBusinessCard,
    renderSpecRows,
    renderServiceTags,
    normalizePhone,
    triggerEntranceAnimation
  };
}
