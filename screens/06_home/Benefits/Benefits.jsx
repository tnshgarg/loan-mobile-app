import TopTabNav from "../../../navigators/TopTabNav";
import DocumentsView from "../Documents/DocumentsView";
import ESICForm from "./ESIC/ESICForm";

export default Benefits = () => {
  const tabs = [
    { name: "ESIC", component: ESICForm },
    { name: "EPFO", component: DocumentsView },
  ];
  return <TopTabNav tabs={tabs} hide={false} />;
};
