import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { setDateForForm, useGetSiteUUID } from "../../../../helpers"
import { handleUpdateSiteLogFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdateSiteLogUseForm, UseUpdateSiteLogFormProps } from "./types"

export const useUpdateSiteLogForm = (siteLog: UseUpdateSiteLogFormProps['siteLog']): UseFormReturn<UpdateSiteLogUseForm> => { // UpdateSiteLog useForm
  return useForm<UpdateSiteLogUseForm>({
    defaultValues: {
      siteId: siteLog.siteId,
      inspectionDate: setDateForForm(siteLog.inspectionDate),
      uuid: siteLog.uuid
    }
  })
}

export const useHandleFormSubmit = (handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return useCallback((formData: UpdateSiteLogUseForm) => 
    handleUpdateSiteLogFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]),
      handleCloseForm
    }), [queryClient, siteUUID, handleCloseForm]
  )
}