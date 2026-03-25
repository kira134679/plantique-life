import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminCouponApi } from '../../api';

export const fetchCoupons = createAsyncThunk('coupon/fetchCoupons', async ({ page = 1 } = {}, { rejectWithValue }) => {
  try {
    const res = await adminCouponApi.getCoupons(page);
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createCoupon = createAsyncThunk('coupon/createCoupon', async (data, { rejectWithValue }) => {
  try {
    const res = await adminCouponApi.createCoupon(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const updateCoupon = createAsyncThunk('coupon/updateCoupon', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await adminCouponApi.updateCoupon(id, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteCoupon = createAsyncThunk('coupon/deleteCoupon', async (id, { rejectWithValue }) => {
  try {
    const res = await adminCouponApi.deleteCoupon(id);
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// --- Slice ---
const adminCouponSlice = createSlice({
  name: 'coupon',

  initialState: {
    coupons: [],
    pagination: {},
  },

  reducers: {},

  extraReducers: builder => {
    builder

      // fetch
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload?.coupons || [];
        state.pagination = action.payload?.pagination || {};
      });
  },
});

export default adminCouponSlice.reducer;
