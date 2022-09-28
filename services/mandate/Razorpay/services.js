import axios from "axios";
import { RZP_TEST_AUTH } from "@env";

const createCustomer = ({ name, email, phoneNumber }) => {
  var data = JSON.stringify({
    name: name,
    email: email,
    contact: phoneNumber,
    fail_existing: "0",
  });

  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/customers",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_TEST_AUTH,
    },
    data: data,
  };

  return axios(config);
};

const createDebitOrder = ({
  customerId,
  accountHolderName,
  accountNumber,
  ifsc,
}) => {
  var data = JSON.stringify({
    amount: 0,
    currency: "INR",
    method: "emandate",
    payment_capture: "1",
    customer_id: customerId,
    token: {
      auth_type: "debitcard",
      max_amount: 10000000,
      expire_at: 2147483647,
      bank_account: {
        beneficiary_name: accountHolderName,
        account_number: accountNumber,
        account_type: "savings",
        ifsc_code: "HDFC0000001",
      },
    },
  });
  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_TEST_AUTH,
    },
    data: data,
  };
  return axios(config);
};

const createNetBankingOrder = ({
  customerId,
  accountHolderName,
  accountNumber,
  ifsc,
}) => {
  var data = JSON.stringify({
    amount: 100,
    currency: "INR",
    method: "emandate",
    payment_capture: true,
    customer_id: customerId,
    token: {
      auth_type: "netbanking",
      max_amount: 10000000,
      bank_account: {
        beneficiary_name: accountHolderName,
        account_number: accountNumber,
        account_type: "savings",
        ifsc_code: "HDFC0000001", // ifsc,
      },
      expire_at: 2147483647,
    },
  });

  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_TEST_AUTH,
    },
    data: data,
  };

  return axios(config);
};

const createUpiOrder = ({ customerId }) => {
  var data = JSON.stringify({
    amount: 100,
    currency: "INR",
    customer_id: customerId,
    method: "upi",
    payment_capture: 1,
    token: {
      max_amount: 10000000,
      expire_at: 2709971120,
    },
  });

  var config = {
    method: "post",
    url: "https://api.razorpay.com/v1/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: RZP_TEST_AUTH,
    },
    data: data,
  };
  return axios(config);
};

module.exports = {
  createCustomer,
  createDebitOrder,
  createNetBankingOrder,
  createUpiOrder,
};
