import { useState } from "react"
import { useQueryClient } from "react-query"
import { useValidateUser, handleDeleteBtnClick } from "../../../../helpers"
import { deleteGreenViolation } from "../../../../context/App/AppActions"
import { useGetGreenViolation } from "."

// Types
import { GetGreenProps, GetGreenState } from "./types"

// Components
import UpdateGreenViolationForm from "../../update/UpdateGreenViolationForm/UpdateGreenViolationForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetGreen({ uuid, resetState }: GetGreenProps) {
  const [state, setState] = useState<GetGreenState>({ deleteBtnActive: false })

  const validated = useValidateUser()

  const { data } = useGetGreenViolation(uuid, validated)

  const queryClient = useQueryClient()

  return (
    <div data-testid="get-green">
      {data?.data && (
        <div className="flex flex-col items-center">
          <UpdateGreenViolationForm
            green={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Violation' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteGreenViolation, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations') })} />
        </div>
      )}
    </div>
  )
}

export default GetGreen