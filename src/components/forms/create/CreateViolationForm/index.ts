import { useForm } from 'react-hook-form'
import { handleSuccessfulFormSubmit } from '../../../../helpers'
import { createFollowUp, createViolation } from '../../../../context/App/AppActions'
import { errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import { ViolationObj, FollowUpObj } from '../../../../context/App/types'
import { CreateViolationFormUseForm, UseCreateViolationFormProps, HandleCreateViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const useCreateViolationForm = (site: UseCreateViolationFormProps['site'], date: UseCreateViolationFormProps['date']): UseFormReturn<CreateViolationFormUseForm> => { // CreateViolationForm useForm
  const violationDate = new Date(date).toISOString().split('T')[0]

  return useForm<CreateViolationFormUseForm>({
    defaultValues: {
      siteId: site?.siteId,
      date: violationDate,
      details: '',
      enforcementAction: null,
      penaltyDate: undefined,
      penaltyAmount: null,
      penaltyDueDate: undefined,
      paymentReceived: undefined,
      swoDate: undefined,
      swoLiftedDate: undefined,
      compliance: null,
      closed: null,
      followUpDate: undefined
    }
  })
}

export const handleCreateViolationFormSubmit = async (formData: HandleCreateViolationFormSubmitProps['formData'], options: HandleCreateViolationFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, resetState, navigate } = options

  const violationObj: ViolationObj = {
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
    closed: formData.closed
  }

  const result = await createViolation(violationObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: result.data.violationId
      }

      const followUpResult = await createFollowUp(followUpObj)

      if(!followUpResult.success) { // Handle error
        errorPopup(followUpResult.msg)
      }
    }
    
    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState, navigate: !resetState ? () => navigate('/') : undefined })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}