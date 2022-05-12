import BaseLayoutContent from "@/components/baseLayout/content"
import { Button, Col, Form, message, Row } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import { Fragment, useEffect, useState } from "react"
import * as apis from '@/api'
import MyUpload from "@/components/upload"

function BaseInfo () {
  const [btnLoading, setBtnLoading] = useState(false)
  // 表单实例
  const [form] = Form.useForm()
  // 信息列表
  const [infoList, setInfoList] = useState([])
  // 获取基本信息
  useEffect(() => {
    apis.getBaseInfo().then(async res => {
      if (res.data.code === 0) {
        const list = res.data.data.list
        const values = {}
        list.forEach(item => {
          const { id, instructions } = item
          values[id] = [{
            ...instructions,
            name: instructions.originName
          }]
        })
        form.setFieldsValue(values)
        // 设置列表
        setInfoList(list)
        // 设置表单
      } else {
        message.error(res.data.message)
      }
    })
  }, [form])

  // 保存
  const onSave = () => {
    form.validateFields().then(res => {

      let values = {}
      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          const file = res[key][0]
          values[key] = file
        }
      }
      setBtnLoading(true)
      apis.editBaseInfo(values).then(res => {
        if (res.data.code === 0) {
          message.success('信息已保存成功 !')
        } else {
          message.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setBtnLoading(false)
      })
    }).catch(error =>{
      console.log(error)
    })
  }
  return (
    <BaseLayoutContent
      headerLabel="信息维护"
      hideFooter={false}>
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
                    message: `请上传${item.title}`
                  }]}>
                  <MyUpload
                    customProps={{
                      maxSize: 10
                    }}
                    uploadProps={{
                      accept: '.doc, .docx',
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
      <Fragment>
        <Button
          loading={btnLoading}
          type="primary"
          onClick={onSave}>
          保存
        </Button>
      </Fragment>
    </BaseLayoutContent>
  )
}

export default BaseInfo