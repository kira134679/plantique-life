import loadingReducer from '@/slice/loadingSlice';
import productReducer from '@/slice/product/adminProductSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    product: productReducer,
  },
});

export default store;
