import { useValidateUser } from "../../../../helpers"
import { useGetContact } from "./hooks"

// Types
import { GetContactProps } from "./types"

// Components
import { Form } from './components'

function GetContact({ uuid, handleCloseForm }: GetContactProps) {
  const validated = useValidateUser()

  const { data } = useGetContact(uuid, validated)

  return (
    <div data-testid="get-contact">
      <Form
        contact={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetContact