import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../services/employees/employeeServices";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetLicense } from "../store/slices/licenseSlice";

const BackendSync = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    navigation.navigate(props.route.params.destination);
  }, []);

  useEffect(() => {
    console.log("aadhaarBackendFetch BackendSync id: ", id);
    if (id) {
      getBackendData({ params: { id: id }, xpath: "aadhaar" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetAadhaar(response.data.body));
            console.log("aadhaarBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("aadhaarBackendFetch error: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id: id }, xpath: "bank" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetBank(response.data.body));
            console.log("bankBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("bankBackendFetch error: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id: id }, xpath: "pan" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetPan(response.data.body));
            console.log("panBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("panBackendFetch error: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id: id }, xpath: "profile" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetProfile(response.data.body));
            console.log("profileBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("profileBackendFetch error: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id: id }, xpath: "driving-license" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetLicense(response.data.body));
            console.log("licenseBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("licenseBackendFetch error: ", error);
        });
    }
  }, [id]);

  return (
    <Image
      source={require("../android/app/src/main/res/drawable/launch_screen.png")}
    />
  );
};

export default BackendSync;
