import { useState } from "react"
import { useQueryClient } from "react-query"
import { useValidateUser, useGetSiteUUID, handleDeleteBtnClick } from "../../../../helpers"
import { deleteComplaint } from "../../../../context/App/AppActions"
import { useGetComplaint } from "."

// Types
import { GetComplaintProps, GetComplaintState } from "./types"

// Components
import UpdateSiteComplaintForm from "../../update/UpdateSiteComplaintForm/UpdateSiteComplaintForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetComplaint({ uuid, resetState }: GetComplaintProps) {
  const [state, setState] = useState<GetComplaintState>({ deleteBtnActive: false })

  const validated = useValidateUser()

  const { data } = useGetComplaint(uuid, validated)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="get-complaint">
      {data?.data && (
        <div className="flex flex-col items-center">
          <UpdateSiteComplaintForm 
            complaint={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Complaint' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteComplaint, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites') })} />
        </div>
      )}
    </div>
  )
}

export default GetComplaint