import { useState } from "react"
import { useQueryClient } from "react-query"
import { deleteComplaint } from "../../../../context/App/AppActions"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers"

// Types
import { Complaint } from "../../../../context/App/types"
import { GetComplaintState } from './types'

// Components
import UpdateSiteComplaintForm from "../../update/UpdateSiteComplaintForm/UpdateSiteComplaintForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ complaint, resetState, uuid }: { complaint: Complaint | undefined, resetState: () => void, uuid: string }) => { // Update site complaint form
  const [state, setState] = useState<GetComplaintState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return (
    <>
      {complaint && (
        <div className="flex flex-col items-center">
          <UpdateSiteComplaintForm 
            complaint={complaint}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Complaint' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid, state.deleteBtnActive, deleteComplaint, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(uuid ? ['getSite', siteUUID] : 'getSites') })} />
        </div>
      )}
    </>
  )
}