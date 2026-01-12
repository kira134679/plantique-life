import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReuducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReuducer,
  },
});

export default store;
