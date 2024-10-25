import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { handleSuccessfulFormSubmit } from '../../../../helpers'
import { createGreenViolation, createFollowUp } from '../../../../context/App/AppActions'
import { errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import { GreenObj, FollowUpObj } from '../../../../context/App/types'
import { CreateGreenViolationFormUseForm, UseHandleMapChangeProps, HandleCreateGreenViolationFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const useCreateGreenViolationForm = (): UseFormReturn<CreateGreenViolationFormUseForm> => { // Create green violation useForm state
  const violationDate = new Date().toISOString().split('T')[0]

  return useForm<CreateGreenViolationFormUseForm>({
    defaultValues: {
      date: violationDate,
      xCoordinate: undefined,
      yCoordinate: undefined,
      inspectorId: null,
      details: '',
      comments: null,
      responsibleParty: null,
      enforcementAction: null,
      penaltyDate: undefined,
      penaltyAmount: null,
      penaltyDueDate: undefined,
      paymentReceived: undefined,
      bondReleased: null,
      compliance: null,
      closed: null,
      followUpDate: undefined
    }
  })
}

export const useHandleMapChange = (coordinates: UseHandleMapChangeProps['coordinates'], options: UseHandleMapChangeProps['options']): void => { // Update complaint location on map change
  const { setValue } = options

  const cb = useCallback(() => { // Update form state on coordinates change
    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      setValue('xCoordinate', coordinates.xCoordinate, { shouldValidate: false })
      setValue('yCoordinate', coordinates.yCoordinate, { shouldValidate: false })
    }
  }, [coordinates, setValue])

  useEffect(() => {
    cb()
  }, [cb])
}

export const handleCreateGreenInfrastructureViolationFormSubmit = async (formData: HandleCreateGreenViolationFormSubmitProps['formData'], options: HandleCreateGreenViolationFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, navigate } = options

  const greenObj: GreenObj = {
    date: formData.date,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
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