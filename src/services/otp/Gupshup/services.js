import {  STAGE } from "@env";
import axios from "axios";
import { GUPSHUP_GENERATE_OTP_API_URL, GUPSHUP_VERIFY_OTP_API_URL } from "../../constants";

const sendSmsVerification = async (phoneNumber) => {
  if (STAGE === "dev") {
    return {
      response: {
        status: "success",
      },
    };
  } else {
    try {
    const response =  await axios
      .post(GUPSHUP_GENERATE_OTP_API_URL, {
        mobileNumber: phoneNumber,
      })
      return response.data
    } catch (error) {
      console.error("Error: ", error)
      return error;
    }
  }
};

const checkVerification = async (phoneNumber, code) => {
  if (STAGE === "dev") {
    return {
      response: {
        status: "success",
      },
    };
  } else {
    try {
      const response =  await axios
        .post(GUPSHUP_VERIFY_OTP_API_URL, {
          mobileNumber: phoneNumber,
          otp: code
        })
        return response.data
      } catch (error) {
        console.error("Error: ", error)
        return error;
      }
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};