import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';

// 创建store
const store = configureStore({
  reducer: {
    main: mainReducer
  }
})

// store
export default store
