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
      switch (action.payload.type) {
        case "estCode":
          state.portal.estCode = action.payload.val;
          break;
        case "ipNumber":
          state.portal.ipNumber = action.payload.val;
          break;
      }
    },
    addESICFamilyDetails(state, action) {
      switch (action.payload.type) {
        case "fatherHusband":
          if (action.payload.subtype === "relation")
            state.familyDetails.fatherHusband.relation = action.payload.val;
          else state.familyDetails.fatherHusband.name = action.payload.val;
          break;
        case "nominee":
          if (action.payload.subtype === "relation")
            state.familyDetails.nominee.relation = action.payload.val;
          else state.familyDetails.nominee.name = action.payload.val;
          break;
      }
    },
    addESICAddress(state, action) {
      switch (action.payload.type) {
        case "present":
          if (action.payload.subtype === "street")
            state.address.present.street = action.payload.val;
          else if (action.payload.subtype === "state")
            state.address.present.state = action.payload.val;
          else if (action.payload.subtype === "district")
            state.address.present.district = action.payload.val;
          else state.address.present.pincode = action.payload.val;
          break;
        case "permanent":
          if (action.payload.subtype === "street")
            state.address.permanent.street = action.payload.val;
          else if (action.payload.subtype === "state")
            state.address.permanent.state = action.payload.val;
          else if (action.payload.subtype === "district")
            state.address.permanent.district = action.payload.val;
          else state.address.permanent.pincode = action.payload.val;
          break;
        case "nominee":
          if (action.payload.subtype === "street")
            state.address.nominee.street = action.payload.val;
          else if (action.payload.subtype === "state")
            state.address.nominee.state = action.payload.val;
          else if (action.payload.subtype === "district")
            state.address.nominee.district = action.payload.val;
          else state.address.nominee.pincode = action.payload.val;
          break;
      }
    },
  },
});

export const { addESICPortal, addESICFamilyDetails, addESICAddress } =
  esicSlice.actions;
export default esicSlice.reducer;

// YTBD
