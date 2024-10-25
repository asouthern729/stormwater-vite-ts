import { useState } from "react"
import { useQueryClient } from "react-query"
import { useValidateUser, handleDeleteBtnClick } from "../../../../helpers"
import { deleteContact } from "../../../../context/App/AppActions"
import { useGetContact } from "."

// Types
import { GetContactProps, GetContactState } from "./types"

// Components
import UpdateContactForm from "../../update/UpdateContactForm/UpdateContactForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function GetContact({ uuid, resetState }: GetContactProps) {
  const [state, setState] = useState<GetContactState>({ deleteBtnActive: false, formUUID: uuid })

  const validated = useValidateUser()

  const { data } = useGetContact(uuid, validated)

  const queryClient = useQueryClient()

  return (
    <div data-testid="get-contact">
      {data?.data && (
        <div className="flex flex-col items-center">
          <UpdateContactForm
            contact={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Contact' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteContact, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries('getContacts') })} />
        </div>
      )}
    </div>
  )
}

export default GetContact