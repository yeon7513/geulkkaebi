import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  comment: [],
  ...commonState,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentByPost.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(getCommentByPost.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.comment = action.payload;
    });
    builder.addCase(getCommentByPost.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.comment = [];
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

export default commentSlice.reducer;
