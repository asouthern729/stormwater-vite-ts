// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ViolationsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetViolation from "../../forms/get/GetViolation/GetViolation"

export const Form = ({ formUUID, formRef, setState }: { formUUID: string | undefined, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<ViolationsContainerState>> }) => { // Update violation form
  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer key={`violation-${ formUUID }`}>
        <GetViolation
          uuid={formUUID}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
      </FormContainer>
    </div>
  )
}