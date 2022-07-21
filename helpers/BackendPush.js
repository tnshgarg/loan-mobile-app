import { GenerateDocument } from "./GenerateDocument";
import { putAadhaarData, putBankAccountData, putPanData } from "../services/employees/employeeServices";
import navigationSlice from "../store/slices/navigationSlice";

export const aadhaarBackendPush = (props) => {
  var aadhaarPayload = {};
  props.type == "OCR"
    ? (aadhaarPayload = GenerateDocument({
        src: "AadhaarOCR",
        id: props.id,
        frontAadhaarData: props.frontAadhaarData,
        backAadhaarData: props.backAadhaarData,
        status: props.status,
        message: props.message,
      }))
    : (aadhaarPayload = GenerateDocument({
        src: "AadhaarOTP",
        id: props.id,
        aadhaar: props.aadhaar,
        xml: props.xml,
        status: props.status,
        message: props.message,
      }));
  putAadhaarData(aadhaarPayload)
    .then((res) => {
      console.log(aadhaarPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

export const bankBackendPush = (props) => {
  var bankPayload = GenerateDocument({
    src: "Bank",
    id: props.id,
    ifsc: props.ifsc,
    accountNumber: props.accountNumber,
    upi: props.upiId,
    status: props.status,
    message: props.message
  });
  putBankAccountData(bankPayload)
    .then((res) => {
      console.log(bankPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const panBackendPush = (props) => {
  var panPayload = GenerateDocument({ 
    src: "Pan", 
    id: props.id, 
    pan: props.pan, 
    status: props.status, 
    message: props.message 
  });
  putPanData(panPayload)
    .then((res) => {
      console.log(panPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
