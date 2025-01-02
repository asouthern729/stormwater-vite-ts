import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateViolation, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { ViolationObj, FollowUpObj } from "../../../../context/App/types"
import { HandleUpdateViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const handleUpdateViolationFormSubmit = async (formData: HandleUpdateViolationFormSubmitProps['formData'], options: HandleUpdateViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, handleCloseForm } = options

  const violationObj: ViolationObj = {
    violationId: formData.violationId,
    siteId: formData.siteId,
    date: formData.date as string,
    details: formData.details,
    enforcementAction: formData.enforcementAction,
    penaltyDate: formData.penaltyDate || null,
    penaltyAmount: formData.penaltyAmount,
    penaltyDueDate: formData.penaltyDueDate || null,
    paymentReceived: formData.paymentReceived || null,
    swoDate: formData.swoDate || null,
    swoLiftedDate: formData.swoLiftedDate || null,
    compliance: formData.compliance,
    closed: formData.closed,
    uuid: formData.uuid
  }

  const result = await updateViolation(violationObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: formData.violationId
      }

      const followUpResult = await createFollowUp(followUpObj)

      if(!followUpResult.success) {
        errorPopup(followUpResult.msg)
      }
    }

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, handleCloseForm })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}