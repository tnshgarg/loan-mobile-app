import { useNavigation } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import LogoHeaderBack from "../molecules/LogoHeaderBack";
import CmsRoot from "./CmsRoot";

const CmsTopTabNav = (props) => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const hide = { display: "none", backgroundColor: "white" };
  const show = { backgroundColor: "white" };

  const { params } = props.route;

  console.log("Params: ", props.route);

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  console.log("ACCOUNT DATA: ", cmsData.account_navigation_list);

  return (
    <>
      <LogoHeaderBack
        title={cmsData.account_navigation_list[0].title}
        onLeftIconPress={() => navigation.goBack()}
        headline={cmsData.account_navigation_list[0].title}
      />
      {!cmsLoading ? (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              ...FONTS.body5,
              textTransform: "capitalize",
            },
            tabBarStyle: props.hide ? hide : show,
            tabBarPressColor: COLORS.primary,
            animationEnabled: true,
            tabBarScrollEnabled: false,
            swipeEnabled: !props.hide,
            lazy: true,
            tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
          }}
        >
          {cmsData[params.key].map((tab, index) => {
            console.log("TABDATA: ", tab.children);
            return (
              <Tab.Screen
                key={index}
                name={tab.key}
                component={() => (
                  <View style={{ backgroundColor: "white", flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                      <CmsRoot children={tab.children} />
                    </ScrollView>
                  </View>
                )}
                initialParams={{ key: tab.key }}
                options={{
                  tabBarAccessibilityLabel: tab.title,
                  tabBarLabel: tab.title,
                }}
              />
            );
          })}
        </Tab.Navigator>
      ) : (
        <></>
      )}
    </>
  );
};

export default CmsTopTabNav;
