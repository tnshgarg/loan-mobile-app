import { GenerateDocument } from "./GenerateDocument";
import { putAadhaarData } from "../services/employees/employeeServices";
import navigationSlice from "../store/slices/navigationSlice";

const aadhaarBackendPush = (props) => {
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
        id: id,
        aadhaar: props.aadhaar,
        xml: props.xml,
        status: props.status,
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

module.exports = {
  aadhaarBackendPush,
};
