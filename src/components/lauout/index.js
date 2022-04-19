import LayoutHeader from './header'
import styles from './index.module.scss'

function Layout () {
  return (
    <div className={styles.layout}>
      <LayoutHeader
        editDisabled={false}
        exitDisabled={false}>
      </LayoutHeader>
      
    </div>
  )
}

export default Layout