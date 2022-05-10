import { Modal } from "antd"
import { USER_ROLE } from "@/configs";
import { useCallback, useState } from "react";
import * as apis from '@/api'
import { Form, Input, Select, message } from 'antd'
import { useSelector } from "react-redux";
import { selectDownList } from '@/store/slices/downListSlice'

function AccountDialog ({
  visible,
  onClose,
  onSuccess,
}) {
  // 确定按钮loading
  const [btnLoading, setBtnLoading] = useState(false)
  // 院系下拉列表
  const { college: facultyOptions } = useSelector(selectDownList)
  // 表单
  const [form] = Form.useForm()

  // 关闭弹窗
  const closeDialog = useCallback(() => {
    form.resetFields()
    onClose()
  }, [form, onClose])
  // 确认回调
  const onOn = () => {
    form.validateFields().then(res => {
      createAccount(res)
    }).catch(error =>{
      console.log(error)
    })
  }
  // 创建账号
  const createAccount = useCallback((values) => {
    console.log('创建', values)
    setBtnLoading(true)
    apis.createAccount({
      role: USER_ROLE.FACULTY,
      ...values
    }).then(res => {
      if (res.data.code === 0) {
        message.success('添加账号成功！')
        closeDialog()
        onSuccess()
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setBtnLoading(false)
    })
  }, [closeDialog, onSuccess])
  return (
    <Modal
      title='新增账号'
      visible={visible}
      okText='添加'
      onOk={onOn}
      onCancel={closeDialog}
      confirmLoading={btnLoading}>
      <Form
        form={form}
        colon={false}
        labelAlign="right"
        labelCol={{
          span: 4,
          offset: 0
        }}>
        <Form.Item
          label="用户名"
          name="account"
          rules={[{
            required: true,
            message: '请输入用户名',
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="所属院系"
          name="collegeId"
          rules={[{
            required: true,
            message: '请选择所属院系',
          }]}>
          <Select placeholder="请选择所属院系">
            {
              facultyOptions.map(item => {
                return (
                  <Select.Option
                    key={item.id}
                    value={item.id}>
                    { item.title }
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountDialog