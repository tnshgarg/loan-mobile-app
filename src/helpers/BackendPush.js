import { putBackendData } from "../services/employees/employeeServices";

export const licenseBackendPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "driving-license",
    token: payload.token,
  })
    .then((response) => {
      console.log("licenseBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.log("licenseBackendPush error: ", error);
    });
};

export const relationPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/relation",
    token: payload.token,
  })
    .then((response) => {
      console.log("relationPush response: ", response.data);
    })
    .catch((error) => {
      console.log("relationPush error: ", error);
    });
};


export const addressPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/address",
    token: payload.token,
  })
    .then((response) => {
      console.log("addressPush response: ", response.data);
    })
    .catch((error) => {
      console.log("addressPush error: ", error);
    });
};

export const portalPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "esic/portal",
    token: payload.token,
  })
    .then((response) => {
      console.log("portalPush response: ", response.data);
    })
    .catch((error) => {
      console.log("portalPush error: ", error);
    });
};

