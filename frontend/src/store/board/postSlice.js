import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  post: [],
  totalPages: 0,
  totalPosts: 0,
  ...commonState,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 전체 or 카테고리별 or 아이디별 or 신고된 글 조회
    builder.addCase(fetchAllPostData.pending, (state) => {
      state.status = STATUS.LOADING;
      state.post = [];
    });
    builder.addCase(fetchAllPostData.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.post = action.payload.posts;
      state.totalPages = action.payload.totalPages;
      state.totalPosts = action.payload.totalPosts;
    });
    builder.addCase(fetchAllPostData.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.post = [];
      state.totalPages = 0;
      state.totalPosts = 0;
      state.error = action.error.message;
    });
    // 인기글 불러오기
    builder.addCase(fetchPopularPosts.pending, (state) => {
      state.status = STATUS.LOADING;
      // 기존 페이지 이동 후에 다시 이동하면 남아있는 현상 발견.
      // 그래서 리덕스에서도 초기화 하는 코드 추가
      state.post = [];
      state.totalPages = 0;
      state.totalPosts = 0;
    });
    builder.addCase(fetchPopularPosts.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.post = action.payload;
    });
    builder.addCase(fetchPopularPosts.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.post = [];
      state.totalPages = 0;
      state.totalPosts = 0;
      state.error = action.error.message;
    });
    // 조회수 증가
    builder.addCase(incrementHitcount.fulfilled, (state, action) => {
      const postNo = action.payload;
      // post 배열에서 해당 글 찾아 hitcount 증가
      const target = state.post.find((p) => p.postNo === Number(postNo));
      if (target) {
        target.hitcount += 1;
      }
    });
  },
});

// 카테고리별 모든 게시글 조회
export const fetchAllPostData = createAsyncThunk(
  'post/fetchAll',
  async ({ boardType, postNo, writer, isReport, page }) => {
    try {
      const res = await axios.get('/posts/list', {
        params: {
          postno: postNo,
          boardType,
          writer,
          isReport,
          page,
          size: 10,
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

// 오늘의 인기글 불러오기
export const fetchPopularPosts = createAsyncThunk(
  'post/popularPosts',
  async () => {
    try {
      const res = await axios.get(`/posts/popular`, { withCredentials: true });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 조회수 증가
export const incrementHitcount = createAsyncThunk(
  'post/incrementHitcount',
  async (postNo, { rejectWithValue }) => {
    try {
      await axios.post(`/posts/view/${postNo}`);

      return postNo;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.response?.data || error.message);
    }
  }
);

export default postSlice.reducer;
