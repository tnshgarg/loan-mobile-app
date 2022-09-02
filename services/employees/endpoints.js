import {
  STAGE,
  EMPLOYEE_API_BASE_URL,
  KYC_API_BASE_URL,
  KYC_MOCK_API_BASE_URL,
} from "@env";

const kycApi = () => {
  if (STAGE === "dev") {
    return KYC_MOCK_API_BASE_URL;
  } else {
    return KYC_API_BASE_URL;
  }
};

export const EMPLOYEE_API_URL = `${EMPLOYEE_API_BASE_URL}/${STAGE}/employee`;

export const KYC_API_URL = kycApi();
export const KYC_AADHAAR_GENERATE_OTP_API_URL = `${KYC_API_URL}/aadhaar-api/boson/generate-otp`;
export const KYC_AADHAAR_SUBMIT_OTP_API_URL = `${KYC_API_URL}/aadhaar-api/boson/submit-otp`;
export const KYC_PAN_VERIFY_API_URL = `${KYC_API_URL}/pan-api/fetch-detailed`;
export const KYC_BANK_VERIFY_API_URL = `${KYC_API_URL}/bank-api/verify`;

export const TIMEOUT = 5 * 60;
