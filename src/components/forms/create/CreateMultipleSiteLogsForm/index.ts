import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { createSiteLog } from "../../../../context/App/AppActions"

// Types
import { UseFormReturn } from "react-hook-form"
import { SiteLogObj } from "../../../../context/App/types"
import { CreateMultipleSiteLogsFormUseForm, UseCreateMultipleSiteLogsFormProps, HandleCreateMultipleSiteLogsFormSubmitProps } from "./types"

export const useCreateMultipleSiteLogsForm = (siteIds: UseCreateMultipleSiteLogsFormProps['siteIds']): UseFormReturn<CreateMultipleSiteLogsFormUseForm> => { // CreateMultipleSiteLogs useForm
  return useForm<CreateMultipleSiteLogsFormUseForm>({
    defaultValues: {
      siteIds,
      inspectionDate: setDateForForm(new Date())
    }
  })
}

export const handleCreateMultipleSiteLogsFormSubmit = async (formData: HandleCreateMultipleSiteLogsFormSubmitProps['formData'], options: HandleCreateMultipleSiteLogsFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState } = options

  const { siteIds, inspectionDate } = formData

  await Promise.all(
    siteIds.map(async siteId => {
      const siteLogObj: SiteLogObj = {
        inspectionDate,
        siteId
      }

      createSiteLog(siteLogObj)
    })
  )

  handleSuccessfulFormSubmit('Saved', { invalidateQuery, resetState })
}