import { GUPSHUP_PASSWORD, GUPSHUP_USERID } from "@env";

const sendSmsVerification = async (phoneNumber) => {
  try {
    let params = {
      userid: GUPSHUP_USERID,
      password: GUPSHUP_PASSWORD,
      method: "TWO_FACTOR_AUTH",
      v: "1.1",
      phone_no: phoneNumber,
      msg:"Hello+from+Unipe%21+%3A%29%0D%0AYour+One+Time+Password+for+Mobile+Verification+is+%25code%25+and+valid+only+for+40Minutes%0D%0AKeep+it+confidential+%26+do+not+share.%0D%0A%0D%0AWagepe",
      format: "JSON",
      otpCodeLength: "6",
      otpCodeType: "NUMERIC",
    };

    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    const response = await fetch(
      `https://enterprise.smsgupshup.com/GatewayAPI/rest?` + query,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    let params = {
      userid: GUPSHUP_USERID,
      password: GUPSHUP_PASSWORD,
      method: "TWO_FACTOR_AUTH",
      v: "1.1",
      phone_no: phoneNumber,
      format: "JSON",
      otp_code: code,
    };

    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    const response = await fetch(
      `https://enterprise.smsgupshup.com/GatewayAPI/rest?` + query,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
