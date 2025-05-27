import { useGetFollowUp } from './hooks'

// Types
import { GetFollowUpProps } from "./types"

// Components
import { Form } from './components'

function GetFollowUp({ uuid, handleCloseForm }: GetFollowUpProps) {
  const { data } = useGetFollowUp(uuid)

  return (
    <div data-testid="get-follow-up">
      <Form
        followUp={data?.data}
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetFollowUp