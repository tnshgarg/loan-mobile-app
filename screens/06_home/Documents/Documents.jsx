import React from "react";
import TopTabNav from "../../../components/TopTabNav";
import HomeView from "../HomeView";
import LicenseForm from "./License/LicenseForm";

export default Documents = () => {
  const tabs = [
    { name: "Offer Letter", component: HomeView },
    { name: "Pay Slips", component: HomeView },
    { name: "ID Card", component: HomeView },
    { name: "Driving License", component: LicenseForm },
  ];
  return <TopTabNav tabs={tabs} />;
};
