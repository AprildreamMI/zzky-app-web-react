import { Button } from "antd"
import { useRef } from "react"
import * as XLSX from 'xlsx'

function BatchImportBtn ({
  className,
  header = [],
  btnText = '批量导入',
  loading,
  onImport
}) {
  const inputRef = useRef(null)

  // 按钮触发
  const onBatchImport = () => {
    inputRef.current.value = ''
    inputRef.current.click()
  }
  const onFileChange = async (event) => {
    console.log('onFileChange', event)
    const file = event.target.files[0]
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      header: header,
      defval: '',
      range: 1
    })
    // 触发导入
    onImport(sheetData)
  }
  return (
    <Button
      className={className}
      type="primary"
      loading={loading}
      onClick={onBatchImport}>
      { btnText }
      <input
        ref={inputRef}
        type="file"
        accept=".xls, .xlsx"
        style={{
          display: 'none'
        }}
        onChange={(event) => onFileChange(event)} />
    </Button>
  )
}

export default BatchImportBtn