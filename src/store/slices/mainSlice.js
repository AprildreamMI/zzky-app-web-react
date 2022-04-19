import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    userInfo: {}
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    /**
     * 设置用户信息
     * @param {*} state 
     * @param {*} action 
     */
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  }
})

// action 函数
export const { setUserInfo } = mainSlice.actions
// 获取用户信息
export const userInfo = (state) => {
  return state.main.userInfo
}

// 导出reducer
export default mainSlice.reducer;
