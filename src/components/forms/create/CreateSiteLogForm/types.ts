// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"

export interface CreateSiteLogFormProps { // CreateSiteLogForm props
  siteId: string
  date: string
  resetState: () => void
}

export interface CreateSiteLogFormUseForm { // CreateSiteLogForm useForm state
  siteId: string
  inspectionDate: string | undefined
}

export interface UseCreateSiteLogFormProps { // useCreateSiteLogForm hook props
  siteId: string
  date: string
}

export interface HandleCreateSiteLogFormSubmitProps { // handleCreateSiteLogFormSubmit fn props
  formData: CreateSiteLogFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    resetState: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateSiteLogFormUseForm
  options: {
    watch: UseFormWatch<CreateSiteLogFormUseForm>
    trigger: UseFormTrigger<CreateSiteLogFormUseForm>
  }
}