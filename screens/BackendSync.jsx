import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../services/employees/employeeServices";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetPan } from "../store/slices/panSlice";

export default BackendSync = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    navigation.navigate(props.route.params.destination);
  }, []);

  useEffect(() => {
    console.log("aadhaarBackendFetch BackendSync id: ", id);
    if (id) {
      getBackendData({ params: {id: id}, xpath: "aadhaar" })
      .then((response) => {
        console.log(response.data);
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
      getBackendData({ params: {id: id}, xpath: "pan" })
      .then((response) => {
        console.log(response.data);
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
  
  return (
      <Image source={require("../android/app/src/main/res/drawable/launch_screen.png")} />
  );
};
