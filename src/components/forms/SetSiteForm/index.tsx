import { deleteSite } from "../../../context/App/AppActions"
import { handleSuccessfulFormSubmit } from "../../../helpers"
import { errorPopup } from "../../../utils/Toast/Toast"

// Types
import { ReactNode, MouseEvent } from "react"
import { SiteForm } from "../../containers/SiteContainer/types"
import { SetFormProps, HandleFormProps, HandleDeleteSiteBtnClickProps } from "./types"

// Components
import FormContainer from "../FormContainer/FormContainer"
import FormNav from "../FormNav/FormNav"
import UpdateSiteForm from "../update/UpdateSiteForm/UpdateSiteForm"
import CreateSiteLogForm from "../create/CreateSiteLogForm/CreateSiteLogForm"
import CreateViolationForm from "../create/CreateViolationForm/CreateViolationForm"
import CreateSiteComplaintForm from "../create/CreateSiteComplaintForm/CreateSiteComplaintForm"
import CreateSiteIllicitDischargeForm from "../create/CreateSiteIllicitDischargeForm/CreateSiteIllicitDischargeForm"
import GetSiteLog from "../get/GetSiteLog/GetSiteLog"
import GetViolation from "../get/GetViolation/GetViolation"
import GetComplaint from "../get/GetComplaint/GetComplaint"
import GetIllicitDischarge from "../get/GetIllicitDischarge/GetIllicitDischarge"
import DeleteBtn from "../../buttons/forms/DeleteBtn/DeleteBtn"

export const setForm = (state: SetFormProps['state'], site: SetFormProps['site'], options: SetFormProps['options']): ReactNode => { // Set form
  const { setState, navigate, queryClient } = options

  if(state.activeForm) {
    if(state.activeForm && state.activeForm !== 'updateSite') { // Create site log, violation, complaint, and illicit discharge
      return (
        <FormContainer>
          {state.activeForm.search('create') !== -1 && ( // Hide if form is of update type
            <FormNav 
              activeForm={state.activeForm}
              handleBtnClick={(e: MouseEvent<HTMLButtonElement>) => setState(prevState => ({ ...prevState, activeForm: e.currentTarget.value as SiteForm }))} />
          )}
          {handleForm(state, site, { setState })}
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
        {navigate && (
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Site' : 'Confirm Delete Site'}
            handleClick={() => handleDeleteSiteBtnClick(site.uuid, state.deleteBtnActive, { setState, navigate, queryClient })} />
        )}
      </div>
    )
  }
}

const handleForm = (state: HandleFormProps['state'], site: HandleFormProps['site'], options: HandleFormProps['options']): ReactNode => {
  const { setState } = options

  const resetState = () => {
    setState(({ activeForm: null, formDate: undefined, deleteBtnActive: false, formUUID: undefined }))
  }
  
  switch(state.activeForm) {
    case 'createSiteLog':
      return (
        <CreateSiteLogForm 
          siteId={site.siteId}
          date={state.formDate || ''}
          resetState={resetState} />
      )
    case 'createSiteConstructionViolation':
      return (
        <CreateViolationForm
          site={site}
          date={state.formDate || ''}
          resetState={resetState} />
      )
    case 'createSiteComplaint':
      return (
        <CreateSiteComplaintForm
          site={site}
          date={state.formDate || ''}
          resetState={resetState} />
      )
    case 'createIllicitDischarge':
      return (
        <CreateSiteIllicitDischargeForm
          site={site}
          date={state.formDate || ''}
          resetState={resetState} />
      )
    case 'updateSiteLog':
      return (
        <GetSiteLog 
          uuid={state.formUUID}
          resetState={resetState} />
      )
    case 'updateSiteConstructionViolation':
      return (
        <GetViolation
          uuid={state.formUUID}
          resetState={resetState} />
      )
    case 'updateSiteComplaint':
      return (
        <GetComplaint
          uuid={state.formUUID}
          resetState={resetState} />
      )
    case 'updateIllicitDischarge':
      return (
        <GetIllicitDischarge
          uuid={state.formUUID}
          resetState={resetState} />
      )
  }
}

const handleDeleteSiteBtnClick = async (uuid: HandleDeleteSiteBtnClickProps['uuid'], deleteBtnActive: HandleDeleteSiteBtnClickProps['deleteBtnActive'], options: HandleDeleteSiteBtnClickProps['options']): Promise<void> => { // Handle delete site button click
  const { setState, navigate, queryClient } = options 

  if(!deleteBtnActive) {
    setState(prevState => ({ ...prevState, deleteBtnActive: true }))
  } else {
    const result = await deleteSite(uuid)

    if(result.success) {
      handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery: () => queryClient.invalidateQueries('getSites'), navigate: () => navigate('/') })
    } else errorPopup(result.msg)
  }
}