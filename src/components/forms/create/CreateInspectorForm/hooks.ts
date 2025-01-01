import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useForm, useFormContext } from "react-hook-form"
import { handleCreateInspectorFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateInspectorFormUseForm } from "./types"

export const useCreateInspectorForm = () => { // CreateInspectorForm useForm
  return useForm<CreateInspectorFormUseForm>({
    defaultValues: {
      name: '',
      email: ''
    }
  })
}

export const useCreateInspectorFormContext = (): UseFormReturn<CreateInspectorFormUseForm> => { // CreateInspectorForm context
  const methods = useFormContext<CreateInspectorFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (): (formData: CreateInspectorFormUseForm) => Promise<void> => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateInspectorFormUseForm) =>
    handleCreateInspectorFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries('getInspectors'),
      navigate: () => navigate('/')
    }), [queryClient, navigate]
  )
}