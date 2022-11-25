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
      platformVersion: "13", // must correct the stimuator
      appium: { connectHardwareKeyboard: true },
      automationName: "UiAutomator2",
      coloredLogs: true,

      // app: "org.reactjs.native.example.LearnRnE2eTest", // this is for open specify app
      // udid: process.env.IOS_DEVICE_UUID,
      // xcodeOrgId: "xxx",
      // xcodeSigningId: "Apple Development"
      appPackage: "com.employeeapp",
      appActivity: ".MainActivity",
      autoGrantPermissions: true,
      consoleLogs: "info",
    },
    // logLevel: "silent"
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

  await driver.pause(10000);
  //   await driver.acceptAlert();

  //   await driver.pause(10000);
});
