import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   accountNumber: null,
};
  
const bankSlice = createSlice({
  name: 'bank',
  initialState: initialState,
  reducers: {
    addBank(state, action) {
        state.accountNumber = action.payload;
    },
  }
})

export const {addBank} = bankSlice.actions
export default bankSlice.reducer