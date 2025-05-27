import { useHandleDeleteBtnClick } from './hooks'

// Types
import { ComplaintInterface } from "@/context/App/types"

// Components
import UpdateSiteComplaintForm from "../../update/UpdateSiteComplaintForm/UpdateSiteComplaintForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const Form = ({ complaint }: { complaint: ComplaintInterface | undefined }) => { // Update site complaint form
  const { handleClick, active } = useHandleDeleteBtnClick()

  if(!complaint) return null

  return (
    <div className="flex flex-col items-center">
      <UpdateSiteComplaintForm complaint={complaint} />
      <DeleteBtn
        label={!active ? 'Delete Violation' : 'Confirm Delete'}
        handleClick={handleClick} />
    </div>
  )
}