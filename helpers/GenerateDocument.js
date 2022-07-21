import { btoa } from "react-native-quick-base64";
const GenerateDocument = (props) => {
  var document = {};
  switch (props.src) {
    case "otp":
      document = {
        number: props.number,
      };
      break;

    case "AadhaarOTP":
      document = {
        id: props.id,
        number: props.aadhaar,
        data: props.xml,
        verifyMode: "OTP",
        verifyStatus: props.status,
        verifyMsg: "",
      };
      break;

    case "AadhaarOCR":
      const data = {
        gender: props.frontAadhaarData["gender"],
        name: props.frontAadhaarData["name"],
        address: props.backAadhaarData["address"],
      }
      const stringifyData = JSON.stringify(data);
      document = {
        id: props.id,
        number: props.frontAadhaarData["document_id"],
        data: btoa(stringifyData),
        verifyMode: "OCR",
        verifyStatus: props.status,
        verifyMsg: "",
      };
      break;

    case "Pan":
      document = {
        id: props.id,
        number: props.pan,
        verifyStatus: "SUCCESS",
        verifyMsg: "",
      };
      break;

    case "Bank":
      document = {
        id: props.id,
        accountNumber: props.accountNumber,
        ifsc: props.ifsc,
        upi: props.upi,
        verifyStatus: "SUCCESS",
        verifyMsg: "",
      };
      break;

    case "Profile":
      document = {
        id: props.id,
        maritalStatus: props.maritalStatus,
        qualification: props.qualification,
        altMobile: props.altMobile,
        email: props.email,
        photo: props.photo,
      };
      break;
  }
  return document;
};

module.exports = {
  GenerateDocument,
};
