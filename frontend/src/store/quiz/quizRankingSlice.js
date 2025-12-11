import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  allRankingList: [],
  wordRankingList: [],
  proverbRankingList: [],
  myRank: null,
  ...commonState,
};

const quizRankingSlice = createSlice({
  name: 'quizRanking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 전체 랭킹 조회
    builder.addCase(fetchAllRankingList.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchAllRankingList.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.allRankingList = action.payload;
    });
    builder.addCase(fetchAllRankingList.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });

    // 카테고리별 랭킹 조회
    builder.addCase(fetchRankingListByType.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchRankingListByType.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      const quizType = action.meta.arg;

      if (quizType === 'word') {
        state.wordRankingList = action.payload;
      } else if (quizType === 'proverb') {
        state.proverbRankingList = action.payload;
      }
    });
    builder.addCase(fetchRankingListByType.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });

    // 회원 순위 조회
    builder.addCase(fetchMyRanking.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchMyRanking.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.myRank = action.payload;
    });
    builder.addCase(fetchMyRanking.rejected, (state, action) => {
      state.status = STATUS.LOADING;
      state.error = action.error.message;
    });
  },
});

// 전체 랭킹 조회
export const fetchAllRankingList = createAsyncThunk(
  'quizRanking/fetchAllRankingList',
  async ({ page, pageSize }) => {
    try {
      const res = await axios.get('/quizRanking/list', {
        params: {
          page,
          pageSize,
        },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 카테고리별 랭킹 조회
export const fetchRankingListByType = createAsyncThunk(
  'quizRanking/fetchRankingListByType',
  async ({ quizType, page, pageSize }) => {
    try {
      const res = await axios.get(`/quizRanking/list/${quizType}`, {
        params: {
          page,
          pageSize,
        },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 회원 순위 조회 -> 없으면 null
export const fetchMyRanking = createAsyncThunk(
  'quizRanking/fetchMyRanking',
  async (quizType) => {
    try {
      const res = await axios.get(`quizRanking/view/${quizType}/myRank`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {}
  }
);

export default quizRankingSlice.reducer;
