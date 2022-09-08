import axios from "axios";
import { EMPLOYEE_API_URL } from "./endpoints";

export const putBackendData = (props) => {
  var data = JSON.stringify(props.document);
  var url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  var config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const getBackendData = (props) => {
  var params = props.params;
  var url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  var config = {
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    params: params,
  };

  return axios(config);
};
