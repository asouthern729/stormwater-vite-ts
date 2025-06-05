import { useHandleDeleteBtnClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import UpdateViolationForm from "../../update/UpdateViolationForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn"

export const Form = ({ violation }: { violation: AppTypes.ConstructionViolationInterface | undefined }) => { // Update violation form
  const { active, handleClick } = useHandleDeleteBtnClick()

  if(!violation) return null

  const label = !active ? 'Delete Violation' : 'Confirm Delete'

  return (
    <div className="flex flex-col items-center">
      <UpdateViolationForm violation={violation} />
      <DeleteBtn onClick={handleClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}