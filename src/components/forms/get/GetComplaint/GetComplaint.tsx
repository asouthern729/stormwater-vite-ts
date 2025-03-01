import { useGetComplaint } from "./hooks"

// Types
import { GetComplaintProps } from "./types"

// Components
import { Form } from './components'

function GetComplaint({ uuid, handleCloseForm }: GetComplaintProps) {
  const { data } = useGetComplaint(uuid)

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