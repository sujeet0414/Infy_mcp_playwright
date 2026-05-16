# Infy_mcp_playwright

WebApp Testing Automation

## Start the server

Open PowerShell in this project folder:

```powershell
cd C:\Users\Administrator\Downloads\Infy_playwright-main\Infy_playwright-main\Infy_mcp_playwright
```

Install dependencies if needed:

```powershell
npm install
```

Start the MCP Playwright server:

```powershell
npm start
```

The server should print:

```text
MCP Server Running on Port 3000
```

## Run a test request

Open a second PowerShell window and run:

```powershell
$body = @{
    url = "https://perfectqaservices.com"

    checkLinks = @{
        selector = "a"
    }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
    -Uri "http://localhost:3000/run-test" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```
