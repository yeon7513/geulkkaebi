import { configureStore } from '@reduxjs/toolkit';
import postSlice from './board/postSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    // quizSlice,
    postSlice,
    // commentSlice,
    // userReportSlice,
    // quizErrorSlice,
  },
});
