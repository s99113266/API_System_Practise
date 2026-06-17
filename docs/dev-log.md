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
