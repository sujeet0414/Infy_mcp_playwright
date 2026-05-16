

class Abstract{

// constructor(page)
// {
//    super.page = page;
// }
async goto(string){
    await page.goto(string)
}

async waitForElementAndClick(locator){
    setTimeout(async ()=>{
        const element = page.locator(locator);
        await element.waitFor();
        await page.click(locator)
    },10000);
}


async click(locator){

    await page.waitForSelector( locator , {
            timeout: 60000
          })
        await page.click(locator)
        await page.waitForTimeout(3000)
    }

async keyboard(string){
    await page.keyboard.press(string)
    await page.waitForTimeout(1000)
 }

async waitForElementAndType(locator, string){
    setTimeout(async ()=>{
        const element = page.locator(locator);
        await element.waitFor();
        await page.type(locator, string)
    },10000);
}

async type( locator, string){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
    await page.type(locator, string)
}

async wait(Time){
    await page.waitForTimeout(Time)
}

async setInputFiles(locator , string){
    await page.setInputFiles(locator, string);
}

async reload(){
    await page.reload()
}

// async isVisible( locator){
//     expect(await page.$$(locator)).toHaveLength(1);
// }

async isVisible( locator){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
        expect(await page.$$(locator)).toHaveLength(1);
}

async isNotVisible( locator){
    expect(await page.$$(locator)).toHaveLength(0);
}

async waitForElement(locator){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
    const element = page.locator(locator);
    await element.waitFor();
}
async tomatch(string , locator){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
    expect(string).toMatch(await page.locator(locator).innerText());
}

async close(){
    await page.close()
}

async fill( locator, string){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
    await page.fill(locator, string)
}

async toBeChecked(locator){
    await page.waitForSelector( locator , {
        timeout: 60000
      })
    expect(await page.isChecked(locator)).toBe(true);
    await page.waitForTimeout(1000);
}

async toBeNotChecked(locator){
    expect(await page.isChecked(locator)).toBe(false);
    await page.waitForTimeout(1000);
}

} module.exports = {Abstract};