import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState } from '../common/commoms';

const initialState = {
  items: [],
  ...commonState,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const fetchAllQuizData = createAsyncThunk(
  'quiz/fetchAll',
  async ({ type }) => {
    try {
      const res = await axios.get('quiz/list', { type });
      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export default quizSlice.reducer;
