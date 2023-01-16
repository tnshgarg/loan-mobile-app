import axios from "axios";
import { RZP_AUTH } from "../../constants";
import { STAGE } from "@env";

const createCustomer = ({ name, email, contact, unipeEmployeeId }) => {
  var data = JSON.stringify({
    name: name,
    email: email,
    contact: contact,
    fail_existing: "0",
    notes: { unipeEmployeeId: unipeEmployeeId },
  });

  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/customers",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_AUTH,
    },
    data: data,
  };
  console.log("createCustomer data: ", data);
  return axios(config);
};

const createOrder = ({
  authType,
  customerId,
  accountHolderName,
  accountNumber,
  ifsc,
  aCTC,
  unipeEmployeeId,
}) => {
  if (authType === "upi") {
    var data = JSON.stringify({
      amount: 100,
      currency: "INR",
      customer_id: customerId,
      method: "upi",
      token: {
        max_amount: 500000,
        expire_at: 1767223119,
        frequency: "as_presented",
      },
      notes: { unipeEmployeeId: unipeEmployeeId },
    });
  } else {
    var data = JSON.stringify({
      amount: 0,
      currency: "INR",
      payment_capture: true,
      method: "emandate",
      customer_id: customerId,
      token: {
        auth_type: authType,
        max_amount: Math.round(
          100 * (parseFloat(aCTC.replace(/[^0-9.]+/g, "")) / 12)
        ),
        expire_at: 1767223119,
        bank_account: {
          account_number: accountNumber,
          account_type: "savings",
          ifsc_code: STAGE === "dev" ? "HDFC0000001" : ifsc,
          beneficiary_name: accountHolderName,
        },
      },
      notes: { unipeEmployeeId: unipeEmployeeId },
    });
  }

  console.log("createOrder data: ", data);
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

const getToken = ({ paymentId }) => {
  var config = {
    method: "get",
    url: `https://api.razorpay.com/v1/payments/${paymentId}`,
    headers: {
      Authorization: RZP_AUTH,
    },
  };

  return axios(config);
};

const getPaymentState = ({ orderId }) => {
  var config = {
    method: "get",
    url: `https://api.razorpay.com/v1/orders/${orderId}/payments`,
    headers: {
      Authorization: RZP_AUTH,
    },
  };
  return axios(config);
};

module.exports = {
  createCustomer,
  createOrder,
  getToken,
  getPaymentState
};
