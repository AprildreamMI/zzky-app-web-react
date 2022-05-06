import { createSlice } from '@reduxjs/toolkit';
const userInfoJsonStr = localStorage.getItem('userInfo')

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    // 用户信息
    userInfo: userInfoJsonStr && userInfoJsonStr !== 'undefined' ? JSON.parse(userInfoJsonStr) : {}
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    /**
     * 设置用户信息
     * @param {*} state 
     * @param {*} action 
     */
    setUserInfo: (state, action) => {
      const data = action.payload
      localStorage.setItem('userInfo', JSON.stringify(data))
      state.userInfo = data
    }
  }
})

// action 函数
export const { setUserInfo } = mainSlice.actions
// 获取用户信息
export const selectUserInfo = (state) => {
  return state.main.userInfo
}
// 获取用户当前角色
export const selectUserRole = (state) => {
  return state.main.userInfo.role
}

// 导出reducer
export default mainSlice.reducer;
