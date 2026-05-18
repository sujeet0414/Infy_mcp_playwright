# infy-mcp-playwright

MCP Playwright server for web app testing automation. Exposes an HTTP API to run Playwright tests (navigation, clicks, link checks, screenshots).

## Install

```bash
npm install infy-mcp-playwright
```

Or install globally:

```bash
npm install -g infy-mcp-playwright
```

## Start the server

**Local project:**

```bash
npm start
```

**Global CLI:**

```bash
infy-mcp-playwright
```

The server prints:

```text
MCP Server Running on Port 3000
```

Set `PORT` to change the listen port (default: `3000`). Set `HEADLESS=false` to open a visible browser window.

## Run a test request

```bash
curl -X POST http://localhost:3000/run-test \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://perfectqaservices.com",
    "checkLinks": {
      "selector": "a"
    }
  }'
```

### Request body options

| Field | Description |
|-------|-------------|
| `url` | Page URL to open (required) |
| `type` | `{ selector, value }` — fill an input |
| `press` | Keyboard key (e.g. `"Enter"`) |
| `click` | `{ selector }` — click an element |
| `checkLinks` | `{ selector }` — visit each matching link and report status |

### Programmatic API

```javascript
const { runTest } = require('infy-mcp-playwright');

const result = await runTest({
  url: 'https://example.com',
  checkLinks: { selector: 'a' }
});
```

## Publish to npm

1. Log in: `npm login`
2. Dry-run: `npm pack --dry-run`
3. Publish: `npm publish`

## License

ISC
