import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    cart: cartReducer,
  },
});

export default store;
