import RazorpayCheckout from "react-native-razorpay";
import { COLORS } from "../../../constants/Theme";
import { RZP_KEY_ID } from "../../constants";

const openRazorpayCheckout = ({
  orderId,
  customerId,
  description,
  prefill,
  notes,
  extraParams,
}) => {
  if (!extraParams) extraParams = {};
  let options = {
    name: "Unipe",
    key: RZP_KEY_ID,
    theme: { color: COLORS.primary },
    order_id: orderId,
    customer_id: customerId,
    description,
    notes,
    prefill,
    ...extraParams,
  };
  console.log("Razorpay Checkout Options", options);
  return RazorpayCheckout.open(options);
};

module.exports = {
  openRazorpayCheckout,
};
