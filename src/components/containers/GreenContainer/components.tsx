import { useContext } from "react"
import UserContext from "../../../context/User/UserContext"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { GreenContainerState } from "./types"

// Components
import FormContainer from "../../forms/FormContainer/FormContainer"
import GetGreen from "../../forms/get/GetGreen/GetGreen"
import CreateLink from "../../buttons/nav/CreateLink/CreateLink"

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

export const CreateBtn = () => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="absolute top-5 right-6">
      <CreateLink
        label={'Create New Green Violation'}
        location={'/create?formType=createGreen'} />
    </div>
  )
}