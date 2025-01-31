import { useContext } from "react"
import UserContext from "../../../context/User/UserContext"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { ComplaintsContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetComplaint from "../../forms/get/GetComplaint/GetComplaint"
import CreateLink from "../../buttons/nav/CreateLink/CreateLink"

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

export const CreateBtn = () => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="absolute top-5 right-6">
      <CreateLink
        label={'Create New Complaint'}
        location={'/create?formType=createComplaint'} />
    </div>
  )
}