import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useForm, useFormContext } from "react-hook-form"
import { handleCreateContactFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateContactFormUseForm } from "./types"

export const useCreateContactForm = (): UseFormReturn<CreateContactFormUseForm> => { // CreateContactForm useform
  return useForm<CreateContactFormUseForm>({
    defaultValues: {
      name: null,
      company: null,
      phone: null,
      email: null,
      inactive: false
    }
  })
}

export const useCreateContactFormContext = (): UseFormReturn<CreateContactFormUseForm> => { // CreateContactForm context
  const methods = useFormContext<CreateContactFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (): (formData: CreateContactFormUseForm) => Promise<void> => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateContactFormUseForm) => 
    handleCreateContactFormSubmit(formData, {
        invalidateQuery: () => queryClient.invalidateQueries('getContacts'),
        navigate: () => navigate('/contacts')
      }),
    [queryClient, navigate]
  )
}