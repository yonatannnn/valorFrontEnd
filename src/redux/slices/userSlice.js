// redux/slices/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username : '',
    firstName : '',
    lastName : '',
    email : '',
    loggedIn : false,
    profilePicture : '',
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profilePicture = action.payload.profilePicture;
        state.username = action.payload.username;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.profilePicture = '';
      state.loggedIn = false;
    },
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
