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
  const body = {
    id: document.id,
    number: document.aadhaarNumber,
    data: document.base64_data,
    verifyMode: document.method,
    verifyStatus: document.status,
    verifyMsg: document.message,
  };
  var data = JSON.stringify(body);
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
  const body = {
    id: document.id,
    number: document.pan,
    verifyStatus: document.status,
    verifyMsg: document.message,
  };
  var data = JSON.stringify(body);
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
  const body = {
    id: document.id,
    accountNumber: document.account_number,
    ifsc: document.ifsc,
    upi: document.upi,
    verifyStatus: document.status,
    verifyMsg: document.message,
  };
  var data = JSON.stringify(body);
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
  const body = {
    id: document.id,
    maritalStatus: document.maritalStatus,
    qualification: document.qualification,
    altMobile: document.altMobile,
    email: document.email,
    photo: document.photo,
  };
  var data = JSON.stringify(body);
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
