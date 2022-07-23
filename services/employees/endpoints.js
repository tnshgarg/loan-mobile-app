import {
  STAGE,
  EMPLOYEE_DEV_API_BASE_URL,
  EMPLOYEE_TEST_API_BASE_URL,
  EMPLOYEE_PROD_API_BASE_URL,
} from "@env";

const API = () => {
  if (STAGE === "dev") {
    return EMPLOYEE_DEV_API_BASE_URL;
  } else if (STAGE === "test") {
    return EMPLOYEE_TEST_API_BASE_URL;
  } else {
    return EMPLOYEE_PROD_API_BASE_URL;
  }
};

const EMPLOYEE_API_BASE_URL = API();

export const MOBILE_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/mobile`;
export const AADHAR_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/aadhaar`;
export const PAN_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/pan`;
export const BANK_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/bank`;
export const PROFILE_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/profile`;
export const FAMILY_DETAILS_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/esic/family`;
export const ADDRESS_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/esic/address`;
export const GET_DOCUMENTS_API = `${EMPLOYEE_API_BASE_URL}/documents`;

