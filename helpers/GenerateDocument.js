import base64 from "react-native-base64";
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
        aadhaarNumber: props.aadhaar,
        base64_data: props.xml,
        method: "OTP",
        status: "",
        message: "",
      };
      break;

    case "AadhaarOCR":
      document = {
        id: props.id,
        aadhaarNumber: props.frontaadhaarData["document_id"],
        base64_data: base64.encode({
          gender: props.frontaadhaarData["gender"],
          name: props.frontaadhaarData["name"],
          address: props.backaadhaarData["address"],
        }),
        method: "OCR",
        status: "",
        message: "",
      };
      break;

    case "Pan":
      document = {
        id: props.id,
        pan: props.pan,
        status: "",
        message: "",
      };
      break;

    case "Bank":
      document = {
        id: props.id,
        account_number: props.accountNumber,
        ifsc: props.ifsc,
        upi: props.upi,
        status: "",
        message: "",
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
