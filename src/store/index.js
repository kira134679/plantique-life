import guestArticleReducer from '@/slice/article/guestArticleSlice';
import authReducer from '@/slice/authSlice';
import cartReducer from '@/slice/cartSlice';
import loadingReducer from '@/slice/loadingSlice';
import adminProductReducer from '@/slice/product/adminProductSlice';
import adminCouponReducer from '@/slice/coupon/adminCouponSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    adminProduct: adminProductReducer,
    cart: cartReducer,
    guestArticle: guestArticleReducer,
    auth: authReducer,
    adminCoupon: adminCouponReducer,
  },
});

export default store;
