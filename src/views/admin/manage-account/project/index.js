import BaseLayoutContent from "@/components/baseLayout/content"
import { selectDownList } from "@/store/slices/downListSlice";
import { Form, Input, Select, Button, Table, message } from "antd"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import * as apis from '@/api'
import { USER_ROLE } from "@/configs";

function Project () {
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
    pageNum: 1
  })
  // 总页数
  const [total, setTotal] = useState(0)
  // 当前选择的行
  const [selectedRows, setSelectedRows] = useState([])

  // 搜索
  // const onSearch = useCallback(() => {
  //   const condition = form.getFieldsValue()
  //   // setPagination({
  //   //   ...pagination,
  //   //   pageNum: 1
  //   // })
  //   console.log('condition', condition)
  //   // 获取数据
  //   // getTableData(setPagination, condition)
  // }, [form])

  const onSearch = () => {
    const condition = form.getFieldsValue()
    setPagination({
      ...pagination,
      pageNum: 1
    })
    // 获取数据
    getTableData(setPagination, condition)
  }

  // 获取表格数据
  const getTableData = useCallback((pagination) => {
    const condition = form.getFieldsValue()

    setLoading(true)
    apis.getAccountList({
      role: USER_ROLE.PROJECT,
      departmentId: '',
      ...condition,
      ...pagination
    }).then(res => {
      if (res.data.code === 0) {
        const { currentPage, list, total } = res.data.data
        setTableData(list)
        setPagination({
          ...pagination,
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
  }, [])
  // const getTableData = (pagination) => {
  //   const condition = form.getFieldsValue()
  //   console.log('form condition', condition)

  //   setLoading(true)
  //   apis.getAccountList({
  //     role: USER_ROLE.PROJECT,
  //     departmentId: '',
  //     ...condition,
  //     ...pagination
  //   }).then(res => {
  //     if (res.data.code === 0) {
  //       const { currentPage, list, total } = res.data.data
  //       setTableData(list)
  //       setPagination({
  //         ...pagination,
  //         pageNum: currentPage,
  //         total: total
  //       })
  //     } else {
  //       message.error(res.data.message)
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   }).finally(() => {
  //     setLoading(false)
  //   })
  // }
  
  // 初始化获取数据
  useEffect(() => {
    getTableData()
  }, [getTableData])
  
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
              placeholder="人事号或姓名">
            </Input.Search>
          </Form.Item>
          <Form.Item
            name="collegeId">
            <Select
              style={{
                width: '120px'
              }}
              placeholder="所属院系"
              allowClear>
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
            type="primary">
            新增
          </Button>
          <Button
            className="tw-mr-[10px]">
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
            total: total,
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
                <Button type="text">编辑</Button>
              </>
            )}>
          </Table.Column>
        </Table>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default Project