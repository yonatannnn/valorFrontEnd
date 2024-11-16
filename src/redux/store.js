import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: persistedUserReducer, 
  },
});

export const persistor = persistStore(store);

export default store;
