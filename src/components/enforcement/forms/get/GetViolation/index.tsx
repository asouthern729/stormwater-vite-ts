import { useGetViolation } from './hooks'

// Components
import HandleLoading from '@/utils/HandleLoading'
import { Form } from './components'

function GetViolation() {
  const { data, isSuccess } = useGetViolation()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Form violation={data?.data} />
    </HandleLoading>
  )
}

export default GetViolation