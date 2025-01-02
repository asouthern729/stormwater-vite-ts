import { useValidateUser } from "../../../../helpers"
import { useGetComplaint } from "./hooks"

// Types
import { GetComplaintProps } from "./types"

// Components
import { Form } from './components'

function GetComplaint({ uuid, handleCloseForm }: GetComplaintProps) {
  const validated = useValidateUser()

  const { data } = useGetComplaint(uuid, validated)

  return (
    <div data-testid="get-complaint">
      <Form
        complaint={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetComplaint