import { useNavigate } from "react-router-dom"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import { handleCreateSiteFormSubmit } from "./utils"

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateSiteFormUseForm } from "./types"
import { useCallback } from "react"

export const useCreateSiteForm = (): UseFormReturn<CreateSiteFormUseForm> => { // CreateSiteForm useForm state
  return useForm<CreateSiteFormUseForm>({
    defaultValues: {
      name: '',
      location: '',
      xCoordinate: undefined,
      yCoordinate: undefined,
      inspectorId: null,
      preconDate: '',
      permit: null,
      cof: null,
      tnq: null,
      greenInfrastructure: null,
      inactive: null,
      primaryContact: null,
      contractors: [],
      siteInspectors: [],
      otherContacts: []
    }
  })
}

export const useCreateSiteFormContext = (): UseFormReturn<CreateSiteFormUseForm> => { // CreateSiteForm context
  const methods = useFormContext<CreateSiteFormUseForm>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateSiteFormUseForm) => 
    handleCreateSiteFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries('getSites'),
      navigate: () => navigate('/')
    }), [queryClient, navigate]
  )
}