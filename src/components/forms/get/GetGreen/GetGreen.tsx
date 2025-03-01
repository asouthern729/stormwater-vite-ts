import { useGetGreenViolation } from "./hooks"

// Types
import { GetGreenProps } from "./types"

// Components
import { Form } from "./components"

function GetGreen({ uuid, handleCloseForm }: GetGreenProps) {
  const { data } = useGetGreenViolation(uuid)

  return (
    <div data-testid="get-green">
      <Form
        green={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetGreen