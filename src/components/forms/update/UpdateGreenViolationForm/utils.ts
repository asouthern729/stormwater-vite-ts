import { handleSuccessfulFormSubmit } from "../../../../helpers/hooks"
import { updateGreenViolation, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { GreenObj, FollowUpObj } from '../../../../context/App/types'
import { HandleUpdateGreenViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const handleUpdateGreenViolationFormSubmit = async (formData: HandleUpdateGreenViolationFormSubmitProps['formData'], options: HandleUpdateGreenViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, handleCloseForm } = options

  const greenObj: GreenObj = {
    date: formData.date,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    locationDescription: formData.locationDescription,
    inspectorId: formData.inspectorId,
    details: formData.details,
    comments: formData.comments,
    responsibleParty: formData.responsibleParty,
    enforcementAction: formData.enforcementAction,
    penaltyDate: formData.penaltyDate || null,
    penaltyAmount: formData.penaltyAmount,
    penaltyDueDate: formData.penaltyDueDate || null,
    paymentReceived: formData.paymentReceived || null,
    bondReleased: formData.bondReleased,
    compliance: formData.compliance,
    closed: formData.closed,
    uuid: formData.uuid
  }

  const result = await updateGreenViolation(greenObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: formData.greenId
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