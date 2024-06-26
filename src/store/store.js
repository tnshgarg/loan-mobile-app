import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import aadhaarSlice from "./slices/aadhaarSlice";
import authSlice from "./slices/authSlice";
import bankSlice from "./slices/bankSlice";
import campaignSlice from "./slices/campaignSlice";
import esicSlice from "./slices/esicSlice";
import licenseSlice from "./slices/licenseSlice";
import mandateSlice from "./slices/mandateSlice";
import navigationSlice from "./slices/navigationSlice";
import panSlice from "./slices/panSlice";
import profileSlice from "./slices/profileSlice";
import timerSlice from "./slices/timerSlice";

import ewaHistoricalSlice from "./slices/ewaHistoricalSlice";
import ewaLiveSlice from "./slices/ewaLiveSlice";
import pendingCampaignClickSlice from "./slices/pendingCampaignClickSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./apiSlices/api";
import { ewaOtpApi } from "./apiSlices/ewaOtpApi";
import { serviceApi } from "./apiSlices/serviceApi";

import cmsSlice from "./slices/cmsSlice";
import localizationSlice from "./slices/localizationSlice";
// import reactotron from "../ReactotronConfig";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["api", "cmsForms", "ewaOtpApi"],
};

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [ewaOtpApi.reducerPath]: ewaOtpApi.reducer,
  aadhaar: aadhaarSlice,
  auth: authSlice,
  bank: bankSlice,
  campaign: campaignSlice,
  mandate: mandateSlice,
  esic: esicSlice,
  navigation: navigationSlice,
  pan: panSlice,
  profile: profileSlice,
  license: licenseSlice,
  timer: timerSlice,
  ewaLive: ewaLiveSlice,
  ewaHistorical: ewaHistoricalSlice,
  pendingCampaignClick: pendingCampaignClickSlice,
  localization: localizationSlice,
  cmsForms: cmsSlice,
});

const rootReducer = (state, action) => {
  console.log("action.type", action.type);
  if (action.type === "LOGOUT") {
    try {
      AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
    return appReducer(
      {
        auth: { phoneNumber: "", loggedOut: true },
        localization: state.localization,
      },
      action
    );
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // enhancers: [reactotron.createEnhancer()],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(ewaOtpApi.middleware)
      .concat(serviceApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
