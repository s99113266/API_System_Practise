/**
 * serve.js
 * 簡易本地預覽伺服器
 * 用於預覽名片系統前端頁面，並提供 mock-data.json 給前端讀取。
 * 使用方式：在專案根目錄執行 `node serve.js`，瀏覽器開啟 http://localhost:8080
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(ROOT, urlPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("403 Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found: " + urlPath);
      return;
    }
    res.writeHead(200, { "Content-Type": getMimeType(filePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("========================================");
  console.log(" 名片系統預覽伺服器已啟動");
  console.log(" 瀏覽器開啟：http://localhost:" + PORT);
  console.log(" 停止伺服器：Ctrl + C");
  console.log("========================================");
});
