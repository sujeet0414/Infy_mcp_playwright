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

## Enhanced checks and outputs

`worker.js` performs additional runtime checks and produces reports and artifacts automatically. Notable request options and outputs:

- **Request body options:**
  - `browser`: `chromium|firefox|webkit` — choose the engine (default: `chromium`).
  - `headless`: `boolean` — run with a visible browser when `false` (default: `true`).
  - `mobile`: `boolean` — emulate `iPhone 13` when `true`.
  - `darkMode`: `boolean` — set page color scheme to dark when `true`.
  - `slowMo`: `number` — slow motion in ms for Playwright (default: `200`).

- **Runtime checks performed:** performance metrics (dns, tcp, ttfb, dom/load times), memory usage, empty-page detection, infinite-loader detection (common loader selectors), basic SEO extraction (title, meta description, h1, canonical), broken images, console errors, page JS errors, failed requests and network failures (status >= 400), slow API detection (>5s), and accessibility scans via `axe-core`.

- **Link checking:** visits links matched by `checkLinks.selector` (default `a`) with up to 3 retries, captures a screenshot per visited page, and marks each as `PASSED` or `FAILED`.

- **Artifacts & reports:** saved under `artifacts/`, `videos/`, `json-reports/` and `reports/`. The worker writes a JSON report (`json-reports/report-<ts>.json`) and an HTML report (`reports/report-<ts>.html`) and stores screenshots in `artifacts/`.

- **Response object:** the API returns a structured object containing `status`, `browser`, `loadTime`, `performanceMetrics`, `memoryUsage`, `seo`, `totalPages`, `passed`, `failed`, `brokenImages`, `consoleErrors`, `jsErrors`, `failedRequests`, `networkFailures`, `slowApis`, `accessibilityIssues`, `checkedPages`, `aiSummary`, `htmlReport`, `jsonReport`, and `screenshot` (final screenshot path).

Example curl request using the new options:

```bash
curl -X POST http://localhost:3000/run-test \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "browser": "firefox",
    "headless": false,
    "mobile": false,
    "darkMode": true,
    "slowMo": 100,
    "checkLinks": { "selector": "a" }
  }'
```

## Publish to npm

1. Log in: `npm login`
2. Dry-run: `npm pack --dry-run`
3. Publish: `npm publish`

## License

ISC
