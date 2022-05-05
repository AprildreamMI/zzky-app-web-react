import classnames from 'classnames'
import styles from './index.module.scss'
import logo from '@/assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/slices/mainSlice'

const cbs = classnames.bind(styles)

function LayoutHeader ({ editDisabled, exitDisabled }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const ditPassword = () => {
    console.log('修改密码')
  }
  const logOut = () => {
    navigate('/login')
    localStorage.removeItem('token')
    dispatch(setUserInfo({}))
  }
  return (
    <div className={styles.layout_header}>
      <div className="tw-flex tw-items-center">
        <img className={styles.layout_header_img} src={logo} alt="" />
        <p className={cbs(styles.layout_header_title, 'tw-text-[20px]', 'tw-font-bold')}>自主科研项目管理信息系统</p>
      </div>
      {
        (!editDisabled || !exitDisabled) &&
        <div className="tw-flex tw-items-center">
          {
            !editDisabled && 
            <div className={styles.layout_header_btn} onClick={ditPassword}>
              <i className="iconfont icon-bianji"></i>
              <p className="tw-text-[14px]">修改密码</p>
            </div>
          }
          {
            !exitDisabled &&
            <div className={styles.layout_header_btn} onClick={logOut}>
              <i className="iconfont icon-tuichu"></i>
              <p className="tw-text-[14px]">退出登录</p>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default LayoutHeader