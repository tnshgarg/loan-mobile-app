import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setMistmatch as setBankMismatch } from "../../store/slices/bankSlice";
import { setMistmatch as setPanMistach } from "../../store/slices/panSlice";
const fuzz = require("fuzzball");

const FuzzyCheck = (props) => {
  const name = useSelector((state) => state.aadhaar.data?.name);

  const dispatch = useDispatch();
  const checkName =
    props.step == "PAN"
      ? useSelector((state) => state.pan.data?.name)
      : useSelector((state) => state.bank.data?.accountHolderName);

  const score = 100 - fuzz.token_set_ratio(name, checkName);
  useEffect(() => {
    console.log("FuzzyCheck", props.step, score);
    if (props.step == "PAN") {
      dispatch(setPanMistach(score));
    } else {
      dispatch(setBankMismatch(score));
    }
  }, [score]);

  return (
    <>
      {/* {score > 20
        ? Alert.alert(
            "Name mismatch",
            `Your Aadhaar Card name ${name} does not match with your ${props.step} name ${checkName}`
          )
        : null} */}
    </>
  );
};

export default FuzzyCheck;
