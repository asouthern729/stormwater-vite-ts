import { useValidateUser } from "../../../../helpers"
import { useGetFollowUp } from './hooks'

// Types
import { GetFollowUpProps } from "./types"

// Components
import { Form } from './components'

function GetFollowUp({ uuid, resetState }: GetFollowUpProps) {
  const validated = useValidateUser()

  const { data } = useGetFollowUp(uuid, validated)

  return (
    <div data-testid="get-follow-up">
      <Form
        followUp={data?.data}
        resetState={resetState}
        uuid={uuid as string} />
    </div>
  )
}

export default GetFollowUp