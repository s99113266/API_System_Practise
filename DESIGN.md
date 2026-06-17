---
name: 名片系統
description: 金屬加工產業的數位名片，拉絲鋁底毛玻璃銘牌、石墨藍精準強調。
colors:
  bg: "#F2F3F5"
  bg-deep: "#E4E7EC"
  surface: "#FDFEFF"
  surface-elevated: "#F6F7F9"
  ink: "#2A2D31"
  ink-muted: "#4A5159"
  ink-subtle: "#565D65"
  primary: "#2C4A6E"
  primary-soft: "#3E5F8A"
  primary-deep: "#243C5C"
  accent: "#79808C"
  border: "#DDE1E6"
  border-subtle: "#C5CBD3"
  highlight: "rgba(255,255,255,0.55)"
typography:
  display:
    fontFamily: "'Bree Serif', 'Noto Serif TC', Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.03em"
  headline:
    fontFamily: "'Bree Serif', 'Noto Serif TC', Georgia, serif"
    fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  title:
    fontFamily: "'Saira', 'Noto Sans TC', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  body:
    fontFamily: "'Saira', 'Noto Sans TC', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
  label:
    fontFamily: "'Saira', 'Noto Sans TC', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
    textTransform: "uppercase"
rounded:
  sm: "0px"
  md: "4px"
  lg: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  nameplate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "40px"
  nameplate-hover:
    backgroundColor: "{colors.surface-elevated}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-soft}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-ghost-hover:
    textColor: "{colors.primary-soft}"
---

# Design System: 名片系統

## 1. Overview

**Creative North Star: "一塊從拉絲鋁表面凸出的半透毛玻璃銘牌"**

這個設計系統服務於一張給客戶看的線上名片網頁。視覺核心是一塊從拉絲鋁底面浮起的毛玻璃銘牌：淺色、冷冽、精準，帶一道不搶戲的石墨藍強調。資訊層次要像 CNC 切削後的成品：乾淨、精準、沒有多餘的毛邊。

整體氛圍沈穩而不冷酷，商業可信而不僵硬。拉絲鋁淺底傳達穩重與專業，石墨藍點綴帶出精準的工業感。動效克制，只出現在能提升質感的時刻：入場時的輕微上浮、銘牌 hover 時的浮起加深、連結 focus 時的清晰邊框。

**Key Characteristics:**
- 拉絲鋁淺底為主，毛玻璃銘牌為視覺主體，石墨藍為稀有強調色。
- 中文襯線字體承擔姓名與公司名稱的視覺重量，無襯線字體處理聯絡資訊。
- 不使用卡片堆疊、側邊色條、漸層文字；毛玻璃為唯一且刻意的材料語言。
- 所有互動元素都必須有清晰的 hover 與 focus 狀態。
- 行動優先：名片內容在任何裝置上都能一眼讀完。

## 2. Colors

色彩策略為 **Committed**：拉絲鋁淺底為基底，石墨藍作為少數強調，讓色彩本身成為品牌聲音。背景採用近白的冷灰（chroma 極低、略偏藍），避免奶油色、米色或純黑帶來的偏頗；淺底在商業情境下中性可信，也讓毛玻璃有東西可透。

### Primary
- **石墨藍 Graphite Blue** (`#2C4A6E` / oklch(40% 0.07 250)): 品牌主色，用於最重要的行動召喚、分隔線起點、聯絡方式的 hover 狀態。出現頻率控制在 10% 以內，稀有性即是識別度。
- **霽藍 Soft Blue** (`#3E5F8A` / oklch(50% 0.08 250)): 用於連結、輔助強調、以及懸停時的過渡。
- **深藍 Deep Blue** (`#243C5C` / oklch(33% 0.06 250)): 用於按下狀態或需要更低調的藍色區塊。

### Secondary
- **冷鋼灰 Cool Steel** (`#79808C` / oklch(58% 0.015 250)): 用於次要文字、圖示、分隔線，傳達金屬加工的冷冽精準感。

### Neutral
- **拉絲鋁 Brushed Aluminum** (`#F2F3F5` / oklch(96% 0.004 250)): 頁面背景，近白冷灰，帶細微拉絲紋與冷光漸層。
- **鋁深 Aluminum Deep** (`#E4E7EC` / oklch(91% 0.006 250)): 漸層深處，製造金屬面的明暗。
- **玻璃白 Glass White** (`#FDFEFF` / oklch(99% 0.002 250)): 毛玻璃銘牌的半透白底。
- **拋光灰 Polished Gray** (`#F6F7F9` / oklch(97% 0.003 250)): 懸停或 elevated 表面。
- **石墨墨 Graphite Ink** (`#2A2D31` / oklch(24% 0.005 250)): 主要文字顏色，在淺底上達到 WCAG AAA 對比。
- **霧石墨 Frosted Graphite** (`#4A5159` / oklch(42% 0.006 250)): 次要文字、說明文字，≥ 4.5:1。
- **淺邊 Light Seam** (`#DDE1E6` / oklch(88% 0.005 250)): 邊框與分隔線。
- **深邊 Deep Seam** (`#C5CBD3` / oklch(80% 0.008 250)): hover 時的邊框或更明顯的分隔線。

### Named Rules
**The One Accent Rule.** 石墨藍在一個畫面中只作為單一視覺焦點出現（分隔線起點、主按鈕、底部強調線）。其餘資訊以冷灰與石墨墨處理。藍色過多會讓畫面變得喧嘩，失去工匠的內斂。

**The Glass-Protrudes Rule.** 毛玻璃銘牌是唯一允許陰影的元素，目的是「凸出」於拉絲鋁底面。陰影克制、偏冷、低不透，模擬玻璃浮起的物理感，不用於裝飾其他區塊。

## 3. Typography

**Display Font:** Bree Serif（搭配 Noto Serif TC、Georgia）
**Body Font:** Saira（搭配 Noto Sans TC、sans-serif）

**Character:** Bree Serif 有厚實的襯線與略帶機械感的字形，像刻在金屬銘牌上的字。Saira 是現代無襯線，字寬適中、數字清晰，適合電話與統編等資訊。兩者形成「工匠標記 + 精密規格」的對話。

### Hierarchy
- **Display** (400, clamp(2.75rem, 8vw, 4.5rem), line-height 1.05): 姓名，名片上最大的視覺錨點。字距略寬，像機械刻字。
- **Headline** (400, clamp(1.25rem, 3.5vw, 1.75rem), line-height 1.2): 公司名稱，次於姓名的視覺重心。
- **Title** (600, 0.875rem, letter-spacing 0.1em, uppercase): 職稱、服務項目標題，以工業標籤的方式呈現。
- **Body** (400, 1rem, line-height 1.6): 聯絡資訊內容，單行最長 45ch。
- **Label** (500, 0.6875rem, letter-spacing 0.12em, uppercase): 電話/信箱/傳真等分類標籤，極小且稀疏，僅用於規格表。

### Named Rules
**The Marked Name Rule.** 姓名是這張名片的品牌標記，必須使用 Display 字體且尺寸明顯大於其他所有文字。不與公司名稱競爭大小。

**The Spec Sheet Rule.** 聯絡資訊與服務項目的排版要像加工規格表：對齊、編號、沒有裝飾。數字與字母必須清晰可讀。

## 4. Elevation

唯一允許陰影的元素是毛玻璃銘牌本身，目的是讓它從拉絲鋁底面「凸出」。陰影克制、偏冷、低不透，模擬玻璃浮起的物理感。其餘區塊（聯絡規格表、服務項目）以分隔線與留白區隔，不再用陰影或外框盒子堆疊。

### Shadow Vocabulary
- **Glass Float:** 銘牌靜止陰影——`0 24px 60px -28px` 冷藍灰低不透，加上 `inset` 頂部高光，模擬玻璃邊緣反光。
- **Glass Lift:** 銘牌 hover 陰影——更深的擴散與上移 2px，強化浮起感。

### Named Rules
**The Glass-Protrudes Rule.** 只有銘牌浮起。聯絡規格表與服務項目不外加框盒、不加陰影，避免「卡片中卡片」的巢狀結構。

## 5. Components

### 名片銘牌（Nameplate）
- **Shape:** 略帶倒角（10px），像一塊半透毛玻璃面板。
- **Background:** 半透玻璃白 (`#FDFEFF` / 0.55)，搭配 `backdrop-filter: blur(22px) saturate(140%)`；不支援時退化為不透明白面。
- **Border:** 1px 半透白邊，頂部高光線條模擬玻璃邊緣反光。
- **Hover:** 邊框轉亮、陰影加深、上移 2px，強化凸出感。
- **Internal Padding:** 40px，手機上縮至 24px。
- **Accent Line:** 底部一道石墨藍漸層細線，作為稀有強調。

### 內容結構
- **Top Zone:** 姓名（Display）+ 職稱（Title 大寫），中間以一條水平石墨藍線分隔。
- **Middle Zone:** 公司名稱（Headline）橫跨銘牌，下方以一條細線區隔。
- **Spec Grid:** 聯絡資訊以 2x2 網格排列（電話/傳真、信箱/Line、統編），上方有 "CONTACT SPEC" 標題，無外框盒，以分隔線分區。
- **Service Zone:** 服務項目以「加工能力」規格表方式呈現，每個項目前有一個小矩形石墨藍標記。
- **Action Zone:** 一個主按鈕「撥打電話」+ 一個次按鈕「寄送郵件」。

## 6. Do's and Don'ts

### Do:
- **Do** 讓姓名成為頁面上最大的文字，像刻在金屬銘牌上的標記。
- **Do** 使用 Bree Serif 處理姓名與公司名稱，Saira 處理聯絡資訊與標籤。
- **Do** 使用拉絲鋁淺底搭配少量石墨藍點綴，藍色出現頻率 ≤ 10%。
- **Do** 以規格表的方式排列聯絡資訊：對齊、編號、稀疏標籤。
- **Do** 確保所有文字在淺底上對比度達到 WCAG AA（文字 ≥ 4.5:1，大文字 ≥ 3:1）。
- **Do** 讓電話、信箱連結可一鍵撥打或開啟。
- **Do** 為毛玻璃銘牌加入克制的冷調浮起陰影，強化「凸出」的材料語言。
- **Do** 為所有互動元素提供清晰的 focus 狀態。
- **Do** 尊重 `prefers-reduced-motion`，將動畫改為瞬間切換或淡入。

### Don't:
- **Don't** 把名片做成表單清單（一行一個 label + value）。
- **Don't** 使用漸層文字或側邊彩色條紋裝飾。
- **Don't** 在毛玻璃銘牌內再套外框盒卡片（巢狀卡片）。
- **Don't** 使用大量圓角按鈕堆疊或 icon + heading + text 的重複卡片網格。
- **Don't** 使用奶油色、米色作為背景，也不使用純黑底（商業情境不適合）。
- **Don't** 使用深橘色或銅色家族（已棄用）。
- **Don't** 使用等寬字體假裝「工業感」或「技術感」。
- **Don't** 在每個區塊上方加上小寫大寫的 eyebrow 標籤（例如 "ABOUT" / "CONTACT"）。
- **Don't** 使用編輯雜誌風格（斜體襯線大標 + 等寬小字標籤 + 規則分隔）。
- **Don't** 讓石墨藍佔據超過畫面的 10%，稀有才是識別度。
- **Don't** 使用 bounce、elastic 或過度華麗的動畫。
- **Don't** 預設為 all-caps 標題或句子。
