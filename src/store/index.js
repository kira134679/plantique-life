import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import guestNewsReducer from '@/slice/news/guestNewsSlice';
import adminProductReducer from '@/slice/product/adminProductSlice';
import guestProductReducer from '@/slice/product/guestProductSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    adminProduct: adminProductReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReducer,
    guestProduct: guestProductReducer,
    guestNews: guestNewsReducer,
  },
});

export default store;
