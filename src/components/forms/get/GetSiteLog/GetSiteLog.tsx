import { useValidateUser } from "../../../../helpers"
import { useGetSiteLog } from "./hooks"

// Types
import { GetSiteLogProps } from "./types"

// Components
import { Form } from "./components"

function GetSiteLog({ uuid, resetState }: GetSiteLogProps) {
  const validated = useValidateUser()

  const { data } = useGetSiteLog(uuid, validated)

  return (
    <div data-testid="get-site-log">
      <Form
        siteLog={data?.data} 
        resetState={resetState}
        uuid={uuid as string} />
    </div>
  )
}

export default GetSiteLog