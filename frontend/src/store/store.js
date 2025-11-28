import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './board/commentSlice';
import postSlice from './board/postSlice';
import bookSlice from './book/bookSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    postSlice,
    commentSlice,
    bookSlice,
    // quizSlice,
    // userReportSlice,
    // quizErrorSlice,
  },
});
