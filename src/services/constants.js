import {
  STAGE,
  RZP_PROD_KEY_ID,
  RZP_QA_KEY_ID,
  RZP_DEV_KEY_ID,
} from "@env";

export const EMPLOYEE_API_URL = `https://api-${STAGE}.unipe.money/employee`;
export const ANALYTICS_URL = "https://ate9ze8q87.execute-api.ap-south-1.amazonaws.com/" + STAGE;

export const GUPSHUP_GENERATE_OTP_API_URL=`${EMPLOYEE_API_URL}/login/generate-otp`
export const GUPSHUP_VERIFY_OTP_API_URL=`${EMPLOYEE_API_URL}/login/verify-otp`

export const RZP_KEY_ID = STAGE !== "prod" ? RZP_DEV_KEY_ID : RZP_PROD_KEY_ID;

export const TIMEOUT = 5 * 60;
