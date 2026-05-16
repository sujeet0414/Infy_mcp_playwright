const { chromium } = require('playwright');

module.exports.runTest = async (data) => {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });

    const page = await browser.newPage({
        viewport: {
            width: 1600,
            height: 900
        }
    });

    const consoleErrors = [];

    // Capture console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    // Capture failed requests
    page.on('response', response => {
        const status = response.status();

        if (status >= 400) {
            consoleErrors.push(
                `HTTP ${status} -> ${response.url()}`
            );
        }
    });

    try {

        console.log("Opening URL:", data.url);

        await page.goto(data.url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // ============================
        // SEARCH TEXT
        // ============================
        if (data.type) {

            console.log("Typing:", data.type.value);

            await page.waitForSelector(data.type.selector, {
                timeout: 30000
            });

            await page.fill(
                data.type.selector,
                data.type.value
            );
        }

        // ============================
        // PRESS KEY
        // ============================
        if (data.press) {

            console.log("Pressing:", data.press);

            await page.keyboard.press(data.press);

            await page.waitForLoadState('networkidle');
        }

        // ============================
        // CLICK
        // ============================
        if (data.click) {

            console.log("Waiting for click element");

            await page.waitForSelector(
                data.click.selector,
                {
                    timeout: 30000
                }
            );

            console.log("Clicking:", data.click.selector);

            await page.click(data.click.selector);

            await page.waitForLoadState('networkidle');
        }

        // ============================
        // CHECK ALL LINKS
        // ============================
        let checkedPages = [];

        if (data.checkLinks) {

            console.log("Checking all menu links...");

            const links = await page.$$eval(
                data.checkLinks.selector,
                elements => elements.map(el => ({
                    text: el.innerText.trim(),
                    href: el.href
                }))
            );

            console.log("Total links found:", links.length);

            for (const link of links) {

                try {

                    if (
                        !link.href ||
                        link.href.startsWith('javascript') ||
                        link.href.includes('#')
                    ) {
                        continue;
                    }

                    console.log("Opening:", link.text);

                    const newPage = await browser.newPage();

                    const response = await newPage.goto(
                        link.href,
                        {
                            waitUntil: 'domcontentloaded',
                            timeout: 30000
                        }
                    );

                    const status = response ? response.status() : 0;

                    // Check page title
                    const title = await newPage.title();

                    // Detect bad pages
                    const badPage =
                        status >= 400 ||
                        title.toLowerCase().includes('404') ||
                        title.toLowerCase().includes('not found') ||
                        title.toLowerCase().includes('error');

                    checkedPages.push({
                        name: link.text,
                        url: link.href,
                        status: status,
                        result: badPage ? 'FAILED' : 'PASSED'
                    });

                    // Screenshot each page
                    await newPage.screenshot({
                        path: `artifacts/${Date.now()}.png`,
                        fullPage: true
                    });

                    await newPage.close();

                } catch (err) {

                    checkedPages.push({
                        name: link.text,
                        url: link.href,
                        result: 'FAILED',
                        error: err.message
                    });
                }
            }
        }

        // ============================
        // FINAL SCREENSHOT
        // ============================
        const screenshotPath =
            `artifacts/success-${Date.now()}.png`;

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        console.log("Test Passed");

        await browser.close();

        return {
            status: 'passed',
            url: data.url,
            checkedPages,
            consoleErrors,
            screenshot: screenshotPath
        };

    } catch (error) {

        console.log("Test Failed:", error.message);

        const screenshotPath =
            `artifacts/failure-${Date.now()}.png`;

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        await browser.close();

        return {
            status: 'failed',
            url: data.url,
            error: error.message,
            consoleErrors,
            screenshot: screenshotPath
        };
    }
};