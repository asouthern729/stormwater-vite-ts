import { handleSuccessfulFormSubmit } from "../../../../helpers/hooks"
import { updateSiteLog } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { SiteLogObj } from "../../../../context/App/types"
import { HandleUpdateSiteLogFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const handleUpdateSiteLogFormSubmit = async (formData: HandleUpdateSiteLogFormSubmitProps['formData'], options: HandleUpdateSiteLogFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { handleCloseForm, invalidateQuery } = options
  
  const siteLogObj: SiteLogObj = {
    siteId: formData.siteId,
    inspectionDate: formData.inspectionDate as string,
    uuid: formData.uuid
  }

  const result = await updateSiteLog(siteLogObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, handleCloseForm })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}