import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    requestCount: 0,
  },
  reducers: {
    showLoading(state) {
      state.requestCount += 1;
    },
    hideLoading(state) {
      if (state.requestCount > 0) {
        state.requestCount -= 1;
      }
    },
    resetLoading: state => {
      state.requestCount = 0;
    },
  },
});

// Selector: 直接在這裡轉換成 boolean 給元件用
// 只要大於 0，就代表還有 API 在跑，回傳 true
export const selectIsLoading = state => state.loading.requestCount > 0;

export const { showLoading, hideLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
