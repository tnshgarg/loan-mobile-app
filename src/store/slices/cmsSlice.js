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
      console.log({ state });
      return state;
    },
    setProgress: (state, action) => {
      let { formId, value } = action.payload;
      if (!state[formId]) {
        state[formId] = {};
      }
      state[formId]["form_progress"] = value;
      console.log("cms state:", state);
      return state;
    },
  },
});

export const { setFormData: cmsFormData, setProgress: cmsFormProgress } =
  cmsSlice.actions;

export default cmsSlice.reducer;
