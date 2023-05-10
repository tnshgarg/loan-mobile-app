import axios from "axios";
import { EMPLOYEE_API_URL } from "../constants";
import { Alert } from "react-native";

export const putBackendData = async (props) => {
  console.log(`putBackendData for ${props.xpath}`);

  let data = JSON.stringify(props.data);
  let url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  let config = {
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
    else if (response.data.status === 401) {
      if(props.token==="") {throw new Error("Can't hit backend servers!");}
      Alert.alert(response?.data?.message || "Your session has expired. Please login again.");
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
    if (!response.data.status || response.data.status === 500) {
      throw new Error("Oops! Something went wrong. Please try again later.");
    }
    else if (response.data.status === 401) {
      if(props.token==="") {throw new Error("Can't hit backend servers!");}
      Alert.alert(response?.data?.message || "Your session has expired. Please login again.");
    }
    return response;
  });
};
