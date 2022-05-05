import { USER_ROLE } from '@/configs'
import { selectUserRole } from '@/store/slices/mainSlice'
import { createElement, lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// 首页默认路由
function IndexElement () {
  const userRole = useSelector(selectUserRole)
  let toPath = ''
  switch (userRole) {
    case USER_ROLE.ADMIN:
      toPath = '/admin';
      break;
    default:
      toPath = '/login';
  }
  return (
    <Navigate to={toPath} replace={true} />
  )
}

const routers = [
  {
    path: '/login',
    element: createElement(lazy(() => import('../views/login')))
  },
  {
    path: '/',
    element: (() => {
      const token = localStorage.getItem('token')
      if (token) {
        return createElement(lazy(() => import('../components/layout')))
      }
      return <Navigate to="/login" replace={true} />
    })(),
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
              {
                path: 'project',
                element: createElement(lazy(() => import('../views/admin/manage-account/project'))),
              }
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
