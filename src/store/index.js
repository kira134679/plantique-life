import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import productReducer from '@/slice/product/adminProductSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    product: productReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReducer,
  },
});

export default store;
