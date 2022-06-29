import * as APIS from "./endpoints";

export const postAadhaarFormData = (authToken, document) => {
    const options = {
      headers: { Authorization: authToken },
    };
    const body = {
      number: document.aadhaarNumber,
      base64_data: document.base64_data, 
      method: document.method, 
      side: document.side, 
      status: document.status,
      message: document.message
    };
    return axios.post(APIS.AADHAR_ONBOARD_API, body, options);
};

export const postPanFormData = (authToken, document) => {
  const options = {
    headers: { Authorization: authToken },
  };
  const body = {
    number: document.pan, 
    status: document.status,
    message: document.message 
  };
  return axios.post(APIS.PAN_ONBOARD_API, body, options);
};

export const postBankAccountFormData = (authToken, document) => {
  const options = {
    headers: { Authorization: authToken },
  };
  const body = {
    account_number: document.account_number,
    ifsc: document.ifsc,
    status: document.status,
    message: document.message 
  };
  return axios.post(APIS.BANK_ONBOARD_API, body, options);
};

export const postProfileFormData = (authToken, document) => {
  const options = {
    headers: { Authorization: authToken },
  };
  const body = {
    maritalStatus: document.maritalStatus,
    qualification: document.qualification,
    status: document.status,
    message: document.message 
  };
  return axios.post(APIS.PROFILE_ONBOARD_API, body, options);
};


export const getDocumentData = (authToken, employeeId) => {
  const options = {
    headers: { Authorization: authToken },
    params: {
      employee_id: employeeId,
    },
  };

  return axios.get(APIS.GET_DOCUMENTS_API, options);
};