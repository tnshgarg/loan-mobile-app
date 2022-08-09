const GenerateDocument = (props) => {
  var document = {};
  switch (props.src) {
    case "otp":
      document = {
        number: props.number,
      };
      break;

    case "Aadhaar":
      document = {
        id: props.id,
        number: props.aadhaar,
        data: props.status === "SUCCESS" ? props.xml : "",
        verifyStatus: props.status,
        verifyMsg: props.message,
        name: props.data["name"],
        gender: props.data["gender"],
        dob: props.data["date_of_birth"],
      };
      break;

    case "Pan":
      document = {
        id: props.id,
        dob: props.dob,
        email: props.email,
        gender: props.gender,
        name: props.name,
        number: props.number,
        verifyMsg: props.verifyMsg,
        verifyStatus: props.verifyStatus,
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

    case "FamilyDetails":
      document = {
        id: props.id,
        type: props.type,
        relation: props.relation,
        name: props.name,
      };
      break;

    case "Address":
      document = {
        id: props.id,
        type: props.type,
        street: props.street,
        state: props.state,
        district: props.district,
        pin: props.pin,
      };
      break;

    case "Portal":
      document = { id: props.id, ipNumber: props.ipNumber };
      break;
  }
  return document;
};

module.exports = {
  GenerateDocument,
};
