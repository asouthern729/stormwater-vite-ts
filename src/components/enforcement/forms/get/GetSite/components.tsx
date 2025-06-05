import { useGetActiveSiteNames, useOnSiteSelect, useGetSelectedSite, useHandleNoSiteBtn } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'
import { CreateFormType } from '@/pages/Create/types'

// Components
import FormContainer from "../../../../form-elements/FormContainer"
import CreateComplaintForm from "../../create/CreateComplaintForm"
import CreateIllicitDischargeForm from "../../create/CreateIllicitDischargeForm"

export const SiteSelect = () => { // Site select
  const { data } = useGetActiveSiteNames()

  const sites = data?.data || []

  const onSiteSelect = useOnSiteSelect()

  return (
    <select
      className="text-info select select-bordered"
      onChange={(e) => onSiteSelect(e)}>
        <option value=""></option>
        {sites.map(site => {
          return (
            <option key={`site-option-${ site.uuid }`} value={site.uuid}>{site.name}</option>
          )
        })}
    </select>
  )
}

export const NoSiteBtn = () => { 
  const onClick = useHandleNoSiteBtn()
  
  return (
    <button 
      type="button"
      className="btn btn-ghost hover:text-warning"
      onClick={onClick}>
        Continue Without Site
    </button>
  )
}

export const Form = ({ form }: { form: CreateFormType }) => { // Set form
  const site = useGetSelectedSite()

  const today = new Date().toISOString().split('T')[0]

  let component

  switch(form) {
    case 'createComplaint':
      component = (
        <CreateComplaintForm
          date={today}
          site={site} />
      )
      break
    case 'createIllicitDischarge':
      component = (
        <CreateIllicitDischargeForm
          date={today}
          site={site} />
      )
      break
    default:
      component = null
  }

  return (
    <FormContainer>
      {component}
    </FormContainer>
  )
}