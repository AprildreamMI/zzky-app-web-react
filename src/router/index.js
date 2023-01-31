import { USER_ROLE } from '@/configs'
import { selectUserRole } from '@/store/slices/mainSlice'
import { createElement, lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// 首页默认路由
function IndexElement () {
  const userRole = useSelector(selectUserRole)
  console.log('userRole', userRole)
  let toPath = ''
  switch (userRole) {
    case USER_ROLE.ADMIN:
      toPath = '/admin';
      break;
    case USER_ROLE.PROJECT:
      toPath = '/project';
      console.log(toPath)
      break;
    default:
      toPath = '/login';
  }
  return (
    <Navigate to={toPath} replace={true} />
  )
}

// 登录验证
function AuthElement () {
  const token = localStorage.getItem('token')
  const Com = lazy(() => import('../components/layout'))
  console.log('com', Com)
  const LayoutElement = createElement(lazy(() => import('../components/layout')))
  console.log('LayoutElement', LayoutElement)
  const NavigateLogin = <Navigate to="/login" replace={true} />

  return token ? LayoutElement : NavigateLogin
}

const routers = [
  {
    path: '/login',
    element: createElement(lazy(() => import('../views/login')))
  },
  {
    path: '/',
    element: <AuthElement />,
    children: [
      // 默认路由 线索路由不能拥有子路由
      // 所以不能在拥有子路由的路由上通过判断index来决定是否是首页
      {
        index: true,
        element: <IndexElement />
      },
      // 管理员
      {
        path: 'admin',
        element: createElement(lazy(() => import('../views/admin'))),
        children: [
          // 默认跳转账号管理
          {
            index: true,
            element: <Navigate to="/admin/manage-account" replace={true} />
          },
          // 账号管理
          {
            path: 'manage-account',
            element: createElement(lazy(() => import('../views/admin/manage-account'))),
            children: [
              // 默认跳转账号管理
              {
                index: true,
                element: <Navigate to="/admin/manage-account/project" replace={true} />
              },
              // 项目负责人
              {
                path: 'project',
                element: createElement(lazy(() => import('../views/admin/manage-account/project'))),
              },
              // 院系审核人
              {
                path: 'faculty',
                element: createElement(lazy(() => import('../views/admin/manage-account/faculty'))),
              },
              // 校级审核人
              {
                path: 'university',
                element: createElement(lazy(() => import('../views/admin/manage-account/university'))),
              },
              // 专家
              {
                path: 'expert',
                element: createElement(lazy(() => import('../views/admin/manage-account/expert'))),
              },
              // 专家组
              {
                path: 'expert-group',
                element: createElement(lazy(() => import('../views/admin/manage-account/expert-group'))),
              },
              // 基本信息
              {
                path: 'base-info',
                element: createElement(lazy(() => import('../views/admin/manage-account/base-info'))),
              },
            ]
          }
        ]
      },
      // 项目负责人
      {
        path: 'project',
        element: createElement(lazy(() => import('../views/project'))),
        children: [
          // 默认跳转项目申报管理
          {
            index: true,
            element: <Navigate to="/project/manage-application" replace={true} />
          },
          // 项目股那里
          {
            path: 'manage-application',
            element: createElement(lazy(() => import('../views/project/manage-application'))),
            children: [
              // 默认跳转所有申报
              {
                index: true,
                element: <Navigate to="/project/manage-application/all" replace={true} />
              },
              // 所有申报
              {
                path: 'all',
                element: createElement(lazy(() => import('../views/project/manage-application/all'))),
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />
  },
]

export default routers
