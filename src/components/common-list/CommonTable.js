import { Button, Table } from "antd" 
 
 function CommonTable ({
  tableData,
  tableLoading,
  onPageNumChange,
  pagination,
  onSelectionChange
 }) {
  return (
    <Table
      loading={tableLoading}
      rowSelection={onSelectionChange ? {
        onChange: onSelectionChange
      } : null}
      className="tw-mt-[20px]"
      dataSource={tableData}
      rowKey="id"
      pagination={{
        current: pagination.pageNum,
        total: pagination.total,
        showQuickJumper: true,
        onChange: onPageNumChange,
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
              // record.enable ?
              // <Button
              //   type="text"
              //   danger
              //   onClick={() => onToggleAccount(record.id, 'disable')}>
              //   禁用
              // </Button>
              // :
              // <Button
              //   type="text"
              //   onClick={() => onToggleAccount(record.id, 'enable')}>
              //   启用
              // </Button>
            }
          </>
        )}>
      </Table.Column>
    </Table>
  )
}

export default CommonTable