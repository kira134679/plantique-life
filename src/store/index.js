import loadingReducer from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

export default store;
