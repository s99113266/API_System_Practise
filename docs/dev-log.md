# 開發日誌

## 專案概述

- **專案名稱**：名片系統（API_System_Practise）
- **技術棧**：原生 HTML、CSS、JavaScript
- **目標**：建立給客戶觀看的數位名片網頁，未來透過單一 POST API 載入真實名片資料。

## 2026-06-17

### 今日完成

1. 與使用者確認名片欄位：
   - 姓名、服務單位（公司名稱）、連絡電話、信箱、Line ID、服務項目、職稱、公司統編、傳真號碼。
2. 確認視覺風格與品牌定位：
   - 線上名片網頁，給客戶觀看。
   - 工匠精神：沈穩、精準、溫暖。
   - 意象：深色金屬底 + 冷鋼銀 + 熔銅暖光點綴。
   - 形式：數位名片卡片（像一張實體名片），低調精緻動效。
3. 建立策略文件：
   - `PRODUCT.md`：註冊定位為 brand、使用者、品牌個性、反參考、設計原則。
   - `DESIGN.md`：依照 Google Stitch DESIGN.md 格式建立色彩、字體、組件規格。
4. 重新建立前端 UI：
   - `assets/css/main.css`：深色金屬風格、OKLCH 色彩、拉絲紋理背景、熔銅裝飾線、無陰影的扁平層次。
   - `assets/js/utils.js`：DOM 查詢、文字/連結設定、事件綁定、JSON 處理等可複用方法。
   - `assets/js/main.js`：預設樣板資料、名片渲染、電話與信箱連結格式化、入場動畫。
   - `index.html`：數位名片卡片結構，載入 Noto Serif TC / Noto Sans TC 字體，分離 CSS/JS。
5. 更新文件：
   - 確認 `docs/api-doc.md` 仍符合單一 POST endpoint、JSON 不超過兩層的設計。
   - 調整 `docs/file-relationship.md` 中的檔案職責描述，移除後台表單相關內容。
6. Node.js 基本驗證：
   - `utils.js` 與 `main.js` 可正常載入。
   - `normalizePhone` 工具函式運作正確。

### 技術決策

- 採用 **brand register** 設計定位：名片網頁本身就是品牌印象的載體。
- 色彩策略為 **Committed**：深色背景為主，暖銅色作為稀有強調。
- 字體策略：Noto Serif TC 承擔姓名與公司名稱的重量，Noto Sans TC 處理聯絡資訊。
- 不使用陰影，深度透過背景色階（bg → surface → surface-elevated）與留白表達。
- 不使用漸層文字、玻璃擬態、側邊色條、卡片堆疊等 AI 常見套路。
- 所有互動元素都有清晰的 hover 與 focus-visible 狀態，符合可及性要求。
- 尊重 `prefers-reduced-motion`，動效可完全關閉。

### 待辦事項

- [x] 建立 `PRODUCT.md` 策略文件。
- [x] 建立 `DESIGN.md` 視覺規格。
- [x] 建立 `assets/css/main.css` 基礎樣式。
- [x] 建立 `assets/js/utils.js` 可複用工具方法。
- [x] 建立 `assets/js/main.js` 名片渲染邏輯。
- [x] 建立 `index.html` 並載入預設樣板資料。
- [ ] 在瀏覽器中開啟測試，確認視覺效果與響應式表現。（使用者將使用 VS Code 自行開啟 `index.html` 預覽，不再由工具產生網頁截圖。）
- [ ] 使用者提供真實資料後，替換 `main.js` 中的 `defaultCardData` 或由 API 載入。
- [ ] API URL 與認證機制待後續提供。

### 備註

- 本次 UI 為純前端數位名片範例，未串接 API。
- 後台表單不在本次設計範圍內。
- 預設資料為虛構範例，未來由真實資料替換。
- **預覽方式**：使用者將使用 VS Code 自行開啟 `index.html` 瀏覽與驗證視覺效果，不再由工具產生預覽網頁截圖。

## 2026-06-17（下午）— JSON 規格重新設計

### 問題

原本 `docs/api-doc.md` 將系統設計成**多人名片系統**：包含 `create` / `read` / `update` / `delete` 四個動作、用 `card_id` 識別不同名片、並記錄 `created_at` / `updated_at`。實際需求是**個人單一名片系統**，多人模型是設計錯誤。

### 修正方向

- 資料庫預先建立**唯一一筆**名片資料，前端不再有新增能力。
- API 僅保留 `read` 與 `update`，永遠針對這唯一一筆操作。
- 移除 `card_id`：個人名片無需識別碼。
- 移除 `created_at` / `updated_at`：無版本或稽核需求。
- 移除 `list` / `delete` / `create` 等動作，後端對未知 `action` 回傳 400。
- 回應結構扁平化：`read` 成功時名片欄位直接與 `success` / `message` 並列於第一層。

### 影響檔案

- `docs/api-doc.md`：全面重寫為個人單一名片規格。
- `docs/file-relationship.md`：更新 `api-doc.md` 的職責描述。
- `PRODUCT.md`、`DESIGN.md`：個人單名片定位未變，無需改動。

### 待辦事項（更新）

- [ ] 前端 `assets/js/main.js` 未來串接 API 時，需以 `action: "read"` 取回資料，移除 `defaultCardData` 中的 `card_id` 欄位。
- [ ] 後端實作需確保資料庫預先建立一筆紀錄，且 `update` 採整體覆寫。
- [ ] API URL 與認證機制待後續提供。

## 2026-06-17（晚）— 建立 API 設定檔

### 變更

- 新增 `assets/api-config.json`：單一 JSON 設定檔，僅含 `apiUrl` 欄位，值為 Make webhook 端點。
- `assets/js/utils.js` 新增 `getApiConfig()` 與 `getApiUrl()`：以 `fetch` 載入設定檔並快取，所有需要 API 的腳本一律透過 `getApiUrl()` 取得 URL。
- `docs/file-relationship.md` 同步更新目錄結構、Mermaid 圖與檔案職責。

### 規則

- **禁止硬編碼 API URL**：任何腳本若需呼叫 API，一律 `await getApiUrl()`，不得自行寫死 URL。
- 設定檔保持極簡，只放 `apiUrl`，不預先擴充認證欄位等未來需求（禁止過度設計）。

## 2026-06-24 — 建立 API 讀取

### 變更

- 新增 `assets/js/api.js`：API 請求模組。
  - `callCardApi(action, payload)`：統一處理 POST 請求、`getApiUrl()` 取得端點、`success` 欄位檢查與錯誤拋出；自動帶入 `timestamp` 與 `request_id`。
  - `fetchCardData()`：呼叫 `action: "read"`，回傳整理後的名片物件。
- `assets/js/main.js`：
  - `initCardPage()` 改為 `async`：先呼叫 `fetchCardData()`，失敗時 fallback 至 `defaultCardData`，確保畫面不空白。
  - 移除 `defaultCardData` 中的 `card_id` 欄位（個人單名片無識別碼）。
- `index.html`：在 `utils.js` 之後、`main.js` 之前載入 `assets/js/api.js`。
- `docs/file-relationship.md`：補上 `api.js` 的目錄結構、Mermaid 圖與檔案職責。

### 技術決策

- 模組邊界：`api.js` 只負責與後端通訊；`main.js` 只負責渲染。URL 取得一律透過 `utils.js`，符合先前「禁止硬編碼」規則。
- 錯誤處理：API 任何階段失敗（網路、非 2xx、`success !== true`）都會丟出例外，由 `main.js` 統一接住並 fallback。

## 2026-06-24（下午） — 建立名片更新頁面

### 變更

- 新增 `update.html`：名片資料更新頁面。
  - 表單包含 9 個名片欄位（`name`、`title`、`company`、`tax_id`、`phone`、`fax`、`email`、`line_id`、`services`），對應 `docs/api-doc.md` 的 `update` 動作。
  - 載入時自動呼叫 `fetchCardData()` 將既有資料填入表單。
  - 送出時以 `updateCardData()` 整體覆寫後端資料。
  - 顯示成功/錯誤訊息與載入中狀態。
- 新增 `assets/js/update.js`：更新頁面邏輯。
  - `populateForm()` 將 API 回傳資料填入對應欄位。
  - `collectFormData()` 收集表單 9 個欄位。
  - `validateFormData()` 檢查必填欄位（姓名、職稱、公司名稱）。
  - `handleFormSubmit()` 串接 `updateCardData()` 並顯示結果。
- `assets/js/api.js` 新增 `updateCardData(cardData)`：對應 `action: "update"`，送出完整 9 個名片欄位。
- 更新 `docs/file-relationship.md`：補上 `update.html` 與 `update.js` 的結構與職責。

### 技術決策

- 表單欄位直接對應 `api-doc.md` 的資料模型，名稱一致，減少轉換錯誤。
- 更新頁面沿用 `main.css` 的設計權杖（tokens）與金屬工單風格，少量表單專屬樣式內聯於 `update.html`，避免過度擴張 CSS 檔案。
- 必填僅限 `name`、`title`、`company`，其餘欄位依業務需求可留空；後端收到空字串後自行決定儲存策略。
- 送出時整體覆寫（與 `api-doc.md` 建議一致），不進行欄位差異比對，簡化前端邏輯。
