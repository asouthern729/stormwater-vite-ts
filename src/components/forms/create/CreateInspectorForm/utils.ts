import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createInspector } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { InspectorObj } from "../../../../context/App/types"
import { HandleCreateInspectorFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const handleCreateInspectorFormSubmit = async (formData: HandleCreateInspectorFormSubmitProps['formData'], options: HandleCreateInspectorFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate, invalidateQuery } = options

  const inspectorObj: InspectorObj = {
    name: formData.name,
    email: formData.email
  }

  const result = await createInspector(inspectorObj)

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