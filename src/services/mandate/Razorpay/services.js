import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";
import { COLORS } from "../../../constants/Theme";
import { EMPLOYEE_API_URL, RZP_KEY_ID } from "../../constants";


const createOrder = (data, category, jwtToken) => {
  let config = {
    method: "post",
    url: `${EMPLOYEE_API_URL}/payment/order/${category}`,
    headers: {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${jwtToken}`,
    },
    data,
  };
  return axios(config)
}

const createMandateOrder = ({
  unipeEmployeeId,
  authType,
  token
}) => {
  
  let data = JSON.stringify({
    unipeEmployeeId,
    authType,
    provider: "razorpay"
  })
  return createOrder(
    data,
    "mandate",
    token
  )
};

const createRepaymentOrder = ({
  repaymentIds,
  unipeEmployeeId,
  token
}) => {
  
  let data = JSON.stringify({
    unipeEmployeeId,
    repaymentIds,
    provider: "razorpay"
  })
  return createOrder(
    data,
    "repayment",
    token
  )
};

const openRazorpayCheckout = ({orderId,customerId,description,prefill,notes,extraParams}) => {
  if (!extraParams)
    extraParams = {}
  let options = {
    name: "Unipe",
    key: RZP_KEY_ID,
    theme: { color: COLORS.primary },
    order_id: orderId,
    customer_id: customerId,
    description,
    notes,
    prefill,
    ...extraParams
  };
  console.log("Razorpay Checkout Options", options)
  return RazorpayCheckout.open(options)
}

module.exports = {
  createMandateOrder,
  createRepaymentOrder,
  openRazorpayCheckout
};
