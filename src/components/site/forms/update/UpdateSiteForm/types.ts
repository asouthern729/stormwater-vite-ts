// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { Site } from "../../../../../context/App/types"

export interface UpdateSiteFormProps { // UpdateSiteForm props
  site: Site
  handleCancelBtnClick: () => void
}

export interface UpdateSiteFormUseForm {
  name: string
  location: string
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  inspectorId: string | null
  preconDate: string
  permit: string | null
  cof: string | null
  tnq: string | null
  greenInfrastructure: boolean | string | null
  inactive: boolean | string | null
  primaryContact: string | null
  contractors: string[]
  siteInspectors: string[]
  otherContacts: string[]
  readonly uuid: string
}

export interface HandleUpdateSiteFormSubmitProps { // handleUpdateSiteFormSubmit fn props
  formData: UpdateSiteFormUseForm
  options: {
    navigate: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateSiteFormUseForm
  options: {
    watch: UseFormWatch<UpdateSiteFormUseForm>
    trigger: UseFormTrigger<UpdateSiteFormUseForm>
  }
}