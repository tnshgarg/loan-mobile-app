import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "", // AADHAAR
  panNumber: "", // PAN
  motherName: "",
  dob: "", // AADHAAR
  address: "", // AADHAAR
  employer: "",
};

const ewaDetailsSlice = createSlice({
  name: "ewaDetails",
  initialState: initialState,
  reducers: {
    addName(state, action) {
      state.name = action.payload;
    },
    addPanNumber(state, action) {
      state.panNumber = action.payload;
    },
    addMotherName(state, action) {
      state.motherName = action.payload;
    },
    addDob(state, action) {
      state.dob = action.payload;
    },
    addAddress(state, action) {
      state.address = action.payload;
    },
    addEmployer(state, action) {
      state.employer = action.payload;
    },
  },
});

export const {
  addName,
  addPanNumber,
  addMotherName,
  addDob,
  addAddress,
  addEmployer,
} = ewaDetailsSlice.actions;
export default ewaDetailsSlice.reducer;
