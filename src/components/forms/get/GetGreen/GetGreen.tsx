import { useValidateUser } from "../../../../helpers"
import { useGetGreenViolation } from "./hooks"

// Types
import { GetGreenProps } from "./types"

// Components
import { Form } from "./components"

function GetGreen({ uuid, resetState }: GetGreenProps) {
  const validated = useValidateUser()

  const { data } = useGetGreenViolation(uuid, validated)

  return (
    <div data-testid="get-green">
      <Form
        green={data?.data}
        resetState={resetState}
        uuid={uuid as string} />
    </div>
  )
}

export default GetGreen