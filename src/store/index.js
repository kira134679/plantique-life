import loadingReducer from '@/slice/loadingSlice';
import productReducer from '@/slice/productSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    product: productReducer,
  },
});

export default store;
