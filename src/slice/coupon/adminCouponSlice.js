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
    isLoading: false,
    errors: {
      fetch: null,
      create: null,
      update: null,
      delete: null,
    },
  },

  reducers: {},

  extraReducers: builder => {
    builder

      // fetch
      .addCase(fetchCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload?.coupons || [];
        state.pagination = action.payload?.pagination || {};
      })
      .addCase(fetchCoupons.rejected, state => {
        state.isLoading = false;
      })

      // create
      .addCase(createCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createCoupon.rejected, state => {
        state.isLoading = false;
      })

      // update
      .addCase(updateCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateCoupon.rejected, state => {
        state.isLoading = false;
      })

      // delete
      .addCase(deleteCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteCoupon.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default adminCouponSlice.reducer;
