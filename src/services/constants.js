import { RZP_DEV_KEY_ID, RZP_PROD_KEY_ID, STAGE } from "@env";
const POLLING_DURATION_MAP = {
  prod: 15 * 60,
  qa: 5 * 60,
  dev: 1 * 60,
  demo: 5 * 60,
};
export const CMS_POLLING_DURATION = POLLING_DURATION_MAP[STAGE] * 1000;
export const KYC_POLLING_DURATION = 24 * 60 * 60 * 1000;
export const EWA_POLLING_DURATION = 2 * 60 * 60 * 1000;
export const EMPLOYEE_API_URL = `https://api-${STAGE}.unipe.money/mobile-iota`;
export const KYC_SERVICE_URL = `https://services.unipe.money/${STAGE}`;
// export const KYC_SERVICE_URL = `http://192.168.1.3:5001/dev`;
// export const EMPLOYEE_API_URL = `http://192.168.1.3:8000/mobile-iota`;
console.log("api-url", EMPLOYEE_API_URL);
export const ANALYTICS_URL =
  "https://ate9ze8q87.execute-api.ap-south-1.amazonaws.com/" + STAGE;
// export const KYC_RETRY_WAIT_TIME = 10 * 1000;v
export const RZP_KEY_ID = STAGE !== "prod" ? RZP_DEV_KEY_ID : RZP_PROD_KEY_ID;
export const TIMEOUT = 5 * 60;
export const KYC_RETRY_WAIT_TIME = 40 * 1000;
