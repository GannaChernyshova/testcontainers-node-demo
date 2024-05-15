const { SeleniumContainer } = require("@testcontainers/selenium");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

describe("Selenium Test", () => {
    jest.setTimeout(60000);

    let container;
    let driver;

    beforeAll(async () => {
        container = await new SeleniumContainer()
        .withCapabilities({
            browserName: 'firefox',
            platform: 'LINUX'
        })
        .start();

        driver = await new Builder()
            .forBrowser(Browser.FIREFOX)
            .usingServer(container.getServerUrl())
            .build();
    });

    afterAll(async () => {
        await driver.quit()
    });

    it("should verify page title", async () => {
        await driver.get('https://www.google.com/ncr')
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    });
});