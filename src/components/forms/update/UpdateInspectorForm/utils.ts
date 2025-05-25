import { handleSuccessfulFormSubmit } from "../../../../helpers/hooks"
import { updateInspector } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { InspectorObj } from "../../../../context/App/types"
import { HandleUpdateInspectorFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const handleUpdateInspectorFormSubmit = async (formData: HandleUpdateInspectorFormSubmitProps['formData'], options: HandleUpdateInspectorFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate, invalidateQuery } = options

  const inspectorObj: InspectorObj = {
    name: formData.name,
    email: formData.email,
    inspectorId: formData.inspectorId
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