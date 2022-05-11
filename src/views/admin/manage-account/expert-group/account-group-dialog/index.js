import { Modal, Transfer } from "antd"
import { USER_ROLE } from "@/configs";
import { useCallback, useEffect, useState } from "react";
import * as apis from '@/api'
import { Form, Input, message } from 'antd'

function AccountGroupDialog ({
  visible,
  id,
  onClose,
  onSuccess,
}) {
  // 确定按钮loading
  const [btnLoading, setBtnLoading] = useState(false)
  // 表单
  const [form] = Form.useForm()

  // 专家列表
  const [expertList, setExpertList] = useState([])
  // 打开弹窗后获取专家列表
  useEffect(() => {
    if (visible) {
      console.log('打开')
      apis.getAccountDownList({
        roles: USER_ROLE.EXPERT
      }).then(res => {
        if (res.data.code === 0) {
          setExpertList(res.data.data.list)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, [visible])

  // 被移动的专家ids
  const [targetKeys, setTargetKeys] = useState([])

  // 关闭弹窗
  const closeDialog = useCallback(() => {
    setTargetKeys([])
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
  // 创建专家组
  const createAccount = useCallback((values) => {
    setBtnLoading(true)
    apis.createExpertGroup({
      ...values
    }).then(res => {
      if (res.data.code === 0) {
        message.success('创建专家组成功！')
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
      title='创建组'
      visible={visible}
      width={700}
      okText='确认创建'
      onOk={onOn}
      onCancel={closeDialog}
      confirmLoading={btnLoading}>
      <Form
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{
          span: 4,
          offset: 0
        }}>
        <Form.Item
          label="组名"
          name="title"
          rules={[{
            required: true,
            message: '请输入组名',
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="experts"
          rules={[{
            required: true,
            message: '请选择专家',
          }]}>
            <Transfer
              dataSource={expertList}
              titles={['专家', '已选专家']}
              showSearch
              filterOption={(inputValue, option) => option.username.indexOf(inputValue) > -1}
              showSelectAll
              rowKey={record => record.id} 
              listStyle={{
                width: 300,
                height: 300,
              }}
              targetKeys={targetKeys}
              onChange={targetKeys => setTargetKeys(targetKeys)}
              render={item => `${item.username} + ${item.mobile}`}
            />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountGroupDialog