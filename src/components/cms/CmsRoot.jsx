import { View, Text } from "react-native";
import React from "react";
import CmsSection from "./CmsSection";
import CmsImage from "./CmsImage";
import CmsSwiper from "./CmsSwiper";
import CmsBanner from "./CmsBanner";
import CmsColumn from "./CmsColumn";
import CmsVideo from "./CmsVideo";

const CMS_TYPES = {
  section: CmsSection,
  image: CmsImage,
  swiper: CmsSwiper,
  banner: CmsBanner,
  column: CmsColumn,
  video: CmsVideo,
  default: () => <></>,
};

const renderChildren = (node) => {
  if (node.type) {
    node.element = CMS_TYPES[node?.type || "default"];
  }
  if (node.children)
    node.children.forEach((item) => {
      renderChildren(item);
    });
  return node;
};

const CmsRoot = ({ children }) => {
  const safeChildren = children || [];
  renderChildren({ children: safeChildren });
  return (
    <View>
      {safeChildren.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </View>
  );
};

export default CmsRoot;
