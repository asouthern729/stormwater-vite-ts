// Types
import { ReactNode } from "react"
import { SetCreateFormProps } from "./types"

// Components
import GetSite from "../../components/forms/get/GetSite/GetSite"
import FormContainer from "../../components/forms/FormContainer/FormContainer"
import CreateSiteForm from "../../components/forms/create/CreateSiteForm/CreateSiteForm"

export const setCreateForm = (form: SetCreateFormProps['form']): ReactNode => { // Return GetSite and pass form prop
  if(['createViolation', 'createComplaint', 'createDischarge'].includes(form)) {
    return <GetSite form={form} />
  }

  if(form === 'createSite') { // Create new site
    return (
      <FormContainer>
        <CreateSiteForm />
      </FormContainer>
    )
  }
}