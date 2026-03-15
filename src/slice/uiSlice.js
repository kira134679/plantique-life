import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeModal: null, // 'login', 'register', null
  },
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload; // 接收字串
    },
    closeModal: state => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
