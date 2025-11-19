import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../common/commoms';

const initialState = {
  comment: [],
  ...commonState,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default commentSlice.reducer;
