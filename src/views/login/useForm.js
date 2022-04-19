import { Base64 } from 'js-base64'

const { useState, useEffect } = require("react")
function useForm () {
  const [form, setForm] = useState({
    account: '',
    password: ''
  })
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

  return form
}

export default useForm