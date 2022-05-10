import { Modal } from "antd"
import { USER_ROLE } from "@/configs";
import { useCallback, useState, useEffect } from "react";
import * as apis from '@/api'
import { Form, Input, message } from 'antd'

function AccountDialog ({
  visible,
  id,
  onClose,
  onSuccess,
}) {
  // 确定按钮loading
  const [btnLoading, setBtnLoading] = useState(false)
  // 表单
  const [form] = Form.useForm()
  // 表单值预填充
  const [userForm, setUserForm] = useState({
    username: '',
    mobile: ''
  })

  // 是否在进行编辑
  const isEdit = !!id
  useEffect(() => {
    if (isEdit) {
      apis.getAccountInfo(id).then(res => {
        if (res.data.code === 0) {
          const { username, mobile } = res.data.data
          form.setFieldsValue({
            username,
            mobile
          })
          setUserForm({
            username,
            mobile
          })
        } else {
          message.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, [id, isEdit, form])

  // 关闭弹窗
  const closeDialog = useCallback(() => {
    form.resetFields()
    onClose()
  }, [form, onClose])
  // 确认回调
  const onOn = () => {
    form.validateFields().then(res => {
      if (isEdit) {
        editAccount(res)
      } else {
        createAccount(res)
      }
    }).catch(error =>{
      console.log(error)
    })
  }
  // 创建账号
  const createAccount = useCallback((values) => {
    setBtnLoading(true)
    apis.createAccount({
      role: USER_ROLE.EXPERT,
      ...values,
      account: values.mobile
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
  // 编辑账号
  const editAccount = useCallback((values) => {
    setBtnLoading(true)
    apis.editAccountInfo(id, {
      role: USER_ROLE.EXPERT,
      username: values.username
    }).then(res => {
      if (res.data.code === 0) {
        message.success('编辑账号成功！')
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
  }, [id, closeDialog, onSuccess])
  return (
    <Modal
      title={ isEdit ? '编辑账号' : '新增账号' }
      visible={visible}
      okText={isEdit ? '保存' : '添加'}
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
          label="姓名"
          name="username"
          rules={[{
            required: true,
            message: '请输入姓名',
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            {
              required: true,
              message: '请输入人事号',
            },{
              pattern: /^1\d{10}$/,
              message: '请输入正确的手机号',
            }
          ]}>
          {
            isEdit ?
            <p>{userForm.mobile}</p>
            :
            <Input maxLength={11} />
          }
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountDialog