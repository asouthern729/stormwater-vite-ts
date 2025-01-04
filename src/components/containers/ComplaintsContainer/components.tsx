// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { ComplaintsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetComplaint from "../../forms/get/GetComplaint/GetComplaint"

export const Form = ({ formUUID, formRef, setState }: { formUUID: string | undefined, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<ComplaintsContainerState>> }) => { // Complaint form
  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer key={`complaint-${ formUUID }`}>
        <GetComplaint
          uuid={formUUID}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
      </FormContainer>
    </div>
  )
}