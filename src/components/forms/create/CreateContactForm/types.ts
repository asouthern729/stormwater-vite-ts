// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"

export interface CreateContactFormUseForm { // CreateContactForm useForm state object
  name: string | null
  company: string | null
  phone: string | null
  email: string | null
  readonly inactive: false
}

export interface HandleCreateContactFormSubmitProps { // handleCreateContactFormSubmit fn props
  formData: CreateContactFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    navigate: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateContactFormUseForm
  options: {
    watch: UseFormWatch<CreateContactFormUseForm>
    trigger: UseFormTrigger<CreateContactFormUseForm>
  }
}