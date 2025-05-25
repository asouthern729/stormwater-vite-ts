import { useState } from "react"
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers/hooks"
import { deleteSiteLog } from "../../../../context/App/AppActions"

// Types
import { SiteLog } from "../../../../context/App/types"
import { GetSiteLogState } from "./types"

// Components
import UpdateSiteLogForm from "../../update/UpdateSiteLogForm/UpdateSiteLogForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const Form = ({ siteLog, handleCloseForm, uuid }: { siteLog: SiteLog | undefined, handleCloseForm: () => void, uuid: string }) => {
  const [state, setState] = useState<GetSiteLogState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return (
    <>
      {siteLog && (
        <div className="flex flex-col items-center">
          <UpdateSiteLogForm
            siteLog={siteLog}
            handleCloseForm={handleCloseForm} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Site Log' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid, state.deleteBtnActive, deleteSiteLog, { setState, handleCloseForm, invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </>
  )
}