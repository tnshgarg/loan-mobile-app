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
                id: props.id,
                aadhaarNumber: props.aadhaar,
                base64_data: "", 
                method: "OTP", 
                side: "", 
                status: "",
                message: ""
              }
              break;

        case 'AadhaarOCR':
            document={
                id: props.id,
                aadhaarNumber: props.type =="front" ? props.frontaadhaarData["document_id"]:props.backaadhaarData["document_id"],
                base64_data: props.type=="front" ? props.AadhaarFront:props.AadhaarBack, 
                method: "OCR", 
                side: props.type=="front" ? "front":"back", 
                status: "",
                message: ""
              }
              break;

        case 'Pan':
            document={
                id: props.id,
                pan: props.pan,
                status: "",
                message: ""
              }
              break;

        case 'Bank':
            document={
                id: props.id,
                account_number: props.accountNumber,
                ifsc: props.ifsc,
                upi: props.upi,
                status: "",
                message: ""
            }
            break;

        case 'Profile':
            document={
                id: props.id,
                maritalStatus: props.maritalStatus,
                qualification: props.qualification,
                altMobile:  props.altMobile,
                email: props.email,
                photo: props.photo
            }
            break;  
        
    }
    return document;
}

module.exports = {
    GenerateDocument
};