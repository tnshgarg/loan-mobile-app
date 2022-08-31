import { putBackendData } from "../services/employees/employeeServices";

export const aadhaarBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "aadhaar" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const bankBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "bank" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const licenseBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "license" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const panBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "pan" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const profileBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "profile" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const relationPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/relation" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const addressPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/address" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const portalPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/portal" })
    .then((response) => {
      console.log("response.data: ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
