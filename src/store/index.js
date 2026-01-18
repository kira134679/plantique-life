import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import guestProductReducer from '@/slice/product/guestProductSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReducer,
    guestProduct: guestProductReducer,
  },
});

export default store;
