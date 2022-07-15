import { createSlice } from "@reduxjs/toolkit";
import { aadhaarFrontPlaceholder, aadhaarBackPlaceholder } from "../../helpers/base64";

const initialState = {
  submitOTPtxnId: "",
  frontData: "",
  backData: "",
  number: "",
  data: "",
  verifyStatus: "",
  frontimg: aadhaarFrontPlaceholder,
  backimg: aadhaarBackPlaceholder,
};

const aadhaarSlice = createSlice({
  name: "aadhaar",
  initialState: initialState,
  reducers: {
    addSubmitOTPtxnId(state, action) {
      state.submitOTPtxnId = action.payload;
    },
    addOCRData(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.frontData = action.payload.data;
          break;

        case "AADHAAR_BACK":
          state.backData = action.payload.data;
          break;
      }
    },
    addImage(state, action) {
      switch (action.payload.type) {
        case "AADHAAR_FRONT":
          state.aadhaarFront = action.payload.data;
          break;
        case "AADHAAR_BACK":
          state.aadhaarBack = action.payload.data;
          break;
      }
    },
    addData(state, action) {
      state.data = action.payload;
    },
    addNumber(state, action) {
      state.number = action.payload;
    },
    addVerifyStatus(state, action) {
      state.verifyStatus = action.payload;
    },
  },
});

export const {
  addSubmitOTPtxnId,
  addOCRData,
  addData,
  addNumber,
  addVerifyStatus,
  addImage,
} = aadhaarSlice.actions;
export default aadhaarSlice.reducer;
