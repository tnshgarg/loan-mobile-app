import { putBackendData } from "../services/employees/employeeServices";

export const aadhaarBackendPush = (payload) => {
  putBackendData({ data: payload.data, xpath: "aadhaar", token: payload.token })
    .then((response) => {
      console.log("aadhaarBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.log("aadhaarBackendPush error: ", error);
    });
};

export const bankBackendPush = (payload) => {
  putBackendData({ data: payload.data, xpath: "bank", token: payload.token })
    .then((response) => {
      console.log("bankBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.log("bankBackendPush error: ", error);
    });
};

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

export const panBackendPush = (payload) => {
  putBackendData({ data: payload.data, xpath: "pan", token: payload.token })
    .then((response) => {
      console.log("panBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.log("panBackendPush error: ", error);
    });
};

export const profileBackendPush = (payload) => {
  putBackendData({ data: payload.data, xpath: "profile", token: payload.token })
    .then((response) => {
      console.log("profileBackendPush response: ", response.data);
    })
    .catch((error) => {
      console.log("profileBackendPush error: ", error);
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

export const fcmPush = (payload) => {
  putBackendData({
    data: payload.data,
    xpath: "fcm",
    token: payload.token,
  })
    .then((response) => {
      console.log("FCMPush response: ", response.data);
    })
    .catch((error) => {
      console.log("FCMPush error: ", error);
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

export const mandatePush = (payload) => {
  putBackendData({ data: payload.data, xpath: "mandate", token: payload.token })
    .then((response) => {
      console.log("mandatePush response: ", response.data);
      return response;
    })
    .catch((error) => {
      console.log("mandatePush error: ", error);
      return error;
    });
};

export const ewaOfferPush = (payload) => {
  return putBackendData({
    data: payload.data,
    xpath: "ewa/offer",
    token: payload.token,
  });
};

export const ewaKycPush = (payload) => {
  return putBackendData({
    data: payload.data,
    xpath: "ewa/kyc",
    token: payload.token,
  });
};

export const ewaAgreementPush = (payload) => {
  return putBackendData({
    data: payload.data,
    xpath: "ewa/agreement",
    token: payload.token,
  });
};
