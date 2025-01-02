import { useState } from "react"
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick } from "../../../../helpers"
import { deleteGreenViolation } from "../../../../context/App/AppActions"

// Types
import { GreenInfrastructure } from "../../../../context/App/types"
import { GetGreenState } from "./types"

// Components
import UpdateGreenViolationForm from "../../update/UpdateGreenViolationForm/UpdateGreenViolationForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ green, handleCloseForm, uuid }: { green: GreenInfrastructure | undefined, handleCloseForm: () => void, uuid: string }) => { // Update green violation form
  const [state, setState] = useState<GetGreenState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  return (
    <>
      {green && (
        <div className="flex flex-col items-center">
          <UpdateGreenViolationForm
            green={green}
            handleCloseForm={handleCloseForm} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Violation' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteGreenViolation, { setState, handleCloseForm, invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations') })} />
        </div>
      )}
    </>
  )
}