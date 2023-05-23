import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Pressable, Text, Modal, View, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";
import { useDispatch } from "react-redux";
import SVGImg from "../../assets/UnipeLogo.svg";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

export default Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Please wait while we log you out");
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <SVGImg />
              </View>
              <Text
                style={{
                  ...FONTS.h2,
                }}
              >
                Logging you out...
              </Text>
            </View>
          </View>
        </Modal>
      ) : null}
      <Pressable
        onPress={() => {
          dispatch({ type: "LOGOUT" });
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            // navigation.replace("OnboardingStack", { screen: "Login" });
          }, 5000);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <AntDesign name="logout" color={COLORS.warning} size={16} />
        <Text style={{ ...FONTS.h4, paddingLeft: 10, color: COLORS.warning }}>
          Logout
        </Text>
      </Pressable>
    </>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "$white",
    flex: 1,
    padding: "15rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  iconContainer: {
    padding: "15rem",
    borderRadius: SIZES.width * 0.2,
    backgroundColor: COLORS.warningBackground,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.warning,
    textAlign: "center",
    marginVertical: "20rem",
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    //textAlign: "center",
    //width: "70%",
  },
});
