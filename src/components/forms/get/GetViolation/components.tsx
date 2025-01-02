import { useState } from "react"
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers"
import { deleteViolation } from "../../../../context/App/AppActions"

// Types
import { ConstructionViolation } from "../../../../context/App/types"
import { GetViolationState } from "./types"

// Components
import UpdateViolationForm from "../../update/UpdateViolationForm/UpdateViolationForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ violation, resetState, uuid }: { violation: ConstructionViolation | undefined, resetState: () => void, uuid: string }) => { // Update violation form
  const [state, setState] = useState<GetViolationState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return (
    <>
      {violation && (
        <div className="flex flex-col items-center">
          <UpdateViolationForm 
            violation={violation}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Violation' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteViolation, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites') })} />
        </div>
      )}
    </>
  )
}