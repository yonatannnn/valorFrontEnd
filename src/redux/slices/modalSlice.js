import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    mode: 'signin',
  },
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.mode = action.payload || 'signin';
    },
    closeModal: (state) => {
      state.open = false;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'signin' ? 'signup' : 'signin';
    },
  },
});

export const { openModal, closeModal, toggleMode } = modalSlice.actions;
export default modalSlice.reducer;
