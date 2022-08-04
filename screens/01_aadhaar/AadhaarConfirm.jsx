import React from "react";
import AadhaarConfirmOCR from "./AadhaarConfirm/AadhaarConfirmOCR";
import AadhaarConfirmOTP from "./AadhaarConfirm/AadhaarConfirmOTP";


export default AadhaarConfirm = (props) => {
  return (
     props.route.params === "OCR" ? <AadhaarConfirmOCR /> : <AadhaarConfirmOTP /> 
  )
};
