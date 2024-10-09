import { useState } from "react"
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers"
import { deleteFollowUp } from "../../../../context/App/AppActions"
import { useGetFollowUp } from '.'

// Types
import { GetFollowUpProps, GetFollowUpState } from "./types"

// Components
import UpdateFollowUpForm from "../../update/UpdateFollowUpForm/UpdateFollowUpForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetFollowUp({ uuid, resetState }: GetFollowUpProps) {
  const [state, setState] = useState<GetFollowUpState>({ deleteBtnActive: false })

  const { data } = useGetFollowUp(uuid)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <UpdateFollowUpForm
            followUp={data.data} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Follow Up' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteFollowUp, { setState, resetState, invalidateQuery: queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </div>
  )
}

export default GetFollowUp