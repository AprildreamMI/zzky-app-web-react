import BaseLayoutContent from "@/components/baseLayout/content"
import { Button, Col, Form, message, Row, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { Fragment, useEffect, useState } from "react"
import * as apis from '@/api'
import MyUpload from "@/components/upload"

function BaseInfo () {
  // 表单实例
  const [form] = Form.useForm()
  // 信息列表
  const [infoList, setInfoList] = useState([])
  // 获取基本信息
  useEffect(() => {
    apis.getBaseInfo().then(async res => {
      if (res.data.code === 0) {
        const list = res.data.data.list
        console.log('基本信息', list)
        setInfoList(list)
      } else {
        message.error(res.data.message)
      }
    })
  }, [])
  return (
    <BaseLayoutContent
      headerLabel="信息维护">
      <Fragment></Fragment>
      <Fragment>
        <Row className="tw-leading-[32px] tw-mb-[20px]">
          <Col span={4} className="tw-text-textSecondary">评审须知</Col>
          <Col className="tw-text-textPlaceholder tw-mb-[10px]">文件最大10M，仅支持上传word格式文件，只能上传一个</Col>
        </Row>
        <Form
          form={form}
          colon={false}
          labelAlign="left"
          labelCol={{
            span: 8,
            offset: 0
          }}>
          {
            infoList.map(item => {
              return (
                <Form.Item
                  key={item.id}
                  name={item.id}
                  label={item.title}
                  rules={[{
                    required: true,
                    message: '请输入组名'
                  }]}>
                  <MyUpload
                    customProps={{
                      maxSize: 10
                    }}
                    uploadProps={{
                      accept: '.jpg',
                      maxCount: 1
                    }}>
                    <Button
                      icon={<UploadOutlined />}>
                      上传文件
                    </Button>
                  </MyUpload>
                </Form.Item>
              )
            })
          }
        </Form>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default BaseInfo