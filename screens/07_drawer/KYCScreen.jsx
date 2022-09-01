import React from "react";
import TopTabNav from "../../components/TopTabNav";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./PAN";

const KYCScreen = () => {
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
  ];
  return (
    <TopTabNav tabs={tabs} hide={false}/>
  );
};

export default KYCScreen;
