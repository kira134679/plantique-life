import { adminProductApi } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// --- Async Thunks ---
// 取得全部商品
export const fetchAllProducts = createAsyncThunk('product/fetchAllProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await adminProductApi.getAllProducts();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// 取得商品列表（可依頁數、分類篩選）
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ page = 1, category = null } = {}, { rejectWithValue }) => {
    try {
      const response = await adminProductApi.getProducts(page, category);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// 新增商品
export const createProduct = createAsyncThunk('product/createProduct', async (data, { rejectWithValue }) => {
  try {
    const response = await adminProductApi.createProduct(data);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// 更新特定商品資訊
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await adminProductApi.updateProduct(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// 刪除特定商品
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await adminProductApi.deleteProduct(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// --- Slice ---
const productSlice = createSlice({
  name: 'adminProduct',

  initialState: {
    allProducts: [],
    products: [],
    pagination: {},
    isLoading: false,
    errors: {
      fetchAll: null,
      fetch: null,
      create: null,
      update: null,
      delete: null,
    },
  },

  reducers: {},

  // --- Extra Reducers ---
  // 監聽 thunk，依據 thunk 狀態更新各個 state 的值
  extraReducers: builder => {
    builder
      // 取得全部商品
      .addCase(fetchAllProducts.pending, state => {
        state.isLoading = true;
        state.errors.fetchAll = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload.products;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.fetchAll = action.payload;
      })

      // 取得商品列表
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.errors.fetch = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.fetch = action.payload;
      })

      // 新增商品
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
        state.errors.create = null;
      })
      .addCase(createProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.create = action.payload;
      })

      // 更新特定商品資訊
      .addCase(updateProduct.pending, state => {
        state.isLoading = true;
        state.errors.update = null;
      })
      .addCase(updateProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.update = action.payload;
      })

      // 刪除特定商品
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
        state.errors.delete = null;
      })
      .addCase(deleteProduct.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.delete = action.payload;
      });
  },
});

export default productSlice.reducer;
