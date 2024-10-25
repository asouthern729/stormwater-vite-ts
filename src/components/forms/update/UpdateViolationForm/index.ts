import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { updateViolation, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { ViolationObj, FollowUpObj } from "../../../../context/App/types"
import { UseUpdateViolationFormProps, UpdateViolationFormUseForm, HandleUpdateViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const useUpdateViolationForm = (violation: UseUpdateViolationFormProps['violation']): UseFormReturn<UpdateViolationFormUseForm> => { // UpdateViolationForm useForm
  return useForm<UpdateViolationFormUseForm>({
    defaultValues: {
      violationId: violation.violationId,
      siteId: violation.siteId,
      date: setDateForForm(violation.date),
      details: violation.details,
      enforcementAction: violation.enforcementAction,
      penaltyDate: setDateForForm(violation.penaltyDate),
      penaltyAmount: violation.penaltyAmount,
      penaltyDueDate: setDateForForm(violation.penaltyDueDate),
      paymentReceived: setDateForForm(violation.paymentReceived),
      swoDate: setDateForForm(violation.swoDate),
      swoLiftedDate: setDateForForm(violation.swoLiftedDate),
      compliance: violation.compliance,
      closed: violation.closed,
      followUpDate: undefined,
      existingFollowUpDates: violation.FollowUpDates.length ? violation.FollowUpDates.map(followUp => {
        return { followUpDate: followUp.followUpDate, uuid: followUp.uuid }
      }) : [],
      uuid: violation.uuid
    }
  })
}

export const handleUpdateViolationFormSubmit = async (formData: HandleUpdateViolationFormSubmitProps['formData'], options: HandleUpdateViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState } = options

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

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}