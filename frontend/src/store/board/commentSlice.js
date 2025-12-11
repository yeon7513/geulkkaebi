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
    addComment: (state, action) => {
      // 중복 안전 장치 추가
      const exists = state.commentList.some(
        (c) => c.cmtNo === action.payload.cmtNo
      );

      if (!exists) {
        state.commentList = [action.payload, ...state.commentList];
      }
    },
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
    // 해당 게시글의 댓글들을 조회
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

    // 댓글 수정
    builder.addCase(updateComment.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      const updateComment = action.payload;
      state.commentList = state.commentList.map((comment) =>
        comment.cmtNo === updateComment.cmtNo ? updateComment : comment
      );

      console.log(updateComment);
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });

    // 댓글 삭제
    builder.addCase(deleteComment.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.commentList = state.commentList.filter(
        (comment) => comment.cmtNo !== action.payload
      );
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
  },
});

// 게시글당 댓글 조회
export const getCommentByPost = createAsyncThunk(
  'comment/getCommentByPost',
  async ({ postNo }) => {
    try {
      const res = await axios.get(`/comments/list/${postNo}`, {
        withCredentials: true,
      });

      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 댓글 수정
export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ cmtNo, updateData }) => {
    try {
      const res = await axios.post(`/comments/update/${cmtNo}`, updateData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (cmtNo) => {
    try {
      const res = await axios.delete(`/comments/delete/${cmtNo}`);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const { addComment, updateCommentLike, clearCommentList } =
  commentSlice.actions;
export default commentSlice.reducer;
