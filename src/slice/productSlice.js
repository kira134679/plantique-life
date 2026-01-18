import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../api/productApi';

// async thunks
// 取得全部商品
export const fetchAllProducts = createAsyncThunk('product/fetchAllProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await productApi.getAllProducts();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '取得全部商品失敗');
  }
});

// 取得商品列表（可依頁數、分類篩選）
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ page = 1, category = null } = {}, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts(page, category);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '取得商品列表失敗');
    }
  },
);

// 新增商品
export const createProduct = createAsyncThunk('product/createProduct', async (data, { rejectWithValue }) => {
  try {
    const response = await productApi.createProduct(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || '新增商品失敗');
  }
});

// 更新特定商品資訊
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await productApi.updateProduct(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || '更新商品失敗');
  }
});

// 刪除特定商品
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await productApi.deleteProduct(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || '刪除商品失敗');
  }
});

// slice
const productSlice = createSlice({
  name: 'products',

  initialState: {
    allProducts: [],
    products: [],
    pagination: {},
    isLoading: false,
    error: null,
  },

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  // extraReducers
  // 監聽 thunk，依據 thunk 狀態更新各個 state 的值
  extraReducers: builder => {
    builder
      // 取得全部商品
      .addCase(fetchAllProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload.products;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 取得商品列表
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 新增商品
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 更新特定商品資訊
      .addCase(updateProduct.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 刪除特定商品
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
