import { useReturnUserRoles } from '@/helpers/hooks'

// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ContactsContainerState } from "./types"

// Components
import FormContainer from "../../../form-elements/FormContainer"
import GetContact from "../../forms/get/GetContact/GetContact"
import CreateLink from "../../../layout/nav/buttons/CreateLink"

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
  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <div className="absolute top-5 right-6">
      <CreateLink href={'/create?formType=createContact'}>
        Create New Contact
      </CreateLink>
    </div>
  )
}