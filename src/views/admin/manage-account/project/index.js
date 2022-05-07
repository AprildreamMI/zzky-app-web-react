import BaseLayoutContent from "@/components/baseLayout/content"
import { selectDownList } from "@/store/slices/downListSlice";
import { Form, Input, Select, Button, Table, message } from "antd"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import * as apis from '@/api'
import { USER_ROLE } from "@/configs";
import { downloadFileByA } from "@/utils";
import AccountDialog from './account-dialog/index'

function Project () {
  // 添加及编辑账号dialog
  const [accountDialogVisible, setAccountDialogVisible] = useState(false)
  // 下拉框数据
  const { college: facultyOptions } = useSelector(selectDownList)
  // 条件搜索表单
  const [form] = Form.useForm();
  // 表格loading 加载
  const [loading, setLoading] = useState(false)
  // 表格数据
  const [tableData, setTableData] = useState([{id:1, username: '赵思'}])
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
  // 当前需要编辑用户的id
  const [curUserId, setCurUserId] = useState('')

  // 搜索
  const onSearch = () => {
    const formValues = form.getFieldsValue()
    console.log('搜索')
    setPagination({
      ...pagination,
      pageNum: 1
    })
    setCondition({
      ...condition,
      ...formValues
    })
  }

  // 获取表格数据
  const getTableData = useCallback(() => {
    setLoading(true)
    apis.getAccountList({
      role: USER_ROLE.PROJECT,
      ...condition,
      pageSize: pagination.pageSize,
      pageNum: pagination.pageNum
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
  }, [condition, pagination.pageSize, pagination.pageNum])
  
  // 初始化获取数据
  useEffect(() => {
    getTableData()
  }, [getTableData])

  // 下载导入模板
  const onDownloadTemplate = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL
    downloadFileByA(baseUrl + 'api/v1/static/download/project_account_tpl', '')
  }
  
  return (
    <BaseLayoutContent
      headerLabel="项目负责人">
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
              placeholder="人事号或姓名"
              onSearch={onSearch}>
            </Input.Search>
          </Form.Item>
          <Form.Item
            name="collegeId">
            <Select
              style={{
                width: '120px'
              }}
              placeholder="所属院系"
              allowClear
              onChange={onSearch}>
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
            onClick={() => setAccountDialogVisible(true)}>
            新增
          </Button>
          <Button
            className="tw-mr-[10px]"
            onClick={onDownloadTemplate}>
            下载批量导入模板
          </Button>
          <Button
            className="tw-mr-[10px]">
            批量导入
          </Button>
          <Button>
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
            onChange: page => setPagination({
              ...pagination,
              pageNum: page
            }),
            showTotal: total => `共 ${total} 条`,
            position: ['none', 'bottomCenter']
          }}>
          <Table.Column
            title="姓名"
            dataIndex="username">
          </Table.Column>
          <Table.Column
            title="人事号"
            dataIndex="personnelNumber">
          </Table.Column>
          <Table.Column
            title="所属院系"
            dataIndex="collegeName">
          </Table.Column>
          <Table.Column
            title="手机号"
            dataIndex="mobile">
          </Table.Column>
          <Table.Column
            title="创建时间"
            dataIndex="createdAt">
          </Table.Column>
          <Table.Column
            width="160px"
            title="操作"
            dataIndex="action"
            render={(text, record) => (
              <>
                <Button type="text" danger>禁用</Button>
                <Button type="text" onClick={() => {
                  console.log(record)
                  setCurUserId(record.id)
                  setAccountDialogVisible(true)
                }}>编辑</Button>
              </>
            )}>
          </Table.Column>
        </Table>

        {/* 添加及编辑账号 */}
        <AccountDialog
          visible={accountDialogVisible}
          id={curUserId}
          onClose={() => {
            onSearch()
            setAccountDialogVisible(false)
          }}>
        </AccountDialog>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default Project