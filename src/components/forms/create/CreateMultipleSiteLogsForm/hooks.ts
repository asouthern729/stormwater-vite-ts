import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { setDateForForm } from "../../../../helpers"
import { handleCreateMultipleSiteLogsFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateMultipleSiteLogsFormUseForm, UseCreateMultipleSiteLogsFormProps } from "./types"

export const useCreateMultipleSiteLogsForm = (siteIds: UseCreateMultipleSiteLogsFormProps['siteIds']): UseFormReturn<CreateMultipleSiteLogsFormUseForm> => { // CreateMultipleSiteLogsForm useForm

  return useForm<CreateMultipleSiteLogsFormUseForm>({
    defaultValues: {
      siteIds,
      inspectionDate: setDateForForm(new Date())
    }
  })
}

export const useCreateMultipleSiteLogsFormContext = (): UseFormReturn<CreateMultipleSiteLogsFormUseForm> => { // CreateMultipleSiteLogsForm context
  const methods = useFormContext<CreateMultipleSiteLogsFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (inspectorId: string, handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()


  return useCallback((formData: CreateMultipleSiteLogsFormUseForm) =>
    handleCreateMultipleSiteLogsFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(['getInspector', inspectorId]),
      handleCloseForm
    }), [queryClient, handleCloseForm, inspectorId]
  )
}