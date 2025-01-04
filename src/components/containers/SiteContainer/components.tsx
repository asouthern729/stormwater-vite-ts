// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { Site } from "../../../context/App/types"
import { SiteContainerState } from "./types"

// Components
import SetSiteForm from "../../forms/SetSiteForm/SetSiteForm"

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