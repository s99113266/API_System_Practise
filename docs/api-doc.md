# API 文件

## 概要

名片系統採用單一 API URL，所有動作皆透過 `POST` 傳送 JSON。JSON 中的 `action` 欄位決定當次請求的行為。

> **設計原則**：JSON 結構不超過兩層，所有資料欄位皆位於第一層，方便前後端解析與維護。

## API 端點

| 項目 | 內容 |
|------|------|
| URL | `https://example.com/api/business-card.php` |
| Method | `POST` |
| Content-Type | `application/json` |

> **備註**：上方 URL 為預留範例，實際上線前請替換為正式伺服器位址。

## 共同請求欄位

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `action` | string | 是 | 動作類型：`create`（新增）、`read`（讀取）、`update`（更新）、`delete`（刪除）。 |
| `timestamp` | string | 否 | ISO 8601 格式時間戳，用於請求記錄與除錯。 |
| `request_id` | string | 否 | 前端產生的唯一識別碼，可用於追蹤請求。 |

## 名片資料欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `name` | string | 姓名 |
| `company` | string | 服務單位（公司名稱） |
| `phone` | string | 連絡電話 |
| `email` | string | 信箱 |
| `line_id` | string | Line ID |
| `services` | string | 服務項目 |
| `title` | string | 職稱 |
| `tax_id` | string | 公司統編 |
| `fax` | string | 傳真號碼 |
| `card_id` | string | 名片唯一編號，讀取/更新/刪除時使用 |

## 動作說明

### create — 新增名片

- 用途：新增一張名片資料。

**請求範例**

```json
{
  "action": "create",
  "name": "王小明",
  "company": "精準金屬加工股份有限公司",
  "phone": "02-2345-6789",
  "email": "ming.wang@example.com",
  "line_id": "wang_metal",
  "services": "CNC銑削、車床加工、金屬表面處理",
  "title": "業務經理",
  "tax_id": "12345678",
  "fax": "02-2345-6790"
}
```

**成功回應**

```json
{
  "success": true,
  "message": "名片新增成功",
  "card_id": "BC-202606170001"
}
```

**失敗回應**

```json
{
  "success": false,
  "message": "必要欄位缺失：name"
}
```

### read — 讀取名片

- 用途：讀取單張或全部名片資料。

**請求範例：讀取全部**

```json
{
  "action": "read"
}
```

**請求範例：讀取單張**

```json
{
  "action": "read",
  "card_id": "BC-202606170001"
}
```

**成功回應：單張**

```json
{
  "success": true,
  "data": {
    "card_id": "BC-202606170001",
    "name": "王小明",
    "company": "精準金屬加工股份有限公司",
    "phone": "02-2345-6789",
    "email": "ming.wang@example.com",
    "line_id": "wang_metal",
    "services": "CNC銑削、車床加工、金屬表面處理",
    "title": "業務經理",
    "tax_id": "12345678",
    "fax": "02-2345-6790",
    "created_at": "2026-06-17T08:00:00+08:00",
    "updated_at": "2026-06-17T08:00:00+08:00"
  }
}
```

**成功回應：全部**

```json
{
  "success": true,
  "data": [
    {
      "card_id": "BC-202606170001",
      "name": "王小明",
      "company": "精準金屬加工股份有限公司",
      "phone": "02-2345-6789",
      "email": "ming.wang@example.com",
      "line_id": "wang_metal",
      "services": "CNC銑削、車床加工、金屬表面處理",
      "title": "業務經理",
      "tax_id": "12345678",
      "fax": "02-2345-6790"
    }
  ]
}
```

**失敗回應**

```json
{
  "success": false,
  "message": "找不到指定名片"
}
```

### update — 更新名片

- 用途：更新現有名片資料，需帶入 `card_id`。

**請求範例**

```json
{
  "action": "update",
  "card_id": "BC-202606170001",
  "name": "王小明",
  "company": "精準金屬加工股份有限公司",
  "phone": "02-2345-6789",
  "email": "ming.wang@example.com",
  "line_id": "wang_metal",
  "services": "CNC銑削、車床加工、雷射切割",
  "title": "業務經理",
  "tax_id": "12345678",
  "fax": "02-2345-6790"
}
```

**成功回應**

```json
{
  "success": true,
  "message": "名片更新成功",
  "card_id": "BC-202606170001"
}
```

**失敗回應**

```json
{
  "success": false,
  "message": "更新失敗，名片不存在"
}
```

### delete — 刪除名片

- 用途：刪除指定名片，需帶入 `card_id`。

**請求範例**

```json
{
  "action": "delete",
  "card_id": "BC-202606170001"
}
```

**成功回應**

```json
{
  "success": true,
  "message": "名片刪除成功"
}
```

**失敗回應**

```json
{
  "success": false,
  "message": "刪除失敗，名片不存在"
}
```

## 通用回應欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `success` | boolean | 請求是否成功，`true` 成功、`false` 失敗。 |
| `message` | string | 回應訊息，用於顯示操作結果。 |
| `data` | object / array | 成功時回傳的名片資料，失敗時可能為空。 |
| `card_id` | string | 新增/更新/刪除時涉及的資料識別碼。 |

## 狀態碼

| HTTP 狀態碼 | 說明 |
|-------------|------|
| 200 | 請求成功處理完成。 |
| 400 | 請求格式錯誤或缺少必要欄位。 |
| 404 | 找不到指定資料。 |
| 500 | 伺服器內部錯誤。 |

## 備註

- 所有動作皆使用 `POST`，統一通訊介面。
- 請求與回應皆為單層 JSON，不超過兩層結構。
- `data` 欄位在單張讀取時為物件，全部讀取時為陣列。
- 實際 URL 與認證方式待後續補充。
