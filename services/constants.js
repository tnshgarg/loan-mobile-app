import {
  STAGE,
  EMPLOYEE_API_BASE_URL,
  KYC_API_BASE_URL,
  KYC_MOCK_API_BASE_URL,
  RZP_PROD_AUTH,
  RZP_TEST_AUTH,
  RZP_PROD_KEY_ID,
  RZP_TEST_KEY_ID,
} from "@env";

export const EMPLOYEE_API_URL = `${EMPLOYEE_API_BASE_URL}/employee`;

export const KYC_API_URL =
  STAGE === "dev" ? KYC_MOCK_API_BASE_URL : KYC_API_BASE_URL;
export const KYC_AADHAAR_GENERATE_OTP_API_URL = `${KYC_API_URL}/aadhaar-api/boson/generate-otp`;
export const KYC_AADHAAR_SUBMIT_OTP_API_URL = `${KYC_API_URL}/aadhaar-api/boson/submit-otp`;
export const KYC_PAN_VERIFY_API_URL = `${KYC_API_URL}/pan-api/fetch-detailed`;
export const KYC_BANK_VERIFY_API_URL = `${KYC_API_URL}/bank-api/verify`;

export const RZP_KEY_ID = STAGE !== "prod" ? RZP_TEST_KEY_ID : RZP_PROD_KEY_ID;
export const RZP_AUTH = STAGE !== "prod" ? RZP_TEST_AUTH : RZP_PROD_AUTH;

export const TIMEOUT = 5 * 60;
