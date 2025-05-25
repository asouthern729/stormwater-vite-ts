import { useHandleDeleteBtnClick } from "./hooks"

// Types
import { IllicitDischargeInterface } from "@/context/App/types"

// Components
import UpdateSiteIllicitDischargeForm from "../../update/UpdateSiteIllicitDischargeForm/UpdateSiteIllicitDischargeForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const Form = ({ illicitDischarge }: { illicitDischarge: IllicitDischargeInterface | undefined }) => { // Update site illicit discharge form
  const { handleClick, active } = useHandleDeleteBtnClick()

  if(!illicitDischarge) return null

  return (
    <div className="flex flex-col items-center">
      <UpdateSiteIllicitDischargeForm illicitDischarge={illicitDischarge} />
      <DeleteBtn
        label={!active ? 'Delete Violation' : 'Confirm Delete'}
        handleClick={handleClick} />
    </div>
  )
}