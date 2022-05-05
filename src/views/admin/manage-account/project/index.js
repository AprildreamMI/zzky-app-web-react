import BaseLayoutContent from "@/components/baseLayout/content"
import { Form, Input, Select } from "antd"
import { Fragment } from "react"

function Project () {

  const onCollegeIdChange = (value) => {
    console.log('onCollegeIdChange', value)
  }
  const onInputSearch = (value) => {
    console.log('onInputSearch', value)
  }

  return (
    <BaseLayoutContent
      headerLabel="项目负责人">
      <Fragment>
        <Form
          layout="inline">
          <Form.Item
            name="keywords">
            <Input.Search
              style={{
                width: '200px'
              }}
              allowClear
              placeholder="人事号或姓名"
              onSearch={onInputSearch}>
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
              onChange={onCollegeIdChange}>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Fragment>
      <Fragment>
        main
      </Fragment>
    </BaseLayoutContent>
  )
}

export default Project