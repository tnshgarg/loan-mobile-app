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

export const EMPLOYEE_API_BASE_URL = API();

export const TIMEOUT = 5 * 60;
