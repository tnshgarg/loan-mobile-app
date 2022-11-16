import axios from "axios";
import { RZP_AUTH } from "../../constants";
import { STAGE } from "@env";

const createCustomer = ({ name, email, contact }) => {
  var data = JSON.stringify({
    name: name,
    email: email,
    contact: contact,
    fail_existing: "0",
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

  return axios(config);
};

const createOrder = ({
  authType,
  customerId,
  accountHolderName,
  accountNumber,
  ifsc,
  aCTC,
}) => {
  console.log("createOrder");
  if (authType === "upi") {
    var data = JSON.stringify({
      amount: 100,
      currency: "INR",
      customer_id: customerId,
      method: "upi",
      token: {
        max_amount: 500000,
        expire_at: 4102444799,
        frequency: "as_presented",
      },
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
        max_amount: 100 * (parseFloat(aCTC.replace(/[^0-9.]+/g, "")) / 12),
        expire_at: 4102444799,
        bank_account: {
          account_number: accountNumber,
          account_type: "savings",
          ifsc_code: STAGE === "dev" ? "HDFC0000001" : ifsc,
          beneficiary_name: accountHolderName,
        },
      },
    });
  }

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

module.exports = {
  createCustomer,
  createOrder,
  getToken,
};
