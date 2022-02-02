import { Navigate } from 'react-router-dom'
import Login from '../views/login'

const routers = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to="/login" replace={true} />
  },
]

export default routers
