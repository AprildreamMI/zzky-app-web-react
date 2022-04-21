import { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

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
    // children: [
    //   {
    //     path: '/admin',
    //     // element: createElement(lazy(() => import('../components/layout')))
    //   }
    // ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />
  },
]

export default routers
