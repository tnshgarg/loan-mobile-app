import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cmsSlice = createSlice({
  name: "cms",
  initialState: initialState,
  reducers: {
    setState: (_, action) => action?.payload,
    updateState: (state, action) => {
      Object.assign(state, action.payload);
    },
    setFormData: (state, action) => {
      let { formId, key, value } = action.payload;
      if (!state[formId]) {
        state[formId] = {};
      }
      state[formId][key] = value;
    },
  },
});

export const { setFormData: cmsFormData } = cmsSlice.actions;

export default cmsSlice.reducer;
