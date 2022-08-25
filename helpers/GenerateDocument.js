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
        data: props.data,
        number: props.number,
        verifyMsg: props.verifyMsg,
        verifyStatus: props.verifyStatus,
      };
      console.log("document: ", document);
      break;

    case "Pan":
      document = {
        id: props.id,
        data: props.data,
        number: props.number,
        verifyMsg: props.verifyMsg,
        verifyStatus: props.verifyStatus,
        verifyTimestamp: props.verifyTimestamp,
      };
      break;

    case "Bank":
      document = {
        id: props.id,
        accountNumber: props.accountNumber,
        ifsc: props.ifsc,
        upi: props.upi,
        verifyStatus: props.verifyStatus,
        verifyMsg: props.verifyMsg,
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
