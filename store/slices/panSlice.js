import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  verifyStatus: "PENDING",
  verifyMsg: "",
};

const panSlice = createSlice({
  name: "pan",
  initialState: initialState,
  reducers: {
    addPanNumber(state, action) {
      state.number = action.payload;
    },
    addPanVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
    addPanVerifyMsg(state, action) {
      state.verifyMsg = action.payload;
    },
    resetPan(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addPanNumber, addPanVerifyStatus, addPanVerifyMsg, resetPan } =
  panSlice.actions;
export default panSlice.reducer;
