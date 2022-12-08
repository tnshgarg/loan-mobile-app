import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useSelector } from "react-redux";
import GetMoneyCard from "./GetMoneyCard";
import PayMoneyCard from "./PayMoneyCard";

const HomeOfferCard = ({ eligible, ewaAccessible, ewaLiveSlice }) => {
  const navigation = useNavigation();

  console.log({ ewaLiveSlice });

  // return (
  //   <SafeAreaView>
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       style={{
  //         backgroundColor: COLORS.primaryBackground,
  //         borderWidth: 1,
  //         borderColor: COLORS.primary,
  //         height: "auto",
  //         width: "100%",
  //         padding: 15,
  //         borderRadius: 5,
  //         alignSelf: "center",
  //       }}
  //       disabled={!ewaAccessible}
  //       onPress={() => navigation.navigate("Money", { screen: "EWA" })}
  //     >
  //       <Text
  //         style={{
  //           color: COLORS.black,
  //           ...FONTS.body3,
  //           marginTop: "2%",
  //           alignSelf: "center",
  //         }}
  //       >
  //         Get your Salary now!
  //       </Text>
  //       <Text
  //         style={{
  //           color: COLORS.primary,
  //           ...FONTS.h1,
  //           marginVertical: "3%",
  //           alignSelf: "center",
  //         }}
  //       >
  //         upto ₹ {ewaLiveSlice.eligibleAmount}
  //       </Text>
  //       <Text
  //         style={{
  //           color: COLORS.black,
  //           ...FONTS.body3,
  //           alignSelf: "center",
  //         }}
  //       >
  //         Before {ewaLiveSlice.dueDate}
  //       </Text>
  //       <PrimaryButton
  //         title={"Withdraw Now"}
  //         onPress={() => navigation.navigate("Money", { screen: "EWA" })}
  //         disabled={!ewaAccessible}
  //       />
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );

  return (
    <>
      <GetMoneyCard
        navigation={navigation}
        eligible={eligible}
        ewaAccessible={ewaAccessible}
        amount={"₹" + ewaLiveSlice?.eligibleAmount}
        progress={ewaLiveSlice?.loanAmount / ewaLiveSlice?.eligibleAmount}
      />

      <PayMoneyCard
        navigation={navigation}
        amount={"₹" + ewaLiveSlice?.loanAmount}
        dueDate={ewaLiveSlice?.dueDate}
      />
    </>
  );
};

export default HomeOfferCard;
