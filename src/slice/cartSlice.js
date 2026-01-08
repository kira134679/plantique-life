import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { cartApi, couponApi } from '../api';

// 取得購物車列表
export const fetchCarts = createAsyncThunk('cart/fetchCarts', async (preventGlobalLoading, { rejectWithValue }) => {
  try {
    const response = await cartApi.fetchCarts(preventGlobalLoading);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// 新增產品到購物車並重新取得購物車列表
export const createAndRefetchCarts = createAsyncThunk(
  'cart/createAndRefetchCarts',
  async ({ data, preventGlobalLoading }, { dispatch, getState, rejectWithValue }) => {
    try {
      // 新增產品到購物車
      await cartApi.createCart(data, preventGlobalLoading);

      // 新增產品的 ID
      const productId = data.product_id;
      // 取得目前 cart state 中的 couponCode
      const { carts, couponCode } = getState().cart;
      // 如有 couponCode，且本次新增的是購物車內原本沒有的商品，則需重新套用優惠券
      if (couponCode) {
        const isProductInCart = carts.some(cartItem => cartItem.product?.id === productId);
        if (!isProductInCart) {
          await couponApi.createCoupon({ code: couponCode }, preventGlobalLoading);
        }
      }

      // 重新取得購物車資料
      const response = await dispatch(fetchCarts(preventGlobalLoading)).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// 更新購物車產品資訊並重新取得購物車列表
export const updateAndRefetchCarts = createAsyncThunk(
  'cart/updateAndRefetchCarts',
  async ({ id, data, preventGlobalLoading }, { dispatch, rejectWithValue }) => {
    try {
      // 先更新指定品項
      await cartApi.updateCart(id, data, preventGlobalLoading);
      // 再重新取得購物車資料
      const response = await dispatch(fetchCarts(preventGlobalLoading)).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// 刪除購物車產品並重新取得購物車列表
export const deleteAndRefetchCarts = createAsyncThunk(
  'cart/deleteAndRefetchCarts',
  async ({ id, preventGlobalLoading }, { dispatch, rejectWithValue }) => {
    try {
      // 先刪除指定品項
      await cartApi.deleteCart(id, preventGlobalLoading);
      // 再重新取得購物車資料
      const response = await dispatch(fetchCarts(preventGlobalLoading)).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// 刪除購物車全部產品
export const deleteCarts = createAsyncThunk('cart/deleteCarts', async (preventGlobalLoading, { rejectWithValue }) => {
  try {
    const response = await cartApi.deleteCarts(preventGlobalLoading);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    total: 0,
    finalTotal: 0,
    couponCode: '',
    isLoading: false, // 這是「整台購物車」的讀取狀態
    loadingItems: {}, // 追蹤每個產品的 loading 狀態，格式：{ cartId: null | 'updating' | 'deleting' }
    error: null,
  },
  // Handle async thunks here
  extraReducers: builder => {
    builder
      // fetchCarts
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        state.carts = data.carts || [];
        state.total = data.total || 0;
        state.finalTotal = data.final_total || 0;
        // 取得購物車中的優惠券代碼
        // 注意：API 回傳時，coupon 會存在每個 cart item 中，但所有 item 的 coupon 是相同的
        if (data.carts && data.carts.length > 0) {
          const hasCoupon = data.carts.some(cartItem => cartItem.coupon);
          if (hasCoupon) {
            state.couponCode = data.carts[0].coupon.code; // 取第一筆的 coupon code 即可
          } else {
            state.couponCode = '';
          }
        }
      })
      // createAndRefetchCarts
      .addCase(createAndRefetchCarts.fulfilled, state => {
        state.isLoading = false;
      })
      // updateAndRefetchCarts
      .addCase(updateAndRefetchCarts.pending, (state, action) => {
        const cartId = action.meta.arg.id;
        state.loadingItems[cartId] = 'updating';
        state.error = null;
      })
      // deleteAndRefetchCarts
      .addCase(deleteAndRefetchCarts.pending, (state, action) => {
        const cartId = action.meta.arg.id;
        state.loadingItems[cartId] = 'deleting';
        state.error = null;
      })
      // deleteCarts
      .addCase(deleteCarts.fulfilled, state => {
        state.isLoading = false;
        state.carts = [];
        state.total = 0;
        state.finalTotal = 0;
        state.couponCode = '';
        state.loadingItems = {};
      })
      // 全域 loading 開始 (fetchCarts, createAndRefetchCarts, deleteCarts)
      .addMatcher(isAnyOf(fetchCarts.pending, createAndRefetchCarts.pending, deleteCarts.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      // 全域操作失敗，清除全域 loading 狀態並記錄錯誤
      .addMatcher(
        isAnyOf(fetchCarts.rejected, createAndRefetchCarts.rejected, deleteCarts.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      // 單項操作完成，清除該項目的 loading 狀態
      .addMatcher(isAnyOf(updateAndRefetchCarts.fulfilled, deleteAndRefetchCarts.fulfilled), (state, action) => {
        const cartId = action.meta.arg.id;
        state.loadingItems[cartId] = null;
      })
      // 單項操作失敗，清除該項目的 loading 狀態並記錄錯誤
      .addMatcher(isAnyOf(updateAndRefetchCarts.rejected, deleteAndRefetchCarts.rejected), (state, action) => {
        const cartId = action.meta.arg.id;
        state.loadingItems[cartId] = null;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectHasItemLoading = state => Object.values(state.cart.loadingItems).some(status => status);

export default cartSlice.reducer;
