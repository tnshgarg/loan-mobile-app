import axios from "axios";
import { EMPLOYEE_API_BASE_URL } from "./endpoints";

export const putBackendData = (props) => {
  var data = JSON.stringify(props.document);
  var url = `${EMPLOYEE_API_BASE_URL}/${props.xpath}`;

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
