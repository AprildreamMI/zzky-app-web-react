import { decrement, increment, incrementByAmount, selectCount } from "@/store/slices/mainSlice"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"

function Login () {
  const count = useSelector(selectCount)
  console.log(count)
  const dispatch = useDispatch()
  return (
    <div>
      Login...
      { count }
      <Button
        type="primary"
        onClick={() => dispatch(increment())}>
        加一
      </Button>
      <Button
        type="primary"
        onClick={() => dispatch(decrement())}>
        减一
      </Button>
      <Button
        type="primary"
        onClick={() => dispatch(incrementByAmount(2))}>
        赋值
      </Button>
    </div>
  )
}

export default Login
