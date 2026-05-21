const fs = require('fs');
const path = require('path');

const {
    chromium,
    firefox,
    webkit,
    devices
} = require('playwright');

const AxeBuilder =
    require('@axe-core/playwright').default;

function ensureDir(name) {

    if (!fs.existsSync(name)) {

        fs.mkdirSync(name, {
            recursive: true
        });
    }
}

function ensureArtifacts() {

    ensureDir('artifacts');
    ensureDir('reports');
    ensureDir('json-reports');
    ensureDir('videos');
}

function safeFileName(name) {

    return name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .substring(0, 50);
}

module.exports.runTest = async (data) => {

    ensureArtifacts();

    const browserType =
        data.browser || 'chromium';

    const browserLauncher = {

        chromium,
        firefox,
        webkit

    }[browserType];

    const browser =
        await browserLauncher.launch({

            headless:
                data.headless !== false,

            slowMo:
                data.slowMo || 200
        });

    const context =
        await browser.newContext({

            ...(data.mobile
                ? devices['iPhone 13']
                : {}),

            recordVideo: {
                dir: 'videos/'
            },

            colorScheme:
                data.darkMode
                    ? 'dark'
                    : 'light'
        });

    const page =
        await context.newPage();

    const checkedPages = [];
    const consoleErrors = [];
    const jsErrors = [];
    const networkFailures = [];
    const slowApis = [];
    const brokenImages = [];
    const failedRequests = [];
    const accessibilityIssues = [];

    // CONSOLE ERRORS
    page.on('console', msg => {

        if (msg.type() === 'error') {

            consoleErrors.push({

                text: msg.text(),

                location:
                    msg.location()
            });
        }
    });

    // PAGE JS ERRORS
    page.on('pageerror', error => {

        jsErrors.push({
            message: error.message
        });
    });

    // FAILED REQUESTS
    page.on('requestfailed', request => {

        failedRequests.push({

            url: request.url(),

            method:
                request.method()
        });
    });

    // NETWORK FAILURES
    page.on('response', async response => {

        try {

            const status =
                response.status();

            if (status >= 400) {

                networkFailures.push({

                    url:
                        response.url(),

                    status
                });
            }

            const timing =
                response.request().timing();

            if (
                timing &&
                timing.responseEnd > 5000
            ) {

                slowApis.push({

                    url:
                        response.url(),

                    time:
                        timing.responseEnd
                });
            }

        } catch (err) {}
    });

    // HANDLE POPUPS
    page.on('dialog', async dialog => {

        console.log(
            "Popup detected:",
            dialog.message()
        );

        await dialog.dismiss();
    });

    try {

        console.log(
            "Opening:",
            data.url
        );

        const startTime =
            Date.now();

        await page.goto(
            data.url,
            {
                waitUntil:
                    'networkidle',

                timeout:
                    60000
            }
        );

        const loadTime =
            Date.now() - startTime;

        console.log(
            "Page Load Time:",
            loadTime
        );

        // PERFORMANCE METRICS
        const performanceMetrics =
            await page.evaluate(() => {

                const timing =
                    performance.timing;

                return {

                    dns:
                        timing.domainLookupEnd -
                        timing.domainLookupStart,

                    tcp:
                        timing.connectEnd -
                        timing.connectStart,

                    ttfb:
                        timing.responseStart -
                        timing.requestStart,

                    domLoad:
                        timing.domContentLoadedEventEnd -
                        timing.navigationStart,

                    fullLoad:
                        timing.loadEventEnd -
                        timing.navigationStart
                };
            });

        // MEMORY USAGE
        const memoryUsage =
            await page.evaluate(() => {

                if (
                    performance.memory
                ) {

                    return {

                        usedJSHeapSize:
                            performance.memory.usedJSHeapSize
                    };
                }

                return {};
            });

        // EMPTY PAGE DETECTION
        const bodyText =
            await page.textContent('body');

        const emptyPage =
            !bodyText ||
            bodyText.trim().length < 20;

        // INFINITE LOADER CHECK
        const loaders =
            await page.$$(
                '.loading,.spinner,.loader'
            );

        const possibleInfiniteLoader =
            loaders.length > 0;

        // SEO CHECK
        const seo =
            await page.evaluate(() => {

                return {

                    title:
                        document.title,

                    description:
                        document
                            .querySelector(
                                'meta[name="description"]'
                            )
                            ?.content || '',

                    h1:
                        document
                            .querySelector('h1')
                            ?.innerText || '',

                    canonical:
                        document
                            .querySelector(
                                'link[rel="canonical"]'
                            )
                            ?.href || ''
                };
            });

        // BROKEN IMAGES
        const imageResults =
            await page.$$eval(
                'img',
                imgs => imgs.map(img => ({

                    src: img.src,

                    width:
                        img.naturalWidth,

                    height:
                        img.naturalHeight
                }))
            );

        imageResults.forEach(img => {

            if (
                img.width === 0 ||
                img.height === 0
            ) {

                brokenImages.push(
                    img.src
                );
            }
        });

        // ACCESSIBILITY TEST
        try {

            const accessibilityScan =
                await new AxeBuilder({
                    page
                }).analyze();

            accessibilityIssues.push(
                ...accessibilityScan.violations
            );

        } catch (err) {

            console.log(
                "Accessibility scan failed"
            );
        }

        // GET LINKS
        const links =
            await page.$$eval(
                data.checkLinks?.selector || 'a',

                elements =>
                    elements.map(el => ({

                        text:
                            el.innerText.trim(),

                        href:
                            el.href
                    }))
            );

        // REMOVE DUPLICATES
        const uniqueLinks = [];

        for (const link of links) {

            if (
                link.href &&
                !uniqueLinks.find(
                    x =>
                        x.href ===
                        link.href
                )
            ) {

                uniqueLinks.push(link);
            }
        }

        console.log(
            "Total Unique Links:",
            uniqueLinks.length
        );

        // PARALLEL LINK CHECKING
        await Promise.all(

            uniqueLinks.map(async link => {

                try {

                    if (
                        !link.href ||
                        !link.href.startsWith('http')
                    ) {
                        return;
                    }

                    console.log(
                        "Checking:",
                        link.href
                    );

                    const newPage =
                        await context.newPage();

                    let response;

                    // RETRY LOGIC
                    for (
                        let i = 0;
                        i < 3;
                        i++
                    ) {

                        try {

                            response =
                                await newPage.goto(
                                    link.href,
                                    {

                                        waitUntil:
                                            'domcontentloaded',

                                        timeout:
                                            30000
                                    }
                                );

                            break;

                        } catch (err) {

                            console.log(
                                "Retrying:",
                                link.href
                            );
                        }
                    }

                    const status =
                        response
                            ? response.status()
                            : 0;

                    const title =
                        await newPage.title();

                    const currentUrl =
                        newPage.url();

                    const redirected =
                        currentUrl !==
                        link.href;

                    const failed =
                        status >= 400 ||
                        title
                            .toLowerCase()
                            .includes('404') ||
                        title
                            .toLowerCase()
                            .includes('not found') ||
                        title
                            .toLowerCase()
                            .includes('error');

                    const safeName =
                        safeFileName(
                            link.text ||
                            'page'
                        );

                    const screenshot =
                        `artifacts/${safeName}-${Date.now()}.png`;

                    await newPage.screenshot({

                        path:
                            screenshot,

                        fullPage:
                            true
                    });

                    checkedPages.push({

                        name:
                            link.text ||
                            'No Text',

                        url:
                            link.href,

                        finalUrl:
                            currentUrl,

                        redirected,

                        status,

                        title,

                        result:
                            failed
                                ? 'FAILED'
                                : 'PASSED',

                        screenshot
                    });

                    await newPage.close();

                } catch (err) {

                    checkedPages.push({

                        name:
                            link.text ||
                            'No Text',

                        url:
                            link.href,

                        result:
                            'FAILED',

                        error:
                            err.message
                    });
                }
            })
        );

        const passed =
            checkedPages.filter(
                x =>
                    x.result ===
                    'PASSED'
            ).length;

        const failed =
            checkedPages.filter(
                x =>
                    x.result ===
                    'FAILED'
            ).length;

        // AI SUMMARY
        const aiSummary = `

Execution Summary

Passed Pages: ${passed}
Failed Pages: ${failed}
Broken Images: ${brokenImages.length}
Console Errors: ${consoleErrors.length}
JS Errors: ${jsErrors.length}
Failed APIs: ${networkFailures.length}
Slow APIs: ${slowApis.length}
Accessibility Issues: ${accessibilityIssues.length}

`;

        // JSON REPORT
        const jsonReport = {

            executionTime:
                new Date(),

            browser:
                browserType,

            url:
                data.url,

            loadTime,

            performanceMetrics,

            memoryUsage,

            emptyPage,

            possibleInfiniteLoader,

            seo,

            aiSummary,

            totalPages:
                checkedPages.length,

            passed,

            failed,

            brokenImages,

            consoleErrors,

            jsErrors,

            failedRequests,

            networkFailures,

            slowApis,

            accessibilityIssues,

            checkedPages
        };

        const jsonPath =
            `json-reports/report-${Date.now()}.json`;

        fs.writeFileSync(

            jsonPath,

            JSON.stringify(
                jsonReport,
                null,
                2
            )
        );

        // HTML REPORT
        const html = `

<html>

<head>

<title>AI QA REPORT</title>

<style>

body{
font-family:Arial;
padding:20px;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #ccc;
padding:10px;
}

th{
background:black;
color:white;
}

.passed{
color:green;
font-weight:bold;
}

.failed{
color:red;
font-weight:bold;
}

</style>

</head>

<body>

<h1>AI QA AUTOMATION REPORT</h1>

<pre>${aiSummary}</pre>

<h3>Total Pages: ${checkedPages.length}</h3>
<h3>Passed: ${passed}</h3>
<h3>Failed: ${failed}</h3>
<h3>Load Time: ${loadTime} ms</h3>

<h3>Broken Images: ${brokenImages.length}</h3>
<h3>Console Errors: ${consoleErrors.length}</h3>
<h3>JS Errors: ${jsErrors.length}</h3>
<h3>Failed APIs: ${networkFailures.length}</h3>
<h3>Slow APIs: ${slowApis.length}</h3>
<h3>Accessibility Issues: ${accessibilityIssues.length}</h3>

<table>

<tr>
<th>Page</th>
<th>Status</th>
<th>Result</th>
<th>Redirected</th>
</tr>

${checkedPages.map(page => `

<tr>

<td>${page.url}</td>

<td>${page.status || ''}</td>

<td class="${
    page.result === 'PASSED'
        ? 'passed'
        : 'failed'
}">

${page.result}

</td>

<td>
${page.redirected || false}
</td>

</tr>

`).join('')}

</table>

</body>

</html>

`;

        const reportPath =
            `reports/report-${Date.now()}.html`;

        fs.writeFileSync(
            reportPath,
            html
        );

        // FINAL SCREENSHOT
        const finalScreenshot =
            `artifacts/final-${Date.now()}.png`;

        await page.screenshot({

            path:
                finalScreenshot,

            fullPage:
                true
        });

        await browser.close();

        return {

            status:
                'passed',

            browser:
                browserType,

            loadTime,

            performanceMetrics,

            memoryUsage,

            seo,

            emptyPage,

            possibleInfiniteLoader,

            totalPages:
                checkedPages.length,

            passed,

            failed,

            brokenImages,

            consoleErrors,

            jsErrors,

            failedRequests,

            networkFailures,

            slowApis,

            accessibilityIssues,

            checkedPages,

            aiSummary,

            htmlReport:
                reportPath,

            jsonReport:
                jsonPath,

            screenshot:
                finalScreenshot
        };

    } catch (error) {

        console.log(
            "FAILED:",
            error.message
        );

        const failureScreenshot =
            `artifacts/failure-${Date.now()}.png`;

        await page.screenshot({

            path:
                failureScreenshot,

            fullPage:
                true
        });

        await browser.close();

        return {

            status:
                'failed',

            error:
                error.message,

            screenshot:
                failureScreenshot
        };
    }
};