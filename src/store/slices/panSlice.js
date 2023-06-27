import { createSlice } from "@reduxjs/toolkit";
import { panApi } from "../apiSlices/panApi";
const initialState = {
  data: {},
  number: "",
  verifyStatus: "PENDING",
  misMatch: "",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    resetPan(state, action) {
      if (!action.payload || Object.keys(action.payload).length === 0) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
    setMistmatch(state, action) {
      state.misMatch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      panApi.endpoints.verifyPan.matchFulfilled,
      (state, { payload }) => {
        console.log("payload: ", payload);
        state.data = payload?.body?.data;
        state.verifyStatus = payload?.body?.verifyStatus;
      }
    );
  },
});

export const { addData, addNumber, addVerifyStatus, setMistmatch, resetPan } =
  panSlice.actions;

export default panSlice.reducer;
