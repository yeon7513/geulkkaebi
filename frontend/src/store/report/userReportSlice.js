import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../common/commoms';

const initialState = {
  items: [],
  ...commonState,
};

const userReportSlice = createSlice({
  name: 'userReport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default userReportSlice.reducer;
