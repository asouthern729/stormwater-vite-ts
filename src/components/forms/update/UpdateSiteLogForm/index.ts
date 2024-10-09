import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { updateSiteLog } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { SiteLogObj } from "../../../../context/App/types"
import { UpdateSiteLogUseForm, UseUpdateSiteLogFormProps, HandleUpdateSiteLogFormSubmitProps } from "./types"

export const useUpdateSiteLogForm = (siteLog: UseUpdateSiteLogFormProps['siteLog']): UseFormReturn<UpdateSiteLogUseForm> => { // UpdateSiteLog useForm
  return useForm<UpdateSiteLogUseForm>({
    defaultValues: {
      siteId: siteLog.siteId,
      inspectionDate: setDateForForm(siteLog.inspectionDate),
      uuid: siteLog.uuid
    }
  })
}

export const handleUpdateSiteLogFormSubmit = async (formData: HandleUpdateSiteLogFormSubmitProps['formData'], options: HandleUpdateSiteLogFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { resetState, invalidateQuery } = options
  
  const siteLogObj: SiteLogObj = {
    siteId: formData.siteId,
    inspectionDate: formData.inspectionDate as string,
    uuid: formData.uuid
  }

  const result = await updateSiteLog(siteLogObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}