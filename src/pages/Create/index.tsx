// Types
import { ReactNode } from "react"
import { SetCreateFormProps } from "./types"

// Components
import GetSite from "../../components/forms/get/GetSite/GetSite"
import FormContainer from "../../components/forms/FormContainer/FormContainer"
import CreateSiteForm from "../../components/forms/create/CreateSiteForm/CreateSiteForm"
import CreateInspectorForm from "../../components/forms/create/CreateInspectorForm/CreateInspectorForm"
import CreateContactForm from "../../components/forms/create/CreateContactForm/CreateContactForm"
import CreateGreenViolationForm from "../../components/forms/create/CreateGreenViolationForm/CreateGreenViolationForm"

export const setCreateForm = (form: SetCreateFormProps['form']): ReactNode => { // Return GetSite and pass form prop
  if(['createViolation', 'createComplaint', 'createDischarge'].includes(form)) {
    return <GetSite form={form} />
  }

  switch(form) {
    case 'createInspector': // Create inspector
      return (
        <FormContainer>
          <CreateInspectorForm />
        </FormContainer>
      )
    case 'createContact': // Create contact
      return (
        <FormContainer>
          <CreateContactForm />
        </FormContainer>
      )
    case 'createGreen': // Create green infrastructure violation
      return (
        <FormContainer>
          <CreateGreenViolationForm />
        </FormContainer>
      )
    default: // Create site
      return (
        <FormContainer>
          <CreateSiteForm />
        </FormContainer>
      )
  }
}