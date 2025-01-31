import { useContext } from "react"
import UserContext from "../../../context/User/UserContext"

// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ContactsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetContact from "../../forms/get/GetContact/GetContact"
import CreateLink from "../../buttons/nav/CreateLink/CreateLink"

export const Form = ({ formUUID, formRef, setState }: { formUUID: string | undefined, setState: Dispatch<SetStateAction<ContactsContainerState>>, formRef: RefObject<HTMLDivElement> }) => { // Update contact form
  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer key={`contact-${ formUUID }`}>
        <GetContact
          uuid={formUUID}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
      </FormContainer>
    </div>
  )
}

export const CreateBtn = () => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="absolute top-5 right-6">
      <CreateLink
        label={'Create New Contact'}
        location={'/create?formType=createContact'} />
    </div>
  )
}