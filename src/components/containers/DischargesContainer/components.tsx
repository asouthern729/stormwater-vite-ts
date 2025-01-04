// Types
import { Dispatch, RefObject, SetStateAction } from "react"
import { DischargesContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetIllicitDischarge from "../../forms/get/GetIllicitDischarge/GetIllicitDischarge"

export const Form = ({ formUUID, formRef, setState }: { formUUID: string | undefined, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<DischargesContainerState>> }) => {   // Update illicit discharge form
  if(!formUUID) return null

  return (
    <div data-testid="form-container" ref={formRef}>
      <FormContainer key={`discharge-${ formUUID }`}>
        <GetIllicitDischarge
          uuid={formUUID}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
      </FormContainer>
    </div>
  )
}