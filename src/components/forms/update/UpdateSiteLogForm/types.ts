// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { SiteLog } from "../../../../context/App/types"

export interface UpdateSiteLogFormProps { // UpdateSiteLog props
  siteLog: SiteLog
  handleCloseForm: () => void
}

export interface UpdateSiteLogUseForm { // UpdateSiteLog useForm state
  readonly siteId: string
  inspectionDate: string | undefined
  readonly uuid: string
}

export interface UseUpdateSiteLogFormProps { // useUpdateSiteLogForm hook props
  siteLog: SiteLog
}

export interface HandleUpdateSiteLogFormSubmitProps { // handleUpdateSiteLogFormSubmit fn props
  formData: UpdateSiteLogUseForm
  options: {
    handleCloseForm: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateSiteLogUseForm
  options: {
    watch: UseFormWatch<UpdateSiteLogUseForm>
    trigger: UseFormTrigger<UpdateSiteLogUseForm>
  }
}