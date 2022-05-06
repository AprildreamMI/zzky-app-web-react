import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';
import downListReducer from './slices/downListSlice';

// 创建store
const store = configureStore({
  reducer: {
    main: mainReducer,
    downList: downListReducer
  }
})

// store
export default store
