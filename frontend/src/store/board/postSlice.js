import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../common/commoms';

const initialState = {
  post: [],
  ...commonState,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default postSlice.reducer;
