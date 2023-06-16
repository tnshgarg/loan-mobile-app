import React from "react";
import { View } from "react-native";
import CmsBanner from "./CmsBanner";
import CmsBlog from "./CmsBlog";
import CmsButton from "./CmsButton";
import CmsCard from "./CmsCard";
import CmsColumn from "./CmsColumn";
import CmsContainer from "./CmsContainer";
import CmsIconText from "./CmsIconText";
import CmsImage from "./CmsImage";
import CmsNotification from "./CmsNotification";
import CmsReview from "./CmsReview";
import CmsSection from "./CmsSection";
import CmsSubtitle from "./CmsSubtitle";
import CmsSwiper from "./CmsSwiper";
import CmsTabs from "./CmsTabs";
import CmsTitle from "./CmsTitle";
import CmsTwoColumn from "./CmsTwoColumn";
import CmsVideo from "./CmsVideo";

const CMS_TYPES = {
  section: CmsSection,
  image: CmsImage,
  swiper: CmsSwiper,
  banner: CmsBanner,
  column: CmsColumn,
  video: CmsVideo,
  review: CmsReview,
  tabs: CmsTabs,
  card: CmsCard,
  twoColumn: CmsTwoColumn,
  title: CmsTitle,
  subtitle: CmsSubtitle,
  blog: CmsBlog,
  button: CmsButton,
  container: CmsContainer,
  iconText: CmsIconText,
  notification: CmsNotification,
  default: () => <></>,
};

const renderChildren = (node) => {
  let renderNode = { ...node };

  if (node.type) {
    renderNode.element = CMS_TYPES[node?.type || "default"];
  }
  let renderedChildren = [];

  if (node.children)
    node.children.forEach((item) => {
      renderedChildren.push(renderChildren(item));
    });
  renderNode.children = renderedChildren;

  return renderNode;
};

const CmsRoot = ({ children }) => {
  const safeChildren = children || [];
  const { children: renderedChildren } = renderChildren({
    children: safeChildren,
  });

  return (
    <View>
      {renderedChildren.map((child, index) => (
        <View key={index}>{child?.element(child)}</View>
      ))}
    </View>
  );
};

export default CmsRoot;
