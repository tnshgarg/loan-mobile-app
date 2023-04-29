import {
  STAGE,
  RZP_PROD_KEY_ID,
  RZP_QA_KEY_ID,
  RZP_DEV_KEY_ID,
} from "@env";

export const EMPLOYEE_API_URL = `https://api-${STAGE}.unipe.co/employee`;

export const GUPSHUP_GENERATE_OTP_API_URL=`${EMPLOYEE_API_URL}/login/generate-otp`
export const GUPSHUP_VERIFY_OTP_API_URL=`${EMPLOYEE_API_URL}/login/verify-otp`

export const RZP_KEY_ID = STAGE !== "prod" ? (STAGE === "qa" ? RZP_QA_KEY_ID : RZP_DEV_KEY_ID)  : RZP_PROD_KEY_ID;

export const TIMEOUT = 5 * 60;
