import guestArticleReducer from '@/slice/article/guestArticleSlice';
import loadingReducer from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    guestArticle: guestArticleReducer,
  },
});

export default store;
