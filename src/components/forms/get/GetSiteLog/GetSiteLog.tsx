import { useGetSiteLog } from "./hooks"

// Types
import { GetSiteLogProps } from "./types"

// Components
import { Form } from "./components"

function GetSiteLog({ uuid, handleCloseForm }: GetSiteLogProps) {
  const { data } = useGetSiteLog(uuid)

  return (
    <div data-testid="get-site-log">
      <Form
        siteLog={data?.data} 
        handleCloseForm={handleCloseForm}
        uuid={uuid as string} />
    </div>
  )
}

export default GetSiteLog