import{ Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import PageSpin from './components/pageSpin';
import routers from './router/index';
import { setAllDownListAsync, setDownListAsync } from './store/slices/downListSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // 设置特殊下拉列表
    const otherNames = [
      'project_class', // 项目类型
      'college', // 院系
      'department', // 部门
      'project_class', // 学科
    ]
    otherNames.forEach(item => {
      dispatch(setDownListAsync(item))
    })
    // 设置所需要的下拉列表
    const allNames = [
      'sex', // 性别
      'research_place_type', // 研究基地类型
      'technology_activities', // 科技活动类型
      'research_status', // 项目状态
      'degree', // 学位
      'position', // 职称
      'administrative_post', // 行政职务
      'support_object', // 支持对象
      'study_limit', // 研究期限
      'reward_type', // 奖励类别及等级
      'project_source', // 项目来源
      'detail_project_type', // 具体项目类型
      'project_level', // 项目级别
      'patent_type', // 专利类型
      'expert_mark', // 专家鉴定
      'gb_code' // 国民行业代码
    ]
    dispatch(setAllDownListAsync(allNames.join(',')))
  }, [dispatch])
  
  const routersElement = useRoutes(routers)
  return (
    <Suspense fallback={<PageSpin />}>
      { routersElement }
    </Suspense>
  );
}

export default App;
