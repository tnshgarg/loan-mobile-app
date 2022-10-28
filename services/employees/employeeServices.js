import axios from "axios";
import { EMPLOYEE_API_URL } from "../constants";

export const putBackendData = (props) => {
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

  return axios(config);
};

export const getBackendData = async (props) => {
  console.log("getBackendData for ", props.xpath);

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

  return await axios(config);
};
