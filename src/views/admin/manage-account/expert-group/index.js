import BaseLayoutContent from "@/components/baseLayout/content"
import { Form, Input, Button, Table, message, Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Fragment, useCallback, useEffect, useState } from "react"
import * as apis from '@/api'
import AccountGroupDialog from './account-group-dialog/index'

function ExpertGroup () {
  // 添加及编辑账号dialog
  const [accountDialogVisible, setAccountDialogVisible] = useState(false)
  // 表格loading 加载
  const [loading, setLoading] = useState(false)
  // 表格数据
  const [tableData, setTableData] = useState([])
  // 表格分页数据
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })

  // 条件搜索表单
  const [form] = Form.useForm();
  // 条件对象
  const [condition, setCondition] = useState({
    keywords: '',
  })

  // 搜索
  const onSearch = (key, value = '') => {
    setPagination({
      ...pagination,
      pageNum: 1
    })
    setCondition({
      ...condition,
      [key]: value
    })
  }

  // 获取表格数据
  const getTableData = useCallback((page) => {
    setLoading(true)
    apis.getExpertGroupList({
      ...condition,
      pageSize: pagination.pageSize,
      pageNum: page
    }).then(res => {
      if (res.data.code === 0) {
        const { currentPage, list, total } = res.data.data
        setTableData(list)
        setPagination({
          pageSize: pagination.pageSize,
          pageNum: currentPage,
          total: total
        })
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [condition, pagination.pageSize])
  
  // 初始化获取数据
  useEffect(() => {
    getTableData(1)
  }, [getTableData])

  // 启用和禁用
  const onToggleAccount = (id, type) => {
    const messageTxt = {
      enable: '确定要启用此专家组？',
      disable: '确定要禁用此专家组？'
    }[type]

    const title = {
      enable: '启用专家组',
      disable: '禁用专家组'
    }[type]

    Modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: messageTxt,
      onOk() {
        return new Promise((resolve, reject) => {
          apis.toggleExpertGroupEnable(id, type).then(res => {
            if (res.data.code === 0) {
              message.success('操作成功')
              getTableData(pagination.pageNum)
            } else {
              message.error(res.data.message)
            }
            resolve()
          }).catch(err => {
            console.log(err)
            reject()
          })
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  
  return (
    <BaseLayoutContent
      headerLabel="专家组">
      <Fragment>
        <Form
          form={form}
          layout="inline">
          <Form.Item
            name="keywords">
            <Input.Search
              style={{
                width: '200px'
              }}
              allowClear
              placeholder="组名"
              onSearch={(value) => onSearch('keywords', value)}>
            </Input.Search>
          </Form.Item>
        </Form>
        <div>
          <Button
            className="tw-mr-[10px]"
            type="primary"
            onClick={() => {
              setAccountDialogVisible(true)
            }}>
            创建组
          </Button>
        </div>
      </Fragment>
      <Fragment>
        <Table
          loading={loading}
          className="tw-mt-[20px]"
          dataSource={tableData}
          rowKey="id"
          pagination={{
            current: pagination.pageNum,
            total: pagination.total,
            showQuickJumper: true,
            onChange: page => {
              setPagination({
                ...pagination,
                pageNum: page
              })
              getTableData(page)
            },
            showTotal: total => `共 ${total} 条`,
            position: ['none', 'bottomCenter']
          }}>
          <Table.Column
            title="组名"
            dataIndex="title">
          </Table.Column>
          <Table.Column
            title="姓名"
            dataIndex="username">
          </Table.Column>
          <Table.Column
            title="成员"
            dataIndex="member"
            render={(text, record) => {
              let result = ''
              record.experts.forEach((item, index) => {
                if (index === 0) {
                  result += item.username
                } else if (index < 3) {
                  result += '，' + item.username
                }
              })
              if (record.experts.length > 3) {
                result += '...'
              }

              return result
            }}>
          </Table.Column>
          <Table.Column
            title="创建时间"
            dataIndex="createdAt">
          </Table.Column>
          <Table.Column
            width="100px"
            title="操作"
            dataIndex="action"
            render={(text, record) => (
              <>
                {
                  record.enable ?
                  <Button
                    type="text"
                    danger
                    onClick={() => onToggleAccount(record.id, 'disable')}>
                    禁用
                  </Button>
                  :
                  <Button
                    type="text"
                    onClick={() => onToggleAccount(record.id, 'enable')}>
                    启用
                  </Button>
                }
              </>
            )}>
          </Table.Column>
        </Table>

        {/* 添加及编辑账号 */}
        <AccountGroupDialog
          visible={accountDialogVisible}
          onSuccess={() => {
            getTableData(1)
          }}
          onClose={() => {
            setAccountDialogVisible(false)
          }}>
        </AccountGroupDialog>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default ExpertGroup