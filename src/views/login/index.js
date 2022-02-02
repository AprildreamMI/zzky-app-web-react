import styles from './index.module.scss'
import IndexHeader from "@/components/indexHeader"

// 接口地址
function Login () {
  console.log(process.env.REACT_APP_API_BASE_URL)
  const baseUrl = process.env.REACT_APP_API_BASE_URL
  return (
    <div className={styles.login}>
      <IndexHeader
        editDisabled
        exitDisabled>
      </IndexHeader>
      <div className={styles.login_main}>
        <div className={styles.form_wrapper}>
          <p className=" tw-font-bold tw-text-[#909399] tw-text-[16px] tw-leading-[30px]">欢迎登录</p>
          <h1 className=" tw-font-bold tw-text-black tw-text-[24px] tw-leading-[60px] tw-mb-[30px]">自主科研项目管理信息系统</h1>

          <div className={styles.auth}>
            <a
              href={`${baseUrl}api/auth/cas`}
              target="_blank"
              className={styles.auth_btn} rel="noreferrer">
              <i className={`${styles.auth_btn_icon} iconfont icon-renzheng`}></i>
              <p className="auth_btn_text">统一身份认证</p>
            </a>
          </div>

          表单
        </div>
      </div>
    </div>
  )
}

export default Login
