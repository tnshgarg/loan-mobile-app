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

    await driver.pause(7000);

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
    await driver.$("~WelcomePage").waitForDisplayed({ timeout: 8000 });
    const WelcomeScreen = await driver.$("~WelcomePage");
    await WelcomeScreen.waitForDisplayed({ timeout: 8000 });

    const WelcomeButton = await driver.$("~WelcomeBtn");
    WelcomeButton.touchAction({ action: "tap" });

    await driver.pause(3000);
  }, 60000);
});

describe("Profile Test", () => {
  test("Demo Creds", async () => {
    // Looks for Login Button in DevMenu Screen
    // await driver.pause(3000);
    // const devMenuLoginBtn = await driver.$("~Profile");
    // await devMenuLoginBtn.touchAction({ action: "tap" });

    await driver.pause(3000);
    await driver.$("~ProfileForm").waitForDisplayed({ timeout: 8000 });
    const EducationDropdown = await driver.$("~EducationDropdown");
    const MaritalStatusDropdown = await driver.$("~MaritalStatusDropdown");
    const MotherNameInput = await driver.$("~MotherNameInput");
    const AltPhoneNumberInput = await driver.$("~AltPhoneNumberInput");
    const EmailAddressInput = await driver.$("~EmailAddressInput");
    await EducationDropdown.touchAction({ action: "tap" });
    await driver.$("~12th Pass").waitForDisplayed({ timeout: 8000 });
    await driver.$("~12th Pass").touchAction({ action: "tap" });
    await driver.$("~DropdownBtn").touchAction("tap");

    await MaritalStatusDropdown.touchAction({ action: "tap" });

    await driver.$("~Married").waitForDisplayed({ timeout: 8000 });
    await driver.$("~Married").touchAction({ action: "tap" });
    await driver.$("~DropdownBtn").touchAction("tap");

    await MotherNameInput.setValue("Wonder Woman");
    await AltPhoneNumberInput.setValue("9999999998");
    await EmailAddressInput.setValue("abc@gmail.com");

    await driver.$("~ProfileBtn").touchAction({ action: "tap" });

    await driver.pause(10000);
  });
});

describe("Aadhaar Test", () => {
  test("Aadhaar number does not have a mobile number registered with it", async () => {
    // await driver.pause(3000);
    // const devMenuLoginBtn = await driver.$("~AADHAAR");
    // await devMenuLoginBtn.touchAction({ action: "tap" });

    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001008");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Exceeded Maximum OTP generation Limit. Please try again in some time", async () => {
    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001011");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Aadhaar number does not exist", async () => {
    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001012");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Invalid Aadhaar Number", async () => {
    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123454000001");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("OTP already sent. Please try after 10 minutes", async () => {
    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123454000002");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Valid Creds", async () => {
    // Looks for Login Button in DevMenu Screen

    await driver.pause(3000);
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001001");

    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });

    await driver.$("~AadhaarOtpInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarOtpInput").setValue("201002");

    await driver.$("~AadhaarVerifyBtn").touchAction({ action: "tap" });

    await driver.$("~YesButton").waitForDisplayed({ timeout: 8000 });
    await driver.$("~YesButton").touchAction({ action: "tap" });

    await driver.pause(10000);
  });
});
