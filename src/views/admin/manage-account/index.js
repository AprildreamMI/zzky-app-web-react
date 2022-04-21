import BaseLayout from "@/components/baseLayout"

function Account () {
  const navList = [
    { label: '项目负责人', path: '/admin/manage-account/project' },
    { label: '院系审核人', path: '/admin/manage-account/faculty' },
    { label: '校级审核人', path: '/admin/manage-account/university' },
    { label: '专家', path: '/admin/manage-account/expert' },
    { label: '专家组', path: '/admin/manage-account/expert-group' },
    { label: '信息维护', path: '/admin/manage-account/base-info' }
  ]
  return (
    <BaseLayout
      leftHeaderIcon="icon1"
      leftHeaderLabel="账号管理"
      leftNavList={navList}>
    </BaseLayout>
  )
}

export default Account