import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMG_URL } from '../../lib/url';
import { commonState, STATUS } from '../common/commoms';

const initialState = {
  userList: [], // 관리자용 전체 회원 조회
  loginedUser: null, // 현재 로그인한 회원의 정보
  ...commonState,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 모든 회원 조회
    builder.addCase(fetchAllUserData.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchAllUserData.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.userList = action.payload;
    });
    builder.addCase(fetchAllUserData.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 로그인 관리
    builder.addCase(loginedData.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(loginedData.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.loginedUser = action.payload;
    });
    builder.addCase(loginedData.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 로그인 체크
    builder.addCase(loginCheck.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.loginedUser = action.payload;
    });
    builder.addCase(loginCheck.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 로그아웃
    builder.addCase(logout.fulfilled, (state) => {
      state.status = STATUS.SUCCESS;
      state.loginedUser = null;
      state.userList = [];
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 정보 수정
    builder.addCase(userInfoUpdate.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.loginedUser = action.payload;
    });
    builder.addCase(userInfoUpdate.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 회원 탈퇴
    builder.addCase(userDelete.fulfilled, (state) => {
      state.status = STATUS.SUCCESS;
      state.loginedUser = null;
    });
    builder.addCase(userDelete.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
  },
});

// 모든 회원 조회
export const fetchAllUserData = createAsyncThunk('user/fetchAll', async () => {
  try {
    const token = localStorage.getItem('jwtToken');

    const res = await axios.get('/users/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;

    const processData = data.map((user) => ({
      ...user,
      profileImg: user.profileImg ? `${IMG_URL}${user.profileImg}` : null,
    }));

    return processData;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// 로그인
export const loginedData = createAsyncThunk(
  'user/login',
  async ({ userId, userPw }) => {
    try {
      const res = await axios.post('/auth/login', { userId, userPw });
      const { token, user } = res.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem('jwtToken', token);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 로그인 상태 체크
export const loginCheck = createAsyncThunk('user/loginCheck', async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null; // 로그인 안 됨

  try {
    const res = await axios.get('/auth/check', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null; // 토큰 만료 등 처리
  }
});

// 로그아웃
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('jwtToken');

    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// 정보 업데이트
export const userInfoUpdate = createAsyncThunk(
  'user/update',
  async ({ userId, updateData }) => {
    try {
      const token = localStorage.getItem('jwtToken');

      const res = await axios.patch(`/users/update/${userId}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        Authorization: `Bearer ${token}`,
      });

      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 회원 탈퇴
export const userDelete = createAsyncThunk(
  'user/delete',
  async ({ userId }) => {
    try {
      const token = localStorage.getItem('jwtToken');

      await axios.delete(`/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      sessionStorage.clear();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export default userSlice.reducer;
