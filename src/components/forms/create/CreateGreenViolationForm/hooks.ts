import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useForm, useFormContext } from 'react-hook-form'
import { handleCreateGreenInfrastructureViolationFormSubmit } from './utils'

// Types
import { UseFormReturn } from 'react-hook-form'
import { UpdateGreenViolationFormUseForm } from '../../update/UpdateGreenViolationForm/types'
import { CreateGreenViolationFormUseForm, UseHandleMapChangeProps } from './types'

export const useCreateGreenViolationForm = (): UseFormReturn<CreateGreenViolationFormUseForm> => { // Create green violation useForm state
  const violationDate = new Date().toISOString().split('T')[0]

  return useForm<CreateGreenViolationFormUseForm>({
    defaultValues: {
      date: violationDate,
      xCoordinate: undefined,
      yCoordinate: undefined,
      locationDescription: null,
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

export const useCreateGreenViolationFormContext = (): UseFormReturn<CreateGreenViolationFormUseForm> => { // CreateGreenViolationForm context
  const methods = useFormContext<CreateGreenViolationFormUseForm|UpdateGreenViolationFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (): (formData: CreateGreenViolationFormUseForm) => Promise<void> => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateGreenViolationFormUseForm) =>
    handleCreateGreenInfrastructureViolationFormSubmit(formData, {
        invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations'),
        navigate: () => navigate('/')
      }),
    [queryClient, navigate]
  )
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