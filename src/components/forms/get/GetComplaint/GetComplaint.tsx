import { useState } from "react"
import { useQueryClient } from "react-query"
import { useGetSiteUUID, handleDeleteBtnClick } from "../../../../helpers"
import { deleteComplaint } from "../../../../context/App/AppActions"
import { useGetComplaint } from "."

// Types
import { GetComplaintProps, GetComplaintState } from "./types"

// Components
import UpdateSiteComplaintForm from "../../update/UpdateSiteComplaintForm/UpdateSiteComplaintForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetComplaint({ uuid, resetState }: GetComplaintProps) {
  const [state, setState] = useState<GetComplaintState>({ deleteBtnActive: false })

  const { data } = useGetComplaint(uuid)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <UpdateSiteComplaintForm 
            complaint={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Complaint' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteComplaint, { setState, resetState, invalidateQuery: queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </div>
  )
}

export default GetComplaint