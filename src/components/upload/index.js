import { Button, message, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { uploadUrl } from '@/api'

// 上传地址
const action = uploadUrl
const token = localStorage.getItem('token')
// 上传携带凭证
const headers = {
  Authorization: 'Bearer ' + token
}

function MyUpload ({
  children,
  uploadProps, // 传入给上传组件的参数
  customProps // 自定义的参数
}) {
  
  const {
    accept // 支持的上传类型
  } = uploadProps
  const {
    maxSize // 文件最大大小 M
  } = customProps

  // 上传前的回调
  const beforeUpload = (file, fileList) => {
    console.log('上传之前', accept, file.type, file.name)
    // 如果存在类型 并且 文件不在规定类型中的话 则上传失败
    if (accept && (accept.search(file.type) === -1 && accept.replace(/\s+/g, '').split(',').filter(ext => file.name.endsWith(ext)).length <= 0)) {
      message.warning('上传失败，文件格式不正确！')
      return false
    }
    if (file.size / 1024 / 1024 > maxSize) {
      message.warning(`上传失败，文件大于${maxSize}M`)
      return false
    }
  }
  
  return (
    <Upload
      { ...uploadProps }
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers
      beforeUpload={beforeUpload}>
      { children }
    </Upload>
  )
}

export default MyUpload