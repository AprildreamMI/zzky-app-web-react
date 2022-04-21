import PageSpin from "@/components/pageSpin"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

function Admin () {
  return (
    <Suspense fallback={<PageSpin />}>
      <Outlet></Outlet>
    </Suspense>
  )
}

export default Admin