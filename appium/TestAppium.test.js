import { remote } from "webdriverio";
import jasmine from "jasmine";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
let driver;

beforeAll(async () => {
  driver = await remote({
    path: "/wd/hub",
    host: "localhost",
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "13",
      appium: { connectHardwareKeyboard: true },
      automationName: "UiAutomator2",
      appPackage: "com.employeeapp",
      appActivity: ".MainActivity",
      autoGrantPermissions: true,
    },
  });
});

afterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});

describe("Login Test", () => {
  test("InValid Credentials", async () => {
    // Looks for Login Button in DevMenu Screen
    await driver.pause(3000);
    const devMenuLoginBtn = await driver.$("~Login");
    await devMenuLoginBtn.touchAction({ action: "tap" });

    // Looks for Mobile Number TextInput and set value to "9999999998"
    await driver.$("~MobileNumber").waitForDisplayed({ timeout: 8000 });
    const loginUsernameInput = await driver.$("~MobileNumber");
    await loginUsernameInput.setValue("9999999998");
    await driver.$("~LoginScreen").waitForDisplayed({ timeout: 8000 });
    await driver.$("~LoginScreen").click();

    // Clicks the Login Button
    await driver.$("~LoginNextBtn").waitForDisplayed({ timeout: 8000 });
    const loginNextButton = await driver.$("~LoginNextBtn");
    await loginNextButton.touchAction({ action: "tap" });

    await driver.pause(4000);

    await driver.acceptAlert();
  });

  test("Correct Credentials", async () => {
    // Looks for Mobile Number TextInput and set value to "9999999999"
    await driver.pause(3000);
    await driver.$("~MobileNumber").waitForDisplayed({ timeout: 8000 });
    const loginUsernameInput = await driver.$("~MobileNumber");
    await loginUsernameInput.setValue("9999999999");
    await driver.$("~LoginScreen").waitForDisplayed({ timeout: 8000 });
    await driver.$("~LoginScreen").click();

    // Clicks the Login Button
    await driver.$("~LoginNextBtn").waitForDisplayed({ timeout: 8000 });
    const loginNextButton = await driver.$("~LoginNextBtn");
    await loginNextButton.touchAction({ action: "tap" });

    // Looks for Otp Screen Render
    const OtpScreen = await driver.$("~OtpScreen");
    await OtpScreen.waitForDisplayed({ timeout: 8000 });

    // Looks for Otp Input and sets value to "123456"
    const OtpInput = await driver.$("~OtpInput");
    await OtpInput.waitForDisplayed({ timeout: 6000 });
    await OtpInput.clearValue();
    await OtpInput.setValue("123456");
    await driver.$("~OtpText").waitForDisplayed({ timeout: 8000 });
    await driver.$("~OtpText").click();

    // Taps on Otp Button
    await driver.$("~OtpButton").waitForDisplayed({ timeout: 8000 });
    const OtpButton = await driver.$("~OtpButton");
    await OtpButton.touchAction({ action: "tap" });

    // Looks for Welcome Screen Render
    // await driver.$("~WelcomePage").waitForDisplayed({ timeout: 8000 });
    // const WelcomeScreen = await driver.$("~WelcomePage");
    // await WelcomeScreen.waitForDisplayed({ timeout: 8000 });
    await driver.pause(3000);
  }, 60000);
});
