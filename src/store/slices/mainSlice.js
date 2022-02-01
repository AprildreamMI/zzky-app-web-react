import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState: {
    count: 0
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // 增加
    increment: (state) => {
      state.count += 1
    },
    // 减少
    decrement: (state) => {
      state.count -= 1
    },
    // 赋值
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

// action 函数
export const { increment, decrement, incrementByAmount } = mainSlice.actions
// 获取count
export const selectCount = (state) => {
  return state.mainSlice.count
}

// 导出reducer
export default mainSlice.reducer;
