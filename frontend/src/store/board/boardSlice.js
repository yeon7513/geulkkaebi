import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../common/commoms';

const initialState = {
  board: [],
  ...commonState,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default boardSlice.reducer;
