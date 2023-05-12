import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetAadhaarQuery } from "../store/apiSlices/aadhaarApi";
import { useGetBankQuery } from "../store/apiSlices/bankApi";
import { useGetMandateQuery } from "../store/apiSlices/mandateApi";
import { useGetPanQuery } from "../store/apiSlices/panApi";
import { useGetProfileQuery } from "../store/apiSlices/profileApi";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetMandate } from "../store/slices/mandateSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
const BackendSync = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const {
    data: aadhaarData,
    isLoading: aadhaarLoading,
    isError: aadhaarError,
  } = useGetAadhaarQuery(unipeEmployeeId);
  const {
    data: panData,
    isLoading: panLoading,
    isError: panError,
  } = useGetPanQuery(unipeEmployeeId);
  const {
    data: bankData,
    isLoading: bankLoading,
    isError: bankError,
  } = useGetBankQuery(unipeEmployeeId);
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfileQuery(unipeEmployeeId);
  const {
    data: mandateData,
    isLoading: mandateLoading,
    isError: mandateError,
  } = useGetMandateQuery(unipeEmployeeId);

  useEffect(() => {
    console.log("BackendSync unipeEmployeeId: ", unipeEmployeeId);
    setTimeout(() => {
      navigation.navigate("HomeStack");
    }, 2000);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId && !aadhaarLoading && !aadhaarError) {
      try {
        dispatch(resetAadhaar(aadhaarData));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && !panLoading && !panError) {
      try {
        dispatch(resetPan(panData));
      } catch (error) {
        console.log("panBackendFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && !bankLoading && !bankError) {
      try {
        dispatch(resetBank(bankData));
      } catch (error) {
        console.log("BankBackendFetch error: ", error.message);
      }
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId && !profileLoading && !profileError) {
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
        dispatch(resetMandate(response.data.body));
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
