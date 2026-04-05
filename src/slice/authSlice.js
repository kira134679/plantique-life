import { authApi } from '@/api';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async (submitData, { rejectWithValue }) => {
  try {
    return await authApi.login(submitData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    return await authApi.check();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await authApi.logout();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    authChecked: false,
    isLoggingOut: false,
  },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    },
    setAuthChecked(state, { payload }) {
      state.authChecked = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.pending, state => {
      state.isLoggingOut = true;
    });

    builder.addCase(logout.fulfilled, state => {
      state.isAuth = false;
      state.authChecked = true;
      state.isLoggingOut = false;
    });

    builder.addCase(logout.rejected, state => {
      state.isLoggingOut = false;
    });

    builder.addMatcher(isAnyOf(login.fulfilled, checkAuth.fulfilled), (state, { payload }) => {
      state.isAuth = !!payload?.success;
      state.authChecked = true;
    });

    builder.addMatcher(isAnyOf(login.rejected, checkAuth.rejected), state => {
      state.isAuth = false;
      state.authChecked = true;
    });
  },
});

export default authSlice.reducer;
export const { setIsAuth, setAuthChecked } = authSlice.actions;
