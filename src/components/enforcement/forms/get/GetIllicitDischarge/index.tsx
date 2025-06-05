import { useGetIllicitDischarge } from './hooks'

// Components
import HandleLoading from '@/utils/HandleLoading'
import * as Components from './components'

function GetIllicitDischarge() {
  const { data, isSuccess } = useGetIllicitDischarge()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form illicitDischarge={data?.data} />
    </HandleLoading>
  )
}

export default GetIllicitDischarge