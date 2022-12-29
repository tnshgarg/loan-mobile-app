import axios from "axios";
import { RZP_AUTH } from "../constants";

const createPaymentOrder = ({ amount, repaymentId }) => {
  var data = JSON.stringify({
    amount: amount * 100,
    currency: "INR",
    notes:{
      repaymentId: repaymentId
    }
  });

  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_AUTH,
    },
    data: data,
  };
  return axios(config);
};

module.exports = {
  createPaymentOrder,
};
