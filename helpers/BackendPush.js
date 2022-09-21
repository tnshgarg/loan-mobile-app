import { putBackendData } from "../services/employees/employeeServices";

export const aadhaarBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "aadhaar" })
    .then((response) => {
      console.log("aadhaarBackendPush response: ", response);
    })
    .catch((error) => {
      console.log("aadhaarBackendPush error: ", error);
    });
};

export const bankBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "bank" })
    .then((response) => {
      console.log("bankBackendPush response: ", response);
    })
    .catch((error) => {
      console.log("bankBackendPush error: ", error);
    });
};

export const licenseBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "driving-license" })
    .then((response) => {
      console.log("licenseBackendPush response: ", response);
    })
    .catch((error) => {
      console.log("licenseBackendPush error: ", error);
    });
};

export const panBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "pan" })
    .then((response) => {
      console.log("panBackendPush response: ", response);
    })
    .catch((error) => {
      console.log("panBackendPush error: ", error);
    });
};

export const profileBackendPush = (payload) => {
  putBackendData({ document: payload, xpath: "profile" })
    .then((response) => {
      console.log("profileBackendPush response: ", response);
    })
    .catch((error) => {
      console.log("profileBackendPush error: ", error);
    });
};

export const relationPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/relation" })
    .then((response) => {
      console.log("relationPush response: ", response);
    })
    .catch((error) => {
      console.log("relationPush error: ", error);
    });
};

export const addressPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/address" })
    .then((response) => {
      console.log("addressPush response: ", response);
    })
    .catch((error) => {
      console.log("addressPush error: ", error);
    });
};

export const portalPush = (payload) => {
  putBackendData({ document: payload, xpath: "esic/portal" })
    .then((response) => {
      console.log("portalPush response: ", response);
    })
    .catch((error) => {
      console.log("portalPush error: ", error);
    });
};

export const ewaLandingPush = (payload) => {
  putBackendData({ document: payload, xpath: "ewa/offer" })
    .then((response) => {
      console.log("ewaLandingPush response: ", response.data);
    })
    .catch((error) => {
      console.log("ewaLandingPush error: ", error);
    });
};

export const ewaKycPush = (payload) => {
  putBackendData({ document: payload, xpath: "ewa/kyc" })
    .then((response) => {
      console.log("ewaKycPush response: ", response.data);
    })
    .catch((error) => {
      console.log("ewaKycPush error: ", error);
    });
}; //slot in!

export const ewaMandatePush = (payload) => {
  putBackendData({ document: payload, xpath: "ewa/mandate" })
    .then((response) => {
      console.log("ewaMandatePush response: ", response.data);
    })
    .catch((error) => {
      console.log("ewaMandatePush error: ", error);
    });
};

export const ewaAgreementPush = (payload) => {
  putBackendData({ document: payload, xpath: "ewa/agreement" })
    .then((response) => {
      console.log("ewaAgreementPush response: ", response.data);
    })
    .catch((error) => {
      console.log("ewaAgreementPush error: ", error);
    });
};


