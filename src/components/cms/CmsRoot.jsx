import { View, Text } from "react-native";
import React from "react";
import CmsSection from "./CmsSection";
import CmsImage from "./CmsImage";
import CmsSwiper from "./CmsSwiper";
import CmsBanner from "./CmsBanner";
import CmsColumn from "./CmsColumn";
import CmsVideo from "./CmsVideo";
import CmsReview from "./CmsReview";

const CMS_TYPES = {
  section: CmsSection,
  image: CmsImage,
  swiper: CmsSwiper,
  banner: CmsBanner,
  column: CmsColumn,
  video: CmsVideo,
  review: CmsReview,
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
  console.log({ safeChildren });
  return (
    <View>
      {renderedChildren.map((child, index) => (
        <View key={index}>{child?.element(child)}</View>
      ))}
    </View>
  );
};

export default CmsRoot;
