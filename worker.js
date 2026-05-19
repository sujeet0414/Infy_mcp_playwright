const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

module.exports.runTest = async (data) => {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 300
    });

    const page = await browser.newPage();

    const checkedPages = [];
    const consoleErrors = [];

    page.on('console', msg => {

        if (msg.type() === 'error') {

            consoleErrors.push(msg.text());
        }
    });

    try {

        console.log("Opening:", data.url);

        await page.goto(data.url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // GET LINKS
        const links = await page.$$eval(
            data.checkLinks.selector,
            elements => elements.map(el => ({
                text: el.innerText.trim(),
                href: el.href
            }))
        );

        const uniqueLinks = [];

        for (const link of links) {

            if (
                link.href &&
                !uniqueLinks.find(x => x.href === link.href)
            ) {
                uniqueLinks.push(link);
            }
        }

        console.log("Total Links:", uniqueLinks.length);

        // CHECK EACH PAGE
        for (const link of uniqueLinks) {

            try {

                if (
                    !link.href.startsWith('http')
                ) {
                    continue;
                }

                console.log("Checking:", link.href);

                const newPage = await browser.newPage();

                const response = await newPage.goto(
                    link.href,
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 30000
                    }
                );

                const status =
                    response ? response.status() : 0;

                const title = await newPage.title();

                const failed =
                    status >= 400 ||
                    title.toLowerCase().includes('404') ||
                    title.toLowerCase().includes('not found') ||
                    title.toLowerCase().includes('error');

                const screenshot =
                    `artifacts/${Date.now()}.png`;

                await newPage.screenshot({
                    path: screenshot,
                    fullPage: true
                });

                checkedPages.push({
                    name: link.text || 'No Text',
                    url: link.href,
                    status,
                    title,
                    result: failed
                        ? 'FAILED'
                        : 'PASSED',
                    screenshot
                });

                await newPage.close();

            } catch (err) {

                checkedPages.push({
                    name: link.text || 'No Text',
                    url: link.href,
                    result: 'FAILED',
                    error: err.message
                });
            }
        }

        // =========================
        // HTML REPORT
        // =========================

        const passed =
            checkedPages.filter(
                x => x.result === 'PASSED'
            ).length;

        const failed =
            checkedPages.filter(
                x => x.result === 'FAILED'
            ).length;

        const reportHtml = `
        <html>
        <head>
            <title>AI QA Report</title>

            <style>

                body {
                    font-family: Arial;
                    padding: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    border: 1px solid #ccc;
                    padding: 10px;
                }

                th {
                    background: #333;
                    color: white;
                }

                .passed {
                    color: green;
                    font-weight: bold;
                }

                .failed {
                    color: red;
                    font-weight: bold;
                }

            </style>
        </head>

        <body>

            <h1>AI QA AUTOMATION REPORT</h1>

            <h3>Total Pages: ${checkedPages.length}</h3>

            <h3>Passed: ${passed}</h3>

            <h3>Failed: ${failed}</h3>

            <table>

                <tr>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Result</th>
                </tr>

                ${checkedPages.map(page => `
                    <tr>
                        <td>${page.name}</td>
                        <td>${page.url}</td>
                        <td>${page.status || ''}</td>
                        <td class="${
                            page.result === 'PASSED'
                            ? 'passed'
                            : 'failed'
                        }">
                            ${page.result}
                        </td>
                    </tr>
                `).join('')}

            </table>

        </body>
        </html>
        `;

        // CREATE REPORTS FOLDER
        if (!fs.existsSync('reports')) {

            fs.mkdirSync('reports');
        }

        const reportPath =
            `reports/report-${Date.now()}.html`;

        fs.writeFileSync(
            reportPath,
            reportHtml
        );

        console.log("HTML Report Generated");

        await browser.close();

        return {
            status: 'passed',
            totalPages: checkedPages.length,
            passed,
            failed,
            report: reportPath
        };

    } catch (error) {

        await browser.close();

        return {
            status: 'failed',
            error: error.message
        };
    }
};