import { SafeAreaView, Text, View } from "react-native";
import { FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { styles } from "../../styles";

const Placeholder = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: "20%" }}>
        <Text style={{ ...FONTS.h3, alignSelf: "center" }}>
          {strings.moreDetailsComingSoon}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Placeholder;
