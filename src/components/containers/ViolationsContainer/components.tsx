import { useContext } from "react"
import UserContext from "../../../context/User/UserContext"

// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { ViolationsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetViolation from "../../forms/get/GetViolation/GetViolation"
import CreateLink from "../../buttons/nav/CreateLink/CreateLink"

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

export const CreateBtn = () => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="absolute top-5 right-6">
      <CreateLink
        label={'Create New Violation'}
        location={'/create?formType=createViolation'} />
    </div>
  )
}