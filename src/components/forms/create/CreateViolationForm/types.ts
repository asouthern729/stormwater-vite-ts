// Types
import { NavigateFunction } from "react-router-dom"
import { Site } from "../../../../context/App/types"
import { UseFormTrigger, UseFormWatch } from "react-hook-form"

export interface CreateViolationFormProps { // CreateViolationForm props
  site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, uuid: string }
  date: string
  resetState?: () => void
  navigate?: () => void
}

export interface CreateViolationFormUseForm { // CreateViolationForm useForm state
  siteId: string
  date: string | undefined
  details: string
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  swoDate: string | undefined
  swoLiftedDate: string | undefined
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
}

export interface UseCreateViolationFormProps { // useCreateViolationForm hook props
  site: Site | { siteId: string, uuid: string }
  date: string
}

export interface HandleCreateViolationFormSubmitProps { // handleCreateViolationFormSubmit fn props
  formData: CreateViolationFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    navigate: NavigateFunction
    resetState?: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateViolationFormUseForm
  options: {
    watch: UseFormWatch<CreateViolationFormUseForm>
    trigger: UseFormTrigger<CreateViolationFormUseForm>
  }
}