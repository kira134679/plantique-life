import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '../api';

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await authApi.check();
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    authChecked: false,
  },
  reducers: {
    setIsAuth(state, actions) {
      state.isAuth = actions.payload;
    },
    setAuthChecked(state, actions) {
      state.authChecked = actions.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkAuth.pending, state => {
      state.authChecked = false;
    });

    builder.addMatcher(isAnyOf(checkAuth.fulfilled, checkAuth.rejected), (state, actions) => {
      state.isAuth = !!actions.payload?.success;
      state.authChecked = true;
    });
  },
});

export default authSlice.reducer;
export const { setIsAuth, setAuthChecked } = authSlice.actions;
