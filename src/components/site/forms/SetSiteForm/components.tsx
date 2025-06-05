import { useContext } from "react"
import SiteCtx from "../../context"
import { useOnDeleteBtnClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormContainer from "../../../form-elements/FormContainer"
import FormNav from "../../../form-elements/FormNav"
import UpdateSiteForm from "../update/UpdateSiteForm"
import CreateSiteLogForm from "../create/CreateSiteLogForm"
import CreateViolationForm from "../../../enforcement/forms/create/CreateViolationForm"
import CreateComplaintForm from "../../../enforcement/forms/create/CreateComplaintForm"
import CreateIllicitDischargeForm from "../../../enforcement/forms/create/CreateIllicitDischargeForm"
import GetSiteLog from "../get/GetSiteLog"
import GetViolation from "../../../enforcement/forms/get/GetViolation"
import GetComplaint from "../../../enforcement/forms/get/GetComplaint"
import GetIllicitDischarge from "../../../enforcement/forms/get/GetIllicitDischarge"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn"

export const Form = ({ site }: { site: AppTypes.SiteInterface }) => { // Set form opened on site page
  const { activeForm } = useContext(SiteCtx)


  if(activeForm) {
    if(activeForm !== 'updateSite') { // Create site log, violation, complaint, and illicit discharge
      return (
        <FormContainer>
          <FormNav />
          <SetForm site={site} />
        </FormContainer>
      )
    }

    return <UpdateSite site={site} /> // Update site form
  }
}

const UpdateSite = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { onClick, active } = useOnDeleteBtnClick()

  const label = !active ? 'Delete Site' : 'Confirm Delete Site'

  return ( // Update site
    <div className="flex flex-col items-center gap-8 w-full">
      <FormContainer>
        <UpdateSiteForm site={site} />
      </FormContainer>
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}

const SetForm = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { activeForm, formDate } = useContext(SiteCtx)

  let component = null
  
  switch(activeForm) {
    case 'createSiteLog':
      component = <CreateSiteLogForm siteId={site.siteId} />
      break
    case 'createViolation':
      component = <CreateViolationForm site={site} />
      break
    case 'createComplaint':
      component = (
        <CreateComplaintForm
          site={site}
          date={formDate} />
      )
      break
    case 'createIllicitDischarge':
      component = (
        <CreateIllicitDischargeForm
          site={site}
          date={formDate} />
      )
      break
    case 'updateSiteLog':
      component = <GetSiteLog />
      break
    case 'updateViolation':
      component = <GetViolation />
      break
    case 'updateComplaint':
      component = <GetComplaint />
      break
    case 'updateIllicitDischarge':
      component = <GetIllicitDischarge />
      break
  }

  return component
}