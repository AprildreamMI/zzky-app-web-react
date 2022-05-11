import classNames from 'classnames'
import styles from './index.module.scss'

import Icon1 from '../../assets/images/header-icons/icon1.png'
import Icon2 from '../../assets/images/header-icons/icon2.png'
import Icon3 from '../../assets/images/header-icons/icon3.png'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
const cbs = classNames.bind(styles)
function BaseLayout ({
  hideLeft,
  leftHeaderIcon,
  leftHeaderLabel,
  leftNavList
}) {
  const navigate = useNavigate()

  const location = useLocation()

  // 侧边顶部图标
  const icon = {
    icon1: Icon1,
    icon2: Icon2,
    icon3: Icon3
  }[leftHeaderIcon] || ''

  // 是否激活侧边
  const isActive = (path) => {
    const pathname = location.pathname
    return path === pathname
  }
  // 跳转
  const linkTo = (path) => {
    navigate(path)
  }

  return (
    <div className={styles.base_layout}>
      {
        !hideLeft &&
        <div className={styles.base_layout_left}>
          <div className={styles.base_layout_left_header}>
              <img src={icon} alt="" />
              <p className="tw-text-[20px] tw-font-bold">
                {leftHeaderLabel}
              </p>
          </div>
          <div className={styles.base_layout_left_nav}>
            {
              leftNavList.map(item => {
                return (
                  <div
                    key={item.path}
                    className={cbs({[styles.active]: isActive(item.path)}, styles.nav_item)}
                    onClick={() => linkTo(item.path)}>
                    <p className="tw-font-bold tw-text-[14px]">
                      {item.label}
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      <Outlet></Outlet>
    </div>
  )
}

export default BaseLayout