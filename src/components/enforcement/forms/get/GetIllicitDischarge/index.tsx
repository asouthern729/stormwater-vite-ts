import { useGetIllicitDischarge } from './hooks'

// Components
import HandleLoading from '@/utils/HandleLoading/HandleLoading'
import { Form } from './components'

function GetIllicitDischarge() {
  const { data, isSuccess } = useGetIllicitDischarge()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Form illicitDischarge={data?.data} />
    </HandleLoading>
  )
}

export default GetIllicitDischarge