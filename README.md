# inbox

Catches HTTP posts. Send JSON to `/hook` and the page lists the body and time. Keeps the last 100. Refresh is automatic.

## Run

```bat
cd inbox
npm install
node server.js
```

Open http://127.0.0.1:8110

Test from another prompt:

```bat
curl -X POST http://127.0.0.1:8110/hook -H "Content-Type: application/json" -d "{\"hello\":\"world\"}"
```
