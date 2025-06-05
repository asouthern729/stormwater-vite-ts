import { useHandleDeleteBtnClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import UpdateSiteComplaintForm from "../../update/UpdateComplaintForm"
import DeleteBtn from "@/components/form-elements/buttons/DeleteBtn"

export const Form = ({ complaint }: { complaint: AppTypes.ComplaintInterface | undefined }) => { // Update site complaint form
  const { handleClick, active } = useHandleDeleteBtnClick()

  if(!complaint) return null

  const label = !active ? 'Delete Violation' : 'Confirm Delete'

  return (
    <div className="flex flex-col items-center">
      <UpdateSiteComplaintForm complaint={complaint} />
      <DeleteBtn onClick={handleClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}