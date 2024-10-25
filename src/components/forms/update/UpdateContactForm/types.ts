// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { Contact } from "../../../../context/App/types"

export interface UpdateContactFormProps { // UpdateContactForm props
  contact: Contact
  resetState: () => void
}

export interface UpdateContactFormUseForm { // UpdateContactForm useForm state object
  name: string
  company: string | null
  phone: string | null
  email: string | null
  inactive: boolean | string | null
  readonly uuid: string
}

export interface HandleUpdateContactFormSubmitProps { // handleUpdateContactFormSubmit fn props
  formData: UpdateContactFormUseForm
  options: {
    resetState: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateContactFormUseForm
  options: {
    watch: UseFormWatch<UpdateContactFormUseForm>
    trigger: UseFormTrigger<UpdateContactFormUseForm>
  }
}