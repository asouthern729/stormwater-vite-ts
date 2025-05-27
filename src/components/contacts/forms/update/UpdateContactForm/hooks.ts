import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { handleUpdateContactFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { Contact } from "../../../../../context/App/types"
import { UpdateContactFormUseForm } from "./types"

export const useUpdateContactForm = (contact: Contact): UseFormReturn<UpdateContactFormUseForm> => { // UpdateContactForm useForm state
  return useForm<UpdateContactFormUseForm>({
    defaultValues: {
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email,
      inactive: contact.inactive,
      uuid: contact.uuid
    }
  })
}

export const useUpdateContactFormContext = (): UseFormReturn<UpdateContactFormUseForm> => { // UpdateContactForm context
  const methods = useFormContext<UpdateContactFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()

  return useCallback((formData: UpdateContactFormUseForm) => 
    handleUpdateContactFormSubmit(formData, {
      handleCloseForm,
      invalidateQuery: () => queryClient.invalidateQueries('getContacts')
    }), [queryClient, handleCloseForm]
  )
}