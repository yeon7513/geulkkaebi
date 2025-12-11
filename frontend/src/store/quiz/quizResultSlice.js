import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  quizResultList: [], // 현재 보여줄 리스트
  totalPages: 1, // 전체 페이지
  currentPage: 1, // 현재 페이지
  filter: 'all', // 'all', 'correct', 'wrong'
  ...commonState,
};

const quizResultSlice = createSlice({
  name: 'quizResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 전체 퀴즈 결과 조회
    builder.addCase(fetchQuizResult.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchQuizResult.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.quizResultList = action.payload.list;
      state.totalPages = action.payload.totalCount;
    });
    builder.addCase(fetchQuizResult.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
  },
});

// 전체 퀴즈 결과 조회 (오답 포함)
export const fetchQuizResult = createAsyncThunk(
  'quizResult/fetchQuizResult',
  async ({ page = 1, filter = 'all' }) => {
    try {
      const res = await axios.get('/quizResult/list', {
        params: { page, filter },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export default quizResultSlice.reducer;
