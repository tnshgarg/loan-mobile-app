import { View, Text, ScrollView } from "react-native";
import React from "react";
import { styles } from "../../styles";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";

import CmsRoot from "../../components/cms/CmsRoot";
import { COLORS } from "../../constants/Theme";

const CmsComponent = (props) => {
  const { cmsData } = props;
  const safeChildren = cmsData || [];

  return (
    <View
      style={[styles.container, { backgroundColor: COLORS.black, flex: 1 }]}
    >
      {/* <LogoHeaderBack
        title={screenTitle}
        onLeftIconPress={() => navigation.goBack()}
      /> */}
      {/* <ScrollView> */}
      <View style={[styles.container, { backgroundColor: COLORS.black }]}>
        {/* <CmsRoot children={safeChildren}></CmsRoot> */}
        <Text>jkbk</Text>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default CmsComponent;
