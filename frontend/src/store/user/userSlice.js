import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMG_URL } from '../../lib/url';
import { commonState, STATUS } from '../common/commoms';

// const initialState = {
//   userNo: '',
//   id: '',
//   name: '',
//   nickname: '',
//   phone: '',
//   email: '',
//   profileImg: '',
//   grade: 0,
//   score: 0,
//   createdAt: '',
//   modifiedDate: '',
//   reportYn: '',
//   suspendYn: '',
//   adminYn: '',
//   deleteYn: '',
//   ...commonState,
// };

const initialState = {
  list: [],
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
      state.list = action.payload;
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
      state.list = action.payload;
    });
    builder.addCase(loginedData.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 로그인 체크
    builder.addCase(loginCheck.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.list = action.payload;
    });
    builder.addCase(loginCheck.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 로그아웃
    builder.addCase(logout.fulfilled, (state) => {
      state.status = STATUS.SUCCESS;
      state.list = [];
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 정보 수정
    builder.addCase(userInfoUpdate.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.list = action.payload;
    });
    builder.addCase(userInfoUpdate.rejected, (state, action) => {
      state.status = STATUS.FAIL;
      state.error = action.error.message;
    });
    // 회원 탈퇴
    builder.addCase(userDelete.fulfilled, (state) => {
      state.status = STATUS.SUCCESS;
      state.list = [];
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
    const res = await axios.get('/users/list');
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
  async ({ id, pw }) => {
    try {
      const res = await axios.post(
        '/auth/login',
        { id, pw },
        { withCredentials: true }
      );
      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 로그인 상태 체크
export const loginCheck = createAsyncThunk('user/loginCheck', async () => {
  try {
    const res = await axios.get('/auth/check', { withCredentials: true });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// 로그아웃
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await axios.post('/auth/logout');
    sessionStorage.clear();

    return 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// 정보 업데이트
export const userInfoUpdate = createAsyncThunk(
  'user/update',
  async ({ userNo, updateData }) => {
    try {
      const res = await axios.patch(`/users/update/${userNo}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
  async ({ userNo }) => {
    try {
      await axios.delete(`/users/delete/${userNo}`);

      sessionStorage.clear();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export default userSlice.reducer;
