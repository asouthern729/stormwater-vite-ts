import { useState } from "react"
import { useQueryClient } from "react-query"
import { deleteContact } from "../../../../context/App/AppActions"
import { handleDeleteBtnClick } from "../../../../helpers/hooks"

// Types
import { Contact } from "../../../../context/App/types"
import { GetContactState } from "./types"

// Components
import UpdateContactForm from "../../update/UpdateContactForm/UpdateContactForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const Form = ({ contact, handleCloseForm, uuid }: { contact: Contact | undefined, handleCloseForm: () => void, uuid: string }) => {
  const [state, setState] = useState<GetContactState>({ deleteBtnActive: false })

  const queryClient = useQueryClient()

  return (
    <>
      {contact && (
        <div className="flex flex-col items-center">
          <UpdateContactForm
            contact={contact}
            handleCloseForm={handleCloseForm} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Contact' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid, state.deleteBtnActive, deleteContact, { setState, handleCloseForm, invalidateQuery: () => queryClient.invalidateQueries('getContacts') })} />
      </div>
      )}
    </>
  )
}