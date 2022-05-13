import BaseLayout from "@/components/baseLayout"

function Account () {
  const navList = [
    { label: '全部申报', path: '/project/manage-application/all' },
  ]
  return (
    <BaseLayout
      leftHeaderIcon="icon1"
      leftHeaderLabel="项目申报管理"
      leftNavList={navList}>
    </BaseLayout>
  )
}

export default Account