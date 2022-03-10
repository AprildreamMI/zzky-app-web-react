import { Form, Input, Button, Checkbox, message } from 'antd'
import styles from './index.module.scss'
import IndexHeader from "@/components/indexHeader"
import * as apis from '@/api/index'
import { useEffect, useState } from 'react'
import { SHA256 } from 'crypto-js'
import { Base64 } from 'js-base64'

// 接口地址
const baseUrl = process.env.REACT_APP_API_BASE_URL
function Login () {
  // 按钮loading
  const [btnLoading, setBtnLoading] = useState(false)
  // 预填充表单
  const [form, setForm] = useState({})

  // 挂载则读取缓存表单
  useEffect(() => {
    getPw()
  }, [])
  const getPw = () => {
    let account = localStorage.getItem('account')
    let password = localStorage.getItem('password')
    account = account ? Base64.decode(account) : ''
    password = password ? Base64.decode(password) : ''
    setForm({
      account,
      password
    })
  }

  // 表单完成提交
  const onFinish = (values) => {
    loginByPassword(values)
  }
  /**
   * 登录
   *  管理员: wdkfy
      项目负责人: 人事号（8位字母+数字）
      院系审核人、校级审核人：管理员设置的用户名（见tapd文档）
      专家: 手机号（11位数字，判断合不合法）
      除管理员外使用统一默认密码
      管理员密码: admin001
      默认密码: zzky123456:（同时包含数字和字母（字母区分大小写）6-16位）
    */
  const loginByPassword = (values) => {
    const { password, remember } = values
    // 是否记住密码
    if (remember) {
      setPw(values)
    }
    setBtnLoading(true)
    apis.login({
      ...values,
      password: SHA256(password).toString()
    }).then(res => {
      if (res.data.code === 0) {
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        console.log(user)
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
      message.error('请求出错')
    }).finally(() => {
      setBtnLoading(false)
    })
  }
  // 设置密码
  const setPw = ({account, password}) => {
    account = Base64.encode(account)
    password = Base64.encode(password)

    localStorage.setItem('account', account)
    localStorage.setItem('password', password)
  }
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
              <p className="auth_btn_text tw-mb-0">统一身份认证</p>
            </a>
          </div>

          <Form
            size='large'
            name='loginForm'
            initialValues={{
              ...form
            }}
            onFinish={onFinish}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}>
              <Input placeholder='请输入用户名/手机号' />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}>
              <Input type="password" placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Button
                style={{width:'100%'}}
                type="primary"
                loading={btnLoading}
                htmlType="submit">
                立即登录
              </Button>
            </Form.Item>
            <Form.Item
              name="remember"
              initialValue={true}
              valuePropName="checked"
              noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
