import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

import { guestAuthApi } from '@/api';

function setCookies(accessToken, userId) {
  // json-server-auth 預設到期時間為 1h，扣掉網路緩衝時間，設定 cookie 的到期時間為 55 分鐘
  const cookieOptions = { expires: new Date(Date.now() + 55 * 60 * 1000) };
  Cookie.set('guest_auth_token', accessToken, cookieOptions);
  Cookie.set('guest_user_id', userId, cookieOptions);
}

function removeCookies() {
  Cookie.remove('guest_auth_token');
  Cookie.remove('guest_user_id');
}

export const guestRegister = createAsyncThunk('guestAuth/guestRegister', async (submitData, { rejectWithValue }) => {
  try {
    const result = await guestAuthApi.register(submitData);
    const {
      accessToken,
      user: { id: userId },
    } = result;
    setCookies(accessToken, userId);
    return result.user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const guestLogin = createAsyncThunk('guestAuth/guestLogin', async (submitData, { rejectWithValue }) => {
  try {
    const result = await guestAuthApi.login(submitData);
    const {
      accessToken,
      user: { id: userId },
    } = result;
    setCookies(accessToken, userId);
    return result.user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const guestAuthCheck = createAsyncThunk(
  'guestAuth/guestAuthCheck',
  async ({ preventGlobalLoading = false } = {}, { rejectWithValue }) => {
    const guestAuthToken = Cookie.get('guest_auth_token');
    const guestUserId = Cookie.get('guest_user_id');
    if (!guestUserId || !guestAuthToken) {
      removeCookies();
      return null;
    }

    try {
      return await guestAuthApi.check(guestUserId, preventGlobalLoading);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const guestAuthSlice = createSlice({
  name: 'guestAuth',
  initialState: {
    isAuth: false,
    user: null,
    isAuthChecked: false,
    isManualLogout: false, // 是否手動登出
  },
  reducers: {
    guestLogout: state => {
      state.isAuth = false;
      state.user = null;
      state.isManualLogout = true; // 標記為手動登出
      removeCookies();
    },
    resetManualLogout: state => {
      state.isManualLogout = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(guestAuthCheck.pending, state => {
        state.isAuth = false;
        state.isAuthChecked = false;
      })
      .addCase(guestAuthCheck.fulfilled, (state, action) => {
        state.isAuth = !!action.payload; // null: false，有資料: true
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(guestAuthCheck.rejected, state => {
        state.isAuth = false;
        state.user = null;
        state.isAuthChecked = true;
        removeCookies();
      })
      .addMatcher(isAnyOf(guestRegister.pending, guestLogin.pending), state => {
        state.isAuth = false;
      })
      .addMatcher(isAnyOf(guestRegister.fulfilled, guestLogin.fulfilled), (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(guestRegister.rejected, guestLogin.rejected), state => {
        state.isAuth = false;
        state.user = null;
      });
  },
});

export default guestAuthSlice.reducer;

export const { guestLogout, resetManualLogout } = guestAuthSlice.actions;
