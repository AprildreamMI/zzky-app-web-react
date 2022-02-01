import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slices/mainSlice';

// 创建store
const store = configureStore({
  reducer: {
    mainSlice: mainSlice
  }
})

// store
export default store
