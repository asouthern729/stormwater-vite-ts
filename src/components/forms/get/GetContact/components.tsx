import { useState } from "react"
import { useQueryClient } from "react-query"
import { deleteContact } from "../../../../context/App/AppActions"
import { handleDeleteBtnClick } from "../../../../helpers"

// Types
import { Contact } from "../../../../context/App/types"
import { GetContactState } from "./types"

// Components
import UpdateContactForm from "../../update/UpdateContactForm/UpdateContactForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const Form = ({ contact, resetState, uuid }: { contact: Contact | undefined, resetState: () => void, uuid: string }) => {
  const [state, setState] = useState<GetContactState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  return (
    <>
      {contact && (
        <div className="flex flex-col items-center">
          <UpdateContactForm
            contact={contact}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Contact' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid, state.deleteBtnActive, deleteContact, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries('getContacts') })} />
      </div>
      )}
    </>
  )
}