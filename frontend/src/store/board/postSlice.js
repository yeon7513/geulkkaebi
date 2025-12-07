import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  postList: [], // 전체 게시글 배열
  popularPosts: [], // 인기글 배열
  postItem: null, // 단일 게시글 조회용
  prevPost: null, // 이전 게시글 조회용
  nextPost: null, // 다음 게시글 조회용
  totalPages: 0,
  totalPosts: 0,
  ...commonState,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 전체 or 카테고리별 조회
    builder.addCase(fetchAllPostData.pending, (state) => {
      state.status = STATUS.LOADING;
      // state.postList = [];
    });
    builder.addCase(fetchAllPostData.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.postList = action.payload.postList;
      state.totalPages = action.payload.totalPages;
      state.totalPosts = action.payload.totalPosts;
    });
    builder.addCase(fetchAllPostData.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.postList = [];
      state.totalPages = 0;
      state.totalPosts = 0;
      state.error = action.error.message;
    });
    // 단일 게시글 조회
    builder.addCase(fetchPostDetail.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.postItem = action.payload.postItem;
      state.prevPost = action.payload.prevPost;
      state.nextPost = action.payload.nextPost;
    });
    builder.addCase(fetchPostDetail.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.payload;
    });
    // 인기글 불러오기
    builder.addCase(fetchPopularPosts.pending, (state) => {
      state.status = STATUS.LOADING;
      // 기존 페이지 이동 후에 다시 이동하면 남아있는 현상 발견.
      // 그래서 리덕스에서도 초기화 하는 코드 추가
      state.popularPosts = [];
      state.totalPages = 0;
      state.totalPosts = 0;
    });
    builder.addCase(fetchPopularPosts.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.popularPosts = action.payload;
    });
    builder.addCase(fetchPopularPosts.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.popularPosts = [];
      state.totalPages = 0;
      state.totalPosts = 0;
      state.error = action.error.message;
    });
    // 조회수 증가
    builder.addCase(incrementHitcount.fulfilled, (state, action) => {
      const postNo = action.payload;
      // post 배열에서 해당 글 찾아 hitcount 증가
      const target = state.postList.find((p) => p.postNo === Number(postNo));
      if (target) {
        target.hitcount += 1;
      }
    });
  },
});

// 카테고리별 모든 게시글 조회
export const fetchAllPostData = createAsyncThunk(
  'post/fetchAll',
  async ({ boardType, page, size }) => {
    try {
      const res = await axios.get('/posts/list', {
        params: {
          boardType,
          page,
          size,
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

// 단일 게시글 조회
export const fetchPostDetail = createAsyncThunk(
  'post/fetchPostDetail',
  async ({ postNo, boardType }) => {
    try {
      const res = await axios.get(`/posts/list/${postNo}`, {
        params: {
          boardType,
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
