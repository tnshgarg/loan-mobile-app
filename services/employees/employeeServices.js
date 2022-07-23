import * as APIS from "./endpoints";
import axios from "axios";

export const putBackendData = (props) => {
  var data = JSON.stringify(props.document);
  var url = "";
  switch (props.src) {
    case "Mobile":
      url = APIS.MOBILE_ONBOARD_API;
      break;
    case "Aadhaar":
      url = APIS.AADHAR_ONBOARD_API;
      break;
    case "Pan":
      url = APIS.PAN_ONBOARD_API;
      break;
    case "Bank":
      url = APIS.BANK_ONBOARD_API;
      break;
    case "Profile":
      url = APIS.PROFILE_ONBOARD_API;
      break;
    case "FamilyDetails":
      url = APIS.FAMILY_DETAILS_ONBOARD_API;
      break;
    case "Address":
      url = APIS.ADDRESS_ONBOARD_API;
      break;
  }
  var config = {
    method: "post",
    url: url,
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
