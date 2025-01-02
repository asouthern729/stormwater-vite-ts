import { useState } from "react" 
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick, useGetSiteUUID } from "../../../../helpers"
import { deleteIllicitDischarge } from "../../../../context/App/AppActions"

// Types
import { IllicitDischarge } from "../../../../context/App/types"
import { GetIllicitDischargeState } from "./types"

// Components
import UpdateSiteIllicitDischargeForm from "../../update/UpdateSiteIllicitDischargeForm/UpdateSiteIllicitDischargeForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ illicitDischarge, resetState, uuid }: { illicitDischarge: IllicitDischarge | undefined, resetState: () => void, uuid: string }) => { // Update site illicit discharge form
  const [state, setState] = useState<GetIllicitDischargeState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return (
    <>
    {illicitDischarge && (
      <div className="flex flex-col items-center">
        <UpdateSiteIllicitDischargeForm 
          illicitDischarge={illicitDischarge}
          resetState={resetState} />
        <DeleteBtn
          label={!state.deleteBtnActive ? 'Delete Illicit Discharge' : 'Confirm Delete'}
          handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteIllicitDischarge, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites') })} />
      </div>
      )}
    </>
  )
}