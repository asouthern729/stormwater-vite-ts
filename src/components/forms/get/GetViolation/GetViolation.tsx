import { useGetViolation } from './hooks'

// Types
import { GetViolationProps } from './types'

// Components
import { Form } from './components'

function GetViolation({ uuid, handleCloseForm }: GetViolationProps) {
  const { data } = useGetViolation(uuid)

  return (
    <div data-testid="get-violation">
      <Form
        violation={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetViolation