import React from "react";
import TopTabNav from "../../../navigators/TopTabNav";
import DocumentsView from "../DocumentsView";
import ESICForm from "./ESIC/ESICForm";

export default Benefits = () => {
  const tabs = [
    { name: "EPFO", component: DocumentsView },
    { name: "ESIC", component: ESICForm },
  ];
  return <TopTabNav tabs={tabs} hide={false} />;
};
