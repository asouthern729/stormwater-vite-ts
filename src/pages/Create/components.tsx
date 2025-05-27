// Types
import { CreateForm } from "./types"

// Components
import GetSite from "../../components/site/forms/get/GetSite/GetSite"
import FormContainer from "../../components/form-elements/FormContainer"
import CreateInspectorForm from "../../components/inspectors/forms/create/CreateInspectorForm/CreateInspectorForm"
import CreateContactForm from "../../components/contacts/forms/create/CreateContactForm/CreateContactForm"
import CreateGreenViolationForm from "../../components/forms/create/CreateGreenViolationForm/CreateGreenViolationForm"
import CreateSiteForm from "../../components/site/forms/create/CreateSiteForm/CreateSiteForm"

export const Form = ({ form }: { form: CreateForm }) => { // Create form
  let element

  if(['createViolation', 'createComplaint', 'createDischarge'].includes(form)) {
    element = <GetSite form={form} />
    return element
  }

  switch(form) {
    case 'createInspector': // Create inspector
      element = (
        <FormContainer>
          <CreateInspectorForm />
        </FormContainer>
      )
      break
    case 'createContact': // Create contact
      element = (
        <FormContainer>
          <CreateContactForm />
        </FormContainer>
      )
      break
    case 'createGreen': // Create green infrastructure violation
      element = (
        <FormContainer>
          <CreateGreenViolationForm />
        </FormContainer>
      )
      break
    default: // Create site
      element = ( 
        <FormContainer>
          <CreateSiteForm />
        </FormContainer>
      )
  }

  return element
}