import axios from "axios";
import { Alert } from "react-native";
import * as RootNavigation from "../../navigators/RootNavigation";
import { store } from "../../store/store";
import { EMPLOYEE_API_URL } from "../constants";

const forcedLogout = (response) => {
  Alert.alert("Authentication Failed",response?.data?.message || "Your session has expired. Please login again.",[
    {
    text: 'Logout',
    onPress: () => {
      RootNavigation.navigate("OnboardingStack", { screen: "Login" });
      store.dispatch({ type: "LOGOUT" });
    }
  }
  ],{
    cancelable: false
  });
}
export const putBackendData = async (props) => {
  console.log(`putBackendData for ${props.xpath}`);

  let data = JSON.stringify(props.data);
  let url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  let config = {
    method: "post",
    timeout: 1000,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    data: data,
  };

  return await axios(config).then((response) => {
    if (!response.data.status || response.data.status === 500) {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
    else if (response.data.status === 401 && props.xpath !=="mobile") {
      if(props.token===""  ) {throw new Error("Can't hit backend servers!");}
      Alert.alert("Error", response?.data?.message || "Your session has expired. Please login again.");
      throw new Error("Your session has expired. Please login again.");
    }
    return response;
  });
};

export const getBackendData = async (props) => {
  console.log(`getBackendData for ${props.xpath}`);

  let params = props.params;
  let url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  let config = {
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    params: params,
  };

  return await axios(config).then((response) => {
    if (!response?.data?.status || response.data.status === 500) {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
    else if (response.data.status === 401) {
      if(!store.getState().auth?.loggedOut){
          forcedLogout(response);
      }
    }
    return response;
  });
};
