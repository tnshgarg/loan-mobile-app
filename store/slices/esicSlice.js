import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portal: { estCode: "", ipNumber: "" },
  familyDetails: {
    fatherHusband: { relation: "", name: "" },
    nominee: { relation: "", name: "" },
  },
  address: {
    present: { street: "", state: "", district: "", pincode: "" },
    permanent: { street: "", state: "", district: "", pincode: "" },
    nominee: { street: "", state: "", district: "", pincode: "" },
  },
};

const esicSlice = createSlice({
  name: "esic",
  initialState: initialState,
  reducers: {
    addESICPortal(state, action) {
      state.portal[action.payload.type] = action.payload.val;
    },
    addESICFamilyDetails(state, action) {
      state.familyDetails[action.payload.type][action.payload.subtype] =
        action.payload.familyDetails;
    },
    addESICAddress(state, action) {
      state.address[action.payload.type][action.payload.subtype] =
        action.payload.address;
    },
  },
});

export const { addESICPortal, addESICFamilyDetails, addESICAddress } =
  esicSlice.actions;
export default esicSlice.reducer;

// YTBD
