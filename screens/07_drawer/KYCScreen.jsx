import React from "react";
import TopTabNav from "../../components/TopTabNav";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import PAN from "./PAN";

const KYCScreen = () => {
  const tabs = [
    { name: "Aadhaar", component: Aadhaar },
    { name: "PAN", component: PAN },
    { name: "Bank Details", component: Bank },
  ];
  return (
    <TopTabNav tabs={tabs} swipe={true}/>
  );
};

export default KYCScreen;
