import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KYC_POLLING_DURATION } from "../services/constants";
import { useGetKycQuery } from "../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../store/apiSlices/mandateApi";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetMandate } from "../store/slices/mandateSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
const BackendSync = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  // const {
  //   data: aadhaarData,
  //   isLoading: aadhaarLoading,
  //   isError: aadhaarError,
  // } = useGetAadhaarQuery(unipeEmployeeId, {
  //   pollingInterval: 1000 * 60 * 60 * 24,
  // });
  // const {
  //   data: panData,
  //   isLoading: panLoading,
  //   isError: panError,
  // } = useGetPanQuery(unipeEmployeeId, {
  //   pollingInterval: 1000 * 60 * 60 * 24,
  // });
  // const {
  //   data: bankData,
  //   isLoading: bankLoading,
  //   isError: bankError,
  // } = useGetBankQuery(unipeEmployeeId, {
  //   pollingInterval: 1000 * 60 * 60 * 24,
  // });
  // const {
  //   data: profileData,
  //   isLoading: profileLoading,
  //   isError: profileError,
  // } = useGetProfileQuery(unipeEmployeeId, {
  //   pollingInterval: 1000 * 60 * 60 * 24,
  // });
  const {
    data: mandateData,
    isLoading: mandateLoading,
    isError: mandateError,
  } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 2,
  });

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });

  const {
    aadhaar: aadhaarData,
    pan: panData,
    bank: bankData,
    profile: profileData,
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
  } = kycData;

  useEffect(() => {
    console.log("BackendSync unipeEmployeeId: ", unipeEmployeeId);
    setTimeout(() => {
      navigation.navigate("HomeStack");
    }, 5000);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId && isAadhaarSuccess) {
      try {
        dispatch(resetAadhaar(aadhaarData));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && isPanSuccess) {
      try {
        dispatch(resetPan(panData));
      } catch (error) {
        console.log("panBackendFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && isBankSuccess) {
      try {
        dispatch(resetBank(bankData));
      } catch (error) {
        console.log("BankBackendFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && isProfileSuccess) {
      try {
        dispatch(resetProfile(profileData));
      } catch (error) {
        console.log("profileBackendFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && !mandateLoading && !mandateError) {
      try {
        dispatch(resetMandate(mandateData));
      } catch (error) {
        console.log("mandateFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  return (
    <Image
      source={require("../../android/app/src/main/res/drawable/launch_screen.png")}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BackendSync;
