# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-05-18

### Added
- npm package configuration (`files`, `bin`, `engines`, repository metadata)
- CLI entry point: `infy-mcp-playwright`
- `.gitignore` and `.npmignore` for publish hygiene
- Automatic `artifacts/` directory creation
- `HEADLESS=false` env var to run browser in headed mode (default: headless)

### Changed
- Package name: `infy-mcp-playwright` (was `infy_playwright-main`)
- Entry point `main` now correctly points to `index.js`
- Playwright Chromium install runs on `postinstall`

## [1.0.0] - Initial release

- MCP Playwright HTTP server on port 3000
- `/run-test` endpoint for URL navigation, clicks, link checks, and screenshots
