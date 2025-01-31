import { useContext } from "react"
import UserContext from "../../../context/User/UserContext"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { Site } from "../../../context/App/types"
import { SiteContainerState } from "./types"

// Components
import SetSiteForm from "../../forms/SetSiteForm/SetSiteForm"
import BackToHomeBtn from "../../buttons/nav/BackToHomeBtn/BackToHomeBtn"
import UpdateBtn from "../../buttons/forms/UpdateBtn/UpdateBtn"

export const Form = ({ state, setState, formRef, site }: { state: SiteContainerState, setState: Dispatch<SetStateAction<SiteContainerState>>, formRef: RefObject<HTMLDivElement>, site: Site }) => { // Update site form
  const { activeForm } = state

  if(!activeForm) return null

  return (
    <div ref={formRef}>
      <SetSiteForm
        state={state}
        site={site}
        setState={setState} />
    </div>
  )
}

export const Buttons = ({ handleUpdateBtnClick, disabled }: { handleUpdateBtnClick: () => void, disabled: boolean }) => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="flex gap-2 w-fit 2xl:flex-col 2xl:w-full 2xl:gap-4">
      <BackToHomeBtn />
      <UpdateBtn 
        label={'Update Site'}
        handleClick={handleUpdateBtnClick}
        disabled={disabled} />
    </div>
  )
}