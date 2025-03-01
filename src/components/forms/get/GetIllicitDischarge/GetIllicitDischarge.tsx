import { useGetIllicitDischarge } from './hooks'

// Types
import { GetIllicitDischargeProps } from './types'

// Components
import { Form } from './components'

function GetIllicitDischarge({ uuid, handleCloseForm }: GetIllicitDischargeProps) {
  const { data } = useGetIllicitDischarge(uuid)

  return (
    <div data-testid="get-illicit-discharge">
      <Form
        illicitDischarge={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetIllicitDischarge