import BaseLayoutContent from "@/components/baseLayout/content"
import { Button, Table, message, Tag } from "antd"

import { Fragment, useCallback, useEffect, useState } from "react"
import * as apis from '@/api'
import { PROJECT_AUDIT_STATUS_OPTIONS, PROJECT_STATUS, PROJECT_STATUS_OPTIONS } from "@/configs";
import CommonSearch from "@/components/common-list/CommonSearch";
import { indexMethod } from "@/utils";

function Project () {
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
    year: '' // 申请年度
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
    apis.getMyApplicationList({
      ...condition,
      pageNum: page,
      pageSize: pagination.pageSize
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

  /**
   * 获取审核状态
   * @param {*} status 
   * @param {*} prop 
   * @returns 
   */
  const getAuditStatus = useCallback((status, prop = 'label') => {
    const item = PROJECT_AUDIT_STATUS_OPTIONS.find(item => item.value === status)
    return item ? item[prop] : ''
  }, [])

  /**
   * 获取项目状态
   * @param {*} status 
   * @param {*} prop 
   * @returns 
   */
  const getProjectStatus = useCallback((status, prop = 'label') => {
    const item = PROJECT_STATUS_OPTIONS.find(item => item.value === status)
    return item ? item[prop] : ''
  }, [])

  /**
   * 是否可以变价
   * @param {*} status 
   * @returns 
   */
  const canEdit = useCallback((status) => {
    return status === PROJECT_STATUS.NOT_SUBMITTED || status === PROJECT_STATUS.RETURNED_FACULTY || status === PROJECT_STATUS.RETURNED_UNIVERSITY
  }, [])
  
  return (
    <BaseLayoutContent
      headerLabel="全部申报">
      <Fragment>
        <CommonSearch
          propList={[
            {
              propName: 'year',
              isRequired: false,
              placeholder: '请选择申请年度'
            }
          ]}
          onChange={onSearch}>
        </CommonSearch>
        <div>
          <Button
            className="tw-mr-[10px]"
            type="primary"
            onClick={() => {

            }}>
            新增
          </Button>
        </div>
      </Fragment>
      <Fragment>
        <Table
          loading={loading}
          className="tw-mt-[20px]"
          dataSource={tableData}
          rowKey="id"
          bordered
          pagination={{
            current: pagination.pageNum,
            total: pagination.total,
            showQuickJumper: true,
            onChange:  page => {
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
            width="70px"
            title="序号"
            dataIndex="index"
            render={(text, record, index) => {
              return indexMethod(index, pagination.pageNum, pagination.pageSize)
            }}>
          </Table.Column>
          <Table.Column
            title="项目名称"
            dataIndex="title">
          </Table.Column>
          <Table.Column
            title="项目类型"
            dataIndex="projectClassName">
          </Table.Column>
          <Table.Column
            title="申请年度"
            dataIndex="year">
          </Table.Column>
          <Table.Column
            title="审核状态"
            dataIndex="status"
            render={(text, record) => (
              <>
                { getAuditStatus(record.status, 'label') && 
                  <Tag
                    color={getAuditStatus(record.status, 'type')}>
                    { getAuditStatus(record.status, 'label') }
                  </Tag>
                }
              </>
            )}>
          </Table.Column>
          <Table.Column
            title="项目状态"
            dataIndex="status"
            render={(text, record) => (
              <>
                {
                  getProjectStatus(record.status, 'label') &&
                  <Tag
                    color={getProjectStatus(record.status, 'type')}>
                    { getProjectStatus(record.status, 'label') }
                  </Tag>
                }
              </>
            )}>
          </Table.Column>
          <Table.Column
            title="创建时间"
            dataIndex="createdAt">
          </Table.Column>
          <Table.Column
            width="60px"
            title="操作"
            dataIndex="action"
            render={(text, record) => (
              <>
                {
                  canEdit(record.status) ?
                  <Button
                    type="link"
                    onClick={() => {

                  }}>编辑</Button>
                  :
                  <Button
                    type="link"
                    onClick={() => {
  
                  }}>查看</Button>
                }
              </>
            )}>
          </Table.Column>
        </Table>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default Project