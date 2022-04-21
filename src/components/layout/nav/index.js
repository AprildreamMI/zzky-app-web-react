import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const cbs = classNames.bind(styles)

function LayoutNav ({ navs }) {
  const isActive = (path) => {
    console.log(path)
    return false
  }
  // 跳转
  const linkTo = (path) => {
    console.log(path)
  }
  return (
    <div className={styles.layout_nav}>
      <div className={styles.layout_nav_list}>
        {
          navs.map(item => {
            return (
              <div
                key={item.path}
                className={cbs({'active': isActive(item.path)}, styles.nav_item, 'tw-text-[16px] tw-font-bold')}
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
