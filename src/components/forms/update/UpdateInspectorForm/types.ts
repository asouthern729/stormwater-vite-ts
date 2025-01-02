// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { Inspector } from "../../../../context/App/types"

export interface UpdateInspectorFormProps { // UpdateInspector props
  inspector: Inspector
  handleCloseForm: () => void
}

export interface UpdateInspectorFormUseForm { // UpdateInspectorForm useForm
  name: string
  email: string
  uuid: string
}

export interface UseUpdateInspectorFormUseFormProps { // useUpdateInspectorFormUseForm hook props
  inspector: Inspector
}

export interface HandleUpdateInspectorFormSubmitProps { // handleUpdateInspectorFormSubmit fn props
  formData: UpdateInspectorFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    navigate: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateInspectorFormUseForm
  options: {
    watch: UseFormWatch<UpdateInspectorFormUseForm>
    trigger: UseFormTrigger<UpdateInspectorFormUseForm>
  }
}