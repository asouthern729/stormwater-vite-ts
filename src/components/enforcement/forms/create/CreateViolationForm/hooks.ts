import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from 'react-query'
import { useForm, useFormContext } from 'react-hook-form'
import { handleCreateViolationFormSubmit } from './utils'

// Types
import { UseFormReturn } from 'react-hook-form'
import { CreateViolationFormUseForm, UseCreateViolationFormProps } from './types'

export const useCreateViolationForm = (site: UseCreateViolationFormProps['site'], date: UseCreateViolationFormProps['date']): UseFormReturn<CreateViolationFormUseForm> => { // CreateViolationForm useForm
  const violationDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

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

export const useCreateViolationFormContext = (): UseFormReturn<CreateViolationFormUseForm> => { // CreateViolationForm context
  const methods = useFormContext<CreateViolationFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (handleCloseForm: (() => void) | undefined, uuid: string) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateViolationFormUseForm) => 
    handleCreateViolationFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(['getSite', uuid]),
      handleCloseForm,
      navigate
    }), [queryClient, uuid, handleCloseForm, navigate]
  )
}