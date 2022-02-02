import classnames from 'classnames'
import styles from './index.module.scss'
import logo from '@/assets/images/logo.png'

const cbs = classnames.bind(styles)

function IndexHeader ({ editDisabled, exitDisabled }) {
  const ditPassword = () => {
    console.log('修改密码')
  }
  const logOut = () => {
    console.log('退出')
  }
  return (
    <div className={styles.index_header}>
      <div className="tw-flex tw-items-center">
        <img className={styles.index_header_img} src={logo} alt="" />
        <p className={cbs(styles.index_header_title, 'tw-text-[20px]', 'tw-font-bold')}>自主科研项目管理信息系统</p>
      </div>
      {
        (!editDisabled || !exitDisabled) &&
        <div className="tw-flex tw-items-center">
          {
            !editDisabled && 
            <div className={styles.index_header_btn} onClick={ditPassword}>
              <i className="iconfont icon-bianji"></i>
              <p className="tw-text-[14px]">修改密码</p>
            </div>
          }
          {
            !exitDisabled &&
            <div className={styles.index_header_btn} onClick={logOut}>
              <i className="iconfont icon-tuichu"></i>
              <p className="tw-text-[14px]">退出登录</p>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default IndexHeader