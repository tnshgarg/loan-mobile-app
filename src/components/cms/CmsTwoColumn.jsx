import React from "react";
import { TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsTwoColumn = ({ children, widths, styling, onPress, navigate }) => {
  const safeChildren = children || [];
  // const [getCmsLanguageStrings] = useLazyGetCmsLanguageStringsQuery();

  // const language = onPress.language;
  // let content = {};
  // console.log("LAANG: ", language);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress.type == "changeLanguage") {
          // getCmsLanguageStrings(onPress.language)
          //   .then(({ data }) => {
          //     console.log("langgggg: ", data.strings);
          //     content[language] = data.strings;
          //     strings.setContent(content);
          //     console.log("Content: ", content);
          //     changeLanguage(onPress.language);
          navigationHelper({
            type: navigate.type,
            stack: navigate.stack,
            screen: navigate.screen,
            language: onPress.language,
          });
          // })
          // .catch((e) => console.log("error occured: ", e));
        } else {
          return null;
        }
      }}
      style={[styles.row, { ...styling }]}
    >
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            {
              padding: 0,
              width: widths?.[index] || "50%",
              border: 1,
            },
          ]}
        >
          {child.element(child)}
        </View>
      ))}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "15rem",
  },
  col: {
    flexDirection: "column",
    width: "50%",
  },
});

export default CmsTwoColumn;
