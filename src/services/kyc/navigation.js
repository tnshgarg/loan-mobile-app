import { navigate } from "../../navigators/RootNavigation";

// KS stands for KYC_STATE which can be used to redirect user in any flow
const KS = {
  PROFILE_FORM: 0,
  AADHAAR_FORM: 1,
  AADHAAR_OTP: 2,
  AADHAAR_CONFIRMATION: 3,
  PAN_FORM: 4,
  PAN_CONFIRMATION: 5,
  BANK_FORM: 6,
  BANK_CONFIRMATION: 7,
  COMPLETE: 8,
};

const redirectScreen = {
  [KS.PROFILE_FORM]: "ProfileForm",
  [KS.AADHAAR_FORM]: "AadhaarForm",
  [KS.AADHAAR_OTP]: "AadhaarVerify",
  [KS.AADHAAR_CONFIRMATION]: "AadhaarConfirm",
  [KS.PAN_FORM]: "PanForm",
  [KS.PAN_CONFIRMATION]: "PanConfirm",
  [KS.BANK_FORM]: "BankForm",
  [KS.BANK_CONFIRMATION]: "BankConfirm",
};

const getKYCStage = (isProfileSuccess, aadhaar, pan, bank) => {
  if (!isProfileSuccess) return KS.PROFILE_FORM;
  if (
    !["INPROGRESS_OTP", "INPROGRESS_CONFIRMATION", "SUCCESS"].includes(
      aadhaar.verifyStatus
    )
  )
    return KS.AADHAAR_FORM;
  if (aadhaar.verifyStatus === "INPROGRESS_OTP") return KS.AADHAAR_OTP;
  if (aadhaar.verifyStatus === "INPROGRESS_CONFIRMATION")
    return KS.AADHAAR_CONFIRMATION;
  if (!["INPROGRESS_CONFIRMATION", "SUCCESS"].includes(pan.verifyStatus))
    return KS.PAN_FORM;
  if (pan.verifyStatus === "INPROGRESS_CONFIRMATION")
    return KS.PAN_CONFIRMATION;
  if (!["INPROGRESS_CONFIRMATION", "SUCCESS"].includes(bank.verifyStatus)) {
    return KS.BANK_FORM;
  }
  if (bank.verifyStatus === "INPROGRESS_CONFIRMATION")
    return KS.BANK_CONFIRMATION;
  return KS.COMPLETE;
};

export const kycNavigate = (kycData, navigation) => {
  let { isProfileSuccess, aadhaar, pan, bank } = kycData || {};
  let kycStage = getKYCStage(isProfileSuccess, aadhaar, pan, bank);
  console.log({ kycData, kycStage, redirectScreen: redirectScreen[kycStage] });
  console.log("REDIRECT Screen: ", redirectScreen[kycStage]);
  if (!kycStage) {
    navigate("HomeStack", {
      screen: "Home",
    });
  }

  if (kycStage == KS.COMPLETE) {
    navigate("KycSuccess");
    return;
  }
  console.log("REDIRECT Screen: ", redirectScreen[kycStage]);
  navigate("EWAStack", {
    screen: "EWA_KYC_STACK",
    params: {
      screen: redirectScreen[kycStage],
    },
  });
};
