import { useNavigate } from "react-router-dom"
import { setDateForForm } from "../../../../helpers"
import { handleSiteSelect } from "./utils"

// Types
import { Dispatch, SetStateAction } from "react"
import { CreateForm } from "../../../../pages/Create/types"
import { Site } from "../../../../context/App/types"
import { GetSiteState } from "./types"

// Components
import FormContainer from "../../FormContainer/FormContainer"
import CreateViolationForm from "../../create/CreateViolationForm/CreateViolationForm"
import CreateSiteComplaintForm from "../../create/CreateSiteComplaintForm/CreateSiteComplaintForm"
import CreateSiteIllicitDischargeForm from "../../create/CreateSiteIllicitDischargeForm/CreateSiteIllicitDischargeForm"

export const SiteSelect = ({ sites, setState }: { sites: { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string }[], setState: Dispatch<SetStateAction<GetSiteState>> }) => { // Site select

  return (
    <select
      className="text-info select select-bordered"
      onChange={(event) => handleSiteSelect(event, { setState })}>
        <option value=""></option>
      {sites.map(site => {
        return (
          <option key={`site-option-${ site.siteId }`} value={site.siteId}>{site.name}</option>
        )
      })}
    </select>
  )
}

export const NoSiteBtn = ({ form, handleClick }: { form: CreateForm, handleClick: () => void }) => { // Show button for complaints and illicit discharge forms only
  const visible = ['createComplaint', 'createDischarge'].includes(form)

  if(!visible) return null
  
  return (
    <button 
      type="button"
      className="btn btn-ghost hover:text-warning"
      onClick={() => handleClick()}>
        Continue Without Site
    </button>
  )
}

export const Form = ({ visible, form, site }: { visible: boolean, form: CreateForm, site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined }) => { // Set form
  const navigate = useNavigate()

  if(!visible) return null

  const today = setDateForForm(new Date().toString())

  let component

  switch(form) {
    case 'createViolation':
      component = (
        <CreateViolationForm 
          key={`create-violation-${ site?.siteId }`}
          date={today as string}
          site={site as { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string }} />
      )
      break
    case 'createComplaint':
      component = (
        <CreateSiteComplaintForm
          key={`create-complaints-${ site?.siteId }`}
          date={today as string}
          site={site}
          handleCloseForm={() => navigate('/')} />
      )
      break
    case 'createDischarge':
      component = (
        <CreateSiteIllicitDischargeForm
          key={`create-discharge-${ site?.siteId }`}
          date={today as string}
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