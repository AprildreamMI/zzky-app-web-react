import { USER_ROLE } from '@/configs/index'
import { selectUserRole } from '@/store/slices/mainSlice'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import PageSpin from '../pageSpin'
import LayoutHeader from './header'
import styles from './index.module.scss'
import LayoutNav from './nav'

function Layout () {
  const userRole = useSelector(selectUserRole)

  // 是否可以修改密码
  const editDisabled = {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.PROJECT]: true,
    [USER_ROLE.FACULTY]: false,
    [USER_ROLE.UNIVERSITY]: false,
    [USER_ROLE.EXPERT]: false
  }[userRole] && true
  // 当前用户的路由
  const navs = {
    [USER_ROLE.ADMIN]: [
      { label: '项目申报管理', path: '/admin/manage-application' },
      { label: '任务书管理', path: '/admin/manage-assignment' },
      { label: '进展报告管理', path: '/admin/manage-progress' },
      { label: '结题报告管理', path: '/admin/manage-summary' },
      { label: '账号管理', path: '/admin/manage-account' }
    ],
    [USER_ROLE.PROJECT]: [
      { label: '项目申报管理', path: '/project/manage-application' },
      { label: '任务书管理', path: '/project/manage-assignment' },
      { label: '进展报告管理', path: '/project/manage-progress' },
      { label: '结题报告管理', path: '/project/manage-summary' },
      { label: '经费号查询', path: '/project/manage-budget' }

    ],
    [USER_ROLE.FACULTY]: [
      { label: '项目申报管理', path: '/faculty/manage-application' },
      // { label: '账号管理', path: '/faculty/manage-account' }
      { label: '任务书管理', path: '/faculty/manage-assignment' },
      { label: '进展报告管理', path: '/faculty/manage-progress' },
      { label: '结题报告管理', path: '/faculty/manage-summary' },
      { label: '经费号查询', path: '/faculty/manage-budget' }

    ],
    [USER_ROLE.UNIVERSITY]: [
      { label: '项目申报管理', path: '/university/manage-application' },
      { label: '评审任务管理', path: '/university/manage-review-task' },
      { label: '任务书管理', path: '/university/manage-assignment' },
      { label: '进展报告管理', path: '/university/manage-progress' },
      { label: '结题报告管理', path: '/university/manage-summary' },
      { label: '经费号查询', path: '/university/manage-budget' }
    ],
    [USER_ROLE.EXPERT]: [
      { label: '评审任务管理', path: '/expert/manage-review-task' }
    ]
  }[userRole] || []

  return (
    <div className={styles.layout}>
      <LayoutHeader
        editDisabled={editDisabled}
        exitDisabled={false}>
      </LayoutHeader>
      <LayoutNav
        navs={navs}>
      </LayoutNav>
      <div className={styles.layout_body}>
        <Suspense fallback={<PageSpin />}>
          <Outlet></Outlet>
        </Suspense>
      </div>
    </div>
  )
}

export default Layout