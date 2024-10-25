import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateInspector } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { InspectorObj } from "../../../../context/App/types"
import { UpdateInspectorFormUseForm, HandleUpdateInspectorFormSubmitProps, UseUpdateInspectorFormUseFormProps, HandleRequiredFieldValidationProps } from "./types"

export const useUpdateInspectorForm = (inspector: UseUpdateInspectorFormUseFormProps['inspector']): UseFormReturn<UpdateInspectorFormUseForm> => { // UpdateInspectorForm useForm
  return useForm<UpdateInspectorFormUseForm>({
    defaultValues: {
      name: inspector.name,
      email: inspector.email,
      uuid: inspector.uuid
    }
  })
}

export const handleUpdateInspectorFormSubmit = async (formData: HandleUpdateInspectorFormSubmitProps['formData'], options: HandleUpdateInspectorFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate, invalidateQuery } = options

  const inspectorObj: InspectorObj = {
    name: formData.name,
    email: formData.email
  }

  const result = await updateInspector(inspectorObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, navigate })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}