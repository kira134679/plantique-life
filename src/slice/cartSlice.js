import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { cartApi, guestCouponApi } from '../api';

// 取得購物車列表
export const fetchCarts = createAsyncThunk('cart/fetchCarts', async (preventGlobalLoading, { rejectWithValue }) => {
  try {
    const response = await cartApi.fetchCarts(preventGlobalLoading);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// 新增產品到購物車
export const addToCarts = createAsyncThunk(
  'cart/addToCarts',
  async ({ data, preventGlobalLoading }, { getState, rejectWithValue }) => {
    try {
      // 新增產品到購物車
      const response = await cartApi.addToCart(data, preventGlobalLoading);

      // 新增產品的 ID
      const productId = data.product_id;
      // 取得目前 cart state 中的 couponCode
      const { carts, couponCode } = getState().cart;
      // 如有 couponCode，且本次新增的是購物車內原本沒有的商品，則需重新套用優惠券
      if (couponCode) {
        const isProductInCart = carts.some(cartItem => cartItem.product?.id === productId);
        if (!isProductInCart) {
          await guestCouponApi.applyCoupon({ code: couponCode }, preventGlobalLoading);
        }
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// 新增產品到購物車並重新取得購物車列表
export const addAndRefetchCarts = createAsyncThunk(
  'cart/addAndRefetchCarts',
  async ({ data, preventGlobalLoading }, { dispatch, rejectWithValue }) => {
    try {
      // 新增產品到購物車
      await dispatch(addToCarts({ data, preventGlobalLoading })).unwrap();

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

      // 如果購物車內沒有商品，則清除優惠券代碼
      const carts = response.data.carts;
      if (carts.length === 0) {
        dispatch(setCouponCode(''));
      }

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

/**
 * Migrates guest cart from localStorage to the backend after login/register.
 * @returns {Promise<number>} Count of items that failed to add to cart
 */
export const migrateGuestCart = createAsyncThunk('cart/migrateGuestCart', async (_, { dispatch, rejectWithValue }) => {
  // 取得 localstorage 購物車資料
  const localCartData = JSON.parse(localStorage.getItem('guestCarts')) || [];
  if (localCartData.length === 0) return 0;

  // 新增多筆產品到購物車
  const results = [];
  for (const product of localCartData) {
    try {
      const response = await dispatch(
        addToCarts({
          data: { product_id: product.id, qty: product.qty },
          preventGlobalLoading: true,
        }),
      ).unwrap();
      results.push({ status: 'fulfilled', value: response });
    } catch (error) {
      results.push({ status: 'rejected', reason: error });
    }
  }
  // 新增產品結果
  const failedItems = results.filter(r => r.status === 'rejected');
  // 移除 localstorage
  localStorage.removeItem('guestCarts');

  // 重新取得購物車資訊
  try {
    await dispatch(fetchCarts(true)).unwrap();
    return failedItems.length;
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
    isMigrating: false,
    loadingItems: {}, // 追蹤每個產品的 loading 狀態，格式：{ cartId: null | 'updating' | 'deleting' }
    pendingBuyNowItem: null, // 未登入時，「立即購買」暫存商品，登入後由 Login/Register 在 migration 前加入 localstorage
    error: null,
  },
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setLocalCarts: (state, action) => {
      state.carts = action.payload;
    },
    addLocalCartItem: (state, action) => {
      const { product, productId, qty } = action.payload;
      const filterCart = state.carts.find(cart => cart.product_id === productId);
      const hasProduct = !!filterCart;
      if (hasProduct) {
        filterCart.qty += qty;
      } else {
        // id 用產品 id 替代
        state.carts.push({ id: productId, product, product_id: productId, qty });
      }
    },
    updateLocalCartItem: (state, action) => {
      const { productId, qty } = action.payload;
      const filterCart = state.carts.find(cart => cart.product_id === productId);
      if (!filterCart) return;
      filterCart.qty = qty;
    },
    deleteLocalCartItem: (state, action) => {
      const { cartItemId } = action.payload;
      state.carts = state.carts.filter(cart => cart.id !== cartItemId);
    },
    setPendingBuyNowItem: (state, action) => {
      state.pendingBuyNowItem = action.payload;
    },
    clearPendingBuyNowItem: state => {
      state.pendingBuyNowItem = null;
    },
    resetCart: state => {
      state.carts = [];
      state.total = 0;
      state.finalTotal = 0;
      state.couponCode = '';
      state.isLoading = false;
      state.isMigrating = false;
      state.loadingItems = {};
      state.pendingBuyNowItem = null;
      state.error = null;
    },
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
      // migrateGuestCart
      .addCase(migrateGuestCart.pending, state => {
        state.isMigrating = true;
      })
      .addCase(migrateGuestCart.fulfilled, state => {
        state.isMigrating = false;
      })
      .addCase(migrateGuestCart.rejected, state => {
        state.isMigrating = false;
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
      .addMatcher(isAnyOf(addToCarts.fulfilled, addAndRefetchCarts.fulfilled), state => {
        if (!state.isMigrating) {
          state.isLoading = false;
        }
      })
      // 全域 loading 開始 (fetchCarts, addToCarts, addAndRefetchCarts, deleteCarts)
      .addMatcher(
        isAnyOf(fetchCarts.pending, addToCarts.pending, addAndRefetchCarts.pending, deleteCarts.pending),
        state => {
          if (!state.isMigrating) {
            state.isLoading = true;
          }
          state.error = null;
        },
      )
      // 全域操作失敗，清除全域 loading 狀態並記錄錯誤
      .addMatcher(
        isAnyOf(fetchCarts.rejected, addToCarts.rejected, addAndRefetchCarts.rejected, deleteCarts.rejected),
        (state, action) => {
          if (!state.isMigrating) {
            state.isLoading = false;
          }
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

export const authAwareInitCarts = preventGlobalLoading => async (dispatch, getState) => {
  const state = getState();
  // 取得登入狀態
  const isAuth = state.guestAuth.isAuth;

  if (isAuth) {
    // 已登入：呼叫後端 API 取得購物車資料
    return await dispatch(fetchCarts(preventGlobalLoading)).unwrap();
  } else {
    // 未登入：從 localStorage 讀取購物車資料
    const localCartData = JSON.parse(localStorage.getItem('guestCarts')) || [];

    // 將讀取到的資料寫入 Redux state
    dispatch(setLocalCarts(localCartData));
  }
};
export const authAwareAddToCart = data => async (dispatch, getState) => {
  // 從 Redux store 中取得整體的 state
  const state = getState();

  // 取得登入狀態
  const isAuth = state.guestAuth.isAuth;

  const { product, qty } = data;
  if (isAuth) {
    // 已登入
    return await dispatch(addAndRefetchCarts({ data: { product_id: product.id, qty } })).unwrap();
  } else {
    // 未登入
    dispatch(addLocalCartItem({ product, productId: product.id, qty }));
  }
};
export const authAwareUpdateCart = data => async (dispatch, getState) => {
  // 從 Redux store 中取得整體的 state
  const state = getState();

  // 取得登入狀態
  const isAuth = state.guestAuth.isAuth;

  const { cartItemId, productId, qty, preventGlobalLoading } = data;
  if (isAuth) {
    // 已登入
    const updateData = { product_id: productId, qty: qty };
    return await dispatch(updateAndRefetchCarts({ id: cartItemId, data: updateData, preventGlobalLoading })).unwrap();
  } else {
    // 未登入
    dispatch(updateLocalCartItem({ productId: productId, qty }));
  }
};
export const authAwareDeleteCart = data => async (dispatch, getState) => {
  // 從 Redux store 中取得整體的 state
  const state = getState();

  // 取得登入狀態
  const isAuth = state.guestAuth.isAuth;

  const { cartItemId, preventGlobalLoading } = data;
  if (isAuth) {
    // 已登入
    return await dispatch(deleteAndRefetchCarts({ id: cartItemId, preventGlobalLoading })).unwrap();
  } else {
    // 未登入
    dispatch(deleteLocalCartItem({ cartItemId }));
  }
};

/**
 * 將暫存的「立即購買」商品加入 local cart（觸發 middleware 同步寫入 localStorage），
 * 確保後續 migrateGuestCart 讀取 localStorage 時能包含該商品。
 */
export const flushPendingBuyNowItem = () => (dispatch, getState) => {
  const { pendingBuyNowItem } = getState().cart;
  if (pendingBuyNowItem) {
    const { product, qty } = pendingBuyNowItem;
    dispatch(addLocalCartItem({ product, productId: product.id, qty }));
    dispatch(clearPendingBuyNowItem());
  }
};

// Export actions
export const {
  setCouponCode,
  setLocalCarts,
  addLocalCartItem,
  updateLocalCartItem,
  deleteLocalCartItem,
  setPendingBuyNowItem,
  clearPendingBuyNowItem,
  resetCart,
} = cartSlice.actions;

// Selectors
export const selectHasItemLoading = state => Object.values(state.cart.loadingItems).some(status => status);

export default cartSlice.reducer;
