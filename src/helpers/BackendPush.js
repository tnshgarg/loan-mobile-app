import { putBackendData } from "../services/employees/employeeServices";

export const licenseBackendPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "driving-license",
    token: payload.token,
  })
    .then((response) => {
      console.tron.log("licenseBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.tron.log("licenseBackendPush error: ", error);
    });
};

export const relationPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/relation",
    token: payload.token,
  })
    .then((response) => {
      console.tron.log("relationPush response: ", response.data);
    })
    .catch((error) => {
      console.tron.log("relationPush error: ", error);
    });
};


export const addressPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/address",
    token: payload.token,
  })
    .then((response) => {
      console.tron.log("addressPush response: ", response.data);
    })
    .catch((error) => {
      console.tron.log("addressPush error: ", error);
    });
};

export const portalPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/portal",
    token: payload.token,
  })
    .then((response) => {
      console.tron.log("portalPush response: ", response.data);
    })
    .catch((error) => {
      console.tron.log("portalPush error: ", error);
    });
};

