import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  esic: {"eecode":"","esic":""},
  familyDetails: {"relationName":"","relation":"","nomineeName":"","nomineeRelation":""},
  address: {"presentStreet":"","presentState":"","presentPincode":"","permStreet":"","permState":"","permPincode":""},
  nomineeAddress: {"nomStreet":"","nomState":"","nomPincode":""},
};

const esicSlice = createSlice({
  name: "esic",
  initialState: initialState,
  reducers: {
    addEsic(state, action) {
      state.esic = action.payload;
    },
    addFamilyDetails(state, action) {
      state.familyDetails = action.payload;
    },
    addAddress(state, action) {
      state.address = action.payload;
    },
    addNomineeAddress(state, action) {
      state.nomineeAddress = action.payload;
    },
  },
});

export const { addEsic, addFamilyDetails, addAddress, addNomineeAddress } = esicSlice.actions;
export default esicSlice.reducer;

// YTBD
