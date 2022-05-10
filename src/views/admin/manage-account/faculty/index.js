import BaseLayoutContent from "@/components/baseLayout/content"
import { selectDownList } from "@/store/slices/downListSlice";
import { Form, Input, Select, Button, Table, message, Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Fragment, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import * as apis from '@/api'
import { USER_ROLE } from "@/configs";
import { downloadFileByA } from "@/utils";
import AccountDialog from './account-dialog/index'
import BatchImportBtn from "@/components/batch-import-btn";
import CheckBatchImport from "./check-batch-import";

function Faculty () {
  // 添加及编辑账号dialog
  const [accountDialogVisible, setAccountDialogVisible] = useState(false)
  // 下拉框数据
  const { college: facultyOptions } = useSelector(selectDownList)
  // 条件搜索表单
  const [form] = Form.useForm();
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
  // 条件对象
  const [condition, setCondition] = useState({
    keywords: '',
    collegeId: '',
    departmentId: ''
  })
  // 当前选择的行
  const [selectedRows, setSelectedRows] = useState([])

  // 导入loading
  const [importLoading, setImportLoading] = useState(false)
  // 导入结果的弹窗
  const [importDialogVisible, setImportDialogVisible] = useState(false)
  // 导入的数据
  const [importData, setImportData] = useState([])

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
    apis.getAccountList({
      role: USER_ROLE.FACULTY,
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

  // 下载导入模板
  const onDownloadTemplate = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL
    downloadFileByA(baseUrl + 'api/v1/static/download/college_account_tpl', '')
  }
  // 导入前检查
  const onBatchImport = (sheetData) => {
    setImportLoading(true)
    apis.batchCheckFacultyAccount({
      data: sheetData
    }).then(res => {
      if (res.data.code === 0) {
        setImportData(res.data.data.data)
        setImportDialogVisible(true)
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setImportLoading(false)
    })
  }
  // 启用和禁用
  const onToggleAccount = (id, type) => {
    const messageTxt = {
      enable: '确定要启用此账号？',
      disable: '确定要禁用此账号？'
    }[type]

    const title = {
      enable: '启用账号',
      disable: '禁用账号'
    }[type]

    Modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: messageTxt,
      onOk() {
        return new Promise((resolve, reject) => {
          apis.toggleAccountEnable(id, type).then(res => {
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
  // 初始化密码
  const onResetPassword = () => {
    if (selectedRows.length <= 0) {
      message.warning('先选择需要初始化密码的账号')
      return
    }

    Modal.confirm({
      title: '初始化密码',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认要将密码初始化！',
      onOk() {
        return new Promise((resolve, reject) => {
          apis.resetBatchAccountPassword({
            ids: selectedRows
          }).then(res => {
            if (res.data.code === 0) {
              message.success('操作成功')
            } else {
              message.error(res.data.message)
            }
            resolve()
          }).catch(err => {
            reject()
            console.log(err)
          })
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  
  return (
    <BaseLayoutContent
      headerLabel="院系审核人">
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
              placeholder="用户名"
              onSearch={(value) => onSearch('keywords', value)}>
            </Input.Search>
          </Form.Item>
          <Form.Item
            name="collegeId">
            <Select
              showSearch
              style={{
                width: '120px'
              }}
              placeholder="所属院系"
              allowClear
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => onSearch('collegeId', value)}>
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
        <div>
          <Button
            className="tw-mr-[10px]"
            type="primary"
            onClick={() => {
              setAccountDialogVisible(true)
            }}>
            新增
          </Button>
          <Button
            className="tw-mr-[10px]"
            onClick={onDownloadTemplate}>
            下载批量导入模板
          </Button>
          <BatchImportBtn
            className="tw-mr-[10px]"
            header={['account', 'collegeName']}
            loading={importLoading}
            onImport={onBatchImport}>
          </BatchImportBtn>
          <Button
            onClick={onResetPassword}>
            初始化密码
          </Button>
        </div>
      </Fragment>
      <Fragment>
        <Table
          loading={loading}
          rowSelection={{
            onChange: rowKeys => setSelectedRows(rowKeys)
          }}
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
            title="用户名"
            dataIndex="account">
          </Table.Column>
          <Table.Column
            title="所属院系"
            dataIndex="collegeName">
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
                    danger
                    onClick={() => onToggleAccount(record.id, 'enable')}>
                    启用
                  </Button>
                }
              </>
            )}>
          </Table.Column>
        </Table>

        {/* 添加及编辑账号 */}
        <AccountDialog
          visible={accountDialogVisible}
          onSuccess={() => {
            getTableData(1)
          }}
          onClose={() => {
            setAccountDialogVisible(false)
          }}>
        </AccountDialog>

        {/* 检查导入的数据 确定导入 */}
        <CheckBatchImport
          data={importData}
          visible={importDialogVisible}
          onSuccess={() => {
            getTableData(1)
          }}
          onClose={() => {
            setImportDialogVisible(false)
          }}>
        </CheckBatchImport>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default Faculty