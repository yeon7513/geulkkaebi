import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  quizCategory: [],
  wordList: [],
  proverbList: [],
  ...commonState,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // 초기화
    clearQuizList: (state) => {
      state.wordList = [];
      state.proverbList = [];
      state.status = STATUS.WAITING;
    },
  },
  extraReducers: (builder) => {
    // 퀴즈 카테고리 조회
    builder.addCase(fetchQuizCategory.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchQuizCategory.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.quizCategory = action.payload;
    });
    builder.addCase(fetchQuizCategory.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 카테고리별 전체 퀴즈 리스트 조회
    builder.addCase(fetchAllQuizDataByType.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchAllQuizDataByType.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      const quizType = action.meta.arg;

      if (quizType === 'word') {
        state.wordList = action.payload;
      } else if (quizType === 'proverb') {
        state.proverbList = action.payload;
      }
    });
    builder.addCase(fetchAllQuizDataByType.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
  },
});

// 퀴즈 카테고리 조회 (관리자용)
// 지금은 당장 쓰지 않을듯함.
export const fetchQuizCategory = createAsyncThunk(
  'quiz/fetchQuizCategory',
  async () => {
    try {
      const res = await axios.get('/quiz/list', { withCredentials: true });
      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 카테고리별 퀴즈 조회
export const fetchAllQuizDataByType = createAsyncThunk(
  'quiz/fetchAllQuizDataByType',
  async (quizType) => {
    try {
      const res = await axios.get(`/quiz/list/${quizType}`, {
        withCredentials: true,
      });
      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const { clearQuizList } = quizSlice.actions;
export default quizSlice.reducer;
