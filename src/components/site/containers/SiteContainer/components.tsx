import { useRef, useContext } from 'react'
import SiteCtx from '../../context'
import inspectorIcon from '@/assets/icons/inspector/inspector.svg'
import { useReturnUserRoles } from '@/helpers/hooks'
import { useOnUpdateBtnClick, useScrollToFormRef } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SetSiteForm from "../../forms/SetSiteForm/SetSiteForm"
import BackToHomeBtn from "@/components/layout/nav/buttons/BackToHomeBtn/BackToHomeBtn"
import UpdateBtn from "@/components/form-elements/buttons/UpdateBtn"
import ViolationsIndicator from '@/components/enforcement/indicators/ViolationsIndicator'
import ComplaintsIndicator from '@/components/enforcement/indicators/ComplaintsIndicator'
import IllicitDischargesIndicator from '@/components/enforcement/indicators/llicitDischargesIndicator'

export const EnforcementIndicators = ({ site }: { site: AppTypes.SiteInterface }) => {

  return (
    <div className="flex justify-evenly w-full">
      <ViolationsIndicator violations={site.ConstructionViolations || []} />
      <ComplaintsIndicator complaints={site.Complaints || []} />
      <IllicitDischargesIndicator discharges={site.IllicitDischarges || []} />
    </div>
  )
}

export const Header = ({ site }: { site: AppTypes.SiteInterface }) => {
  const label = !site.inactive ? 'Active Site' : 'Inactive Site'

  return (
    <div className="flex flex-col gap-3 items-end text-neutral-content text-end ml-auto max-w-[70%]">
      <div className="flex flex-col">
        <h2 className="font-[shrikhand] text-2xl text-shadow-xl">{site.name}</h2>

        <div className="text-neutral-content text-xl font-bold italic text-shadow-xl">{label}</div>
      </div>
      <InspectorName name={site.Inspector?.name} />
    </div>
  )
}

export const Form = ({ site }: { site: AppTypes.SiteInterface }) => { // Update site form
  const { activeForm }  = useContext(SiteCtx)

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  if(!activeForm) return null

  return (
    <div ref={formRef}>
      <SetSiteForm site={site} />
    </div>
  )
}

export const Buttons = () => {
  const roles = useReturnUserRoles()

  const onUpdateBtnClick = useOnUpdateBtnClick()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <div className="flex gap-2 w-fit 2xl:flex-col 2xl:w-full 2xl:gap-4">
      <BackToHomeBtn />
      <UpdateBtn onClick={onUpdateBtnClick}>
        Update Site
      </UpdateBtn>
    </div>
  )
}

export const InspectorName = ({ name }: { name: string | undefined }) => { // Inspector name
  if(!name) return null

  return (
    <div className="flex items-center gap-2 font-[play] font-xl uppercase p-6">
      <img src={inspectorIcon} alt="inspector icon" className="w-12" />
      {name}
    </div>
  )
}

export const SiteIssuesCheckbox = () => {
  const { showClosedSiteIssues, dispatch } = useContext(SiteCtx)

  return (
    <div className="flex gap-2 items-center text-neutral-content ml-auto w-fit">
      <label>Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showClosedSiteIssues}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES' })} />
    </div>
  )
}