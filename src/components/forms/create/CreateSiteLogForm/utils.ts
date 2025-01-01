import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createSiteLog } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { SiteLogObj } from "../../../../context/App/types"
import { HandleCreateSiteLogFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const handleCreateSiteLogFormSubmit = async (formData: HandleCreateSiteLogFormSubmitProps['formData'], options: HandleCreateSiteLogFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState } = options

  const siteLogObj: SiteLogObj = {
    inspectionDate: formData.inspectionDate || '',
    siteId: formData. siteId
  }

  const result = await createSiteLog(siteLogObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}