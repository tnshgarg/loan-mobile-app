import { remote } from "webdriverio";
import jasmine from "jasmine";
import Gestures from "./helpers/Gestures";

// eslint-disable-next-line no-undef
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
    logLevel: "debug",
    bail: 0,
    baseUrl: "http://localhost",
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: "mocha",
    services: [
      [
        "appium",
        {
          args: {
            relaxedSecurity: true,
          },
          command: "appium",
        },
      ],
    ],
    mochaOpts: {
      ui: "bdd",
      timeout: 60000,
    },
  });
});

afterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});
test("Login test", async () => {
  await driver.pause(2000);
  const devMenuLoginBtn = await driver.$("~Login");
  devMenuLoginBtn.touchAction({ action: "tap" });

  await driver.pause(4000);

  const loginUsernameInput = await driver.$("~MobileNumber");
  await loginUsernameInput.clearValue();
  await loginUsernameInput.setValue("9999999999");

  await driver.pause(3000);

  await driver.$("~LoginScreen").click();
  await driver.pause(3000);

  const loginNextButton = await driver.$("~LoginNextBtn");

  //   await Gestures.checkIfDisplayedWithSwipeUp(loginNextButton, 2);
  //   await driver.pause(3000);
  loginNextButton.touchAction({ action: "tap" });

  await driver.pause(6000);

  const OtpScreen = await driver.$("~OtpScreen");
  await OtpScreen.waitForDisplayed({ timeout: 8000 });

  //   await driver.pause(3000);

  const OtpInput = await driver.$("~OtpInput");
  OtpInput.waitForDisplayed({ timeout: 6000 });
  await OtpInput.clearValue();
  await OtpInput.setValue("123456");

  await driver.pause(3000);

  await driver.$("~OtpKeyboardView").click();
  await driver.pause(3000);

  const OtpButton = await driver.$("~OtpButton");
  OtpButton.touchAction({ action: "tap" });

  await driver.pause(10000);
  //   await driver.acceptAlert();

  //   await driver.pause(10000);
});
