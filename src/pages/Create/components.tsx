import { useSetFormType } from './hooks'


// Components
import GetSite from "../../components/enforcement/forms/get/GetSite"
import FormContainer from "../../components/form-elements/FormContainer"
import CreateInspectorForm from "../../components/inspectors/forms/create/CreateInspectorForm"
import CreateContactForm from "../../components/contacts/forms/create/CreateContactForm"
import CreateSiteForm from "../../components/site/forms/create/CreateSiteForm"

export const Form = () => { // Create form
  const formType = useSetFormType()

  let element

  if(['createViolation', 'createComplaint', 'createDischarge'].includes(formType)) {
    element = <GetSite form={formType} />
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
    default: // Create site
      element = ( 
        <FormContainer>
          <CreateSiteForm />
        </FormContainer>
      )
  }

  return element
}