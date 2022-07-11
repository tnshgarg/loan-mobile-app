import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   pan: null,
};
  
const panSlice = createSlice({
  name: 'pan',
  initialState: initialState,
  reducers: {
    addPan(state, action) {
        state.pan = action.payload;
    },
  }
})

export const {addPan} = panSlice.actions
export default panSlice.reducer