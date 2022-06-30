const GenerateDocument =(props) =>{
    var document={};
    switch (props.src) {
        case 'otp':
            document={
                number:props.number,
            }
            break;

        case 'AadhaarOTP':
            document={
                aadhaarNumber: aadhaar,
                base64_data: "", 
                method: "OTP", 
                side: "", 
                status: "",
                message: ""
              }
              break;

        case 'AadhaarOCR':
            document={
                aadhaarNumber: props.type =="front" ? props.frontaadhaarData["document"]["document_id"]:props.backaadhaarData["document"]["document_id"],
                base64_data: props.type=="front" ? props.AadhaarFront:props.AadhaarBack, 
                method: "OCR", 
                side: props.type=="front" ? "front":"back", 
                status: "",
                message: ""
              }
              break;

        case 'Pan':
            document={
                pan: props.pan,
                status: "",
                message: ""
              }
              break;

        case 'Bank':
            document={
                accountNumber: props.accountNumber,
                ifsc: props.ifsc,
                status: "",
                message: ""
            }
            break;

        case 'Profile':
            document={
                maritalStatus: props.maritalStatus,
                qualification : props.qualification,
                status: "",
                message: ""
            }
            break;  
        
    }
    return document;
}

module.exports = {
    GenerateDocument
};