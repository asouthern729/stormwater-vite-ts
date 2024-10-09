import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Types
import { UseFormReturn } from 'react-hook-form'
import { CreateGreenViolationFormUseForm, UseCreateGreenViolationFormProps, UseHandleMapChangeProps } from './types'

export const useCreateGreenViolationForm = (date: UseCreateGreenViolationFormProps['date']): UseFormReturn<CreateGreenViolationFormUseForm> => {
  const violationDate = new Date(date).toISOString().split('T')[0]

  return useForm<CreateGreenViolationFormUseForm>({
    defaultValues: {
      date: violationDate,
      xCoordinate: undefined,
      yCoordinate: undefined,
      inspectorId: null,
      details: '',
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
  }, [coordinates])

  useEffect(() => {
    cb()
  }, [coordinates])
}
