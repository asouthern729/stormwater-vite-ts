import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { handleCreateSiteLogFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateSiteLogFormUseForm, UseCreateSiteLogFormProps } from "./types"

export const useCreateSiteLogForm = (siteId: UseCreateSiteLogFormProps['siteId'], date: UseCreateSiteLogFormProps['date']): UseFormReturn<CreateSiteLogFormUseForm> => { // CreateSiteLogForm useForm
  const logDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

  return useForm<CreateSiteLogFormUseForm>({
    defaultValues: {
      siteId,
      inspectionDate: logDate
    }
  })
}

export const useHandleFormSubmit = (resetState: () => void, uuid: string) => { // Handle form submit
  const queryClient = useQueryClient()

  return useCallback((formData: CreateSiteLogFormUseForm) => 
    handleCreateSiteLogFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(['getSite', uuid]),
      resetState
    }), [queryClient, uuid]
  )
}