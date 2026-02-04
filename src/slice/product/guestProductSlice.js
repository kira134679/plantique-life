import { guestProductApi } from '@/api/services/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getProducts = createAsyncThunk('guestProduct/getProducts', async (params, { rejectWithValue }) => {
  try {
    return await guestProductApi.getProducts(params);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getProductById = createAsyncThunk(
  'guestProduct/getProductById',
  async ({ productId, ...config }, { rejectWithValue }) => {
    try {
      return await guestProductApi.getProductById(productId, config);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const productSlice = createSlice({
  name: 'guestProduct',
  initialState: {
    productList: [],
    currentPage: 0,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      const { products, pagination } = payload;
      const { total_pages, current_page } = pagination;
      state.productList = products;
      state.currentPage = current_page;
      state.totalPages = total_pages;
    });

    builder.addCase(getProducts.rejected, (_, { payload }) => {
      toast.error(payload);
    });
  },
});

export const selectProductList = state => state.guestProduct.productList;
export const selectCurrentPage = state => state.guestProduct.currentPage;
export const selectTotalPage = state => state.guestProduct.totalPages;

export default productSlice.reducer;
