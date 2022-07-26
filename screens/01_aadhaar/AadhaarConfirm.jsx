import React from "react";
import AadhaarConfirmOCR from "./AadhaarConfirm/AadhaarConfirmOCR";
import AadhaarConfirmOTP from "./AadhaarConfirm/AadhaarConfirmOTP";

export default AadhaarConfirm = (type) => {
  return (
     type.route.params =="OCR" ? <AadhaarConfirmOCR /> : <AadhaarConfirmOTP /> 
  )
};
