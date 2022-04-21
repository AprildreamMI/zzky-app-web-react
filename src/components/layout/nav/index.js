import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'

const cbs = classNames.bind(styles)

function LayoutNav ({ navs }) {
  const location  = useLocation()
  const isActive = (path) => {
    const pathname = location.pathname
    return pathname.includes(path)
  }
  // 跳转
  const linkTo = (path) => {

  }
  return (
    <div className={styles.layout_nav}>
      <div className={styles.layout_nav_list}>
        {
          navs.map(item => {
            return (
              <div
                key={item.path}
                className={cbs({[styles.active]: isActive(item.path)}, styles.nav_item, 'tw-text-[16px] tw-font-bold')}
                onClick={linkTo}>
                { item.label }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

LayoutNav.propTypes = {
  navs: PropTypes.array
}

export default LayoutNav
