import axios from "axios";
import { EMPLOYEE_API_URL } from "../constants";

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

export const getBackendData = async (props) => {
  console.log("getBackendData for ", props.xpath);
  var params = props.params;
  var url = `${EMPLOYEE_API_URL}/${props.xpath}`;
  const res = await axios.get(url, { params: params });
  return res;
};
