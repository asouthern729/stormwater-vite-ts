// Types
import { UseFormWatch, UseFormTrigger } from 'react-hook-form'

export interface CreateInspectorFormUseForm {
  name: string
  email: string
}

export interface HandleCreateInspectorFormSubmitProps { // handleCreateInspectorFormSubmit fn props
  formData: CreateInspectorFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    navigate: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateInspectorFormUseForm
  options: {
    watch: UseFormWatch<CreateInspectorFormUseForm>
    trigger: UseFormTrigger<CreateInspectorFormUseForm>
  }
}