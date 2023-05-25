import { STAGE } from "@env";
import axios from "axios";
import {
  GUPSHUP_GENERATE_OTP_API_URL,
  GUPSHUP_VERIFY_OTP_API_URL,
} from "../../constants";
import { getVersion } from "react-native-device-info";

const sendSmsVerification = async (phoneNumber) => {
  try {
    const response = await axios.post(GUPSHUP_GENERATE_OTP_API_URL, {
      mobileNumber: phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return error;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    const response = await axios.post(
      GUPSHUP_VERIFY_OTP_API_URL,
      {
        mobileNumber: phoneNumber,
        otp: code,
      },
      {
        headers: {
          "X-Unipe-App-Version": getVersion(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", JSON.stringify(error));
    return error;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
