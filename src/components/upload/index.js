import { message, Upload } from "antd"
import { uploadUrl } from '@/api'
import { downloadFileByA } from "@/utils"

// 上传地址
// const action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76' || uploadUrl
const action = uploadUrl
const token = localStorage.getItem('token')
// 上传携带凭证
const headers = {
  Authorization: 'Bearer ' + token
}

function MyUpload ({
  value,
  onChange,
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

  /**
   * + 错误情况下只会触发一次
   *    + status "error"
   * + 正常情况下会触发三次
   *    + status 由 "uploading"、"uploading" -> "done" (此时才会存在response)
   * + error情况下 也会先触发'uploading' -> 'error'
   * @param {*} param0 
   */
  const triggerChange = ({file, fileList, event}) => {
    console.log('triggerChange', file, fileList, event)

    const { status, uid, response } = file
    const newFileList = [...fileList]
    // 当前文件在文件列表中的位置
    const fileIndex = newFileList.findIndex(item => item.uid === uid)
    // 上传完成
    if (status === 'done') {
      if (response) {
        // code 为0 上传成功
        if (response.code === 0) {
          newFileList.splice(fileIndex, 1, {
            uid: file.uid,
            name: file.name,
            status: file.status,
            ...response.data
          })
        // code 不等于0上传失败 不加入列表中
        } else {
          newFileList.splice(fileIndex, 1)
        }
      }
    // 错误情况不让其加入列表中
    } else if (status === 'error') {
      message.error('文件上传出错')
      newFileList.splice(fileIndex, 1)
    }
    console.log('newFileList', newFileList)
    // 设置文件列表
    onChange(newFileList)
  }

  // 上传前的回调
  const beforeUpload = (file, fileList) => {
    // 如果存在类型 并且 文件不在规定类型中的话 则上传失败
    if (accept && (accept.search(file.type) === -1 && accept.replace(/\s+/g, '').split(',').filter(ext => file.name.endsWith(ext)).length <= 0)) {
      message.warning('上传失败，文件格式不正确！')
      return Upload.LIST_IGNORE
    }
    if (file.size / 1024 / 1024 > maxSize) {
      message.warning(`上传失败，文件大于${maxSize}M`)
      return Upload.LIST_IGNORE
    }
  }

  // 下载
  const onPreview = (file) => {
    const { downloadUrl, originName } = file
    if (downloadUrl && originName) {
      downloadFileByA(downloadUrl, originName)
    }
  }
  
  return (
    <Upload
      { ...uploadProps }
      fileList={value}
      action={action}
      headers={headers}
      onChange={triggerChange}
      onPreview={onPreview}
      beforeUpload={beforeUpload}>
      { children }
    </Upload>
  )
}

export default MyUpload