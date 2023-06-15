import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import VideoPlayer from "../organisms/VideoPlayer";
import SvgContainer from "./SvgContainer";

const BannerCard = ({ data }) => {
  const {
    title,
    titleStyle,
    subtitle,
    description,
    desIcon,
    imageUri,
    videoUri,
    thumbnail,
    navigate,
  } = data;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CmsStack", {
          screen: "CmsDummyBlog",
          params: {
            blogKey: navigate,
          },
        });
      }}
      activeOpacity={0.7}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#d6f3af", "#eaf98c"]}
        style={styles.container}
      >
        <View style={{ flexDirection: "column", flex: 1, paddingRight: 15 }}>
          <Text
            style={[
              styles.title,
              titleStyle == "strong" ? { ...FONTS.h3 } : null,
            ]}
          >
            {title}
          </Text>

          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          {description && (
            <View style={styles.row}>
              <MaterialCommunityIcons name={desIcon} size={14} />

              <Text style={styles.description}>{description}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: thumbnail ? 0.9 : 0.5 }}>
          {thumbnail ? (
            <VideoPlayer
              size={"small"}
              thumbnail={{
                uri: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              }}
            />
          ) : (
            <SvgContainer width={100} height={100}>
              {imageUri}
            </SvgContainer>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "5rem",
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10rem",
  },
  title: { ...FONTS.h3, color: COLORS.black },
  subtitle: { ...FONTS.body4, color: COLORS.black, marginTop: "5rem" },
  description: { ...FONTS.body5, color: COLORS.black, marginLeft: "5rem" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: "10rem",
  },
});

export default BannerCard;
