import React, { useState, useRef } from "react";
import { Text, View, Dimensions, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { COLORS, SIZES } from "../../constants/Theme";

const renderItem = ({ item: child, index }) => {
  return <View key={index}>{child?.element(child)}</View>;
};

const CmsSwiper = ({ children }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const safeChildren = children || [];
  return (
    <View style={{ marginVertical: 10 }}>
      <Carousel
        ref={isCarousel}
        data={safeChildren}
        renderItem={renderItem}
        sliderWidth={SIZES.width * 0.9}
        containerCustomStyle={{ alignSelf: "center" }}
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
