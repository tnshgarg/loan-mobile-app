import { View } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import PanFormTemplate from "../../templates/pan/Form";
import TopTabNav from "../../components/TopTabNav";
import PanConfirmApi from "../../apis/pan/Confirm";
import Form from "../../templates/mandate/Form";

const Mandate = () => {
  const mandate = useSelector((state) => state.mandate);
  const verifyStatus = mandate?.verifyStatus;
  const type = mandate?.data?.type;

  const dataDetails = [
    { label: "Mandate Type", value: type },
    { label: "Verify Status", value: verifyStatus },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" ? (
        <>
          {dataDetails.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider
            />
          ))}
        </>
      ) : (
        <>
          <Form />
        </>
      )}
    </View>
  );
};

export default Mandate;
