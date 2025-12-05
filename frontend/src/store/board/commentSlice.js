import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  commentList: [],
  ...commonState,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    updateCommentLike: (state, action) => {
      const { cmtNo, liked, countLikes } = action.payload;
      const target = state.commentList.find((c) => c.cmtNo === cmtNo);
      if (target) {
        target.liked = liked;
        target.countLikes = countLikes;
      }
    },
    clearCommentList: (state) => {
      state.commentList = [];
      state.status = STATUS.WAITING;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentByPost.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(getCommentByPost.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.commentList = action.payload;
    });
    builder.addCase(getCommentByPost.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.commentList = [];
      state.error = action.payload;
    });
  },
});

export const getCommentByPost = createAsyncThunk(
  '/comment/getCommentByPost',
  async ({ postNo }) => {
    try {
      const res = await axios.get(`/comments/list/${postNo}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const { updateCommentLike, clearCommentList } = commentSlice.actions;
export default commentSlice.reducer;
