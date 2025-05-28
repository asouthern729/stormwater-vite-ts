import { useHandleDeleteBtnClick } from "./hooks"

// Types
import { IllicitDischargeInterface } from "@/context/App/types"

// Components
import UpdateSiteIllicitDischargeForm from "../../update/UpdateIllicitDischargeForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn"

export const Form = ({ illicitDischarge }: { illicitDischarge: IllicitDischargeInterface | undefined }) => { // Update site illicit discharge form
  const { handleClick, active } = useHandleDeleteBtnClick()

  if(!illicitDischarge) return null

  const label = !active ? 'Delete Violation' : 'Confirm Delete'

  return (
    <div className="flex flex-col items-center">
      <UpdateSiteIllicitDischargeForm illicitDischarge={illicitDischarge} />
      <DeleteBtn onClick={handleClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}