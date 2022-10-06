import React from "react";
import TopTabNav from "../../navigators/TopTabNav";
import Mandate from "./Mandate";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./PAN";

const KYCScreen = () => {
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
    { name: "MANDATE", component: Mandate },
  ];
  return <TopTabNav tabs={tabs} hide={false} />;
};

export default KYCScreen;
