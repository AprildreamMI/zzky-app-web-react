import { Form, Select } from "antd"
import { useSelector } from "react-redux";
import { selectYearOptions } from "@/store/slices/downListSlice";


function CommonSearch ({ propList = [], onChange }) {
   // 条件搜索表单
   const [form] = Form.useForm();
   // 下拉框数据
  const yearOptions = useSelector(selectYearOptions)
  // 年份下拉选项
  const yearItem = propList.find(item => item.propName === 'year')

  return (
    <Form
      form={form}
      layout="inline">
      {
        yearItem &&
        <Form.Item
          rules={
            yearItem.isRequired ? [{
              required: true,
              message: yearItem.placeholder,
            }] : []
          }
          name="year">
          <Select
            style={{
              width: '150px'
            }}
            placeholder={yearItem.placeholder}
            allowClear
            onChange={(value) => onChange('year', value)}>
            {
              yearOptions.map(item => {
                return (
                  <Select.Option
                    key={item.value}
                    value={item.value}>
                    { item.label }
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
      }
    </Form>
  )
}

export default CommonSearch