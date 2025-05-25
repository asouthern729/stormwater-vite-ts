import { useHandleDeleteBtnClick } from './hooks'

// Types
import { ConstructionViolationInterface } from "@/context/App/types"

// Components
import UpdateViolationForm from "../../update/UpdateViolationForm/UpdateViolationForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const Form = ({ violation }: { violation: ConstructionViolationInterface | undefined }) => { // Update violation form
  const { active, handleClick } = useHandleDeleteBtnClick()

  if(!violation) return null

  return (
    <div className="flex flex-col items-center">
      <UpdateViolationForm violation={violation} />
      <DeleteBtn
        label={!active ? 'Delete Violation' : 'Confirm Delete'}
        handleClick={handleClick} />
    </div>
  )
}