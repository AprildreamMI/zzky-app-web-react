import { USER_ROLE } from "@/configs"
import * as apis from '@/api'
import { message, Modal, Table } from "antd"
import { useMemo, useState } from "react"

function CheckBatchImport ({
  visible,
  onClose,
  onSuccess,
  data
}) {
  // 确定按钮loading
  const [btnLoading, setBtnLoading] = useState(false)

  // 正确的数据
  const correctData = useMemo(() => {
    return data.filter(item => {
      return item.ok === 1
    })
  }, [data])
  // 错误的数据
  const wrongData = useMemo(() => {
    return data.filter(item => {
      return item.ok === 0
    })
  }, [data])

  // 确定导入
  const onOn = () => {
    if (correctData.length <= 0) {
      onClose()
      return
    }

    setBtnLoading(true)
    apis.batchCreateAccount({
      list: correctData.map(item => {
        return {
          role: USER_ROLE.FACULTY,
          account: item.account,
          collegeId: item.collegeId,
        }
      })
    }).then(res => {
      if (res.data.code === 0) {
        message.success('账号导入成功')
        onClose()
        onSuccess()
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setBtnLoading(false)
    })
  }
  
  return (
    <Modal
      title='检查导入'
      visible={visible}
      okText='确认'
      onOk={onOn}
      onCancel={onClose}
      confirmLoading={btnLoading}>
      <p className="tw-text-[14px] tw-leading-[20px] tw-text-textSecondary">
        共导入
        <span className="tw-text-primary">{correctData.length}</span>
        个院系审核人（只会导入能识别的院系审核人）
      </p>
      <Table
        dataSource={[...correctData, ...wrongData]}
        pagination={false}
        rowKey="account"
        rowClassName={(row) => row.ok === 1 ? '' : 'my-table-cell-danger'}>
        <Table.Column
          title="用户名"
          dataIndex="account">
        </Table.Column>
        <Table.Column
          title="所属院系"
          dataIndex="collegeName">
        </Table.Column>
      </Table>
      <p className="tw-text-[14px] tw-leading-[20px] tw-text-textSecondary tw-mt-[10px]">
        导入失败的原因可能是用户名重复或不符合规则，所属院系不存在所致
      </p>
    </Modal>
  )
}

export default CheckBatchImport