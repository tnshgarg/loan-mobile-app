import axios from "axios";
import { EMPLOYEE_API_URL } from "../constants";
import { Alert } from "react-native";
import {store} from "../../store/store"
import * as RootNavigation from "../../navigators/RootNavigation";
export const putBackendData = async (props) => {
  console.log(`putBackendData for ${props.xpath}`);

  var data = JSON.stringify(props.data);
  var url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  var config = {
    method: "post",
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

  var params = props.params;
  var url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  var config = {
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    params: params,
  };

  return await axios(config).then((response) => {
    if (!response.data.status || response.data.status === 500) {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
    else if (response.data.status === 401) {
      console.log({state: store.getState()})
      if(store.getState()?.loggedOut)
        return response

      Alert.alert("Authentication Failed",response?.data?.message || "Your session has expired. Please login again.",[
        {
        text: 'Logout',
        onPress: () => {
          RootNavigation.navigate("OnboardingStack", { screen: "Login" });
          store.dispatch({ type: "LOGOUT" });
        },
        style: 'cancel',
      }
    ],{
      cancelable: false
    });
    }
    return response;
  });
};
