import * as APIS from "./endpoints";
import axios from "axios";

export const putMobileData = (document) => {
  var data = JSON.stringify(document);
  var config = {
    method: "post",
    url: APIS.MOBILE_ONBOARD_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const putAadhaarData = (document) => {
  var data = JSON.stringify(document);
  var config = {
    method: "post",
    url: APIS.AADHAR_ONBOARD_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

export const putPanData = (document) => {
  var data = JSON.stringify(document);
  var config = {
    method: "post",
    url: APIS.PAN_ONBOARD_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

export const putBankAccountData = (document) => {
  var data = JSON.stringify(document);
  var config = {
    method: "post",
    url: APIS.BANK_ONBOARD_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

export const putProfileData = (document) => {
  var data = JSON.stringify(document);
  var config = {
    method: "post",
    url: APIS.PROFILE_ONBOARD_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

export const getDocumentData = (employeeId) => {
  const options = {
    params: {
      employee_id: employeeId,
    },
  };

  return axios.get(APIS.GET_DOCUMENTS_API, options);
};
