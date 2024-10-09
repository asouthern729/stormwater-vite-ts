import { useState } from "react"
import { useQueryClient } from "react-query"
import { useGetSiteUUID, handleDeleteBtnClick } from "../../../../helpers"
import { deleteSiteLog } from "../../../../context/App/AppActions"
import { useGetSiteLog } from "."

// Types
import { GetSiteLogProps, GetSiteLogState } from "./types"

// Components
import UpdateSiteLogForm from "../../update/UpdateSiteLogForm/UpdateSiteLogForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetSiteLog({ uuid, resetState }: GetSiteLogProps) {
  const [state, setState] = useState<GetSiteLogState>({ deleteBtnActive: false })

  const { data } = useGetSiteLog(uuid)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <UpdateSiteLogForm
            siteLog={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Site Log' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteSiteLog, { setState, resetState, invalidateQuery: queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </div>
  )
}

export default GetSiteLog