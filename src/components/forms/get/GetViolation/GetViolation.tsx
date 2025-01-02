import { useValidateUser } from '../../../../helpers'
import { useGetViolation } from './hooks'

// Types
import { GetViolationProps } from './types'

// Components
import { Form } from './components'

function GetViolation({ uuid, resetState }: GetViolationProps) {
  const validated = useValidateUser()

  const { data } = useGetViolation(uuid, validated)

  return (
    <div data-testid="get-violation">
      <Form
        violation={data?.data}
        resetState={resetState}
        uuid={uuid as string} />
    </div>
  )
}

export default GetViolation