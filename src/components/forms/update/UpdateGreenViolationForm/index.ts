import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { updateGreenViolation, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { GreenObj, FollowUpObj } from '../../../../context/App/types'
import { UseUpdateGreenViolationFormProps, UpdateGreenViolationFormUseForm, HandleUpdateGreenViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const useUpdateGreenViolationForm = (green: UseUpdateGreenViolationFormProps['green']): UseFormReturn<UpdateGreenViolationFormUseForm> => { // UpdateGreenViolationForm useForm
  return useForm<UpdateGreenViolationFormUseForm>({
    defaultValues: {
      greenId: green.greenId,
      date: setDateForForm(green.date),
      xCoordinate: green.xCoordinate,
      yCoordinate: green.yCoordinate,
      locationDescription: green.locationDescription,
      inspectorId: green.inspectorId,
      details: green.details,
      comments: green.comments,
      responsibleParty: green.responsibleParty,
      enforcementAction: green.enforcementAction,
      penaltyDate: setDateForForm(green.penaltyDate),
      penaltyAmount: green.penaltyAmount,
      penaltyDueDate: setDateForForm(green.penaltyDueDate),
      paymentReceived: setDateForForm(green.paymentReceived),
      bondReleased: green.bondReleased,
      compliance: green.compliance,
      closed: green.closed,
      followUpDate: undefined,
      existingFollowUpDates: green.FollowUpDates.length ? green.FollowUpDates.map(followUp => {
        return { followUpDate: followUp.followUpDate, uuid: followUp.uuid }
      }) : [],
      uuid: green.uuid
    }
  })
}

export const handleUpdateGreenViolationFormSubmit = async (formData: HandleUpdateGreenViolationFormSubmitProps['formData'], options: HandleUpdateGreenViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState } = options

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

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}