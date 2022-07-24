import { GenerateDocument } from "./GenerateDocument";
import { putBackendData } from "../services/employees/employeeServices";

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
        data : props.data,
      }));
  putBackendData({ document: aadhaarPayload, src: "Aadhaar" })
    .then((res) => {
      console.log(aadhaarPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const bankBackendPush = (props) => {
  var bankPayload = GenerateDocument({
    src: "Bank",
    id: props.id,
    ifsc: props.ifsc,
    accountNumber: props.accountNumber,
    upi: props.upi,
    status: props.status,
    message: props.message,
  });
  putBackendData({ document: bankPayload, src: "Bank" })
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
    message: props.message,
    dob : props.dob,
  });
  putBackendData({ document: panPayload, src: "Pan" })
    .then((res) => {
      console.log(panPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const familyDetailsPush = (props) => {
  var familyPayload = GenerateDocument({
    src: "FamilyDetails",
    id: props.id,
    type: props.type,
    relation: props.relation,
    name: props.name,
  });
  putBackendData({ document: familyPayload, src: "FamilyDetails" })
    .then((res) => {
      console.log(familyPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addressPush = (props) => {
  var addressPayload = GenerateDocument({
    src: "Address",
    id: props.id,
    type: props.type,
    street: props.address[props.type].street,
    state: props.address[props.type].state,
    district: props.address[props.type].district,
    pin: props.address[props.type].pincode,
  });
  putBackendData({ document: addressPayload, src: "Address" })
    .then((res) => {
      console.log(addressPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const portalPush = (props) => {
  var portalPayload = GenerateDocument({
    src: "Portal",
    id: props.id,
    ipNumber: props.ipNumber,
  });
  putBackendData({ document: portalPayload, src: "Portal" })
    .then((res) => {
      console.log(portalPayload);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
