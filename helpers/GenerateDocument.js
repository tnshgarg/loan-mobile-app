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
        data: props.status === "SUCCESS" ? props.xml: "",
        verifyMode: "OTP",
        verifyStatus: props.status,
        verifyMsg: props.message,
      };
      break;

    case "AadhaarOCR":
      var stringifyData = "";
      var number = ""
      if (props.status == "SUCCESS") {
        number = props.frontAadhaarData["document_id"]
        const data = {
          gender: props.frontAadhaarData["gender"],
          name: props.frontAadhaarData["name"],
          address: props.backAadhaarData["address"],
        };
        stringifyData = btoa(JSON.stringify(data));
      }
      document = {
        id: props.id,
        number: number,
        data: stringifyData,
        verifyMode: "OCR",
        verifyStatus: props.status,
        verifyMsg: props.message,
      };
      break;

    case "Pan":
      document = {
        id: props.id,
        number: props.pan,
        verifyStatus: props.status,
        verifyMsg: props.message,
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
