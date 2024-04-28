import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "",
  strings: {},
};

const localizationSlice = createSlice({
  name: "localization",
  initialState: initialState,
  reducers: {
    addLanguage(state, action) {
      state.language = action.payload;
    },
    addLanguageStrings(state, action) {
      state.strings = action.payload;
    },
  },
});

export const { addLanguage, addLanguageStrings } = localizationSlice.actions;
export default localizationSlice.reducer;
