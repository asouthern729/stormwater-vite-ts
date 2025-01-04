// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { GreenContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetGreen from "../../forms/get/GetGreen/GetGreen"

export const Form = ({ formUUID, formRef, setState }: { formUUID: string | undefined, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<GreenContainerState>> }) => { // Update green violation form
  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer key={`discharge-${ formUUID }`}>
        <GetGreen
          uuid={formUUID}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
      </FormContainer>
    </div>
  )
}