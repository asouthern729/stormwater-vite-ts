import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { handleDeleteSiteBtnClick } from './utils'

// Types
import { MouseEvent, Dispatch, SetStateAction } from "react"
import { Site } from "../../../../context/App/types"
import { SiteForm, SiteContainerState } from "../../containers/SiteContainer/types"

// Components
import FormContainer from "../../../form-elements/FormContainer"
import FormNav from "../../../form-elements/FormNav/FormNav"
import UpdateSiteForm from "../update/UpdateSiteForm/UpdateSiteForm"
import CreateSiteLogForm from "../create/CreateSiteLogForm/CreateSiteLogForm"
import CreateViolationForm from "../../../enforcement/forms/create/CreateViolationForm"
import CreateSiteComplaintForm from "../../../enforcement/forms/create/CreateComplaintForm"
import CreateSiteIllicitDischargeForm from "../../../enforcement/forms/create/CreateIllicitDischargeForm"
import GetSiteLog from "../get/GetSiteLog/GetSiteLog"
import GetViolation from "../../../enforcement/forms/get/GetViolation"
import GetComplaint from "../../../enforcement/forms/get/GetComplaint"
import GetIllicitDischarge from "../../../enforcement/forms/get/GetIllicitDischarge"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn"

export const Form = ({ state, setState, site }: { state: SiteContainerState, setState: Dispatch<SetStateAction<SiteContainerState>>, site: Site }) => { // Set form opened on site page
  const { activeForm } = state
  
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  if(activeForm) {
    if(activeForm !== 'updateSite') { // Create site log, violation, complaint, and illicit discharge
      return (
        <FormContainer>
          {activeForm.search('create') !== -1 && ( // Hide if ofrm is of update type
            <FormNav 
              activeForm={activeForm}
              handleBtnClick={(e: MouseEvent<HTMLButtonElement>) => setState(prevState => ({ ...prevState, activeForm: e.currentTarget.value as SiteForm }))} />
          )}
          <SetForm
            state={state}
            setState={setState}
            site={site} />
        </FormContainer>
      )
    }

    return ( // Update site
      <div className="flex flex-col items-center gap-8 w-full">
        <FormContainer>
          <UpdateSiteForm 
            site={site} 
            handleCancelBtnClick={() => setState(prevState => ({ ...prevState, activeForm: null }))} />
        </FormContainer>
        <DeleteBtn
          label={!state.deleteBtnActive ? 'Delete Site' : 'Confirm Delete Site'}
          handleClick={() => handleDeleteSiteBtnClick(site.uuid, state.deleteBtnActive, { setState, navigate, queryClient })} />
      </div>
    )
  }
}

const SetForm = ({ state, setState, site }: { state: SiteContainerState, setState: Dispatch<SetStateAction<SiteContainerState>>, site: Site }) => {
  const handleCloseForm = () => {
    setState(({ activeForm: null, formDate: undefined, deleteBtnActive: false, formUUID: undefined }))
  }

  let component
  
  switch(state.activeForm) {
    case 'createSiteLog':
      component = (
        <CreateSiteLogForm 
          siteId={site.siteId}
          date={state.formDate || ''}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'createSiteConstructionViolation':
      component = (
        <CreateViolationForm
          site={site}
          date={state.formDate || ''}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'createSiteComplaint':
      component = (
        <CreateSiteComplaintForm
          site={site}
          date={state.formDate || ''}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'createIllicitDischarge':
      component = (
        <CreateSiteIllicitDischargeForm
          site={site}
          date={state.formDate || ''}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'updateSiteLog':
      component = (
        <GetSiteLog 
          uuid={state.formUUID}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'updateSiteConstructionViolation':
      component = (
        <GetViolation
          uuid={state.formUUID}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'updateSiteComplaint':
      component = (
        <GetComplaint
          uuid={state.formUUID}
          handleCloseForm={handleCloseForm} />
      )
      break
    case 'updateIllicitDischarge':
      component = (
        <GetIllicitDischarge
          uuid={state.formUUID}
          handleCloseForm={handleCloseForm} />
      )
      break
    default:
      component = null
  }

  return component
}