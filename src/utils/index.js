// import * as apis from '@/apis'
import dayjs from 'dayjs'

/**
 * 传入length 根据字符串生产length 长度的Id
 */
export const getUid = (() => {
  const heyStack = '0123456789abcdefghijklmnopqrstuvwxyz'
  const randomInt = () => Math.floor(Math.random() * Math.floor(heyStack.length))

  const id = (length = 24) => Array.from({ length }, () => heyStack[randomInt()]).join('')
  // 因为选择器除开特殊符号,第一个字符必须是字母
  return id
})()

/**
 * 判断类型
 */
export const isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null)

  // check for null type
  type.null = x => x === null
  // check for undefined type
  type.undefined = x => x === undefined
  // check for nil type. Either null or undefined
  type.nil = x => type.null(x) || type.undefined(x)
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = x => !type.nil(x) && (typeof x === 'string' || x instanceof String)
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = x => !type.nil(x) &&
    (// NaN & Infinity have typeof "number" and this excludes that
      (!isNaN(x) && isFinite(x) &&
      typeof x === 'number'
      ) || x instanceof Number)
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = x => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean)
  // check for array type
  type.array = x => !type.nil(x) && Array.isArray(x)
  // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
  type.object = x => ({}).toString.call(x) === '[object Object]'
  // check for provided type instance
  type.type = (x, X) => !type.nil(x) && x instanceof X
  // check for set type
  type.set = x => type.type(x, Set)
  // check for map type
  type.map = x => type.type(x, Map)
  // check for date type
  type.date = x => type.type(x, Date)

  return type
})()

/**
 * 防抖函数
 * @param {*} func
 * @param {*} ms
 * @returns
 */
export function debounce (func, ms) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, arguments), ms)
  }
}

/**
 * 查找label
 * @param {*} value
 * @param {*} options
 * @param {*} prop
 * @returns
 */
export function findLabel (value, options = [], prop = { label: 'label', value: 'value' }) {
  const item = options.find(item => {
    // 字典里面是其id是数字
    // eslint-disable-next-line
    return item[prop.value] == value
  })

  return item ? item[prop.label] : ''
}

/**
 * 下载文件
 * @param {*} href 文件链接
 * @param {*} fileName 文件名称
 */
export function downloadFileByA (href, fileName = '') {
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  downloadElement.href = href
  downloadElement.target = '_blank'
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
}

/**
 * 返回
 */
export function onBack () {
  // window.history.length > 1 ? router.go(-1) : router.replace('/')
}

/* export const getExportStatus = (taskId, timer, timeoutCb, loadingCb) => {
  let timeout
  timeout = setTimeout(function getStatus () {
    apis.getExportTaskProgress(taskId).then(res => {
      if (res.data.code === 0) {
        const { status, result } = res.data.data

        if (status === 0) {
          timeout = setTimeout(getStatus, timer)
          if (timeoutCb) {
            timeoutCb(timeout)
          }
        } else if (status === 1) {
          if (loadingCb) {
            loadingCb(false)
          }
          if (!result || !result.downloadUrl) {
            Message.error('导出失败')
          } else {
            downloadFileByA(result.downloadUrl, '')
          }
        } else if (status === 2) {
          if (loadingCb) {
            loadingCb(false)
          }
          Message.error(res.data.data.message)
        }
      } else {
        Message.error(res.data.message)
      }
    }).catch(err => {
      if (loadingCb) {
        loadingCb(false)
      }
      console.log(err)
    })
  }, timer)

  if (timeoutCb) {
    timeoutCb(timeout)
  }
} */

export const getYearNow = () => {
  return dayjs().year()
}

export const getNextYear = () => {
  return dayjs().add(1, 'year').year()
}

/**
 * 传入起始年和后几年数量 得到年份列表
 */
export const getYearScopeOptions = (start = '2021-1-1', count = 1) => {
  const startYear = dayjs(start)
  const options = []
  for (let index = 0; index < count + 1; index++) {
    const year = startYear.add(index, 'year').year() + ''
    options.push({
      value: year,
      label: year
    })
  }
  return options
}

/**
 * 序号方法
 * @param {*} index 
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @returns 
 */
export const indexMethod = (index, pageNum, pageSize) => {
  return (pageNum - 1) * pageSize + index + 1
}