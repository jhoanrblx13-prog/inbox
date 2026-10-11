import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(root, "inbox.json");
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.text({ type: "*/*", limit: "1mb" }));
app.use(express.static(path.join(root, "public")));

function load() {
  if (!fs.existsSync(dbPath)) return [];
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}
function save(items) {
  fs.writeFileSync(dbPath, JSON.stringify(items.slice(0, 100), null, 2));
}

app.post("/hook", (req, res) => {
  const items = load();
  items.unshift({
    id: Date.now().toString(36),
    at: new Date().toISOString(),
    method: req.method,
    headers: req.headers,
    body: req.body,
  });
  save(items);
  res.status(202).json({ ok: true });
});

app.get("/api/items", (_req, res) => res.json(load()));
app.delete("/api/items", (_req, res) => {
  save([]);
  res.json({ ok: true });
});

const port = process.env.PORT || 8110;
app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
