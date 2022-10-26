import TopTabNav from "../../../navigators/TopTabNav";
import DocumentsView from "../DocumentsView";
import License from "./License/License";

export default Documents = () => {

  const tabs = [
    { name: "Driving License", component: License },
    { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    { name: "ID Card", component: DocumentsView },
  ];
  return <TopTabNav tabs={tabs} hide={false} />;
};
