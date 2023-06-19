import React, { useState, useRef } from "react";
import { Text, View, Dimensions, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { COLORS, SIZES } from "../../constants/Theme";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const renderItem = ({ item: child, index }) => {
  return <View key={index}>{child?.element(child)}</View>;
};

const CmsSwiper = ({ children }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const safeChildren = children || [];
  return (
    <View style={{ padding: 20 }}>
      <Carousel
        ref={isCarousel}
        data={safeChildren}
        renderItem={renderItem}
        sliderWidth={SIZES.width * 0.9}
        // style={{ width: "100%" }}
        itemWidth={SIZES.width * 0.9}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={safeChildren.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.primary,
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: "black",
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CmsSwiper;
