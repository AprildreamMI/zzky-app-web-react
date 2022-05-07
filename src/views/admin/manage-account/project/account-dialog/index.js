import { Modal } from "antd"
import { USER_ROLE } from "@/configs";
import { useCallback, useEffect, useState } from "react";
import * as apis from '@/api'
import { Form, Input, Select, message } from 'antd'
import { useSelector } from "react-redux";
import { selectDownList } from '@/store/slices/downListSlice'

function AccountDialog ({
  visible,
  id,
  onClose,
  facultyId
}) {
  // 确定按钮loading
  const [btnLoading, setBtnLoading] = useState(false)
  // 院系下拉列表
  const { college: facultyOptions } = useSelector(selectDownList)
  // 表单
  const [form] = Form.useForm()
  // 表单值预填充
  const [userForm, setUserForm] = useState({
    role: USER_ROLE.PROJECT,
    username: '',
    personnelNumber: '',
    collegeId: '',
    mobile: ''
  })
  // 是否在进行编辑
  const isEdit = !!id
  useEffect(() => {
    if (isEdit) {
      apis.getAccountInfo(id).then(res => {
        if (res.data.code === 0) {
          const { username, personnelNumber, collegeId, mobile } = res.data.data
          setUserForm({
            role: userForm.role,
            username,
            personnelNumber,
            collegeId,
            mobile
          })
          console.log('填充')
        } else {
          message.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, [id, isEdit, userForm.role])

  // 取消回调
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
    console.log('创建', values)
    setBtnLoading(true)
    apis.createAccount({
      role: userForm.role,
      ...values,
      account: values.personnelNumber
    }).then(res => {
      if (res.data.code === 0) {
        message.success('添加账号成功！')
        closeDialog()
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setBtnLoading(false)
    })
  }, [userForm.role, closeDialog])
  // 编辑账号
  const editAccount = useCallback((values) => {
    setBtnLoading(true)
    apis.editAccountInfo(id, {
      role: values.role,
      username: values.username,
      collegeId: values.collegeId,
      mobile: values.mobile
    }).then(res => {
      if (res.data.code === 0) {
        message.success('编辑账号成功！')
        closeDialog()
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setBtnLoading(false)
    })
  }, [id, closeDialog])
  return (
    <Modal
      title={ isEdit ? '编辑账号' : '新增账号' }
      visible={visible}
      okText="添加"
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
        }}
        initialValues={userForm}>
        <Form.Item
          label="姓名"
          name="username"
          rules={[{
            required: true,
            message: '请输入姓名',
          }]}>
          <Input />
        </Form.Item>
        {
          isEdit ?
          <p>{userForm.personnelNumber}</p>
          :
          <Form.Item
            label="人事号"
            name="personnelNumber"
            rules={[
              {
                required: true,
                message: '请输入人事号',
              },
              {
                pattern: /^[0-9a-zA-Z]{8}$/,
                message: '请输入正确的人事号',
              },
            ]}>
            <Input maxLength={8} />
          </Form.Item>
        }
        {
          facultyId ?
          <p>{userForm.personnelNumber}</p>
          :
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
        }
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[{
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
          }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountDialog