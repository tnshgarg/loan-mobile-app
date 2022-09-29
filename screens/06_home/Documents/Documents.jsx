import React from "react";
import TopTabNav from "../../../components/TopTabNav";
import HomeView from "../HomeView";
import License from "./License/License";

export default Documents = () => {
  const tabs = [
    { name: "Offer Letter", component: HomeView },
    { name: "Pay Slips", component: HomeView },
    { name: "ID Card", component: HomeView },
    { name: "Driving License", component: License },
  ];
  return <TopTabNav tabs={tabs} hide={false}/>;
};
