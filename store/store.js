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
import notificationSlice from "./slices/notificationSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const appReducer = combineReducers({
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
  notification: notificationSlice,
});

const rootReducer = (state, action) => {
  console.log("action.type", action.type);
  if (action.type === "LOGOUT") {
    try {
      AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
