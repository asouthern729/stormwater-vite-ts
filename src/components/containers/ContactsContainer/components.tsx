// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ContactsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetContact from "../../forms/get/GetContact/GetContact"

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