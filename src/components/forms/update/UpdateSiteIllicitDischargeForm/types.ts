// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { StreamWatershed } from "../../create/CreateSiteIllicitDischargeForm/types"
import { IllicitDischarge } from "../../../../context/App/types"

export interface UpdateSiteIllicitDischargeFormProps { // UpdateSiteIllicitDischargeForm props
  illicitDischarge: IllicitDischarge
  resetState: () => void
}

export interface UpdateSiteIllicitDischargeFormUseForm { // UpdateSiteIllicitDischargeForm useForm state
  readonly illicitId: string
  readonly siteId: string
  date: string | undefined
  readonly xCoordinate: number | undefined
  readonly yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  volumeLost: string | null
  streamWatershed: StreamWatershed | string | null
  otherStreamWatershed: string | null
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
  readonly uuid: string
}

export interface UseUpdateSiteIllicitDischargeFormProps { // useUpdateSiteIllicitDischargeForm hook props
  illicitDischarge: IllicitDischarge
}

export interface HandleUpdateSiteIllicitDischargeFormSubmitProps { // handleUpdateSiteIllicitDischargeFormSubmit fn props
  formData: UpdateSiteIllicitDischargeFormUseForm
  options: {
    resetState: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateSiteIllicitDischargeFormUseForm
  options: {
    watch: UseFormWatch<UpdateSiteIllicitDischargeFormUseForm>
    trigger: UseFormTrigger<UpdateSiteIllicitDischargeFormUseForm>
  }
}