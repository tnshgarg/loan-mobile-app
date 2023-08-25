import axios from "axios";
import { EMPLOYEE_API_URL } from "../constants";

const createOrder = (data, category, jwtToken) => {
  let config = {
    method: "post",
    url: `${EMPLOYEE_API_URL}/payment/order/${category}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    data,
  };
  return axios(config);
};

const createMandateOrder = ({ unipeEmployeeId, authType, token, provider, additionalData}) => {
  let data = JSON.stringify({
    unipeEmployeeId,
    authType,
    provider,
    additionalData
  });
  return createOrder(data, "mandate", token);
};

const createRepaymentOrder = ({
  repaymentIds,
  unipeEmployeeId,
  token,
  provider,
}) => {
  let data = JSON.stringify({
    unipeEmployeeId,
    repaymentIds,
    provider,
  });
  return createOrder(data, "repayment", token);
};

module.exports = {
  createMandateOrder,
  createRepaymentOrder,
};
