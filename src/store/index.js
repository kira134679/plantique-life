import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import guestAuthReducer from '@/slice/guestAuthSlice';
import loadingReducer from '@/slice/loadingSlice';
import guestNewsReducer from '@/slice/news/guestNewsSlice';
import adminProductReducer from '@/slice/product/adminProductSlice';
import guestProductReducer from '@/slice/product/guestProductSlice';
import uiReducer from '@/slice/uiSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    adminProduct: adminProductReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReducer,
    guestAuth: guestAuthReducer,
    guestProduct: guestProductReducer,
    guestNews: guestNewsReducer,
    ui: uiReducer,
  },
});

export default store;
