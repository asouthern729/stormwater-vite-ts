// Types
import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue } from "react-hook-form"

export interface CreateGreenViolationFormProps { // CreateGreenViolationForm props
  date: string
}

export interface CreateGreenViolationFormUseForm { // CreateGreenViolation useForm state
  date: string | undefined
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  bondReleased: boolean | string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
}

export interface UseCreateGreenViolationFormProps { // useCreateGreenViolationForm hook props
  date: string
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
    navigate: NavigateFunction
  }
}