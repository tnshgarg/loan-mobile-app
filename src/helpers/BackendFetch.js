import { getBackendData } from "../services/employees/employeeServices";

export const aadhaarBackendFetch = (payload) => {
  getBackendData({ params: payload, xpath: "aadhaar" })
    .then((response) => {
      console.log("aadhaarBackendFetch response.data: ", response.data);
      return response;
    })
    .catch((error) => {
      console.log("aadhaarBackendFetch error: ", error);
    });
};
