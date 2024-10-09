import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createSiteLog } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { SiteLogObj } from "../../../../context/App/types"
import { CreateSiteLogFormUseForm, UseCreateSiteLogFormProps, HandleCreateSiteLogFormSubmitProps } from "./types"

export const useCreateSiteLogForm = (siteId: UseCreateSiteLogFormProps['siteId'], date: UseCreateSiteLogFormProps['date']): UseFormReturn<CreateSiteLogFormUseForm> => { // CreateSiteLogForm useForm
  const logDate = new Date(date).toISOString().split('T')[0]

  return useForm<CreateSiteLogFormUseForm>({
    defaultValues: {
      siteId,
      inspectionDate: logDate
    }
  })
}

export const handleCreateSiteLogFormSubmit = async (formData: HandleCreateSiteLogFormSubmitProps['formData'], options: HandleCreateSiteLogFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState } = options

  const siteLogObj: SiteLogObj = {
    inspectionDate: formData.inspectionDate || '',
    siteId: formData. siteId
  }

  const result = await createSiteLog(siteLogObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}