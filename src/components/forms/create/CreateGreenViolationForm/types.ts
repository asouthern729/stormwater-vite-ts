// Types
import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue, UseFormWatch, UseFormTrigger } from "react-hook-form"

export interface CreateGreenViolationFormUseForm { // CreateGreenViolation useForm state
  date: string | undefined
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  comments: string | null
  responsibleParty: string | null
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  bondReleased: boolean | string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
}

export interface UseHandleMapChangeProps { // useHandleMapChange hook props
  coordinates: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  options: {
    setValue: UseFormSetValue<CreateGreenViolationFormUseForm>
  }
}

export interface HandleCreateGreenViolationFormSubmitProps { // handleCreateGreenViolationFormSubmit fn props
  formData: CreateGreenViolationFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    navigate: NavigateFunction
    resetState?: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateGreenViolationFormUseForm
  options: {
    watch: UseFormWatch<CreateGreenViolationFormUseForm>
    trigger: UseFormTrigger<CreateGreenViolationFormUseForm>
  }
}