import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  bookList: [],
  total: 0,
  bookItem: null,
  ...commonState,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBookList.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(searchBookList.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      // 전체 데이터 또는 단일 데이터에 따라 분기 처리함.
      if (Array.isArray(action.payload.data)) {
        // 리스트 데이터일 경우
        state.bookList = action.payload.data;
        state.total = action.payload.total;
      } else if (
        action.payload.data &&
        typeof action.payload.data === 'object'
      ) {
        // 상세 데이터일 경우
        state.bookItem = action.payload.data;
      }
    });
    builder.addCase(searchBookList.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
  },
});

export const searchBookList = createAsyncThunk(
  'book/fetchNaverSearchBookList',
  async ({ title, display, isbn }) => {
    try {
      const res = await axios.get(`/naverBook/search`, {
        params: { title, display, isbn },
      });
      const data = res.data.rss.channel.item;
      const total = res.data.rss.channel.total;

      console.log(data);

      return { data, total };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export default bookSlice.reducer;
