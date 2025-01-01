import { handleSuccessfulFormSubmit } from '../../../../helpers'
import { createGreenViolation, createFollowUp } from '../../../../context/App/AppActions'
import { errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { GreenObj, FollowUpObj } from '../../../../context/App/types'
import { HandleCreateGreenViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const handleCreateGreenInfrastructureViolationFormSubmit = async (formData: HandleCreateGreenViolationFormSubmitProps['formData'], options: HandleCreateGreenViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, navigate } = options

  const greenObj: GreenObj = {
    date: formData.date,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    locationDescription: formData.locationDescription,
    inspectorId: formData.inspectorId,
    details: formData.details,
    responsibleParty: formData.responsibleParty,
    comments: formData.comments,
    enforcementAction: formData.enforcementAction,
    penaltyDate: formData.penaltyDate || null,
    penaltyAmount: formData.penaltyAmount,
    penaltyDueDate: formData.penaltyDueDate || null,
    paymentReceived: formData.paymentReceived || null,
    bondReleased: formData.bondReleased,
    compliance: formData.compliance,
    closed: formData.closed
  }

  const result = await createGreenViolation(greenObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: result.data.greenId
      }

      const followUpResult = await createFollowUp(followUpObj)

      if(!followUpResult.success) { // Handle error
        errorPopup(followUpResult.msg)
      }
    }
    
    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, navigate: () => navigate('/') })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}