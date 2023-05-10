import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../services/employees/employeeServices";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetMandate } from "../store/slices/mandateSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { useNavigation } from "@react-navigation/core";

const BackendSync = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  useEffect(() => {
    console.log("BackendSync unipeEmployeeId: ", unipeEmployeeId);
    setTimeout(() => {
      navigation.navigate("HomeStack");
    }, 2000);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "aadhaar",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetAadhaar(response.data.body));
          }
        })
        .catch((error) => {
          console.log("aadhaarBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "bank",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetBank(response.data.body));
          }
        })
        .catch((error) => {
          console.log("bankBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "pan",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetPan(response.data.body));
          }
        })
        .catch((error) => {
          console.log("panBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "profile",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetProfile(response.data.body));
          }
        })
        .catch((error) => {
          console.log("profileBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetMandate(response.data.body));
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
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
