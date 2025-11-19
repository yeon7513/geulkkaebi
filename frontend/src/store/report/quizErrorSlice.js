import { createSlice } from '@reduxjs/toolkit';
import { commonState } from '../common/commoms';

const initialState = {
  items: [],
  ...commonState,
};

const quizErrorSlice = createSlice({
  name: 'quizError',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default quizErrorSlice.reducer;
