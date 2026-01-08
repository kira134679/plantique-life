import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../api';

// 取得購物車列表
export const fetchCarts = createAsyncThunk('cart/fetchCarts', async (_, { rejectWithValue }) => {
  try {
    const response = await cartApi.fetchCarts();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '取得購物車失敗');
  }
});
// 新增產品到購物車
export const createCart = createAsyncThunk('cart/createCart', async (data, { rejectWithValue }) => {
  try {
    const response = await cartApi.createCart(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '新增購物車失敗');
  }
});
// 更新購物車產品資訊
export const updateCart = createAsyncThunk('cart/updateCart', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await cartApi.updateCart(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '更新購物車失敗');
  }
});
// 刪除購物車產品
export const deleteCart = createAsyncThunk('cart/deleteCart', async (id, { rejectWithValue }) => {
  try {
    const response = await cartApi.deleteCart(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '刪除購物車產品失敗');
  }
});
// 刪除購物車全部產品
export const deleteCarts = createAsyncThunk('cart/deleteCarts', async (_, { rejectWithValue }) => {
  try {
    const response = await cartApi.deleteCarts();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '刪除購物車全部產品失敗');
  }
});

// slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    total: 0,
    finalTotal: 0,
    isLoading: false,
    error: null,
  },
  // Handle async thunks here
  extraReducers: builder => {
    builder
      // fetchCarts
      .addCase(fetchCarts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carts = action.payload.data.carts || [];
        state.total = action.payload.data.total || 0;
        state.finalTotal = action.payload.data.final_total || 0;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // createCart
      .addCase(createCart.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // updateCart
      .addCase(updateCart.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // deleteCart
      .addCase(deleteCart.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // deleteCarts
      .addCase(deleteCarts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCarts.fulfilled, state => {
        state.isLoading = false;
        state.carts = [];
        state.total = 0;
        state.finalTotal = 0;
      })
      .addCase(deleteCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
