import { createSlice } from '@reduxjs/toolkit';
import * as apis from '@/api'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { getYearScopeOptions } from '@/utils';
dayjs.extend(duration)

const downListSlice = createSlice({
  name: 'downList',
  initialState: {
    // 项目类型：
    project_class: [],
    // 院系：
    college: [],
    // 部门：
    department: [],
    // 学科
    subject: [],
    // 所有的项目类型
    allDownList: []
  },
  reducers: {
    // 动态设置特殊的下拉列表
    setDownList: (state, action) => {
      const { name, list } = action.payload
      state[name] = list
    },
    // 设置其他的所有下拉列表
    setAllDownList: (state, action) => {
      const allDownList = action.payload
      state.allDownList = allDownList
    }
  }
})

// action 函数
export const { setDownList, setAllDownList } = downListSlice.actions

// 异步设置下拉列表
export const setDownListAsync = (name) => async (dispatch) => {
  let res
  try {
    res = await apis.getDownList(name)
    if (res.data.code === 0) {
      dispatch(setDownList({
        name,
        list: res.data.data.list
      }))
    }
  } catch (error) {
    console.error('获取下拉列表错误', name)
  }
}
// 异步设置所有下拉列表
export const setAllDownListAsync = names => async dispatch => {
  let res
  try {
    res = await apis.getAllDownList({names})
    if (res.data.code === 0) {
      dispatch(setAllDownList(res.data.data))
    }
  } catch (error) {
    console.error('获取所有下拉列表错误', names)
  }
}

// 获取所有的下拉列表
export const selectDownList = (state) => {
  const data = state.downList
  return {
    ...data,
    ...data.allDownList
  }
}

/**
 * 2020年开始，默认往后加3年到2023年，每过一年加一年
 * @returns list
 */
export const selectYearOptions = () => {
  const start = '2020-1-1'
  const years = dayjs.duration(dayjs().diff(dayjs(start))).years()
  const options = getYearScopeOptions(start, 3 + years)
  return options
}


export default downListSlice.reducer