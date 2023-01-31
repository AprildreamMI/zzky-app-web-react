/**
 * 用户角色
 * 0 - 管理员, 1 - 项目负责人, 2 - 院系审核人, 3 - 校级审核人, 4 - 专家
 */
const USER_ROLE = {
  /**
   * 管理员
   */
  ADMIN: 0,
  /**
   * 项目负责人
   */
  PROJECT: 1,
  /**
   * 院系负责人
   */
  FACULTY: 2,
  /**
   * 校级负责人
   */
  UNIVERSITY: 3,
  /**
   * 专家
   */
  EXPERT: 4
}

/**
 * 项目状态
 */
const PROJECT_STATUS = {
  /**
   * 未提交
   */
  NOT_SUBMITTED: 0,
  /**
   * 待院系审核
   */
  PENDING_FACULTY: 1,
  /**
   * 院系退回
   */
  RETURNED_FACULTY: 2,
  /**
   * 待校级审核 / 院系已提交
   */
  PENDING_UNIVERSITY: 3,
  /**
   * 校级退回
   */
  RETURNED_UNIVERSITY: 4,
  /**
   * 已接收
   * 待评审
   */
  ACCEPTED: 5,
  /**
   * 未获批
   */
  NOT_CONFIRMED: 6,
  /**
   * 已获批
   */
  CONFIRMED: 7
}

/**
 * 项目申报审核状态label
 */
const PROJECT_AUDIT_STATUS_OPTIONS = [
  {
    label: '未提交',
    value: PROJECT_STATUS.NOT_SUBMITTED,
    type: 'info'
  },
  {
    label: '待院系审核',
    value: PROJECT_STATUS.PENDING_FACULTY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: PROJECT_STATUS.RETURNED_FACULTY,
    type: 'error'
  },
  {
    label: '待校级审核',
    value: PROJECT_STATUS.PENDING_UNIVERSITY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: PROJECT_STATUS.RETURNED_UNIVERSITY,
    type: 'error'
  },
  {
    label: '已接收',
    value: PROJECT_STATUS.ACCEPTED,
    type: 'success'
  }
]

/**
 * 项目申报项目状态label
 */
const PROJECT_STATUS_OPTIONS = [
  {
    label: '待评审',
    value: PROJECT_STATUS.ACCEPTED,
    type: 'warning'
  },
  {
    label: '未获批',
    value: PROJECT_STATUS.NOT_CONFIRMED,
    type: 'error'
  },
  {
    label: '已获批',
    value: PROJECT_STATUS.CONFIRMED,
    type: 'success'
  }
]

/**
 * 任务书申报状态
 */
const ASSIGNMENT_STATUS = {
  /**
   * 未提交
   */
  NOT_SUBMITTED: 0,
  /**
   * 待院系审核
   */
  PENDING_FACULTY: 1,
  /**
   * 院系退回
   */
  RETURNED_FACULTY: 2,
  /**
   * 院系已提交
   */
  SUBMITTED_FACULTY: 3,
  /**
   * 待校级审核
   */
  PENDING_UNIVERSITY: 4,
  /**
   * 校级退回
   */
  RETURNED_UNIVERSITY: 5,
  /**
   * 已接收
   */
  ACCEPTED: 6
}

/**
 * 任务书申报状态label
 */
const ASSIGNMENT_STATUS_OPTIONS = [
  {
    label: '未提交',
    value: ASSIGNMENT_STATUS.NOT_SUBMITTED,
    type: 'info'
  },
  {
    label: '待院系审核',
    value: ASSIGNMENT_STATUS.PENDING_FACULTY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: ASSIGNMENT_STATUS.RETURNED_FACULTY,
    type: 'error'
  },
  {
    label: '待校级审核',
    value: ASSIGNMENT_STATUS.PENDING_UNIVERSITY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: ASSIGNMENT_STATUS.RETURNED_UNIVERSITY,
    type: 'error'
  },
  {
    label: '已接收',
    value: ASSIGNMENT_STATUS.ACCEPTED,
    type: 'success'
  }
]

/**
 * 进展报告状态
 */
const PROGRESS_STATUS = {
  /**
   * 未提交
   */
  NOT_SUBMITTED: 0,
  /**
    * 待院系审核
    */
  PENDING_FACULTY: 1,
  /**
    * 院系退回
    */
  RETURNED_FACULTY: 2,
  /**
    * 院系已提交
    */
  SUBMITTED_FACULTY: 3,
  /**
    * 待校级审核
    */
  PENDING_UNIVERSITY: 4,
  /**
    * 校级退回
    */
  RETURNED_UNIVERSITY: 5,
  /**
    * 已接收
    */
  ACCEPTED: 6
}

/**
 * 进展报告状态label
 */
const PROGRESS_STATUS_OPTIONS = [
  {
    label: '未提交',
    value: PROGRESS_STATUS.NOT_SUBMITTED,
    type: 'info'
  },
  {
    label: '待院系审核',
    value: PROGRESS_STATUS.PENDING_FACULTY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: PROGRESS_STATUS.RETURNED_FACULTY,
    type: 'error'
  },
  {
    label: '待校级审核',
    value: PROGRESS_STATUS.PENDING_UNIVERSITY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: PROGRESS_STATUS.RETURNED_UNIVERSITY,
    type: 'error'
  },
  {
    label: '已接收',
    value: PROGRESS_STATUS.ACCEPTED,
    type: 'success'
  }
]

/**
 * 结题报告状态
 */
const SUMMARY_STATUS = {
  /**
   * 未提交
   */
  NOT_SUBMITTED: 0,
  /**
    * 待院系审核
    */
  PENDING_FACULTY: 1,
  /**
    * 院系退回
    */
  RETURNED_FACULTY: 2,
  /**
    * 院系已提交
    */
  SUBMITTED_FACULTY: 3,
  /**
    * 待校级审核
    */
  PENDING_UNIVERSITY: 4,
  /**
    * 校级退回
    */
  RETURNED_UNIVERSITY: 5,
  /**
    * 已接收
    */
  ACCEPTED: 6,
  /**
   * 不合格
   */
  BU_HE_GE: 10,
  /**
   * 合格
   */
  HE_GE: 11,
  /**
   * 良好
   */
  LIANG_HAO: 12,
  /**
   * 优秀
   */
  YOU_XIU: 13,
  /**
   * 结题
   */
  JIE_TI: 14,
  /**
   * 延期结题
   */
  YAN_QI_JIE_TI: 15
}

const SUMMARY_AUDIT_STATUS_OPTIONS = [
  {
    label: '未提交',
    value: SUMMARY_STATUS.NOT_SUBMITTED,
    type: 'info'
  },
  {
    label: '待院系审核',
    value: SUMMARY_STATUS.PENDING_FACULTY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: SUMMARY_STATUS.RETURNED_FACULTY,
    type: 'error'
  },
  {
    label: '待校级审核',
    value: SUMMARY_STATUS.PENDING_UNIVERSITY,
    type: 'warning'
  },
  {
    label: '已退回',
    value: SUMMARY_STATUS.RETURNED_UNIVERSITY,
    type: 'error'
  },
  {
    label: '已接收',
    value: SUMMARY_STATUS.ACCEPTED,
    type: 'success'
  }
]

const SUMMARY_STATUS_OPTIONS = [
  {
    label: '待评审',
    value: SUMMARY_STATUS.ACCEPTED,
    type: 'warning'
  },
  {
    label: '不合格',
    value: SUMMARY_STATUS.BU_HE_GE,
    type: ''
  },
  {
    label: '合格',
    value: SUMMARY_STATUS.HE_GE,
    type: ''
  },
  {
    label: '良好',
    value: SUMMARY_STATUS.LIANG_HAO,
    type: ''
  },
  {
    label: '优秀',
    value: SUMMARY_STATUS.YOU_XIU,
    type: ''
  },
  {
    label: '结题',
    value: SUMMARY_STATUS.JIE_TI,
    type: ''
  },
  {
    label: '延期结题',
    value: SUMMARY_STATUS.YAN_QI_JIE_TI,
    type: ''
  }
]

/**
 * 任务的状态
 */
const TASK_STATUS = {
  /**
   * 待评审
   */
  PENDING_REVIEWED: 0,
  /**
   * 已评审
   */
  REVIEWED: 1
}

export {
  USER_ROLE,
  PROJECT_STATUS,
  PROJECT_AUDIT_STATUS_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  ASSIGNMENT_STATUS,
  ASSIGNMENT_STATUS_OPTIONS,
  PROGRESS_STATUS,
  PROGRESS_STATUS_OPTIONS,
  SUMMARY_STATUS,
  SUMMARY_AUDIT_STATUS_OPTIONS,
  SUMMARY_STATUS_OPTIONS,
  TASK_STATUS
}
