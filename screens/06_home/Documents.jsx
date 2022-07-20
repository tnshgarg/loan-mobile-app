import React from "react";
import TopTabNav from "../../components/TopTabNav";
import HomeView from "./HomeView";


export default Documents = () => {
  const tabs = [
    { name: "Offer Letter", component: HomeView },
    { name: "Pay Slips", component: HomeView },
    { name: "ID Card", component: HomeView },
  ];
  return <TopTabNav tabs={tabs}/>;
};
