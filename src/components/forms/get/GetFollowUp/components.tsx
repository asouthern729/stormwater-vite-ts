import { useState } from "react"
import { useQueryClient } from "react-query"
import { deleteFollowUp } from "../../../../context/App/AppActions"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers"

// Types
import { FollowUp } from "../../../../context/App/types"
import { GetFollowUpState } from './types'

// Components
import UpdateFollowUpForm from "../../update/UpdateFollowUpForm/UpdateFollowUpForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ followUp, handleCloseForm, uuid }: { followUp: FollowUp | undefined, handleCloseForm: () => void, uuid: string }) => { // Update follow up form
  const [state, setState] = useState<GetFollowUpState>({ deleteBtnActive: false })
  
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return (
    <>
      {followUp && (
        <div className="flex flex-col items-center">
          <UpdateFollowUpForm
            followUp={followUp} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Follow Up' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid, state.deleteBtnActive, deleteFollowUp, { setState, handleCloseForm, invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </>
  )
}